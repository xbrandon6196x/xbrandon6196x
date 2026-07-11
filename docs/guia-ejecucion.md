# Guía de ejecución — qué modo usar para cada cosa

## Elegir el modo

| Situación | Modo |
|-----------|------|
| Cambio atómico y claro (un texto, un estilo, un bug puntual) | **Build directo** — pedirlo y revisar el diff |
| Refactor o zona crítica (`applyLang`, lógica del juego, breakpoint, renombrar IDs) | **Plan Mode primero** — plan aprobado antes de tocar código |
| Feature del roadmap (algo que el visitante notará) | **`/nueva-feature`** — ciclo SDD completo con OK entre fases |
| Añadir un proyecto a la galería | **`/nuevo-proyecto`** — alta guiada |
| Checks rotos | **`/arregla-checks`** — bucle acotado |

## Subagentes: cuándo sí y cuándo no

- **Sí — `implementador`** (modelo medio): durante Implement de
  `/nueva-feature` cuando hay 3+ tareas independientes entre sí. Cada
  invocación = UNA tarea del tasks.md.
- **Sí — `verificador`** (modelo potente, sin edición): SIEMPRE en Verify.
  La verificación es el freno del coche: ahí no se ahorra.
- **Sí — Explore**: búsquedas amplias («¿dónde se usa X?») que ensuciarían
  el contexto principal con dumps de archivos.
- **No** para tareas pequeñas: un subagente arranca SIN contexto (no vio la
  conversación); para un cambio de 5 líneas, explicárselo cuesta más que
  hacerlo. En este repo (3 archivos de código) casi todo lo pequeño va
  directo.

## Higiene de contexto

- **`/compact` dirigible en vez de `/clear`:** «/compact conserva las
  decisiones sobre la feature 002 y el estado de los checks». `/clear`
  borra todo; solo úsalo DESPUÉS de `/cierre-sesion` (la memoria ya quedó
  en `docs/sesiones/`).
- **Referencia rutas, no pegues archivos:** «revisa `JS/main.js` líneas
  190–213» en vez de pegar el bloque. El agente sabe leer.
- **Al retomar:** leer la bitácora más reciente de `docs/sesiones/` +
  `spec/constitution/roadmap.md`. Nada más; el resto se carga solo.

## Loop engineering (bucles autónomos)

Un bucle autónomo necesita las 3 patas, o no es un bucle sino una deriva:

1. **Acción verificable** — p. ej. corregir errores de `html-validate`.
2. **Condición de salida objetiva** — checks en verde (código de salida 0),
   no «se ve mejor».
3. **Presupuesto de iteraciones** — `/arregla-checks` tiene 5; si se agota,
   el bucle PARA y reporta, no insiste.

**El árbitro es la regla documentada, no el test.** Si el check y la regla
del repo (CLAUDE.md/skill) se contradicen, el bucle se detiene y pregunta
al humano. Debilitar el check para salir del bucle está prohibido siempre:
se arregla la causa, no el detector.
