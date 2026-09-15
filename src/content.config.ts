import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';
import { pilares } from './datos/pilares';

/*
  Las colecciones viven en `src/datos/`, no en `src/content/`.

  La regla 3 del repo dice que todo dato y texto vive en `src/datos/`, y el
  loader `glob` acepta una base, así que no hay motivo para partir el dominio
  en dos carpetas: el esquema se declara acá y el contenido queda donde
  corresponde.
*/

/** Un ítem con título y una línea de detalle: "Qué incluye", "Cómo trabajamos". */
const itemConDetalle = z.object({ titulo: z.string(), detalle: z.string() });

const servicios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/datos/servicios' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      /** Una línea. Es lo que se lee en el acordeón del home. */
      bajada: z.string(),
      /** Orden en el que se muestran los pilares. El negocio manda, no el alfabeto. */
      orden: z.number().int(),
      /** El título grande del hero del servicio. */
      titular: z.string(),
      /** El párrafo del hero y del acordeón del home. */
      descripcion: z.string(),
      /** La línea que acompaña a "Qué incluye". */
      notaIncluye: z.string(),
      incluye: z.array(itemConDetalle).min(1),
      /** "Cómo trabajamos": el diseño lo resuelve en cuatro pasos. */
      pasos: z.array(itemConDetalle).length(4),
      /** La frase del cierre en rojo. */
      cierre: z.string(),
      ctaPrincipal: z.string(),
      ctaSecundario: z.object({ texto: z.string(), href: z.string() }),
      /**
       * Lo que ocupa la columna derecha del hero. Mientras no haya foto, el
       * casillero dice qué foto falta: un hueco explicado es mejor que un stock.
       */
      visual: z.discriminatedUnion('tipo', [
        z.object({ tipo: z.literal('pendiente'), texto: z.string() }),
        /* Foto de stock marcada como provisoria mientras falta la del cliente. */
        z.object({ tipo: z.literal('foto'), imagen: image(), alt: z.string() }),
        z.object({ tipo: z.literal('logo'), imagen: image(), alt: z.string() }),
        z.object({ tipo: z.literal('rotulo'), texto: z.string(), detalle: z.string() }),
      ]),
    }),
});

const trabajos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/datos/trabajos' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      /** `null` mientras el cliente no confirme si se puede nombrar. */
      cliente: z.string().nullable(),
      pilar: z.enum(pilares),
      /*
        Año o año-mes, no una fecha completa: de casi todos los trabajos sabemos
        el año y nada más. Poner un 1 de enero inventado sería peor que no
        tenerlo, y así igual ordena bien porque ordena como texto.
      */
      fecha: z
        .string()
        .regex(/^\d{4}(-\d{2})?$/, 'Usá YYYY o YYYY-MM')
        .nullable(),
      resumen: z.string(),
      /** Qué se logró. Es lo que convierte un trabajo en un caso. */
      resultado: z.string().nullable(),
      galeria: z
        .array(
          z.object({
            imagen: image(),
            alt: z.string(),
            esPlaceholder: z.boolean().default(false),
          }),
        )
        .default([]),
      /**
       * Qué va en la tarjeta cuando no hay foto real: el logo del trabajo (el
       * escudo de Noche D10) o un rótulo tipográfico ("Spotify").
       */
      portada: z
        .discriminatedUnion('tipo', [
          z.object({ tipo: z.literal('logo'), imagen: image(), alt: z.string() }),
          z.object({ tipo: z.literal('rotulo'), texto: z.string() }),
        ])
        .optional(),
      /** La franja de datos del caso: Cliente, Rol, Emisión, Desde. */
      ficha: z.array(z.object({ rotulo: z.string(), valor: z.string() })).default([]),
      /** "Qué se hizo". */
      hicimos: z.array(itemConDetalle).default([]),
      /** Las cifras del resultado. El valor va como texto: "3.000", "+6.800". */
      cifras: z
        .array(z.object({ valor: z.string(), etiqueta: z.string(), corta: z.string() }))
        .default([]),
      /** Si es true, la ficha se publica con el cartel de "pendiente". */
      esPlaceholder: z.boolean().default(false),
      destacado: z.boolean().default(false),
    }),
});

const clientes = defineCollection({
  loader: file('./src/datos/clientes.json'),
  schema: z.object({
    nombre: z.string(),
    /** Ruta dentro de `public/`. Los logos reales entran por acá. */
    logo: z.string(),
    esPlaceholder: z.boolean().default(false),
  }),
});

export const collections = { servicios, trabajos, clientes };
