# Guía de prompts — cómo pedir trabajo en este repo

## Los 5 ejes de un buen prompt

**Rol · Contexto · Tarea · Restricciones · Formato.**

El matiz clave con este arnés: **Rol, Contexto y Restricciones ya se cargan
solos** (CLAUDE.md, skills, specs). El prompt del día a día se reduce a:

> **Tarea exacta + Formato esperado + ancla a la spec/roadmap.**

No repitas lo que el arnés ya sabe («recuerda que es vanilla JS…», «no
olvides el modo oscuro…»): eso ya está en CLAUDE.md y las skills. Si tienes
que recordárselo cada vez, el arreglo es actualizar el arnés, no el prompt.

## Señales de prompt flojo

- **«Mejora X» sin qué ni dónde.** ¿Mejorar qué exactamente, medido cómo?
- **Features disfrazadas de tarea.** «Añade un formulario de contacto» no
  es una tarea, es la feature 005: va por `/nueva-feature`, no por chat.
- **Varios objetivos en una frase** («arregla el menú y de paso optimiza
  las imágenes») → dos peticiones separadas.

## 3 pares malo → bueno (casos reales de este repo)

### 1. Texto/i18n

- ❌ «Cambia la descripción del hero.»
- ✅ «En `index.html`, sección `#hero`, cambia el segundo párrafo a:
  ES "..." / EN "...". Mantén el patrón `.i18n` con `data-es`/`data-en` y
  muéstrame el diff antes de guardar.»

### 2. Estilos/tema

- ❌ «Las tarjetas de proyectos se ven mal en oscuro, mejóralas.»
- ✅ «En modo oscuro, el texto de `.project-tag` no tiene contraste
  suficiente con su fondo. Ajusta usando las variables de tema en
  `styles.css` (sin hex fijos) y verifica en ambos temas. Formato:
  captura antes/después o descripción del cambio de variables.»

### 3. Feature del roadmap

- ❌ «Hazme el SEO del sitio.»
- ✅ «/nueva-feature 002-seo-accesibilidad» — y en la fase Specify se
  concreta el alcance (qué meta tags, qué imágenes necesitan alt, criterio
  de contraste) con criterios verificables.

## Regla de oro

Si no puedes escribir el criterio de «terminado» de tu petición en una
frase verificable, aún no es una tarea: es una conversación de spec.
Tenla primero (Plan Mode o `/nueva-feature`).
