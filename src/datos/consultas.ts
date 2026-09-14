import { getCollection, type CollectionEntry } from 'astro:content';
import { pilares, type Pilar } from './pilares';

/**
 * Las consultas al dominio.
 *
 * Existe para que ninguna página tenga que decidir en qué orden va nada. El
 * criterio de "qué trabajo se muestra primero" es del negocio, no del
 * componente que lo dibuja.
 */

export type Trabajo = CollectionEntry<'trabajos'>;
export type Servicio = CollectionEntry<'servicios'>;

/** Los pilares mandan en el orden que fijó el negocio, no el alfabeto. */
export async function obtenerServicios(): Promise<Servicio[]> {
  const servicios = await getCollection('servicios');
  return servicios.sort((a, b) => a.data.orden - b.data.orden);
}

export async function obtenerServicio(slug: string): Promise<Servicio | undefined> {
  return (await obtenerServicios()).find((servicio) => servicio.id === slug);
}

/**
 * Orden del portfolio: primero los casos reales, después los placeholders, y
 * dentro de cada grupo los más nuevos arriba. Los que no tienen fecha van al
 * final de su grupo, porque no sabemos dónde ubicarlos.
 */
export async function obtenerTrabajos(): Promise<Trabajo[]> {
  const trabajos = await getCollection('trabajos');
  return trabajos.sort((a, b) => {
    if (a.data.esPlaceholder !== b.data.esPlaceholder) {
      return a.data.esPlaceholder ? 1 : -1;
    }
    if (a.data.fecha === b.data.fecha)
      return a.data.titulo.localeCompare(b.data.titulo, 'es');
    if (a.data.fecha === null) return 1;
    if (b.data.fecha === null) return -1;
    return b.data.fecha.localeCompare(a.data.fecha);
  });
}

export async function obtenerTrabajosDePilar(pilar: Pilar): Promise<Trabajo[]> {
  return (await obtenerTrabajos()).filter((trabajo) => trabajo.data.pilar === pilar);
}

export async function obtenerDestacados(cantidad = 6): Promise<Trabajo[]> {
  const trabajos = await obtenerTrabajos();
  return trabajos.filter((trabajo) => trabajo.data.destacado).slice(0, cantidad);
}

/** Cuántos trabajos tiene cada pilar. Lo usa el filtro del portfolio. */
export async function contarPorPilar(): Promise<Record<Pilar, number>> {
  const trabajos = await obtenerTrabajos();
  const cuenta = Object.fromEntries(pilares.map((pilar) => [pilar, 0])) as Record<
    Pilar,
    number
  >;
  for (const trabajo of trabajos) cuenta[trabajo.data.pilar] += 1;
  return cuenta;
}

export async function obtenerClientes() {
  return getCollection('clientes');
}
