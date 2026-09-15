# produccionesd10

Sitio de **Producciones D10**, productora uruguaya con 16 años de trayectoria: eventos,
producción audiovisual, programas de radio y televisión, y podcasts.

Para quién es: marcas, agencias, organismos y artistas que necesitan contratar
producción. Es un sitio comercial, no institucional. El objetivo es uno solo: que entre
una consulta.

Es el sitio hermano de [`noched10`](https://github.com/Scalerics-org/noched10), que es el
del programa. Comparten el sistema de diseño pero no la piel: el programa es nocturno y
el fondo es negro; la productora vive sobre hueso, con tinta negra y el rojo como acento.

El diseño sale de Claude Design (`Producciones D10.dc.html`, sistema Modernist).

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

| Ruta                      | Qué es                                                |
| ------------------------- | ----------------------------------------------------- |
| `/`                       | reel, contadores, pilares, trabajos, logos, contacto  |
| `/servicios`              | los cuatro pilares                                    |
| `/servicios/[slug]`       | servicio: qué incluye, cómo trabajamos, trabajos (4)  |
| `/trabajos`               | portfolio completo                                    |
| `/trabajos/pilar/[pilar]` | portfolio filtrado, una página por pilar (4)          |
| `/trabajos/[slug]`        | ficha de caso: ficha, qué se hizo, galería, resultado |
| `/nosotros`               | historia, dirección y equipo                          |
| `/clientes`               | muro de logos                                         |
| `/contacto`               | formulario de presupuesto y datos de la casa          |
| `/gracias`                | confirmación después de enviar                        |
| `/404`                    | página de error                                       |

El filtro del portfolio **no usa JavaScript**: cada pilar es una página real, así que
anda sin JS, se puede compartir el link de un filtro y cada listado se indexa aparte.

## Archivos

Verificado contra `ls` el 14/09/2026.

| Archivo                                       | Qué hace                                                        |
| --------------------------------------------- | --------------------------------------------------------------- |
| `astro.config.mjs`                            | `site`, `trailingSlash: never`, sitemap y Tailwind              |
| `wrangler.jsonc`                              | Worker de assets + endpoint; falta pegar el `account_id`        |
| `tsconfig.json`                               | modo estricto; excluye `worker/`                                |
| `worker/index.js`                             | `POST /api/contacto`; todo lo demás va a los assets             |
| `src/content.config.ts`                       | esquemas de las tres colecciones, apuntando a `src/datos/`      |
| `src/datos/sitio.ts`                          | metadatos, menú, redes, textos de contacto y canal directo      |
| `src/datos/empresa.ts`                        | métricas, `fundacion`, equipo, historia e hitos de /nosotros    |
| `src/datos/home.ts`                           | los textos del home, en orden                                   |
| `src/datos/formulario.ts`                     | campos, errores y patrón del formulario: contrato con el Worker |
| `src/datos/pilares.ts`                        | los cuatro slugs de pilar: fuente única de la taxonomía         |
| `src/datos/consultas.ts`                      | orden, filtros, ficha y visual de cada trabajo                  |
| `src/datos/servicios/*.md`                    | los 4 pilares: titular, qué incluye, pasos, cierre y visual     |
| `src/datos/trabajos/*.md`                     | los 6 trabajos (2 reales, 4 provisorios)                        |
| `src/datos/trabajos/imagenes/*.jpg`           | 18 imágenes de galería, **todas provisorias**                   |
| `src/datos/marca/noche-d10-escudo.jpg`        | escudo de Noche D10, tal como vino del diseño                   |
| `src/datos/clientes.json`                     | 8 clientes, **todos casilleros vacíos**                         |
| `src/estilos/global.css`                      | tokens, fuente, utilidades del sistema, contador y carrusel     |
| `src/layouts/Base.astro`                      | `<head>`: canonical, OG, favicons, preloads y JSON-LD           |
| `src/componentes/Cabezal.astro`               | cabezal claro u oscuro y menú de celular con `<details>`        |
| `src/componentes/Logotipo.astro`              | lockup tipográfico **provisorio** "D10 · De Diez Producciones"  |
| `src/componentes/Hero.astro`                  | poster LCP + video que arranca después del `load`               |
| `src/componentes/Contadores.astro`            | contadores con `animation-timeline: view()`                     |
| `src/componentes/AcordeonPilares.astro`       | los cuatro pilares con `<details name>` nativo                  |
| `src/componentes/GrillaTrabajos.astro`        | grilla de celdas con reglas de 2 px                             |
| `src/componentes/TarjetaTrabajo.astro`        | tarjeta de trabajo                                              |
| `src/componentes/VisualTrabajo.astro`         | foto, logo, rótulo o casillero pendiente de una tarjeta         |
| `src/componentes/ListaTrabajos.astro`         | filtro segmentado por pilar + grilla                            |
| `src/componentes/PaginaPortfolio.astro`       | cuerpo compartido de /trabajos y /trabajos/pilar/[pilar]        |
| `src/componentes/PestanasPilares.astro`       | barra de pilares de las páginas de servicio                     |
| `src/componentes/ListaNumerada.astro`         | "Qué incluye" y "Qué se hizo"                                   |
| `src/componentes/CasoDestacado.astro`         | franja del caso destacado del home                              |
| `src/componentes/CarruselLogos.astro`         | marquesina CSS sobre pista duplicada                            |
| `src/componentes/CierreRojo.astro`            | cierre en rojo de cada página                                   |
| `src/componentes/FormularioContacto.astro`    | seis campos, validación nativa, `:user-invalid` y honeypot      |
| `src/componentes/CanalDirecto.astro`          | tarjeta de WhatsApp; lleva al formulario mientras no hay número |
| `src/componentes/DatosDeContacto.astro`       | teléfono, mail y redes, con los pendientes a la vista           |
| `src/componentes/BotonWhatsapp.astro`         | botón flotante                                                  |
| `src/componentes/DatosEstructurados.astro`    | JSON-LD `Organization`                                          |
| `src/componentes/PieDePagina.astro`           | pie con secciones y redes                                       |
| `src/pages/`                                  | una ruta por archivo, ver la tabla de rutas                     |
| `public/fuentes/archivo-latin-variable.woff2` | Archivo variable, subconjunto latino (licencia OFL)             |
| `public/video/`                               | poster AVIF + JPG y el video en WebM y MP4, **provisorios**     |
| `public/logos/cliente-0*.svg`                 | 8 logos placeholder                                             |
| `public/favicon.ico`, `public/favicon-*.png`  | favicon `.ico` y PNG de 192 y 512, **provisorios**              |
| `public/og-por-defecto.jpg`                   | imagen OG por defecto, **provisoria**                           |
| `public/robots.txt`                           | robots, apunta al sitemap                                       |
| `scripts/bootstrap-repo.*`                    | arranque del repo según el manual de Scalerics                  |

## Números medidos

Lighthouse 12 sobre `npm run build && npm run preview`, home, después del rediseño. No
son estimaciones.

| Métrica             | Presupuesto | Desktop     | Mobile (4G simulado) |
| ------------------- | ----------- | ----------- | -------------------- |
| Transferencia total | < 150 KB    | **88,8 KB** | **70,7 KB**          |
| JavaScript          | < 40 KB     | **0 KB**    | **0 KB**             |
| LCP                 | < 2,5 s     | **384 ms**  | **1.831 ms**         |
| CLS                 | < 0,1       | **0,000**   | **0,005**            |
| Performance · A11y  | —           | 100 · 100   | 98 · 100             |

El elemento LCP es el poster del hero (`hero-poster.avif`, 8,7 KB). El video se pide
recién **después** del `load` (37 ms, medido por CDP) y sólo en escritorio: en 390 px no
se pide nunca. La fuente (34,4 KB) es la mitad del peso de la home.

El único JavaScript del sitio son ~15 líneas en línea en el hero, que arrancan el video.

## Accesibilidad

- Contrastes medidos y anotados en `src/estilos/global.css`. Dos desvíos deliberados del
  diseño: el rojo `#c8102e` sobre negro da 3,37:1, así que el texto rojo sobre fondo
  oscuro va en `--color-rojo-claro` (6,34:1); y el gris `#7a7a7a` sobre hueso (3,87:1)
  pasó a `--color-plomo` `#5c5c5c` (6,02:1).
- Todo se recorre con `Tab` con foco visible, incluido el menú de celular, que abre y
  cierra con Enter.
- Los errores del formulario aparecen recién después de tocar el campo o de intentar
  enviar (`:user-invalid`), en rojo y con una línea que dice qué falta.
- Los contadores llevan el número real en un `sr-only`.
- Con `prefers-reduced-motion: reduce` el carrusel se frena, el contador muestra el valor
  final y el video del hero no se carga.

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

   Es la URL a la que el Worker reenvía cada consulta como JSON. **Mientras no esté, el
   formulario responde 503 y lo dice**: valida y filtra bots, pero no entrega. Se eligió
   eso antes que mostrar un "gracias" falso.

## Pendiente del cliente

Sin esto el sitio no se termina:

- **6 a 8 trabajos reales con fotos en alta y nombre del cliente** — hoy hay 2 casos
  verificables y 4 fichas de relleno
- Logos de clientes — hoy son 8 casilleros
- Teléfono, WhatsApp y mail — hoy no hay ninguna vía directa de contacto
- Destino del formulario (mail o webhook)
- Logo en vectorial — el cabezal usa un lockup tipográfico provisorio y el favicon y la
  imagen OG también son provisorios
- Reel institucional y su poster — el video del hero es un fondo generado
- Retratos y bio de Matías Bidegaray; nombres, roles y fotos del equipo
- Años de la historia (eventos y paso a TV), que el diseño daba como tentativos
- Razón social, RUT y dónde está la empresa (el diseño decía "Colonia")
- Confirmar las promesas del copy del diseño: respuesta el mismo día hábil, briefing de
  20 minutos con Luis, precio cerrado, entrega en 48 horas, estudio y equipo propios
- Confirmar si los +1.800 eventos se atribuyen a la empresa o a Luis Betarte
- Dominio definido y comprado
