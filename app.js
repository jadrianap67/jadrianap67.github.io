document.addEventListener("DOMContentLoaded",()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let lang="es";try{lang=localStorage.getItem("arche_lang")||"es"}catch(e){}

/* Menú hamburguesa */
const bg=$(".burger"),ln=$(".links");
if(bg)bg.onclick=()=>{bg.classList.toggle("open");ln.classList.toggle("open")};

/* Idioma ES/EN: cada texto traducible lleva data-en */
function setLang(l){lang=l;try{localStorage.setItem("arche_lang",l)}catch(e){}
document.documentElement.lang=l;
$$("[data-en]").forEach(e=>{if(!e.dataset.es)e.dataset.es=e.innerHTML;e.innerHTML=l==="en"?e.dataset.en:e.dataset.es});
$$("[data-ph-en]").forEach(e=>{if(!e.dataset.phEs)e.dataset.phEs=e.placeholder;e.placeholder=l==="en"?e.dataset.phEn:e.dataset.phEs});
$$(".lang").forEach(b=>b.textContent=l==="en"?"🌐 ES":"🌐 EN");
window.heroAnim&&window.heroAnim()}
$$(".lang").forEach(b=>b.onclick=()=>setLang(lang==="es"?"en":"es"));

/* Modales */
$$("[data-modal]").forEach(b=>b.onclick=e=>{e.preventDefault();$("#"+b.dataset.modal).classList.add("on")});
$$(".mo").forEach(m=>{m.onclick=e=>{if(e.target===m)m.classList.remove("on")};$$(".x",m).forEach(x=>x.onclick=()=>m.classList.remove("on"))});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$$(".mo.on").forEach(m=>m.classList.remove("on"))});

/* Aparición al hacer scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
$$(".z").forEach(e=>io.observe(e));

/* FAQ acordeón */
$$(".fi button").forEach(b=>b.onclick=()=>{const f=b.parentElement,o=f.classList.contains("on");$$(".fi").forEach(x=>x.classList.remove("on"));if(!o)f.classList.add("on")});

/* WhatsApp flotante */
const WA="573235978946";
document.body.insertAdjacentHTML("beforeend",`<a class="wa" href="https://wa.me/${WA}?text=${encodeURIComponent("Hola ARCHÉ, quisiera recibir más información sobre sus servicios.")}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11 19.9L3 29l6.300-2A13 13 0 1 0 16 3zm0 2.400a10.600 10.600 0 1 1-5.500 19.700l-.4-.2-3.700 1.200 1.200-3.600-.3-.4A10.600 10.600 0 0 1 16 5.400zm-3.900 5.300c-.3 0-.7.100-1 .5-.4.400-1.300 1.200-1.300 3s1.300 3.500 1.500 3.700c.2.300 2.600 4.100 6.400 5.600 3.100 1.200 3.700 1 4.400.9.700-.1 2.200-.9 2.500-1.800.3-.9.300-1.600.2-1.800-.1-.2-.4-.3-.8-.5l-2.600-1.200c-.3-.1-.6-.2-.9.200-.3.400-1 1.200-1.200 1.500-.2.200-.4.300-.8.100-.4-.2-1.600-.6-3-1.900-1.100-1-1.900-2.200-2.100-2.600-.2-.4 0-.6.200-.8l.6-.7c.2-.2.300-.4.400-.6.100-.2.100-.5 0-.7l-1.200-2.900c-.3-.7-.6-.6-.9-.6z"/></svg></a>`);

/* Contacto: rectángulos con ojos que siguen el mouse */
if(document.body.dataset.eyes){
const L=document.createElement("div");L.className="eyes";document.body.prepend(L);
const sm=innerWidth<700,N=sm?9:16,cols=sm?3:5,rows=Math.ceil(N/cols),R=[];
for(let i=0;i<N;i++){
 const w=90+Math.random()*80,h=w*(.6+Math.random()*.3),s=w*.27,d=document.createElement("div");d.className="rc";
 d.style.cssText=`width:${w}px;height:${h}px;left:${(i%cols+.1+Math.random()*.6)/cols*100}%;top:${(Math.floor(i/cols)+.1+Math.random()*.5)/rows*100}%;background:${i%3===1?"#CE9E48":"#550000"};animation-duration:${6+Math.random()*6}s;animation-delay:-${Math.random()*8}s`;
 d.innerHTML=`<i class="eye" style="width:${s}px;height:${s}px;animation-delay:${Math.random()*5}s"><b></b></i>`.repeat(2);
 L.append(d);R.push(d)}
let mx=innerWidth/2,my=innerHeight/2,t=0,act=0;
const mv=e=>{const p=e.touches?e.touches[0]:e;mx=p.clientX;my=p.clientY;act=Date.now()};
addEventListener("pointermove",mv);addEventListener("touchmove",mv,{passive:true});
(function f(){t+=.01;
 if(Date.now()-act>2500){mx=innerWidth/2+Math.cos(t*1.3)*innerWidth*.35;my=innerHeight/2+Math.sin(t)*innerHeight*.3}
 R.forEach(d=>{const b=d.getBoundingClientRect(),dx=mx-(b.left+b.width/2),dy=my-(b.top+b.height/2);
  d.style.transform=`rotate(${Math.max(-8,Math.min(8,dx/60))}deg)`;
  $$(".eye",d).forEach(e=>{const q=e.getBoundingClientRect(),a=Math.atan2(my-(q.top+q.height/2),mx-(q.left+q.width/2)),r=q.width*.26,k=Math.min(1,Math.hypot(dx,dy)/200);
   e.firstChild.style.transform=`translate(${Math.cos(a)*r*k}px,${Math.sin(a)*r*k}px)`})});
 requestAnimationFrame(f)})()}

setLang(lang);
});
