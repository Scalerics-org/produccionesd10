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

/** El nombre visible de un pilar: "radio-y-tv" → "Radio y TV". */
export async function nombreDePilar(pilar: Pilar): Promise<string> {
  return (await obtenerServicio(pilar))?.data.nombre ?? pilar;
}

/** La línea roja de arriba de cada tarjeta: "Radio y TV · 2010". */
export async function kickerDeTrabajo(trabajo: Trabajo): Promise<string> {
  const nombre = await nombreDePilar(trabajo.data.pilar);
  return trabajo.data.fecha ? `${nombre} · ${trabajo.data.fecha}` : nombre;
}

export type VisualDeTrabajo =
  | { tipo: 'logo'; imagen: ImageMetadata; alt: string }
  | { tipo: 'rotulo'; texto: string }
  | { tipo: 'foto'; imagen: ImageMetadata; alt: string }
  | { tipo: 'pendiente'; texto: string };

/**
 * Qué se dibuja arriba de la tarjeta de un trabajo.
 *
 * Una foto provisoria no se muestra como si fuera del trabajo: el casillero
 * dice que la foto falta. El orden es: foto real, logo o rótulo del caso, y si
 * no hay nada, el aviso de pendiente.
 */
export function visualDeTrabajo(trabajo: Trabajo): VisualDeTrabajo {
  const fotoReal = trabajo.data.galeria.find((foto) => !foto.esPlaceholder);
  if (fotoReal) return { tipo: 'foto', imagen: fotoReal.imagen, alt: fotoReal.alt };
  if (trabajo.data.portada) return trabajo.data.portada;
  return { tipo: 'pendiente', texto: 'Foto 3:2 pendiente' };
}

/** El caso anterior y el siguiente, en el orden del portfolio. Dan la vuelta. */
export async function vecinosDe(trabajo: Trabajo): Promise<[Trabajo, Trabajo]> {
  const trabajos = await obtenerTrabajos();
  const i = trabajos.findIndex((otro) => otro.id === trabajo.id);
  const total = trabajos.length;
  return [trabajos[(i - 1 + total) % total], trabajos[(i + 1) % total]];
}

/** El caso que protagoniza la franja oscura del home. */
export async function obtenerCasoDestacado(): Promise<Trabajo | undefined> {
  return (await obtenerTrabajos()).find((trabajo) => trabajo.data.cifras.length > 0);
}

export type FiltroDelPortfolio = {
  texto: string;
  href: string;
  cantidad: number;
  activo: boolean;
};

/**
 * Los filtros del portfolio. Cada uno es un link a una página estática: así
 * anda sin JavaScript, se comparte el link de "sólo eventos" y cada listado se
 * indexa por separado.
 */
export async function filtrosDelPortfolio(
  pilarActivo: Pilar | null,
): Promise<FiltroDelPortfolio[]> {
  const [trabajos, servicios, cuenta] = await Promise.all([
    obtenerTrabajos(),
    obtenerServicios(),
    contarPorPilar(),
  ]);
  return [
    {
      texto: 'Todos',
      href: '/trabajos',
      cantidad: trabajos.length,
      activo: pilarActivo === null,
    },
    ...servicios.map((servicio) => ({
      texto: servicio.data.nombre,
      href: `/trabajos/pilar/${servicio.id}`,
      cantidad: cuenta[servicio.id as Pilar],
      activo: servicio.id === pilarActivo,
    })),
  ];
}

/**
 * La franja de datos de la ficha. Si el caso trae la suya, va ésa; si no, se
 * arma con lo que hay seguro: cliente, tipo de producción y año.
 */
export async function fichaDeTrabajo(
  trabajo: Trabajo,
): Promise<{ rotulo: string; valor: string }[]> {
  if (trabajo.data.ficha.length > 0) return trabajo.data.ficha;
  return [
    { rotulo: 'Cliente', valor: trabajo.data.cliente ?? 'Pendiente del cliente' },
    { rotulo: 'Tipo', valor: await nombreDePilar(trabajo.data.pilar) },
    { rotulo: 'Año', valor: trabajo.data.fecha ?? 'Pendiente del cliente' },
  ];
}
