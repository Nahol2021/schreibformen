// Schreibform: Sprachmittlung (englisch). Aufbau siehe README.md.
SCHREIBFORMEN.push({
 "id": "englisch-mediation",
 "sprache": "englisch",
 "name": "Mediation",
 "deutsch": "Sprachmittlung",
 "seit": "seit Klasse 9",
 "kurz": "Einen deutschen Text sinngemäß auf Englisch weitergeben – für eine bestimmte Person und einen Zweck.",
 "anleitung": [
  {
   "typ": "text",
   "html": "Bei der Mediation <b>übersetzt du nicht</b>. Du wählst aus, was die Person wissen will, und sagst es in einfachen eigenen Worten."
  },
  {
   "typ": "schritte",
   "titel": "So gehst du vor",
   "items": [
    {
     "etikett": "Aufgabe lesen",
     "html": "<b>Wer</b> will <b>was</b> wissen – und <b>wozu</b>? Markiere im deutschen Text nur, was dazu passt."
    },
    {
     "etikett": "Auswählen",
     "html": "Zahlen, Fakten, Gründe, Warnungen – ja. Namen, Alter, Nebensätze, die nichts zur Frage beitragen – weglassen."
    },
    {
     "etikett": "Umformulieren",
     "html": "In eigenen, einfachen Sätzen. Fehlt dir ein Wort: <b>umschreiben</b> (<span class=\"en\">an organization that protects actors' rights</span>). Deutsche Begriffe kurz erklären."
    },
    {
     "etikett": "Textsorte beachten",
     "html": "E-Mail: Anrede, Bezug auf die Frage, Infos, Gruß. Sachlich, aber persönlich."
    }
   ]
  },
  {
   "typ": "tabelle",
   "titel": "Useful phrases",
   "kopf": [
    "Wofür",
    "Phrases"
   ],
   "zeilen": [
    [
     "Anfang (E-Mail)",
     "Hi Ethan, · Thanks for your email! · You asked me about … · I've found an interesting article about …"
    ],
    [
     "Auf den Text verweisen",
     "According to the article, … · The article says that … · Experts say that …"
    ],
    [
     "Umschreiben",
     "… which means that … · a kind of … · something like … · a person who …"
    ],
    [
     "Gliedern",
     "First of all, … · What's more, … · However, … · Still, …"
    ],
    [
     "Schluss",
     "I hope this helps. · Good luck! · Best wishes, · Love,"
    ]
   ]
  },
  {
   "typ": "box",
   "etikett": "Typische Fehler",
   "html": "<ul><li>Wort für Wort übersetzen („Who is member, earns more“)</li><li>Unwichtiges mitnehmen (Alter, Namen)</li><li>deutsche Wörter stehen lassen (<i>Statist</i>, <i>Gewerkschaft</i>)</li><li>Anrede oder Gruß vergessen</li></ul>"
  }
 ],
 "uebungen": [],
 "pruefliste": [
  {
   "art": "enthaelt",
   "muster": "^\\s*(hi|hello|dear|hey)\\b",
   "label": "Anrede am Anfang (Hi … / Dear …)"
  },
  {
   "art": "enthaelt",
   "muster": "(best wishes|love|take care|see you|cheers|bye|yours|regards)",
   "label": "Grußformel am Ende"
  }
 ],
 "texte": [
  {
   "id": "statisten",
   "kurztitel": "Statisten in Hollywood (9.1)",
   "titel": "Statisten in Hollywood: Viel Warten für wenig Geld",
   "kopf": "Übungstext (Zahlen gerundet)",
   "quelle": "Übungstext aus der Klassenarbeit 9.1 „California Dreaming“ (selbst geschrieben).",
   "zeilennummern": false,
   "absaetze": [
    "Rund 50.000 Menschen sind in Los Angeles als Komparsen registriert. Für einen Drehtag von bis zu zwölf Stunden bekommen sie meist zwischen 150 und 200 Dollar. Wer Mitglied der Schauspielergewerkschaft ist, verdient etwas mehr, zum Beispiel durch Zuschläge für Überstunden.",
    "Leben können die wenigsten davon: Die meisten Statisten haben einen zweiten Job, etwa als Kellner oder Fahrer. Der Alltag am Set besteht vor allem aus Warten. Oft sitzen die Komparsen stundenlang in Zelten neben dem Set, bevor sie für wenige Minuten vor die Kamera dürfen.",
    "Trotzdem lieben viele den Job. „Man ist mittendrin, wenn Filmgeschichte geschrieben wird“, sagt die 34-jährige Dana Reyes, die seit sechs Jahren als Statistin arbeitet.",
    "Experten warnen allerdings: Der Weg vom Statisten zum Star gelingt nur sehr selten. Außerdem werden Komparsen in Massenszenen zunehmend durch computergenerierte Figuren ersetzt."
   ],
   "uebungen": [
    {
     "id": "werkzeuge",
     "art": "auswahl",
     "titel": "Mediation tools",
     "intro": "Wie gibst du diese Stellen auf Englisch wieder?",
     "items": [
      {
       "q": "„Komparsen / Statisten“",
       "o": [
        "extras",
        "statists",
        "comparses",
        "supporters"
       ],
       "a": 0,
       "why": "extra = Statist/in. <i>Statist</i> gibt es im Englischen so nicht."
      },
      {
       "q": "„Schauspielergewerkschaft“ – für Ethan am besten:",
       "o": [
        "the actors' union",
        "the Schauspielergewerkschaft",
        "the actors' trade club society",
        "the workers' party"
       ],
       "a": 0,
       "why": "Kennst du das Wort nicht: umschreiben – \"an organization that protects actors' rights\"."
      },
      {
       "q": "„Leben können die wenigsten davon.“",
       "o": [
        "Very few extras can make a living from it.",
        "The least can live from it.",
        "Living can the fewest of it.",
        "Few extras are living."
       ],
       "a": 0,
       "why": "make a living from sth = davon leben können."
      },
      {
       "q": "„Zuschläge für Überstunden“",
       "o": [
        "extra money for overtime",
        "additions for over-hours",
        "surcharges for more-time",
        "overtime hits"
       ],
       "a": 0,
       "why": "overtime = Überstunden. Einfach umschreiben ist erlaubt und klug."
      },
      {
       "q": "„Wer Mitglied … ist, verdient etwas mehr.“",
       "o": [
        "Members of the union earn a bit more.",
        "Who is member earns some more.",
        "Members earn more of the union.",
        "Who member is, earns more."
       ],
       "a": 0,
       "why": "Kein wörtliches „Wer … ist“ – formuliere frei."
      },
      {
       "q": "Welche Info ist für Ethans Frage <b>am wenigsten</b> wichtig?",
       "o": [
        "Dana Reyes is 34 years old.",
        "Extras earn $150–200 a day.",
        "Extras often wait for hours.",
        "Few extras ever become stars."
       ],
       "a": 0,
       "why": "Das Alter der Statistin hilft Ethan nicht. Bei Mediation lässt du so etwas weg."
      }
     ]
    }
   ],
   "aufgabeTitel": "Email to Ethan",
   "aufgabe": "Your American friend Ethan is going to spend the summer with his uncle in Los Angeles and wants to work as an extra in a film. He asks you what you know about it. You have found the German article above.<br><b>Write an email to Ethan (about 150 words) in which you tell him the most important facts.</b>",
   "anfang": "Hi Ethan,\n\n…",
   "pruefliste": [
    {
     "art": "umfang",
     "min": 130,
     "max": 170
    },
    {
     "art": "enthaelt",
     "muster": "(\\$|dollar)",
     "label": "Bezahlung genannt"
    },
    {
     "art": "enthaelt",
     "muster": "wait",
     "label": "Warten erwähnt"
    },
    {
     "art": "nicht",
     "muster": "(statist|komparse|gewerkschaft)",
     "label": "Keine deutschen Wörter übernommen"
    }
   ],
   "hakenTitel": "Selbstcheck: Was steht in deiner E-Mail?",
   "haken": [
    "ca. 50.000 registrierte Statisten (viel Konkurrenz)",
    "150–200 $ für bis zu 12 Stunden",
    "Gewerkschaftsmitglieder verdienen etwas mehr",
    "die meisten brauchen einen zweiten Job",
    "viel Warten, nur wenige Minuten vor der Kamera",
    "warum viele den Job trotzdem lieben",
    "vom Statisten zum Star: sehr selten",
    "Computerfiguren ersetzen Statisten in Massenszenen",
    "Anrede, Bezug auf Ethans Frage, Gruß am Ende",
    "in eigenen Worten statt Wort für Wort"
   ],
   "muster": "Hi Ethan,\n\nThanks for your email! I've found a German article about working as an extra in Hollywood, so here are the most important facts.\n\nAbout 50,000 people in LA are registered as extras, so there is a lot of competition. For a day of up to twelve hours, you usually get between $150 and $200. Members of the actors' union earn a bit more, for example extra money for overtime. Very few extras can make a living from it, so most of them have a second job, e.g. as waiters or drivers.\n\nBe prepared to wait a lot! Extras often sit in tents next to the set for hours before they are in front of the camera for just a few minutes. Still, many people love the job because they are part of film history.\n\nHowever, experts say that hardly any extras become stars, and in crowd scenes, extras are more and more often replaced by computer-generated characters.\n\nGood luck – and send me a photo from the set!\n\nBest wishes,\n[your name]"
  }
 ]
});
