# produccionesd10

Sitio de **Producciones D10**, productora uruguaya con 16 años de trayectoria: eventos,
producción audiovisual, programas de radio y televisión, y podcasts.

Para quién es: marcas, agencias, organismos y artistas que necesitan contratar
producción. Es un sitio comercial, no institucional.

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

| Ruta                | Qué es                                     | Estado                    |
| ------------------- | ------------------------------------------ | ------------------------- |
| `/`                 | home: claim, métricas, servicios, trabajos | andamiaje                 |
| `/servicios`        | los cuatro pilares                         | andamiaje                 |
| `/servicios/[slug]` | ficha de cada servicio                     | andamiaje                 |
| `/trabajos`         | portfolio                                  | andamiaje, faltan filtros |
| `/trabajos/[slug]`  | ficha de caso                              | andamiaje, falta galería  |
| `/nosotros`         | historia y equipo                          | andamiaje                 |
| `/clientes`         | muro de logos                              | vacío, falta material     |
| `/contacto`         | formulario de presupuesto                  | falta endpoint            |

## Estructura

```
src/
  datos/         sitio.ts · empresa.ts · servicios.ts · trabajos.ts
  componentes/   Cabezal.astro · PieDePagina.astro
  layouts/       Base.astro
  pages/         index · servicios/ · trabajos/ · nosotros · clientes · contacto
  estilos/       global.css
public/          robots.txt
```

## Desplegar

Cloudflare, Worker de assets sobre `dist/`, en la cuenta de Scalerics.

```bash
npm run build
npx wrangler deploy
```

Antes del primer deploy hay que completar `account_id` en `wrangler.jsonc`.

## Pendiente del cliente

- 6 a 8 trabajos reales con fotos en alta y nombre del cliente — **sin esto el sitio no
  se termina**
- Logos de clientes
- Teléfono, mail, WhatsApp y dirección
- Logo en vectorial de las dos marcas
- Reel institucional
- Razón social y RUT para el pie de página
- Dominio definido y comprado
