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
