/* eslint-disable */
// @ts-nocheck -- ported from the original static page; see ../runtime.ts
import type { Env } from "../runtime";
import { app } from "./app";

/**
 * The searchable instructors table. Same behaviour as the original, but the
 * list comes from the editable content and every value is escaped.
 */
function page(env: Env, data: any) {
  const { document, addEventListener, esc } = env;
  const N = data && data.network;
  if (!N) return;
  var P = N.people.map(function (p) {
    return { n: p.name, t: p.title, o: p.organisation, r: p.roles, f: p.fields, img: p.photo ? p.photo.url : "", link: p.link, bio: p.bio };
  }),
    FLD = N.fields,
    rows = document.getElementById("nwrows"),
    card = document.getElementById("nwcard"),
    q = document.getElementById("nwq"),
    ff = document.getElementById("ff"),
    cnt = document.getElementById("nwcount"),
    selF = "",
    cur = 0;
  if (!rows || !card || !q || !ff || !cnt || !P.length) return;
  function href(u) {
    return /^(https?:|mailto:|tel:|#|\/)/.test(u || "") ? esc(u) : "#";
  }
  function ini(n) {
    return esc(n.split(" ").slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase());
  }
  function av(p) {
    if (p.img) return '<img src="' + esc(p.img) + '" alt="">';
    return ini(p.n);
  }
  function showCard(p) {
    card.innerHTML =
      '<div class="pic">' + av(p) + '</div><h3><a href="' + href(p.link) + '">' + esc(p.n) + '</a><i class="dash"></i></h3><dl><dt>Organisation</dt><dd>' +
      esc(p.o || p.t) + "</dd><dt>Title</dt><dd>" + esc(p.o ? p.t : "Partner organisation") + '</dd><dt>Field</dt><dd class="tags">' +
      p.f.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") +
      "</dd><dt>About</dt><dd>" + esc(p.bio) + '</dd></dl><a class="cta" href="' + href(p.link) + '">Profile</a>';
  }
  function render() {
    var s = q.value.toLowerCase();
    var list = P.filter(function (p) {
      return (!s || (p.n + " " + p.t + " " + p.o + " " + p.r.join(" ") + " " + p.f.join(" ")).toLowerCase().indexOf(s) >= 0) && (!selF || p.f.indexOf(selF) >= 0);
    });
    rows.innerHTML = list.length
      ? list.map(function (p) {
          var i = P.indexOf(p);
          return '<div class="row' + (i === cur ? " on" : "") + '" data-i="' + i + '" tabindex="0" role="button"><div class="nm"><span class="av">' + av(p) + '</span><span class="nmx">' + esc(p.n) +
            '<i class="dash"></i></span></div><div class="t">' + esc(p.o || p.t) + '</div><div class="r">' + esc(p.o ? p.t : "") + '</div><div class="fl">' + esc(p.f.join(", ")) + "</div></div>";
        }).join("")
      : '<div class="empty">' + esc(N.emptyText) + "</div>";
    cnt.textContent = list.length + " of " + P.length + " people" + (selF ? " · " + selF : "");
    [].slice.call(rows.children).forEach(function (r) {
      function pick() {
        cur = +r.getAttribute("data-i");
        showCard(P[cur]);
        [].slice.call(rows.children).forEach(function (x) { x.classList.remove("on"); });
        r.classList.add("on");
        if (innerWidth < 1100) card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      r.addEventListener("click", pick);
      r.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
      });
    });
  }
  function menu(el, opts, set) {
    var m = el.querySelector(".menu");
    m.innerHTML = '<div class="on">All</div>' + opts.map(function (o) { return "<div>" + esc(o) + "</div>"; }).join("");
    el.addEventListener("click", function (e) {
      if (e.target.closest(".menu")) {
        var v = e.target.textContent;
        set(v === "All" ? "" : v);
        [].slice.call(m.children).forEach(function (c) { c.classList.toggle("on", c.textContent === v); });
        el.classList.remove("open");
        render();
        e.stopPropagation();
        return;
      }
      document.querySelectorAll(".nw .f.open").forEach(function (x) { if (x !== el) x.classList.remove("open"); });
      el.classList.toggle("open");
      e.stopPropagation();
    });
  }
  menu(ff, FLD, function (v) { selF = v; });
  document.addEventListener("click", function () {
    document.querySelectorAll(".nw .f.open").forEach(function (x) { x.classList.remove("open"); });
  });
  q.addEventListener("input", render);
  showCard(P[0]);
  render();
}

export default [page, app];
