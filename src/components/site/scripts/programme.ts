/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

import { app } from "./app";

export function page(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;
  var TLDR = data.tldr;
  /* editable content handed to scripts that build markup: every string escaped */
  function __esc(v) { return Array.isArray(v) ? v.map(__esc) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(function (e) { return [e[0], __esc(e[1])]; })) : typeof v === 'string' ? esc(v) : v; }
  /* groups of the logos as rendered (editable content) */
  function __chips(pin) { return [].slice.call(document.querySelectorAll('#' + pin + ' .chip')).map(function (c) { return { g: c.classList.contains('gl') ? 'global' : 'africa' }; }); }
/* ---- original script 0 ---- */
(function(){var P=__esc(data.programmes),i=0,tr=0,el=document.getElementById('pccard'),dots=document.getElementById('pcd');dots.innerHTML=P.map(function(){return '<i></i>'}).join('');
function r(){var p=P[i],t=p.tracks[tr]||p.tracks[0],done=p.status==='Concluded';
 el.innerHTML='<div class="card'+(done?' done':'')+'" style="--pic:url('+t.pic+')"><div class="pic"></div><div class="t"><span class="st '+(p.status==='Open'?'open':done?'done':'')+'">'+p.status+'</span><h3>'+p.name+'</h3>'+(p.tracks.length>1?'<div class="tracks">'+p.tracks.map(function(x,j){return '<button type="button" data-t="'+j+'" class="'+(j===tr?'on':'')+'">'+x.t+'</button>'}).join('')+'</div>':'')+'<p>'+t.d+'</p>'+t.rows.map(function(x){return '<div class="row"><span>'+x[0]+'</span><span>'+x[1]+'</span></div>'}).join('')+'<div class="cta"><a href="'+t.link+'">'+t.cta+'</a></div></div></div>';
 [].slice.call(dots.children).forEach(function(d,j){d.classList.toggle('on',j===i)});
 [].slice.call(el.querySelectorAll('.tracks button')).forEach(function(b){b.addEventListener('click',function(){tr=+b.getAttribute('data-t');r();});});}
document.getElementById('pcp').onclick=function(){i=(i-1+P.length)%P.length;tr=0;r();};document.getElementById('pcn').onclick=function(){i=(i+1)%P.length;tr=0;r();};r();})();

