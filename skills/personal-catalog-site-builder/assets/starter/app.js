'use strict';
const translations = {
  en: {catalog:'Catalog',contact:'Contact',language:'Language',eyebrow:'Personal catalog · Synthetic demo',headline:'Meet the person.\nExplore the products.',explore:'Explore products ↗',choose:'Choose a product.',hint:'Open a product to see its own model table.',details:'View models & details →',back:'← All products',models:'Product models',size:'Size',code:'Product code',index:'Index',search:'Search models',pending:'Models pending confirmation.',noMatch:'No matching models.',previous:'Previous',next:'Next',page:'Page',of:'of',enlarge:'Enlarge photo',close:'Close',photoError:'The photo could not be loaded.',field:'Evidence from the field.',fieldHint:'Add approved exhibition, production and loading photos here, followed by grouped videos.',talk:'Start a conversation.',talkHint:'Add confirmed contact options and a real inquiry endpoint before launch. This demo does not send or store messages.',demo:'Synthetic demonstration · No customer data is collected.',notFound:'Product not found.',failed:'Unable to load the demo. Serve the folder over HTTP and try again.'},
  es: {catalog:'Catálogo',contact:'Contacto',language:'Idioma',eyebrow:'Catálogo personal · Demostración ficticia',headline:'Conoce a la persona.\nExplora los productos.',explore:'Explorar productos ↗',choose:'Elige un producto.',hint:'Abre un producto para ver su propia tabla de modelos.',details:'Ver modelos y detalles →',back:'← Todos los productos',models:'Modelos del producto',size:'Medida',code:'Código de producto',index:'Índice',search:'Buscar modelos',pending:'Modelos pendientes de confirmación.',noMatch:'No se encontraron modelos.',previous:'Anterior',next:'Siguiente',page:'Página',of:'de',enlarge:'Ampliar foto',close:'Cerrar',photoError:'No se pudo cargar la foto.',field:'Experiencia sobre el terreno.',fieldHint:'Añade fotos autorizadas de ferias, producción y carga; después, vídeos agrupados.',talk:'Inicia una conversación.',talkHint:'Añade contactos confirmados y un servicio real de consultas antes de publicar. Esta demo no envía ni guarda mensajes.',demo:'Demostración ficticia · No se recopilan datos de clientes.',notFound:'Producto no encontrado.',failed:'No se pudo cargar la demo. Sirve la carpeta por HTTP e inténtalo de nuevo.'}
};
const params = new URLSearchParams(location.search);
let lang = params.get('lang') === 'es' ? 'es' : 'en';
let data;
const main = document.querySelector('#main');
const dialog = document.querySelector('#preview');
let trigger;
// Never interpolate catalog data into HTML. All data-bound values use textContent.
function el(tag, text, className) { const n=document.createElement(tag); if(text!==undefined)n.textContent=text; if(className)n.className=className; return n; }
function link(text, href, className) {const n=el('a',text,className); n.href=href; return n;}
function url(id, hash='') {const p=new URLSearchParams({lang}); if(id)p.set('product',id); return `?${p}${hash}`;}
function localImage(path) {if(typeof path!=='string'||!path||path.startsWith('/')||path.includes('\\')||path.split('/').includes('..')||/^[a-z][a-z0-9+.-]*:/i.test(path))return 'product.svg'; return path;}
function image(product) {const img=el('img'); img.src=localImage(product.image);img.alt=product.name;img.width=400;img.height=400;img.loading='lazy';return img;}
function contact() {const s=el('section',undefined,'section');s.id='contact';s.append(el('h2',t().talk),el('p',t().talkHint,'notice'));return s;}
function t(){return translations[lang];}
function setup() {
 document.documentElement.lang=lang;
 document.querySelector('#language').value=lang;
 document.querySelector('#language-label').textContent=t().language;
 document.querySelector('#home-link').href=url();
 for(const [id,key,hash] of [['catalog-link','catalog','#catalog'],['contact-link','contact','#contact']]){const a=document.getElementById(id);a.textContent=t()[key];a.href=url(undefined,hash);}
 document.querySelector('#demo-notice').textContent=t().demo;
 document.querySelector('#close-preview').textContent=t().close;
 main.replaceChildren();
 const id=params.get('product');
 const p=id?data.products.find(p=>p.id===id):undefined;
 document.title=p?`${p.name} — ${t().catalog}`:`Personal Catalog — ${t().catalog}`;
 if(id&&!p){main.append(el('h1',t().notFound),link(t().back,url()));return;}
 if(p)detail(p);else home();
}
function home(){
 const hero=el('section',undefined,'hero'),copy=el('div',undefined,'hero-copy'),art=el('div',undefined,'hero-art');
 copy.append(el('p',t().eyebrow,'eyebrow'),el('h1',t().headline),el('h3',data.person.name),el('p',data.person.intro[lang]),link(t().explore,'#catalog','button'));
 art.append(image({name:t().eyebrow,image:'product.svg'}));hero.append(copy,art);
 const strip=el('div',undefined,'contact-strip');strip.append(link(t().contact,'#contact'));
 const section=el('section',undefined,'section');section.id='catalog';section.append(el('h2',t().choose),el('p',t().hint,'muted'));
 const grid=el('div',undefined,'grid');
 for(const p of data.products){const card=el('article',undefined,'card'),photo=link('',url(p.id),'card-photo'),body=el('div',undefined,'card-copy');photo.setAttribute('aria-label',`${t().details} ${p.name}`);photo.append(image(p));body.append(el('h3',p.name),link(t().details,url(p.id)));card.append(photo,body);grid.append(card);}
 section.append(grid);
 const field=el('section',undefined,'section evidence');field.append(el('h2',t().field),el('p',t().fieldHint,'muted'));
 main.append(hero,strip,section,field,contact());
}
function detail(p){
 const section=el('section',undefined,'section'),row=el('div',undefined,'detail'),photo=el('button',undefined,'detail-image'),copy=el('div');photo.type='button';photo.setAttribute('aria-label',t().enlarge);photo.append(image(p));photo.addEventListener('click',()=>openPhoto(p,photo));copy.append(el('p',t().eyebrow,'eyebrow'),el('h1',p.name),link(t().back,url()),el('p',t().enlarge,'muted'),link(t().contact,'#contact','button'));row.append(photo,copy);section.append(row);main.append(section);
 const models=el('section',undefined,'section');models.id='models';const toolbar=el('div',undefined,'models-toolbar'),input=el('input');input.type='search';input.placeholder=t().search;input.setAttribute('aria-label',t().search);toolbar.append(el('h2',t().models),input);const output=el('div');output.setAttribute('aria-live','polite');models.append(toolbar,output);main.append(models,contact());
 let page=1;const pageSize=5;
 function render(){output.replaceChildren();const q=input.value.trim().toLowerCase();const rows=p.models.filter(r=>[r.size,r.code,r.index].join(' ').toLowerCase().includes(q));const pages=Math.max(1,Math.ceil(rows.length/pageSize));page=Math.min(page,pages);
 if(!rows.length){output.append(el('p',p.models.length?t().noMatch:t().pending,'notice'));return;}
 const wrap=el('div',undefined,'table-wrap'),table=el('table'),head=el('thead'),tr=el('tr');for(const k of ['size','code','index']){const th=el('th',t()[k]);th.scope='col';tr.append(th);}head.append(tr);const body=el('tbody');for(const r of rows.slice((page-1)*pageSize,page*pageSize)){const tr=el('tr');for(const k of ['size','code','index'])tr.append(el('td',r[k]||'—'));body.append(tr);}table.append(head,body);wrap.append(table);
 const pager=el('div',undefined,'pager'),prev=el('button',t().previous),next=el('button',t().next);prev.disabled=page===1;next.disabled=page===pages;prev.onclick=()=>{page--;render();};next.onclick=()=>{page++;render();};pager.append(prev,el('span',`${t().page} ${page} ${t().of} ${pages}`),next);output.append(wrap,pager);}
 input.addEventListener('input',()=>{page=1;render();});render();
}
function openPhoto(p,button){trigger=button;document.querySelector('#preview-title').textContent=p.name;const error=document.querySelector('#preview-error');error.hidden=true;error.textContent=t().photoError;const img=document.querySelector('#preview-image');img.onerror=()=>{error.hidden=false;};img.alt=p.name;img.src=localImage(p.image);dialog.showModal();document.querySelector('#close-preview').focus();}
document.querySelector('#close-preview').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>trigger?.focus());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#language').onchange=e=>{lang=e.target.value;params.set('lang',lang);history.replaceState(null,'',`?${params}${location.hash}`);setup();};
fetch('site-data.json').then(r=>{if(!r.ok)throw Error('Data unavailable');return r.json();}).then(value=>{data=value;setup();}).catch(()=>main.replaceChildren(el('p',t().failed,'loading')));
