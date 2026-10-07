// Schreibform: Sich vorstellen (spanisch). Aufbau siehe README.md.
SCHREIBFORMEN.push({
 "id": "spanisch-presentarse",
 "sprache": "spanisch",
 "name": "Presentarse",
 "deutsch": "Sich und andere vorstellen",
 "seit": "seit Klasse 9",
 "kurz": "Ein kurzer Text über dich (oder jemand anderen): Name, Alter, Herkunft, Sprachen, Wohnort, Nachmittage.",
 "anleitung": [
  { "typ": "text", "html": "Ein Vorstellungstext ist kurz und klar aufgebaut. Du brauchst wenige Satzmuster – die aber <b>fehlerfrei</b>." },
  { "typ": "schritte", "titel": "Bausteine in dieser Reihenfolge", "items": [
   { "etikett": "Begrüßen", "html": "<i>¡Hola!</i>" },
   { "etikett": "Name und Alter", "html": "<i>Me llamo … / Soy …</i> · <i>Tengo catorce años.</i>" },
   { "etikett": "Herkunft und Sprachen", "html": "<i>Soy de Alemania.</i> · <i>Hablo alemán, inglés y un poco de español.</i>" },
   { "etikett": "Wohnort und Viertel", "html": "<i>Vivo en … .</i> · <i>En mi barrio hay un cine, una piscina y tiendas.</i>" },
   { "etikett": "Nachmittage, mit Häufigkeit", "html": "<i>Por la tarde siempre hago los deberes. A veces quedo con mis amigos en el parque.</i>" },
   { "etikett": "Frage zurück und Gruß", "html": "<i>¿Y tú? ¿Qué haces por la tarde?</i> · <i>¡Hasta luego!</i>" } ] },
  { "typ": "karten", "titel": "Darauf achten", "items": [
   { "etikett": "Typische Fehler", "html": "<ul><li><s>Soy 14 años</s> → <b>Tengo</b> 14 años</li><li><s>Hay el cine</s> → Hay <b>un</b> cine</li><li><s>Hablo Alemán</s> → Sprachen <b>klein</b>: alemán</li><li>Frage ohne <b>¿</b> am Anfang</li></ul>" },
   { "etikett": "Besser klingen", "html": "<ul><li>Sätze verbinden: <i>y</i>, <i>pero</i>, <i>también</i>, <i>además</i></li><li>Häufigkeit einbauen: <i>siempre, normalmente, a veces</i></li><li>Reagieren: <i>¡Qué guay!</i>, <i>¡Genial!</i></li><li>Andere vorstellen: <i>Este es … / Esta es …</i>, <i>Se llama …</i></li></ul>" } ] },
  { "typ": "tabelle", "titel": "Redemittel", "kopf": ["Wofür", "Spanisch"], "zeilen": [
   ["Name", "Me llamo … · Soy … · (er/sie) se llama …"],
   ["Alter", "Tengo … años · (er/sie) tiene … años"],
   ["Herkunft", "Soy de … · (er/sie) es de …"],
   ["Sprachen", "Hablo … · (er/sie) habla …"],
   ["Wohnort", "Vivo en … · En mi barrio hay …"],
   ["Nachmittag", "Por la tarde … · siempre · normalmente · a veces · quedo con mis amigos · leo cómics · chateo"],
   ["Andere vorstellen", "Este es mi amigo … · Esta es mi amiga …"] ] }
 ],
 "uebungen": [
  { "id": "satzmuster", "art": "auswahl", "titel": "Welcher Satz ist richtig?", "items": [
   { "q": "Ich bin 14 Jahre alt.", "o": ["Tengo catorce años.", "Soy catorce años.", "Hay catorce años."], "a": 0, "why": "Alter mit <b>tener</b>: tengo … años." },
   { "q": "Ich komme aus Deutschland.", "o": ["Soy de Alemania.", "Soy en Alemania.", "Vivo de Alemania."], "a": 0 },
   { "q": "Ich wohne in Berlin.", "o": ["Vivo en Berlín.", "Vivo a Berlín.", "Soy en Berlín."], "a": 0 },
   { "q": "In meinem Viertel gibt es einen Park.", "o": ["En mi barrio hay un parque.", "En mi barrio hay el parque.", "En mi barrio es un parque."], "a": 0, "why": "Nach <b>hay</b> nie el/la." },
   { "q": "Ich spreche Deutsch und Englisch.", "o": ["Hablo alemán e inglés.", "Hablo Alemán y Inglés.", "Hablas alemán e inglés."], "a": 0, "why": "Sprachen klein. Vor <i>i-</i> wird aus <i>y</i> ein <i>e</i>: alemán <b>e</b> inglés." },
   { "q": "Das ist meine Freundin Ana.", "o": ["Esta es mi amiga Ana.", "Este es mi amiga Ana.", "Es mi amiga Ana esta."], "a": 0 },
   { "q": "Er heißt Pablo.", "o": ["Se llama Pablo.", "Me llamo Pablo.", "Llama Pablo."], "a": 0 },
   { "q": "Was machst du nachmittags?", "o": ["¿Qué haces por la tarde?", "Qué haces por la tarde?", "¿Qué hace por la tarde?"], "a": 0, "why": "¿ am Anfang, und <i>du</i> = haces." } ] },
  { "id": "aufbau", "art": "reihenfolge", "titel": "Text in die richtige Reihenfolge", "intro": "Tipp die Sätze in einer sinnvollen Reihenfolge an.", "teile": [
   "¡Hola! Me llamo Pablo y tengo catorce años.",
   "Soy de Madrid y hablo español e inglés.",
   "Vivo en el barrio Lavapiés. En mi barrio hay un cine y muchas tiendas.",
   "Por la tarde siempre hago los deberes y a veces nado en la piscina.",
   "¿Y tú? ¿Qué haces por la tarde? ¡Hasta luego!" ],
   "why": "Gruß + Name/Alter → Herkunft/Sprachen → Wohnort → Nachmittage → Frage zurück + Gruß." }
 ],
 "pruefliste": [
  { "art": "enthaelt", "muster": "^\\s*¡?hola", "label": "Begrüßung am Anfang (¡Hola!)" },
  { "art": "enthaelt", "muster": "(me llamo|soy [A-ZÁÉÍÓÚ])", "label": "Name (Me llamo … / Soy …)" },
  { "art": "enthaelt", "muster": "tengo \\S+ años", "label": "Alter (Tengo … años)" },
  { "art": "enthaelt", "muster": "soy de ", "label": "Herkunft (Soy de …)" },
  { "art": "enthaelt", "muster": "hablo ", "label": "Sprachen (Hablo …)" },
  { "art": "enthaelt", "muster": "(vivo en|hay )", "label": "Wohnort oder Viertel (Vivo en … / hay …)" },
  { "art": "enthaelt", "muster": "(siempre|normalmente|a veces|todos los días|nunca)", "label": "Häufigkeit (siempre, normalmente, a veces …)" },
  { "art": "enthaelt", "muster": "¿[^?]+\\?", "label": "Eine Frage mit ¿ … ?" },
  { "art": "enthaelt", "muster": "(adiós|hasta luego)", "label": "Gruß am Ende" },
  { "art": "nicht", "muster": "soy \\S+ años", "label": "Kein „soy … años“ (Alter mit tengo)" },
  { "art": "nicht", "muster": "hay (el|la|los|las) ", "label": "Kein „hay el/la“" }
 ],
 "texte": [{
  "id": "lucia", "kurztitel": "E-Mail von Lucía (9.1)", "titel": "¡Hola desde Berlín!", "kopf": "E-Mail",
  "quelle": "Übungstext zur 1. Spanischarbeit, Klasse 9 (selbst geschrieben, nur Wörter aus Unidad 1).",
  "zeilennummern": false,
  "absaetze": [
   "¡Hola! Me llamo Lucía y tengo catorce años. Soy de Madrid, pero ahora vivo en Berlín. Hablo español, alemán y un poco de inglés.",
   "Mi barrio es genial: hay un parque, un polideportivo con piscina y muchas tiendas. En el centro comercial compro ropa y libros.",
   "Por la tarde siempre hago los deberes. A veces quedo con mis amigos en la heladería y charlamos mucho. ¡Qué guay!",
   "¿Y tú? ¿Cómo te llamas? ¿Dónde vives y qué haces por la tarde? ¡Hasta luego! Lucía" ],
  "uebungen": [
   { "id": "verstehen", "art": "auswahl", "titel": "Verstanden?", "kategorien": ["verdadero", "falso"], "items": [
    { "q": "Lucía tiene catorce años.", "a": 0 },
    { "q": "Lucía vive en Madrid.", "a": 1, "why": "Sie ist <i>de</i> Madrid, wohnt aber <i>ahora</i> in Berlín." },
    { "q": "En el barrio de Lucía hay una piscina.", "a": 0 },
    { "q": "Lucía nunca hace los deberes.", "a": 1, "why": "<i>siempre hago los deberes</i>" },
    { "q": "A veces Lucía queda con sus amigos en la heladería.", "a": 0 } ] } ],
  "aufgabeTitel": "Contesta a Lucía",
  "aufgabe": "Schreib Lucía eine Antwort (60–80 Wörter): Stell dich vor (Name, Alter, Herkunft, Sprachen), beschreib dein Viertel und sag, was du nachmittags machst. Stell ihr am Ende eine Frage.",
  "anfang": "¡Hola, Lucía!\n\n…",
  "pruefliste": [{ "art": "umfang", "min": 60, "max": 80 }],
  "muster": "¡Hola, Lucía!\n\nMe llamo Tim y tengo catorce años. Soy de Alemania y vivo en Berlín, como tú. Hablo alemán, inglés y un poco de español.\n\nEn mi barrio hay un cine, una librería y un parque. ¡Es genial! Por la tarde siempre hago los deberes. A veces nado en la piscina del polideportivo o escucho música con mis amigos.\n\n¿Y tú? ¿Qué haces con tus amigos en la heladería?\n\n¡Hasta luego!\nTim"
 }]
});
