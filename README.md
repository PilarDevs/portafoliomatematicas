# AppNext - Portafolio Matemáticas

## 📁 Estructura del Proyecto

```
appNext/
├── index.html                      # Página principal
├── components/
│   └── modules/                    # Módulos HTML
│       ├── navbar.html            # Barra de navegación
│       ├── hero.html              # Sección hero/inicio
│       ├── about.html             # Sección sobre mí
│       ├── services.html          # Sección servicios
│       ├── portfolio.html         # Sección portafolio
│       ├── contact.html           # Sección contacto
│       └── footer.html            # Pie de página
└── public/
    └── asset/
        ├── css/                    # Estilos CSS
        │   ├── main.css           # Estilos principales
        │   ├── navbar.css         # Estilos navbar
        │   ├── hero.css           # Estilos hero
        │   ├── about.css          # Estilos about
        │   ├── services.css       # Estilos services
        │   ├── portfolio.css      # Estilos portfolio
        │   ├── contact.css        # Estilos contact
        │   └── footer.css         # Estilos footer
        ├── js/                     # Scripts JavaScript
        │   ├── main.js            # Script principal
        │   ├── navbar.js          # Funcionalidad navbar
        │   ├── portfolio.js       # Filtros portfolio
        │   ├── contact.js         # Formulario contacto
        │   ├── animations.js      # Animaciones
        │   └── utils.js           # Utilidades
        └── img/                    # Imágenes (vacío por defecto)
```

## 🚀 Características

- **Diseño Modular**: Todos los componentes están separados en módulos independientes
- **Responsive**: Diseño adaptable a todos los dispositivos
- **Tailwind CSS**: Framework CSS para estilos rápidos y consistentes
- **CSS Personalizado**: Estilos adicionales para animaciones y efectos
- **JavaScript Modular**: Scripts organizados por funcionalidad
- **Animaciones**: Efectos suaves y modernos
- **SEO Friendly**: Estructura semántica y optimizada

## 🎨 Secciones

1. **Navbar**: Navegación fija con menú responsive
2. **Hero**: Sección principal con llamada a la acción
3. **About**: Información personal y habilidades
4. **Services**: Servicios ofrecidos (6 tarjetas)
5. **Portfolio**: Galería de proyectos con filtros
6. **Contact**: Formulario de contacto y datos
7. **Footer**: Información y enlaces sociales

## 🛠️ Tecnologías

- HTML5
- CSS3
- Tailwind CSS (CDN)
- JavaScript ES6+
- Font Awesome (iconos)

## 📝 Uso

1. Abre el archivo `index.html` en tu navegador
2. Los módulos se cargan automáticamente
3. La navegación es completamente funcional
4. El formulario de contacto incluye validación

## ⚙️ Personalización

### Colores
Los colores principales están definidos en `main.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #4f46e5;
    --text-dark: #1f2937;
    --text-light: #6b7280;
}
```

### Módulos
Cada módulo HTML puede editarse independientemente en `components/modules/`

### Estilos
Cada sección tiene su propio archivo CSS en `public/asset/css/`

### JavaScript
Las funcionalidades están separadas en archivos en `public/asset/js/`

## 🌐 Navegación

Todas las secciones son accesibles mediante:
- Enlaces del menú de navegación
- Desplazamiento suave (smooth scroll)
- Indicador de sección activa
- Botón "scroll to top"

## 📱 Responsive

- Desktop: Vista completa con grid de 3 columnas
- Tablet: Vista adaptada con grid de 2 columnas
- Mobile: Vista de una columna con menú hamburguesa

## ✨ Animaciones

- Fade in al cargar secciones
- Hover effects en tarjetas
- Barras de progreso animadas
- Transiciones suaves
- Efectos parallax opcionales

## 📧 Formulario de Contacto

El formulario incluye:
- Validación en tiempo real
- Mensajes de error/éxito
- Campos requeridos
- Sanitización de datos

## 🔧 Funcionalidades JavaScript

- **ModuleLoader**: Carga dinámica de módulos HTML
- **Portfolio Filter**: Filtrado de proyectos por categoría
- **Contact Form**: Validación y envío de formulario
- **Animations**: Efectos visuales al hacer scroll
- **Navbar**: Menú responsive y navegación activa
- **Utils**: Funciones auxiliares (debounce, throttle, etc.)

## 📦 Dependencias Externas

- Tailwind CSS: https://cdn.tailwindcss.com
- Font Awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

## 🎯 Optimización

- Carga asíncrona de módulos
- CSS minificado
- JavaScript modular
- Imágenes optimizadas (recomendado)
- Lazy loading opcional

## 📄 Licencia

Proyecto de código abierto para uso educativo y personal.

---

**Desarrollado con ❤️ para matemáticas**