/* ---- original script 1 ---- */
(function(){var D=__chips('orbpin-partners'),SMALL=0==1,LABELS=1==1,pin=document.getElementById('orbpin-partners'),stage=pin.parentNode,cv=document.getElementById('orbcv-partners'),ctx=cv.getContext('2d'),chips=[].slice.call(pin.querySelectorAll('.chip')),lg=document.getElementById('lblG-partners'),la=document.getElementById('lblA-partners'),W,H,DPR=Math.min(2,devicePixelRatio||1),rot=0,t0=performance.now(),p=0;
var N=D.length,pts=D.map(function(d,i){var y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),th=i*2.399963;return {x:Math.cos(th)*r,y:y,z:Math.sin(th)*r};});
var PLAIN=0,COMPACT=0;var PC=['#5533eb','#0033ff','#00f2ff','#00ff04','#b0ff05','#ffff00'],parts=[];function size(){var r=pin.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);parts=[];for(var i=0;i<(PLAIN?0:160);i++)parts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.6,c:PC[i%6],vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15,t:Math.random()*6});}size();addEventListener('resize',size);
function ease(t){return t<.5?2*t*t:-1+(4-2*t)*t;}
function gridPos(k,total,cx,cols,top,gap,rg){var row=Math.floor(k/cols),col=k%cols,inRow=Math.min(cols,total-row*cols),x=cx+(col-(inRow-1)/2)*gap,y=top+row*(rg||gap*.62);return [x,y];}
function frame(now){var t=(now-t0)/1000;rot+=.0035*(1-p);ctx.clearRect(0,0,W,H);parts.forEach(function(q){q.x+=q.vx;q.y+=q.vy;if(q.x<0)q.x=W;if(q.x>W)q.x=0;if(q.y<0)q.y=H;if(q.y>H)q.y=0;var a=.08+.14*Math.abs(Math.sin(t*.8+q.t));ctx.globalAlpha=a;var gg=ctx.createRadialGradient(q.x,q.y,0,q.x,q.y,q.r*4);gg.addColorStop(0,q.c);gg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.arc(q.x,q.y,q.r*4,0,6.283);ctx.fill();ctx.globalAlpha=a*1.6;ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,q.r*.8,0,6.283);ctx.fill();ctx.globalAlpha=1;});
 var CS=COMPACT==1?.72:1,CW=COMPACT==1?1.16:1;var cx=W/2,cy=H/2,RY=H*(SMALL?.36:.40)*CS,RX=Math.max(RY,W*(SMALL?.34:.42)*CS*CW),R=RY,mob=W<960,chip=(mob?66:150)*(COMPACT==1?.74:1);
 if(COMPACT==1){RY=Math.min(RY,mob?150:185);RX=Math.max(RY,Math.min(W*.46,760));cy=H*(mob?.44:.40);}
 // globe wire
 ctx.globalAlpha=1-p;ctx.strokeStyle='rgba(10,15,36,.08)';ctx.lineWidth=1;for(var k=1;k<=3;k++){ctx.beginPath();ctx.ellipse(cx,cy,RX*(1+k*.12),RY*(1+k*.12),0,0,6.283);ctx.stroke();}
 ctx.save();ctx.translate(cx,cy);ctx.scale(RX/RY,1);var g=ctx.createRadialGradient(0,0,RY*.2,0,0,RY*1.1);g.addColorStop(0,PLAIN?'rgba(10,15,36,.05)':'rgba(0,242,255,.16)');g.addColorStop(.6,PLAIN?'rgba(10,15,36,.02)':'rgba(85,51,235,.07)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,RY*1.1,0,6.283);ctx.fill();ctx.restore();
 for(var i=0;i<400;i++){var a=i*2.399963,yy=1-2*(i+.5)/400,rr=Math.sqrt(1-yy*yy),x=Math.cos(a+rot)*rr,z=Math.sin(a+rot)*rr;if(z<0)continue;ctx.fillStyle='rgba(0,51,255,'+(.15+.5*z)+')';ctx.beginPath();ctx.arc(cx+x*RX,cy+yy*RY,1.3,0,6.283);ctx.fill();}
 ctx.globalAlpha=1;
 var gi=0,ai=0,gTotal=D.filter(function(d){return d.g==='global'}).length,aTotal=N-gTotal;
 var cols=SMALL?(mob?6:Math.max(8,Math.floor(W/150))):(mob?2:4),gap=(SMALL?(mob?Math.min(62,W*.16):Math.min(140,(W-80)/Math.max(8,Math.floor(W/150)))):(mob?Math.min(96,W*.25):Math.min(190,W*.11)))*(COMPACT==1?1.06:1),leftX=mob?W*.26:W*.25,rightX=mob?W*.74:W*.75,topG=mob?cy-152:cy-130*CS,topA=mob?cy-152:cy-130*CS,RG=gap*.62;
 if(mob&&!SMALL){var mr=Math.max(Math.ceil(gTotal/cols),Math.ceil(aTotal/cols));topG=topA=Math.max(118,cy-152);RG=Math.min(RG,(H-topG-26)/Math.max(1,mr-1));}
 else if(COMPACT==1&&!SMALL){var mr2=Math.max(Math.ceil(gTotal/cols),Math.ceil(aTotal/cols));RG=Math.min(gap*.78,(H-230)/Math.max(1,mr2-1));topG=topA=Math.max(118,(H-(mr2-1)*RG)/2);}
 var e=ease(p);
 chips.forEach(function(c,i){var d=D[i],q=pts[i];var ca=Math.cos(rot),sa=Math.sin(rot);var x=q.x*ca-q.z*sa,z=q.x*sa+q.z*ca;var ox=cx+x*RX*1.02,oy=cy+q.y*RY*1.08,os=.55+.45*(z+1)/2;
  var tx,ty;if(SMALL){var rows=Math.ceil(N/cols),rg=Math.min(gap*.62,(H-120)/Math.max(1,rows-1));var sp=gridPos(gi++,N,cx,cols,cy-((rows-1)*rg)/2,gap);tx=sp[0];ty=cy-((rows-1)*rg)/2+Math.floor((gi-1)/cols)*rg;}else if(d.g==='global'){var gp=gridPos(gi++,gTotal,leftX,cols,topG,gap,RG);tx=gp[0];ty=gp[1];}else{var ap=gridPos(ai++,aTotal,rightX,cols,topA,gap,RG);tx=ap[0];ty=ap[1];}
  var X=ox+(tx-ox)*e,Y=oy+(ty-oy)*e,S=os+(0.78-os)*e;
  c.style.transform='translate(-50%,-50%) translate('+X+'px,'+Y+'px) scale('+S+')';c.style.zIndex=Math.round(100+z*50*(1-p));c.style.opacity=(p<.5?(.35+.65*(z+1)/2):1);});
 lg.style.transform='translate(-50%,-50%) translate('+leftX+'px,'+(topG-(mob?72:112*CS))+'px)';la.style.transform='translate(-50%,-50%) translate('+rightX+'px,'+(topA-(mob?72:135*CS))+'px)';
 lg.classList.toggle('on',LABELS&&p>.46);la.classList.toggle('on',LABELS&&p>.46);
 requestAnimationFrame(frame);}
