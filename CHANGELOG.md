# Changelog

Todos los cambios notables de Producciones D10.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [No publicado]

### Cambiado

- Rediseño completo según `Producciones D10.dc.html` de Claude Design: fondo hueso,
  tinta negra, rojo de acento, reglas de 2 px y cero radio. Home, servicios,
  portfolio, ficha de caso, nosotros, contacto y menú de celular.
- Archivo autoalojada como única familia tipográfica, en lugar de Archivo + Inter.
- Formulario de seis campos: "Qué necesitás" como control segmentado, mail o
  teléfono en un solo campo y fecha estimada. Estados de error con `:user-invalid`.
- El Worker acepta mail o teléfono y toma nombres y límites de `src/datos/formulario.ts`.
- Servicios y casos con más datos en las colecciones: titular, qué incluye, pasos,
  ficha, qué se hizo y cifras.

### Agregado

- Andamiaje inicial: Astro 7 estático, Tailwind 4, TypeScript, sitemap.
- Piso mínimo de archivos según el manual de arranque de Scalerics.
- Datos del cliente relevados en `src/datos/`.
- Tokens propios de la productora: paleta clara, neutra y con el rojo del escudo
  como acento. Contrastes verificados contra AA y anotados en el CSS.
- Content collections `servicios`, `trabajos` y `clientes`, con los archivos de
  contenido dentro de `src/datos/` para no partir el dominio en dos carpetas.
- Home completa: hero con video de fondo y poster AVIF, contadores animados con
  `animation-timeline: view()`, acordeón de los cuatro pilares, seis trabajos
  destacados, carrusel de logos y llamado a la acción.
- Filtro del portfolio por pilar sin JavaScript: una página estática por pilar.
- Ficha de trabajo con galería, resultado y trabajos relacionados.
- Formulario de presupuesto con validación nativa y honeypot, y Worker de
  Cloudflare en `worker/index.js` para `POST /api/contacto`.
- Botón flotante de contacto: lleva a WhatsApp cuando haya número y al
  formulario mientras tanto.
- SEO: JSON-LD `Organization` con `foundingDate` y `sameAs`, canonical sin barra
  final, OG y Twitter por página, sitemap, robots y favicons.
- Páginas `/gracias` y `/404`.

### Corregido

- El contador del home no contaba. Eran dos cosas: el minificador plegaba
  `animation` y `animation-timeline` en un shorthand inválido que el navegador
  descartaba entero, y `--n` estaba registrado con `inherits: false`, así que el
  `::after` que dibuja el número nunca veía el valor animado.
- El `<video>` del hero se bajaba el JPEG del poster (18,1 KB) aunque no tuviera
  `src`: era el recurso crítico más pesado y no se usaba. Se quitó el atributo
  `poster` y el poster quedó sólo en el `<picture>` de atrás.
- El canonical salía con barra final y Cloudflare sirve sin barra: dos URLs para
  la misma página. Se fijó `trailingSlash: 'never'`.
- El contenedor del carrusel recibía foco por ser scrolleable pero no tenía
  nombre accesible.
