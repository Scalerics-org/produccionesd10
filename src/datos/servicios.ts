/**
 * Los cuatro pilares. Son a la vez el menú de servicios y el filtro del
 * portfolio: la misma taxonomía en los dos lados, para que el visitante no
 * tenga que aprender dos.
 */
export type Servicio = {
  slug: string;
  nombre: string;
  bajada: string;
  descripcion: string;
  incluye: string[];
};

export const servicios: Servicio[] = [
  {
    slug: 'eventos',
    nombre: 'Eventos',
    bajada: 'Más de 1.800 producciones artísticas y eventos.',
    descripcion:
      'Producción integral: artistas, sonido, iluminación, conducción y logística. ' +
      'De la idea al desarme.',
    incluye: [
      'Producción artística',
      'Conducción',
      'Sonido e iluminación',
      'Logística',
    ],
  },
  {
    slug: 'audiovisual',
    nombre: 'Audiovisual',
    bajada: 'Contenido pensado para donde se va a ver.',
    descripcion:
      'Institucionales, entrevistas, cobertura de eventos y cortes para redes, ' +
      'producidos con el mismo equipo que hace televisión todas las semanas.',
    incluye: [
      'Institucionales',
      'Cobertura de eventos',
      'Cortes para redes',
      'Edición',
    ],
  },
  {
    slug: 'radio-y-tv',
    nombre: 'Radio y TV',
    bajada: 'Programas al aire, no pilotos.',
    descripcion:
      'Producimos Noche D10 hace 16 años, todas las semanas, en radio, televisión ' +
      'abierta, cable del interior y streaming. Producimos programas de punta a punta.',
    incluye: ['Producción integral', 'Guion y contenidos', 'Coordinación de invitados'],
  },
  {
    slug: 'podcasts',
    nombre: 'Podcasts',
    bajada: 'Del estudio a las plataformas.',
    descripcion:
      'Grabación, edición y distribución. Tenemos show propio en Spotify y el ' +
      'archivo de entrevistas para sostenerlo.',
    incluye: ['Grabación en estudio', 'Edición', 'Distribución', 'Piezas para redes'],
  },
];
