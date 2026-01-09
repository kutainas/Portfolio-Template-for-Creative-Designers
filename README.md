# https://kutainas.github.io/Portfolio-Template-for-Creative-Designers/

## Descripción y propósito del proyecto

Este proyecto nace como mi portfolio profesional, desarrollado como práctica final para la asignatura de programación. En un inicio la idea era crear un portfolio cerrado y personal, pero durante el desarrollo preferí mantener una estética y una estructura reutilizables, pensando en que pudiera funcionar también como template para los trabajos de otra persona. Por este motivo he priorizado una arquitectura sencilla, clara y fácil de personalizar.

Más allá del resultado visual, he intentado que el proyecto refleje mi forma de trabajar: orden, cuidado por los detalles e intención en cada decisión tomada, tanto a nivel de diseño como de estructura y código.

---

## Stack tecnológico utilizado

He optado por un stack intermedio que me permitiera trabajar con agilidad sin perder el control del código ni depender en exceso de soluciones cerradas:

- **HTML5 semántico**, cuidando la estructura y la jerarquía del contenido  
- **CSS** con una organización modular y enfoque responsive  
- **Bootstrap 5** como apoyo para layout y componentes, siempre personalizado  
- **JavaScript (ES6)** para la interactividad y el comportamiento  
- **GSAP** para animaciones y transiciones visuales  
- **GitHub Pages** para el despliegue  

La elección de Bootstrap y GSAP responde a una necesidad práctica: poder centrarme en el diseño y la experiencia de usuario sin tener que reinventar soluciones básicas, pero manteniendo margen suficiente para personalizar y construir una identidad visual propia.

---

## Instrucciones de configuración para desarrollo local

El proyecto no requiere pasos de build ni dependencias complejas. Para trabajar en local basta con clonar el repositorio:

https://github.com/kutainas/Portfolio-Template-for-Creative-Designers.git

Una vez clonado, el proyecto puede abrirse directamente en el navegador o mediante un servidor local para facilitar el desarrollo.

---

## Guía de personalización

Esta sección indica qué partes del proyecto pueden modificarse para personalizar el portfolio sin romper su estructura ni su diseño general.

### Pasos recomendados

1. Clonar el repositorio  
2. Modificar textos, recursos multimedia y colores según las necesidades  
3. Probar el diseño en distintos dispositivos  
4. Desplegar el proyecto en producción  

### Textos y contenido

- Archivos: `index.html`, `proyectos.html`  
- Se pueden modificar títulos, descripciones y textos de cada sección.  
- Los proyectos pueden duplicarse o eliminarse siguiendo la estructura existente.

### Imágenes, vídeos y documentos PDF

- Archivos: `index.html`, `proyectos.html`  
- Las URLs de los recursos multimedia pueden sustituirse directamente.  
- El sistema de modal ya está preparado para mostrar imágenes, vídeos y documentos PDF.

### Colores y branding

- Archivo: `css/base.css`  
- Las variables CSS definidas en `:root` permiten modificar colores principales, fondos y acentos visuales de forma sencilla.

### Tipografía

- Archivo: `css/base.css`  
- Se pueden cambiar las fuentes y los tamaños base manteniendo la jerarquía visual del diseño.

### Animaciones y transiciones

- Archivo: `css/components.css`  
- Las duraciones y efectos de las animaciones pueden ajustarse sin alterar el layout general del sitio.

### Modal fullscreen

- Archivo: `js/modal.js`  
- Se puede personalizar:
  - el tamaño máximo del modal  
  - el comportamiento del cierre  
  - la reproducción de vídeos  
  - la navegación de documentos PDF  

---

## Uso de inteligencia artificial

Durante el desarrollo de este portfolio he utilizado herramientas de inteligencia artificial como apoyo puntual para optimizar el flujo de trabajo, generar ideas y resolver algunos problemas técnicos concretos. En concreto Copilot y ChatGPT.

La IA se ha empleado principalmente como una herramienta de ayuda y consulta, permitiéndome centrarme más en la parte creativa, la experiencia visual y la organización del proyecto. En ningún caso ha sustituido el criterio propio ni el proceso de diseño y desarrollo, ya que todas las decisiones finales han sido tomadas de manera consciente y personal.

Entiendo la inteligencia artificial como un recurso más dentro del proceso creativo y técnico, similar a una documentación avanzada o una segunda opinión, y no como un atajo que elimine el aprendizaje o la reflexión detrás del proyecto.

---

## Reflexión personal

Trabajar en este proyecto me ha permitido tener una visión más completa de lo que implica desarrollar un portfolio web desde cero, no solo a nivel visual, sino también en cuanto a estructura y organización.

Uno de los aspectos que más me ha gustado ha sido poder presentar mis trabajos en un formato útil y accesible, pensado para compartirlo fácilmente y mostrar los proyectos de una manera clara y profesional. La web me ha permitido experimentar con la presentación y la interacción con el ususario, pudiendo crear algo visual y llamativo. 

También estoy especialmente orgulloso de la evolución del proyecto y del cuidado puesto en los detalles, incluso en elementos "pequeños" como las animaciones, que creo que marcan la diferencia en la experiencia final.

Soy consciente de que aún quedan muchas cosas por mejorar. Aunque he trabajado el diseño responsive, reconozco que todavía se puede perfeccionar para lograr una experiia completamente fluida en todos los tamaños de pantalla. La gestión del tiempo ha sido algunos de los retos más importantes durante el desarrollo.

En general, este proyecto me ha servido para identificar tanto mis puntos fuertes como aquellos aspectos en los que puedo seguir mejorando, y lo considero una base sólida sobre la que seguir trabajando y evolucionando en futuras versiones.

---

## Control de versiones y despliegue

El proyecto utiliza Git como sistema de control de versiones, siguiendo buenas prácticas:

- Uso de ramas para desarrollo  
- Commits cada poco tiempo  
- Repositorio preparado para despliegue mediante GitHub Pages.

---

