/* Service worker : cache hors-ligne pour l'application U.N.A.M.DD */
const CACHE = 'unamdd-v6';
const ASSETS = [
  './','./index.html','./styles.css','./ipis_zones.js','./app.js','./manifest.webmanifest',
  './assets/logo.png','./assets/icon192.png','./assets/icon512.png','./Guide_UNAMDD.pdf'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(hit=>hit || fetch(e.request).then(res=>{
      const copy=res.clone();
      caches.open(CACHE).then(c=>c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
