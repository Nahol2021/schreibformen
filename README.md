# Schreibformen

Sammlung von Schreibformen (Charakterisierung, Mediation, …) mit Anleitung, Übungen und Übungstexten.
Wächst mit jeder Klassenarbeit. Reines HTML/JS, kein Build-Schritt.

- `index.html` – Seite; bindet jede Form aus `formen/` per `<script>` ein
- `app.js` – Baukasten (Übungsarten, Text mit Zeilennummern, Schreibaufgabe mit Prüfliste)
- `formen/<sprache>-<form>.js` – eine Datei pro Schreibform

## Neue Klassenarbeit
- **Form gibt es schon** → in ihrer Datei unter `texte` einen neuen Text anhängen.
- **Form ist neu** → neue Datei in `formen/`, in `index.html` eintragen.

## Aufbau einer Form
```js
SCHREIBFORMEN.push({
  id, sprache, name, deutsch, seit, kurz,
  anleitung: [ {typ: "text"|"box"|"karten"|"schritte"|"tabelle"|"woerter", titel?, …} ],
  uebungen:  [ {id, art: "auswahl"|"reihenfolge"|"offen", titel, intro, items|teile, kategorien?} ],
  pruefliste:[ {art: "umfang"|"absaetze"|"woerter"|"phrasen"|"zaehle"|"hoechstens"|"enthaelt"|"nicht", …} ],
  texte: [ {id, kurztitel, titel, kopf, quelle, absaetze: [...], zeilennummern?, uebungen, aufgabe,
            aufgabeTitel, anfang, pruefliste, haken?, muster} ]
});
```
`{L:Textstelle}` in Übungen und Musterlösung wird zur Zeilenangabe im Text (l. 12 / ll. 12–13).

Übungstexte selbst schreiben – keine Buchtexte, keine Fotos von Arbeiten, keine Namen von Lehrkräften (Repo ist öffentlich).
