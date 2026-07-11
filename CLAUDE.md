# Portafolio WEB — Brand Keymolent

Sitio personal de Brandon Keymolent Olvera: portafolio bilingüe (ES/EN) para
reclutadores y contactos profesionales, con proyectos, habilidades,
certificaciones y un minijuego (Monstermon).

## Stack

- **HTML5 + CSS3 + JavaScript vanilla.** Sin frameworks, sin build, sin
  package.json, sin dependencias instaladas (las herramientas se usan vía
  `npx --yes`).
- Fuente: Google Fonts (Inter). Única dependencia externa en runtime.
- **Despliegue: GitHub Pages desde este repo (público).** Todo push a `main`
  publica el sitio en producción.

## Comandos

- `npx --yes serve .` — servidor local para ver el sitio (dev).
- `npx --yes html-validate index.html` — validación de HTML/accesibilidad.
  **Debe pasar antes de cada commit** (hoy hay 28 errores heredados; ver
  feature 001 del roadmap).
- `npx --yes linkinator index.html --skip "^https?://(?!localhost)"` —
  verifica que ningún asset local (imágenes, PDFs, JS, CSS) esté roto.
- No hay lint ni build: el sitio se sirve tal cual está en el repo.
- Atajos: `/verifica` corre ambos checks; `/arregla-checks` los deja en verde.

## Estructura del proyecto

- `index.html` — TODO el sitio (una sola página: hero, about, proyectos,
  habilidades, certificaciones, contacto, modal del juego).
- `styles.css` — todos los estilos. Variables de tema en `:root` y
  `[data-theme="dark"]` (líneas 8–33). Breakpoint móvil único: `900px`.
- `JS/main.js` — toda la lógica: juego Monstermon, menú hamburguesa,
  tema oscuro/claro, i18n ES/EN, reproductor de música, scroll-highlight.
- `certificados/` — PDFs de diplomas enlazados desde la sección
  Certificaciones.
- Raíz — imágenes, íconos, CV en PDF y audio. No hay carpeta `assets/`;
  los archivos de imagen viven en la raíz (convención heredada).

## Convenciones

- **i18n:** todo texto visible lleva `class="i18n"` con `data-es` y
  `data-en`. Nunca añadas texto visible sin ambos idiomas (ver skill
  `i18n-bilingue`).
- **Tema:** todo color nuevo usa las variables CSS de `:root` y debe tener
  su valor en `[data-theme="dark"]`. Nada de colores fijos que se rompan en
  modo oscuro (ver skill `diseno-tema-responsive`).
- **JS:** vanilla, funciones con nombres en español (`abrirJuego`,
  `resetearJuego`), IDs del juego con prefijo `mm-`. Sin módulos ni
  transpilación: `main.js` se carga con `<script>` clásico.
- **Responsive:** una sola media query (`max-width: 900px`); el JS también
  usa `window.innerWidth <= 900`. Si cambias el breakpoint, cámbialo en los
  dos sitios.
- Invariantes: el sitio debe funcionar abriendo `index.html` sin servidor ni
  conexión (salvo Google Fonts); tema e idioma persisten en `localStorage`
  (`theme`, `lang`).

## No hagas

- **No introduzcas dependencias, frameworks ni build steps** sin avisar
  antes. La gracia de este repo es que no los necesita.
- **No subas datos personales sensibles**: el repo es PÚBLICO y GitHub Pages
  lo publica. Nada de teléfonos, direcciones, claves o datos de terceros.
- No commitees secretos ni config personal (`.env*`, claves,
  `.claude/settings.local.json`).
- No debilites los checks (`html-validate`, `linkinator`) para que pasen:
  se arregla la causa, no el detector.
- No renombres IDs de elementos HTML sin buscar sus usos en `JS/main.js`
  (todo está acoplado por `getElementById`).

## Flujo de trabajo

- **Spec-anchored (SDD):** las features pasan por `spec/features/NNN`
  (usar `/nueva-feature`). Si la implementación se desvía del «qué»,
  se actualiza la spec ANTES de seguir.
- **Flujo ligero:** pide OK humano solo para cambios grandes (rediseños,
  secciones nuevas, dependencias, cualquier cosa que toque más de un área).
  Cambios atómicos: adelante directo, con checks en verde.
- Si no estás seguro al 80%, pregunta. No inventes.
- El humano dirige, la IA ejecuta: el humano es el responsable final y
  Validador de Intentos. La potencia sin control no sirve de nada.
- Al retomar una sesión: leer la bitácora más reciente de `docs/sesiones/`
  y `spec/constitution/roadmap.md`. Al cerrar: `/cierre-sesion`.

## Documentación

- `docs/README.md` — mapa de toda la infraestructura y el flujo en una frase.
- `spec/constitution/` — misión, stack normativo y roadmap.
- `spec/features/` — specs por feature (plantilla en `000-plantilla/`).
- `docs/guia-prompts.md` — cómo pedir trabajo (con ejemplos de este repo).
- `docs/guia-ejecucion.md` — Plan Mode vs Build vs `/nueva-feature`,
  subagentes e higiene de contexto.
- `docs/checklist-seguridad.md` — principios y amenazas de ESTE proyecto.
- `docs/sesiones/` — bitácoras de sesión (memoria entre sesiones).
- Skills: `.claude/skills/` · Comandos: `.claude/commands/` ·
  Agentes: `.claude/agents/`.
