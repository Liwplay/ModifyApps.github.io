export const SITE = {
  title: 'GameBlog',
  description: 'Blog de juegos descargables seleccionados',
  url: 'https://midominio.com',
  author: 'Tu Nombre',
  email: 'email@ejemplo.com',
  language: 'es',
  locale: 'es-ES',
};

export const SOCIAL = {
  youtube: 'https://youtube.com/@canal',
  discord: 'https://discord.gg/invite',
  telegram: 'https://t.me/grupobot',
  facebook: 'https://facebook.com/pagina',
  patreon: 'https://patreon.com/usuario',
  koFi: 'https://ko-fi.com/usuario',
  paypal: 'https://paypal.me/usuario',
  github: 'https://github.com/usuario',
};

export const ADS = {
  topBanner: { enabled: false, code: '' },
  betweenParagraphs: { enabled: false, code: '' },
  sidebar: { enabled: false, code: '' },
  bottom: { enabled: false, code: '' },
  beforeDownload: { enabled: false, code: '' },
};

export const CHAT = {
  enabled: true,
  provider: 'supabase', // 'firebase' o 'supabase'
  supabaseUrl: 'https://tu-proyecto.supabase.co',
  supabaseKey: 'tu-clave-publica',
  firebaseConfig: {}, // si usas Firebase
};

export const COMMENTS = {
  provider: 'giscus', // 'giscus' o 'cusdis'
  giscus: {
    repo: 'usuario/repo',
    repoId: 'R_kgDO...',
    category: 'Announcements',
    categoryId: 'DIC_kwDO...',
  },
  cusdis: {
    appId: 'tu-app-id',
  },
};

export const DOWNLOAD_BUTTON = {
  externalLink: true,
  showMirrors: true,
  mirrors: [
    { name: 'Servidor 1', url: '#' },
    { name: 'Servidor 2', url: '#' },
    { name: 'MediaFire', url: '#' },
    { name: 'Mega', url: '#' },
    { name: 'Google Drive', url: '#' },
  ],
};
