---
version: alpha
name: Producciones D10
description: La versión sobria de la familia D10. Fondo hueso, tinta negra, el rojo del escudo como único color, Archivo, reglas de 2 px, radio cero y fotos en blanco y negro.
colors:
  fondo: '#f4f3ef'
  banda: '#eae9e5'
  fondo-invertido: '#0a0a0a'
  fondo-invertido-2: '#161616'
  texto: '#0a0a0a'
  texto-suave: '#2a2a2a'
  texto-tenue: '#5c5c5c'
  texto-sobre-invertido: '#d8d6d0'
  texto-tenue-sobre-invertido: '#9a9a9a'
  acento: '#c8102e'
  acento-hondo: '#8d0b20'
  acento-sobre-invertido: '#f2607a'
  sobre-acento: '#f4f3ef'
typography:
  rotulo:
    fontFamily: Archivo
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.14em
  kicker:
    fontFamily: Archivo
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.2em
  boton:
    fontFamily: Archivo
    fontSize: 12px
    fontWeight: 600
    letterSpacing: 0.08em
  cuerpo:
    fontFamily: Archivo
    fontSize: 15px
    lineHeight: 1.55
  titulo-seccion:
    fontFamily: Archivo
    fontSize: 34px
    fontWeight: 800
    letterSpacing: -0.03em
  titular:
    fontFamily: Archivo
    fontSize: 62px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.035em
rounded:
  ninguno: 0px
spacing:
  lienzo: 1180px
  marco-mobile: 16px
  marco-desktop: 34px
components:
  boton-primario:
    backgroundColor: '{colors.acento}'
    textColor: '{colors.sobre-acento}'
    rounded: '{rounded.ninguno}'
    height: 48px
  boton-primario-hover:
    backgroundColor: '{colors.acento-hondo}'
    textColor: '{colors.sobre-acento}'
  boton-invertido:
    backgroundColor: '{colors.fondo-invertido}'
    textColor: '{colors.fondo}'
    rounded: '{rounded.ninguno}'
    height: 52px
  campo:
    backgroundColor: '{colors.fondo}'
    textColor: '{colors.texto}'
    rounded: '{rounded.ninguno}'
  metadato:
    backgroundColor: '{colors.fondo}'
    textColor: '{colors.texto-tenue}'
  kicker-sobre-invertido:
    backgroundColor: '{colors.fondo-invertido}'
    textColor: '{colors.acento-sobre-invertido}'
  texto-apagado-sobre-invertido:
    backgroundColor: '{colors.fondo-invertido}'
    textColor: '{colors.texto-tenue-sobre-invertido}'
---

## Overview

