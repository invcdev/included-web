/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

import { app } from "./app";

export function page(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;
  /* the contact form opens the visitor's email app with the message filled in (the original only pretended to send) */
  (function () {
    var f = document.getElementById("abform"); if (!f || !data || !data.contact) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (n) { var el = f.querySelector("[name=" + n + "]"); return el ? el.value : ""; };
      var who = f.querySelector("input[name=w]:checked");
      var body = [v("message"), "", "Name: " + v("name"), "Email: " + v("email"), "Location: " + v("location"), "I am: " + (who ? who.value : "")].join("\n");
      window.location.href = "mailto:" + data.contact.to + "?subject=" + encodeURIComponent("Hello from " + v("name")) + "&body=" + encodeURIComponent(body);
      var b = f.querySelector(".send"); if (b) b.textContent = data.contact.sent;
    });
  })();
  /* editable content handed to scripts that build markup: every string escaped */
  function __esc(v) { return Array.isArray(v) ? v.map(__esc) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(function (e) { return [e[0], __esc(e[1])]; })) : typeof v === 'string' ? esc(v) : v; }
  /* groups of the logos as rendered (editable content) */
  function __chips(pin) { return [].slice.call(document.querySelectorAll('#' + pin + ' .chip')).map(function (c) { return { g: c.classList.contains('gl') ? 'global' : 'africa' }; }); }
/* ---- original script 1 ---- */
(function(){var pin=document.getElementById('rmpin'),tr=document.getElementById('rmtrack'),cards=[].slice.call(tr.children),doors=[].slice.call((document.getElementById('rmdoors')||{children:[]}).children),line=document.getElementById('rmline'),n=document.getElementById('rmn'),N=cards.length,cur=0,mob=function(){return innerWidth<=900};
function setOn(i){cur=i;cards.forEach(function(c,j){c.classList.toggle('on',j===i)});doors.forEach(function(d,j){d.classList.toggle('on',j===i)});n.textContent=('0'+(i+1)).slice(-2)+' / '+('0'+N).slice(-2);line.style.width=((i+.5)/N*100)+'%';}
function layout(){if(mob())return;var r=pin.getBoundingClientRect(),h=pin.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/h));var step=548;var x=-p*step*(N-1);tr.style.transform='translateX('+x+'px)';setOn(Math.round(p*(N-1)));}
function go(i){i=Math.max(0,Math.min(N-1,i));if(mob()){cards[i].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});setOn(i);return;}var h=pin.offsetHeight-innerHeight;var y=pin.getBoundingClientRect().top+scrollY+h*(i/(N-1));scrollTo({top:y,behavior:'smooth'});}
doors.forEach(function(d){d.addEventListener('click',function(){go(+d.getAttribute('data-i'))})});
document.getElementById('rmprev').addEventListener('click',function(){go(cur-1)});document.getElementById('rmnext').addEventListener('click',function(){go(cur+1)});
addEventListener('scroll',layout,{passive:true});addEventListener('resize',layout);layout();setOn(0);
if(mob()){var st=document.querySelector('.rm .stick');st.addEventListener('scroll',function(){var m=st.scrollLeft+st.clientWidth/2,b=0,bd=1e9;cards.forEach(function(c,j){var d=Math.abs(c.offsetLeft+c.offsetWidth/2-m);if(d<bd){bd=d;b=j}});setOn(b);},{passive:true});}
})();

/* ---- original script 2 ---- */
var LOW=innerWidth<900||(navigator.hardwareConcurrency||8)<=4,STILL=matchMedia("(prefers-reduced-motion: reduce)").matches;function watch(el,cb){if(!el)return;if(!("IntersectionObserver" in window)){cb(true);return;}new IntersectionObserver(function(e){cb(e[0].isIntersecting)},{rootMargin:"150px"}).observe(el);}function balanceLogos(sel,k,maxH){[].slice.call(document.querySelectorAll(sel)).forEach(function(img){function fit(){var box=img.parentNode,bw=box.clientWidth,bh=box.clientHeight;if(!img.naturalWidth||!bw)return;var r=img.naturalWidth/img.naturalHeight,A=bw*bh*k*(parseFloat(img.getAttribute("data-k"))||1),h=Math.sqrt(A/r),w=h*r;var mh=(maxH||bh)*1.0;if(h>mh){h=mh;w=h*r}if(w>bw*1.45){w=bw*1.45;h=w/r}img.style.width=w.toFixed(1)+"px";img.style.height=h.toFixed(1)+"px";img.style.maxWidth="none";img.style.maxHeight="none"}if(img.complete)fit();else img.addEventListener("load",fit);addEventListener("resize",fit);});}

