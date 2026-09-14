# produccionesd10

Sitio de **Producciones D10**, productora uruguaya con 16 años de trayectoria: eventos,
producción audiovisual, programas de radio y televisión, y podcasts.

Para quién es: marcas, agencias, organismos y artistas que necesitan contratar
producción. Es un sitio comercial, no institucional. El objetivo es uno solo: que entre
una consulta.

Es el sitio hermano de [`noched10`](https://github.com/Scalerics-org/noched10), que es el
del programa. Comparten el sistema de diseño pero no la piel: el programa es nocturno y
el fondo es negro; la productora es blanca, sobria y con el rojo como acento.

## Correr en local

```bash
npm install
npm run dev
```

Queda en **http://localhost:4321**.

## Comandos

| Comando           | Qué hace                                                  |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | servidor de desarrollo en el puerto 4321                  |
| `npm run build`   | genera el sitio estático en `dist/`                       |
| `npm run preview` | sirve `dist/` para revisarlo antes de desplegar           |
| `npm run check`   | chequeo de tipos de Astro                                 |
| `npm run format`  | formatea con Prettier                                     |
| `npm run verify`  | `format:check` + `check` + `build`: lo mismo que corre CI |

## Rutas

Las 22 páginas que genera el build:

| Ruta                      | Qué es                                           |
| ------------------------- | ------------------------------------------------ |
| `/`                       | hero, contadores, acordeón, trabajos, logos, CTA |
| `/servicios`              | los cuatro pilares                               |
| `/servicios/[slug]`       | ficha de cada pilar (4 páginas)                  |
| `/trabajos`               | portfolio completo                               |
| `/trabajos/pilar/[pilar]` | portfolio filtrado, una página por pilar (4)     |
| `/trabajos/[slug]`        | ficha de caso con galería (6 páginas)            |
| `/nosotros`               | historia, métricas y equipo                      |
| `/clientes`               | muro de logos                                    |
| `/contacto`               | formulario de presupuesto                        |
| `/gracias`                | confirmación después de enviar                   |
| `/404`                    | página de error                                  |

El filtro del portfolio **no usa JavaScript**: cada pilar es una página real, así que
anda sin JS, se puede compartir el link de un filtro y cada listado se indexa aparte.

## Archivos

Verificado contra `find` el 14/09/2026.

| Archivo                                    | Qué hace                                                          |
| ------------------------------------------ | ----------------------------------------------------------------- |
| `astro.config.mjs`                         | `site`, `trailingSlash: never`, sitemap y Tailwind                |
| `wrangler.jsonc`                           | Worker de assets + endpoint; falta pegar el `account_id`          |
| `tsconfig.json`                            | modo estricto; excluye `worker/`                                  |
| `worker/index.js`                          | `POST /api/contacto`; todo lo demás va a los assets               |
| `src/content.config.ts`                    | esquemas de las tres colecciones, apuntando a `src/datos/`        |
| `src/datos/sitio.ts`                       | metadatos, navegación, redes y destino del botón flotante         |
| `src/datos/empresa.ts`                     | métricas, `fundacion` para el JSON-LD, equipo, agrupador de miles |
| `src/datos/pilares.ts`                     | los cuatro slugs de pilar: fuente única de la taxonomía           |
| `src/datos/consultas.ts`                   | orden y filtros del dominio, para que no decidan las páginas      |
| `src/datos/servicios/*.md`                 | los 4 pilares (frontmatter + descripción)                         |
| `src/datos/trabajos/*.md`                  | los 6 trabajos                                                    |
| `src/datos/trabajos/imagenes/*.jpg`        | 18 imágenes de galería, **todas provisorias**                     |
| `src/datos/clientes.json`                  | 8 clientes, **todos casilleros vacíos**                           |
| `src/estilos/global.css`                   | tokens, contador CSS, carrusel y movimiento reducido              |
| `src/layouts/Base.astro`                   | `<head>` completo: canonical, OG, favicons, preload, JSON-LD      |
| `src/componentes/Hero.astro`               | poster LCP + video que arranca después del `load`                 |
| `src/componentes/Contadores.astro`         | contadores con `animation-timeline: view()`                       |
| `src/componentes/AcordeonPilares.astro`    | acordeón con `<details name>` nativo, sin JS                      |
| `src/componentes/ListaTrabajos.astro`      | grilla + filtro por pilar                                         |
| `src/componentes/TarjetaTrabajo.astro`     | tarjeta de trabajo con imagen optimizada                          |
| `src/componentes/CarruselLogos.astro`      | marquesina CSS sobre pista duplicada                              |
| `src/componentes/FormularioContacto.astro` | validación nativa + honeypot                                      |
| `src/componentes/BotonWhatsapp.astro`      | botón flotante                                                    |
| `src/componentes/DatosEstructurados.astro` | JSON-LD `Organization`                                            |
| `src/componentes/Cabezal.astro`            | cabezal pegajoso con estado activo                                |
| `src/componentes/PieDePagina.astro`        | pie con servicios y redes                                         |
| `public/video/`                            | poster AVIF + JPG y el video en WebM y MP4, **provisorios**       |
| `public/logos/cliente-0*.svg`              | 8 logos placeholder                                               |
| `public/favicon*`                          | favicon `.ico` (16/32/48) y PNG de 192 y 512, **provisorios**     |
| `public/og-por-defecto.jpg`                | imagen OG por defecto, **provisoria**                             |
| `scripts/bootstrap-repo.*`                 | arranque del repo según el manual de Scalerics                    |

## Números medidos

Medidos sobre `npm run build && npm run preview`, en Chromium, viewport de 1366×900.
No son estimaciones.

| Métrica                 | Presupuesto | Medido                        |
| ----------------------- | ----------- | ----------------------------- |
| Transferencia crítica   | < 150 KB    | **28,3 KB**                   |
| JavaScript              | < 40 KB     | **0 KB** en archivos externos |
| LCP (sin throttling)    | < 2,5 s     | **132 ms**                    |
| LCP (1,6 Mbps · CPU 4×) | < 2,5 s     | **636 ms**                    |
| CLS                     | < 0,1       | **0,000**                     |

Los LCP varían unas decenas de milisegundos entre corridas; el resto es estable.

El elemento LCP es el poster del hero (`hero-poster.avif`, 8,7 KB). El video se pide
recién **después** del evento `load` y sólo en viewport de escritorio: en el viewport de
390 px no se pide nunca.

El único JavaScript del sitio son ~15 líneas en línea en el hero, que arrancan el video.
No hay un solo archivo `.js` externo.

## Accesibilidad

- Contrastes verificados: todos los pares de la paleta pasan AA. El rojo del escudo
  sobre fondo oscuro da 3,34:1 y **no** se usa para texto: ahí va `--color-rojo-claro`
  (6,30:1). Los números están anotados en `src/estilos/global.css`.
- Los 35 controles enfocables de la home se recorren con `Tab`, todos con anillo de foco
  visible. El acordeón se abre con Enter.
- Los contadores animados llevan el número real en un `sr-only`: el texto que genera CSS
  con `counter()` va con `aria-hidden`.
- Con `prefers-reduced-motion: reduce` el carrusel se frena, el contador muestra el valor
  final sin contar y el video del hero no se carga.

## Desplegar

Cloudflare, en la cuenta de Scalerics. Un solo Worker sirve los assets estáticos de
`dist/` y atiende `POST /api/contacto`.

```bash
npm run build
npx wrangler deploy
```

Antes del primer deploy:

1. Completar `account_id` en `wrangler.jsonc`.
2. Cambiar el dominio en `astro.config.mjs` (`site`), `src/datos/sitio.ts` (`url`) y
   `public/robots.txt`.
3. Configurar el destino de las consultas del formulario:

   ```bash
   npx wrangler secret put DESTINO_CONSULTAS
   ```

   Es la URL a la que el Worker reenvía cada consulta como JSON. **Mientras no esté,
   el formulario responde 503 y lo dice**: valida y filtra bots, pero no entrega. Se
   eligió eso antes que mostrar un "gracias" falso.

## Pendiente del cliente

Sin esto el sitio no se termina:

- **6 a 8 trabajos reales con fotos en alta y nombre del cliente** — hoy hay 2 casos
  verificables y 4 fichas de relleno
- Logos de clientes — hoy son 8 casilleros
- Teléfono, WhatsApp, mail y dirección — hoy no hay ninguna vía directa de contacto
- Destino del formulario (mail o webhook)
- Logo en vectorial de las dos marcas — el favicon y la imagen OG son provisorios
- Reel institucional — el video del hero es un fondo generado
- Bio de Matías Bidegaray y fotos del equipo
- Razón social y RUT para el pie de página
- Confirmar si los +1.800 eventos se atribuyen a la empresa o a Luis Betarte
- Dominio definido y comprado
