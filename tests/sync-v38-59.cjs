const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const VERSION=process.env.FIELD_VERSION||'v38.59',CACHE='field-eval-'+VERSION.replaceAll('.','-');
let swVariant=false;
const server=require('node:http').createServer((req,res)=>{const path=require('node:path').join(__dirname,'..',req.url==='/'?'index.html':req.url.split('?')[0]);try{res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.html')?'text/html':path.endsWith('.webmanifest')?'application/manifest+json':'image/svg+xml');res.end(path.endsWith('sw.js')&&swVariant?fs.readFileSync(path,'utf8').replaceAll(CACHE,'field-eval-v38-58-synthetic'):fs.readFileSync(path))}catch{res.statusCode=404;res.end('missing')}});
const URL='http://127.0.0.1:8765/';
const KEY='fieldapp.physical.records',META='fieldapp.sync.v3.meta';
const key=id=>JSON.stringify([KEY,id]);
const data=(id,n)=>({id,callsign:'SYNTHETIC-'+id,n,exerciseNotes:{pushups:'test '+n}});
const row=(r,op,parents=[],deleted=false)=>[KEY,r.id,new Date().toISOString(),deleted?'TRUE':'FALSE',deleted?'':JSON.stringify(r),'synthetic','3:'+JSON.stringify({op,parents})];
let rows=[],writes=0,failPost=false,hideUpload=false,postHook=null,readHook=null;
const browserPromise=chromium.launch({executablePath:process.env.FIELD_CHROMIUM||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const passed=[];let sessions=[];
async function test(name,fn){await fn();passed.push(name);console.log('PASS '+name);if(!name.startsWith('local creation')&&!name.startsWith('first connection')&&!name.startsWith('concurrent edits')){for(const s of sessions)await s.context.close();sessions=[]}}
async function session(browser,initial=[],extra={}){
 const context=await browser.newContext({serviceWorkers:'block'});
 await context.addInitScript(({initial,KEY,extra})=>{if(!localStorage.getItem('test.seeded')){localStorage.setItem(KEY,JSON.stringify(initial));for(const [k,v] of Object.entries(extra))localStorage.setItem(k,JSON.stringify(v));localStorage.setItem('test.seeded','1');}localStorage.setItem('fieldapp.language.v34test.cards',JSON.stringify([{id:'synthetic-empty-language',prompt:'',answer:''}]));window.google={accounts:{oauth2:{initTokenClient:cfg=>({requestAccessToken:()=>cfg.callback({access_token:'synthetic-token'})})}}}}, {initial,KEY,extra});
 await context.route('**/*',async route=>{
  const req=route.request();if(req.url().startsWith(URL))return route.continue();
  if(req.url().startsWith('https://sheets.googleapis.com/')){
   if(req.method()==='POST'){writes++;if(failPost)return route.fulfill({status:503,body:'{}'});const values=JSON.parse(req.postData()).values;if(!hideUpload)rows.push(...values);if(postHook)await postHook(values);return route.fulfill({json:{updates:{updatedRows:values.length}}})}
   if(readHook)await readHook();return route.fulfill({json:{values:rows}});
  }return route.abort();
 });
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());await page.goto(URL);await page.waitForSelector('#fieldSyncConnect');
 return {context,page,errors};
}
async function connect(s){await s.page.click('#fieldSyncConnect');await idle(s)}
async function idle(s){await s.page.waitForFunction(()=>{const t=document.getElementById('fieldSyncStatus')?.textContent;return t&&!t.startsWith('A sincronizar')&&!t.startsWith('Alterações locais')},{},{timeout:8000});await s.page.waitForTimeout(80)}
async function sync(s){await s.page.click('#fieldSyncNow');await idle(s)}
const state=s=>s.page.evaluate(({KEY,META})=>({records:JSON.parse(localStorage.getItem(KEY)||'[]'),meta:JSON.parse(localStorage.getItem(META)||'{}'),status:document.getElementById('fieldSyncStatus').textContent}),{KEY,META});
async function set(s,rs){await s.page.evaluate(({KEY,rs})=>localStorage.setItem(KEY,JSON.stringify(rs)),{KEY,rs})}
async function choose(s,label){await s.page.click('#fieldSyncReview');const b=s.page.getByRole('button',{name:label,exact:true,includeHidden:true});await b.evaluate(el=>el.parentElement.open=true);await Promise.all([s.page.waitForEvent('load'),b.click()]);await s.page.waitForSelector('#fieldSyncConnect')}
(async()=>{await new Promise(r=>server.listen(8765,'127.0.0.1',r));const browser=await browserPromise;const make=async(initial,extra)=>{const s=await session(browser,initial,extra);sessions.push(s);return s};
try{
await test('browser startup: no runtime errors',async()=>{const s=await make([]);assert.deepEqual(s.errors,[])});
await test('local creation uploads and read-back acknowledges exact operation',async()=>{rows=[];writes=0;const s=await make([data('a',1)]);await connect(s);const st=await state(s);assert.equal(rows.length,1);assert.equal(Object.keys(st.meta.pending).length,0);assert.match(st.status,/Google verificado/)});
await test('repeated sync is idempotent',async()=>{const s=sessions.at(-1);await sync(s);assert.equal(rows.length,1)});
await test('first connection does not resurrect absent or intentionally deleted records',async()=>{const s=await make([]);await connect(s);const st=await state(s);assert.equal(st.records.length,0);assert.equal(st.meta.conflicts[key('a')].reason,'first-connection-review');assert.equal(rows.length,1)});
await test('explicit cloud choice imports reviewed record',async()=>{const s=sessions.at(-1);await choose(s,'Usar versão guardada 1');assert.equal((await state(s)).records[0].id,'a');await connect(s);assert.equal(Object.keys((await state(s)).meta.conflicts).length,0)});
await test('two isolated sessions create offline records and converge without duplicates',async()=>{
 rows=[];const a=await make([data('b',1)]),b=await make([data('c',1)]);await connect(a);await connect(b);assert.equal(rows.length,2);
 await choose(b,'Usar versão guardada 1');await connect(b);await sync(a);await choose(a,'Usar versão guardada 1');await connect(a);
 assert.deepEqual((await state(a)).records.map(r=>r.id).sort(),['b','c']);assert.deepEqual((await state(b)).records.map(r=>r.id).sort(),['b','c']);assert.equal(rows.length,2);
});
await test('concurrent edits preserve both versions instead of clock winner',async()=>{
 rows=[];const a=await make([data('d',0)]);await connect(a);const initial=await state(a);const b=await make([data('d',0)],{[META]:initial.meta});await connect(b);await set(a,[data('d',1)]);await set(b,[data('d',2)]);await sync(a);await sync(b);const st=await state(b);assert.equal(st.records[0].n,2);assert.ok(st.meta.pending[key('d')]);assert.equal(st.meta.conflicts[key('d')].reason,'concurrent-edit');
});
await test('conflict UI keeps selected local and journals recovery',async()=>{const b=sessions.at(-1);await choose(b,'Manter versão local');await connect(b);assert.equal(Object.keys((await state(b)).meta.conflicts).length,0);assert.equal(JSON.parse(rows.at(-1)[4]).n,2);const archives=await b.page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('fieldapp.sync.v3.recovery.')));assert.equal(archives.length,1)});
await test('explicit deletion produces tombstone and propagates to known replica',async()=>{
 rows=[];const a=await make([data('e',1)]);await connect(a);const st=await state(a);const b=await make(st.records,{[META]:st.meta});await connect(b);await a.page.evaluate(({KEY})=>{window.FieldSync.deleteIntent(KEY,['e']);localStorage.setItem(KEY,'[]')},{KEY});await sync(a);assert.equal(rows.at(-1)[3],'TRUE');await sync(b);assert.equal((await state(b)).records.length,0);assert.equal((await state(b)).meta.known[key('e')],null);
});
await test('import/reset absence never manufactures deletion or resurrects local absence',async()=>{rows=[];const s=await make([data('f',1)]);await connect(s);await set(s,[]);await sync(s);const st=await state(s);assert.equal(rows.length,1);assert.equal(st.records.length,0);assert.equal(st.meta.conflicts[key('f')].reason,'local-absence')});
await test('deletion concurrent with remote edit becomes recoverable conflict',async()=>{rows=[];const s=await make([data('g',1)]);await connect(s);const op=JSON.parse(rows[0][6].slice(2)).op;await s.page.evaluate(({KEY})=>{window.FieldSync.deleteIntent(KEY,['g']);localStorage.setItem(KEY,'[]')},{KEY});rows.push(row(data('g',2),'foreign',[op]));await sync(s);const st=await state(s);assert.equal(st.records.length,0);assert.equal(st.meta.pending[key('g')].deleted,true);assert.ok(st.meta.conflicts[key('g')])});
await test('failed append preserves pending and retry uses same operation',async()=>{rows=[];const s=await make([data('h',1)]);failPost=true;await connect(s);let st=await state(s);const op=st.meta.pending[key('h')].op;assert.match(st.status,/Erro/);failPost=false;await sync(s);assert.equal(JSON.parse(rows[0][6].slice(2)).op,op);assert.equal(Object.keys((await state(s)).meta.pending).length,0)});
await test('unverified upload retains pending',async()=>{rows=[];hideUpload=true;const s=await make([data('i',1)]);await connect(s);assert.ok((await state(s)).meta.pending[key('i')]);hideUpload=false});
await test('malformed remote JSON blocks sync without altering local records',async()=>{rows=[[KEY,'j','2026-01-01','FALSE','{broken','x','1']];const s=await make([data('j',1)]);await connect(s);assert.match((await state(s)).status,/Erro/);assert.equal((await state(s)).records[0].n,1)});
await test('duplicate local ID and malformed local write rejected before mutation',async()=>{rows=[];const s=await make([data('k',1)]);const before=(await state(s)).records;for(const value of ['{bad',JSON.stringify([data('k',1),data('k',2)])]){const result=await s.page.evaluate(({KEY,value})=>{try{localStorage.setItem(KEY,value);return false}catch{return true}},{KEY,value});assert.equal(result,true)}assert.deepEqual((await state(s)).records,before)});
await test('same-name records use stable IDs without collision',async()=>{rows=[];const a=data('l1',1),b=data('l2',2);a.callsign=b.callsign='SAME';const s=await make([a,b]);await connect(s);assert.equal(rows.length,2)});
await test('post-append concurrent branch detected by read-back',async()=>{rows=[];const s=await make([data('m',1)]);postHook=async values=>{const op=JSON.parse(values[0][6].slice(2)).op;rows.push(row(data('m',2),'parallel',[]))};await connect(s);postHook=null;assert.equal((await state(s)).meta.conflicts[key('m')].reason,'post-upload-conflict');assert.ok((await state(s)).meta.pending[key('m')])});
await test('causality beats clock skew',async()=>{rows=[];const s=await make([data('n',1)]);await connect(s);const parent=JSON.parse(rows[0][6].slice(2)).op;const next=row(data('n',2),'skewed',[parent]);next[2]='2000-01-01T00:00:00Z';rows.push(next);await sync(s);assert.equal((await state(s)).records[0].n,2)});
await test('legacy client writes after v3 are quarantined',async()=>{rows=[];const s=await make([data('o',1)]);await connect(s);rows.push([KEY,'o','2099-01-01','FALSE',JSON.stringify(data('o',2)),'old','1']);await sync(s);assert.equal((await state(s)).meta.conflicts[key('o')].reason,'concurrent-versions');assert.equal((await state(s)).records[0].n,1)});
await test('backup export, clean recovery, malformed recovery, deleted-record protection',async()=>{
 rows=[];const s=await make([data('p',1)]);await connect(s);const dl=s.page.waitForEvent('download');await s.page.click('#fieldSyncExport');const download=await dl,path=await download.path(),payload=JSON.parse(fs.readFileSync(path,'utf8'));assert.equal(payload.app,'field-evaluation-sync-backup');
 const b=await make([]);await b.page.setInputFiles('#fieldSyncFile',{name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(payload))});await b.page.waitForTimeout(300);assert.equal((await state(b)).records[0].id,'p');
 await b.page.setInputFiles('#fieldSyncFile',{name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{bad')});await b.page.waitForTimeout(100);assert.match((await state(b)).status,/Erro/);assert.equal((await state(b)).records.length,1);
 await s.page.evaluate(({KEY})=>{window.FieldSync.deleteIntent(KEY,['p']);localStorage.setItem(KEY,'[]')},{KEY});await sync(s);await s.page.setInputFiles('#fieldSyncFile',{name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(payload))});await s.page.waitForTimeout(300);assert.equal((await state(s)).records.length,0);assert.equal((await state(s)).meta.conflicts[key('p')].reason,'backup-deleted');
});

await test('simultaneous append race retains both causal branches',async()=>{
 rows=[];const a=await make([data('race',0)]);await connect(a);const initial=await state(a),b=await make(initial.records,{[META]:initial.meta});await connect(b);
 await set(a,[data('race',1)]);await set(b,[data('race',2)]);
 let reads=0,releaseRead;const readBarrier=new Promise(r=>releaseRead=r);readHook=async()=>{if(reads<2){if(++reads===2)releaseRead();await readBarrier}};
 let count=0,release;const barrier=new Promise(r=>release=r);postHook=async()=>{if(++count===2)release();await barrier};
 await Promise.all([sync(a),sync(b)]);postHook=null;readHook=null;
 assert.equal(rows.length,3);assert.equal((await state(a)).meta.conflicts[key('race')].reason,'post-upload-conflict');assert.ok((await state(b)).meta.conflicts[key('race')]);
});
await test('local edit during upload remains pending and rebases on verified parent',async()=>{
 rows=[];const s=await make([data('during',1)]);postHook=async()=>{await set(s,[data('during',2)])};await connect(s);postHook=null;const st=await state(s);assert.equal(st.meta.pending[key('during')].data.n,2);assert.equal(st.meta.pending[key('during')].parents[0],JSON.parse(rows[0][6].slice(2)).op);await sync(s);assert.equal(JSON.parse(rows.at(-1)[4]).n,2);assert.equal(Object.keys((await state(s)).meta.pending).length,0);
});
await test('cross-tab writes require reload rather than overwrite newer data',async()=>{
 rows=[];const s=await make([data('tab',1)]),other=await s.context.newPage();await other.goto(URL);await other.waitForSelector('#fieldSyncConnect');await other.evaluate(({KEY})=>localStorage.setItem(KEY,JSON.stringify([{id:'tab',n:2}])),{KEY});await s.page.waitForTimeout(100);const blocked=await s.page.evaluate(({KEY})=>{try{localStorage.setItem(KEY,JSON.stringify([{id:'tab',n:3}]));return false}catch{return true}},{KEY});assert.equal(blocked,true);assert.equal((await state(s)).records[0].n,2);
});
await test('navigation Physical Shooting Notes Language and mobile viewport',async()=>{
 const s=await make([]);await s.page.setViewportSize({width:390,height:844});
 for(const mod of ['Shooting','Notes','Language','Physical']){if(['Notes','Language'].includes(mod))await s.page.evaluate(mod=>switchModule(mod.toLowerCase()),mod);else await s.page.click('#tab'+mod);assert.equal(await s.page.locator('#'+mod.toLowerCase()+'Module').evaluate(el=>!el.classList.contains('module-hidden')),true)}
 assert.deepEqual(s.errors,[]);assert.equal(await s.page.locator('#appVersionDisplay').textContent(),VERSION);
});
await test('PWA installation, offline reload, offline persistence and cache isolation',async()=>{
 swVariant=true;const context=await browser.newContext({serviceWorkers:'allow'});const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await context.route('https://**/*',r=>r.abort());await page.goto(URL);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await page.evaluate(async()=>{const c=await caches.open('other-app-synthetic');await c.put('/other-app',new Response('preserve'))});swVariant=false;await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();await reg.update()});await page.waitForFunction(async cache=>{const keys=await caches.keys();return keys.includes(cache)&&!keys.includes('field-eval-v38-58-synthetic')},CACHE);
 const cached=await page.evaluate(async cache=>{const c=await caches.open('other-app-synthetic');await c.put('/other-app',new Response('preserve'));return (await caches.keys()).includes(cache)},CACHE);assert.equal(cached,true);
 await page.evaluate(({KEY})=>localStorage.setItem(KEY,JSON.stringify([{id:'offline',callsign:'SYNTHETIC'}])),{KEY});await context.setOffline(true);await page.reload();await page.waitForSelector('#fieldSyncBar');assert.equal((await page.evaluate(({KEY})=>JSON.parse(localStorage.getItem(KEY))[0].id,{KEY})),'offline');await page.click('#tabShooting');await page.click('#tabPhysical');assert.deepEqual(errors,[]);assert.ok((await page.evaluate(()=>caches.keys())).includes('other-app-synthetic'));await context.close();
});

await test('corrupt local source is preserved and can be exported for recovery',async()=>{
 const s=await make([]);await s.page.evaluate(({KEY})=>Storage.prototype.setItem.call(sessionStorage,'test','ok'),{KEY});
 // Corruption is injected before a new context starts, independently of app APIs.
 const b=await make([],{[KEY]:'corrupt-source'});const before=await b.page.evaluate(({KEY})=>localStorage.getItem(KEY),{KEY});const blocked=await b.page.evaluate(({KEY})=>{try{localStorage.setItem(KEY,'[]');return false}catch{return true}},{KEY});assert.equal(blocked,true);assert.equal(await b.page.evaluate(({KEY})=>localStorage.getItem(KEY),{KEY}),before);
 const dl=b.page.waitForEvent('download');await b.page.click('#fieldSyncExport');const d=await dl,raw=JSON.parse(fs.readFileSync(await d.path(),'utf8'));assert.equal(raw.raw[KEY],before);
});

await test('legacy history preserves divergent values without trusting timestamps',async()=>{
 rows=[[KEY,'legacy','2099-01-01','FALSE',JSON.stringify(data('legacy',1)),'old','1'],[KEY,'legacy','2000-01-01','FALSE',JSON.stringify(data('legacy',2)),'old','1']];const s=await make([]);await connect(s);assert.equal((await state(s)).meta.conflicts[key('legacy')].remote.length,2);assert.equal((await state(s)).records.length,0);await choose(s,'Usar versão guardada 2');await connect(s);assert.equal(Object.keys((await state(s)).meta.conflicts).length,0);assert.equal(rows.length,3);
});
console.log(JSON.stringify({passed:passed.length,tests:passed},null,2));fs.writeFileSync('/tmp/field-qa-results.json',JSON.stringify({passed:passed.length,tests:passed},null,2));
}catch(e){console.error(e);process.exitCode=1}finally{await browser.close();server.close()}
})();
