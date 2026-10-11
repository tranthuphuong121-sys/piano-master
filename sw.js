const CACHE='piano-master-v11.25';
const REQUIRED=['./index.html'];
const OPTIONAL=['./','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll(REQUIRED);
 await Promise.all(OPTIONAL.map(async path=>{try{await cache.add(path)}catch(_){}}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('piano-master-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const u=new URL(req.url);
 if(u.origin!==self.location.origin)return;
 const page=req.mode==='navigate'||u.pathname.endsWith('/index.html');
 if(page){
  event.respondWith((async()=>{
   try{
    const response=await fetch(req);
    if(response.ok){const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone())}
    return response;
   }catch(_){return await caches.match(req)||await caches.match('./index.html')||Response.error()}
  })());return;
 }
 event.respondWith((async()=>await caches.match(req)||fetch(req))());
});
