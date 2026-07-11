# Spec — Rendimiento (feature 003)

## Qué

El sitio se ve exactamente igual, pero carga mucho más rápido: la página
pasa de descargar ~6.5 MB de imágenes a menos de ~0.5 MB. Quien entra
desde el celular (datos móviles) ve el hero de inmediato y el resto de
imágenes aparece según hace scroll.

## Por qué

Fila 003 del roadmap. Auditoría 2026-07-11: `fotos_collage.png` 3.3 MB
(1080×1920, mostrado ~500px), `platzi_top_student_2026.png` 2.1 MB
(1254², mostrado ≤340px), `brand_perfil_icon.png` 953 KB (924×874,
mostrado ≤400px y es el LCP del hero). Íconos de 360–500px mostrados a
24–40px. Nota: `font-display: swap` YA está (Google Fonts con
`display=swap` + preconnect) — ese punto del roadmap ya estaba cubierto.

## Alcance

**Incluye:**

- Las 3 imágenes grandes → WebP redimensionado a ~2× su tamaño mostrado:
  `brand_perfil.webp` (~800w), `platzi_top_student_2026.webp` (~700w),
  `fotos_collage.webp` (~800w), generados con `npx sharp-cli` (sin
  instalar dependencias). Referencias actualizadas en `index.html`.
- Íconos PNG sobredimensionados (sidebar, sociales, bk_icon, translate)
  → redimensionados EN SITIO a ≤128px (mismo nombre de archivo, para no
  tocar JS ni CSS).
- Sprites del juego (512px, mostrados ≤120px) → redimensionados en sitio
  a 256px (mismo nombre; `JS/main.js` no se toca).
- `loading="lazy"` + `decoding="async"` en TODAS las imágenes bajo el
  fold que no lo tengan (íconos de tarjetas de proyecto, contacto,
  insignia). Las del sidebar/hero (above the fold) quedan eager.

**NO incluye (explícito):**

- Borrar los PNG originales grandes del repo (quedan sin referenciar;
  `brand_perfil_icon.png` sigue referenciado por el JSON-LD). Limpieza
  aparte si Brandon quiere.
- `og_banner.png` y `bk_icon.png` como favicon se quedan PNG
  (compatibilidad de crawlers/navegadores).
- Bundlers, `<picture>` con fallbacks, srcset responsive, CDNs.
- Tocar el reproductor de audio o el MP3.

## Criterios de aceptación

- [ ] `npx --yes html-validate index.html` pasa sin errores.
- [ ] `npx --yes linkinator index.html --skip "^https?://(?!localhost)"` sin enlaces rotos.
- [ ] Todo texto nuevo funciona en ES y EN (no hay texto nuevo; nada se
      pierde).
- [ ] Se ve correcto en tema claro, tema oscuro y en móvil (≤900px).

Propios de esta feature:

- [ ] El peso total de imágenes REFERENCIADAS por `index.html` baja de
      ~6.5 MB a ≤ 600 KB (medible sumando los archivos referenciados).
- [ ] Ninguna imagen se ve pixelada a su tamaño de render (los WebP van
      a ≥2× el tamaño CSS mostrado).
- [ ] El hero (LCP) conserva `fetchpriority="high"` y NO lleva lazy.
- [ ] Toda imagen bajo el fold lleva `loading="lazy"`.
- [ ] El juego Monstermon funciona igual (sprites se ven nítidos).
- [ ] Sin dependencias nuevas en el repo (sharp-cli solo vía npx).

## Preguntas abiertas

Ninguna. (Brandon aprobó continuar con la 003 el 2026-07-11; el cambio
es invisible al ojo — mismas imágenes, menor peso.)
