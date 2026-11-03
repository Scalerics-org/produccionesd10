/**
 * Worker de Producciones D10.
 *
 * El sitio sigue siendo estático: este Worker existe para una sola cosa, que es
 * recibir el formulario de contacto. Todo lo demás se lo pasa a los assets sin
 * tocarlo. Por eso no hay adaptador de Astro ni dependencias nuevas: un archivo
 * y listo.
 */

/*
  Los pilares se importan del dominio, no se copian: si mañana se agrega un
  quinto pilar y acá quedara una lista a mano, el formulario empezaría a
  rechazar consultas válidas sin que nadie se entere. Wrangler compila con
  esbuild, así que importar el `.ts` desde acá no necesita nada más.
*/
import { pilares } from '../src/datos/pilares.ts';
import {
  campos,
  erroresDelEnvio,
  redesParaConsultas,
  textosDelError,
} from '../src/datos/formulario.ts';

/*
  Los nombres y los límites de los campos también salen del dominio: son los
  mismos que dibuja el formulario, así no hay dos listas que puedan divergir.
  Los textos de error y las redes a las que se deriva la consulta, lo mismo.
*/
const HONEYPOT = campos.honeypot;

/** Los cuatro pilares. "Otro" ya no existe: el diseño ofrece sólo las cuatro líneas. */
const TIPOS_VALIDOS = new Set(pilares);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contacto') {
      if (request.method !== 'POST') {
        return new Response('Método no permitido', {
          status: 405,
          headers: { Allow: 'POST' },
        });
      }
      return recibirConsulta(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function recibirConsulta(request, env) {
  let formulario;
  try {
    formulario = await request.formData();
  } catch {
    return respuestaDeError(400);
  }

  /*
    Honeypot. Al bot se le contesta lo mismo que a una persona: si devolviéramos
    un error, quien escribe el bot se entera de que hay trampa y la saltea en la
    próxima. Así cree que entró y nosotros no reenviamos nada.
  */
  if (texto(formulario.get(HONEYPOT)) !== '') {
    return redirigir('/gracias', request);
  }

  const campo = (definicion) =>
    texto(formulario.get(definicion.nombre), definicion.maximo);
  const consulta = {
    tipo: texto(formulario.get(campos.tipo.nombre), 40),
    nombre: campo(campos.nombre),
    empresa: campo(campos.empresa),
    contacto: campo(campos.contacto),
    fecha: campo(campos.fecha),
    mensaje: campo(campos.mensaje),
  };

  const faltantes = [];
  if (!TIPOS_VALIDOS.has(consulta.tipo)) faltantes.push(campos.tipo.faltante);
  if (consulta.nombre === '') faltantes.push(campos.nombre.faltante);
  if (!pareceMailOTelefono(consulta.contacto)) faltantes.push(campos.contacto.faltante);
  if (consulta.mensaje.length < campos.mensaje.minimo) {
    faltantes.push(campos.mensaje.faltante);
  }

  if (faltantes.length > 0) {
    // La validación del navegador ya frena esto; acá se repite porque un POST
    // puede llegar de cualquier lado, no sólo del formulario.
    return respuestaDeError(422, { consulta, faltantes });
  }

  /*
    TODO: material pendiente del cliente. No hay a dónde mandar la consulta:
    todavía no tenemos ni el mail del cliente ni el servicio de envío elegido.

    Cuando esté, se define el secreto `DESTINO_CONSULTAS` con la URL del
    webhook o del proveedor de mail y esto empieza a entregar sin tocar el resto:

        npx wrangler secret put DESTINO_CONSULTAS
  */
  if (!env.DESTINO_CONSULTAS) {
    console.log('consulta recibida sin destino configurado', {
      tipo: consulta.tipo,
      largoMensaje: consulta.mensaje.length,
    });
    return respuestaDeError(503, { consulta });
  }

  const entrega = await fetch(env.DESTINO_CONSULTAS, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      ...consulta,
      origen: 'produccionesd10.com/contacto',
      recibidaEn: new Date().toISOString(),
    }),
  });

  if (!entrega.ok) {
    console.error('falló la entrega de la consulta', entrega.status);
    return respuestaDeError(502, { consulta });
  }

  return redirigir('/gracias', request);
}