function upd(){var r=stage.getBoundingClientRect();var h=COMPACT==1?Math.max(1,(stage.offsetHeight-pin.offsetHeight)*0.84):Math.max(1,r.height-(innerHeight-90));p=Math.min(1,Math.max(0,(-r.top)/h));}
addEventListener('scroll',upd,{passive:true});upd();requestAnimationFrame(frame);})();

/* ---- original script 2 ---- */
(function(){var sec=document.getElementById("structure"),D=__esc(data.structure),stage=sec.querySelector(".stage"),t=sec.querySelector(".card .t"),img=sec.querySelector(".card .pic img"),pic=sec.querySelector(".card .pic"),bar=sec.querySelector(".track i"),ks=[].slice.call(sec.querySelectorAll(".meta .steps b")),pct=sec.querySelector(".pct"),cur=-1,last=0,manual=0,mob=innerWidth<960;function render(i){var d=D[i];t.innerHTML=(d.role?"<div class=role>"+d.role+"</div>":"")+"<h4>"+d.n+"</h4><p class=lead>"+d.lead+"</p><small>"+d.sub+"</small><ul>"+d.items.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>";pic.setAttribute("data-k","0"+(i+1));img.src=d.pic;}
function go(i){if(i===cur)return;t.classList.add("fade");img.classList.add("out");setTimeout(function(){render(i);t.classList.remove("fade");img.classList.remove("out");},220);cur=i;bar.style.width=Math.round((i+1)/D.length*100)+"%";ks.forEach(function(b,j){b.classList.toggle("on",j===i)});pct.textContent=Math.round((i+1)/D.length*100)+"%";}
function upd(){if(cur<0){render(0);cur=0;return;}var r=stage.getBoundingClientRect();if(r.top>0||r.bottom<innerHeight)return;var h=r.height-(innerHeight-100);var p=Math.min(1,Math.max(0,(-r.top)/Math.max(1,h)));var i=Math.min(D.length-1,Math.floor(p*D.length+0.0001));if(!mob&&manual&&i!==cur)go(i);}
addEventListener("scroll",function(){last=Date.now();manual=1;upd();},{passive:true});ks.forEach(function(b){b.addEventListener("click",function(){last=Date.now()+4000;go(+b.getAttribute("data-i"));});});sec.querySelector(".pv").addEventListener("click",function(){last=Date.now()+4000;go((cur-1+D.length)%D.length);});sec.querySelector(".nx").addEventListener("click",function(){last=Date.now()+4000;go((cur+1)%D.length);});addEventListener("resize",upd);upd();
setInterval(function(){var r=sec.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;if(!mob&&Date.now()-last<2500)return;if(mob&&Date.now()<last)return;go((cur+1)%D.length);},4000);})();

/* ---- original script 3 ---- */
(function(){var sec=document.getElementById("gain"),D=__esc(data.gain),stage=sec.querySelector(".stage"),t=sec.querySelector(".card .t"),img=sec.querySelector(".card .pic img"),pic=sec.querySelector(".card .pic"),bar=sec.querySelector(".track i"),ks=[].slice.call(sec.querySelectorAll(".meta .steps b")),pct=sec.querySelector(".pct"),cur=-1,last=0,manual=0,mob=innerWidth<960;function render(i){var d=D[i];t.innerHTML=(d.role?"<div class=role>"+d.role+"</div>":"")+"<h4>"+d.n+"</h4><p class=lead>"+d.lead+"</p><small>"+d.sub+"</small><ul>"+d.items.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>";pic.setAttribute("data-k","0"+(i+1));img.src=d.pic;}
function go(i){if(i===cur)return;t.classList.add("fade");img.classList.add("out");setTimeout(function(){render(i);t.classList.remove("fade");img.classList.remove("out");},220);cur=i;bar.style.width=Math.round((i+1)/D.length*100)+"%";ks.forEach(function(b,j){b.classList.toggle("on",j===i)});pct.textContent=Math.round((i+1)/D.length*100)+"%";}
function upd(){if(cur<0){render(0);cur=0;return;}var r=stage.getBoundingClientRect();if(r.top>0||r.bottom<innerHeight)return;var h=r.height-(innerHeight-100);var p=Math.min(1,Math.max(0,(-r.top)/Math.max(1,h)));var i=Math.min(D.length-1,Math.floor(p*D.length+0.0001));if(!mob&&manual&&i!==cur)go(i);}
addEventListener("scroll",function(){last=Date.now();manual=1;upd();},{passive:true});ks.forEach(function(b){b.addEventListener("click",function(){last=Date.now()+4000;go(+b.getAttribute("data-i"));});});sec.querySelector(".pv").addEventListener("click",function(){last=Date.now()+4000;go((cur-1+D.length)%D.length);});sec.querySelector(".nx").addEventListener("click",function(){last=Date.now()+4000;go((cur+1)%D.length);});addEventListener("resize",upd);upd();
setInterval(function(){var r=sec.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;if(!mob&&Date.now()-last<2500)return;if(mob&&Date.now()<last)return;go((cur+1)%D.length);},4000);})();

/* ---- original script 4 ---- */
(function(){var sec=document.getElementById("who"),D=__esc(data.who),stage=sec.querySelector(".stage"),t=sec.querySelector(".card .t"),img=sec.querySelector(".card .pic img"),pic=sec.querySelector(".card .pic"),bar=sec.querySelector(".track i"),ks=[].slice.call(sec.querySelectorAll(".meta .steps b")),pct=sec.querySelector(".pct"),cur=-1,last=0,manual=0,mob=innerWidth<960;function render(i){var d=D[i];t.innerHTML=(d.role?"<div class=role>"+d.role+"</div>":"")+"<h4>"+d.n+"</h4><p class=lead>"+d.lead+"</p><small>"+d.sub+"</small><ul>"+d.items.map(function(x){return "<li>"+x+"</li>"}).join("")+"</ul>";pic.setAttribute("data-k","0"+(i+1));img.src=d.pic;}
function go(i){if(i===cur)return;t.classList.add("fade");img.classList.add("out");setTimeout(function(){render(i);t.classList.remove("fade");img.classList.remove("out");},220);cur=i;bar.style.width=Math.round((i+1)/D.length*100)+"%";ks.forEach(function(b,j){b.classList.toggle("on",j===i)});pct.textContent=Math.round((i+1)/D.length*100)+"%";}
function upd(){if(cur<0){render(0);cur=0;return;}var r=stage.getBoundingClientRect();if(r.top>0||r.bottom<innerHeight)return;var h=r.height-(innerHeight-100);var p=Math.min(1,Math.max(0,(-r.top)/Math.max(1,h)));var i=Math.min(D.length-1,Math.floor(p*D.length+0.0001));if(!mob&&manual&&i!==cur)go(i);}
addEventListener("scroll",function(){last=Date.now();manual=1;upd();},{passive:true});ks.forEach(function(b){b.addEventListener("click",function(){last=Date.now()+4000;go(+b.getAttribute("data-i"));});});sec.querySelector(".pv").addEventListener("click",function(){last=Date.now()+4000;go((cur-1+D.length)%D.length);});sec.querySelector(".nx").addEventListener("click",function(){last=Date.now()+4000;go((cur+1)%D.length);});addEventListener("resize",upd);upd();
setInterval(function(){var r=sec.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;if(!mob&&Date.now()-last<2500)return;if(mob&&Date.now()<last)return;go((cur+1)%D.length);},4000);})();

/* ---- original script 5 ---- */

(function(){
  var map=document.querySelector('.ivc-road .ivc-map'); if(!map) return;
  var svg=map.querySelector('.ivc-svg'), line=svg.querySelector('.ivc-line'), glow=svg.querySelector('.ivc-glow'), grad=svg.querySelector('#ivcg');
  function draw(){
    var box=map.getBoundingClientRect();
    var mobile=window.innerWidth<=760, R=mobile?30:56, OUT=mobile?10:24;
    var rows=[].slice.call(map.querySelectorAll('.ivc-row'));
    var d='', prev=null, prevEdge=null;
    rows.forEach(function(row,ri){
      var rb=row.getBoundingClientRect();
      var icons=[].slice.call(row.querySelectorAll('.ivc-icon')).map(function(el){var b=el.getBoundingClientRect();return {x:b.left-box.left+b.width/2,y:b.top-box.top+b.height/2};});
      icons.sort(function(a,b){return a.x-b.x});
      var rev=row.classList.contains('ivc-rev'); if(rev) icons.reverse();
      var first=icons[0], last=icons[icons.length-1];
      // the row's outer edges, past all the text
      var leftEdge=rb.left-box.left-OUT, rightEdge=rb.right-box.left+OUT;
      if(prev){
        // come down the outside edge from the previous row and turn back in
        var edge=rev?rightEdge:leftEdge;
        d+=' L'+edge+','+prev.y;
        d+=' C'+(edge+(rev?R:-R))+','+prev.y+' '+(edge+(rev?R:-R))+','+first.y+' '+edge+','+first.y;
        d+=' L'+first.x+','+first.y;
      } else { d+='M'+first.x+','+first.y; }
      d+=' L'+last.x+','+last.y; prev=last;
    });
    grad.setAttribute('y2',box.height);
    line.setAttribute('d',d); glow.setAttribute('d',d);
  }
  draw(); window.addEventListener('resize',draw); window.addEventListener('load',draw); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(draw);
})();


/* ---- original script 8 ---- */
(function(){
/* the fourteen weeks read as a list of titles, and open one at a time on click */
var items=document.querySelectorAll('.cur .list .it');
if(!items.length)return;
var STILL=matchMedia('(prefers-reduced-motion: reduce)').matches;
[].forEach.call(items,function(it,i){
 var p=it.querySelector('p');if(!p)return;
 var id='curwk'+(i+1);
 var body=document.createElement('div');
 body.className='wkbody';body.id=id;
 p.parentNode.insertBefore(body,p);body.appendChild(p);
 var chev=document.createElement('span');
 chev.className='wkchev';chev.setAttribute('aria-hidden','true');
 it.appendChild(chev);
 it.setAttribute('role','button');
 it.setAttribute('tabindex','0');
 it.setAttribute('aria-expanded','false');
 it.setAttribute('aria-controls',id);
 function shut(){
  body.style.height=body.scrollHeight+'px';
  void body.offsetHeight;                       /* force the reflow so the close animates */
  body.style.height='0px';
 }
 function show(){
  body.style.height=body.scrollHeight+'px';
  if(STILL){body.style.height='auto';return}
  body.addEventListener('transitionend',function h(e){
   if(e.propertyName!=='height')return;
   if(it.classList.contains('open'))body.style.height='auto';
   body.removeEventListener('transitionend',h);
  });
 }
 function toggle(){
  var open=!it.classList.contains('open');
  it.classList.toggle('open',open);
  it.setAttribute('aria-expanded',open?'true':'false');
  if(open)show();else shut();
 }
 it.addEventListener('click',toggle);
 it.addEventListener('keydown',function(e){
  if(e.key==='Enter'||e.key===' '||e.key==='Spacebar'){e.preventDefault();toggle()}
 });
 /* an open week keeps its height correct when the column width changes */
 addEventListener('resize',function(){
  if(it.classList.contains('open'))body.style.height='auto';
 });
});
})();
}

export default [page, app];
