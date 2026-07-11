# Spec — SEO + accesibilidad (feature 002)

## Qué

1. En tema claro, los textos y botones verdes se leen con contraste
   suficiente (WCAG AA); el tema oscuro se ve igual que hoy.
2. Al compartir el portafolio en LinkedIn/WhatsApp/Twitter aparece un
   banner profesional 1200×630 con nombre, rol y métricas (en vez de la
   foto de perfil).
3. Los lectores de pantalla escuchan los controles (menú, tema, idioma,
   música) en el idioma activo del sitio, no siempre en español.

## Por qué

Fila 002 del roadmap. Nota importante: el rework remoto de 2026-07 ya
cubrió la mayor parte (meta description, keywords, Open Graph, Twitter
cards, canonical, favicon + apple-touch-icon, theme-color, JSON-LD,
robots.txt, sitemap.xml, `alt` correctos —decorativos con `alt=""`—,
aria-labels en hamburguesa/tema/idioma/reproductor y `lang` dinámico).
Esta feature cierra lo que faltaba: **contraste verificado**, el **banner
OG pendiente** (anotado como TODO en el head) y la **i18n de los
aria-labels**. Decisiones confirmadas por Brandon el 2026-07-11: ajustar
el verde en tema claro y generar el banner.

## Alcance

**Incluye:**

- Contraste AA en tema claro: `--green` pasa de `#00c601` a `#008000` y
  `--green-dark` de `#009900` a `#006600` SOLO en `:root`; el tema oscuro
  conserva los valores actuales (se declaran en `[data-theme="dark"]`).
  El footer (fondo #111 fijo en ambos temas) conserva el verde brillante.
- `og_banner.png` 1200×630 generado con los colores del sitio (fondo
  oscuro, nombre, rol, métricas) + actualizar `og:image`,
  `twitter:image`, añadir `og:image:width/height/alt` y quitar el
  comentario de pendiente del head.
- aria-labels bilingües: los estáticos vía atributos
  `data-aria-es`/`data-aria-en` procesados por `applyLang`; los dinámicos
  (menú abrir/cerrar, tema, play/pausa) vía diccionario en JS que respeta
  el idioma activo.
- Corregir `aria-selected` en los botones de panel del About (no son
  tabs ARIA): pasa a `aria-pressed`.

**NO incluye (explícito):**

- Rediseño del banner con foto o diseño gráfico elaborado (si Brandon
  quiere uno con su foto, lo aporta él y se reemplaza el archivo).
- Cambios de contenido/copy o de estructura de secciones.
- Optimización de peso de imágenes (feature 003).
- Tocar los colores decorativos de la serpiente del canvas (aria-hidden)
  ni el verde del tema oscuro.

## Criterios de aceptación

- [ ] `npx --yes html-validate index.html` pasa sin errores.
- [ ] `npx --yes linkinator index.html --skip "^https?://(?!localhost)"` sin enlaces rotos.
- [ ] Todo texto nuevo funciona en ES y EN (incluye los aria-labels: al
      cambiar idioma, cambian).
- [ ] Se ve correcto en tema claro, tema oscuro y en móvil (≤900px).

Propios de esta feature:

- [ ] Contraste AA: en tema claro, texto verde sobre blanco ≥ 4.5:1 y
      texto blanco sobre botón verde ≥ 4.5:1 (verificable calculando la
      razón de contraste de #008000/#006600).
- [ ] Tema oscuro y footer: verde brillante #00c601 intacto.
- [ ] Existe `og_banner.png` de exactamente 1200×630, referenciado en
      `og:image` y `twitter:image` con URL absoluta, y el comentario
      «Pendiente: crear mi banner OG» ya no está.
- [ ] Con el sitio en EN, los aria-labels de hamburguesa, tema, idioma y
      reproductor están en inglés; en ES, en español.
- [ ] Los botones del About usan `aria-pressed` coherente con el panel
      visible (no `aria-selected`).

## Preguntas abiertas

Ninguna. (Verde y banner confirmados por Brandon; el banner es iterable
después de verlo.)