/* ---- original script 3 ---- */

/* shared orb engine: one function, two sections */
function alt(t,a){var S=[[85,51,235],[0,242,255],[176,255,5]],k=t<.52?0:1,u=t<.52?t/.52:(t-.52)/.48,c0=S[k],c1=S[k+1];return 'rgba('+Math.round(c0[0]+(c1[0]-c0[0])*u)+','+Math.round(c0[1]+(c1[1]-c0[1])*u)+','+Math.round(c0[2]+(c1[2]-c0[2])*u)+','+a+')';}
function ascendOrb(opts){
 var pin=document.getElementById(opts.pin),cv=document.getElementById(opts.cv);if(!pin||!cv)return;
 var stage=pin.parentNode,vis=false,lastP=-1,ND=LOW?220:620;watch(stage,function(v){vis=v});var ctx=cv.getContext('2d'),chips=[].slice.call(pin.querySelectorAll('.chip')),lg=document.getElementById(opts.lg),la=document.getElementById(opts.la),W,H,DPR=Math.min(LOW?1:2,devicePixelRatio||1),rot=0,p=0;
 var D=chips.map(function(c){return {g:c.classList.contains('gl')?'global':'africa'}}),N=D.length,SMALL=!!opts.small;
 var pts=D.map(function(d,i){var y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963;return {x:Math.cos(th)*r,y:y,z:Math.sin(th)*r};});
 function size(){var r=pin.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);}size();addEventListener('resize',size);
 function ease(t){return t<.5?2*t*t:-1+(4-2*t)*t;}
 function gridPos(k,total,cx,cols,top,gap,rg){var row=Math.floor(k/cols),col=k%cols,inRow=Math.min(cols,total-row*cols),x=cx+(col-(inRow-1)/2)*gap,y=top+row*(rg||gap*.62);return [x,y];}
 function frame(){if(!vis||(p>=1&&lastP===p)){requestAnimationFrame(frame);return}lastP=p;rot+=STILL?0:.0035*(1-p);ctx.clearRect(0,0,W,H);
  var cx=W/2,cy=H/2,mob=W<960,RY=H*.40*.72,RX=Math.max(RY,W*.42*.72*1.16);
  RY=Math.min(RY,mob?150:185);RX=Math.max(RY,Math.min(W*.46,760));cy=H*(mob?.44:.40);
  ctx.globalAlpha=1-p;ctx.lineWidth=1;for(var k=1;k<=3;k++){ctx.strokeStyle=alt(k/3,.28);ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(cx,cy,RX*(1+k*.12),RY*(1+k*.12),0,0,6.283);ctx.stroke();}
  if(p<.98)for(var i=0;i<ND;i++){var a=i*2.399963,yy=1-2*(i+.5)/ND,rr=Math.sqrt(1-yy*yy),x=Math.cos(a+rot)*rr,z=Math.sin(a+rot)*rr;if(z<0)continue;ctx.fillStyle=alt((1-yy)/2,.35+.6*z);ctx.beginPath();ctx.arc(cx+x*RX,cy+yy*RY,2+z*1.2,0,6.283);ctx.fill();}
  ctx.globalAlpha=1;
  var gi=0,ai=0,gTotal=D.filter(function(d){return d.g==='global'}).length,aTotal=N-gTotal;
  var cols=SMALL?(mob?6:Math.max(8,Math.floor(W/150))):(mob?2:4),gap=(SMALL?(mob?Math.min(62,W*.16):Math.min(140,(W-80)/Math.max(8,Math.floor(W/150)))):(mob?Math.min(96,W*.25):Math.min(190,W*.11)))*1.06,leftX=mob?W*.26:W*.25,rightX=mob?W*.74:W*.75,topG=mob?cy-152:cy-130*.72,topA=topG,RG=gap*.62;
  if(SMALL){var rows=Math.ceil(N/cols);RG=Math.min(gap*.62,(H-140)/Math.max(1,rows-1));topG=cy-((rows-1)*RG)/2;}
  else if(mob){var mr=Math.max(Math.ceil(gTotal/cols),Math.ceil(aTotal/cols));topG=topA=Math.max(118,cy-152);RG=Math.min(RG,(H-topG-26)/Math.max(1,mr-1));}
  else{var mr2=Math.max(Math.ceil(gTotal/cols),Math.ceil(aTotal/cols));RG=Math.min(gap*.78,(H-230)/Math.max(1,mr2-1));topG=topA=Math.max(118,(H-(mr2-1)*RG)/2);}
  var e=ease(p);
  chips.forEach(function(c,i){var d=D[i],q=pts[i];var ca=Math.cos(rot),sa=Math.sin(rot);var x=q.x*ca-q.z*sa,z=q.x*sa+q.z*ca;var ox=cx+x*RX*1.02,oy=cy+q.y*RY*1.08,os=.55+.45*(z+1)/2;var tx,ty;
   if(SMALL){var sp=gridPos(gi++,N,cx,cols,topG,gap,RG);tx=sp[0];ty=sp[1];}
   else if(d.g==='global'){var gp=gridPos(gi++,gTotal,leftX,cols,topG,gap,RG);tx=gp[0];ty=gp[1];}
   else{var ap=gridPos(ai++,aTotal,rightX,cols,topA,gap,RG);tx=ap[0];ty=ap[1];}
   var X=ox+(tx-ox)*e,Y=oy+(ty-oy)*e,S=os+(0.82-os)*e;
   c.style.transform='translate(-50%,-50%) translate('+X+'px,'+Y+'px) scale('+S+')';c.style.zIndex=Math.round(100+z*50*(1-p));c.style.opacity=(p<.5?(.35+.65*(z+1)/2):1);});
  if(lg&&la&&!SMALL){lg.style.transform='translate(-50%,-50%) translate('+leftX+'px,'+(topG-(mob?72:112*.72))+'px)';la.style.transform='translate(-50%,-50%) translate('+rightX+'px,'+(topA-(mob?72:135*.72))+'px)';lg.classList.toggle('on',p>.46);la.classList.toggle('on',p>.46);}
  requestAnimationFrame(frame);}
 function upd(){var r=stage.getBoundingClientRect();if(opts.pass){p=Math.min(1,Math.max(0,(innerHeight*0.55-r.top)/(innerHeight*0.5)));return}var h=Math.max(1,(stage.offsetHeight-pin.offsetHeight)*0.84);p=Math.min(1,Math.max(0,(-r.top)/h));}
 addEventListener('scroll',upd,{passive:true});upd();requestAnimationFrame(frame);}
