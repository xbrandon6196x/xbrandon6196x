---
name: diseno-tema-responsive
description: Usar siempre que se editen estilos (styles.css), se añadan componentes visuales a index.html, o se toque el modo oscuro/claro o el layout responsive.
---

# Tema oscuro/claro, colores y responsive

## Variables de tema (exactas, styles.css líneas 8–33)

```css
:root {
  --green: #00c601;        /* verde marca (acentos, .green) */
  --green-dark: #009900;   /* gradiente sidebar */
  --green-light: #e6ffe6;  /* fondos suaves de acento */
  --sidebar-w: 160px;
  --bg: #ffffff;           /* fondo principal */
  --bg2: #f7f7f7;          /* fondo alterno de secciones */
  --text: #1a1a1a;
  --muted: #555;
  --card-bg: #ffffff;
  --border: #e0e0e0;
  --player-bg: #fff;
  --player-shadow: 0 -2px 20px rgba(0,0,0,0.08);
}
[data-theme="dark"] {
  --bg: #0f0f0f; --bg2: #1a1a1a; --text: #f0f0f0; --muted: #aaa;
  --card-bg: #1e1e1e; --border: #333;
  --green-light: rgba(0,198,1,0.12);
  --player-bg: #1a1a1a;
  --player-shadow: 0 -2px 20px rgba(0,0,0,0.4);
}
```

## Reglas duras

1. **Todo color nuevo usa variables.** Si necesitas un color que no existe,
   créalo en `:root` Y dale valor en `[data-theme="dark"]`. Un color fijo
   (hex directo) se rompe en uno de los dos temas.
   - Excepción consciente: el sidebar es siempre verde con texto blanco
     (idéntico en ambos temas) y los `project-card-header` usan gradientes
     de marca fijos.
2. **El tema se activa con `data-theme` en `<html>`**, lo maneja
   `JS/main.js` (`#themeToggle`, localStorage clave `theme`). No añadas
   media queries `prefers-color-scheme`: aquí el tema es manual.
3. **Breakpoint móvil ÚNICO: 900px.** Existe en dos sitios que deben
   coincidir: `@media (max-width: 900px)` en styles.css (línea ~814) y
   `window.innerWidth <= 900` en JS/main.js (cierre del sidebar). En móvil
   el sidebar se oculta (`transform`) y aparece el botón `.hamburger`.
4. Patrón de tarjeta del repo: `background: var(--card-bg)` +
   `border: 1px solid var(--border)` + transición suave. Componentes
   nuevos deben imitarlo, no inventar otro estilo.
5. Evita `style=""` inline nuevo: `html-validate` lo marca (`no-inline-style`)
   y hay una feature del roadmap para eliminar los existentes.
6. Las transiciones del repo son `0.3s` (tema, sidebar); usa esa duración.

## Verificación tras editar

1. `npx --yes html-validate index.html`.
2. Abrir el sitio y alternar 🌙/☀️: el componente tocado debe verse bien en
   AMBOS temas (texto legible, bordes visibles, sin fondos blancos fijos
   en modo oscuro).
3. Estrechar la ventana por debajo de 900px: nada debe desbordar
   horizontalmente; el sidebar debe ocultarse y el hamburger aparecer.
