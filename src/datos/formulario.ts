/**
 * El formulario de presupuesto: campos, textos y mensajes de error.
 *
 * Es la estructura del diseño (2d): "Qué necesitás" como control segmentado y
 * seis campos, "con eso alcanza para cotizar". Los nombres de los campos son
 * el contrato con el Worker (`worker/index.js`): si se cambia uno acá, se
 * cambia allá.
 */
export const campos = {
  tipo: {
    nombre: 'tipo',
    rotulo: '01 · Qué necesitás',
    error: 'Elegí una línea para que la consulta llegue a quien corresponde.',
  },
  nombre: {
    nombre: 'nombre',
    rotulo: '02 · Nombre',
    ayuda: 'Nombre y apellido',
    error: 'Falta tu nombre.',
    maximo: 120,
  },
  empresa: {
    nombre: 'empresa',
    rotulo: '03 · Marca u organismo',
    ayuda: 'Empresa, agencia o institución',
    maximo: 120,
  },
  contacto: {
    nombre: 'contacto',
    rotulo: '04 · Mail o teléfono',
    ayuda: 'nombre@empresa.uy',
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
    patron: '[^@\\s]+@[^@\\s.]+\\.[^@\\s]+|\\+?[\\d\\s\\(\\)\\.\\-]{6,20}',
  },
  fecha: {
    nombre: 'fecha',
    rotulo: '05 · Fecha estimada',
    ayuda: 'dd/mm/aaaa · o «a definir»',
    maximo: 40,
  },
  mensaje: {
    nombre: 'mensaje',
    rotulo: '06 · Contanos',
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
  enviar: 'Enviar consulta',
} as const;
