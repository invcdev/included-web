/* eslint-disable */
// @ts-nocheck -- ported from the original static page; see ../runtime.ts
import type { Env } from "../runtime";
import { app } from "./app";

/**
 * The searchable instructors table. Same behaviour as the original. The people
 * are the landing page's Faculty (see src/app/(site)/instructors/page.tsx, which
 * also renders the first state on the server); every value is escaped.
 */
function page(env: Env, data: any) {
  const { document, addEventListener, esc } = env;
  if (!data || !data.people) return;
  var P = data.people,
    FLD = data.fields || [],
    rows = document.getElementById("nwrows"),
    card = document.getElementById("nwcard"),
    q = document.getElementById("nwq"),
    ff = document.getElementById("ff"),
    cnt = document.getElementById("nwcount"),
    selF = "",
    cur = 0;
  if (!rows || !card || !q || !ff || !cnt || !P.length) return;
  function ini(n) {
    return esc(n.split(" ").slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase());
  }
  function av(p) {
    return p.photo ? '<img src="' + esc(p.photo) + '" alt="">' : ini(p.name);
  }
  function showCard(p) {
    card.innerHTML =
      '<div class="pic">' + av(p) + "</div><h3>" + esc(p.name) + '<i class="dash"></i></h3><dl>' +
      (p.organisation ? "<dt>Organisation</dt><dd>" + esc(p.organisation) + "</dd>" : "") +
      "<dt>Title</dt><dd>" + esc(p.title) + "</dd>" +
      (p.fields.length ? '<dt>Field</dt><dd class="tags">' + p.fields.map(function (x) { return '<span class="tag">' + esc(x) + "</span>"; }).join("") + "</dd>" : "") +
      "</dl>";
  }
  function render() {
    var s = q.value.toLowerCase();
    var list = P.filter(function (p) {
      return (!s || (p.name + " " + p.title + " " + p.organisation + " " + p.fields.join(" ")).toLowerCase().indexOf(s) >= 0) && (!selF || p.fields.indexOf(selF) >= 0);
    });
    rows.innerHTML = list.length
      ? list.map(function (p) {
          var i = P.indexOf(p);
          return '<div class="row' + (i === cur ? " on" : "") + '" data-i="' + i + '" tabindex="0" role="button"><div class="nm"><span class="av">' + av(p) + '</span><span class="nmx">' + esc(p.name) +
            '<i class="dash"></i></span></div><div class="t">' + esc(p.organisation) + '</div><div class="r">' + esc(p.title) + '</div><div class="fl">' + esc(p.fields.join(", ")) + "</div></div>";
        }).join("")
      : '<div class="empty">' + esc(data.emptyText) + "</div>";
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
