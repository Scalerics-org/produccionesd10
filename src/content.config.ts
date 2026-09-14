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

const servicios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/datos/servicios' }),
  schema: z.object({
    nombre: z.string(),
    /** Una línea. Es lo que se lee en el menú y en la tarjeta del home. */
    bajada: z.string(),
    /** Orden en el que se muestran los pilares. El negocio manda, no el alfabeto. */
    orden: z.number().int(),
    incluye: z.array(z.string()).min(1),
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
