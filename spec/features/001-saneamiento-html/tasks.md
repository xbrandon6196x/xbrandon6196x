# Tasks — Saneamiento HTML (feature 001)

Tareas pequeñas y verificables. Regla: tras completar CADA tarea, el sitio
sigue funcionando (se puede abrir y usar). Marcar al completar.

- [x] 1. `index.html`: `R&D` → `R&amp;D` (1 error `no-raw-characters`).
- [x] 2. `index.html`: añadir `role="group"` a los 3 `<div>` con
      `aria-label` (hero-skill-tags, achievement-meta, opportunity-tags).
- [x] 3. `styles.css` + `index.html`: mover los 7 estilos inline a clases
      (`.header-abarrotes`, `.header-batatabit`, `.contact-icon`,
      `.music-icon`, `.footer-sub`, `.mm-vs-col`).
- [x] 4. `index.html` + `styles.css`: `<p>`→`<span>` en las 3 tarjetas de
      mascota y selector `.mm-tarjeta p` → `.mm-tarjeta-nombre` con
      `display:block`.
- [x] 5. `index.html` + `JS/main.js` + `styles.css`: quitar `aria-hidden`
      del modal (HTML), los 2 `setAttribute` (JS) y el selector
      `.modal-overlay[aria-hidden="true"]` (CSS).
- [x] 6. `index.html`: `src=""` → data URI transparente en los 2 sprites
      del combate.
- [x] 7. Correr checks: `html-validate` + `linkinator` en verde.
- [x] 8. Validar criterios de aceptación de `spec.md` uno a uno
      (visual idéntico, modal funciona, sprites cargan, temas, móvil).
      Verificado por subagente `verificador` (APROBADO); el vistazo
      visual humano final queda para antes del push (`/deploy-check`).

## Registro

- 2026-07-11 — Feature creada tras sincronizar main con el rework remoto
  (28 errores del roadmap → 21 reales).
- 2026-07-11 — Tareas 1–7 implementadas. Desviación menor de nombre: el
  `<span>` de las tarjetas usa clase `.mm-tarjeta-nombre` (en vez de
  selector genérico `.mm-tarjeta span`) para no colisionar con otros
  spans futuros. No cambia el «qué».
- 2026-07-11 — `html-validate`: 0 errores (exit 0). `linkinator`:
  28 enlaces OK.
- 2026-07-11 — Verify: veredicto APROBADO del `verificador` (7/7
  criterios; equivalencia CSS literal inline↔clases, 41 IDs de
  `getElementById` intactos, data URI GIF válido, cero referencias a
  `aria-hidden` en JS). Pendiente solo el vistazo visual humano antes
  del push.
