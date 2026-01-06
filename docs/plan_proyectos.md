# Plan de Implementación — Página PROYECTOS

**Fecha**: 2 de enero de 2026  
**Objetivo**: Implementar la página de proyectos siguiendo las pautas de componente portfolio del profesor, manteniendo total coherencia con el diseño editorial existente.

---

## 1. Estructura de la Página

### Componentes principales (orden vertical):
1. **Header fijo y transparente** (ya existente, compartido entre páginas)
2. **Hero de página** — Franja negra full-width con título y descripción
3. **Grid de proyectos** — Sistema de cards responsive con interacción CSS-only
4. **Footer** (ya existente, compartido)

---

## 2. Componentes Detallados

### 2.1 Hero de página (`.projects-hero`)
- **Markup semántico**:
  ```html
  <section class="projects-hero">
    <div class="projects-hero__inner">
      <h1>PROYECTOS</h1>
      <p>Selección de trabajos donde concepto, diseño y ejecución van de la mano.</p>
    </div>
  </section>
  ```
- **Estilo**:
  - Fondo negro full-width (como servicios/contacto)
  - Texto blanco
  - Padding interno alineado con `.container` del sitio
  - `h1` con Funnel Display uppercase
  - `p` con Source Code Pro
- **Comportamiento**:
  - El header transparente queda sobre el hero
  - La navegación debe contrastar (blanco sobre negro)

### 2.2 Grid de proyectos (`.projects-grid`)
- **Markup**:
  ```html
  <section class="projects-grid">
    <article class="project-card">
      <div class="project-card__image">
        <img src="..." alt="...">
      </div>
      <div class="project-card__content">
        <h2 class="project-card__title">Título del proyecto</h2>
        <div class="project-card__tags">
          <span class="tag">Branding</span>
          <span class="tag">Foto</span>
        </div>
      </div>
      <div class="project-overlay">
        <p class="project-overlay__desc">Descripción...</p>
        <div class="project-overlay__links">
          <a href="#" class="project-link">DEMO</a>
          <a href="#" class="project-link">REPO</a>
        </div>
      </div>
    </article>
  </section>
  ```
- **Layout CSS Grid**:
  - Desktop: `grid-template-columns: repeat(3, 1fr)`
  - Tablet: `repeat(2, 1fr)`
  - Mobile: `repeat(1, 1fr)`
  - `gap: 2rem` (ajustable según diseño)

### 2.3 Project Card (`.project-card`)
- **Estados visuales**:
  - **Default**: Imagen, título y tags visibles
  - **Hover/Focus**: Overlay semitransparente con descripción y links
- **Jerarquía visual**:
  - Imagen placeholder neutral (fondo gris o marco)
  - Título en Source Code Pro, uppercase, peso 600
  - Tags pequeños, uppercase, borde fino
  - Overlay con descripción legible y botones claramente identificables

### 2.4 Overlay de Hover (`.project-overlay`)
- **Comportamiento**:
  - Activado por `:hover` y `:focus-within` (sin JS)
  - Transición suave de opacidad (respetando `prefers-reduced-motion`)
  - Posición absolute dentro del card
  - No desplaza el layout (overlay cubre el card)
- **Contenido**:
  - Descripción del proyecto
  - Dos enlaces: "DEMO" y "REPO" (placeholders `#`)
- **Accesibilidad**:
  - Links alcanzables por teclado
  - Contraste suficiente (texto blanco sobre oscuro o viceversa)
  - `focus-visible` para indicador de teclado

---

## 3. Estrategia Responsive

### Breakpoints:
```css
/* Desktop (por defecto) */
.projects-grid { grid-template-columns: repeat(3, 1fr); }

/* Tablet (~900px) */
@media (max-width: 900px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile (~600px) */
@media (max-width: 600px) {
  .projects-grid { 
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .projects-hero__inner {
    padding-top: calc(var(--header-h) + 2rem);
    padding-bottom: 2rem;
  }
}
```

### Ajustes específicos:
- Hero padding: reducir en móvil para mejor aprovechamiento vertical
- Cards: en móvil, stacking natural; considerar imagen más pequeña o aspect-ratio ajustado
- Overlay: en móvil, puede estar siempre visible o activarse con tap (CSS `hover` funciona en touch)

---

## 4. Accesibilidad

### Interacción por Teclado
- **Navegación Tab**: debe recorrer cards y links en orden lógico
- **Focus-within**: el overlay se activa cuando cualquier elemento hijo recibe foco
- **Focus-visible**: borde o outline visible al navegar con teclado
- **Enlaces semánticos**: `<a>` con `href` válido, no botones simulados

