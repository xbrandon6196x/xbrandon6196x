# Stack normativo

## Stack

| Capa | Tecnología | Regla dura |
|------|-----------|------------|
| Marcado | HTML5, un solo `index.html` | Página única; secciones con `id` ancladas desde el sidebar |
| Estilos | CSS3 puro en `styles.css` | Variables de tema en `:root`/`[data-theme="dark"]`; breakpoint único 900px; sin preprocesadores |
| Lógica | JS vanilla en `JS/main.js` | Sin módulos, sin transpilación, sin librerías; script clásico |
| Tipografía | Google Fonts (Inter) | Única dependencia externa en runtime permitida |
| Assets | Raíz del repo + `certificados/` | Rutas relativas SIEMPRE (GitHub Pages) |
| Hosting | GitHub Pages, repo público `xbrandon6196x/xbrandon6196x` | Push a `main` = producción |
| Verificación | `npx --yes html-validate` + `npx --yes linkinator` | Sin instalar dependencias permanentes; los checks no se debilitan |

## Arquitectura

- **Estado del cliente:** solo `localStorage` con dos claves: `theme`
  (`light`/`dark`) y `lang` (`es`/`en`). Estado nuevo persistente debe
  documentarse aquí antes de introducirse.
- **Acoplamiento HTML↔JS:** por `getElementById`/`querySelector`. Renombrar
  un `id` exige buscar sus usos en `JS/main.js`. IDs del juego llevan
  prefijo `mm-`.
- **i18n:** atributos `data-es`/`data-en` + `applyLang()` (ver skill
  `i18n-bilingue`). No se introduce otro mecanismo de traducción.
- **Sin herramientas de build:** lo que está en el repo es exactamente lo
  que se sirve. Minificación/optimización solo si se hace sin romper esto
  (p. ej. optimizar las imágenes mismas, no añadir un bundler).

## Herramientas de desarrollo (no llegan al repo)

- `npx --yes serve .` — servidor local.
- `npx --yes html-validate index.html` — validación HTML/a11y.
- `npx --yes linkinator index.html --skip "^https?://(?!localhost)"` —
  assets rotos.
- Claude Code con el arnés de `.claude/` (skills, comandos, agentes).
