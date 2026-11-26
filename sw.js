const CACHE='field-eval-v38-59';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('field-eval-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})());});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{
  if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}
  return r;
 }).catch(async()=>{
  const cache=await caches.open(CACHE);
  const cached=await cache.match(e.request);
  if(cached)return cached;
  if(e.request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();
  return Response.error();
 }));
});