Producciones D10 es la casa que hace Noche D10, y el sitio es la versión sobria y de
portfolio de esa familia. Sale del diseño aprobado en Claude Design ("Producciones
D10.dc.html", sistema Modernist). Su único trabajo es que entre una consulta.

Comparte con Noche D10 (repo `noched10`) la grilla, las reglas de 2 px, el radio cero y
Archivo. Lo que separa las marcas es el fondo y la cantidad de rojo: la productora vive
sobre hueso con tinta negra y el rojo como acento; el programa se queda con el negro
nocturno. Hoy son dos archivos de tokens separados. Unificarlos en una sola definición
con dos acentos es una decisión pendiente.

## Colors

Los nombres de arriba son por rol. En `src/estilos/global.css` los tokens todavía se
llaman por valor y el rol vive en los comentarios. Renombrarlos es una tarea aparte, y
se hace por rol, nunca con buscar y reemplazar de hex:

| Rol                         | Token en `global.css` |
| --------------------------- | --------------------- |
| fondo / sobre-acento        | `--color-hueso`       |
| banda                       | `--color-hueso-hondo` |
| texto / fondo-invertido     | `--color-tinta`       |
| fondo-invertido-2           | `--color-carbon`      |
| texto-suave                 | `--color-humo`        |
| texto-tenue                 | `--color-plomo`       |
| texto-sobre-invertido       | `--color-ceniza`      |
| texto-tenue-sobre-invertido | `--color-niebla`      |
| acento                      | `--color-rojo`        |
| acento-hondo                | `--color-rojo-hondo`  |
| acento-sobre-invertido      | `--color-rojo-claro`  |

- **Rojo D10 (#c8102e)** es el del escudo del cliente. Sobre hueso da 5,30:1, igual que
  hueso sobre rojo, así que sirve para texto y para el campo de los cierres. Sobre
  tinta da 3,37:1 y no pasa con texto chico: ahí el texto rojo va en **rojo claro
  (#f2607a, 6,34:1)**. Es un desvío deliberado del diseño, que ponía kickers de 11 px en
  #c8102e sobre negro.
- **Plomo (#5c5c5c)** reemplaza al #7a7a7a del diseño, que daba 3,87:1.
- **Una sola tinta de color.** Las fotos van siempre en blanco y negro (`.foto-byn`)
  para que el rojo sea el único color de la página.
- El rojo como campo solo va en los cierres grandes (`CierreRojo`). En texto corrido
  sobre hueso, el párrafo va negro.

## Typography

Una sola familia, **Archivo** variable, subconjunto latino de 34,9 KB, autoalojada
(licencia SIL OFL 1.1). Seis tamaños. Los titulares van en 800 con tracking negativo y
las etiquetas (`kicker`, `rotulo`) en versalita espaciada de 11 px, que es el piso:
nada que se tenga que leer va más chico. La única excepción es el rótulo del contador
del home, que sigue en 10 px en desktop porque ese componente no se toca (ver
`CLAUDE.md`).

## Layout

El contenido respeta un lienzo de 1180 px centrado (`lienzo`) con margen de 34 px en
desktop (`marco`) y 16 px en mobile. Las etiquetas van alineadas a la izquierda, también
adentro de los botones.

## Elevation & Depth

Cero sombras. Las celdas se separan con reglas de 2 px y bandas (`banda`), y las tramas
de líneas finas (`trama-oscura`, `trama-clara`) son el "sin foto todavía" del sistema.

## Shapes

Radio cero en todo.

## Components

- **Botón** (`boton`): plano, sin radio, etiqueta a la izquierda y flecha a la derecha,
  alto mínimo de 48 px.
- **Un solo CTA por pantalla.** Mientras no haya número de WhatsApp, el "canal directo"
  llevaría al mismo formulario, así que no se pinta (`canalDirecto.esOtroCanal`). El
  botón flotante no aparece en /contacto ni en /gracias, ni mientras se ve el hero.
- **Formulario**: label visible arriba de cada campo, "(opcional)" donde corresponde,
  borde `tinta/60` (5,08:1), foco con anillo de 2 px en tinta (el rojo ya quiere decir
  error), error al lado del campo con texto y una ✕, y estado "Enviando consulta…" que
  ignora el segundo envío.
- **Foco**: anillo global rojo de 2 px con separación de 2 px; sobre el campo rojo de
  los cierres va en hueso (`foco-claro`).
- **Error del envío**: el Worker devuelve lo que la persona escribió para que lo
  copie, y los links a Instagram y Facebook. Un "gracias" falso es peor que un error
  honesto.

## Do's and Don'ts

- No escribir `animation` como shorthand al lado de `animation-timeline` ni sacar el
  `inherits: true` de `--n`: el contador del home queda en cero sin avisar.
- No usar el rojo D10 para texto chico sobre tinta.
- No poner fotos a color.
- No inventar clientes ni casos: lo que falta va con `esPlaceholder: true`.
- Toda animación respeta `prefers-reduced-motion`: el hero muestra el poster, el
  contador muestra el número final y el carrusel de logos se frena con hover y foco.

## Detector de Impeccable

Reglas exceptuadas en `.impeccable/config.json`, porque son la marca y no un descuido:

- `all-caps-body`, `hero-eyebrow-chip` y `kicker-above-heading`: las etiquetas en
  versalita espaciada arriba de cada título son el lenguaje de placa de TV del cliente.
- `tight-leading`: los titulares van condensados y apretados (0,9 a 0,98) a propósito.
- `repeating-stripes-gradient`: la trama de líneas finas es el "sin foto todavía" del
  sistema, no decoración.

Falsos positivos verificados que no se exceptúan, para no esconder casos reales:
`low-contrast` sobre la trama oscura (el detector toma el color de las líneas al 5 %
como fondo; el texto real es hueso sobre #161616, unos 16:1), `text-occlusion` en los
links del menú mobile (están dentro de un `<details>` cerrado) y el texto de 6 px de
"DE DIEZ PRODUCCIONES", que es parte del logo.
