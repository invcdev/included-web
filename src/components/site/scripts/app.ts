/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

export function app(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;
  var TLDR = (data && data.tldr) || [];
(function(){
'use strict';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var DPR=Math.min(2,devicePixelRatio||1);

/* ---------- unicorn silhouette (400x400) ---------- */
function drawUnicorn(ctx,s){
  ctx.save();ctx.scale(s,s);ctx.fillStyle='#000';
  function ell(x,y,rx,ry,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);ctx.fill();ctx.restore();}
  function poly(p){ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);for(var i=1;i<p.length;i++)ctx.lineTo(p[i][0],p[i][1]);ctx.closePath();ctx.fill();}
  ell(200,235,88,50,-0.62);
  ell(262,178,44,40,0);
  poly([[252,150],[294,130],[332,76],[298,68]]);
  ell(318,80,36,18,-0.55);
  ell(328,96,20,11,-0.4);
  ell(350,101,16,9,-0.35);
  poly([[322,52],[333,58],[356,6]]);
  poly([[304,56],[312,36],[324,60]]);
  poly([[298,58],[280,70],[262,100],[248,135],[238,164],[256,166],[268,134],[284,100],[300,80],[312,62]]);
  poly([[276,190],[290,178],[334,206],[326,220]]);
  poly([[318,204],[334,206],[344,262],[330,266]]);
  poly([[258,212],[272,200],[312,232],[302,246]]);
  poly([[294,228],[310,230],[316,282],[302,284]]);
  ell(158,262,36,30,0.3);
  poly([[146,280],[170,282],[174,342],[156,344]]);
  poly([[152,342],[178,340],[182,358],[150,358]]);
  poly([[184,276],[204,278],[214,340],[198,344]]);
  poly([[194,340],[218,338],[222,356],[192,356]]);
  poly([[132,205],[112,218],[90,248],[78,290],[92,302],[106,268],[124,240],[144,224]]);
  ctx.restore();
}
function sampleUnicorn(size,step){
  var off=document.createElement('canvas');off.width=off.height=size;var c=off.getContext('2d');
  drawUnicorn(c,size/400);
  var d=c.getImageData(0,0,size,size).data, pts=[];
  for(var y=0;y<size;y+=step)for(var x=0;x<size;x+=step){if(d[(y*size+x)*4+3]>120)pts.push({x:x,y:y});}
  return pts;
}
function gradAt(t){ // 0 top -> 1 bottom : blue -> green -> yellow
  var a=[47,107,255],b=[56,214,91],c=[242,229,44],r;
  if(t<.5){var u=t/.5;r=[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u];}
  else{var v=(t-.5)/.5;r=[b[0]+(c[0]-b[0])*v,b[1]+(c[1]-b[1])*v,b[2]+(c[2]-b[2])*v];}
  return 'rgb('+(r[0]|0)+','+(r[1]|0)+','+(r[2]|0)+')';
}

/* ---------- hero unicorn particles ---------- */
(function(){
  var cv=document.getElementById('unicorn');if(!cv)return;var x=cv.getContext('2d'),W,H,P=[],mouse={x:-9e3,y:-9e3},t0=null;
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);
    var S=Math.min(W,H), step=Math.max(5,Math.round(S/62)), pts=sampleUnicorn(S,step), ox=(W-S)/2, oy=(H-S)/2;
    P=pts.map(function(p){return{tx:ox+p.x,ty:oy+p.y,x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,c:(document.body.classList.contains("space")&&document.querySelector(".shero")?"#ffffff":gradAt(p.y/S)),r:step*.34,ph:Math.random()*6.28};});
    t0=performance.now();}
  cv.parentNode.addEventListener('mousemove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  cv.parentNode.addEventListener('mouseleave',function(){mouse.x=mouse.y=-9e3;});
  function step(now){
    var k=Math.min(1,(now-t0)/1800), e=1-Math.pow(1-k,3);
    x.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var p=P[i];
      var gx=p.tx+(reduce?0:Math.sin(now/900+p.ph)*1.2), gy=p.ty+(reduce?0:Math.cos(now/1100+p.ph)*1.2);
      var ax=(gx-p.x)*.08, ay=(gy-p.y)*.08;
      var dx=p.x-mouse.x, dy=p.y-mouse.y, d2=dx*dx+dy*dy, R=70;
      if(d2<R*R){var d=Math.sqrt(d2)||1,f=(R-d)/R*2.4;ax+=dx/d*f;ay+=dy/d*f;}
      p.vx=(p.vx+ax)*.78;p.vy=(p.vy+ay)*.78;
      if(k<1){p.x+= (gx-p.x)*e*.25; p.y+=(gy-p.y)*e*.25;} else {p.x+=p.vx;p.y+=p.vy;}
      x.fillStyle=p.c;x.globalAlpha=.55+.45*e;x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();}
    x.globalAlpha=1;requestAnimationFrame(step);}
  addEventListener('resize',size);size();requestAnimationFrame(step);
})();

