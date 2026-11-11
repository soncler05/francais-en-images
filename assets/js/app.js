/* ==========================================================================
   Le français en images — lecteur
   Les 10 premières pages du livre, rendues en HTML.
   ========================================================================== */
(function () {
  "use strict";

  var B = window.BOOK;
  var C = window.IMAGE_CREDITS || {};
  var ART = window.ART;

  var stage = document.getElementById("stage");
  var bar = document.getElementById("progressBar");
  var where = document.getElementById("where");
  var btnPrev = document.getElementById("btnPrev");
  var btnNext = document.getElementById("btnNext");
  var btnGrid = document.getElementById("btnGrid");
  var btnCred = document.getElementById("btnCred");
  var btnDev = document.getElementById("btnDev");
  var btnFeedback = document.getElementById("btnFeedback");
  var devPanel = document.getElementById("devPanel");
  var devList = document.getElementById("devList");
  var btnExport = document.getElementById("btnExport");
  var btnCopyJson = document.getElementById("btnCopyJson");
  var btnClearFeedback = document.getElementById("btnClearFeedback");
  var thumbs = document.getElementById("thumbs");
  var creditsPanel = document.getElementById("creditsPanel");
  var lightbox = document.getElementById("lightbox");

  var index = 0;

  /* ---------------------------------------------------------------- utils */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ------------------------------------------------------------ prononciation */
  /* Web Speech API uniquement : aucune piste audio, aucun fichier à
     télécharger — ça marche depuis file:// comme depuis GitHub Pages. */
  var SPEECH_OK = ("speechSynthesis" in window);
  if (!SPEECH_OK) document.documentElement.classList.add("no-speech");

  var SAY_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">' +
    '<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';

  function sayBtn(label) {
    return '<button class="say" type="button" data-say="' + esc(label) +
      '" aria-label="Écouter la prononciation" title="Écouter">' + SAY_ICON + "</button>";
  }

  function speak(text) {
    if (!SPEECH_OK || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.85;
      var fr = window.speechSynthesis.getVoices().filter(function (v) {
        return v.lang && v.lang.toLowerCase().indexOf("fr") === 0;
      });
      if (fr.length) u.voice = fr[0];
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ------------------------------------------------- mode dev : retours */
  /* Le site est statique : le navigateur ne peut pas écrire de fichier.
     Les retours vivent dans le stockage local pendant la relecture, puis
     s'exportent en feedback.json, à commiter dans tools/feedback.json. */
  var FB_KEY = "fie-feedback-v1";
  var DEV_KEY = "fie-dev";
  var devMode = false;
  try {
    devMode = localStorage.getItem(DEV_KEY) === "1" ||
      /[?&]dev=1/.test(location.search);
    if (/[?&]dev=1/.test(location.search)) localStorage.setItem(DEV_KEY, "1");
    if (/[?&]dev=0/.test(location.search)) {
      devMode = false;
      localStorage.removeItem(DEV_KEY);
    }
  } catch (e) {}
  if (devMode) document.body.classList.add("dev");

  function loadFeedback() {
    try {
      var raw = localStorage.getItem(FB_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function saveFeedback(list) {
    try { localStorage.setItem(FB_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function feedbackFor(key) {
    var list = loadFeedback();
    for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i];
    return null;
  }
  function upsertFeedback(entry) {
    var list = loadFeedback();
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === entry.key) {
        entry.createdAt = list[i].createdAt; // on garde la date d'origine
        list[i] = entry; found = true; break;
      }
    }
    if (!found) list.push(entry);
    saveFeedback(list);
    refreshDevUI();
  }
  function removeFeedback(key) {
    saveFeedback(loadFeedback().filter(function (f) { return f.key !== key; }));
    refreshDevUI();
  }
  function feedbackExport() {
    return { version: 1, exportedAt: new Date().toISOString(), entries: loadFeedback() };
  }
  function refreshDevUI() {
    if (btnFeedback) btnFeedback.textContent = "Retours (" + loadFeedback().length + ")";
    refreshFlagBadges();
    if (devPanel && devPanel.classList.contains("open")) renderDevList();
  }
  function refreshFlagBadges() {
    Array.prototype.forEach.call(
      stage.querySelectorAll(".card[data-img], .vcard[data-img]"),
      function (c) { c.classList.toggle("flagged", !!feedbackFor(c.dataset.img)); }
    );
  }

  /** Bouton « Signaler » d'une fiche photo (visible en mode dev seulement). */
  function flagBtn(id) {
    return '<button class="flag-btn" type="button" data-flag="' + esc(id) +
      '" title="Signaler cette image">Signaler</button>';
  }
  function flagBadge() {
    return '<span class="flag-badge">Signalée</span>';
  }

  /* Chargement paresseux, sauf demande contraire.
     Edge en mode headless ne fait pas défiler la page : sans ce mécanisme, une
     capture ne montre que la première rangée d'images et donne l'impression
     que la moitié des fiches est vide. `?photos=toutes` force le chargement
     immédiat — pour la revue, jamais par défaut. */
  function loadAttr() {
    return /[?&]photos=toutes/.test(location.search)
      ? 'loading="eager" ' : 'loading="lazy" ';
  }

  /** Renvoie l'entrée d'image pour un identifiant du lexique. */
  function img(id) {
    var e = C[id];
    if (!e) return null;
    return e;
  }

  /** Photo d'une fiche si le mot en a une, sinon null.
      Les sections « dessin », « avatar », « sentiment », « santé »,
      « action-ecole », « personnel », « metier » et « lieu-ecole » sont
      mixtes : une photo quand Commons en fournit une, le dessin SVG sinon. */
  function photoFor(key) {
    var e = img(key);
    if (!e) return null;
    return {
      label: e.label,
      media: '<img src="' + esc(e.file) + '" alt="' + esc(e.label) +
        '" ' + loadAttr() + 'loading decoding="async">'
    };
  }

  /** <figure> image + crédit, pour la planche foods. */
  function photo(id, caption) {
    var e = img(id);
    if (!e) return "";
    return '<figure>' +
      '<img src="' + esc(e.file) + '" alt="' + esc(caption || e.label) +
      '" + loadAttr() + "loading decoding="async">' +
      '<figcaption><span class="lbl">' + esc(caption || e.label) + "</span>" +
      sayBtn(caption || e.label) + "</figcaption></figure>";
  }

  /* ------------------------------------------------------- page : couverture */
  function renderCover() {
    var m = B.meta;
    var strip = ["girafe", "tortue", "zebu", "wagon", "koala"].map(function (id) {
      var e = img(id);
      return e ? '<img src="' + esc(e.file) + '" alt="' + esc(e.label) +
        '" + loadAttr() + "loading decoding="async">' : "";
    }).join("");

    return '<div class="sheet cover">' +
      '<div class="brand"><span class="dot"></span>Les Éditions CEC</div>' +
      '<div>' +
        '<h2>Le <em>français</em><br>en images</h2>' +
        '<p class="sub">Un livre amusant qui accompagne l’apprentissage du français.</p>' +
        '<div class="subjects">' +
          m.subjects.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") +
        '</div>' +
      '</div>' +
      '<div class="strip">' + strip + '</div>' +
      '<div class="byline">' +
        '<strong>' + esc(m.author) + '</strong><br>' +
        esc(m.adaptation) + '<br>' +
        esc(m.publisher) + ' · ' + esc(m.year) +
      '</div>' +
      '</div>';
  }

  /* -------------------------------------------------------- page : intercalaire */
  function renderDivider() {
    return '<div class="sheet divider">' +
      ART.sunburst(24) +
      '<div class="msg">Bienvenue dans<br>Le français en images</div>' +
      '</div>';
  }

  /* ------------------------------------------------------- page : page de titre */
  function renderTitle() {
    var m = B.meta;
    return '<div class="sheet titlepage">' +
      '<div class="rule"></div>' +
      '<h2>Le <em>français</em><br>en images</h2>' +
      '<div class="rule"></div>' +
      '<p class="author">' + esc(m.author) + '</p>' +
      '<p class="adapt">' + esc(m.adaptation) + '</p>' +
      '<div class="pub">' + esc(m.publisher) + '</div>' +
      '<div class="cast">' +
        ART.turtle({ accent: "#8cc63f" }) +
        ART.turtle({ accent: "#7ab800", glasses: true }) +
      '</div>' +
      '</div>';
  }

  /* ----------------------------------------------------------- page : crédits */
  function renderCredits() {
    var m = B.meta;

    var col = B.credits.map(function (c) {
      return '<div class="cred">' +
        '<dt>' + esc(c.r) + '</dt>' +
        '<dd>' + c.n + '</dd>' +
        '</div>';
    }).join("");

    var rem = B.remerciements.map(function (r) {
      return "<li>" + esc(r) + "</li>";
    }).join("");

    return '<div class="sheet">' +
      '<h2 class="banner">Crédits</h2>' +
      '<div class="pad credits">' +
        '<div class="credits-grid">' +
          '<dl class="cred-list">' + col + '</dl>' +
          '<div class="cred-rem">' +
            '<h3>Remerciements de l’éditeur</h3>' +
            '<p>Les Éditions CEC remercient les personnes suivantes pour leur ' +
            'évaluation rigoureuse et leurs commentaires constructifs :</p>' +
            '<ul>' + rem + '</ul>' +
            '<h3>Publication</h3>' +
            '<p><em>' + esc(m.title) + '</em><br>' +
            '© ' + esc(m.year) + ', ' + esc(m.publisher) + '<br>' +
            esc(m.place) + '<br>' +
            'ISBN ' + esc(m.isbn) + '</p>' +
          '</div>' +
        '</div>' +
        '<p class="note">' +
          '<strong>À propos de cette version web.</strong> Cette page reprend les ' +
          'dix premières pages du livre. Le fac-similé est un balayage de 2015 sans ' +
          'couche de texte, à 1200 × 1500 px. Les photographies ont été remplacées ' +
          'par des images récentes et nettement plus définies issues de Wikimedia ' +
          'Commons, et les dessins (mascottes, pièces, billets) ont été refaits en ' +
          'SVG, donc nets à toute taille. Le texte, la structure et la pédagogie ' +
          'd’origine sont conservés.' +
        '</p>' +
      '</div></div>';
  }

  /* ------------------------------------------------------------- page : bonjour */
  function renderBonjour() {
    var d = B.dialogue;
    var items = [
      ["📘", "<b>Vocabulaire</b> — une centaine de mots imagés pour trouver facilement celui que tu cherches."],
      ["✏️", "<b>Grammaire</b> — les règles de base du français."],
      ["💬", "<b>Communication</b> — les expressions essentielles pour interagir avec les autres dans toutes sortes de situations du quotidien."],
      ["🧭", "<b>Stratégies</b> — des trucs pour améliorer ta façon de travailler et pour être efficace."]
    ];

    return '<div class="sheet">' +
      '<h2 class="banner">Bonjour !</h2>' +
      '<div class="pad bonjour">' +
        '<p>Nous sommes heureux de te présenter <em>Le français en images</em>. ' +
        'C’est un livre amusant qui t’accompagnera dans l’apprentissage du français. ' +
        'Tu y trouveras toutes sortes d’informations très utiles que tu pourras partager ' +
        'avec tes camarades.</p>' +
        '<h3>Qu’y a-t-il dans ton livre ?</h3>' +
        '<ul>' + items.map(function (it) {
          return '<li><span class="ic">' + it[0] + '</span><span>' + it[1] + '</span></li>';
        }).join("") + '</ul>' +
        '<div class="cast">' +
          ART.turtle({ accent: "#8cc63f" }) +
          ART.turtle({ accent: "#7ab800", glasses: true }) +
        '</div>' +
      '</div></div>';
  }

  /* ------------------------------------------------------------ page : fruits */
  function renderFruits() {
    var d = B.dialogue;
    return '<div class="sheet">' +
      '<h2 class="banner">Au déjeuner</h2>' +
      '<div class="pad fruits">' +
        '<div class="bubbles">' +
          '<div class="bubble q">' + esc(d.question) + '</div>' +
          '<div class="bubble a">' + esc(d.reponse) + '</div>' +
        '</div>' +
        '<div class="foodgrid">' +
          d.foods.map(function (f) {
            var e = img(f);
            return e ? photo(f, e.label) : "";
          }).join("") +
        '</div>' +
      '</div></div>';
  }

  /* -------------------------------------------------- page : index du vocabulaire */
  function renderVocab() {
    var flat = [];
    var cols = B.vocabulaire.map(function (col) {
      return col.map(function (e) {
        flat.push(e);
        // un thème dont la page existe devient cliquable
        var cible = B.pageMap[e.p];
        var attrs = cible
          ? ' data-goto="' + cible + '" tabindex="0" role="link"'
          : ' title="Pas encore repris dans cette version"';
        return '<div class="vocab-row' + (e.k ? " sub" : "") +
          (cible ? " linked" : " distant") +
          '" data-t="' + esc(e.t.toLowerCase()) + '"' + attrs + '>' +
          '<span class="t">' + esc(e.t) + '</span>' +
          '<span class="dots"></span>' +
          '<span class="p">' + e.p + '</span>' +
          '</div>';
      }).join("");
    }).join("");

    var linked = flat.filter(function (e) { return B.pageMap[e.p]; }).length;

    return '<div class="sheet">' +
      '<h2 class="banner">Le vocabulaire</h2>' +
      '<div class="pad">' +
        '<div class="vocab-toolbar">' +
          '<input id="vocabSearch" type="search" placeholder="Chercher un thème…" ' +
          'aria-label="Chercher un thème">' +
          '<span class="vocab-count" id="vocabCount">' + flat.length + ' thèmes</span>' +
        '</div>' +
        '<p class="vocab-hint">' + linked + " thèmes sur " + flat.length +
          " mènent à une page reprise ici.</p>" +
        '<div class="vocab-cols">' + cols + '</div>' +
      '</div></div>';
  }

  /* ------------------------------------------------------ pages : l'alphabet */
  // Quelques mots n'ont pas de photographie exploitable sur Commons ; on les
  // dessine en SVG plutôt que d'utiliser une image qui ne veut rien dire.
  var SVG_CARDS = {
    clou: function () { return ART.nail(); }
  };

  function alphabetCard(id) {
    var e = img(id);
    if (!e) return "";

    if (SVG_CARDS[id]) {
      return '<figure class="card is-svg">' +
        SVG_CARDS[id]() +
        '<figcaption class="cap"><span class="lbl">' + esc(e.label) + "</span>" +
        sayBtn(e.label) + "</figcaption>" +
        '</figure>';
    }

    return '<figure class="card" data-img="' + esc(id) + '" tabindex="0" role="button" ' +
      'aria-label="Agrandir ' + esc(e.label) + '">' +
      '<img src="' + esc(e.file) + '" alt="' + esc(e.label) +
      '" + loadAttr() + "loading decoding="async">' +
      '<figcaption class="cap"><span class="lbl">' + esc(e.label) + "</span>" +
      sayBtn(e.label) + flagBtn(id) + flagBadge() + "</figcaption>" +
      '</figure>';
  }

  function renderAlphabet(from, to, withSpelling) {
    var rows = [];
    for (var i = from; i < to; i++) {
      var g = B.alphabet[i];
      rows.push('<div class="arow">' +
        '<div class="big">' + g.letter + '</div>' +
        alphabetCard(g.items[0]) +
        alphabetCard(g.items[1]) +
        '</div>');
    }

    var spelling = withSpelling
      ? '<div class="spelling"><h4>Boîte de dialogue — Épelle le mot</h4>' +
        '<div class="inner">' +
        '<div class="word">tortue</div>' +
        '<div class="letters"><i>t</i><i>o</i><i>r</i><i>t</i><i>u</i><i>e</i></div>' +
        '<p>Regarde l’image, puis épelle le mot lettre par lettre.</p>' +
        '</div></div>'
      : "";

    return '<div class="sheet">' +
      '<h2 class="banner">L’alphabet ' + B.alphabet[from].letter + '–' + B.alphabet[to - 1].letter + '</h2>' +
      '<div class="pad alpha">' + rows.join("") + spelling + '</div>' +
      '</div>';
  }

  /* ---------------------------------------------------------- page : les nombres */
  function renderNumbers() {
    var n = B.nombres;

    var unites = n.unites.map(function (p) {
      return '<div class="numcell"><b>' + p[0] + '</b><span>' + esc(p[1]) + '</span></div>';
    }).join("");

    var dizaines = n.dizaines.map(function (p) {
      return '<div class="numcell"><b>' + p[0] + '</b><span>' + esc(p[1]) + '</span></div>';
    }).join("");

    var rang = n.rang.map(function (p, i) {
      return '<div class="cell">' +
        ART.turtle({ accent: i % 2 ? "#8cc63f" : "#7ab800", glasses: i === 4 }) +
        '<b>' + esc(p[1]) + '</b></div>';
    }).join("");

    var argent = B.argent.map(function (it) {
      var svg = it.kind === "coin" ? ART.coin(it) : ART.note(it);
      return '<div class="cell' + (it.kind === "note" ? " note-cell" : "") + '">' +
        svg + '<b>' + esc(it.label) + '</b></div>';
    }).join("");

    return '<div class="sheet">' +
      '<h2 class="banner">Vocabulaire <span class="badge">unit3&nbsp;F2</span></h2>' +
      '<div class="pad">' +
        '<div class="subhead">Les nombres</div>' +
        '<div class="numtable">' + unites + '</div>' +
        '<div class="subhead subhead-sm">De 10 à 100</div>' +
        '<div class="numtable">' + dizaines + '</div>' +

        '<div class="subhead">Le rang</div>' +
        '<div class="rang">' + rang + '</div>' +

        '<div class="subhead">L’argent</div>' +
        '<div class="money">' + argent + '</div>' +
      '</div></div>';
  }

  /** Le libellé d'une fiche, que l'image soit photo ou dessin. */
  function labelFor(kind, key) {
    if (kind === "photo" || kind === "phrase") {
      var e = img(key);
      return e ? e.label : key;
    }
    // Genres mixtes : la photo, quand elle existe, donne le libellé.
    if (kind === "dessin" || kind === "avatar" || kind === "sentiment" ||
        kind === "sante" || kind === "action-ecole" || kind === "personnel" ||
        kind === "metier" || kind === "lieu-ecole") {
      var pe = img(key);
      if (pe) return pe.label;
    }
    if (kind === "dessin") return ART5.nom(key);
    if (kind === "avatar") return ART4.FAMILLE[key].label;
    if (kind === "sentiment") return ART4.SENTIMENTS[key].label;
    if (kind === "forme") return ART3.FORMES[key].nom;
    if (kind === "motif") return ART3.MOTIF_NOM[key];
    if (kind === "position") return POSITION_NOM[key] || key;
    if (kind === "mouvement") return MOUVEMENT_NOM[key] || key;
    if (kind === "temps") return TEMPS_NOM[key] || key;
    if (kind === "jour-semaine") return ART8.jourNom(key);
    if (kind === "sante") return SANTE_NOM[key] || key;
    return key;
  }

  /* Les pages 36 et 39 : les mots de position, de mouvement et de temps
     sont des mots nus, sans article — c'est leur nature. */
  var POSITION_NOM = {
    "dans": "dans", "sur": "sur", "en-dessous": "en dessous",
    "au-dessus": "au-dessus", "devant": "devant", "derriere": "derrière",
    "a-cote": "à côté de", "entre": "entre", "dessus": "dessus",
    "milieu": "milieu", "dessous": "dessous",
    "gauche": "gauche", "centre": "centre", "droite": "droite"
  };
  var MOUVEMENT_NOM = {
    "en-haut": "en haut", "en-bas": "en bas", "sortir": "sortir de",
    "entrer": "entrer dans", "aller-vers": "aller vers",
    "s-eloigner": "s’éloigner de", "a-travers": "à travers", "autour": "autour"
  };
  var TEMPS_NOM = {
    "matin": "le matin", "apres-midi": "l’après-midi", "soir": "le soir",
    "nuit": "la nuit", "hier": "hier", "aujourdhui": "aujourd’hui",
    "demain": "demain"
  };

  /* ======================================================================
     Pages 11 à 25 — décor « orange texturé », fiches blanches à filet vert
     ====================================================================== */

  /** Une fiche : photo, ou dessin SVG selon le genre de la section. */
  function vocabCard(kind, key, opts) {
    opts = opts || {};
    var label = "", media = "", zoomable = false;

    // Certaines sections mêlent photos et dessins : une scène sans photo
    // exploitable sur Commons est dessinée même au milieu d'une série de photos.
    // Sept scènes ART6 ont désormais une photo (lave-linge, nettoie-plancher,
    // tond-gazon, balaie-plancher, plie-linge, reveille, habille) : le dessin
    // ne sert plus que pour les trois restantes.
    if (ART6.cles.indexOf(key) !== -1 && !img(key)) {
      return '<figure class="vcard is-svg">' + ART6.a(key) +
        '<figcaption class="vcap"><span class="lbl">' + esc(labelFor(kind, key)) +
        "</span>" + sayBtn(labelFor(kind, key)) + "</figcaption></figure>";
    }

    if (kind === "photo" || kind === "phrase") {
      var e = img(key);
      if (!e) {
        return '<figure class="vcard is-missing"><div class="missing">?</div>' +
          '<figcaption class="vcap"><span class="lbl">' + esc(key) + "</span>" +
          sayBtn(key) + "</figcaption></figure>";
      }
      label = e.label;
      media = '<img src="' + esc(e.file) + '" alt="' + esc(label) +
        '" + loadAttr() + "loading decoding="async">';
      zoomable = true;
    } else if (kind === "avatar") {
      var phAv = photoFor(key);
      if (phAv) { label = phAv.label; media = phAv.media; zoomable = true; }
      else { label = ART4.FAMILLE[key].label; media = ART4.avatar(key); }
    } else if (kind === "sentiment") {
      var phSe = photoFor(key);
      if (phSe) { label = phSe.label; media = phSe.media; zoomable = true; }
      else { label = ART4.SENTIMENTS[key].label; media = ART4.sentiment(key); }
    } else if (kind === "forme") {
      label = ART3.FORMES[key].nom;
      media = ART3.forme(key);
    } else if (kind === "couleur") {
      label = key;
      media = ART3.couleurSwatch(ART3.COULEUR_HEX[key], key);
    } else if (kind === "cheveux-couleur") {
      label = key;
      media = ART3.couleurCheveux(
        (ART3.cheveux.filter(function (c) { return c[0] === key; })[0] || [, "#ccc"])[1], key);
    } else if (kind === "coiffure") {
      var st = ART3.stylesCheveux.filter(function (c) { return c[0] === key; })[0] || [key, key];
      label = st[1];
      media = ART3.coiffure(key, st[1]);
    } else if (kind === "motif") {
      label = ART3.MOTIF_NOM[key];
      media = ART3.motif(key);
    } else if (kind === "dessin") {
      var phDe = photoFor(key);
      if (phDe) { label = phDe.label; media = phDe.media; zoomable = true; }
      else { label = ART5.nom(key); media = ART5.dessin(key); }
    } else if (kind === "action-ecole") {
      var phAc = photoFor(key);
      if (phAc) { label = phAc.label; media = phAc.media; zoomable = true; }
      else { label = ART7.actionNom(key); media = ART7.action(key); }
    } else if (kind === "personnel") {
      var phPe = photoFor(key);
      if (phPe) { label = phPe.label; media = phPe.media; zoomable = true; }
      else { label = ART7.personnelNom(key); media = ART7.personnel(key); }
    } else if (kind === "matiere") {
      label = ART7.matiereNom(key);
      media = ART7.matiere(key);
    } else if (kind === "lieu-ecole") {
      var phLi = photoFor(key);
      if (phLi) { label = phLi.label; media = phLi.media; zoomable = true; }
      else { label = ART7.lieuNom(key); media = ART7.lieu(key); }
    } else if (kind === "metier") {
      var phMe = photoFor(key);
      if (phMe) { label = phMe.label; media = phMe.media; zoomable = true; }
      else { label = ART8.metierNom(key); media = ART8.metier(key); }
    } else if (kind === "position" || kind === "mouvement") {
      label = labelFor(kind, key);
      media = kind === "position" ? ART8.position(key) : ART8.mouvement(key);
    } else if (kind === "temps") {
      label = TEMPS_NOM[key] || key;
      media = ART8.temps(key);
    } else if (kind === "jour-semaine") {
      label = ART8.jourNom(key);
      media = ART8.jour(key);
    } else if (kind === "sante") {
      var phSa = photoFor(key);
      if (phSa) { label = phSa.label; media = phSa.media; zoomable = true; }
      else { label = SANTE_NOM[key] || key; media = ART4.sante(key); }
    }

    return '<figure class="vcard' + (opts.cls ? " " + opts.cls : "") + '"' +
      (zoomable ? ' data-img="' + esc(key) + '" tabindex="0" role="button"' : "") +
      ' aria-label="' + esc(label) + '">' +
      '<div class="vmedia">' + media + '</div>' +
      '<figcaption class="vcap"><span class="lbl">' + esc(label) + "</span>" +
      sayBtn(label) + (zoomable ? flagBtn(key) + flagBadge() : "") + "</figcaption>" +
      '</figure>';
  }

  var SANTE_NOM = {
    "coupure": "une coupure", "fievre": "de la fièvre", "mal-dent": "un mal de dent",
    "mal-gorge": "un mal de gorge", "mal-tete": "un mal de tête",
    "mal-ventre": "un mal de ventre", "nez-bouche": "un nez bouché",
    "piqure": "une piqûre", "rhume": "un rhume", "rhume-foins": "un rhume des foins",
    "rougeur": "une rougeur", "toux": "une toux"
  };

  /** La « Boîte de dialogue » bordeaux du livre. */
  function dialogueBox(lines) {
    if (!lines) return "";
    // La plupart des pages ont deux répliques, mais le livre en compte
    // jusqu'à trois (page 29) : les bulles sont donc numérotées, pas figées.
    var bulles = lines.map(function (t, i) {
      var classe = i % 2 === 0 ? "bub bub-q" : "bub bub-a";
      return '<div class="' + classe + '">' + esc(t) + "</div>";
    }).join("");
    // Les tortues occupent la colonne du milieu, sur toute la hauteur :
    // avec deux répliques on retrouve la mise en page du livre, avec trois
    // (page 29) les réponses s'empilent à droite sans casser la grille.
    return '<div class="boite">' +
      '<h4>Boîte de dialogue</h4>' +
      '<div class="boite-inner">' +
        bulles +
        '<div class="cast">' +
          ART.turtle({ accent: "#8cc63f" }) +
          ART.turtle({ accent: "#7ab800", glasses: true }) +
        '</div>' +
      "</div>" +
    '</div>';
  }

  /** Pied de page : le numéro en toutes lettres, comme dans le livre. */
  function pageFoot(book) {
    var mot = B.pageMots[book];
    if (!mot) return "";
    return '<div class="foot"><span class="fnum">' + book + "</span>" +
      '<span class="fword">' + esc(mot) + "</span></div>";
  }

  function sheetVocab(page) {
    var body = page.sections.map(function (sec) {
      var cards = sec.items.map(function (k) {
        return vocabCard(sec.kind, k, { cls: sec.kind === "phrase" ? "is-sentence" : "" });
      }).join("");
      return '<section class="vsec">' +
        '<h3>' + esc(sec.title) + "</h3>" +
        '<div class="vgrid" style="--cols:' + (sec.cols || 5) + '">' + cards + "</div>" +
        "</section>";
    }).join("");

    return '<div class="sheet sheet-vocab">' +
      '<h2 class="banner">' + esc(page.label) + "</h2>" +
      '<div class="pad">' + body + dialogueBox(page.dialogue) + "</div>" +
      pageFoot(page.book) +
      "</div>";
  }

  /* --- page « Le corps » : schéma + légende cliquable -------------------- */
  function sheetCorps() {
    var legend = ART4.CORPS.map(function (c, i) {
      return '<li><button data-part="' + c[0] + '"><b>' + (i + 1) + "</b>" +
        "<span>" + esc(c[1]) + "</span></button></li>";
    }).join("");

    var doigts = ART4.DOIGTS.map(function (d, i) {
      return '<li><button data-part="doigt-' + d + '"><b>' + (i + 1) + "</b>" +
        "<span>le " + esc(d) + "</span></button></li>";
    }).join("");

    return '<div class="sheet sheet-vocab">' +
      '<h2 class="banner">Le corps</h2>' +
      '<div class="pad">' +
        '<div class="corps-wrap">' +
          '<div class="corps-fig">' + ART4.corps() +
            '<figcaption>Clique sur un mot pour le situer sur le schéma.</figcaption>' +
          "</div>" +
          '<div class="corps-side">' +
            "<h3>Le corps</h3>" +
            '<ul class="corps-list">' + legend + "</ul>" +
            '<h3>La main</h3>' +
            '<div class="corps-side-fig">' + ART4.main() + "</div>" +
            '<ul class="corps-list">' + doigts + "</ul>" +
          "</div>" +
        "</div>" +
      "</div>" + pageFoot(6) + "</div>";
  }

  /* --- page « Les contraires » : deux moitiés par paire ------------------ */
  function sheetContraires() {
    var paires = ART4.CONTRAIRES.map(function (p) {
      // la dernière entrée contient trois mots (gros / haut / bas)
      // chaque fiche montre les deux moitiés du contraste, comme le livre
      var a = p[0], b = p[p.length - 1];
      var milieu = null;
      var milieuHtml = '<div class="ct-half">' + ART4.contraireIcon(b) + "</div>";
      return '<figure class="ct">' +
        '<div class="ct-pair">' +
          '<div class="ct-half">' + ART4.contraireIcon(a) + "</div>" +
          (milieuHtml || '<div class="ct-half">' + ART4.contraireIcon(b) + "</div>") +
        "</div>" +
        '<div class="ct-lbls"><span>' + esc(ART4.CONTRAIRE_NOM[a]) + "</span>" +
        (milieu ? "" : "<span>" + esc(ART4.CONTRAIRE_NOM[b]) + "</span>") + "</div>" +
        "</figure>";
    }).join("");

    return '<div class="sheet sheet-vocab">' +
      '<h2 class="banner">Les contraires</h2>' +
      '<div class="pad">' +
        '<div class="ct-grid">' + paires + "</div>" +
      "</div>" + pageFoot(11) + "</div>";
  }

  /* --------------------------------------------------------------- routage */
  var RENDER = {
    cover: renderCover,
    divider: renderDivider,
    title: renderTitle,
    credits: renderCredits,
    bonjour: renderBonjour,
    fruits: renderFruits,
    vocab: renderVocab,
    alphabet: function () { return renderAlphabet(0, 14, false); },
    alphabet2: function () { return renderAlphabet(14, 26, true); },
    numbers: renderNumbers
  };

  function show(i, push) {
    index = Math.max(0, Math.min(B.pages.length - 1, i));
    var page = B.pages[index];

    // « vocab » sert à deux choses : l'index (page 7, pas de `sections`) et les
    // pages de vocabulaire (11-25, qui en ont). On tranche sur `sections`.
    if (page.sections) {
      stage.innerHTML = sheetVocab(page);
    } else if (page.render === "corps") {
      stage.innerHTML = sheetCorps();
    } else if (page.render === "contraires") {
      stage.innerHTML = sheetContraires();
    } else {
      stage.innerHTML = RENDER[page.render]();
    }
    stage.scrollTop = 0;

    bar.style.width = ((index + 1) / B.pages.length * 100) + "%";
    where.textContent = (index + 1) + " / " + B.pages.length + " — " + page.label;
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === B.pages.length - 1;

    Array.prototype.forEach.call(
      thumbs.querySelectorAll("button"),
      function (b) { b.classList.toggle("active", +b.dataset.i === index); }
    );

    if (page.render === "vocab" && !page.sections) wireVocabSearch();
    wireCards();
    wireCorps();
    refreshFlagBadges();

    if (push !== false) {
      try { history.replaceState(null, "", "#" + (index + 1)); } catch (e) {}
    }
  }

  function next() { if (index < B.pages.length - 1) show(index + 1); }
  function prev() { if (index > 0) show(index - 1); }

  /* ------------------------------------------------- recherche dans l'index */
  function wireVocabSearch() {
    var input = document.getElementById("vocabSearch");
    var count = document.getElementById("vocabCount");
    var rows = Array.prototype.slice.call(stage.querySelectorAll(".vocab-row"));
    if (!input) return;

    function run() {
      var q = input.value.trim().toLowerCase();
      var hits = 0;
      rows.forEach(function (r) {
        var t = r.dataset.t;
        var ok = !q || t.indexOf(q) !== -1;
        r.classList.toggle("hit", !!q && ok);
        r.classList.toggle("dim", !!q && !ok);
        if (ok) hits++;
      });
      count.textContent = hits + (hits > 1 ? " thèmes" : " thème");
    }

    input.addEventListener("input", run);
    run();

    Array.prototype.forEach.call(stage.querySelectorAll(".vocab-row.linked"), function (row) {
      function go() { show(+row.dataset.goto); }
      row.addEventListener("click", go);
      row.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); }
      });
    });
  }

  /* ------------------------------------------------------- cartes -> lightbox */
  function wireCards() {
    // Les deux générations de fiches : .card (alphabet) et .vcard (pages 11-25)
    Array.prototype.forEach.call(
      stage.querySelectorAll(".card[data-img], .vcard[data-img]"),
      function (c) {
        function open() { showImage(c.dataset.img); }
        c.addEventListener("click", function (ev) {
          // Un clic sur le haut-parleur ou sur « Signaler » n'ouvre pas la fiche.
          if (ev.target.closest && ev.target.closest(".say, .flag-btn")) return;
          open();
        });
        c.addEventListener("keydown", function (ev) {
          if (ev.target.closest && ev.target.closest(".say, .flag-btn")) return;
          if (ev.key === "Enter" || ev.key === " ") {
            ev.preventDefault(); ev.stopPropagation(); open();
          }
        });
      }
    );
  }

  /* Clics délégués sur la scène : écouter, signaler. Le clic remonte par la
     fiche avant d'arriver ici, mais wireCards ignore déjà les clics sur
     .say / .flag-btn, donc la fiche ne s'ouvre pas en même temps. */
  stage.addEventListener("click", function (ev) {
    if (!ev.target.closest) return;
    var say = ev.target.closest(".say");
    if (say) { ev.stopPropagation(); speak(say.dataset.say); return; }
    var flag = ev.target.closest(".flag-btn");
    if (flag) {
      ev.stopPropagation();
      showImage(flag.dataset.flag);
      var ta = lightbox.querySelector(".fb textarea");
      if (ta) ta.focus();
    }
  });

  /* ---------------------------------------- schéma du corps : légende active */
  function wireCorps() {
    var lists = stage.querySelectorAll(".corps-list");
    if (!lists.length) return;

    Array.prototype.forEach.call(lists, function (list) {
      list.addEventListener("click", function (ev) {
        var b = ev.target.closest("button[data-part]");
        if (!b) return;
        var part = b.dataset.part;
        Array.prototype.forEach.call(list.querySelectorAll("button"), function (x) {
          x.classList.toggle("on", x === b);
        });
        Array.prototype.forEach.call(stage.querySelectorAll(".point"), function (p) {
          p.classList.toggle("hot", p.dataset.part === part);
        });
      });
    });
  }

  /* ------------------------------------------------------------ visionneuse */
  /* Fiches zoomables de la page courante, dans l'ordre du document :
     les flèches naviguent entre elles, en boucle. */
  var lbIds = [];
  var lbIndex = -1;

  function lightboxList() {
    return Array.prototype.map.call(
      stage.querySelectorAll(".card[data-img], .vcard[data-img]"),
      function (c) { return c.dataset.img; }
    );
  }

  function showImage(id) {
    var e = img(id);
    if (!e) return;
    lbIds = lightboxList();
    lbIndex = lbIds.indexOf(id);
    if (lbIndex === -1) { lbIds = [id]; lbIndex = 0; }
    renderLightbox(id);
    lightbox.classList.add("open");
  }

  function lbGo(delta) {
    if (!lbIds.length) return;
    lbIndex = (lbIndex + delta + lbIds.length) % lbIds.length;
    renderLightbox(lbIds[lbIndex]);
  }
  function lbPrev() { lbGo(-1); }
  function lbNext() { lbGo(1); }

  /** Section « Signaler » du pied de visionneuse (mode dev seulement). */
  function feedbackSection(key, e) {
    var fb = feedbackFor(key);
    return '<div class="fb">' +
      '<h4>Signaler cette image</h4>' +
      '<p>Si cette photo ne montre pas clairement « ' + esc(e.label) +
      ' », expliquez ce qui ne va pas. Le retour est gardé dans ce navigateur ; ' +
      "exportez-le ensuite depuis le panneau « Retours » pour l'ajouter au dépôt.</p>" +
      '<label for="fbComment">Commentaire</label>' +
      '<textarea id="fbComment" rows="3" placeholder="Ex. : on voit un X au lieu d’un Y…">' +
      esc(fb ? fb.comment : "") + "</textarea>" +
      '<div class="fb-actions">' +
        '<button class="btn fb-save" type="button" data-fb-save="' + esc(key) + '">Enregistrer</button>' +
        (fb ? '<button class="btn fb-remove" type="button" data-fb-remove="' + esc(key) + '">Retirer</button>' : "") +
      "</div></div>";
  }

  function saveFeedbackFor(key) {
    var e = img(key);
    if (!e) return;
    var ta = lightbox.querySelector("#fbComment");
    var now = new Date().toISOString();
    upsertFeedback({
      key: key,
      label: e.label,
      page: index,
      pageLabel: B.pages[index] ? B.pages[index].label : "",
      file: e.file,
      comment: ta ? ta.value.trim() : "",
      createdAt: now,
      updatedAt: now
    });
    renderLightbox(key); // le bouton « Retirer » apparaît, le badge se met à jour
  }

  function renderLightbox(id) {
    var e = img(id);
    if (!e) return;
    var total = lbIds.length;
    var pos = total ? (lbIndex + 1) + " / " + total : "";
    lightbox.querySelector("figure").innerHTML =
      '<img src="' + esc(e.file) + '" alt="' + esc(e.label) + '">' +
      '<figcaption class="lb-foot">' +
        '<div class="lb-row">' +
          '<span class="cap">' + esc(e.label) + "</span>" +
          sayBtn(e.label) +
          '<span class="lb-pos">' + pos + "</span>" +
        "</div>" +
        '<div class="meta">' +
          (e.author ? esc(e.author) + ' — ' : "") +
          esc(e.license || "") +
          (e.page ? ' · <a href="' + esc(e.page) + '" target="_blank" rel="noopener">Wikimedia Commons</a>' : "") +
          (e.year ? ' · ' + e.year : "") +
        "</div>" +
        '<div class="meta">Fichier d’origine : ' + esc(e.originalWidth) + '×' +
        esc(e.originalHeight) + ' px · servi en ' + esc(e.width) + '×' + esc(e.height) + ' px</div>' +
        (devMode ? feedbackSection(id, e) : "") +
      "</figcaption>";
  }

  function closeLightbox() { lightbox.classList.remove("open"); }
  lightbox.addEventListener("click", function (ev) {
    if (!ev.target.closest) return;
    var say = ev.target.closest(".say");
    if (say) { ev.stopPropagation(); speak(say.dataset.say); return; }
    if (ev.target.closest(".lb-prev")) { lbPrev(); return; }
    if (ev.target.closest(".lb-next")) { lbNext(); return; }
    var save = ev.target.closest("[data-fb-save]");
    if (save) { saveFeedbackFor(save.dataset.fbSave); return; }
    var rem = ev.target.closest("[data-fb-remove]");
    if (rem) { removeFeedback(rem.dataset.fbRemove); renderLightbox(rem.dataset.fbRemove); return; }
    if (ev.target === lightbox || ev.target.closest(".lightbox-close")) closeLightbox();
  });

  /* --------------------------------------------------------------- vignettes */
  function buildThumbs() {
    var grid = thumbs.querySelector(".grid");
    grid.innerHTML = B.pages.map(function (p, i) {
      return '<button data-i="' + i + '">' + esc(p.label) +
        '<span class="n">page ' + (i + 1) + '</span></button>';
    }).join("");
    grid.addEventListener("click", function (ev) {
      var b = ev.target.closest("button[data-i]");
      if (!b) return;
      thumbs.classList.remove("open");
      btnGrid.setAttribute("aria-pressed", "false");
      show(+b.dataset.i);
    });
    thumbs.addEventListener("click", function (ev) {
      if (ev.target === thumbs || ev.target.classList.contains("close-panel")) {
        thumbs.classList.remove("open");
        btnGrid.setAttribute("aria-pressed", "false");
      }
    });
  }

  /* --------------------------------------------------- panneau crédits images */
  function buildCredits() {
    var ids = Object.keys(C).sort();
    var rows = ids.map(function (id) {
      var e = C[id];
      return '<tr><td>' + esc(e.label || id) + '</td>' +
        '<td>' + esc(e.source || "") + '</td>' +
        '<td>' + esc(e.author || "—") + '</td>' +
        '<td>' + (e.licenseUrl
            ? '<a href="' + esc(e.licenseUrl) + '" target="_blank" rel="noopener">' +
              esc(e.license || "licence") + '</a>'
            : esc(e.license || "—")) +
        '</td>' +
        '<td>' + esc(e.originalWidth) + '×' + esc(e.originalHeight) +
        (e.year ? '<br>' + e.year : "") + '</td></tr>';
    }).join("");

    creditsPanel.querySelector(".tablewrap").innerHTML =
      '<table><thead><tr><th>Mot</th><th>Fichier Commons</th><th>Auteur</th>' +
      '<th>Licence</th><th>Résolution</th></tr></thead><tbody>' + rows + '</tbody></table>';

    creditsPanel.addEventListener("click", function (ev) {
      if (ev.target === creditsPanel || ev.target.classList.contains("close-panel")) {
        creditsPanel.classList.remove("open");
        btnCred.setAttribute("aria-pressed", "false");
      }
    });
  }

  /* ------------------------------------------------------------- navigation */
  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);
  btnGrid.addEventListener("click", function () {
    var open = !thumbs.classList.contains("open");
    thumbs.classList.toggle("open", open);
    btnGrid.setAttribute("aria-pressed", String(open));
  });
  btnCred.addEventListener("click", function () {
    var open = !creditsPanel.classList.contains("open");
    creditsPanel.classList.toggle("open", open);
    btnCred.setAttribute("aria-pressed", String(open));
  });

  document.addEventListener("keydown", function (ev) {
    // ev.target n'est pas forcément un Element (événement synthétique sur document)
    if (ev.target && ev.target.matches && ev.target.matches("input, textarea")) return;
    if (ev.key === "Escape") {
      closeLightbox();
      thumbs.classList.remove("open");
      creditsPanel.classList.remove("open");
      btnGrid.setAttribute("aria-pressed", "false");
      btnCred.setAttribute("aria-pressed", "false");
      return;
    }
    if (lightbox.classList.contains("open")) {
      // Visionneuse ouverte : les flèches passent d'une fiche à l'autre
      // de la page courante, elles ne changent plus de page.
      if (ev.key === "ArrowRight") { ev.preventDefault(); lbNext(); return; }
      if (ev.key === "ArrowLeft") { ev.preventDefault(); lbPrev(); return; }
      return;
    }
    // Espace sur un bouton : il active le bouton, il ne change pas de page.
    if (ev.key === " " && ev.target && ev.target.closest && ev.target.closest("button")) return;
    switch (ev.key) {
      case "ArrowRight": case "PageDown": next(); break;
      case "ArrowLeft": case "PageUp": prev(); break;
      case " ": ev.preventDefault(); next(); break;
      case "Home": show(0); break;
      case "End": show(B.pages.length - 1); break;
      case "g": case "G": btnGrid.click(); break;
      case "c": case "C": btnCred.click(); break;
    }
  });

  // balayage tactile
  var tx = 0, ty = 0;
  stage.addEventListener("touchstart", function (e) {
    tx = e.changedTouches[0].clientX;
    ty = e.changedTouches[0].clientY;
  }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.6) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  window.addEventListener("hashchange", function () {
    var n = parseInt(location.hash.replace("#", ""), 10);
    if (n && n - 1 !== index) show(n - 1, false);
  });

  /* ------------------------------------------------------- mode dev : panneau */
  function renderDevList() {
    var list = loadFeedback();
    if (!list.length) {
      devList.innerHTML = '<p class="dev-empty">Aucun retour pour l’instant. En mode dev, ' +
        "ouvrez une image et signalez-la, ou utilisez le bouton « Signaler » d’une fiche.</p>";
      return;
    }
    devList.innerHTML = list.map(function (f) {
      return '<div class="dev-entry">' +
        '<div class="dev-entry-head"><b>' + esc(f.label) + '</b>' +
        '<span class="dev-key">' + esc(f.key) + '</span>' +
        '<span class="dev-page">' + esc(f.pageLabel || ("page " + (f.page + 1))) + '</span>' +
        '<span class="dev-date">' + esc((f.updatedAt || "").slice(0, 10)) + '</span>' +
        '<button class="btn dev-del" type="button" data-fb-del="' + esc(f.key) + '">Supprimer</button></div>' +
        '<p>' + esc(f.comment || "(sans commentaire)") + '</p>' +
        "</div>";
    }).join("");
  }

  function setDev(on) {
    devMode = !!on;
    try {
      if (devMode) localStorage.setItem(DEV_KEY, "1");
      else localStorage.removeItem(DEV_KEY);
    } catch (e) {}
    document.body.classList.toggle("dev", devMode);
    btnDev.setAttribute("aria-pressed", String(devMode));
    if (!devMode) {
      devPanel.classList.remove("open");
      btnFeedback.setAttribute("aria-pressed", "false");
    }
    if (lightbox.classList.contains("open") && lbIds.length && lbIndex >= 0) {
      renderLightbox(lbIds[lbIndex]); // la section « Signaler » apparaît / disparaît
    }
    refreshDevUI();
  }

  btnDev.addEventListener("click", function () { setDev(!devMode); });
  btnFeedback.addEventListener("click", function () {
    var open = !devPanel.classList.contains("open");
    if (open) renderDevList();
    devPanel.classList.toggle("open", open);
    btnFeedback.setAttribute("aria-pressed", String(open));
  });
  devPanel.addEventListener("click", function (ev) {
    if (ev.target === devPanel || ev.target.classList.contains("close-panel")) {
      devPanel.classList.remove("open");
      btnFeedback.setAttribute("aria-pressed", "false");
      return;
    }
    var del = ev.target.closest ? ev.target.closest("[data-fb-del]") : null;
    if (del) { removeFeedback(del.dataset.fbDel); renderDevList(); }
  });
  btnExport.addEventListener("click", function () {
    var blob = new Blob(
      [JSON.stringify(feedbackExport(), null, 2) + "\n"], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "feedback.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }
  btnCopyJson.addEventListener("click", function () {
    var text = JSON.stringify(feedbackExport(), null, 2);
    function done() {
      btnCopyJson.textContent = "Copié !";
      setTimeout(function () { btnCopyJson.textContent = "Copier le JSON"; }, 1500);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  });
  btnClearFeedback.addEventListener("click", function () {
    if (!loadFeedback().length) return;
    if (window.confirm("Tout effacer ? Tous les retours enregistrés dans ce navigateur seront supprimés.")) {
      saveFeedback([]);
      refreshDevUI();
      renderDevList();
    }
  });

  /* ------------------------------------------------------------------ init */
  buildThumbs();
  buildCredits();
  btnDev.setAttribute("aria-pressed", String(devMode));
  refreshDevUI();
  var start = parseInt(location.hash.replace("#", ""), 10);
  show(isNaN(start) ? 0 : start - 1, false);
})();
