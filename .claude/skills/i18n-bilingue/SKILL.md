---
name: i18n-bilingue
description: Usar siempre que se añada, edite o mueva texto visible en index.html, o se toque la lógica de idioma en JS/main.js (applyLang, langToggle, data-es/data-en).
---

# Sistema bilingüe ES/EN del portafolio

## Cómo funciona (exacto)

- Cada texto visible es un elemento con `class="i18n"` y DOS atributos:
  `data-es="..."` y `data-en="..."`. El contenido inicial del elemento es la
  versión en español.
- `JS/main.js` → `applyLang(lang)` recorre `document.querySelectorAll('.i18n')`
  y hace `el.textContent = el.getAttribute('data-' + lang)`.
- El idioma vive en `localStorage` clave `lang` (`'es'` | `'en'`, default `'es'`)
  y se refleja en `<html data-lang="...">`.
- El botón es `#langToggle` (sidebar); su etiqueta `#langLabel` muestra el
  idioma DESTINO («English» cuando estás en español y viceversa).
- La etiqueta del tema (`#themeLabel`) se re-sincroniza aparte en
  `updateThemeUI()` porque su texto depende de idioma Y tema a la vez
  (Oscuro/Claro vs Dark/Light). Si añades otro control con esa doble
  dependencia, sigue el mismo patrón.

## Reglas duras

1. **Nunca añadas texto visible sin `data-es` Y `data-en`.** Un atributo
   faltante deja el texto congelado en un idioma al alternar.
2. **Los elementos `.i18n` solo pueden contener TEXTO plano.** `applyLang`
   usa `textContent`: cualquier hijo HTML (iconos, spans anidados) sería
   destruido al cambiar de idioma. El patrón del repo es partir la frase en
   varios spans hermanos, p. ej.:
   ```html
   <h2><span class="i18n" data-es="Mis " data-en="My ">Mis </span><span class="green i18n" data-es="Proyectos" data-en="Projects">Proyectos</span></h2>
   ```
   El emoji o icono va FUERA del span `.i18n` (ver `.skill-card` y los
   botones del juego).
3. Los nombres propios y palabras iguales en ambos idiomas (Monstermon,
   figou.mx, Java, Front-End) NO llevan `.i18n` — no lo añadas de más.
4. Los textos generados por JS (alert del juego, «¡GANASTE!», flash,
   mensajes finales) hoy están solo en español. Es una limitación conocida;
   si la arreglas, hazlo leyendo `data-lang` de `<html>` como hace
   `updateThemeUI`, no con otro sistema.

## Verificación tras editar

1. `npx --yes html-validate index.html` (los atributos data-* con comillas
   mal escapadas rompen el parseo).
2. Abrir el sitio (`npx --yes serve .`), pulsar «English» y revisar la
   sección tocada: ningún texto debe quedarse en español, ningún icono debe
   desaparecer. Volver a «Español» y re-revisar.
3. Revisar que el texto por defecto (contenido del elemento) coincide con
   `data-es`.
