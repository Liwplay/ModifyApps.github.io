document.addEventListener('DOMContentLoaded', () => {
  // Spoilers: botones para mostrar/ocultar
  document.querySelectorAll('.spoiler-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (content && content.classList.contains('spoiler-content')) {
        const isHidden = content.style.display === 'none' || getComputedStyle(content).display === 'none';
        content.style.display = isHidden ? 'block' : 'none';
        btn.textContent = isHidden ? 'Ocultar spoiler' : 'Mostrar spoiler';
      }
    });
  });

  // Galerías: siguiente/anterior (simple)
  document.querySelectorAll('.gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-img');
    if (images.length <= 1) return;
    let current = 0;
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const show = (index) => {
      images.forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
    };
    show(0);
    if (prevBtn) prevBtn.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      show(current);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      current = (current + 1) % images.length;
      show(current);
    });
  });

  // Cargar comentarios si está configurado
  loadComments();
});

function loadComments() {
  fetch('/data/config.json')
    .then(res => res.json())
    .then(config => {
      if (!config.comments || !config.comments.enabled) return;
      const provider = config.comments.provider;
      const options = config.comments.options;
      const container = document.getElementById('comments-container');
      if (!container) return;

      if (provider === 'giscus') {
        // Cargar Giscus
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', options.repo);
        script.setAttribute('data-repo-id', options.repoId);
        script.setAttribute('data-category', options.category);
        script.setAttribute('data-category-id', options.categoryId);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        container.appendChild(script);
      } else if (provider === 'cusdis') {
        // Cargar Cusdis
        const script = document.createElement('script');
        script.src = 'https://cusdis.com/js/cusdis.es.js';
        script.async = true;
        script.setAttribute('data-host', 'https://cusdis.com');
        script.setAttribute('data-app-id', options.appId || '');
        script.setAttribute('data-page-id', window.location.pathname);
        container.appendChild(script);
      }
    })
    .catch(() => {});
}