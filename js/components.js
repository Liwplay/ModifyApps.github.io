// Carga el header y footer en todas las páginas
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', 'components/header.html');
  loadComponent('footer', 'components/footer.html');
});

function loadComponent(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  fetch(url)
    .then(res => res.text())
    .then(html => {
      el.innerHTML = html;
      // Una vez cargado, aplicar funcionalidades extra si existen
      if (id === 'header') initHeader();
      if (id === 'footer') initFooter();
    })
    .catch(err => console.warn('Error cargando componente:', err));
}

function initHeader() {
  // Tema oscuro
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    // Restaurar preferencia
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }
}

function initFooter() {
  // Las redes sociales se llenan desde config.json en main.js
}