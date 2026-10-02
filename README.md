# EFP N°30 — web institucional

Primera versión estática basada en el HTML de referencia. Incluye oferta formativa filtrable, detalles de cursos, cartelera, agenda, contacto y navegación móvil. El campus y los portales están anunciados como próximos servicios.

## Desarrollo

```sh
npm ci
npm run build
npm start
```

Abrir http://127.0.0.1:4173. Los archivos publicados están en `web/`. Tailwind se compila localmente; fuentes, iconos y fotografías ilustrativas se cargan desde servicios externos. Reemplazar fotografías por imágenes oficiales cuando estén disponibles.

## GitHub Pages

Subir el proyecto a la rama `main`. En el repositorio, abrir Settings → Pages → Build and deployment y seleccionar **GitHub Actions**. El workflow `.github/workflows/pages.yml` compila estilos y publica exclusivamente `web/` con cada push a `main`.

El sitio utiliza rutas relativas y funciona bajo el subdirectorio de un repositorio. GitHub Pages publica esta vista estática; el BFF, la administración y el aula se incorporarán en el servidor Linux en etapas posteriores.

Los textos de cartelera son preliminares y no incluyen fechas confirmadas. La oferta y los contactos provienen de la referencia y deben revisarse con la escuela antes de anunciar el sitio oficialmente. No se capturan credenciales ni se simulan inscripciones: las consultas abren el cliente de correo.

## Archivos

- `web/index.html`: contenido y estructura.
- `web/assets/app.js`: filtros, navegación y diálogos.
- `web/assets/input.css`: estilos fuente.
- `tailwind.config.cjs`: identidad visual y compilación.
- `PLAN.md`: evolución hacia la plataforma completa.

Referencia de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