/* ---------- reveal text ---------- */
(function(){
  var el=document.getElementById('reveal');if(!el)return;
  var nodes=[];el.childNodes.forEach(function(nd){
    if(nd.nodeType===3){var ws=nd.textContent.split(/(\s+)/);ws.forEach(function(w){if(!w.trim()){nodes.push(document.createTextNode(w));return;}var s=document.createElement('span');s.className='w';s.textContent=w;nodes.push(s);});}
    else nodes.push(nd);});
  el.innerHTML='';nodes.forEach(function(nd){el.appendChild(nd)});
  var words=[].slice.call(el.querySelectorAll('.w,.s'));
  function upd(){var r=el.getBoundingClientRect(),vh=innerHeight;var p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.35)));var k=Math.floor(p*words.length);words.forEach(function(w,i){w.classList.toggle('on',i<k);});}
  addEventListener('scroll',upd,{passive:true});upd();
})();

/* ---------- count up + IO ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-n]').forEach(function(b){var N=+b.getAttribute('data-n'),s=performance.now();(function f(t){var k=Math.min(1,(t-s)/1400);b.textContent=Math.round(N*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f);})(s);});
});},{threshold:.15});
document.querySelectorAll('.io').forEach(function(el,i){el.style.transitionDelay=(i%6)*60+'ms';io.observe(el);});

/* ---------- globe ---------- */
(function(){
  var cv=document.getElementById('globe');if(!cv)return;var x=cv.getContext('2d'),W,H,pts=[],N=900;
  for(var i=0;i<N;i++){var ph=Math.acos(2*Math.random()-1),th=Math.random()*6.283;pts.push({x:Math.sin(ph)*Math.cos(th),y:Math.cos(ph),z:Math.sin(ph)*Math.sin(th),c:['#5533eb','#0033ff','#00f2ff','#00ff04','#b0ff05','#ffff00','#1a1b1e','#1a1b1e'][Math.floor(Math.random()*8)]});}
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);}
  var a=0;
  function step(){x.clearRect(0,0,W,H);var R=Math.min(W,H)*.36,cx=W/2,cy=H/2;a+=reduce?0:.0025;
    x.strokeStyle='rgba(17,18,20,.08)';x.lineWidth=1;
    for(var k=1;k<=3;k++){x.beginPath();x.arc(cx,cy,R*(1+k*.22),0,6.283);x.stroke();}
    var ca=Math.cos(a),sa=Math.sin(a);
    for(var i=0;i<pts.length;i++){var p=pts[i],X=p.x*ca-p.z*sa,Z=p.x*sa+p.z*ca,s=.6+(Z+1)*.35;
      x.fillStyle=p.c;x.globalAlpha=.25+(Z+1)*.35;x.beginPath();x.arc(cx+X*R,cy+p.y*R,1.2*s,0,6.283);x.fill();}
    x.globalAlpha=1;requestAnimationFrame(step);}
  addEventListener('resize',size);size();step();
})();

