---
description: Bucle autónomo que corrige errores de los checks hasta dejarlos en verde
argument-hint: [regla o archivo concreto, opcional]
allowed-tools: Bash, PowerShell, Read, Edit, Write, Grep, Glob
---

Bucle: correr checks → diagnosticar → corregir CAUSA RAÍZ → repetir.
Condición de salida: `html-validate` y `linkinator` sin errores.
**Presupuesto: 5 iteraciones.** Si `$ARGUMENTS` indica una regla o archivo,
limítate a ese alcance.

1. Corre `npx --yes html-validate index.html` y
   `npx --yes linkinator index.html --skip "^https?://(?!localhost)" --format csv`.
   Si ambos pasan: reporta «todo verde» y termina.
2. Toma el primer grupo de errores (misma regla), lee el código afectado y
   corrige la causa raíz imitando el estilo del archivo.
   - Cambios de texto visible → respeta la skill `i18n-bilingue`.
   - Cambios de estilos → respeta la skill `diseno-tema-responsive`
     (inline styles se mueven a styles.css con variables de tema).
3. Vuelve al paso 1. Cuenta la iteración.
4. **PROHIBIDO debilitar los checks:** no crees `.htmlvalidate.json` para
   apagar reglas, no añadas `--skip` extra a linkinator, no borres el
   elemento que da error para «resolverlo». Se arregla el código, no el
   detector.
5. Si un error contradice una regla documentada (CLAUDE.md o una skill) —
   p. ej. el validador exige algo que rompería el i18n — PARA y pregunta
   al usuario antes de tocar nada.
6. Si agotas las 5 iteraciones sin verde: para y reporta qué queda, por qué,
   y qué propones.
7. Reporte final: iteraciones usadas, errores corregidos (por regla),
   archivos tocados, estado final de ambos checks.
