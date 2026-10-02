# EFP N°30 — web institucional

Web en React + TypeScript + Vite basada en el HTML de referencia. Incluye oferta formativa filtrable, detalles de cursos, cartelera, agenda, contacto y navegación móvil. El campus y los portales están anunciados como próximos servicios.

## Desarrollo

```sh
npm ci
npm run build
npm start
```

Abrir http://127.0.0.1:5173/efp30-web/. Para revisar la compilación: `npm run preview` y abrir http://127.0.0.1:4174/efp30-web/. Los archivos publicados se generan en `dist/`. Tailwind se compila localmente; fuentes, iconos y fotografías ilustrativas se cargan desde servicios externos. Reemplazar fotografías por imágenes oficiales cuando estén disponibles.

## GitHub Pages

Repositorio: https://github.com/Maxigoge/efp30-web. Subir el proyecto a la rama `main`. En el repositorio, abrir Settings → Pages → Build and deployment y seleccionar **GitHub Actions**. El workflow `.github/workflows/pages.yml` compila la aplicación y publica exclusivamente `dist/` con cada push a `main`.

Vite tiene configurada la base `/efp30-web/`. GitHub Pages publica esta aplicación estática; el BFF, la administración y el aula se incorporarán en el servidor Linux en etapas posteriores. Para otro dominio o subdirectorio, ajustar `base` en `vite.config.ts`.

Los textos de cartelera son preliminares y no incluyen fechas confirmadas. La oferta y los contactos provienen de la referencia y deben revisarse con la escuela antes de anunciar el sitio oficialmente. No se capturan credenciales ni se simulan inscripciones: las consultas abren el cliente de correo.

## Archivos

- `src/App.tsx`: componentes React y estado de navegación, filtros y diálogos.
- `src/courses.json`: catálogo inicial preparado para reemplazarlo por la API.
- `src/styles.css`: estilos fuente.
- `index.html`: entrada de Vite y metadatos.
- `web/`: primera referencia estática, conservada como antecedente; no se publica.
- `tailwind.config.cjs`: identidad visual y compilación.
- `PLAN.md`: evolución hacia la plataforma completa.

Referencia de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
