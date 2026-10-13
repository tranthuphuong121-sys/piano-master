/* PIANO MASTER v11.53: page network-first, fallback offline. */
const CACHE='piano-master-v11.53';
const APP_SHELL=['./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.all(APP_SHELL.map(async p=>{try{await c.add(new Request(p,{cache:'reload'}))}catch(e){console.warn('Optional shell item unavailable:',p,e)}}));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('piano-master-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const u=new URL(req.url);if(u.origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith((async()=>{try{const res=await fetch(req,{cache:'no-store'});if(res.ok){const c=await caches.open(CACHE);await c.put('./index.html',res.clone())}return res}catch(e){return(await caches.match('./index.html'))||new Response('Không có mạng và chưa có bản lưu ngoại tuyến.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());return}
 event.respondWith((async()=>{const cached=await caches.match(req);if(cached)return cached;return fetch(req)})());
});
