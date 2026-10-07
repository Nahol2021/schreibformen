/* Schreibformen – Baukasten.
   Inhalte stehen in formen/*.js (eine Datei pro Schreibform), hier steht nur, wie sie angezeigt
   und geübt werden. Aufbau einer Form: siehe README.md. */

/* ---------- Werkzeuge ---------- */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) { if (c == null || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(c)); }
  return e;
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const mischen = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[“”„"]/g, " ").replace(/[–—]/g, "-").replace(/[.,!?;:]/g, " ").replace(/\s+/g, " ").trim();
const speicher = {
  get(k, d) { try { const v = localStorage.getItem("sf:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("sf:" + k, JSON.stringify(v)); } catch (e) {} }
};
const FORMEN = window.SCHREIBFORMEN || [];
const SPRACHNAME = { englisch: "Englisch", spanisch: "Spanisch", latein: "Latein", griechisch: "Griechisch", deutsch: "Deutsch" };

/* ---------- Texte mit Zeilennummern ---------- */
function zeilenUmbruch(absaetze, breite = 58) {
  const zeilen = [];
  absaetze.forEach(p => {
    let cur = "", erste = true;
    p.split(/\s+/).forEach(w => {
      if (cur && (cur + " " + w).length > breite) { zeilen.push({ t: cur, absatz: erste }); erste = false; cur = w; }
      else cur = cur ? cur + " " + w : w;
    });
    if (cur) zeilen.push({ t: cur, absatz: erste });
  });
  return zeilen;
}
function zeileVon(zeilen, stelle) {
  let ganz = ""; const anf = [];
  zeilen.forEach(z => { anf.push(ganz.length); ganz += z.t + " "; });
  const i = ganz.indexOf(stelle);
  if (i < 0) { console.warn("Zeilenverweis nicht gefunden:", stelle); return "l. ?"; }
  const bei = p => { let n = 0; while (n + 1 < anf.length && anf[n + 1] <= p) n++; return n + 1; };
  const a = bei(i), b = bei(i + stelle.length - 1);
  return a === b ? "l. " + a : "ll. " + a + "–" + b;
}
/* {L:Textstelle} wird zur Zeilenangabe im aktuellen Übungstext, **fett** zu fett. */
function fmt(s, zeilen) {
  return String(s ?? "")
    .replace(/\{L:(.+?)\}/g, (m, p) => zeilen ? zeileVon(zeilen, p) : "")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

/* ---------- Fortschritt ---------- */
const stand = id => speicher.get("stand", {})[id];
function merke(id, richtig, gesamt) {
  const s = speicher.get("stand", {}); const alt = s[id];
  const wert = gesamt ? richtig / gesamt : 0;
  s[id] = { best: Math.max(alt ? alt.best : 0, wert), letzt: wert };
  speicher.set("stand", s);
}
function formStand(form) {
  const ids = (form.uebungen || []).map(u => form.id + "/" + u.id);
  (form.texte || []).forEach(t => {
    (t.uebungen || []).forEach(u => ids.push(form.id + "/" + t.id + "/" + u.id));
    ids.push(form.id + "/" + t.id + "/schreiben");
  });
  if (!ids.length) return 0;
  return Math.round(100 * ids.reduce((a, id) => a + (stand(id) ? stand(id).best : 0), 0) / ids.length);
}

/* ---------- Aufgaben-Bausteine ---------- */
function auswahlAufgabe(it, { kategorien, festeReihenfolge, zeilen, beiAntwort }) {
  const opts = it.o || kategorien;
  const idx = opts.map((_, i) => i);
  const reihe = festeReihenfolge ? idx : mischen(idx);
  const richtig = Array.isArray(it.a) ? it.a : [it.a];
  const rueck = h("div", { class: "rueck", hidden: true });
  const knoepfe = {};
  let fertig = false;
  reihe.forEach(i => {
    knoepfe[i] = h("button", { class: "option", type: "button", html: fmt(opts[i], zeilen), onclick() {
      if (fertig) return; fertig = true;
      for (const k in knoepfe) { const n = +k; knoepfe[k].disabled = true; if (richtig.includes(n)) knoepfe[k].classList.add("ok"); else if (n === i) knoepfe[k].classList.add("nein"); }
      const ok = richtig.includes(i);
      rueck.hidden = false; rueck.className = "rueck " + (ok ? "ok" : "nein");
      rueck.innerHTML = (ok ? "✓ " : "✗ ") + (it.why ? fmt(it.why, zeilen) : (ok ? "Richtig." : "Richtig wäre: <b>" + fmt(opts[richtig[0]], zeilen) + "</b>"));
      beiAntwort(ok);
    } });
  });
  return h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fmt(it.q, zeilen) }), h("div", { class: "optionen" }, reihe.map(i => knoepfe[i])), rueck);
}

const RENDER = {
  auswahl(form, u, ctx, koerper, fuss, fertig, neu) {
    const ol = h("ol", { class: "aufgaben" }); koerper.append(ol);
    const reihe = u.festeReihenfolge ? u.items.map((_, i) => i) : mischen(u.items.map((_, i) => i));
    let beantwortet = 0, richtig = 0;
    reihe.forEach(i => ol.append(auswahlAufgabe(u.items[i], {
      kategorien: u.kategorien, festeReihenfolge: !!u.kategorien || u.optionenFest, zeilen: ctx.zeilen,
      beiAntwort(ok) { beantwortet++; if (ok) richtig++; if (beantwortet === reihe.length) fertig(richtig, reihe.length); }
    })));
    fuss.append(h("button", { class: "knopf leise", type: "button", onclick: neu }, "Neu mischen"));
  },
  reihenfolge(form, u, ctx, koerper, fuss, fertig, neu) {
    const teile = u.teile.map((t, i) => ({ t, i })), gemischt = mischen(teile), gewaehlt = [];
    let geprueft = false;
    const vorrat = h("div", { class: "teile" }), gebaut = h("ol", { class: "gebaut" }), rueck = h("div", { class: "rueck", hidden: true });
    const zeichnen = () => {
      vorrat.innerHTML = ""; gebaut.innerHTML = "";
      gemischt.filter(p => !gewaehlt.includes(p)).forEach(p => vorrat.append(h("button", { class: "teil", type: "button", html: fmt(p.t, ctx.zeilen), onclick() { if (geprueft) return; gewaehlt.push(p); zeichnen(); } })));
      gewaehlt.forEach((p, k) => gebaut.append(h("li", {}, h("button", { class: "teil", type: "button", html: fmt(p.t, ctx.zeilen), onclick() { if (geprueft) return; gewaehlt.splice(k, 1); zeichnen(); } }))));
    };
    zeichnen();
    koerper.append(h("div", { class: "unterzeile" }, "Sätze"), vorrat, h("div", { class: "unterzeile" }, "Dein Absatz"), gebaut, rueck);
    fuss.append(
      h("button", { class: "knopf haupt", type: "button", onclick() {
        if (gewaehlt.length < teile.length) { rueck.hidden = false; rueck.className = "rueck"; rueck.textContent = "Ordne zuerst alle Sätze ein."; return; }
        geprueft = true; let r = 0;
        $$(".teil", gebaut).forEach((b, k) => { const ok = gewaehlt[k].i === k; if (ok) r++; b.classList.add(ok ? "ok" : "nein"); });
        rueck.hidden = false; rueck.className = "rueck " + (r === teile.length ? "ok" : "nein");
        rueck.innerHTML = (r === teile.length ? "✓ Perfekt. " : "✗ " + r + " von " + teile.length + " an der richtigen Stelle. ") + fmt(u.why, ctx.zeilen);
        fertig(r, teile.length);
      } }, "Prüfen"),
      h("button", { class: "knopf leise", type: "button", onclick: neu }, "Neu mischen"));
  },
  offen(form, u, ctx, koerper, fuss, fertig, neu) {
    const ol = h("ol", { class: "aufgaben" }); koerper.append(ol);
    let bewertet = 0, gut = 0;
    u.items.forEach((it, i) => {
      const key = "entwurf:" + ctx.schluessel + "/" + i;
      const feld = h("textarea", { class: "schreibfeld kurz", id: key.replace(/[^\w-]/g, "_"), "aria-label": "Deine Antwort" });
      feld.value = speicher.get(key, ""); feld.addEventListener("input", () => speicher.set(key, feld.value));
      const muster = h("div", { class: "muster", hidden: true, html: "<b>Musterlösung:</b> " + fmt(it.m, ctx.zeilen) });
      let erledigt = false;
      const bewerten = ok => { if (erledigt) return; erledigt = true; bewertet++; if (ok) gut++; wahl.hidden = true; if (bewertet === u.items.length) fertig(gut, u.items.length); };
      const wahl = h("div", { class: "knoepfe", hidden: true }, h("span", { class: "leise" }, "Hattest du das Wesentliche?"),
        h("button", { class: "knopf", type: "button", onclick() { bewerten(true); } }, "Ja"),
        h("button", { class: "knopf leise", type: "button", onclick() { bewerten(false); } }, "Noch nicht"));
      ol.append(h("li", { class: "aufgabe" }, h("div", { class: "frage", html: fmt(it.q, ctx.zeilen) }), feld,
        h("div", { class: "knoepfe" }, h("button", { class: "knopf", type: "button", onclick() { muster.hidden = false; wahl.hidden = erledigt; this.disabled = true; } }, "Musterlösung zeigen")),
        muster, wahl));
    });
  }
};
const ART = { auswahl: "Auswahl", reihenfolge: "Reihenfolge", offen: "Offene Fragen" };

function uebungKarte(form, u, ctx) {
  const id = ctx.schluessel + "/" + u.id;
  const marke = h("span", { class: "marke-klein" });
  const koerper = h("div"), ergebnis = h("p", { class: "ergebnis", role: "status" }), fuss = h("div", { class: "knoepfe" });
  const markeSetzen = () => { const s = stand(id); marke.textContent = s ? "Bestwert " + Math.round(s.best * 100) + " %" : "noch offen"; marke.className = "marke-klein" + (s && s.best >= .8 ? " gut" : ""); };
  const fertig = (r, n) => { merke(id, r, n); markeSetzen(); ergebnis.textContent = r + " von " + n + " richtig" + (r === n ? " – sitzt!" : "."); };
  const neu = () => { koerper.innerHTML = ""; fuss.innerHTML = ""; ergebnis.textContent = ""; RENDER[u.art](form, u, { ...ctx, schluessel: id }, koerper, fuss, fertig, neu); };
  markeSetzen(); neu();
  return h("section", { class: "uebung" },
    h("div", { class: "uebkopf" }, h("div", {}, h("div", { class: "dach" }, ART[u.art] || ""), h("h3", {}, u.titel)), marke),
    u.intro ? h("p", { class: "intro", html: fmt(u.intro, ctx.zeilen) }) : null, koerper, ergebnis, fuss);
}

/* ---------- Anleitung ---------- */
const BLOCK = {
  text: b => h("p", { html: b.html }),
  box: b => h("div", { class: "box" }, b.etikett ? h("div", { class: "etikett" }, b.etikett) : null, h("div", { html: b.html })),
  karten: b => h("div", { class: "zwei" }, b.items.map(BLOCK.box)),
  schritte: b => h("div", { class: "schritte" }, b.items.map(s => h("div", { class: "schritt" }, h("div", {}, h("div", { class: "etikett" }, s.etikett), h("div", { html: s.html }))))),
  tabelle: b => h("div", { class: "tabrahmen" }, h("table", {}, h("tr", {}, b.kopf.map(k => h("th", {}, k))), b.zeilen.map(z => h("tr", {}, z.map(c => h("td", { html: c })))))),
  woerter: b => h("div", { class: "box" }, b.etikett ? h("div", { class: "etikett" }, b.etikett) : null,
    b.html ? h("div", { html: b.html }) : null,
    h("div", { class: "wortwolke" }, b.woerter.map(([w, d]) => h("span", {}, w, d ? h("b", {}, d) : null))))
};
function anleitung(form) {
  return h("div", { class: "stapel" }, (form.anleitung || []).map(b => h("div", {}, b.titel ? h("h2", {}, b.titel) : null, BLOCK[b.typ](b))));
}

/* ---------- Prüfliste beim Schreiben ---------- */
const wortzahl = t => (t.trim().match(/[\p{L}'’-]+/gu) || []).length;
function pruefen(regeln, text) {
  const klein = " " + text.toLowerCase().replace(/[’]/g, "'") + " ";
  const zaehl = m => (text.match(new RegExp(m, "giu")) || []).length;
  return regeln.map(r => {
    switch (r.art) {
      case "umfang": { const n = wortzahl(text); return [n >= r.min && (!r.max || n <= r.max * 1.3), `Umfang: ${n} Wörter (Ziel ${r.min}${r.max ? "–" + r.max : "+"})`]; }
      case "absaetze": { const n = text.split(/\n\s*\n/).filter(p => p.trim()).length; return [n >= r.min, `Absätze: ${n} (${r.hinweis || "mind. " + r.min})`]; }
      case "woerter": case "phrasen": {
        const da = r.liste.filter(w => r.art === "woerter" ? new RegExp("(^|[^\\p{L}])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^\\p{L}])", "u").test(klein) : klein.includes(w));
        return [da.length >= r.min, `${r.label}: ${da.length ? da.slice(0, 6).join(", ") + (da.length > 6 ? " …" : "") : "noch keine"} (mind. ${r.min})`];
      }
      case "zaehle": { const n = zaehl(r.muster); return [n >= r.min, `${r.label}: ${n} (mind. ${r.min})`]; }
      case "hoechstens": { const n = zaehl(r.muster); return [n <= r.max, n <= r.max ? r.ok : r.nein.replace("{n}", n)]; }
      case "enthaelt": return [new RegExp(r.muster, "iu").test(text), r.label];
      case "nicht": return [!new RegExp(r.muster, "iu").test(text), r.label];
    }
    return [false, "?"];
  });
}

function schreibAufgabe(form, text, zeilen) {
  const id = form.id + "/" + text.id + "/schreiben";
  const feld = h("textarea", { class: "schreibfeld", id: "feld-" + form.id + "-" + text.id, "aria-label": "Dein Text", placeholder: text.anfang || "" });
  feld.value = speicher.get("entwurf:" + id, "");
  const zaehler = h("div", { class: "zaehler" }), liste = h("ul", { class: "pruefliste" });
  const regeln = [...(form.pruefliste || []), ...(text.pruefliste || [])];
  const auswerten = () => {
    speicher.set("entwurf:" + id, feld.value);
    zaehler.textContent = wortzahl(feld.value) + " Wörter";
    liste.innerHTML = "";
    pruefen(regeln, feld.value).forEach(([ok, label]) => liste.append(h("li", { class: ok ? "ja" : "nein" }, h("b", {}, ok ? "✓" : "!"), h("span", { html: label }))));
  };
  feld.addEventListener("input", auswerten); auswerten();
  const haken = text.haken ? h("div", { class: "box haken" }, h("div", { class: "etikett" }, text.hakenTitel || "Selbstcheck"),
    text.haken.map((p, i) => { const k = "haken:" + id + "/" + i; const cb = h("input", { type: "checkbox", id: k.replace(/[^\w-]/g, "_") }); cb.checked = !!speicher.get(k, false); cb.addEventListener("change", () => speicher.set(k, cb.checked)); return h("label", { for: cb.id }, cb, h("span", {}, p)); })) : null;
  const muster = h("div", { class: "muster", hidden: true, html: fmt(esc(text.muster), zeilen) });
  const s = stand(id);
  return h("section", { class: "uebung" },
    h("div", { class: "uebkopf" }, h("div", {}, h("div", { class: "dach" }, "Schreibaufgabe"), h("h3", {}, text.aufgabeTitel || "Schreiben")),
      h("span", { class: "marke-klein" + (s ? " gut" : "") }, s ? "mit Muster verglichen" : "noch offen")),
    h("div", { class: "auftrag" }, h("div", { class: "etikett" }, "Aufgabe"), h("div", { html: fmt(text.aufgabe, zeilen) })),
    feld, zaehler, h("div", { class: "unterzeile" }, "Prüfliste – zählt beim Schreiben mit"), liste, haken,
    h("div", { class: "knoepfe" }, h("button", { class: "knopf haupt", type: "button", onclick() {
      muster.hidden = !muster.hidden; this.textContent = muster.hidden ? "Musterlösung zeigen" : "Musterlösung ausblenden";
      if (!muster.hidden) { merke(id, 1, 1); this.closest(".uebung").querySelector(".marke-klein").className = "marke-klein gut"; this.closest(".uebung").querySelector(".marke-klein").textContent = "mit Muster verglichen"; }
    } }, "Musterlösung zeigen")), muster);
}

function textAnsicht(text, zeilen) {
  const d = h("div", { class: "dokument" }, text.kopf ? h("div", { class: "dkopf" }, text.kopf) : null, h("div", { class: "dtitel" }, text.titel));
  if (zeilen) zeilen.forEach((z, i) => d.append(h("div", { class: "zeile" + (z.absatz && i ? " absatz" : "") }, h("span", { class: "nr" }, (i + 1) % 5 === 0 ? String(i + 1) : ""), h("span", {}, z.t))));
  else d.append(h("div", { class: "fliesstext" }, text.absaetze.map(p => h("p", {}, p))));
  if (text.quelle) d.append(h("p", { class: "leise", style: "margin:12px 0 0" }, text.quelle));
  return d;
}

/* ---------- Seiten ---------- */
const main = $("#main"), pfad = $("#pfad");

function uebersicht() {
  pfad.innerHTML = "";
  main.removeAttribute("data-sprache");
  main.innerHTML = "";
  main.append(h("h1", {}, "Schreibformen"),
    h("p", { class: "lead" }, "Jede Schreibform einmal richtig lernen und dann mit immer neuen Texten üben. Mit jeder Klassenarbeit kommen Texte oder neue Formen dazu."));
  const sprachen = [...new Set(FORMEN.map(f => f.sprache))];
  sprachen.forEach(sp => {
    const gruppe = h("section", { class: "sprachgruppe", "data-sprache": sp }, h("h2", {}, SPRACHNAME[sp] || sp));
    const liste = h("div", { class: "formliste" });
    FORMEN.filter(f => f.sprache === sp).forEach(f => {
      const p = formStand(f);
      liste.append(h("a", { class: "formkarte", href: "#" + f.id },
        h("div", {}, h("span", { class: "name" }, f.name), " ", h("span", { class: "de" }, f.deutsch)),
        h("div", { class: "stand" }, h("b", {}, p + " %"), "geübt"),
        h("div", { class: "info" }, `${f.kurz} · ${(f.texte || []).length} Übungstext${(f.texte || []).length === 1 ? "" : "e"} · ${f.seit}`),
        h("div", { class: "balken" }, h("i", { style: "width:" + p + "%" }))));
    });
    gruppe.append(liste); main.append(gruppe);
  });
  main.append(h("div", { class: "hinweisbox", html: "<b>Neue Klassenarbeit?</b> Kommt eine Schreibform dran, die hier schon steht, bekommt sie einen neuen Übungstext. Ist sie neu, kommt sie als eigene Form dazu – die Anleitung bleibt dann für alle späteren Arbeiten." }));
  document.title = "Schreibformen";
}

function formSeite(form, reiter, textId) {
  main.setAttribute("data-sprache", form.sprache);
  pfad.innerHTML = "";
  pfad.append(h("span", {}, "›"), h("span", {}, SPRACHNAME[form.sprache] || form.sprache), h("span", {}, "›"), h("a", { href: "#" + form.id }, form.deutsch));
  main.innerHTML = "";
  main.append(h("div", { class: "dach" }, (SPRACHNAME[form.sprache] || "") + " · " + form.seit),
    h("h1", {}, form.name), h("p", { class: "lead" }, form.kurz));
  const tabs = [["anleitung", "Anleitung"], ["ueben", "Üben"], ["schreiben", "Mit Texten üben"]];
  main.append(h("div", { class: "reiter", role: "tablist" }, tabs.map(([k, l]) => h("button", { type: "button", role: "tab", "aria-selected": String(k === reiter), onclick() { location.hash = form.id + (k === "anleitung" ? "" : "." + k); } }, l))));
  const inhalt = h("div"); main.append(inhalt);
  if (reiter === "anleitung") inhalt.append(anleitung(form));
  if (reiter === "ueben") {
    inhalt.append(h("p", { class: "intro" }, "Übungen, die zu jedem Text passen – die Grundlagen dieser Schreibform."));
    (form.uebungen || []).forEach(u => inhalt.append(uebungKarte(form, u, { schluessel: form.id, zeilen: null })));
  }
  if (reiter === "schreiben") {
    const texte = form.texte || [];
    const text = texte.find(t => t.id === textId) || texte[texte.length - 1];
    if (!text) { inhalt.append(h("p", {}, "Noch kein Übungstext.")); }
    else {
      inhalt.append(h("p", { class: "intro" }, "Wähle einen Text. Zu jedem gibt es Übungen, eine Schreibaufgabe mit Prüfliste und eine Musterlösung."),
        h("div", { class: "textwahl" }, texte.map(t => h("button", { type: "button", "aria-pressed": String(t === text), onclick() { location.hash = form.id + ".schreiben." + t.id; } }, t.kurztitel || t.titel))));
      const zeilen = text.zeilennummern === false ? null : zeilenUmbruch(text.absaetze);
      inhalt.append(textAnsicht(text, zeilen));
      (text.uebungen || []).forEach(u => inhalt.append(uebungKarte(form, u, { schluessel: form.id + "/" + text.id, zeilen })));
      inhalt.append(schreibAufgabe(form, text, zeilen));
    }
  }
  document.title = form.deutsch + " – Schreibformen";
}

function route() {
  const [id, reiter, textId] = decodeURIComponent(location.hash.slice(1)).split(".");
  const form = FORMEN.find(f => f.id === id);
  if (form) formSeite(form, ["ueben", "schreiben"].includes(reiter) ? reiter : "anleitung", textId);
  else uebersicht();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
