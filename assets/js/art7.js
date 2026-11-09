/* ==========================================================================
   L'école — actions en classe, personnel, matières, lieux
   --------------------------------------------------------------------------
   Commons n'a pas de photo d'un élève « encerclant » un mot ou d'une école
   « auxdating» de son secrétariat : ce sont des gestes et des lieux, pas des
   objets. On dessine.
   ========================================================================== */
(function (global) {
  "use strict";

  function T(tag, o) {
    var s = "<" + tag;
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] != null) s += " " + k + '="' + o[k] + '"';
    }
    return s + "/>";
  }
  function G(o, inner) {
    var s = "<g";
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] != null) s += " " + k + '="' + o[k] + '"';
    }
    return s + ">" + inner + "</g>";
  }
  function P(d, o) { return T("path", Object.assign({ d: d }, o || {})); }
  function R(x, y, w, h, rx, o) { return T("rect", Object.assign({ x: x, y: y, width: w, height: h, rx: rx || 0 }, o || {})); }
  function CI(cx, cy, r, o) { return T("circle", Object.assign({ cx: cx, cy: cy, r: r }, o || {})); }
  function EL(cx, cy, rx, ry, o) { return T("ellipse", Object.assign({ cx: cx, cy: cy, rx: rx, ry: ry }, o || {})); }
  function ST(d, o) { return T("path", Object.assign({ d: d, fill: "none", "stroke-width": 3, "stroke-linecap": "round" }, o || {})); }

  var NOIR = "#2b2b2b", BLANC = "#ffffff";
  var C = {
    bois: "#a9673a", boisC: "#c98a4b", papier: "#fdf6e8", creme: "#fbf3e0",
    bleu: "#4a90d9", bleuC: "#2f6fb5", rouge: "#d63a2f", vert: "#3f8f14",
    jaune: "#f2c14e", orange: "#ef7c1c", violet: "#8e44ad", rose: "#f4a6b8",
    turquoise: "#2ec4b6", gris: "#9aa5b1", grisC: "#6b7280", peau: "#f6d3b4",
    peauC: "#e0b48c", clair: "#eef3f7", mur: "#dfe9f2", table: "#c9a227"
  };

  function fiche(inner, label) {
    return T("svg", { "class": "art art-vet", viewBox: "0 0 120 120", role: "img", "aria-label": label })
      .replace("/>", ">") + inner + "</svg>";
  }

  /* --- le décor commun : un mur, un bureau --------------------------------- */
  function salle(h) {
    return R(0, 0, 120, 120, 0, { fill: C.clair }) +
      R(0, h || 92, 120, 120 - (h || 92), 0, { fill: C.mur });
  }

  /* un élève vu de face, assis ou debout */
  function eleve(y, assis) {
    var tete = y;
    var s = "";
    // corps
    s += P("M48 " + (tete + 22) + " q12 -6 24 0 l4 34 h-32 z", { fill: C.orange });
    if (assis) {
      s += R(38, tete + 54, 44, 12, 3, { fill: C.bleuC });
      s += R(44, tete + 64, 10, 20, 2, { fill: C.bleuC });
      s += R(66, tete + 64, 10, 20, 2, { fill: C.bleuC });
    } else {
      s += R(46, tete + 52, 12, 30, 3, { fill: C.bleuC });
      s += R(62, tete + 52, 12, 30, 3, { fill: C.bleuC });
      s += R(44, tete + 80, 15, 8, 3, { fill: NOIR });
      s += R(61, tete + 80, 15, 8, 3, { fill: NOIR });
    }
    // bras
    s += P("M48 " + (tete + 24) + " l-10 20 M72 " + (tete + 24) + " l10 20",
      { stroke: C.peau, "stroke-width": 7, fill: "none", "stroke-linecap": "round" });
    // tête
    s += CI(60, tete + 8, 16, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 });
    s += P("M44 " + (tete + 4) + " q16 -12 32 0 q-4 -14 -16 -14 t-16 14 z", { fill: C.brun2 || "#4a3322" });
    s += CI(54, tete + 8, 2.2, { fill: NOIR, stroke: "none" });
    s += CI(66, tete + 8, 2.2, { fill: NOIR, stroke: "none" });
    s += P("M55 " + tete + 15 + " q5 4 10 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" });
    return s;
  }

  /* une feuille de papier */
  function feuille(x, y, w, h) {
    return R(x, y, w, h, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 });
  }
  function lignes(x, y, w, n, pas) {
    var s = "";
    for (var i = 0; i < n; i++) s += ST("M" + x + " " + (y + i * pas) + " h" + w, { stroke: C.gris, "stroke-width": 2 });
    return s;
  }

  /* ======================================================================
     1. Les actions à l'école (25)
     ====================================================================== */
  var ACTIONS = {};
  var ACT_NOM = {};

  function act(nom, dessin) {
    ACT_NOM[nom] = dessin.nom;
    ACTIONS[nom] = dessin.dessin;
  }

  act("s-asseoir", { nom: "s’asseoir", dessin: function () {
    // L'élève est assis *sur* la chaise : le dossier passe derrière son dos,
    // l'assise disparaît sous les cuisses et les jambes descendent devant.
    return fiche(
      R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 96, 120, 24, 0, { fill: C.mur }) +
      R(32, 34, 56, 42, 6, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(28, 66, 64, 12, 4, { fill: C.boisC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(32, 78, 10, 26, 3, { fill: C.bois }) + R(78, 78, 10, 26, 3, { fill: C.bois }) +
      P("M44 44 q16 -6 32 0 l2 26 h-36 z", { fill: C.orange, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(60, 30, 16, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M45 26 q15 -11 30 0 q-3 -13 -15 -13 t-15 13 z", { fill: C.brun || "#4a3322" }) +
      CI(54, 30, 2.2, { fill: NOIR, stroke: "none" }) + CI(66, 30, 2.2, { fill: NOIR, stroke: "none" }) +
      P("M55 36 q5 4 10 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }) +
      P("M50 70 l-2 16 M70 70 l2 16", { stroke: C.bleuC, "stroke-width": 13, "stroke-linecap": "round" }) +
      R(44, 84, 16, 12, 3, { fill: NOIR }) + R(60, 84, 16, 12, 3, { fill: NOIR }) +
      P("M44 50 l-10 12 M76 50 l10 12", { stroke: C.peau, "stroke-width": 7, fill: "none", "stroke-linecap": "round" }) +
      ST("M100 40 v20 M94 48 l6 -8 l6 8", { stroke: C.vert, "stroke-width": 4 }),
      "s’asseoir");
  } });

  act("associer", { nom: "associer", dessin: function () {
    return fiche(salle(0) +
      feuille(14, 26, 34, 42) + R(24, 38, 14, 10, 2, { fill: C.jaune }) +
      feuille(72, 26, 34, 42) + R(84, 38, 12, 10, 2, { fill: C.rouge }) +
      ST("M50 60 q12 -10 20 0", { stroke: C.bleu, "stroke-width": 4 }) +
      ST("M70 60 l8 0 l-4 6 z", { fill: C.bleu, stroke: "none" }) +
      P("M40 74 q-8 8 -4 16 M80 74 q8 8 4 16", { stroke: C.peau, "stroke-width": 7, fill: "none", "stroke-linecap": "round" }),
      "associer");
  } });

  act("se-calmer", { nom: "se calmer", dessin: function () {
    return fiche(salle(0) + CI(60, 62, 30, { fill: C.turquoise, opacity: ".18" }) +
      CI(60, 62, 20, { fill: C.turquoise, opacity: ".25" }) +
      CI(60, 62, 10, { fill: C.turquoise }) +
      ST("M60 26 q6 8 0 12", { stroke: C.turquoise, "stroke-width": 3 }) +
      ST("M38 46 q-6 6 -4 12 M82 46 q6 6 4 12", { stroke: C.turquoise, "stroke-width": 3 }),
      "se calmer");
  } });

  act("choisir", { nom: "choisir", dessin: function () {
    return fiche(salle(0) +
      R(18, 44, 38, 30, 3, { fill: C.clair, stroke: NOIR, "stroke-width": 3 }) +
      R(64, 44, 38, 30, 3, { fill: C.clair, stroke: NOIR, "stroke-width": 3 }) +
      CI(37, 59, 8, { fill: C.bleu }) + CI(83, 59, 8, { fill: C.rouge }) +
      ST("M60 26 v22", { stroke: C.peau, "stroke-width": 8, "stroke-linecap": "round" }) +
      ST("M50 38 l10 -10 l10 10", { stroke: C.bleu, "stroke-width": 4 }) +
      ST("M92 92 q10 6 16 -2", { stroke: C.gris, "stroke-width": 3 }), "choisir");
  } });

  act("colorier", { nom: "colorier", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 30, 54, 62) +
      P("M34 52 h30 v26 h-30 z", { fill: C.rouge }) +
      CI(60, 40, 7, { fill: C.jaune }) +
      P("M74 84 l22 -30 l8 6 l-22 30 l-9 2 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      "colorier");
  } });

  act("corriger", { nom: "corriger", dessin: function () {
    return fiche(salle(0) +
      feuille(20, 26, 58, 68) + lignes(30, 42, 38, 5, 11) +
      ST("M30 64 l6 6 l12 -14", { stroke: C.rouge, "stroke-width": 4 }) +
      P("M72 88 l24 -34 l8 6 l-24 34 l-9 2 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }),
      "corriger");
  } });

  act("decrire", { nom: "décrire", dessin: function () {
    return fiche(salle(0) +
      R(16, 26, 56, 40, 8, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M30 70 l0 10 l12 -10 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(26, 38, 18, 5, 2, { fill: C.gris, stroke: "none" }) +
      R(26, 48, 30, 5, 2, { fill: C.gris, stroke: "none" }) +
      P("M60 76 q14 12 24 4", { stroke: C.peau, "stroke-width": 8, fill: "none", "stroke-linecap": "round" }),
      "décrire");
  } });

  act("demander", { nom: "demander", dessin: function () {
    return fiche(salle(0) +
      R(30, 40, 60, 58, 4, { fill: C.bois }) +
      R(38, 60, 44, 34, 3, { fill: C.papier }) +
      P("M78 46 v-16", { stroke: C.peau, "stroke-width": 8, "stroke-linecap": "round" }) +
      R(70, 16, 18, 18, 6, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }),
      "demander");
  } });

  act("dessiner", { nom: "dessiner", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 28, 56, 64) +
      P("M34 76 l10 -18 l10 12 l8 -16 l8 22 z", { fill: C.vert, stroke: NOIR, "stroke-width": 2 }) +
      CI(40, 44, 5, { fill: C.jaune }) +
      P("M76 86 l22 -32 l8 6 l-22 32 l-9 2 z", { fill: C.bleu, stroke: NOIR, "stroke-width": 2.5 }),
      "dessiner");
  } });

  act("ecouter", { nom: "écouter", dessin: function () {
    return fiche(salle(0) +
      P("M50 60 q-10 -14 4 -22 q12 -6 14 8", { fill: "none", stroke: C.peau, "stroke-width": 10, "stroke-linecap": "round" }) +
      CI(60, 56, 12, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M78 46 q10 4 8 14", { stroke: C.bleu, "stroke-width": 3 }) +
      ST("M86 38 q16 8 12 26", { stroke: C.bleu, "stroke-width": 3 }) +
      ST("M94 30 q22 14 16 38", { stroke: C.bleu, "stroke-width": 3 }), "écouter");
  } });

  act("ecrire", { nom: "écrire", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 32, 56, 58) + lignes(32, 46, 36, 4, 11) +
      P("M78 74 l20 -30 l8 6 l-20 30 l-9 2 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M58 46 h14", { stroke: C.bleu, "stroke-width": 3, "stroke-linecap": "round" }), "écrire");
  } });

  act("encercler", { nom: "encercler", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 30, 56, 62) + lignes(32, 48, 36, 4, 12) +
      EL(60, 78, 22, 8, { fill: "none", stroke: C.rouge, "stroke-width": 3.5 }) +
      P("M86 74 l16 -24 l7 5 l-16 24 l-8 1 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }),
      "encercler");
  } });

  act("fermer", { nom: "fermer", dessin: function () {
    return fiche(salle(0) +
      P("M20 50 q40 -26 80 0 q-40 10 -80 0 z", { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 50, 80, 12, 3, { fill: C.bleu, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M34 40 l10 -10 M86 40 l-10 -10", { stroke: C.orange, "stroke-width": 4 }) +
      P("M60 78 l-8 12 M60 78 l8 12", { stroke: C.orange, "stroke-width": 4, "stroke-linecap": "round" }),
      "fermer");
  } });

  act("se-lever", { nom: "se lever", dessin: function () {
    return fiche(salle(92) + R(76, 46, 12, 46, 3, { fill: C.bois }) +
      R(74, 40, 16, 10, 3, { fill: C.bois }) + eleve(16, false) +
      ST("M22 34 v22 M14 34 l8 -8 l8 8", { stroke: C.vert, "stroke-width": 4 }), "se lever");
  } });

  act("lever-main", { nom: "lever la main", dessin: function () {
    return fiche(salle(0) +
      P("M56 108 v-34 q-6 -4 -4 -12 l4 -30 a6 6 0 0 1 12 0 v26 h6 v-8 a5 5 0 0 1 10 0 v10 h6 v-6 a5 5 0 0 1 10 0 v14 q0 12 -10 12 z",
        { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M96 44 q8 4 10 12", { stroke: C.orange, "stroke-width": 3 }), "lever la main");
  } });

  act("lire", { nom: "lire", dessin: function () {
    return fiche(salle(0) +
      P("M60 46 q-18 -12 -36 -6 v46 q18 -6 36 6 q18 -12 36 -6 v-46 q-18 -6 -36 6 z",
        { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 46 v46", { stroke: NOIR, "stroke-width": 2.5 }) +
      lignes(32, 52, 20, 4, 10) + lignes(68, 52, 20, 4, 10), "lire");
  } });

  act("observer", { nom: "observer", dessin: function () {
    return fiche(salle(0) +
      CI(48, 62, 22, { fill: BLANC, "fill-opacity": ".85", stroke: C.bleuC, "stroke-width": 5 }) +
      ST("M64 78 l16 16", { stroke: C.bleuC, "stroke-width": 7, "stroke-linecap": "round" }) +
      ST("M40 62 h16 M48 54 v16", { stroke: C.bleuC, "stroke-width": 3 }), "observer");
  } });

  act("ouvrir", { nom: "ouvrir", dessin: function () {
    return fiche(salle(0) +
      P("M60 56 q-20 -16 -42 -10 v40 q22 -6 42 8 q20 -14 42 -8 v-40 q-22 -6 -42 10 z",
        { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 56 v38", { stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M92 22 q10 6 6 16", { stroke: C.orange, "stroke-width": 4 }) +
      ST("M100 12 q18 12 10 32", { stroke: C.orange, "stroke-width": 4 }), "ouvrir");
  } });

  act("parler", { nom: "parler", dessin: function () {
    return fiche(salle(0) +
      R(18, 30, 52, 38, 8, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M32 68 l0 12 l14 -12 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(28, 42, 12, 5, 2, { fill: C.gris, stroke: "none" }) +
      R(28, 52, 26, 5, 2, { fill: C.gris, stroke: "none" }) +
      CI(88, 58, 14, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      EL(88, 68, 6, 5, { fill: NOIR }), "parler");
  } });

  act("partager", { nom: "partager", dessin: function () {
    return fiche(salle(0) +
      P("M18 74 q20 -18 40 0", { stroke: C.peau, "stroke-width": 10, fill: "none", "stroke-linecap": "round" }) +
      P("M102 74 q-20 -18 -40 0", { stroke: C.peau, "stroke-width": 10, fill: "none", "stroke-linecap": "round" }) +
      R(48, 46, 24, 30, 3, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M60 46 v30", { stroke: C.jaune, "stroke-width": 3 }) +
      CI(52, 56, 3, { fill: C.jaune, stroke: "none" }), "partager");
  } });

  act("ranger", { nom: "ranger", dessin: function () {
    return fiche(salle(0) +
      R(24, 56, 72, 40, 4, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 48, 72, 12, 3, { fill: C.boisC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(50, 66, 20, 6, 2, { fill: C.creme }) +
      R(38, 26, 16, 22, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 44 v-8 M52 36 h16", { stroke: C.vert, "stroke-width": 4 }), "ranger");
  } });

  act("sortir", { nom: "sortir", dessin: function () {
    return fiche(salle(0) +
      P("M28 46 h64 l-6 52 h-52 z", { fill: C.bleu, stroke: NOIR, "stroke-width": 2.5 }) +
      R(28, 40, 64, 12, 3, { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(46, 62, 14, 12, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 34 v-14 M52 26 l8 -8 l8 8", { stroke: C.orange, "stroke-width": 4 }), "sortir");
  } });

  act("souligner", { nom: "souligner", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 30, 56, 62) + lignes(32, 46, 36, 4, 12) +
      R(30, 76, 40, 5, 2, { fill: C.bleu }) +
      P("M78 80 l20 -26 l7 5 l-20 26 l-8 1 z", { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }),
      "souligner");
  } });

  act("surligner", { nom: "surligner", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 30, 56, 62) + lignes(32, 46, 36, 4, 12) +
      R(30, 60, 40, 8, 1, { fill: "#f7ff5c" }) +
      R(30, 84, 40, 8, 1, { fill: "#f7ff5c" }) +
      P("M76 64 l22 -22 l10 10 l-22 22 l-12 2 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      "surligner");
  } });

  act("trouver", { nom: "trouver", dessin: function () {
    return fiche(salle(0) +
      feuille(22, 30, 56, 62) + lignes(32, 46, 36, 4, 12) +
      CI(52, 78, 14, { fill: "none", stroke: C.vert, "stroke-width": 4 }) +
      ST("M44 78 l7 7 l14 -16", { stroke: C.vert, "stroke-width": 4 }), "trouver");
  } });

  /* ======================================================================
     2. Le personnel de l'école — une personne + son outil
     ====================================================================== */
  var PERSONNEL = {};
  var PERS_NOM = {};

  function pers(cle, nom, outil) {
    PERS_NOM[cle] = nom;
    PERSONNEL[cle] = function () {
      return fiche(
        R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 96, 120, 24, 0, { fill: C.mur }) +
        // buste
        P("M40 112 q4 -34 20 -40 q16 6 20 40 z", { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }) +
        CI(60, 40, 18, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
        CI(54, 38, 2.4, { fill: NOIR, stroke: "none" }) +
        CI(66, 38, 2.4, { fill: NOIR, stroke: "none" }) +
        P("M54 46 q6 5 12 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }) +
        outil(), nom);
    };
  }

  pers("bibliothecaire", "un ou une bibliothécaire", function () {
    return R(20, 78, 30, 24, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 64, 7, 16, 1, { fill: C.vert, stroke: NOIR, "stroke-width": 2 }) +
      R(33, 68, 7, 12, 1, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }) +
      R(42, 66, 7, 14, 1, { fill: C.bleu, stroke: NOIR, "stroke-width": 2 });
  });
  pers("concierge", "un ou une concierge", function () {
    return ST("M74 104 l0 -40", { stroke: C.bois, "stroke-width": 5 }) +
      P("M60 66 h30 l-6 14 h-18 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      lignes(64, 72, 18, 3, 5);
  });
  pers("orthophoniste", "un ou une orthophoniste", function () {
    return R(30, 78, 26, 22, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M36 84 h14 M36 90 h14", { stroke: C.rouge, "stroke-width": 3 }) +
      CI(86, 74, 12, { fill: C.turquoise, opacity: ".4" }) +
      ST("M86 66 v-6 M86 88 v-6 M78 74 h-6 M100 74 h-6", { stroke: C.turquoise, "stroke-width": 3 });
  });
  pers("secretaire", "un ou une secrétaire", function () {
    return R(24, 80, 46, 24, 2, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      R(30, 62, 34, 20, 2, { fill: C.bleu, stroke: NOIR, "stroke-width": 2.5 }) +
      R(84, 66, 16, 26, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M88 76 h8 M88 84 h8", { stroke: C.gris, "stroke-width": 2 });
  });
  pers("brigadier", "un brigadier ou une brigadière", function () {
    return R(18, 92, 84, 8, 3, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      R(22, 96, 76, 5, 2, { fill: C.blanc || BLANC }) +
      P("M60 92 l-10 -6 M60 92 l10 -6", { stroke: C.orange, "stroke-width": 4 }) +
      CI(60, 82, 8, { fill: C.orange, stroke: NOIR, "stroke-width": 2.5 });
  });
  pers("directeur", "un directeur ou une directrice", function () {
    return R(26, 84, 68, 18, 2, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(34, 66, 52, 18, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      R(88, 60, 20, 24, 2, { fill: C.vert, stroke: NOIR, "stroke-width": 2.5 });
  });
  pers("enseignant", "un enseignant ou une enseignante", function () {
    return R(20, 52, 54, 42, 3, { fill: "#2f4a3a", stroke: NOIR, "stroke-width": 2.5 }) +
      lignes(28, 62, 38, 4, 9) +
      R(84, 62, 14, 30, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 });
  });
  pers("infirmiere", "un infirmier ou une infirmière", function () {
    return CI(94, 60, 14, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(92, 52, 4, 16, 1, { fill: C.rouge, stroke: "none" }) +
      R(86, 58, 16, 4, 1, { fill: C.rouge, stroke: "none" }) +
      ST("M60 78 v-8", { stroke: C.peau, "stroke-width": 7, "stroke-linecap": "round" });
  });

  /* ======================================================================
     3. Les matières — pictogrammes
     ====================================================================== */
  var MATIERE = {};
  var MAT_NOM = {};

  function mat(cle, nom, dessin) { MAT_NOM[cle] = nom; MATIERE[cle] = dessin; }

  mat("anglais", "l’anglais", function () {
    return fiche(R(16, 28, 88, 62, 4, { fill: "#1e3a8a", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M60 40 q-16 -10 -34 -5 v40 q18 -5 34 5 q16 -10 34 -5 v-40 q-18 -5 -34 5 z",
        { fill: C.papier, stroke: NOIR, "stroke-width": 2 }) +
      ST("M60 40 v35", { stroke: NOIR, "stroke-width": 2 }) +
      R(74, 70, 14, 14, 2, { fill: C.rouge }) + CI(78, 77, 1.6, { fill: BLANC, stroke: "none" }) +
      CI(84, 77, 1.6, { fill: BLANC, stroke: "none" }), "l’anglais");
  });
  mat("arts-plastiques", "les arts plastiques", function () {
    return fiche(R(20, 34, 80, 58, 3, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(38, 50, 6, { fill: C.rouge }) + CI(50, 50, 6, { fill: C.jaune }) + CI(62, 50, 6, { fill: C.vert }) +
      P("M32 82 l6 -24 l8 12 l8 -16 l8 28 z", { fill: C.bleu }) +
      P("M86 30 l-4 22 l6 0 l-4 -22 z", { fill: C.violet, stroke: NOIR, "stroke-width": 1.5 }) +
      P("M92 84 l4 8 l-4 8 l-4 -8 z", { fill: C.jaune }), "les arts plastiques");
  });
  mat("education-physique", "l’éducation physique", function () {
    // Un enfant qui court : deux ballons ne disaient rien du sport.
    return fiche(
      R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 92, 120, 28, 0, { fill: "#8fc86a" }) +
      ST("M10 92 h100", { stroke: C.creme, "stroke-width": 3 }) +
      // jambes
      P("M58 66 l-12 16 l-10 -6 M62 66 l14 12 l12 -4",
        { stroke: C.bleuC, "stroke-width": 9, fill: "none", "stroke-linecap": "round",
          "stroke-linejoin": "round" }) +
      R(30, 74, 16, 9, 3, { fill: C.rouge }) + R(80, 70, 16, 9, 3, { fill: C.rouge }) +
      // buste
      P("M54 42 q10 -4 20 0 l6 26 h-32 z", { fill: C.orange, stroke: NOIR, "stroke-width": 2.5 }) +
      // bras
      P("M56 48 l-16 -6 M70 50 l16 -12",
        { stroke: C.peau, "stroke-width": 7, fill: "none", "stroke-linecap": "round" }) +
      CI(64, 30, 14, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M51 26 q13 -10 26 0 q-3 -12 -13 -12 t-13 12 z", { fill: "#4a3322" }) +
      CI(59, 30, 2.1, { fill: NOIR, stroke: "none" }) + CI(69, 30, 2.1, { fill: NOIR, stroke: "none" }) +
      P("M59 36 q5 4 10 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }) +
      // vitesse
      ST("M14 44 h16 M10 58 h12 M18 72 h14", { stroke: C.gris, "stroke-width": 3 }) +
      CI(102, 84, 10, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      "l’éducation physique");
  });
  mat("francais", "le français", function () {
    return fiche(R(18, 26, 84, 66, 4, { fill: "#2f4a3a", stroke: NOIR, "stroke-width": 2.5 }) +
      T("text", { x: 60, y: 78, "text-anchor": "middle", "font-family": "Georgia,serif", "font-size": 40, fill: C.papier }).replace("/>", ">") +
      "ab" + "</text>", "le français");
  });
  mat("mathematiques", "les mathématiques", function () {
    return fiche(R(20, 26, 80, 68, 4, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      T("text", { x: 60, y: 76, "text-anchor": "middle", "font-family": "Georgia,serif", "font-size": 34, fill: NOIR }).replace("/>", ">") +
      "2+3" + "</text>" +
      CI(84, 34, 6, { fill: C.rouge }) + CI(36, 34, 6, { fill: C.bleu }) +
      R(34, 84, 52, 5, 2, { fill: C.vert }), "les mathématiques");
  });
  mat("musique", "la musique", function () {
    return fiche(EL(46, 78, 20, 16, { fill: C.brun || C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(64, 48, 10, 34, 2, { fill: C.brun || C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(60, 46, 22, 8, 3, { fill: C.brunC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M80 50 q14 4 10 16", { fill: "none", stroke: C.bleu, "stroke-width": 3 }) +
      ST("M26 36 q8 8 4 20", { stroke: C.bleu, "stroke-width": 3 }) +
      ST("M14 28 q12 14 6 32", { stroke: C.bleu, "stroke-width": 3 }), "la musique");
  });
  mat("sciences", "les sciences", function () {
    return fiche(P("M52 26 h16 v26 l16 40 a6 6 0 0 1 -6 8 h-36 a6 6 0 0 1 -6 -8 l16 -40 z",
      { fill: BLANC, "fill-opacity": ".9", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M36 78 h48 l-6 14 h-36 z", { fill: C.turquoise, stroke: "none" }) +
      CI(52, 20, 6, { fill: C.orange, stroke: NOIR, "stroke-width": 2 }) +
      CI(60, 22, 4, { fill: C.rouge, stroke: "none" }) +
      CI(86, 40, 3, { fill: C.vert, stroke: "none" }) +
      CI(90, 54, 3, { fill: C.rouge, stroke: "none" }), "les sciences");
  });
  mat("univers-social", "l’univers social", function () {
    return fiche(CI(60, 58, 34, { fill: C.bleu, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M60 24 q-16 8 -16 22 q0 18 16 30 q16 -12 16 -30 q0 -14 -16 -22 z",
        { fill: C.vert, stroke: NOIR, "stroke-width": 2 }) +
      P("M96 46 q10 10 0 20 M104 38 q18 18 0 36", { stroke: C.bleuC, "stroke-width": 3, fill: "none" }),
      "l’univers social");
  });

  /* ======================================================================
     4. L'école et ses environs
     ====================================================================== */
  var LIEU = {};
  var LIEU_NOM = {};

  function lieu(cle, nom, dessin) { LIEU_NOM[cle] = nom; LIEU[cle] = dessin; }

  function batiment(couleur, detail) {
    return R(0, 0, 120, 120, 0, { fill: C.clair }) +
      P("M18 46 h84 v58 h-84 z", { fill: couleur, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M12 46 l48 -26 l48 26 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(52, 74, 18, 30, 1, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      detail;
  }
  function fenetre(x, y) {
    return R(x, y, 16, 16, 1, { fill: "#bfe3f5", stroke: NOIR, "stroke-width": 2 });
  }

  lieu("arret-autobus-ecole", "l’arrêt d’autobus", function () {
    return fiche(R(0, 78, 120, 42, 0, { fill: C.mur }) +
      R(24, 26, 10, 78, 2, { fill: C.grisC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 26, 54, 26, 2, { fill: "#bfe3f5", stroke: NOIR, "stroke-width": 2.5 }) +
      R(60, 44, 8, 34, 2, { fill: C.grisC }) +
      R(16, 96, 88, 8, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }), "l’arrêt d’autobus");
  });
  lieu("auditorium", "l’auditorium", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: "#3a2a2a" }) +
      R(14, 22, 92, 40, 3, { fill: "#f5e6c8", stroke: NOIR, "stroke-width": 2.5 }) +
      R(10, 70, 100, 10, 3, { fill: C.rouge }) +
      CI(28, 94, 8, { fill: C.bleu }) + CI(60, 96, 8, { fill: C.vert }) + CI(92, 94, 8, { fill: C.jaune }) +
      R(20, 86, 80, 4, 2, { fill: C.grisC }), "l’auditorium");
  });
  lieu("bibliotheque", "la bibliothèque", function () {
    return fiche(R(20, 26, 80, 70, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      lignes(28, 40, 64, 4, 14) +
      R(30, 38, 10, 10, 1, { fill: C.rouge, stroke: "none" }) +
      R(46, 38, 10, 10, 1, { fill: C.vert, stroke: "none" }) +
      R(62, 38, 10, 10, 1, { fill: C.bleu, stroke: "none" }) +
      R(30, 52, 10, 10, 1, { fill: C.jaune, stroke: "none" }) +
      R(46, 52, 10, 10, 1, { fill: C.violet, stroke: "none" }), "la bibliothèque");
  });
  lieu("bureau-directeur", "le bureau du directeur", function () {
    return fiche(R(0, 74, 120, 46, 0, { fill: C.mur }) +
      R(14, 66, 92, 14, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(38, 44, 44, 22, 2, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(90, 34, 10, { fill: C.peau, stroke: NOIR, "stroke-width": 2 }) +
      R(20, 30, 26, 16, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }), "le bureau du directeur");
  });
  lieu("cafeteria", "la cafétéria", function () {
    return fiche(R(0, 70, 120, 50, 0, { fill: C.mur }) +
      R(16, 56, 88, 12, 2, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 40, 24, 16, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2 }) +
      CI(74, 46, 9, { fill: C.rouge }) + R(64, 54, 22, 4, 1, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }) +
      CI(100, 48, 8, { fill: C.bleu }), "la cafétéria");
  });
  lieu("casiers", "les casiers", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.clair }) +
      [0, 1, 2].map(function (i) {
        return G({}, R(16 + i * 32, 20, 28, 80, 2, { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }) +
          R(24 + i * 32, 40, 12, 3, 1, { fill: BLANC }) +
          R(24 + i * 32, 64, 12, 3, 1, { fill: BLANC }));
      }).join(""), "les casiers");
  });
  lieu("classe", "la classe", function () {
    return fiche(R(16, 18, 88, 52, 3, { fill: "#2f4a3a", stroke: NOIR, "stroke-width": 2.5 }) +
      lignes(26, 30, 68, 4, 10) +
      R(30, 78, 60, 10, 2, { fill: C.bois }) + R(34, 86, 8, 22, 2, { fill: C.boisC }) +
      R(78, 86, 8, 22, 2, { fill: C.boisC }), "la classe");
  });
  lieu("corridor", "le corridor", function () {
    return fiche(P("M60 16 l-46 40 v48 h92 v-48 z", { fill: "#f3e2c8", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M60 16 l46 40 v48 h-92 v-48 z", { fill: "#efe0c4", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M60 20 v104", { stroke: NOIR, "stroke-width": 2 }) +
      R(20, 52, 16, 22, 1, { fill: C.bleu }) + R(84, 52, 16, 22, 1, { fill: C.bleu }) +
      P("M60 84 l-8 16 h16 z", { fill: C.rouge, stroke: "none" }), "le corridor");
  });
  lieu("cour-recre", "la cour de récréation", function () {
    return fiche(R(0, 82, 120, 38, 0, { fill: "#8fc86a" }) +
      CI(24, 26, 12, { fill: C.jaune }) +
      P("M96 82 v-30", { stroke: C.bois, "stroke-width": 5 }) +
      R(72, 50, 48, 6, 3, { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      R(80, 66, 8, 16, 2, { fill: C.bleuC, stroke: NOIR, "stroke-width": 2 }) +
      R(104, 66, 8, 16, 2, { fill: C.bleuC, stroke: NOIR, "stroke-width": 2 }), "la cour de récréation");
  });
  lieu("gymnase", "le gymnase", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.creme }) +
      R(10, 20, 100, 54, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(60, 47, 16, { fill: "none", stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M14 30 v34 M106 30 v34", { stroke: NOIR, "stroke-width": 2.5 }) +
      R(0, 80, 120, 40, 0, { fill: C.boisC }) +
      CI(34, 96, 12, { fill: C.orange, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M80 86 v22 M68 86 h24", { stroke: C.rouge, "stroke-width": 4 }), "le gymnase");
  });
  lieu("local-arts", "le local d’arts", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.creme }) +
      R(16, 24, 44, 34, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(30, 38, 5, { fill: C.rouge }) + CI(44, 38, 5, { fill: C.vert }) +
      P("M84 28 l-6 30 l8 0 l-6 30 z", { fill: C.violet, stroke: NOIR, "stroke-width": 2 }) +
      R(24, 74, 16, 20, 1, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }) +
      R(48, 78, 14, 16, 1, { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      R(70, 82, 12, 12, 1, { fill: C.bleu, stroke: NOIR, "stroke-width": 2 }), "le local d’arts");
  });
  lieu("local-info", "le local d’informatique", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.clair }) +
      [0, 1, 2].map(function (i) {
        return R(10 + i * 36, 24, 30, 22, 2, { fill: "#22303c", stroke: NOIR, "stroke-width": 2.5 }) +
          R(14 + i * 36, 28, 22, 14, 1, { fill: C.bleu }) +
          R(20 + i * 36, 48, 10, 6, 1, { fill: C.grisC, stroke: NOIR, "stroke-width": 1.5 });
      }).join("") +
      R(0, 82, 120, 38, 0, { fill: C.mur }), "le local d’informatique");
  });
  lieu("local-musique", "le local de musique", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.clair }) +
      P("M40 96 v-40 l30 -12 v40 z", { fill: "#4a2f1a", stroke: NOIR, "stroke-width": 2.5 }) +
      R(38, 52, 34, 6, 2, { fill: C.brunC, stroke: NOIR, "stroke-width": 2 }) +
      CI(28, 40, 10, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }) +
      R(86, 50, 8, 30, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }) +
      R(86, 50, 8, 22, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      ST("M84 38 q8 6 6 12", { stroke: C.bleu, "stroke-width": 3 }), "le local de musique");
  });
  lieu("secretariat", "le secrétariat", function () {
    return fiche(R(0, 70, 120, 50, 0, { fill: C.mur }) +
      R(14, 60, 92, 14, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(34, 38, 52, 22, 2, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      R(80, 32, 20, 26, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 24, 28, 16, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2 }), "le secrétariat");
  });
  lieu("toilettes", "les toilettes", function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: C.creme }) +
      R(30, 44, 40, 14, 3, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M34 58 h32 v34 q0 8 -8 8 h-16 q-8 0 -8 -8 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M34 58 q16 8 32 0 l4 6 q-20 10 -40 0 z", { fill: "#dfe7ee", stroke: NOIR, "stroke-width": 2 }) +
      R(76, 40, 26, 34, 2, { fill: "#dfe7ee", stroke: NOIR, "stroke-width": 2.5 }) +
      R(0, 100, 120, 20, 0, { fill: C.mur }), "les toilettes");
  });

  /* ======================================================================
     Export
     ====================================================================== */
  global.ART7 = {
    action: function (k) { return ACTIONS[k] ? ACTIONS[k]() : ""; },
    actionNom: function (k) { return ACT_NOM[k] || k; },
    actionCles: Object.keys(ACTIONS),

    personnel: function (k) { return PERSONNEL[k] ? PERSONNEL[k]() : ""; },
    personnelNom: function (k) { return PERS_NOM[k] || k; },

    matiere: function (k) { return MATIERE[k] ? MATIERE[k]() : ""; },
    matiereNom: function (k) { return MAT_NOM[k] || k; },

    lieu: function (k) { return LIEU[k] ? LIEU[k]() : ""; },
    lieuNom: function (k) { return LIEU_NOM[k] || k; }
  };
})(window);