ascendOrb({pin:'orbpin-p',cv:'orbcv-p',lg:'lblG-p',la:'lblA-p'});


/* ---- original script 4 ---- */
(function(){var Q=data.quotes,i=0;function s(){document.getElementById("tq").textContent=Q[i][0];document.getElementById("tn").textContent=Q[i][1];document.getElementById("tr").textContent=Q[i][2];[].slice.call(document.getElementById("tdots").children).forEach(function(d,j){d.classList.toggle("on",j===i)});}s();document.getElementById("tp").onclick=function(){i=(i-1+Q.length)%Q.length;s();};document.getElementById("tnx").onclick=function(){i=(i+1)%Q.length;s();};setInterval(function(){i=(i+1)%Q.length;s();},8000);})();

/* ---- original script 5 ---- */
(function(){var c=document.querySelectorAll("#scards .card"),i=0;function s(){c.forEach(function(x,j){x.classList.toggle("on",j===i)});}s();document.getElementById("sp").onclick=function(){i=(i-1+c.length)%c.length;s();};document.getElementById("sn").onclick=function(){i=(i+1)%c.length;s();};})();

/* ---- original script 8 ---- */
(function(){
var V=__esc(data.values),tips=[].slice.call(document.querySelectorAll('#star .tip')),card=document.getElementById('vcard'),rot=document.querySelector('#star .rot'),cur=0,turns=0,last=0;
function show(i,user){if(user)last=Date.now();turns+=1;cur=i;tips.forEach(function(t,k){t.classList.toggle('on',k===i)});
 if(rot)rot.style.transform='rotate('+(turns*90)+'deg)';
 card.classList.remove('in');void card.offsetWidth;card.innerHTML='<small>0'+(i+1)+' / 04</small><h3>'+V[i][0]+'</h3><p>'+V[i][1]+'</p>';card.classList.add('in');}
tips.forEach(function(t,k){t.addEventListener('click',function(){show(k,true)});t.addEventListener('mouseenter',function(){if(k!==cur)show(k,true)});});
var star=document.getElementById('star'),vis=false;if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)star.classList.add('in')},{threshold:.3}).observe(star);else star.classList.add('in');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){if(vis&&Date.now()-last>8000)show((cur+1)%4)},4500);
})();

