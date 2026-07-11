# Tasks — Rendimiento (feature 003)

Tareas pequeñas y verificables. Regla: tras completar CADA tarea, el sitio
sigue funcionando (se puede abrir y usar). Marcar al completar.

- [x] 1. Respaldar en `$CLAUDE_JOB_DIR/tmp/orig/` todos los PNG que se
      van a tocar en sitio (13 archivos).
- [x] 2. Generar los 3 WebP (hero 800w q80, insignia 700w q80, collage
      800w q80) con sharp-cli: 60 KB + 37 KB + 201 KB.
- [x] 3. `index.html`: actualizar los 4 `src` a `.webp`.
- [x] 4. Redimensionar en sitio íconos (96px; bk_icon 180px) y sprites
      del juego (256px) conservando nombres.
- [x] 5. `index.html`: añadir `loading="lazy" decoding="async"` a las
      imágenes bajo el fold que faltaban (7; quedan eager solo
      sidebar/hero, above the fold).
- [x] 6. Peso total de imágenes referenciadas: **426 KB** (antes
      ~6.5 MB; objetivo ≤600 KB cumplido).
- [x] 7. Checks: `html-validate` exit 0 + `linkinator` 28 enlaces OK.
- [x] 8. Validar criterios de aceptación de `spec.md` uno a uno
      (nitidez, LCP eager, lazy bajo el fold, juego OK, sin deps).

## Registro

- 2026-07-11 — Spec/plan tras auditoría: 6.8 MB de PNGs, 3 gigantes;
  `font-display` ya estaba cubierto por el rework remoto.
- 2026-07-11 — Implementado. Íconos a 96px (no 128: se muestran a
  24–40px, 96 cubre hasta 3×). Hero/collage/sprite verificados
  visualmente nítidos. Originales respaldados en tmp del job y en
  historial git.
- 2026-07-11 — DESVIACIÓN en Verify: el subagente `verificador` no pudo
  correr (límite de sesión de la herramienta; se restablece 17:10). La
  verificación se hizo inline, criterio por criterio, con evidencia:
  html-validate exit 0; linkinator 28 OK (3 .webp con 200); peso
  referenciado 426 KB ≤ 600 KB; dimensiones leídas de headers
  (800/700/800 webp, sprites 256px, íconos ≤180px); hero eager con
  fetchpriority=high; bajo el fold todo lazy; `git diff` vacío en
  JS/main.js y styles.css; sin package.json/node_modules; i18n
  248/248/248 ocurrencias con diff balanceado; favicon y og:image
  siguen PNG. Se puede re-lanzar el verificador tras el reset si se
  quiere el sello independiente.
