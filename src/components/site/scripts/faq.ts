/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

import { app } from "./app";

export function page(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;

/* ---- original script 0 ---- */
(function(){
var cv=document.getElementById('faqspace');if(!cv)return;
var ctx=cv.getContext('2d'),W=0,H=0,DPR=Math.min(2,devicePixelRatio||1),t0=performance.now(),run=true;
var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
var HUE=['rgba(85,51,235,','rgba(0,51,255,','rgba(0,242,255,','rgba(0,255,4,','rgba(176,255,5,'];
var stars=[],rings=[],orbs=[];
function build(){
 var r=cv.getBoundingClientRect();W=r.width;H=r.height;
 cv.width=Math.max(1,W*DPR);cv.height=Math.max(1,H*DPR);ctx.setTransform(DPR,0,0,DPR,0,0);
 var n=Math.round(Math.min(120,Math.max(55,W*H/6000)));
 stars=[];
 for(var i=0;i<n;i++){var brand=i%7===0;
  stars.push({x:Math.random()*W,y:Math.random()*H,r:0.5+Math.random()*1.5,
   vx:(Math.random()-0.5)*0.05,vy:(Math.random()-0.5)*0.04,
   ph:Math.random()*6.283,sp:0.25+Math.random()*0.5,
   c:brand?HUE[i%5]:'rgba(10,15,36,',a:brand?0.5:0.26+Math.random()*0.24});}
 var cx=W*0.78,cy=H*0.5,base=Math.min(W*0.34,H*1.1);
 rings=[{rx:base*0.62,ry:base*0.30,rot:-0.22},{rx:base*0.9,ry:base*0.44,rot:-0.16},{rx:base*1.2,ry:base*0.6,rot:-0.1}];
 rings.forEach(function(g){g.cx=cx;g.cy=cy});
 orbs=[{ring:0,a:0.4,sp:0.055,r:3,c:'#1733cc'},{ring:1,a:3.1,sp:-0.034,r:2.4,c:'#00f2ff'},{ring:2,a:1.7,sp:0.021,r:2.1,c:'#5533eb'}];}
function frame(now){
 if(!run){requestAnimationFrame(frame);return}
 var t=(now-t0)/1000;ctx.clearRect(0,0,W,H);ctx.lineWidth=1;
 rings.forEach(function(g){ctx.save();ctx.translate(g.cx,g.cy);ctx.rotate(g.rot);
  ctx.strokeStyle='rgba(10,15,36,0.08)';ctx.beginPath();ctx.ellipse(0,0,g.rx,g.ry,0,0,6.283);ctx.stroke();ctx.restore();});
 stars.forEach(function(s){
  if(!still){s.x+=s.vx;s.y+=s.vy;
   if(s.x<-4)s.x=W+4;if(s.x>W+4)s.x=-4;if(s.y<-4)s.y=H+4;if(s.y>H+4)s.y=-4;}
  var tw=still?1:(0.65+0.35*Math.sin(t*s.sp+s.ph));
  ctx.fillStyle=s.c+(s.a*tw).toFixed(3)+')';
  ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.283);ctx.fill();});
 orbs.forEach(function(o){var g=rings[o.ring];if(!g)return;
  var a=o.a+(still?0:t*o.sp);var x=Math.cos(a)*g.rx,y=Math.sin(a)*g.ry;
  var cs=Math.cos(g.rot),sn=Math.sin(g.rot);var px=g.cx+x*cs-y*sn,py=g.cy+x*sn+y*cs;
  var gg=ctx.createRadialGradient(px,py,0,px,py,o.r*5);gg.addColorStop(0,o.c);gg.addColorStop(1,'rgba(255,255,255,0)');
  ctx.globalAlpha=0.5;ctx.fillStyle=gg;ctx.beginPath();ctx.arc(px,py,o.r*5,0,6.283);ctx.fill();
  ctx.globalAlpha=1;ctx.fillStyle=o.c;ctx.beginPath();ctx.arc(px,py,o.r,0,6.283);ctx.fill();});
 requestAnimationFrame(frame);}
build();addEventListener('resize',build);addEventListener('load',build);
requestAnimationFrame(build);setTimeout(build,600);
if('ResizeObserver' in window){new ResizeObserver(function(){build()}).observe(cv);}
if('IntersectionObserver' in window){new IntersectionObserver(function(e){run=e[0].isIntersecting},{threshold:0}).observe(cv);}
requestAnimationFrame(frame);})();

/* ---- original script 1 ---- */
(function(){var bs=[].slice.call(document.querySelectorAll(".av2faq .side button")),gs=[].slice.call(document.querySelectorAll(".av2faq .grp"));bs.forEach(function(b){b.addEventListener("click",function(){var g=b.getAttribute("data-g");bs.forEach(function(x){x.classList.toggle("on",x===b)});gs.forEach(function(x){x.classList.toggle("on",x.getAttribute("data-g")===g)});});});})();
}

export default [page, app];
