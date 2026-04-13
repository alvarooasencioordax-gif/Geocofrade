const cacheName = 'geocofrade-v1';
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/map.js',
  '/js/app.js',
  '/img/aytosf.png'
];

// Instalar el Service Worker
self.addEventListener('install', e => {
  console.log('SW: Instalado');
});

// Activar el Service Worker
self.addEventListener('activate', e => {
  console.log('SW: Activo');
});

// Estrategia de carga (Fetch)
self.addEventListener('fetch', e => {
  // De momento no cacheamos para que veas los cambios en tiempo real en el Chromebook
  e.respondWith(fetch(e.request));
});