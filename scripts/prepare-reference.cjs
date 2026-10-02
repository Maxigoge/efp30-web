const fs = require('node:fs');
let html = fs.readFileSync('EFP30-Página Web.html', 'utf8');
html = html.replace(/    <!-- Tailwind CSS -->[\s\S]*?    <!-- Google Fonts -->/, '    <meta name="description" content="Escuela de Formación Profesional N°30 de Villa Ángela. Conocé nuestra oferta formativa, novedades y canales de contacto.">\n    <meta name="theme-color" content="#0f172a">\n    <link rel="stylesheet" href="./assets/styles.css">\n    <!-- Google Fonts -->');
html = html.replace(/    <script>[\s\S]*?<\/style>/, '');
html = html.replace(/src="Gemini_Generated_Image_yl2h8kyl2h8kyl2h.jpg"\s+onerror="[^"]*"/, 'src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200"');
html = html.replace('alt="Fachada EFP N°30"', 'alt="Imagen ilustrativa de un espacio educativo"');
html = html.replace('<body class="bg-gray-50 text-gray-800 font-sans antialiased">', '<body class="bg-gray-50 text-gray-800 font-sans antialiased">\n<a href="#inicio" class="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 bg-white p-4 z-[70]">Ir al contenido</a>');
html = html.replace('Inscripciones Abiertas', 'Formación para el trabajo');
html = html.replace('<footer class=', '<footer id="contacto" class=');
html = html.replace(/onclick="filterCourses\('([^']+)'\)"/g, 'onclick="filterCourses(\'$1\', this)"');
html = html.replace(/onclick="openModal\('courseModal'\)"/g, 'onclick="showCourse(this)"');
html = html.replace(/onclick="openModal\('(?:campusModal|studentModal)'\)"/g, 'onclick="showUpcoming()"');
html = html.replace(/onclick="alert\('[^']*'\)"/g, 'onclick="showUpcoming()"');
html = html.replace('onclick="showUpcoming()" class="bg-white border-2', 'onclick="showAllCourses()" class="bg-white border-2');
html = html.replace('Campus Virtual (Moodle)', 'Campus Virtual');
html = html.replace('Ver el listado completo de Cursos', 'Ver todas las propuestas');
html = html.replace('Herramientas dedicadas para nuestra comunidad educativa.', 'Estamos preparando nuevos espacios digitales para nuestra comunidad educativa.');
html = html.replace('Revisa tus horarios semanales, calificaciones, constancias y calendario académico.', 'Próximamente: un espacio para acceder a tus cursos y a la información de tu formación.');
html = html.replace('Descarga de planillas de asistencia, carga de notas y acceso directo al repositorio de Drive institucional.', 'Próximamente: herramientas para compartir materiales y acompañar el aprendizaje de tus alumnos.');
html = html.replace('Guías de trabajos prácticos, simuladores y material hipermedia interactivo de libre acceso.', 'Próximamente: guías, materiales de estudio y recursos para seguir aprendiendo.');
html = html.replace('> Gestión', '> Próximamente');
html = html.replace('> Drive', '> Materiales');
html = html.replace(/<a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands[^]*?<\/a>/g, '');
const destinations = { 'Oferta Formativa': '#oferta', 'Requisitos de Admisión': '#oferta', 'Calendario Académico': '#agenda', 'Contacto': '#contacto', 'Campus Virtual': '#comunidad', 'Portal Estudiantes': '#comunidad', 'Portal Docentes': '#comunidad', 'Repositorio de Recursos': '#comunidad' };
for (const [label, href] of Object.entries(destinations)) {
  html = html.replace(`href="#" class="hover:text-brand-accent transition">${label}`, `href="${href}" class="hover:text-brand-accent transition">${label}`);
}
html = html.replace(/<a href="#" class="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:text-brand-accent transition">(Leer más|Ver requisitos)([\s\S]*?)<\/a>/g, '<button type="button" onclick="showNews(this)" class="text-brand-900 font-semibold text-sm flex items-center gap-1 hover:text-brand-accent transition">$1$2</button>');
html = html.replace('Se encuentra abierta la etapa de consultas y pre-inscripción para el nuevo ciclo lectivo. Acércate con tu DNI.', 'Consultá en secretaría las fechas de inscripción, la documentación y la disponibilidad de cada propuesta formativa.');
html = html.replace('Nuestra escuela abrirá sus puertas para mostrar los trabajos de carpintería, indumentaria, y mecatrónica. ¡Entrada libre a la comunidad!', 'Un espacio para compartir los trabajos de nuestros talleres con la comunidad. La fecha y los detalles se comunicarán por los canales de la escuela.');
html = html.replace('Ver Calendario Completo', 'Consultar fechas en secretaría');
html = html.replace('<button class="w-full mt-8', '<button onclick="location.hash=\'contacto\'" class="w-full mt-8');
html = html.replace(/<img /g, '<img loading="lazy" ');
html = html.replace('<img loading="lazy" src="https://images.unsplash.com/photo-1541829070764', '<img fetchpriority="high" src="https://images.unsplash.com/photo-1541829070764');
html = html.replace('id="mobile-icon"', 'id="mobile-icon" aria-hidden="true"');
html = html.replace('onclick="toggleMobileMenu()"', 'id="menu-toggle" aria-label="Abrir menú" aria-controls="mobile-menu" aria-expanded="false" onclick="toggleMobileMenu()"');
html = html.replace('<!-- Vitrina de Ofertas -->', '<main>\n<!-- Vitrina de Ofertas -->');
html = html.replace('<!-- Footer -->', '</main>\n<!-- Footer -->');
html = html.slice(0, html.indexOf('    <!-- MODALES DE INTERACCIÓN')) + `
    <dialog id="information" aria-labelledby="dialog-title">
      <div class="p-6 md:p-8">
        <div class="flex items-start justify-between gap-4 mb-5">
          <h2 id="dialog-title" class="text-2xl font-bold text-brand-900"></h2>
          <button type="button" onclick="document.getElementById('information').close()" aria-label="Cerrar" class="bg-gray-100 rounded-full w-10 h-10 shrink-0">✕</button>
        </div>
        <p id="dialog-description" class="text-gray-600 leading-relaxed mb-6"></p>
        <p class="text-sm text-gray-500 mb-6">Para confirmar fechas, requisitos y disponibilidad, contactate con la secretaría de la escuela.</p>
        <a id="dialog-contact" href="mailto:efp30chaco@yahoo.com.ar" class="inline-block bg-brand-accent text-white px-6 py-3 rounded-full font-semibold">Consultar por correo</a>
      </div>
    </dialog>
    <script src="./assets/app.js" defer></script>
</body>
</html>
`;
fs.writeFileSync('web/index.html', html);
fs.writeFileSync('web/.nojekyll', '');