/** Normaliza un campo del formulario: string, sin espacios de más y recortado. */
function texto(valor, largoMaximo = 1000) {
  return typeof valor === 'string' ? valor.trim().slice(0, largoMaximo) : '';
}

/** Un mail con forma de mail, o un teléfono con al menos seis dígitos. */
function pareceMailOTelefono(valor) {
  if (/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(valor)) return true;
  return /^\+?[\d\s().-]+$/.test(valor) && valor.replace(/\D/g, '').length >= 6;
}

/** 303 para que el navegador vuelva a GET y el F5 no reenvíe el formulario. */
function redirigir(ruta, request) {
  return Response.redirect(new URL(ruta, request.url).href, 303);
}

/**
 * Arma lo que la persona escribió como un mensaje listo para pegar en
 * Instagram o Facebook: los campos completos, uno por línea, y el mensaje al
 * final. Así no se pierde nada aunque el formulario no haya entregado.
 */
function mensajeCopiable(consulta) {
  const tipo = TIPOS_VALIDOS.has(consulta.tipo)
    ? consulta.tipo.replaceAll('-', ' ')
    : '';
  const lineas = [
    [campos.tipo.rotulo, tipo],
    [campos.nombre.rotulo, consulta.nombre],
    [campos.empresa.rotulo, consulta.empresa],
    [campos.contacto.rotulo, consulta.contacto],
    [campos.fecha.rotulo, consulta.fecha],
  ]
    .filter(([, valor]) => valor !== '')
    .map(([rotulo, valor]) => `${rotulo}: ${valor}`);
  return [...lineas, '', consulta.mensaje].join('\n').trim();
}

