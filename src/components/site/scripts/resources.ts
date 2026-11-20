/* eslint-disable */
// @ts-nocheck -- ported verbatim from the original static page; see ../runtime.ts
import type { Env } from "../runtime";

import { app } from "./app";

export function page(env: Env, data: any) {
  const { document, window, addEventListener, removeEventListener, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearTimeout, clearInterval, IntersectionObserver, ResizeObserver, MutationObserver, esc } = env;
  /* covers that fail to load are removed, so the coloured cover shows (onerror in the original) */
  [].slice.call(document.querySelectorAll("img[data-cover]")).forEach(function (im) {
    function gone() { if (im.parentNode) im.parentNode.removeChild(im); }
    if (im.complete && !im.naturalWidth) gone(); else im.addEventListener("error", gone);
  });
  /* newsletter: opens the visitor's email app with the sign-up (the original only pretended to subscribe) */
  (function () {
    var f = document.getElementById("nlform"); if (!f || !data || !data.newsletter) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = function (n) { var el = f.querySelector("[name=" + n + "]"); return el ? el.value : ""; };
      var body = ["Please add me to the Included VC newsletter.", "", "Name: " + v("name"), "Email: " + v("email"), "I am: " + v("who")].join("\n");
      window.location.href = "mailto:" + data.newsletter.to + "?subject=" + encodeURIComponent("Newsletter sign-up") + "&body=" + encodeURIComponent(body);
      var b = f.querySelector("button"); if (b) b.textContent = data.newsletter.done;
    });
  })();
  /* editable content handed to scripts that build markup: every string escaped */
  function __esc(v) { return Array.isArray(v) ? v.map(__esc) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(function (e) { return [e[0], __esc(e[1])]; })) : typeof v === 'string' ? esc(v) : v; }
  /* groups of the logos as rendered (editable content) */
  function __chips(pin) { return [].slice.call(document.querySelectorAll('#' + pin + ' .chip')).map(function (c) { return { g: c.classList.contains('gl') ? 'global' : 'africa' }; }); }
/* ---- original script 0 ---- */
(function(){var sh=document.getElementById('shelf0'),books=[].slice.call(sh.querySelectorAll('.book')),n=document.getElementById('libn'),tags=document.getElementById('libtags'),cur=-1,last=0,timer;
function vis(){return books.filter(function(b){return !b.classList.contains('hide')})}
function open(i){books.forEach(function(b){b.classList.remove('on')});var b=books[i];if(!b)return;b.classList.add('on');cur=i;var v=vis();n.textContent=(v.indexOf(b)+1)+' of '+v.length+' books';}
books.forEach(function(b,i){b.addEventListener('click',function(e){if(e.target.closest('.lnk'))return;last=Date.now();open(i)});});
[].slice.call(sh.querySelectorAll('.lnk')).forEach(function(l){l.addEventListener('click',function(e){e.stopPropagation();var m=document.getElementById('bk'+l.getAttribute('data-bk'));if(m){m.classList.add('open');document.body.style.overflow='hidden';}});});
[].slice.call(document.querySelectorAll('.modal.bk')).forEach(function(m){document.body.appendChild(m);var tb=m.querySelectorAll('.tabs button'),pn=m.querySelectorAll('.pn');[].slice.call(tb).forEach(function(t){t.addEventListener('click',function(){[].slice.call(tb).forEach(function(x){x.classList.toggle('on',x===t)});var k=+t.getAttribute('data-p');[].slice.call(pn).forEach(function(p,j){p.classList.toggle('on',j===k)});});});m.addEventListener('click',function(e){if(e.target===m){m.classList.remove('open');document.body.style.overflow='';}});m.querySelector('[data-x]').addEventListener('click',function(){m.classList.remove('open');document.body.style.overflow='';});});
function auto(){clearInterval(timer);timer=setInterval(function(){if(Date.now()-last<8000)return;var v=vis();if(!v.length)return;var j=v.indexOf(books[cur]);open(books.indexOf(v[(j+1)%v.length]));},3600);}
tags.addEventListener('click',function(e){var btn=e.target.closest('button');if(!btn)return;[].slice.call(tags.children).forEach(function(x){x.classList.toggle('on',x===btn)});var g=btn.textContent;books.forEach(function(b){b.classList.toggle('hide',g!=='All'&&b.getAttribute('data-g')!==g)});var v=vis();if(v.length)open(books.indexOf(v[0]));last=Date.now();});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(cur<0)open(2);auto();}else clearInterval(timer);})},{threshold:.2});io.observe(sh);})();

/* ---- original script 1 ---- */
(function(){var f=document.getElementById('zfan'),zs=[].slice.call(f.children);zs.forEach(function(z){z.addEventListener('click',function(e){if(e.target.closest('.dt'))return;var on=z.classList.contains('on');zs.forEach(function(x){x.classList.remove('on')});if(!on)z.classList.add('on');});});})();

/* ---- original script 2 ---- */
(function(){var cv=document.getElementById('constel');if(!cv)return;var ctx=cv.getContext('2d'),W,H,D=Math.min(2,devicePixelRatio||1),C=['#5533eb','#0033ff','#00f2ff','#00ff04','#b0ff05','#ffff00'],N=[],S=[];
function size(){var r=cv.parentNode.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*D;cv.height=H*D;ctx.setTransform(D,0,0,D,0,0);N=[];S=[];
 for(var i=0;i<22;i++)N.push({x:W*(.12+.76*Math.random()),y:H*(.12+.76*Math.random()),r:2+Math.random()*2.5,c:C[i%6],t:Math.random()*6});
 for(var j=0;j<160;j++)S.push({x:Math.random()*W,y:Math.random()*H,s:Math.random()*1.2+.3,t:Math.random()*6});}
size();addEventListener('resize',size);
function frame(now){var t=now/1000;ctx.clearRect(0,0,W,H);
 S.forEach(function(s){ctx.globalAlpha=.3+.5*Math.abs(Math.sin(t+s.t));ctx.fillStyle='#fff';ctx.fillRect(s.x,s.y,s.s,s.s);});ctx.globalAlpha=1;
 ctx.lineWidth=1;for(var i=0;i<N.length;i++)for(var j=i+1;j<N.length;j++){var a=N[i],b=N[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<W*.26){ctx.globalAlpha=(1-d/(W*.26))*.5;ctx.strokeStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
 ctx.globalAlpha=1;N.forEach(function(n){var p=1+.25*Math.sin(t*1.5+n.t);var g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*5);g.addColorStop(0,n.c+'99');g.addColorStop(1,n.c+'00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,n.r*5,0,6.283);ctx.fill();ctx.fillStyle=n.c;ctx.beginPath();ctx.arc(n.x,n.y,n.r*p,0,6.283);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(n.x,n.y,n.r*.45,0,6.283);ctx.fill();});
 requestAnimationFrame(frame);}requestAnimationFrame(frame);})();
}

export default [page, app];
