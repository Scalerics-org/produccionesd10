/**
 * Los nombres de la transición tarjeta → ficha.
 *
 * La imagen de la tarjeta de un trabajo y la portada de su ficha comparten un
 * `view-transition-name`, y el navegador la hace volar de una página a la otra.
 * Dos reglas que, si se rompen, fallan en silencio:
 *
 * - El nombre tiene que ser un identificador CSS válido. Los ids de las
 *   colecciones hoy son slugs limpios, pero no hay nada que lo garantice: se
 *   sanean y llevan el prefijo `trabajo-`, que además impide que empiecen con
 *   un número o que valgan `none` o `auto`.
 * - Tiene que ser único en la página. Si dos elementos visibles comparten
 *   nombre, el navegador cancela la transición entera — no sólo la de ese
 *   trabajo —, y la navegación queda sin fundido. Por eso el nombre no se
 *   calcula: se reclama. El primero que lo pide en una página se lo lleva, y
 *   el resto se queda sin nombre (y sin vuelo, que no es un problema).
 *
 * El registro va atado al `Request` de cada página: en el build estático
 * Astro arma uno por ruta, y el `WeakMap` lo suelta cuando la página terminó.
 */
const PREFIJO = 'trabajo-';

const reclamados = new WeakMap<Request, Set<string>>();

function nombreDeTransicion(idDeTrabajo: string): string {
  return PREFIJO + idDeTrabajo.replace(/[^a-zA-Z0-9_-]/g, '-');
}

export function reclamarTransicion(
  pagina: Request,
  idDeTrabajo: string,
): string | null {
  const nombre = nombreDeTransicion(idDeTrabajo);
  const usados = reclamados.get(pagina) ?? new Set<string>();
  if (usados.has(nombre)) return null;
  reclamados.set(pagina, new Set([...usados, nombre]));
  return nombre;
}
