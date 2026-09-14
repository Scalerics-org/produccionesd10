/**
 * Metadatos del sitio y navegación.
 * Fuente de verdad única: si un texto aparece en dos lugares, en algún
 * momento van a discrepar.
 */
export const sitio = {
  nombre: 'Producciones D10',
  // TODO: dominio pendiente de definir y comprar con el cliente.
  url: 'http://localhost:4321',
  descripcion:
    'Productora uruguaya con 16 años de trayectoria. Producimos programas de radio ' +
    'y televisión, eventos, podcasts y contenido audiovisual.',
  idioma: 'es-UY',
  // TODO: datos de contacto pendientes. Hoy el cliente no tiene ni teléfono ni
  // mail público en ningún lado: ésa es la herida que este sitio cierra.
  telefono: null,
  whatsapp: null,
  email: null,
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
