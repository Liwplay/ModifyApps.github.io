document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
  setupSearch();
});

async function loadPosts() {
  try {
    const res = await fetch('/data/posts.json');
    const posts = await res.json();

    // Recientes (ordenar por fecha descendente)
    const recent = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts(recent.slice(0, 6), 'recent-posts-grid');

    // Populares (por vistas)
    const popular = [...posts].sort((a, b) => b.views - a.views);
    renderPosts(popular.slice(0, 6), 'popular-posts-grid');

    // Categorías únicas
    const categories = [...new Set(posts.map(p => p.category))];
    const catContainer = document.getElementById('categories-list');
    if (catContainer) {
      catContainer.innerHTML = categories.map(cat =>
        `<span class="category-tag">${cat}</span>`
      ).join('');
    }
  } catch (err) {
    console.error('Error cargando posts:', err);
  }
}

function renderPosts(posts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!posts.length) {
    container.innerHTML = '<p>No hay publicaciones.</p>';
    return;
  }
  container.innerHTML = posts.map(post => `
    <article class="post-card">
      <a href="${post.url}">
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </a>
      <div class="post-card-body">
        <div class="category">${post.category}</div>
        <h3><a href="${post.url}">${post.title}</a></h3>
        <div class="meta">
          <span>${post.author}</span>
          <span>${formatDate(post.date)}</span>
          <span>👁️ ${post.views}</span>
        </div>
        <p class="excerpt">${post.description}</p>
        <div class="tags">
          ${post.tags.map(tag => `<span>#${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
}

function setupSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  let allPosts = [];
  fetch('/data/posts.json')
    .then(res => res.json())
    .then(posts => {
      allPosts = posts;
    })
    .catch(err => console.warn('Search data not loaded'));

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!allPosts.length) return;
    const filtered = allPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.includes(query))
    );
    // Mostrar resultados en la sección de recientes (o en un contenedor dedicado)
    const container = document.getElementById('recent-posts-grid');
    if (query === '') {
      // Recargar posts originales
      loadPosts();
    } else {
      renderPosts(filtered.slice(0, 6), 'recent-posts-grid');
      // Ocultar otros grids? Mejor mostrar un mensaje
      document.getElementById('popular-posts-grid').innerHTML = '';
    }
  });
}