const dialog = document.getElementById('information');

function showInformation(title, description) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-description').textContent = description;
  document.getElementById('dialog-contact').href = `mailto:efp30chaco@yahoo.com.ar?subject=${encodeURIComponent('Consulta: ' + title)}`;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});

function showCourse(button) {
  const card = button.closest('.course-card');
  showInformation(card.querySelector('h3').textContent, card.querySelector('p').textContent);
}
function showNews(button) {
  const article = button.parentElement;
  showInformation(article.querySelector('h3').textContent, article.querySelector('p').textContent);
}
function showUpcoming() {
  showInformation('Estamos preparando nuestros espacios digitales', 'El campus virtual, los portales de alumnos y docentes y la biblioteca de recursos se habilitarán en una próxima etapa. Mientras tanto, podés realizar tus consultas por los canales de contacto de la escuela.');
}
function toggleMobileMenu(forceOpen) {
  const menu = document.getElementById('mobile-menu');
  const open = forceOpen ?? menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !open);
  document.getElementById('mobile-icon').className = open ? 'fa-solid fa-xmark text-2xl' : 'fa-solid fa-bars text-2xl';
  const toggle = document.getElementById('menu-toggle');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', () => toggleMobileMenu(false)));
document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleMobileMenu(false); });

function filterCourses(category, selected) {
  document.querySelectorAll('.filter-btn').forEach(button => {
    const active = button === selected;
    button.classList.toggle('bg-brand-900', active);
    button.classList.toggle('text-white', active);
    button.classList.toggle('bg-gray-100', !active);
    button.classList.toggle('text-gray-600', !active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.course-card').forEach(card => {
    card.style.display = category === 'todos' || card.dataset.category === category ? 'flex' : 'none';
  });
}
function showAllCourses() {
  filterCourses('todos', document.querySelector('.filter-btn'));
  document.getElementById('oferta').scrollIntoView();
}
filterCourses('todos', document.querySelector('.filter-btn'));
