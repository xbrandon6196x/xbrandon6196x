# Tasks — SEO + accesibilidad (feature 002)

Tareas pequeñas y verificables. Regla: tras completar CADA tarea, el sitio
sigue funcionando (se puede abrir y usar). Marcar al completar.

- [x] 1. `styles.css`: verdes AA en `:root` (#008000/#006600), verdes
      brillantes declarados en `[data-theme="dark"]`, footer con verde
      brillante fijo (variable nueva `--green-bright`).
- [x] 2. Generar `og_banner.png` 1200×630 (PowerShell/GDI+, script en
      carpeta temporal) y verificar dimensiones/peso (35 KB).
- [x] 3. `index.html`: `og:image`/`twitter:image` → banner + `width/
      height/alt`, quitar comentario de pendiente.
- [x] 4. `index.html` + `JS/main.js`: aria-labels bilingües
      (`data-aria-es/en` + diccionario `ARIA` + refresh en `applyLang`).
- [x] 5. `index.html` + `JS/main.js`: `aria-selected` → `aria-pressed`
      en botones del About.
- [x] 6. Correr checks: `html-validate` + `linkinator` en verde
      (exit 0 / 28 enlaces OK) + `node --check JS/main.js` OK.
- [x] 7. Validar criterios de aceptación de `spec.md` uno a uno
      (contrastes calculados, banner 1200×630 referenciado, labels EN/ES,
      temas, móvil).

## Registro

- 2026-07-11 — Spec y plan escritos tras auditoría: el rework remoto ya
  cubría meta/OG/favicon/JSON-LD/robots/sitemap/alt/aria-labels básicos.
  Brandon confirmó: ajustar verde en claro y generar banner.
- 2026-07-11 — Implementación completa. Primer intento del banner con
  mojibake (encoding ANSI de PowerShell 5.1) y métricas desbordadas;
  regenerado con escapes de caracteres y ajuste automático de fuente.
- 2026-07-11 — Verify: APROBADO (8/8 criterios). Contrastes calculados:
  #008000/blanco 5.14:1, #006600/blanco 7.24:1, footer 8.16:1; PNG
  1200×630 válido; 13 pares data-aria-es/en; i18n 248/248/248 intacta;
  cero aria-selected restantes. El vistazo visual humano queda para
  antes del push (`/deploy-check`).
