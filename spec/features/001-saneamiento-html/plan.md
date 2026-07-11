# Plan — Saneamiento HTML (feature 001)

## Enfoque

Corregir los 21 errores en su causa, tipo por tipo, sin tocar apariencia ni
comportamiento: estilos inline → clases nuevas en `styles.css`; el modal
deja de declarar `aria-hidden` (su visibilidad ya la da `display:none` /
`.open`, que también lo saca del árbol de accesibilidad); `role="group"`
donde había `aria-label` sobre `<div>`; `<p>`→`<span>` dentro de los
`<label>` del juego (con su selector CSS); `src=""` → GIF transparente en
data URI; y `&`→`&amp;`. Cada cambio de HTML que dependa de CSS o JS se
hace en el mismo paso para que el sitio nunca quede roto.

**Alternativa descartada:** relajar reglas de `html-validate` con un
`.htmlvalidate.json` (p. ej. permitir inline styles). CLAUDE.md lo prohíbe:
se arregla la causa, no el detector. También se descartó gestionar el foco
del modal con `inert` (soporte más nuevo y más JS) cuando `display:none`
ya resuelve lo mismo.

## Archivos afectados

| Archivo | Cambio |
|---------|--------|
| `index.html` | Quitar 7 `style=""` (→ clases), quitar `aria-hidden` del modal, 3 `role="group"`, 3 `<p>`→`<span>` en labels del juego, 2 `src` con data URI, 1 `&amp;`. |
| `styles.css` | Clases nuevas: `.header-abarrotes`, `.header-batatabit`, `.contact-icon`, `.music-icon`, `.footer-sub`, `.mm-vs-col`; selector `.mm-tarjeta p` → `.mm-tarjeta span` (con `display:block`); borrar `.modal-overlay[aria-hidden="true"]`. |
| `JS/main.js` | Quitar los dos `setAttribute('aria-hidden', …)` de `abrirJuego`/`cerrarJuego`. |

## Datos / estado nuevos

Ninguno. No se tocan `localStorage` (`theme`, `lang`) ni ningún ID
existente (los IDs `mm-*` y `getElementById` quedan intactos).

## Impacto por capa

- **HTML:** solo atributos y 3 cambios de etiqueta `<p>`→`<span>`; cero
  cambios de contenido visible.
- **CSS:** clases nuevas replican exactamente los valores inline; los
  gradientes de proyecto son colores de marca (idénticos en ambos temas,
  como ya lo eran inline). No se toca el breakpoint 900px.
- **JS:** solo se eliminan 2 líneas redundantes; `display:none` ya oculta
  el modal del árbol de accesibilidad, así que no se pierde semántica.

## Riesgos

- Modal: al quitar `.modal-overlay[aria-hidden="true"]` del CSS, la regla
  base `display:none` debe seguir ocultándolo → verificar abrir/cerrar
  (✕, Escape, clic fuera) tras el cambio.
- `<p>`→`<span>`: `margin-bottom` deja de aplicar en inline → la clase
  usa `display:block` para que la tarjeta se vea igual.
- Push a main publica en GitHub Pages → esta feature se commitea pero el
  push pasa por `/deploy-check`.
