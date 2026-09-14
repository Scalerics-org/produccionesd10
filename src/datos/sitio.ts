/**
 * Metadatos del sitio y navegación.
 * Fuente de verdad única: si un texto aparece en dos lugares, en algún
 * momento van a discrepar.
 */
export const sitio = {
  nombre: 'Producciones D10',
  // TODO: material pendiente del cliente. Dominio sin definir ni comprar.
  url: 'http://localhost:4321',
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

export const navegacion = [
  { texto: 'Servicios', href: '/servicios' },
  { texto: 'Trabajos', href: '/trabajos' },
  { texto: 'Nosotros', href: '/nosotros' },
  { texto: 'Clientes', href: '/clientes' },
  { texto: 'Contacto', href: '/contacto' },
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
