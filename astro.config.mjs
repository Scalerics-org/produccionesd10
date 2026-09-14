// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/*
  Sitio estático.

  `site` se usa para el canonical, el sitemap y las URL absolutas de las
  etiquetas OG: cuando esté definido el dominio se cambia acá, en public/robots.txt
  y en src/datos/sitio.ts, y en ningún lado más.
*/
export default defineConfig({
  site: 'http://localhost:4321',

  /*
    Sin barra final, y tiene que coincidir con `html_handling` de
    wrangler.jsonc. Si Cloudflare sirve /trabajos y el canonical dice
    /trabajos/, cada página queda anunciándose en una URL distinta de la que
    responde: señal de contenido duplicado servida en bandeja.
  */
  trailingSlash: 'never',

  integrations: [
    sitemap({
      // El 404 y el gracias no van al sitemap: no son páginas para buscar.
      filter: (pagina) => !/\/(404|gracias)\/?$/.test(pagina),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
