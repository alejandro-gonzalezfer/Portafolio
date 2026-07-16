# Portafolio — Alejandro González

Sitio de presentación personal con diseño moderno tipo Apple/Vercel: glassmorphism,
modo claro/oscuro, animaciones suaves y SEO optimizado.

## Cómo abrirlo en Visual Studio Code

1. Abre la carpeta `portfolio/` en VS Code (`Archivo → Abrir carpeta...`).
2. Instala la extensión **Live Server** (de Ritwick Dey).
3. Clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abre en el navegador y se recarga sola cada vez que guardas cambios.

Sin frameworks ni build steps: HTML, CSS y JavaScript puro.

## Estructura de archivos

```
portfolio/
├── index.html        ← contenido, estructura, SEO y datos estructurados
├── css/style.css      ← sistema de diseño, temas y animaciones (comentado por secciones)
├── js/script.js        ← interactividad (comentado por módulos)
├── assets/             ← pon aquí tu foto, favicon e imagen de Open Graph
└── README.md
```

## Qué incluye el diseño

- **Glassmorphism**: tarjetas con fondo translúcido y `backdrop-filter: blur()`, nav flotante tipo "isla".
- **Modo claro/oscuro**: botón en la barra de navegación (ícono sol/luna). Se guarda tu preferencia
  y, si no has elegido ninguna, respeta el modo del sistema operativo. No hay parpadeo al cargar
  la página gracias a un pequeño script que se ejecuta antes de pintar el contenido.
- **Animaciones**: aparición progresiva de secciones al hacer scroll, manchas de gradiente animadas
  de fondo ("aurora"), barras de habilidades con contador numérico animado, efecto de escritura en
  el rol del hero. Todo respeta `prefers-reduced-motion` (se desactiva automáticamente si el usuario
  tiene animaciones reducidas en su sistema).
- **Responsive**: probado en tres puntos de quiebre — móvil, tablet y escritorio.
- **Accesibilidad**: enlace "Saltar al contenido principal", roles ARIA en los modales, estados de
  foco visibles, `aria-current` en el enlace de navegación activo, contraste de color adecuado en
  ambos temas.
- **SEO**: metadatos Open Graph y Twitter Card, `meta description` y `keywords`, dato estructurado
  `schema.org/Person` en JSON-LD, `<link rel="canonical">`.

## Qué personalizar

Abre `index.html` y busca **"EDITAR:"** para encontrar cada lugar con datos pendientes:

- Enlace de LinkedIn (los demás — GitHub, Instagram, X, correo — ya están puestos)
- Foto de perfil real
- Imagen de Open Graph (la que se ve al compartir el link en redes/WhatsApp)
- Dominio real una vez publiques el sitio (aparece en varias etiquetas de SEO)
- Favicon
- Contenido de proyectos, blog y educación (actualmente son casos de ejemplo)

### Foto de perfil

Copia tu imagen a `assets/` y, dentro de `<div class="photo-frame">`, reemplaza:
```html
<span aria-hidden="true">AG</span>
```
por:
```html
<img src="assets/foto.jpg" alt="Alejandro González" style="width:100%;height:100%;object-fit:cover;border-radius:24px;">
```

### Formulario de contacto

Ya está conectado a Formspree (`https://formspree.io/f/mqerebpw`) y envía correos de verdad,
con envío por AJAX (sin recargar la página). Si quieres usar tu propia cuenta:

1. Crea un formulario en https://formspree.io.
2. Reemplaza el `action` de `<form class="contact__form" id="contactForm" action="...">` por tu URL.

No necesitas tocar `js/script.js`: toma la URL automáticamente desde `form.action`.

### Imagen de Open Graph

Crea una imagen de 1200×630px (puede ser una captura del sitio o un banner con tu nombre) y
guárdala como `assets/og-cover.jpg`. Así se verá bien cuando compartas el link en WhatsApp,
LinkedIn, etc.

## Publicarlo gratis

- **GitHub Pages**: sube la carpeta a un repositorio y activa Pages en la configuración.
- **Netlify** o **Vercel**: arrastra la carpeta al panel y obtienes una URL pública al instante.

Cuando publiques, actualiza `https://tu-dominio.com` por tu URL real en las etiquetas SEO de
`index.html` (busca "EDITAR" cerca del bloque de metadatos).

## Notas técnicas

- Sin frameworks, así que puedes editar todo directamente.
- Las fuentes (Inter, JetBrains Mono) se cargan desde Google Fonts con `font-display: swap`
  y solo los pesos necesarios, para mantener el sitio liviano.
- El CSS está organizado en 17 bloques comentados (tokens, base, utilidades, accesibilidad,
  fondo decorativo, nav, hero, secciones, y una por cada sección del sitio).
- El JS está organizado en 10 módulos comentados dentro de un único `DOMContentLoaded`.
- El script del tema es intencionalmente bloqueante (sin `defer`) porque necesita aplicar el
  tema antes de que el navegador pinte la página, evitando el parpadeo de "flash" al cargar.
