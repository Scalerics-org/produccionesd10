# Producciones D10

## Qué es

Sitio de **Producciones D10**, la casa productora uruguaya que hace el programa
Noche D10. 16 años de trayectoria, cuatro líneas de negocio: eventos (+1.800),
audiovisual, radio y TV, y podcasts. Dirección: Luis Betarte. Producción general:
Matías Bidegaray. Cliente de Scalerics.

Es un sitio comercial. El objetivo es una sola cosa: que entre una consulta. Hoy el
cliente no tiene teléfono ni mail público en ningún lado, así que literalmente no hay
forma de contratarlo.

## Estado

**Demo previa a reunión.** Andamiaje creado, diseño sin definir, y el portfolio está
lleno de placeholders porque el cliente todavía no nos pasó los trabajos.

## Reglas que no se negocian

1. Español rioplatense en todo, salvo lo que impone Astro.
2. Astro estático. Sin framework de UI, sin WebGL, sin GSAP. Animaciones con
   `animation-timeline: view()` y transiciones con la View Transitions API nativa.
3. Todo dato y texto vive en `src/datos/`.
4. El adaptador nunca decide: ningún `if` de negocio dentro de un componente.
5. Presupuesto medido, no estimado: home < 150 KB críticos, < 40 KB de JS, LCP < 2,5 s.
6. El hero con video necesita `poster`: el poster es el elemento LCP y el video arranca
   después del `load`, solo en desktop.
7. **No inventar clientes, casos ni logos.** Lo que falta va marcado con
   `esPlaceholder: true` o con `TODO:`.

## Trampas del dominio

- **Son dos marcas, no una.** _Noche D10_ es el programa y _Producciones D10_ es la
  productora. Comparten sistema de diseño, pero no se ven iguales: el programa es
  nocturno y con energía de piso de TV; la productora es más sobria y más portfolio.
  El repo del programa es `noched10`, al lado de éste.
- **El portfolio está casi vacío a propósito.** Solo Noche D10 y el podcast son casos
  reales y verificables. El resto son placeholders. Sin 6 a 8 casos con fotos, este
  sitio no se puede terminar: es el primer pedido al cliente.
- **Los +1.800 eventos son del director, no de la empresa.** El dato sale de la nota de
  prensa y habla de las producciones de Luis Betarte. Confirmar cómo quiere el cliente
  que se atribuya antes de ponerlo en un contador gigante.
- El formulario todavía no tiene endpoint. `action` apunta a `/api/contacto`, que no
  existe: hay que armar el Worker o cambiar a un servicio de formularios.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run verify     # format:check + astro check + build — lo mismo que CI
npm run build
npx wrangler deploy
```

## Estructura

```
src/
  datos/        # el dominio: sitio, empresa, servicios, trabajos
  componentes/  # Cabezal, PieDePagina
  layouts/      # Base.astro
  pages/        # una ruta por archivo (nombre impuesto por Astro)
  estilos/      # global.css con los tokens de marca
public/
```

El brief completo del cliente está en `../brief-d10.md`, fuera del repo.
