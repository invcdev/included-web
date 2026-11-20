/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

import { app } from "./app";

export function page(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;

  /* groups of the logos as rendered (editable content) */
  function __chips(pin) { return [].slice.call(document.querySelectorAll('#' + pin + ' .chip')).map(function (c) { return { g: c.classList.contains('gl') ? 'global' : 'africa' }; }); }
/* ---- original script 0 ---- */
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

/* ---- original script 1 ---- */
(function(){var D=__chips('orbpin-community'),SMALL=1==1,LABELS=0==1,pin=document.getElementById('orbpin-community'),stage=pin.parentNode,cv=document.getElementById('orbcv-community'),ctx=cv.getContext('2d'),chips=[].slice.call(pin.querySelectorAll('.chip')),lg=document.getElementById('lblG-community'),la=document.getElementById('lblA-community'),W,H,DPR=Math.min(2,devicePixelRatio||1),rot=0,t0=performance.now(),p=0;
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
}

export default [page, app];
