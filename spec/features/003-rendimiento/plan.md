# Plan — Rendimiento (feature 003)

## Enfoque

Optimizar los assets mismos (la restricción del repo: sin build). Con
`npx --yes sharp-cli` (v5, ya probado en este entorno): (1) las 3
imágenes grandes se exportan a WebP con resize al doble de su tamaño CSS
(retina) y `index.html` pasa a referenciar los `.webp`; (2) íconos y
sprites se redimensionan EN SITIO conservando nombre y formato para no
tocar ni CSS ni JS; (3) barrido de `loading="lazy" decoding="async"` en
imágenes bajo el fold. El original de cada archivo tocado en sitio queda
respaldado en la carpeta temporal del job hasta validar visualmente.

**Alternativa descartada:** `<picture>` con fallback PNG — WebP es
baseline en todos los navegadores desde 2020 y el doble de etiquetas
complica el HTML sin beneficio real. También se descartó optimizar solo
PNG (pngquant): WebP da 3–5× más reducción en fotos.

## Archivos afectados

| Archivo | Cambio |
|---------|--------|
| `index.html` | 4 `src` cambian a `.webp` (hero, insignia, collage ×2); `loading="lazy" decoding="async"` en ~10 imgs bajo el fold. |
| `brand_perfil.webp`, `platzi_top_student_2026.webp`, `fotos_collage.webp` | NUEVOS (reemplazan visualmente a los PNG grandes). |
| PNGs de íconos/sprites (10 archivos) | Redimensionados en sitio (mismo nombre). |
| `styles.css` / `JS/main.js` | SIN cambios. |

## Datos / estado nuevos

Solo assets nuevos `.webp` en raíz (convención heredada). Sin IDs,
localStorage ni atributos nuevos.

## Impacto por capa

- **HTML:** solo atributos `src`/`loading`/`decoding`.
- **CSS:** ninguno (los tamaños de render los fija el CSS existente).
- **JS:** ninguno (sprites conservan nombre y ruta).

## Riesgos

- Redimensionar en sitio es destructivo → respaldo previo en
  `$CLAUDE_JOB_DIR/tmp/orig/` hasta validar; git también conserva los
  originales en historial.
- Calidad WebP: q80 para fotos (visualmente transparente); si algo se ve
  mal, se regenera con q90 (asset iterable).
- `bk_icon.png` es también favicon: se redimensiona a 180px (mínimo para
  apple-touch-icon), no menos.
- Push a main publica → `/deploy-check` + vistazo humano.
