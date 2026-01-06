# Plantilla de Portfolio para Diseñadores Creativos

Una plantilla de portfolio limpia, moderna y totalmente personalizable diseñada específicamente para profesionales creativos: diseñadores, fotógrafos, videógrafos y artistas digitales.

**Demo en Vivo**: [https://kutainas.github.io/Portfolio-Template-for-Creative-Designers/](https://kutainas.github.io/Portfolio-Template-for-Creative-Designers/)

---

## Características

- **Totalmente Responsive**: Funciona perfectamente en escritorio, tablet y móvil
- **Soporte Multi-Media**: Imágenes, videos y PDFs con lightbox de pantalla completa
- **Animaciones Suaves**: Animaciones de scroll basadas en IntersectionObserver
- **Integración de PDF**: Visualiza y desplázate a través de portfolios PDF en el navegador
- **Código Limpio**: Bien organizado, comentado y fácil de personalizar
- **Rendimiento**: Carga optimizada e interacciones fluidas
- **Accesible**: HTML semántico, etiquetas ARIA, navegación por teclado
- **Cursor Personalizado**: Cursor seguidor suave con efectos hover

---

## Inicio Rápido

### 1. Descargar o Clonar
```bash
git clone https://github.com/kutainas/Portfolio-Template-for-Creative-Designers.git
cd Portfolio-Template-for-Creative-Designers
```

### 2. Abrir en el Navegador
¡No necesita proceso de compilación! Solo abre `index.html` o `proyectos.html` en tu navegador.

### 3. Empezar a Personalizar
Sigue los comentarios **PERSONALIZABLE** en el código o lee las secciones a continuación.

---

## Estructura del Proyecto

```
Portfolio-Template/
├── index.html              # Página de inicio
├── proyectos.html          # Galería de proyectos ← EMPIEZA AQUÍ
├── servicios.html          # Página de servicios
├── contacto.html           # Página de contacto
├── 404.html                # Página de error
├── README.md               # Este archivo
├── assets/
│   ├── css/
│   │   ├── theme.css       # Colores, fuentes, variables
│   │   ├── base.css        # Tipografía base
│   │   ├── layout.css      # Diseños de página
│   │   └── ...
│   ├── js/
│   │   └── main.js         # Animaciones, modal, cursor
│   └── images/             # Tus archivos multimedia
```

---

## GUÍA DE PERSONALIZACIÓN

### Cambiar Colores y Fuentes

**Archivo**: `assets/css/theme.css` (líneas 1-80)

```css
/* PERSONALIZABLE: Cambia estos valores para que coincidan con tu marca */
:root {
  --color-background: #f9fafb;    /* Fondo de página */
  --color-foreground: #1e293b;    /* Color del texto */
  --color-primary: #2563eb;       /* Color de acento */
  
  /* PERSONALIZABLE: Tipografías */
  --font-sans: 'Bebas Neue', sans-serif;
  --font-serif: 'Outfit', serif;
}
```

**Qué afecta**: Todos los colores y tipografía en todo el sitio.

---

### Añadir Proyectos

**Archivo**: `proyectos.html` (líneas 175-270)

**Paso 1**: Encuentra este bloque y duplícalo:

```html
<!-- PERSONALIZABLE: Duplica este <article> para cada proyecto -->
<article class="project-tile">
  <!-- Categoría del proyecto -->
  <div class="project-tile__name">Branding</div>
  
  <!-- Título del proyecto -->
  <div class="project-tile__title">Tu Proyecto, 2026</div>
  
  <!-- Media del proyecto -->
  <a class="project-tile__media" href="#" aria-label="Abrir proyecto">
    <!-- Choose ONE media type: -->
    
    <!-- FOR IMAGE: -->
    <img src="YOUR_IMAGE_URL" alt="Description" loading="lazy">
    
    <!-- FOR VIDEO: -->
    <!-- <video src="YOUR_VIDEO_URL" autoplay loop muted playsinline></video> -->
    
    <!-- FOR PDF: Add data-type="pdf" -->
    <!-- <a data-type="pdf" data-src="YOUR_PDF_URL">
      <img src="PDF_COVER_IMAGE" alt="..." loading="lazy">
    </a> -->
  </a>
  
  <!-- Description and tags -->
  <div class="project-tile__meta">
    <div class="project-tile__desc">Project description...</div>
    <div class="project-tile__tags">
      <span class="tag">Design</span>
      <span class="tag">Branding</span>
    </div>
  </div>
</article>
```

**Step 2**: Update the content:
- Change `project-tile__name` (category)
- Change `project-tile__title` (project name + year)
- Replace media (image/video/PDF)
- Update description
- Modify tags

---

### Añadir Proyectos PDF

Los PDFs se abren automáticamente en un lightbox desplazable. Para añadir un PDF:

```html
<a class="project-tile__media" href="#" 
   data-type="pdf" 
   data-src="https://tu-cdn.com/documento.pdf">
  <!-- Imagen de portada -->
  <img src="https://tu-cdn.com/portada.jpg" alt="Vista previa PDF" loading="lazy">
</a>
```

**Qué sucede**:
- En la cuadrícula: Muestra la imagen de portada
- Al hacer clic: Abre un modal de pantalla completa con todas las páginas (desplázate para navegar)

**Ejemplo**: Ver el proyecto "Branding" en proyectos.html (línea 225)

---

### Personalizar Animaciones

**Archivo**: `assets/js/main.js` (líneas 52-56)

```javascript
// PERSONALIZABLE: Ajusta cuándo se activan las animaciones
const observerOptions = {
  rootMargin: '0px 0px -10% 0px',  // Cambia -10% para activar antes/después
  threshold: 0.1                    // Cambia para requerir más/menos visibilidad
};
```

**Qué hace**:
- `rootMargin`: Los valores negativos activan la animación antes de que el elemento entre en el viewport
- `threshold`: 0.1 = 10% del elemento debe ser visible

---

### Personalizar Cursor Seguidor

**Archivo**: `assets/js/main.js` (líneas 547-551)

```javascript
// PERSONALIZABLE: Comportamiento del cursor
const DEFAULT_GROW_SCALE = 1.6;   // Escala al hacer hover (enlaces)
const NAV_GROW_SCALE = 2.5;       // Escala en enlaces de navegación
const LERP_POS = 0.14;            // Suavidad (0-1, menor = más suave)
```

**Para desactivar el cursor seguidor**:
1. Elimina `<div class="cursor-follower"></div>` del HTML
2. Comenta el bloque del cursor en main.js (líneas 537-620)

---

### Actualizar Información de Contacto

**Archivos**: `index.html`, `contacto.html`

```html
<!-- PERSONALIZABLE: Actualiza tus datos de contacto -->
<a href="mailto:tu@email.com">tu@email.com</a>
<a href="tel:+34123456789">+34 123 456 789</a>
<a href="https://wa.me/34123456789">WhatsApp</a>
```

**Botón Copiar WhatsApp** (main.js línea 551):
```javascript
// PERSONALIZABLE: Número de teléfono a copiar
await navigator.clipboard.writeText('+34 689 57 18 25');
```

---

### Descarga de CV/Currículum

**Archivo**: `proyectos.html` (línea 165)

```html
<!-- PERSONALIZABLE: Actualiza la URL de tu PDF de CV -->
<a href="#" data-type="pdf" 
   data-src="https://tu-cdn.com/CV.pdf">
  ¡ÉCHALE UN VISTAZO A MI CURRÍCULUM!
</a>
```

**Qué sucede al hacer clic**:
1. Descarga automáticamente el PDF
2. Abre el PDF en un modal de pantalla completa para visualización

---

### Ajustar Cuadrícula de Proyectos

**Archivo**: `assets/css/layout.css` (líneas 1244-1260)

```css
/* PERSONALIZABLE: Tamaño de las tarjetas de proyecto */
.project-tile {
  width: clamp(220px, 22vw, 360px);  /* Mín, fluido, máx */
}

/* PERSONALIZABLE: Efecto de escala al hacer hover */
.project-tile:hover {
  transform: scale(1.25);  /* 25% más grande al hacer hover */
}

/* PERSONALIZABLE: Proporción de aspecto de la imagen */
.project-tile__media img,
.project-tile__media video {
  aspect-ratio: 3 / 2;  /* Cambia a 16/9, 4/3, 1/1, etc. */
}
```

---

## Detalles Técnicos

### Tecnologías
- **HTML5**: Marcado semántico
- **CSS3**: Propiedades personalizadas, Grid, Flexbox
- **JavaScript Vanilla**: Sin frameworks
- **PDF.js**: Para renderizado de PDF
- **Bootstrap 5**: Solo para modales de utilidad

### Compatibilidad de Navegadores
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Navegadores móviles

### Dependencias (CDN)
```html
<!-- Fuentes -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap">

<!-- Bootstrap (solo modales) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

<!-- PDF.js (solo proyectos.html) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
```

---

## Tareas Comunes

### Añadir una Nueva Página
1. Duplica `servicios.html`
2. Actualiza `<title>` y el contenido
3. Añade enlace a la navegación en todos los archivos HTML

### Cambiar a Cuadrícula Tradicional (en lugar de scroll horizontal)
**Archivo**: `assets/css/layout.css`

```css
.projects-catalog__track {
  /* Cambia de flex a grid */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  overflow-x: visible;  /* Elimina el scroll */
}
```

### Optimizar Imágenes
- Usa formato WebP
- Redimensiona al tamaño de visualización real
- Usa carga diferida: `loading="lazy"`

---

## Solución de Problemas

### Los PDFs no cargan
- Verifica errores CORS en la consola
- Asegúrate de que las URLs de PDF sean públicamente accesibles
- Verifica que el CDN de PDF.js se esté cargando

### Las imágenes no aparecen
- Verifica que las URLs de las imágenes sean correctas
- Usa rutas relativas: `assets/images/foto.jpg`
- Revisa la consola del navegador para errores 404

### Las animaciones no funcionan
- Verifica que los elementos tengan atributos `data-reveal`
- Verifica el soporte de IntersectionObserver
- Revisa la consola del navegador para errores

---

## Licencia

Licencia MIT - ver archivo [LICENSE](LICENSE)

---

## Créditos

**Plantilla por**: Lucas Ucelay  
**Construido con**: HTML, CSS, JavaScript  
**Inspiración**: Tendencias modernas de portfolios

---

## Recursos de Aprendizaje

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [API IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## Muestra Tu Trabajo

¿Construiste tu portfolio con esta plantilla? ¡Compártelo!
- Etiqueta #PortfolioTemplate
- Abre un PR para añadir tu sitio al showcase

---

**¿Listo para construir tu portfolio?**

¡Empieza editando `proyectos.html` y añadiendo tus proyectos!
