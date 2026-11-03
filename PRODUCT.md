# Product

Sitio de **Producciones D10**, productora uruguaya con 16 años de trayectoria y cuatro
líneas de negocio: eventos, audiovisual, radio y TV, y podcasts. Hace el programa Noche
D10. Dirección: Luis Betarte. Producción general: Matías Bidegaray. Cliente de Scalerics.

## Platform

web

## Stack

Astro estático, Tailwind 4, sin framework de UI. Cloudflare Workers con assets; el Worker
solo atiende `POST /api/contacto`.

## Users

- Marcas, organismos y artistas que buscan quién les produzca un evento, un programa,
  un podcast o una pieza audiovisual.
- Gente que llega desde Noche D10 y quiere saber quién está detrás.

## Product Purpose

Que entre una consulta comercial. Hoy el cliente no tiene teléfono ni mail público, así
que no hay forma de contratarlo.

## Positioning

Una productora que hace lo que sale al aire: 16 años sosteniendo un programa semanal
propio es la prueba de lo que hace para otros.

## Operating Context

Se llega desde Google por un servicio o desde el programa. Se decide mirando trabajos
reales. El portfolio está casi vacío hasta que el cliente mande los casos.

## Capabilities and Constraints

- Home con menos de 150 KB críticos y menos de 40 KB de JS; LCP menor a 2,5 s.
- El hero con video necesita `poster`; el video arranca después del `load` y solo en
  desktop.
- El formulario valida pero no entrega hasta que exista el destino de las consultas:
  sin eso responde 503 y lo dice.

## Brand Commitments

Comparte sistema con Noche D10 (Archivo, reglas de 2 px, radio cero) pero es la versión
sobria: fondo hueso, tinta negra, rojo D10 de acento y fotos en blanco y negro.

## Evidence on Hand

Investigación en `../brief-d10.md`; lo hablado con el cliente en `../BITACORA.md`.

## Product Principles

- Un solo CTA por pantalla. Cuando el cliente pase el número, es WhatsApp con el
  mensaje armado; mientras tanto, el formulario.
- No inventar clientes, casos ni logos: lo que falta va marcado como placeholder.
- Un "gracias" falso es peor que un error honesto.

## Accessibility & Inclusion

WCAG 2.2 AA, foco visible también sobre las zonas rojas, áreas táctiles de 44 px y
`prefers-reduced-motion` respetado en el video, el contador y el carrusel.
