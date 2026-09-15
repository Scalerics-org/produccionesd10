/**
 * Los cuatro pilares del negocio.
 *
 * Están acá y en ningún otro lado porque son dos cosas a la vez: el menú de
 * servicios y el filtro del portfolio. Si la lista viviera duplicada en el
 * esquema de `trabajos` y en el de `servicios`, en algún momento un trabajo
 * iba a quedar apuntando a un pilar que ya no existe.
 */
export const pilares = ['eventos', 'audiovisual', 'radio-y-tv', 'podcasts'] as const;

export type Pilar = (typeof pilares)[number];
