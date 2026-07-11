# Roadmap

Ordenado por riesgo/valor: primero lo de menor riesgo. Cada feature se
trabaja con `/nueva-feature` y vive en `spec/features/NNN-*`.

| # | Feature | Descripción | Riesgo | Estado |
|---|---------|-------------|--------|--------|
| 001 | Saneamiento HTML | Dejar `html-validate` en verde: los errores heredados (21 tras el rework remoto de 2026-07: estilos inline → CSS, `&` sin escapar, `src=""` en sprites del juego, `<p>` dentro de `<label>`, `aria-label`/`aria-hidden` mal usados). Habilita el bucle autónomo: a partir de aquí, checks en verde = requisito de commit. | Bajo | Hecha |
| 002 | SEO + accesibilidad | Meta description, Open Graph/Twitter cards, favicon declarado, `alt` descriptivos en todas las imágenes, aria-labels en controles (hamburger, player), contraste verificado. | Bajo | Pendiente |
| 003 | Rendimiento | Optimizar imágenes pesadas (fotos_collage.png, PNGs de iconos → tamaños correctos/WebP), `loading="lazy"` bajo el fold, `font-display`. Sin bundlers: se optimizan los assets mismos. | Medio | Pendiente |
| 004 | Más proyectos/secciones | Nuevos proyectos en la galería (usar `/nuevo-proyecto`) y/o sección de experiencia laboral. Contenido lo aporta Brandon. | Medio | Pendiente |
| 005 | Formulario de contacto | Formulario funcional con servicio externo compatible con sitio estático (p. ej. Formspree). Riesgo: dependencia externa, spam, exposición del endpoint en repo público. | Alto | Pendiente |

## Estados

`Pendiente` → `En spec` → `En implementación` → `En verificación` → `Hecha`

## Notas

- 001 va primero a propósito: mientras los checks heredados fallen, el
  veredicto «verde» no distingue errores nuevos de viejos.
- Nuevas ideas entran aquí ANTES de implementarse (una fila + posición
  según riesgo/valor), no directo al código.
