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

/** Campo trampa. Si viene con algo, lo completó un bot. */
const HONEYPOT = 'apellido2';

const LIMITES = {
  nombre: 120,
  empresa: 120,
  email: 200,
  tipo: 40,
  mensaje: 4000,
};

/** Los cuatro pilares más el "otro" que ofrece el <select> del formulario. */
const TIPOS_VALIDOS = new Set([...pilares, 'otro']);

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
    return respuestaDeError(400, 'No pudimos leer el formulario.');
  }

  /*
    Honeypot. Al bot se le contesta lo mismo que a una persona: si devolviéramos
    un error, quien escribe el bot se entera de que hay trampa y la saltea en la
    próxima. Así cree que entró y nosotros no reenviamos nada.
  */
  if (texto(formulario.get(HONEYPOT)) !== '') {
    return redirigir('/gracias', request);
  }

  const consulta = {
    nombre: texto(formulario.get('nombre'), LIMITES.nombre),
    empresa: texto(formulario.get('empresa'), LIMITES.empresa),
    email: texto(formulario.get('email'), LIMITES.email),
    tipo: texto(formulario.get('tipo'), LIMITES.tipo),
    mensaje: texto(formulario.get('mensaje'), LIMITES.mensaje),
  };

  const faltantes = [];
  if (consulta.nombre === '') faltantes.push('nombre');
  if (!pareceEmail(consulta.email)) faltantes.push('email');
  if (!TIPOS_VALIDOS.has(consulta.tipo)) faltantes.push('tipo de proyecto');
  if (consulta.mensaje.length < 10) faltantes.push('mensaje');

  if (faltantes.length > 0) {
    // La validación del navegador ya frena esto; acá se repite porque un POST
    // puede llegar de cualquier lado, no sólo del formulario.
    return respuestaDeError(
      422,
      `Faltan datos o están incompletos: ${faltantes.join(', ')}.`,
    );
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
    return respuestaDeError(
      503,
      'El formulario todavía no está conectado: falta configurar el destino de ' +
        'las consultas. Escribinos por redes mientras tanto.',
    );
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
    return respuestaDeError(
      502,
      'No pudimos enviar tu consulta. Probá de nuevo en un rato.',
    );
  }

  return redirigir('/gracias', request);
}

/** Normaliza un campo del formulario: string, sin espacios de más y recortado. */
function texto(valor, largoMaximo = 1000) {
  return typeof valor === 'string' ? valor.trim().slice(0, largoMaximo) : '';
}

function pareceEmail(valor) {
  return /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(valor);
}

/** 303 para que el navegador vuelva a GET y el F5 no reenvíe el formulario. */
function redirigir(ruta, request) {
  return Response.redirect(new URL(ruta, request.url).href, 303);
}

function respuestaDeError(estado, mensaje) {
  const html = `<!doctype html>
<html lang="es-UY">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>No pudimos enviar tu consulta · Producciones D10</title>
<style>
  body { margin:0; background:#fff; color:#0b0b0c; font:16px/1.6 system-ui, sans-serif; }
  main { max-width:34rem; margin:0 auto; padding:6rem 1rem; }
  h1 { font-size:1.75rem; line-height:1.2; margin:0 0 1rem; }
  p { color:#3f3f43; }
  a { color:#c8102e; }
</style>
</head>
<body>
  <main>
    <h1>No pudimos enviar tu consulta</h1>
    <p>${escapar(mensaje)}</p>
    <p><a href="/contacto">Volver al formulario</a></p>
  </main>
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