/* ---- original script 9 ---- */
(function(){
var cards=[].slice.call(document.querySelectorAll('.rm .ch'));
var box=document.getElementById('eradeep');
if(!cards.length||!box)return;
var art=document.getElementById('edArt'),eb=document.getElementById('edEb'),
    ti=document.getElementById('edTitle'),tx=document.getElementById('edText'),
    ct=document.getElementById('edCount');
var cur=0,open=false,lastFocus=null;

cards.forEach(function(c,i){
  if(!c.querySelector('.open')){
    var tag=document.createElement('span');tag.className='open';tag.textContent='Open';
    (c.querySelector('.t')||c).appendChild(tag);
  }
  c.setAttribute('tabindex','0');
  c.setAttribute('role','button');
  c.setAttribute('aria-label','Open this era in detail');
  c.addEventListener('click',function(){show(i)});
  c.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();show(i);}
  });
});

function fill(i){
  var c=cards[i];
  var a=c.querySelector('.art'), t=c.querySelector('.t');
  art.innerHTML = a ? a.innerHTML : '';
  var small=t&&t.querySelector('small'), h=t&&t.querySelector('h3'), p=t&&t.querySelector('p');
  eb.textContent = small?small.textContent:'';
  ti.textContent = h?h.textContent:'';
  tx.textContent = p?p.textContent:'';
  ct.textContent = ('0'+(i+1)).slice(-2)+' / '+('0'+cards.length).slice(-2);
  cur=i;
}
function show(i){
  fill(i);
  if(!open){
    lastFocus=document.activeElement;
    box.hidden=false;
    document.body.style.overflow='hidden';
    requestAnimationFrame(function(){box.classList.add('on')});
    open=true;
    box.querySelector('.ed-close').focus();
  }
}
function hide(){
  if(!open)return;
  box.classList.remove('on');
  open=false;
  document.body.style.overflow='';
  setTimeout(function(){box.hidden=true},320);
  if(lastFocus&&lastFocus.focus)lastFocus.focus();
}
function step(d){fill((cur+d+cards.length)%cards.length);}

box.querySelector('.ed-close').addEventListener('click',hide);
box.querySelector('.ed-prev').addEventListener('click',function(){step(-1)});
box.querySelector('.ed-next').addEventListener('click',function(){step(1)});
box.addEventListener('click',function(e){
  if(e.target===box||e.target.classList.contains('ed-sky'))hide();
});
addEventListener('keydown',function(e){
  if(!open)return;
  if(e.key==='Escape')hide();
  else if(e.key==='ArrowLeft')step(-1);
  else if(e.key==='ArrowRight')step(1);
});
})();
}

export default [page, app];
