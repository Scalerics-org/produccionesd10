/**
 * Portfolio.
 *
 * ATENCIÓN: salvo Noche D10, que es real y verificable, todo lo de acá es
 * material de relleno marcado como tal. El cliente todavía no nos pasó los
 * trabajos. Sin 6 a 8 casos reales con fotos, este sitio no se puede terminar.
 */
export type Trabajo = {
  slug: string;
  titulo: string;
  cliente: string | null;
  pilar: string; // slug de un servicio
  anio: number | null;
  resumen: string;
  esPlaceholder: boolean;
};

export const trabajos: Trabajo[] = [
  {
    slug: 'noche-d10',
    titulo: 'Noche D10',
    cliente: 'Producción propia',
    pilar: 'radio-y-tv',
    anio: 2010,
    resumen:
      'Magazine semanal de entrevistas, música en vivo y humor. 16 años al aire, ' +
      'cerca de 3.000 capítulos y más de 6.800 invitados, por CX30 Radio Nacional ' +
      'AM 1130, VIVO TV, los cables del interior y YouTube.',
    esPlaceholder: false,
  },
  {
    slug: 'podcast-producciones-d10',
    titulo: 'Podcast Producciones D10',
    cliente: 'Producción propia',
    pilar: 'podcasts',
    anio: null,
    resumen:
      'Los programas radiales y las mejores entrevistas, publicados como podcast ' +
      'en Spotify.',
    esPlaceholder: false,
  },
  // TODO: material pendiente del cliente. Reemplazar por casos reales.
  {
    slug: 'evento-pendiente-1',
    titulo: 'Evento pendiente de cargar',
    cliente: null,
    pilar: 'eventos',
    anio: null,
    resumen: 'Placeholder. Falta el material del cliente.',
    esPlaceholder: true,
  },
  {
    slug: 'evento-pendiente-2',
    titulo: 'Evento pendiente de cargar',
    cliente: null,
    pilar: 'eventos',
    anio: null,
    resumen: 'Placeholder. Falta el material del cliente.',
    esPlaceholder: true,
  },
  {
    slug: 'audiovisual-pendiente-1',
    titulo: 'Trabajo audiovisual pendiente de cargar',
    cliente: null,
    pilar: 'audiovisual',
    anio: null,
    resumen: 'Placeholder. Falta el material del cliente.',
    esPlaceholder: true,
  },
  {
    slug: 'audiovisual-pendiente-2',
    titulo: 'Trabajo audiovisual pendiente de cargar',
    cliente: null,
    pilar: 'audiovisual',
    anio: null,
    resumen: 'Placeholder. Falta el material del cliente.',
    esPlaceholder: true,
  },
];

/** TODO: logos y nombres reales pendientes del cliente. */
export const clientes: { nombre: string; logo: string | null }[] = [];
