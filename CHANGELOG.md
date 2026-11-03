# Changelog

Todos los cambios notables de Producciones D10.
Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [No publicado]

### Cambiado (logo, noviembre de 2026)

- El sello "Canal D10 Producciones" que mandó el cliente reemplaza al lockup
  tipográfico provisorio en el cabezal y el pie, y genera el favicon y la imagen OG.

### Agregado (movimiento, noviembre de 2026)

- La foto de la tarjeta se convierte en la portada de la ficha (view transition entre
  páginas, nombres únicos por página desde `src/datos/transiciones.ts`).
- El reel del hero se revela con una máscara y lleva grano encima; el poster no se
  toca, así que el LCP no cambia.
- Fotos que se acercan dentro de su marco al pasar el mouse o con el foco, acordeón de
  servicios que desliza y titulares que se revelan al entrar.
- Todo se apaga con movimiento reducido y donde no hay soporte queda quieto. El
  contador del home no se tocó.

### Mejorado (pasada de pulido visual, noviembre de 2026)

- `DESIGN.md` con los tokens por rol y el porqué de cada color, y `PRODUCT.md`.
- Si el envío falla, el Worker devuelve lo escrito para copiarlo y los links a
  Instagram y Facebook, sin jerga interna. Aviso arriba del formulario mientras no
  esté conectado (`formularioConectado`).
- Un solo CTA por pantalla: sin número de WhatsApp no se pinta el canal directo
  duplicado, sale "Presupuesto" del cabezal mobile y el botón flotante no aparece en
  /contacto, en /gracias ni sobre el hero.
- Foco visible sobre el cierre rojo (`foco-claro`) y en los campos; bordes de campo a
  5:1; errores con texto, ✕ y `aria-describedby`; estado "Enviando consulta…".
- Menú mobile con `inert` y cierre con Esc; h1 de las fichas sin desborde a 320 px;
  texto del caso visible en mobile; áreas táctiles de 44 px; piso de 11 px.

### Corregido (pedidos de la reunión con el cliente, noviembre de 2026)

- Caso Noche D10: "La 30 TV" en lugar de "VIVO TV" y 6.802 invitados, confirmados por
  el cliente.

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