/* ---------- sky constellation ---------- */
(function(){
  var cv=document.getElementById('skyc');if(!cv)return;var x=cv.getContext('2d'),W,H,stars=[],uni=[];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);
    stars=[];for(var i=0;i<Math.floor(W*H/3200);i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.3,ph:Math.random()*6.28});
    var S=Math.min(W,H);uni=sampleUnicorn(S,Math.max(5,Math.round(S/48))).map(function(p){return{x:(W-S)/2+p.x,y:(H-S)/2+p.y,c:gradAt(p.y/S)};});}
  function step(now){x.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){var s=stars[i];x.globalAlpha=.25+.55*Math.abs(Math.sin(now/1400+s.ph));x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,6.283);x.fill();}
    x.globalAlpha=.55;for(var j=0;j<uni.length;j++){var u=uni[j];x.fillStyle=u.c;x.beginPath();x.arc(u.x,u.y,2.2,0,6.283);x.fill();}
    x.globalAlpha=1;requestAnimationFrame(step);}
  addEventListener('resize',size);size();requestAnimationFrame(step);
  // panel
  var cur=0,nodes=[].slice.call(document.querySelectorAll('#skysvg .node')),chips=[].slice.call(document.querySelectorAll('.sky .chips button'));
  function show(i){cur=(i+TLDR.length)%TLDR.length;var d=TLDR[cur];
    document.getElementById('tp-k').textContent=d.k;document.getElementById('tp-t').textContent=d.t;document.getElementById('tp-b').textContent=d.b;document.getElementById('tp-i').textContent=String(cur+1).padStart(2,'0');
    nodes.forEach(function(n,j){n.classList.toggle('on',j===cur)});chips.forEach(function(b,j){b.classList.toggle('on',j===cur)});}
  nodes.forEach(function(n){n.addEventListener('click',function(){show(+n.getAttribute('data-i'));stop();})});
  chips.forEach(function(b){b.addEventListener('click',function(){show(+b.getAttribute('data-i'));stop();})});
  document.querySelectorAll('.sky .nv button').forEach(function(b){b.addEventListener('click',function(){show(cur+ +b.getAttribute('data-d'));stop();})});
  var auto=setInterval(function(){show(cur+1)},5500);function stop(){clearInterval(auto)}
})();


