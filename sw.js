const CACHE_NAME = 'geocofrade-v1'; /* cambiar en caso de actualizar cosas */
// Lista de archivos que queremos que funcionen sin internet
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/map.js',
  './js/app.js',
  './manifest.json'
];

// 1. INSTALACIÓN: Guarda los archivos básicos en la memoria del móvil
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Archivos cacheados con éxito');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVACIÓN: Limpia memorias antiguas si actualizamos la app
self.addEventListener('activate', (event) => {
  console.log('SW: Servicio activo');
});

// 3. ESTRATEGIA DE CARGA: Si hay internet, descarga. Si no, tira de memoria.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});