const C='gastos-v5';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png']).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
 const u=e.request.url,same=u.startsWith(self.location.origin);
 if(e.request.method!=='GET'||!(same||u.includes('gstatic.com/firebasejs')))return;
 // Red primero (siempre revalida, así llega la versión nueva); sin conexión, usa la copia guardada
 e.respondWith(fetch(e.request,same?{cache:'no-cache'}:undefined).then(r=>{const k=r.clone();caches.open(C).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request)));
});
