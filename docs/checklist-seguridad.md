# Checklist de seguridad — Portafolio WEB

Contexto de riesgo real de ESTE proyecto: **repo público** + **GitHub Pages
(push a main = producción)** + **sin backend ni datos de clientes**. El
riesgo dominante no es una intrusión: es **publicar por descuido algo que
no debía ser público**.

## Los 4 principios (adaptados)

1. **Contexto y seguridad por adelantado.** El agente carga CLAUDE.md,
   skills y specs antes de trabajar; ahí ya está dicho qué no se puede
   hacer (dependencias sin OK, datos personales, debilitar checks). No
   confíes en recordárselo cada vez: si una regla nueva importa, va a
   CLAUDE.md o a una skill, no al chat.
2. **Leer y entender el diff ENTERO antes de aprobar.** Especialmente
   `<script>`, `<iframe>`, enlaces y cualquier URL nueva en index.html:
   en un sitio estático el HTML ES la superficie de ataque. Si no
   entiendes una línea, pregunta antes de aprobar.
3. **Verificar antes de subir.** `/deploy-check` completo antes de CADA
   push: checks en verde + sin dependencias sorpresa + git status limpio +
   escaneo de secretos. Push sin `/deploy-check` = publicar sin mirar.
4. **Nunca pegar claves ni datos reales en un prompt.** Si la feature 005
   (formulario) requiere un endpoint o ID de servicio externo, se
   referencia («el ID de Formspree que tengo guardado»), no se pega en la
   conversación ni en el repo si el servicio permite ocultarlo.

## Tabla de amenazas reales

| Amenaza | Probabilidad | Mitigación |
|---------|-------------|------------|
| Commitear un secreto o `.env` por accidente (queda público al instante) | Media | `.gitignore` ampliado + escaneo de secretos bloqueante en `/deploy-check` |
| Publicar datos personales de más (teléfono/dirección en CV o PDFs, datos de terceros) | Media | Regla en CLAUDE.md; revisar todo PDF/imagen nuevo antes de commit. **[PENDIENTE: confirmar que el CV actual no expone teléfono/dirección]** |
| Push roto a main → portafolio caído/feo ante un reclutador | Media | `/deploy-check` bloqueante; checks en verde como requisito de commit |
| Dependencia/CDN externo inyectado (supply chain) | Baja | Principio «sin dependencias nuevas sin OK»; el verificador vigila `<script>`/CDNs nuevos; única externa permitida: Google Fonts |
| Spam/abuso del futuro formulario de contacto (feature 005) | Media (cuando exista) | Elegir servicio con anti-spam (honeypot/captcha); tratarlo en la spec 005 como criterio de aceptación |
| Config personal de Claude filtrada (`settings.local.json`) | Baja | Ignorado en `.gitignore` y verificado con `git check-ignore` |

## Auditoría del bootstrap (2026-07-11)

- `git ls-files`: sin archivos de secretos/credenciales trackeados. ✅
- Grep de `api key / token / password / Bearer / PRIVATE KEY` en
  HTML/CSS/JS: sin hallazgos. ✅
- Email `contacto_brandonkeymolent@gmail.com` visible en index.html:
  **intencional** (es la vía de contacto del portafolio).
- PDFs de CV y certificados públicos: **por diseño**; queda pendiente la
  revisión manual del CV (ver tabla).
