/**
 * Datos de la productora. Relevados el 14/09/2026 de fuentes públicas.
 * Lo marcado TODO hay que confirmarlo con el cliente.
 */
export const empresa = {
  nombre: 'Producciones D10',
  aniosDeTrayectoria: 16,
  // TODO: confirmar razón social, RUT y dirección.
  razonSocial: null,
  rut: null,
} as const;

/** Los contadores del home. Es la prueba de trayectoria. */
export const metricas = [
  { valor: '+1.800', unidad: 'eventos', detalle: 'y producciones artísticas' },
  { valor: '16', unidad: 'años', detalle: 'al aire, ininterrumpidos' },
  { valor: '3.000', unidad: 'programas', detalle: 'producidos y emitidos' },
] as const;

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
    bio: null,
    foto: null,
  },
] as const;
