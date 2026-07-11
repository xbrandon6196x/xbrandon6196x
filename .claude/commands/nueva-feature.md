---
description: Ciclo SDD completo para una feature — Specify → Plan → Tasks → Implement → Verify
argument-hint: <nombre corto de la feature o número del roadmap>
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, PowerShell, Agent, AskUserQuestion
---

Guía la feature `$ARGUMENTS` por el ciclo SDD completo, con OK humano entre
fases. La spec es el ancla de verdad: si la implementación se desvía del
«qué», se actualiza la spec ANTES de seguir.

1. **Preparación.** Lee `spec/constitution/roadmap.md`. Si la feature no
   está en el roadmap, pregunta si añadirla. Crea la carpeta
   `spec/features/NNN-<nombre-kebab>/` con el siguiente número libre,
   copiando las plantillas de `spec/features/000-plantilla/`.
2. **Specify.** Rellena `spec.md` con el usuario: qué (visión de usuario,
   sin tecnicismos), por qué, alcance (incluye / NO incluye), criterios de
   aceptación verificables uno a uno (siempre incluir: checks en verde +
   i18n completo ES/EN + se ve bien en ambos temas y en móvil ≤900px).
   Resuelve TODAS las preguntas abiertas antes de seguir. **Pide OK.**
3. **Plan.** Rellena `plan.md`: enfoque elegido (y alternativa descartada),
   tabla de archivos afectados, datos/estado nuevos (localStorage, IDs),
   impacto por capa (HTML/CSS/JS), riesgos. **Pide OK.**
4. **Tasks.** Rellena `tasks.md`: tareas pequeñas y verificables que dejan
   el sitio funcionando tras cada una; la última siempre es correr los
   checks y validar los criterios de la spec uno a uno.
5. **Implement.** Ejecuta las tareas en orden, marcándolas en `tasks.md` y
   anotando desviaciones en «Registro». Si hay 3+ tareas independientes
   entre sí, delega cada una al subagente `implementador` (una tarea por
   invocación); si no, implementa directo. Si una desviación cambia el
   «qué» → volver al paso 2 y actualizar spec.md primero.
6. **Verify.** Lanza SIEMPRE el subagente `verificador` con: la ruta de la
   spec, el diff real (`git diff`) y los criterios de aceptación.
   - APROBADO → resumen final y actualizar estado en `roadmap.md`.
   - RECHAZADO / CON RESERVAS → corrige lo señalado y repite Verify
     (máximo 3 ciclos; si no converge, para y reporta al usuario).
7. Ofrece commitear la feature (sin push: push = publicar en GitHub Pages;
   eso pasa por `/deploy-check`).
