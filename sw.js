// Service worker mínimo — habilita la instalación como app (PWA).
// No cachea nada por ahora, así siempre se sirve la versión más reciente.

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event){
  // Passthrough directo a la red — sin caché offline por ahora.
  event.respondWith(fetch(event.request));
});