/* ---------- realistic starfield (fixed), space mode, orbit nav ---------- */
function makeSky(cv,opts){
  var x=cv.getContext('2d'),W,H,L=[],shoot=[],mx=0,my=0,dense=opts.dense||1;
  var TINT=['255,255,255','255,255,255','255,255,255','214,228,255','255,240,214','200,255,220'];
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*DPR;cv.height=H*DPR;x.setTransform(DPR,0,0,DPR,0,0);
    L=[0,1,2].map(function(d){var n=Math.floor(W*H/(d===0?9000:d===1?5200:3000)*dense),a=[];for(var i=0;i<n;i++)a.push({x:Math.random()*W,y:Math.random()*H,r:(d===0?1.6:d===1?1.0:.55)*(.6+Math.random()*.9),t:TINT[Math.floor(Math.random()*TINT.length)],ph:Math.random()*6.28,sp:.4+Math.random()*1.2,big:d===0&&Math.random()<.18});return{d:d,a:a};});}
  addEventListener('mousemove',function(e){mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);});
  var last=0;
  function step(now){x.clearRect(0,0,W,H);
    var sc=scrollY*.0004;
    // milky band
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.45,'rgba(180,200,255,.035)');g.addColorStop(.55,'rgba(255,255,255,.05)');g.addColorStop(.65,'rgba(180,255,220,.03)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
    for(var l=0;l<L.length;l++){var lay=L[l],par=(3-lay.d)*14;
      for(var i=0;i<lay.a.length;i++){var s=lay.a[i];var px=s.x+mx*par,py=((s.y+sc*par*18)%H+H)%H+my*par;
        var tw=.55+.45*Math.sin(now/900*s.sp+s.ph);
        if(s.big){var rg=x.createRadialGradient(px,py,0,px,py,s.r*7);rg.addColorStop(0,'rgba('+s.t+','+(.9*tw)+')');rg.addColorStop(.25,'rgba('+s.t+','+(.25*tw)+')');rg.addColorStop(1,'rgba('+s.t+',0)');x.fillStyle=rg;x.beginPath();x.arc(px,py,s.r*7,0,6.283);x.fill();
          x.strokeStyle='rgba('+s.t+','+(.35*tw)+')';x.lineWidth=.6;x.beginPath();x.moveTo(px-s.r*5,py);x.lineTo(px+s.r*5,py);x.moveTo(px,py-s.r*5);x.lineTo(px,py+s.r*5);x.stroke();}
        x.fillStyle='rgba('+s.t+','+((.35+.65*tw)*(lay.d===2?.6:1))+')';x.beginPath();x.arc(px,py,s.r,0,6.283);x.fill();}}
    // shooting stars
    if(!reduce&&now-last>4200&&Math.random()<.02){last=now;shoot.push({x:Math.random()*W*.8,y:Math.random()*H*.4,vx:9+Math.random()*5,vy:4+Math.random()*3,life:1});}
    for(var k=shoot.length-1;k>=0;k--){var s2=shoot[k];s2.x+=s2.vx;s2.y+=s2.vy;s2.life-=.025;if(s2.life<=0){shoot.splice(k,1);continue;}
      var lg=x.createLinearGradient(s2.x-s2.vx*10,s2.y-s2.vy*10,s2.x,s2.y);lg.addColorStop(0,'rgba(255,255,255,0)');lg.addColorStop(1,'rgba(255,255,255,'+s2.life+')');x.strokeStyle=lg;x.lineWidth=1.4;x.beginPath();x.moveTo(s2.x-s2.vx*10,s2.y-s2.vy*10);x.lineTo(s2.x,s2.y);x.stroke();}
    requestAnimationFrame(step);}
  addEventListener('resize',size);size();requestAnimationFrame(step);
}
(function(){
  var cv=document.getElementById('stars');if(cv)makeSky(cv,{dense:1});
  var deep=document.querySelector('.trans canvas.deep');if(deep)makeSky(deep,{dense:1.8});
  var darks=[].slice.call(document.querySelectorAll('.space-bg,.sec.space,.sky,.fmt,.ivc-faq .ivc-hero,.hero,.pagehead,.tcard'));
  function mode(){var vh=innerHeight,on=false;darks.forEach(function(d){var r=d.getBoundingClientRect();if(r.top<vh*.5&&r.bottom>vh*.5)on=true;});document.body.classList.toggle('space',on);}
  addEventListener('scroll',mode,{passive:true});mode();
  var secs=[].slice.call(document.querySelectorAll('section[id]'));if(secs.length>3){var nav=document.createElement('div');nav.className='orbit-nav';secs.forEach(function(s){var a=document.createElement('a');a.href='#'+s.id;a.title=s.id;nav.appendChild(a);});document.body.appendChild(nav);
    var dots=[].slice.call(nav.children);function up(){var vh=innerHeight;secs.forEach(function(s,i){var r=s.getBoundingClientRect();dots[i].classList.toggle('on',r.top<vh*.5&&r.bottom>vh*.5);});}addEventListener('scroll',up,{passive:true});up();}
  // nebula parallax
  var neb=document.querySelector('.nebula');if(neb){addEventListener('scroll',function(){neb.style.transform='translateY('+(scrollY*.25)+'px) scale(1.08)';},{passive:true});addEventListener('mousemove',function(e){var dx=(e.clientX/innerWidth-.5)*14,dy=(e.clientY/innerHeight-.5)*10;neb.style.backgroundPosition='calc(50% + '+dx+'px) calc(50% + '+dy+'px)';});}
  // voices modal (reference style, with prev/next inside)
  var tm=document.getElementById('tmodal');if(tm){var ts=[].slice.call(tm.querySelectorAll('.ts')),td=[].slice.call(tm.querySelectorAll('.tdots i')),c=0;
    function go(i){c=(i+ts.length)%ts.length;ts.forEach(function(s,j){s.classList.toggle('on',j===c)});td.forEach(function(d,j){d.classList.toggle('on',j===c)});tm.querySelector('.tbox').scrollTop=0;}
    function openT(i){go(i);tm.classList.add('open');document.body.style.overflow='hidden';}
    function closeT(){tm.classList.remove('open');document.body.style.overflow='';}
    document.querySelectorAll('.gq').forEach(function(b){b.addEventListener('click',function(){openT(+b.getAttribute('data-t'))})});
    tm.querySelectorAll('.tarrows button').forEach(function(b){b.addEventListener('click',function(){go(c+ +b.getAttribute('data-d'))})});
    td.forEach(function(d,j){d.addEventListener('click',function(){go(j)})});
    tm.querySelector('.tx').addEventListener('click',closeT);tm.addEventListener('click',function(e){if(e.target===tm)closeT()});
    addEventListener('keydown',function(e){if(!tm.classList.contains('open'))return;if(e.key==='Escape')closeT();if(e.key==='ArrowRight')go(c+1);if(e.key==='ArrowLeft')go(c-1);});}
})();

/* ---------- modals ---------- */
function closeAll(){document.querySelectorAll('.modal.open').forEach(function(m){m.classList.remove('open')});document.body.style.overflow='';}
document.querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){var m=document.getElementById(b.getAttribute('data-m'));if(m){m.classList.add('open');document.body.style.overflow='hidden';}});});
document.querySelectorAll('[data-x]').forEach(function(b){b.addEventListener('click',closeAll)});
document.querySelectorAll('.modal').forEach(function(m){m.addEventListener('click',function(e){if(e.target===m)closeAll()})});
addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
})();

}