/*
  La página de error. Va armada acá y no como página de Astro porque tiene que
  devolver lo que la persona escribió, y eso sólo lo tiene este request.

  Los colores son los tokens de `src/estilos/global.css` escritos a mano: el
  Worker no pasa por Tailwind.
*/
function respuestaDeError(estado, { consulta = null, faltantes = [] } = {}) {
  const { titulo, texto, volverAlFormulario } = erroresDelEnvio[estado];
  const copiable = consulta ? mensajeCopiable(consulta) : '';

  const bloqueFaltantes =
    faltantes.length > 0
      ? `<p class="faltan"><strong>${escapar(textosDelError.faltan)}</strong> ${escapar(
          faltantes.join(', '),
        )}.</p>`
      : '';

  const bloqueMensaje =
    copiable !== ''
      ? `<div class="copiable">
      <label for="mensaje-copiable">${escapar(textosDelError.copiar)}</label>
      <textarea id="mensaje-copiable" readonly rows="8">${escapar(copiable)}</textarea>
      <p class="acciones-copia">
        <button type="button" id="copiar" class="boton boton-borde" hidden>${escapar(
          textosDelError.botonCopiar,
        )}</button>
        <span id="estado-copia" aria-live="polite"></span>
      </p>
    </div>`
      : '';

  const bloqueRedes = redesParaConsultas
    .map(
      (red, i) =>
        `<a class="boton ${i === 0 ? 'boton-rojo' : 'boton-borde'}" href="${escapar(
          red.href,
        )}" target="_blank" rel="noopener noreferrer">${escapar(
          red.nombre,
        )} <span aria-hidden="true">→</span></a>`,
    )
    .join('');

  const bloqueVolver = volverAlFormulario
    ? `<p class="volver"><a id="volver" href="/contacto#formulario">${escapar(
        textosDelError.volver,
      )}</a></p>`
    : '';

  const html = `<!doctype html>
<html lang="es-UY">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapar(titulo)} · Producciones D10</title>
<style>
  @font-face { font-family:'Archivo'; font-style:normal; font-weight:400 800; font-display:swap; src:url('/fuentes/archivo-latin-variable.woff2') format('woff2'); }
  *, *::before, *::after { box-sizing:border-box; }
  body { margin:0; background:#f4f3ef; color:#0a0a0a; font:15px/1.55 Archivo, system-ui, sans-serif; border-top:2px solid #c8102e; }
  main { max-width:40rem; padding:3.5rem 1rem 4rem; margin:0 auto; }
  .kicker { margin:0 0 .75rem; color:#c8102e; font-size:11px; line-height:1; font-weight:600; letter-spacing:.2em; text-transform:uppercase; }
  h1 { margin:0 0 .75rem; font-size:34px; line-height:1.05; font-weight:800; letter-spacing:-.03em; text-wrap:balance; }
  p { margin:0 0 1rem; color:#2a2a2a; }
  .faltan strong { color:#0a0a0a; }
  .copiable { margin:1.5rem 0; padding-top:1.25rem; border-top:2px solid #0a0a0a; }
  label, h2 { display:block; margin:0 0 .375rem; color:#2a2a2a; font-size:11px; line-height:1.2; font-weight:600; letter-spacing:.14em; text-transform:uppercase; }
  h2 { margin-bottom:.75rem; }
  textarea { display:block; width:100%; min-height:10rem; padding:13px; border:1px solid rgb(10 10 10 / .6); border-radius:0; background:transparent; color:#0a0a0a; font:inherit; resize:vertical; }
  .acciones-copia { display:flex; align-items:center; gap:1rem; margin:.625rem 0 0; }
  #estado-copia { color:#5c5c5c; font-size:13px; }
  .redes { display:flex; flex-wrap:wrap; gap:.625rem; }
  .boton { display:inline-flex; align-items:center; justify-content:space-between; gap:1rem; min-height:48px; padding:.875rem 1.25rem; border:2px solid transparent; border-radius:0; font:600 12px/1 Archivo, system-ui, sans-serif; letter-spacing:.08em; text-transform:uppercase; text-align:left; text-decoration:none; cursor:pointer; transition:background-color 150ms, color 150ms; }
  .boton-rojo { background:#c8102e; color:#f4f3ef; }
  .boton-rojo:hover { background:#8d0b20; }
  .boton-borde { background:transparent; color:#0a0a0a; border-color:#0a0a0a; }
  .boton-borde:hover { background:#0a0a0a; color:#f4f3ef; }
  .boton[hidden] { display:none; }
  .volver { margin-top:1.75rem; }
  .volver a { display:inline-flex; align-items:center; min-height:44px; color:#0a0a0a; font-weight:600; text-decoration:underline; text-decoration-color:#c8102e; text-decoration-thickness:2px; text-underline-offset:4px; }
  .volver a:hover { color:#c8102e; }
  :focus-visible { outline:2px solid #c8102e; outline-offset:2px; }
  @media (prefers-reduced-motion: reduce) { .boton { transition:none; } }
</style>
</head>
<body>
  <main>
    <p class="kicker">Contacto</p>
    <h1>${escapar(titulo)}</h1>
    <p>${escapar(texto)}</p>
    ${bloqueFaltantes}
    ${bloqueMensaje}
    <h2>${escapar(textosDelError.redes)}</h2>
    <div class="redes">${bloqueRedes}</div>
    ${bloqueVolver}
  </main>
  <script>
    // Copiar al portapapeles. Sin JS el botón no aparece y el texto se
    // selecciona a mano.
    const area = document.getElementById('mensaje-copiable');
    const boton = document.getElementById('copiar');
    const estado = document.getElementById('estado-copia');
    if (area && boton) {
      boton.hidden = false;
      boton.addEventListener('click', async () => {
        area.select();
        try {
          await navigator.clipboard.writeText(area.value);
          estado.textContent = ${JSON.stringify(textosDelError.copiado)};
        } catch {
          estado.textContent = '';
        }
      });
    }
    // Volver con el historial devuelve el formulario con lo que estaba
    // escrito; el link a /contacto lo cargaría vacío.
    const volver = document.getElementById('volver');
    if (volver && history.length > 1 && document.referrer.startsWith(location.origin)) {
      volver.addEventListener('click', (evento) => {
        evento.preventDefault();
        history.back();
      });
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    status: estado,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}

function escapar(texto) {
  return texto.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}
