import { redes } from './sitio';

/**
 * El formulario de presupuesto: campos, textos y mensajes de error.
 *
 * Es la estructura del diseño (2d): "Qué necesitás" como control segmentado y
 * seis campos, "con eso alcanza para cotizar". Los nombres de los campos son
 * el contrato con el Worker (`worker/index.js`): si se cambia uno acá, se
 * cambia allá.
 *
 * Los rótulos no van numerados: el orden de los campos no es una secuencia que
 * haya que seguir, y el número se leía como parte del nombre accesible
 * ("cero uno, qué necesitás").
 */
export const campos = {
  tipo: {
    nombre: 'tipo',
    rotulo: 'Qué necesitás',
    /** Cómo se nombra el campo en "Falta completar: …" de la página de error. */
    faltante: 'qué necesitás',
    error: 'Elegí una línea para que la consulta llegue a quien corresponde.',
  },
  nombre: {
    nombre: 'nombre',
    rotulo: 'Nombre',
    faltante: 'tu nombre',
    ayuda: 'Nombre y apellido',
    error: 'Falta tu nombre.',
    maximo: 120,
  },
  empresa: {
    nombre: 'empresa',
    rotulo: 'Marca u organismo',
    ayuda: 'Empresa, agencia o institución',
    maximo: 120,
  },
  contacto: {
    nombre: 'contacto',
    rotulo: 'Mail o teléfono',
    faltante: 'un mail o teléfono válido',
    ayuda: 'nombre@empresa.uy o 099 123 456',
    error: 'Falta completar el mail o el teléfono: sin esto no podemos contestarte.',
    maximo: 200,
    /*
      Un mail o un teléfono. El patrón es permisivo a propósito: el que valida
      en serio es el Worker, y rechazar un teléfono bien escrito porque tiene
      un guion es perder una consulta.

      Ojo al escribirlo: el navegador compila `pattern` con la bandera `v`, y
      ahí los paréntesis y el guion adentro de una clase van escapados. Sin
      escapar, el patrón es inválido y el navegador lo ignora en silencio.
    */
    patron: '[^@\s]+@[^@\s.]+\.[^@\s]+|\+?[\d\s\(\)\.\-]{6,20}',
  },
  fecha: {
    nombre: 'fecha',
    rotulo: 'Fecha estimada',
    /* El formato va fijo debajo del rótulo: en el placeholder desaparecía en
       cuanto la persona empezaba a escribir. */
    formato: 'Por ejemplo 15/03/2027, o «a definir».',
    maximo: 40,
  },
  mensaje: {
    nombre: 'mensaje',
    rotulo: 'Contanos',
    faltante: 'el mensaje (al menos diez caracteres)',
    ayuda: 'Qué, dónde, para cuánta gente y con qué presupuesto aproximado…',
    error: 'Contanos un poco más: con diez caracteres alcanza para empezar.',
    minimo: 10,
    maximo: 4000,
  },
  /** Campo trampa. Si viene con algo, lo completó un bot. */
  honeypot: 'apellido2',
} as const;

export const textosDelFormulario = {
  titulo: 'Pedido de presupuesto',
  bajada: 'Seis campos. Con eso alcanza para cotizar.',
  opcional: '(opcional)',
  enviar: 'Enviar consulta',
  enviando: 'Enviando consulta…',
} as const;

/**
 * Las dos redes a las que se deriva una consulta mientras el formulario no
 * entrega: son las que el cliente contesta por mensaje privado.
 */
export const redesParaConsultas = redes.filter(
  (red) => red.nombre === 'Instagram' || red.nombre === 'Facebook',
);

/*
  TODO: material pendiente del cliente. El formulario valida pero no entrega:
  falta el secreto `DESTINO_CONSULTAS` del Worker. El día que se configure, se
  pasa esto a `true` y el aviso de arriba del formulario desaparece solo.
*/
export const formularioConectado = false;

/** El aviso de arriba del formulario. `null` cuando ya entrega. */
export const avisoDelFormulario = formularioConectado
  ? null
  : {
      texto:
        'Todavía no podemos recibir consultas por acá. Mientras tanto, escribinos por',
      redes: redesParaConsultas,
    };

/**
 * Lo que contesta el Worker cuando la consulta no sale, por código de error.
 *
 * Sin disculpas ni jerga interna: qué pasó y qué hacer ahora. Cuando la
 * persona ya escribió algo, la página se lo devuelve para que lo copie.
 */
export const erroresDelEnvio = {
  400: {
    titulo: 'No pudimos leer tu consulta',
    texto: 'Escribinos por Instagram o Facebook y te contestamos por ahí.',
    volverAlFormulario: true,
  },
  422: {
    titulo: 'A tu consulta le faltan datos',
    texto: 'Copiá tu mensaje, volvé al formulario y completá lo que falta.',
    volverAlFormulario: true,
  },
  502: {
    titulo: 'Tu consulta no salió',
    texto: 'Copiá tu mensaje y mandalo por Instagram, o probá de nuevo en un rato.',
    volverAlFormulario: true,
  },
  503: {
    titulo: 'Todavía no podemos recibir consultas por acá',
    texto: 'Copiá tu mensaje y mandalo por Instagram.',
    volverAlFormulario: false,
  },
} as const;

export const textosDelError = {
  faltan: 'Falta completar:',
  copiar: 'Copiá tu mensaje',
  botonCopiar: 'Copiar mensaje',
  copiado: 'Copiado',
  volver: 'Volver al formulario',
  redes: 'Mandalo por',
} as const;
