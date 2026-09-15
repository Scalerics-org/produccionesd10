/**
 * Datos de la productora. Relevados el 14/09/2026 de fuentes públicas.
 * Lo marcado TODO hay que confirmarlo con el cliente.
 */
export const empresa = {
  nombre: 'Producciones D10',
  aniosDeTrayectoria: 16,
  /*
    `foundingDate` del JSON-LD. No es un dato que nos haya dado el cliente: sale
    de restar los 16 años de trayectoria que declara la prensa. Coincide con el
    arranque de Noche D10, así que es lo más firme que tenemos hoy.
  */
  fundacion: '2010',
  // TODO: material pendiente del cliente. Confirmar razón social, RUT y dirección.
  razonSocial: null,
  rut: null,
} as const;

export type Metrica = {
  /** El número pelado. El separador de miles lo pone el contador. */
  valor: number;
  prefijo: string;
  unidad: string;
  detalle: string;
  /**
   * Si el cliente todavía no confirmó el número, se muestra igual pero queda
   * anotado acá. Un contador gigante con un dato sin confirmar es un problema
   * que aparece en la reunión, no antes.
   */
  confirmado: boolean;
};

/** Los contadores del home. Son la prueba de trayectoria. */
export const metricas: Metrica[] = [
  {
    valor: 1800,
    prefijo: '+',
    unidad: 'eventos',
    detalle: 'y producciones artísticas',
    // TODO: la nota de prensa se los atribuye a Luis Betarte, no a la empresa.
    confirmado: false,
  },
  {
    valor: 16,
    prefijo: '',
    unidad: 'años',
    detalle: 'al aire, ininterrumpidos',
    confirmado: true,
  },
  {
    valor: 3000,
    prefijo: '',
    unidad: 'programas',
    detalle: 'producidos y emitidos',
    confirmado: true,
  },
];

/**
 * Parte un número en grupos de miles: 1800 → ['1', '800'].
 *
 * Existe porque el contador del home es CSS puro y `counter()` no sabe poner el
 * separador: hay que darle un contador por grupo. Vive acá, al lado de las
 * métricas, para que el componente no tenga que decidir nada.
 */
export function enGruposDeMiles(valor: number): string[] {
  return String(valor)
    .split('')
    .reverse()
    .join('')
    .match(/\d{1,3}/g)!
    .map((grupo) => grupo.split('').reverse().join(''))
    .reverse();
}

export const equipo = [
  {
    nombre: 'Luis Betarte',
    rol: 'Dirección general',
    bio:
      'Comunicador rosarino radicado en Colonia, egresado de Comunicación. ' +
      'Más de 1.800 producciones artísticas y eventos.',
    foto: null,
  },
  {
    nombre: 'Matías Bidegaray',
    rol: 'Producción general',
    // TODO: material pendiente del cliente. Falta la bio.
    bio: null,
    foto: null,
  },
] as const;

/**
 * La historia de /nosotros, en cuatro tiempos.
 *
 * Sólo 2010 está respaldado (el arranque de Noche D10). El diseño proponía 2014
 * para los eventos y 2019 para la televisión, pero él mismo los marcaba como
 * tentativos: hasta que Luis los confirme, el año no se publica y el casillero
 * lo dice. Un año inventado en una línea de tiempo se lee como un dato.
 */
export const historia = [
  {
    anio: '2010',
    titulo: 'El programa',
    texto:
      'Noche D10 sale al aire por radio. Entrevistas, música y humor, una vez por semana.',
  },
  {
    // TODO: material pendiente del cliente. Confirmar el año con Luis Betarte.
    anio: null,
    titulo: 'Los eventos',
    texto:
      'La agenda de artistas del programa se convierte en producción de espectáculos y eventos.',
  },
  {
    // TODO: material pendiente del cliente. Confirmar el año con Luis Betarte.
    anio: null,
    titulo: 'La televisión',
    texto:
      'El programa pasa a TV y streaming. La productora suma piso, cámaras y posproducción.',
  },
  {
    anio: 'Hoy',
    titulo: 'La casa',
    texto:
      'Cuatro líneas: eventos, audiovisual, radio y TV, podcasts. Con clientes propios.',
  },
] as const satisfies readonly { anio: string | null; titulo: string; texto: string }[];

/** Los tres datos que acompañan el título de /nosotros. */
export const hitos = [
  { valor: '2010', etiqueta: 'arranca Noche D10 en radio' },
  // TODO: la nota de prensa atribuye los +1.800 a Luis Betarte, no a la empresa.
  { valor: '+1.800', etiqueta: 'eventos y producciones artísticas' },
  { valor: '4', etiqueta: 'líneas de negocio hoy' },
] as const;

/** Cuántos casilleros de equipo muestra /nosotros mientras faltan los nombres. */
export const integrantesPendientes = 4;
