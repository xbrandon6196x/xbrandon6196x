---
description: Corre los checks del proyecto (HTML + enlaces) y reporta resultados
allowed-tools: Bash, PowerShell, Read, Grep
---

Corre la verificación completa del sitio y reporta. NO arregles nada sin OK
del usuario.

1. Ejecuta la validación de HTML:
   `npx --yes html-validate index.html`
2. Ejecuta la verificación de assets/enlaces locales:
   `npx --yes linkinator index.html --skip "^https?://(?!localhost)" --format csv`
3. Reporta en una tabla: check, resultado (✅/❌), número de errores.
4. Si hay errores:
   - Clasifícalos por regla (p. ej. `no-inline-style`, `no-implicit-button-type`)
     y por gravedad real (¿rompe algo en el navegador o es calidad/a11y?).
   - Diagnostica la causa de cada grupo leyendo el código afectado.
   - **NO apliques correcciones.** Propón el arreglo y espera OK
     (o sugiere `/arregla-checks` si el usuario quiere el bucle completo).
5. Si todo pasa, dilo explícitamente: «Checks en verde».
