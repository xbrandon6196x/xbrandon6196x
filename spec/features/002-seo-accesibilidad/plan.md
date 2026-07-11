# Plan — SEO + accesibilidad (feature 002)

## Enfoque

Cuatro cambios independientes y pequeños. (1) Contraste: mover los verdes
accesibles a `:root` y declarar los brillantes en `[data-theme="dark"]`,
con excepción puntual del footer (fondo #111 en ambos temas → verde
brillante fijo). (2) Banner: generarlo offline con PowerShell +
System.Drawing (GDI+, sin dependencias nuevas, cumple la regla de «sin
build steps»); el script queda fuera del repo (carpeta temporal del job) y
solo se commitea el PNG. (3) aria-labels bilingües: un bucle genérico en
`applyLang` sobre `[data-aria-es]` para los estáticos y un diccionario
`ARIA` en JS para los 3 estados dinámicos (menú, tema, play). (4)
`aria-selected` → `aria-pressed` en HTML y en `showPanel`.

**Alternativa descartada:** generar el banner con un servicio/librería
(node-canvas, Puppeteer, herramienta online) — introduce dependencias o
saca el asset del control del repo. También se descartó `role="tablist"`
completo para el About: exige gestión de foco con flechas; `aria-pressed`
da semántica correcta con el comportamiento actual.

## Archivos afectados

| Archivo | Cambio |
|---------|--------|
| `styles.css` | `:root`: `--green #008000`, `--green-dark #006600`; `[data-theme="dark"]`: añade `--green #00c601`, `--green-dark #009900`; `footer span` con verde brillante fijo. |
| `index.html` | `og:image`/`twitter:image` → `og_banner.png` + `og:image:width/height/alt`, quitar comentario pendiente; `data-aria-es/en` en controles estáticos; `aria-selected` → `aria-pressed` en botones About. |
| `JS/main.js` | Diccionario `ARIA` + helper; `applyLang` refresca labels (estáticos y dinámicos); `showPanel` usa `aria-pressed`. |
| `og_banner.png` | NUEVO asset 1200×630 (≈50–100 KB). |

## Datos / estado nuevos

- Asset nuevo: `og_banner.png` (raíz, convención heredada).
- Atributos nuevos `data-aria-es`/`data-aria-en` (mismo patrón que
  `data-es`/`data-en`).
- Sin claves nuevas de localStorage; sin IDs nuevos ni renombrados.

## Impacto por capa

- **HTML:** solo atributos meta/aria y un comentario menos.
- **CSS:** 2 variables cambian de valor en claro; el oscuro queda
  idéntico por declaración explícita. Sombras `rgba(0,198,1,…)` se quedan
  (decorativas). Breakpoint 900px intacto.
- **JS:** `applyLang` gana ~15 líneas; `showPanel` cambia atributo. Sin
  tocar lógica del juego ni persistencia (`theme`, `lang`).

## Riesgos

- El verde #008000 cambia sutilmente la identidad en claro → confirmado
  por Brandon (2026-07-11). Reversible en 2 líneas.
- Banner con GDI+: sin fuente Inter instalada usa Segoe UI (similar);
  el banner es un asset iterable, no bloquea.
- La URL absoluta del banner solo funcionará al publicar (GitHub Pages);
  linkinator con `--skip` externo no la valida → se verifica el archivo
  local a mano (dimensiones y peso).
- Push a main publica → pasa por `/deploy-check` con vistazo humano.
