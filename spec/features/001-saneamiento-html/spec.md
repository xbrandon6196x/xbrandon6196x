# Spec — Saneamiento HTML (feature 001)

## Qué

El sitio se ve y funciona exactamente igual que hoy, pero su HTML pasa el
validador sin ningún error. Un visitante no nota cambio alguno; un lector
de pantalla navega el modal del juego y las etiquetas de las tarjetas sin
elementos mal declarados.

## Por qué

Es la fila 001 del roadmap y va primero a propósito: mientras los checks
heredados fallen, un «verde» no distingue errores nuevos de viejos. Con
esto, checks en verde pasa a ser requisito de cada commit y habilita el
bucle autónomo (`/arregla-checks`).

Nota: el roadmap hablaba de 28 errores; tras sincronizar con el rework
remoto del portafolio (18 commits de GitHub, 2026-07-11) quedan **21**.

## Alcance

**Incluye** (los 21 errores actuales de `html-validate`, por tipo):

- 7× `no-inline-style` — mover estilos inline a clases en `styles.css`
  (headers de 2 tarjetas de proyecto, 2 íconos de contacto, ícono del
  reproductor, párrafo del footer, columna VS del juego).
- 5× `hidden-focusable` — dejar de usar `aria-hidden` en el modal del
  juego; la visibilidad ya la controla `display: none` + clase `.open`.
- 3× `aria-label-misuse` — los `<div>` de etiquetas (hero, logro,
  oportunidades) reciben `role="group"` para que `aria-label` sea válido.
- 3× `element-permitted-content` — los `<p>` dentro de `<label>` del
  selector de mascota pasan a `<span>` (con su CSS ajustado).
- 2× `attribute-allowed-values` — los sprites del juego con `src=""`
  usan un GIF transparente en data URI hasta que el JS los rellena.
- 1× `no-raw-characters` — `R&D` → `R&amp;D`.

**NO incluye (explícito):**

- Cambios visuales, de contenido o de copy.
- SEO, `alt` descriptivos, contraste (eso es la feature 002).
- Optimización de imágenes (feature 003).
- Tocar la lógica del juego más allá del atributo `aria-hidden`.

## Criterios de aceptación

- [ ] `npx --yes html-validate index.html` pasa sin errores.
- [ ] `npx --yes linkinator index.html --skip "^https?://(?!localhost)"` sin enlaces rotos.
- [ ] Todo texto nuevo funciona en ES y EN (no hay texto nuevo; se verifica que ninguno se perdió).
- [ ] Se ve correcto en tema claro, tema oscuro y en móvil (≤900px).

Propios de esta feature:

- [ ] El sitio se ve idéntico a antes del cambio (headers de proyectos con
      sus gradientes, íconos de contacto/música al mismo tamaño, footer
      igual, tarjetas del juego iguales).
- [ ] El modal del juego abre, se juega una batalla y cierra con ✕, con
      Escape y con clic fuera; el foco vuelve a donde estaba.
- [ ] Los sprites del combate aparecen correctamente al iniciar batalla.

## Preguntas abiertas

Ninguna. (Decisión tomada: `role="group"` en vez de borrar los
`aria-label`, para conservar la intención de accesibilidad; los gradientes
de proyectos son colores de marca de cada proyecto y se quedan fijos, como
ya lo estaban inline.)
