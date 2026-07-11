# Infraestructura de trabajo con IA — mapa

**El flujo en una frase:** leer la bitácora más reciente → `/nueva-feature`
del roadmap → implementar → verificar → `/deploy-check` → `/cierre-sesion`.

**La mentalidad:** el humano dirige, la IA ejecuta; el humano es el
responsable final y Validador de Intentos. La potencia sin control no sirve
de nada.

| Pieza | Qué resuelve | Artefactos |
|-------|--------------|------------|
| **Arnés** | Que el agente conozca las reglas sin repetírselas | `CLAUDE.md` · `.mcp.json` (Context7 para docs actualizadas) · `.claude/skills/` (`i18n-bilingue`, `diseno-tema-responsive`) |
| **SDD** | Que las features tengan un «qué» acordado antes del código | `spec/constitution/` (mission, tech-stack, roadmap) · `spec/features/NNN-*` (plantilla en `000-plantilla/`) · `/nueva-feature` |
| **Prompts** | Pedir trabajo de forma que salga bien a la primera | `docs/guia-prompts.md` |
| **Ejecución** | Elegir el modo correcto para cada tarea | `docs/guia-ejecucion.md` · agentes `implementador` y `verificador` (`.claude/agents/`) |
| **Memoria** | Que las sesiones no empiecen de cero | `docs/sesiones/` (plantilla `000`) · `/cierre-sesion` · higiene de contexto en `guia-ejecucion.md` |
| **Loops** | Bucles autónomos con freno | `/arregla-checks` (presupuesto 5 iteraciones, prohibido debilitar checks) · reglas de loop en `guia-ejecucion.md` |
| **Seguridad** | No publicar lo que no debe ser público | `docs/checklist-seguridad.md` · `.gitignore` · escaneo bloqueante en `/deploy-check` |

## Comandos disponibles

| Comando | Cuándo usarlo |
|---------|---------------|
| `/verifica` | Ver el estado de los checks sin tocar nada |
| `/arregla-checks` | Dejar los checks en verde (bucle autónomo acotado) |
| `/nueva-feature <nombre>` | Empezar cualquier feature del roadmap |
| `/nuevo-proyecto <nombre>` | Añadir una tarjeta a la galería de proyectos |
| `/deploy-check` | SIEMPRE antes de push (push = producción) |
| `/cierre-sesion` | Al terminar de trabajar, antes de `/clear` |
