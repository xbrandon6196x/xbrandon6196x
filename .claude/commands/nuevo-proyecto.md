---
description: Alta guiada de un proyecto nuevo en la galería del portafolio
argument-hint: <nombre del proyecto>
allowed-tools: Read, Edit, Bash, PowerShell, Grep, AskUserQuestion
---

Añade el proyecto `$ARGUMENTS` a la galería (`#projects` en index.html)
siguiendo el patrón exacto de las tarjetas existentes.

1. Pregunta al usuario (cerrado, de una vez): emoji representativo,
   descripción corta EN ESPAÑOL E INGLÉS, tags (máx. 4), URL de GitHub
   (opcional), URL del sitio en vivo (opcional).
2. Lee la sección `#projects` de index.html (líneas ~174–268) y copia la
   estructura de una tarjeta existente:
   `.project-card > .project-card-header + .project-card-body` con
   `.project-card-top` (emoji + `.project-card-links`), `<h3>`, `<p>`
   descripción, `.project-tags`.
3. Reglas al construir la tarjeta:
   - Descripción y tags traducibles con `class="i18n"` + `data-es` +
     `data-en` (skill `i18n-bilingue`). El nombre propio del proyecto NO
     lleva i18n.
   - Enlace GitHub usa `<img src="github_icon.png">`; enlace a sitio vivo
     usa el patrón `project-link-web` (🔗) + botón `.btn-visit-site`.
   - Sin estilos inline; si necesita un color de header propio, créalo
     como clase en styles.css (skill `diseno-tema-responsive`).
   - `target="_blank"` en todos los enlaces externos.
4. Valida: `npx --yes html-validate index.html` y
   `npx --yes linkinator index.html --skip "^https?://(?!localhost)"`.
5. Muestra al usuario la tarjeta renderizada (servidor local o captura) y
   recuérdale verificarla en ambos idiomas y ambos temas antes de commit.
