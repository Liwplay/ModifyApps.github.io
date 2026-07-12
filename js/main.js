// Funcionalidades globales: configuración, redes sociales, anuncios, modo oscuro, chat
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  initChat();
});

async function loadConfig() {
  try {
    const res = await fetch('data/config.json');
    const config = await res.json();

    // Social links en footer
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
      const socialMap = {
        youtube: 'fab fa-youtube',
        discord: 'fab fa-discord',
        telegram: 'fab fa-telegram',
        facebook: 'fab fa-facebook',
        patreon: 'fab fa-patreon',
        koFi: 'fas fa-coffee',
        paypal: 'fab fa-paypal',
        github: 'fab fa-github'
      };
      let html = '';
      for (const [key, url] of Object.entries(config.social)) {
        if (url) {
          const icon = socialMap[key] || 'fas fa-link';
          html += `<a href="${url}" target="_blank" rel="noopener" aria-label="${key}"><i class="${icon}"></i></a>`;
        }
      }
      socialContainer.innerHTML = html;
    }

    // Anuncios (si están habilitados)
    if (config.ads.enabled) {
      document.querySelectorAll('.ad-container').forEach(el => {
        if (el.id === 'ad-top') el.textContent = config.ads.bannerTop || 'Espacio para anuncio';
        else if (el.id === 'ad-between') el.textContent = config.ads.bannerBetween || 'Espacio para anuncio';
        // etc.
      });
    } else {
      document.querySelectorAll('.ad-container').forEach(el => el.style.display = 'none');
    }

    // Comentarios (se cargarán en las páginas de posts)
    // Chat: se activa desde initChat

    // Analytics
    if (config.analytics.enabled && config.analytics.googleAnalyticsId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', config.analytics.googleAnalyticsId);
    }
  } catch (err) {
    console.warn('Error cargando configuración:', err);
  }
}

function initChat() {
  const toggle = document.getElementById('chat-toggle');
  const container = document.getElementById('chat-container');
  const minimize = document.getElementById('chat-minimize');
  const close = document.getElementById('chat-close');

  if (!toggle || !container) return;

  toggle.addEventListener('click', () => {
    if (container.style.display === 'flex') {
      container.style.display = 'none';
    } else {
      container.style.display = 'flex';
    }
  });

  if (minimize) {
    minimize.addEventListener('click', () => {
      container.style.display = 'none';
    });
  }
  if (close) {
    close.addEventListener('click', () => {
      container.style.display = 'none';
    });
  }

  // Cargar configuración del chat desde config.json (solo preparado)
  fetch('/data/config.json')
    .then(res => res.json())
    .then(config => {
      if (config.chat && config.chat.enabled) {
        // Aquí se integraría Firebase o Supabase
        console.log('Chat habilitado con proveedor:', config.chat.provider);
      }
    })
    .catch(() => {});
}