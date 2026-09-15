/**
 * Metadatos del sitio y navegación.
 * Fuente de verdad única: si un texto aparece en dos lugares, en algún
 * momento van a discrepar.
 */
export const sitio = {
  nombre: 'Producciones D10',
  // TODO: material pendiente del cliente. Dominio sin definir ni comprar: hasta
  // entonces, la URL provisoria de Cloudflare.
  url: 'https://produccionesd10.scalerics.workers.dev',
  descripcion:
    'Productora uruguaya con 16 años de trayectoria. Producimos programas de radio ' +
    'y televisión, eventos, podcasts y contenido audiovisual.',
  idioma: 'es-UY',
  /*
    TODO: material pendiente del cliente. Hoy el cliente no tiene ni teléfono ni
    mail público en ningún lado: ésa es exactamente la herida que este sitio
    cierra. Nada de esto se inventa; hasta que llegue, el sitio se comporta como
    si no existiera.

    `whatsapp` va en formato internacional sin signos: 598XXXXXXXX.
  */
  telefono: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
} as const;

/*
  El menú principal es el del diseño: cuatro secciones y el botón de presupuesto.
  Clientes queda fuera del menú y se llega desde el pie y desde el carrusel.
*/
export const navegacion = [
  { texto: 'Servicios', href: '/servicios' },
  { texto: 'Trabajos', href: '/trabajos' },
  { texto: 'Nosotros', href: '/nosotros' },
  { texto: 'Contacto', href: '/contacto' },
] as const;

/** El pie suma lo que no entra en el menú. */
export const navegacionDelPie = [
  ...navegacion,
  { texto: 'Clientes', href: '/clientes' },
] as const;

export const redes = [
  { nombre: 'YouTube', href: 'https://www.youtube.com/@produccionesD10' },
  { nombre: 'Instagram', href: 'https://www.instagram.com/producciones.d10/' },
  { nombre: 'Facebook', href: 'https://www.facebook.com/produccionesd10/' },
  { nombre: 'Spotify', href: 'https://open.spotify.com/show/1WFY043VAfTkKc1OpxVIuD' },
] as const;

/**
 * Adónde manda el botón flotante.
 *
 * La decisión vive acá y no en el componente: mientras no tengamos el número de
 * WhatsApp, el botón lleva al formulario en vez de desaparecer. El día que el
 * cliente lo pase, se completa `whatsapp` arriba y el botón se convierte solo.
 */
export const botonFlotante = sitio.whatsapp
  ? {
      href: `https://wa.me/${sitio.whatsapp}`,
      texto: 'Escribinos por WhatsApp',
      esWhatsapp: true,
      externo: true,
    }
  : {
      href: '/contacto',
      texto: 'Pedir presupuesto',
      esWhatsapp: false,
      externo: false,
    };

/**
 * Los textos de la conversión: el hero de /contacto y el "qué pasa después".
 *
 * TODO: material pendiente del cliente. Son promesas de servicio que salen del
 * diseño, no del cliente: la respuesta en el día, el briefing de 20 minutos con
 * Luis y el precio cerrado. Confirmarlas antes de publicar: una promesa que no
 * se cumple en la primera consulta es peor que no hacerla.
 */
export const contacto = {
  titular: 'Contanos qué hay que producir.',
  bajada:
    'Respondemos el mismo día hábil con una propuesta y un rango de precio. Si la fecha está cerca, escribinos por WhatsApp.',
  bajadaCorta: 'Respondemos el mismo día hábil con una propuesta y un rango de precio.',
  proceso: [
    {
      titulo: 'Mismo día hábil.',
      texto: 'Te contestamos con preguntas concretas o con una primera propuesta.',
    },
    {
      titulo: 'Briefing de 20 minutos.',
      texto: 'Por teléfono o en persona, con Luis.',
    },
    {
      titulo: 'Propuesta con precio cerrado.',
      texto: 'Ficha técnica, cronograma y qué queda por fuera.',
    },
  ],
  privacidad: 'No usamos tus datos para nada más que responderte.',
} as const;

/**
 * Los datos directos de la casa, listos para dibujar: si falta el dato, la fila
 * dice "pendiente" en vez de desaparecer, así la demo muestra el hueco.
 */
export const datosDeContacto = [
  {
    rotulo: 'Teléfono',
    valor: sitio.telefono,
    href: sitio.telefono && `tel:${sitio.telefono}`,
  },
  { rotulo: 'Mail', valor: sitio.email, href: sitio.email && `mailto:${sitio.email}` },
] as const;

/**
 * El canal directo que el diseño llama "WhatsApp" en cada cierre.
 *
 * Mientras no haya número, el botón sigue estando — es la pieza que el cliente
 * tiene que ver en la demo — pero lleva al formulario y avisa que el número
 * está pendiente, en vez de abrir un wa.me roto.
 */
export const canalDirecto = sitio.whatsapp
  ? {
      texto: 'WhatsApp',
      detalle: 'Lo más rápido · respuesta en el día',
      href: `https://wa.me/${sitio.whatsapp}`,
      externo: true,
      pendiente: false,
    }
  : {
      texto: 'WhatsApp',
      detalle: 'Número pendiente del cliente',
      href: '/contacto#formulario',
      externo: false,
      pendiente: true,
    };
