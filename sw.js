// Service worker mínimo — habilita la instalación como app (PWA).
// No cachea nada por ahora, así siempre se sirve la versión más reciente.

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(self.clients.claim());
});

// Listener vacío: sin respondWith el navegador usa su red normal (sin desvío extra),
// pero mantiene el criterio de instalación PWA en navegadores antiguos.
self.addEventListener('fetch', function(event){});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList){
      for(var i = 0; i < clientList.length; i++){
        var client = clientList[i];
        if('focus' in client) return client.focus();
      }
      if(self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

