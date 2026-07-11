---
description: Checklist bloqueante antes de hacer push a main (push = publicar en GitHub Pages)
allowed-tools: Bash, PowerShell, Read, Grep, Glob
---

Este repo publica en GitHub Pages con cada push a `main`: este checklist es
la última barrera antes de producción. Ejecuta TODOS los pasos y reporta la
tabla completa; **si cualquier paso falla, el push queda BLOQUEADO**.

1. **Checks en verde:**
   - `npx --yes html-validate index.html`
   - `npx --yes linkinator index.html --skip "^https?://(?!localhost)" --format csv`
2. **Sin dependencias sorpresa:** confirma que NO aparecieron package.json,
   node_modules, CDNs o `<script src>` externos nuevos no acordados
   (`git diff origin/main --stat` + revisar index.html).
3. **Config correcta:** `<html lang="es" data-theme="light">` intacto,
   título y meta viewport presentes, rutas de assets relativas (GitHub
   Pages no perdona rutas absolutas locales tipo `C:\`).
4. **`git status` limpio:** todo lo que va a publicarse está commiteado;
   nada sin trackear que debería ir (o que NO debería ir) en el push.
5. **Escaneo de secretos (BLOQUEANTE):**
   - `git diff origin/main` y busca patrones: `api[_-]?key`, `token`,
     `password`, `Bearer`, `secret`, claves privadas (`BEGIN.*PRIVATE KEY`).
   - Revisa también archivos nuevos binarios/PDF añadidos: nada con datos
     personales de terceros (el repo es público).
   - Cualquier hallazgo = BLOQUEADO hasta que el usuario lo resuelva.
6. Reporta: tabla paso → ✅/❌ + veredicto final «LISTO PARA PUSH» o
   «BLOQUEADO: [motivo]». No hagas push tú: eso lo decide el humano.