### Semántica HTML
- `<section>` para áreas principales (hero, grid)
- `<article>` para cada proyecto (unidad autocontenida)
- `<h1>` único en el hero
- `<h2>` para títulos de proyectos (jerarquía correcta)
- `alt` descriptivo en imágenes

### Motion y Animaciones
```css
@media (prefers-reduced-motion: reduce) {
  .project-overlay,
  .project-card {
    transition: none !important;
  }
}
```
- Desactiva transiciones si el usuario prefiere movimiento reducido
- Overlay aún funcional, simplemente aparece instantáneamente

### Contraste y Legibilidad
- Hero negro con texto blanco: contraste 21:1 ✅
- Overlay: fondo semitransparente oscuro con texto blanco (mínimo 4.5:1)
- Tags: borde fino con suficiente contraste sobre fondo claro

---

## 5. Contenido de los 6 Proyectos

### Proyecto 1: Identidad para marca cultural
- **Tags**: Branding · Dirección creativa
- **Descripción**: Desarrollo de una identidad visual flexible pensada para un proyecto cultural en crecimiento, con especial atención al sistema gráfico y su aplicación en distintos soportes.
- **Links**: DEMO | REPO (placeholders)

### Proyecto 2: Editorial fotográfico
- **Tags**: Fotografía · Moda
- **Descripción**: Serie fotográfica de carácter editorial centrada en narrativa visual, ritmo y composición, desarrollada para un entorno digital y promocional.
- **Links**: DEMO | REPO

### Proyecto 3: Contenido audiovisual para redes
- **Tags**: Video · Motion
- **Descripción**: Piezas de video pensadas para formatos verticales y consumo rápido en redes sociales, cuidando ritmo, edición y coherencia visual.
- **Links**: DEMO | REPO

### Proyecto 4: Web portfolio creativo
- **Tags**: Web · UI
- **Descripción**: Diseño y desarrollo de un portfolio web con enfoque editorial, priorizando jerarquía visual, legibilidad y experiencia de usuario.
- **Links**: DEMO | REPO

### Proyecto 5: Fotografía de evento cultural
- **Tags**: Fotografía · Evento
- **Descripción**: Cobertura visual de un evento cultural, buscando capturar atmósfera, momentos clave y narrativa documental.
- **Links**: DEMO | REPO

### Proyecto 6: Identidad y packaging
- **Tags**: Branding · Packaging
- **Descripción**: Sistema gráfico aplicado a packaging, trabajando concepto, materialidad y coherencia con la identidad de marca.
- **Links**: DEMO | REPO

---

## 6. Sistema de Diseño (Coherencia)

### Tipografía
- **Source Code Pro**: Todo el texto UI (títulos, tags, descripciones, links)
- **Funnel Display**: Solo para "kutainas®" wordmark y hero `h1` mayúscula

### Colores
- Negro: `#000` (hero, texto, bordes)
- Blanco: `#fff` (texto sobre negro, overlay text)
- Gris claro: `#f2f2f0` (fondo página)
- Gris medio: `#ddd` o `#ccc` (placeholders, bordes sutiles)

### Espaciado
- Usar variables CSS existentes: `var(--space-xl)`, `var(--space-2xl)`
- Padding interno del hero: `clamp(2rem, 4vw, 3.5rem)`
- Gap del grid: `2rem` (desktop), `1.5rem` (mobile)

### Líneas y Bordes
- Grosor: `1px` (consistente con servicios)
- Color: `rgba(0,0,0,.25)` o `#ddd`
- Estilo: `solid`

---

## 7. Estado Activo de Navegación

El JavaScript existente (`main.js`) ya gestiona el estado activo:
- Detecta la página actual por `location.pathname`
- Añade clase `.is-active` al link correspondiente
- Mueve el `.nav-underline` debajo del link activo

**No requiere cambios**: el link "PROYECTOS" se activará automáticamente en `proyectos.html`.

---

## 8. Checklist de Implementación

- [ ] **HTML**: Editar `proyectos.html` con hero y grid de 6 proyectos
- [ ] **CSS**: Añadir estilos en `layout.css`:
  - `.projects-hero` y variantes
  - `.projects-grid` con CSS Grid responsive
  - `.project-card`, `.project-overlay`, `.project-card__image`, etc.
  - Media queries para tablet y mobile
  - `@media (prefers-reduced-motion: reduce)`
- [ ] **Pruebas**:
  - Hover/focus en desktop
  - Navegación por teclado (Tab + Enter)
  - Responsive en 3 breakpoints
  - Contraste y legibilidad
  - Nav activo en "PROYECTOS"
  - Sin regresiones en otras páginas