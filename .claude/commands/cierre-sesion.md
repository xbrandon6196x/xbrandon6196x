---
description: Escribe la bitácora de la sesión en docs/sesiones/ y sincroniza roadmap/tasks
allowed-tools: Read, Write, Edit, Bash, PowerShell, Grep, Glob
---

Cierra la sesión de trabajo dejando memoria para la siguiente.

1. Lee `docs/sesiones/000-plantilla.md` y la conversación completa de esta
   sesión.
2. Ejecuta `git status` y `git log --oneline -5` para capturar el estado
   REAL del repo (no lo que crees recordar).
3. Crea `docs/sesiones/NNN-AAAA-MM-DD-<tema>.md` (siguiente número libre)
   con la plantilla rellenada:
   - **Qué se hizo** — con archivos concretos tocados.
   - **Decisiones** — SOLO las que no están ya en spec/ o CLAUDE.md;
     si una decisión pertenece a esos archivos, actualízalos y enlaza en
     vez de duplicar.
   - **Pendiente / siguiente paso** — lo primero que debería hacer la
     próxima sesión.
   - **Estado del repo** — rama, cambios sin commitear, resultado de los
     checks si se corrieron.
4. Si una feature avanzó: actualiza su `tasks.md` (checkboxes y Registro)
   y el estado en `spec/constitution/roadmap.md`.
5. Muestra la bitácora al usuario y recuérdale: ahora puede usar `/clear`
   con seguridad (la memoria quedó en disco).
