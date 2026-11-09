/* ==========================================================================
   Les métiers, les mots de position et de mouvement, le temps
   --------------------------------------------------------------------------
   Un métier n'est pas une photo : étiqueter le visage d'un inconnu par
   « un pompier » serait à la fois faux et une intrusion. On dessine donc
   une personne et son outil — elle se reconnaît d'un coup d'œil.
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
    bleu: "#4a90d9", bleuC: "#2f6fb5", marine: "#2f4858", rouge: "#d63a2f",
    vert: "#3f8f14", jaune: "#f2c14e", orange: "#ef7c1c", violet: "#8e44ad",
    rose: "#f4a6b8", turquoise: "#2ec4b6", gris: "#9aa5b1", grisC: "#6b7280",
    peau: "#f6d3b4", clair: "#eef3f7", mur: "#dfe9f2", brun: "#4a3322"
  };

  function fiche(inner, label) {
    return T("svg", { "class": "art art-vet", viewBox: "0 0 120 120", role: "img", "aria-label": label })
      .replace("/>", ">") + inner + "</svg>";
  }

  /* ======================================================================
     1. Les métiers (20)
     ====================================================================== */
  var METIER = {};
  var MET_NOM = {};

  /** une personne debout, à whom on ajoute un attribut */
  function personne(vet, tete, outil, extra) {
    var s = "";
    s += R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 100, 120, 20, 0, { fill: C.mur });
    s += R(44, 66, 14, 36, 3, { fill: C.marine }) + R(62, 66, 14, 36, 3, { fill: C.marine });
    s += P("M40 66 q20 -8 40 0 l-4 -24 h-32 z", { fill: vet, stroke: NOIR, "stroke-width": 2.5 });
    s += CI(60, 32, 18, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 });
    if (tete) s += tete;
    s += CI(54, 30, 2.4, { fill: NOIR, stroke: "none" }) + CI(66, 30, 2.4, { fill: NOIR, stroke: "none" });
    s += P("M54 38 q6 5 12 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" });
    s += P("M40 52 l-12 20 M80 52 l12 20", { stroke: C.peau, "stroke-width": 8, fill: "none", "stroke-linecap": "round" });
    return s + (outil || "") + (extra || "");
  }

  function met(cle, nom, f) { MET_NOM[cle] = nom; METIER[cle] = f; }

  met("architecte", "un ou une architecte", function () {
    return fiche(personne("#f5efe0", R(38, 20, 44, 12, 4, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      P("M14 88 h22 v16 h-22 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M18 82 l7 -10 l7 10 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M40 92 h16", { stroke: C.rouge, "stroke-width": 3 })), "un ou une architecte");
  });
  met("acteur", "un acteur ou une actrice", function () {
    // un rideau de scène et le masque comique-tragique : la robe
    // qu'on avait mise sur le buste se lisait comme un personnage de dessin
    return fiche(
      R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 100, 120, 20, 0, { fill: C.mur }) +
      P("M0 0 h26 q10 30 0 60 h-26 z", { fill: C.rouge }) +
      P("M94 0 h26 q-10 30 0 60 h-26 z", { fill: C.rouge }) +
      P("M0 0 h26 q10 30 0 60 h-26 z", { fill: "#000000", opacity: ".18" }) +
      R(44, 66, 14, 36, 3, { fill: C.marine }) + R(62, 66, 14, 36, 3, { fill: C.marine }) +
      P("M40 66 q20 -8 40 0 l-4 -24 h-32 z", { fill: C.violet, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(60, 32, 18, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(54, 30, 2.4, { fill: NOIR, stroke: "none" }) + CI(66, 30, 2.4, { fill: NOIR, stroke: "none" }) +
      P("M54 38 q6 5 12 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }) +
      P("M40 52 l-12 20 M80 52 l12 20", { stroke: C.peau, "stroke-width": 8, fill: "none", "stroke-linecap": "round" }) +
      // le masque, sourire d'un côté, larme de l'autre
      R(78, 66, 34, 26, 4, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M83 76 q5 -5 10 0 q5 5 0 8 q-5 -3 -10 0 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 1.6 }) +
      P("M97 78 q5 -5 10 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }),
      "un acteur ou une actrice");
  });
  met("agriculteur", "un agriculteur ou une agricultrice", function () {
    return fiche(personne(C.vert, P("M40 22 q20 -16 40 0 q-20 8 -40 0 z", { fill: C.jaune }) +
      P("M40 18 h40 v6 h-40 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M92 70 v-18 M86 52 h12", { stroke: C.bois, "stroke-width": 4 })), "un agriculteur ou une agricultrice");
  });
  met("chauffeur-autobus", "un chauffeur d’autobus", function () {
    return fiche(personne(C.bleu, R(38, 14, 44, 14, 6, { fill: C.marine, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(94, 40, 8, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      ST("M90 40 l8 -4", { stroke: NOIR, "stroke-width": 2.5 })), "un chauffeur d’autobus");
  });
  met("chauffeur-taxi", "un chauffeur de taxi", function () {
    return fiche(personne(C.jaune, R(40, 8, 40, 16, 5, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      T("text", { x: 60, y: 21, "text-anchor": "middle", "font-family": "Arial,sans-serif", "font-size": 11, "font-weight": "700", fill: NOIR })
        .replace("/>", ">") + "TAXI" + "</text>"), "un chauffeur de taxi");
  });
  met("coiffeur", "un coiffeur ou une coiffeuse", function () {
    return fiche(personne(C.rose, null,
      CI(96, 54, 14, { fill: "none", stroke: C.grisC, "stroke-width": 4 }) +
      ST("M96 54 h-14", { stroke: C.grisC, "stroke-width": 3 }) +
      P("M20 70 h16 v14 h-16 z", { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      P("M22 62 q6 -8 12 0 z", { fill: C.rose, stroke: NOIR, "stroke-width": 2 })), "un coiffeur ou une coiffeuse");
  });
  met("cuisinier", "un cuisinier ou une cuisinière", function () {
    return fiche(personne("#fdf6e8",
      P("M42 20 q18 -14 36 0 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(40, 16, 40, 8, 3, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }),
      R(22, 66, 30, 22, 2, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      R(28, 58, 18, 10, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      ST("M34 54 q-4 -8 4 -10 M40 54 q-4 -8 4 -10", { stroke: C.gris, "stroke-width": 2 })), "un cuisinier ou une cuisinière");
  });
  met("dentiste", "un ou une dentiste", function () {
    return fiche(personne("#e8f4ff", R(42, 4, 36, 12, 3, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 4 v12", { stroke: NOIR, "stroke-width": 2 }), null,
      CI(94, 70, 9, { fill: BLANC, stroke: C.grisC, "stroke-width": 2.5 }) +
      ST("M94 70 l0 -14 M94 56 l-6 4 M94 56 l6 4", { stroke: C.grisC, "stroke-width": 2.5 })),
      "un ou une dentiste");
  });
  met("dessinateur", "un dessinateur ou une dessinatrice", function () {
    return fiche(personne("#eef7ff", null,
      R(18, 58, 36, 30, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M24 80 l8 -12 l6 8 l6 -12 l6 16 z", { fill: C.vert }) +
      P("M56 76 l18 -22 l6 5 l-18 22 l-7 1 z", { fill: C.bleu, stroke: NOIR, "stroke-width": 2 })), "un dessinateur ou une dessinatrice");
  });
  met("facteur", "un facteur ou une factrice", function () {
    return fiche(personne(C.rouge, R(40, 10, 40, 12, 3, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }),
      R(76, 58, 30, 24, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(16, 60, 24, 18, 2, { fill: C.papier, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M18 62 l10 6 l10 -6", { fill: "none", stroke: C.grisC, "stroke-width": 2 })), "un facteur ou une factrice");
  });
  met("ingenieur", "un ingénieur ou une ingénieure", function () {
    return fiche(personne("#f2f2f2", R(42, 6, 36, 14, 6, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      P("M74 60 l26 -14 l5 8 l-26 14 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M100 46 l8 -4 M100 46 l4 6", { stroke: NOIR, "stroke-width": 3 }) +
      R(14, 68, 22, 18, 2, { fill: C.bleu, stroke: NOIR, "stroke-width": 2 }) +
      T("text", { x: 25, y: 81, "text-anchor": "middle", "font-family": "Arial,sans-serif", "font-size": 11, "font-weight": "700", fill: NOIR })
        .replace("/>", ">") + "A" + "</text>"), "un ingénieur ou une ingénieure");
  });
  met("mecanicien", "un mécanicien ou une mécanicienne", function () {
    return fiche(personne("#3a4a5a", R(40, 10, 40, 14, 5, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }),
      P("M20 62 l14 -14 l10 6 l-8 16 z", { fill: C.grisC, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M30 56 l10 8", { stroke: NOIR, "stroke-width": 2.5 }) +
      CI(92, 74, 14, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(92, 74, 6, { fill: C.grisC })), "un mécanicien ou une mécanicienne");
  });
  met("medecin", "un ou une médecin", function () {
    return fiche(personne("#fdf6e8", null,
      P("M18 70 l30 -30 q4 -4 8 0 l30 30 q4 4 0 8 l-30 30 q-4 4 -8 0 l-30 -30 q-4 -4 0 -8 z",
        { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(32, 58, 6, 18, 1, { fill: C.rouge }) + R(26, 64, 18, 6, 1, { fill: C.rouge })), "un ou une médecin");
  });
  met("ouvrier-batiment", "un ouvrier ou une ouvrière du bâtiment", function () {
    return fiche(personne(C.jaune, P("M38 20 q22 -18 44 0 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }),
      R(16, 66, 34, 10, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 58, 10, 10, 2, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      R(34, 58, 10, 10, 2, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      R(84, 56, 22, 40, 2, { fill: "#b5654a", stroke: NOIR, "stroke-width": 2 }) +
      ST("M84 66 h22 M84 76 h22 M95 56 v40", { stroke: C.creme, "stroke-width": 2 })), "un ouvrier ou une ouvrière du bâtiment");
  });
  met("pilote", "un ou une pilote", function () {
    // un avion et un volant : les deux traits gris d'avant lisaient comme
    // des bavures, rien ne disait « aviation »
    return fiche(
      R(0, 0, 120, 120, 0, { fill: C.clair }) + R(0, 100, 120, 20, 0, { fill: C.mur }) +
      P("M40 66 q20 -8 40 0 l-4 -24 h-32 z", { fill: C.marine, stroke: NOIR, "stroke-width": 2.5 }) +
      R(44, 66, 14, 36, 3, { fill: C.marine }) + R(62, 66, 14, 36, 3, { fill: C.marine }) +
      P("M40 52 l-12 20 M80 52 l12 20", { stroke: C.peau, "stroke-width": 8, fill: "none", "stroke-linecap": "round" }) +
      // casque d aviateur
      EL(60, 30, 19, 15, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M41 30 q19 -14 38 0 q-19 -6 -38 0 z", { fill: C.marine, stroke: NOIR, "stroke-width": 2.5 }) +
      EL(60, 30, 13, 8, { fill: "#bfe3f5", stroke: NOIR, "stroke-width": 2 }) +
      CI(54, 30, 2.2, { fill: NOIR, stroke: "none" }) + CI(66, 30, 2.2, { fill: NOIR, stroke: "none" }) +
      P("M55 36 q5 4 10 0", { stroke: NOIR, "stroke-width": 2, fill: "none", "stroke-linecap": "round" }) +
      // le volant
      CI(96, 84, 17, { fill: "none", stroke: NOIR, "stroke-width": 4 }) +
      CI(96, 84, 5, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      ST("M96 84 l0 -17 M96 84 l13 9 M96 84 l-13 9", { stroke: NOIR, "stroke-width": 3 }),
      "un ou une pilote");
  });
  met("policier", "un policier ou une policière", function () {
    return fiche(personne(C.marine, R(38, 10, 44, 14, 3, { fill: C.marine, stroke: NOIR, "stroke-width": 2.5 }),
      P("M42 18 l18 0 l-4 -8 h-10 z", { fill: C.marine }) +
      CI(96, 74, 9, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(96, 74, 4, { fill: C.marine })), "un policier ou une policière");
  });
  met("pompier", "un pompier ou une pompière", function () {
    return fiche(personne(C.rouge,
      EL(60, 22, 22, 14, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M34 26 h52", { stroke: C.jaune, "stroke-width": 3 }) +
      R(30, 24, 60, 10, 3, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(60, 20, 4, { fill: C.rouge, stroke: "none" }),
      ST("M98 88 v-30 M92 58 h12", { stroke: C.bleu, "stroke-width": 5 })), "un pompier ou une pompière");
  });
  met("serveur", "un serveur ou une serveuse", function () {
    return fiche(personne("#2b2b2b", R(42, 10, 36, 12, 3, { fill: "#2b2b2b", stroke: NOIR, "stroke-width": 2.5 }),
      R(22, 62, 30, 8, 2, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(30, 46, 8, 18, 2, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      EL(90, 60, 14, 5, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(102, 56, 4, 10, 1, { fill: BLANC, stroke: NOIR, "stroke-width": 2 })), "un serveur ou une serveuse");
  });
  met("vendeur", "un vendeur ou une vendeuse", function () {
    return fiche(personne(C.turquoise, R(42, 8, 36, 14, 5, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }),
      R(14, 64, 44, 32, 3, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M20 72 h32 M20 80 h32 M20 88 h32", { stroke: C.creme, "stroke-width": 2 })), "un vendeur ou une vendeuse");
  });
  met("veterinaire", "un ou une vétérinaire", function () {
    return fiche(personne("#eaf7ee", null,
      EL(20, 84, 14, 10, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(12, 76, 6, { fill: BLANC, stroke: NOIR, "stroke-width": 2 }) +
      P("M8 70 l-3 -5 M16 70 l3 -5", { stroke: NOIR, "stroke-width": 2 }) +
      ST("M76 70 h26 M89 70 v20", { stroke: C.rouge, "stroke-width": 5 })), "un ou une vétérinaire");
  });

  /* ======================================================================
     2. Les mots pour situer (10) — une boîte et une balle
     ====================================================================== */
  var POSITION = {};

  function boite(cx, cy, w, h) {
    return R(cx - w / 2, cy - h / 2, w, h, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 });
  }
  function balle(cx, cy, r) { return CI(cx, cy, r, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }); }

  POSITION["dans"] = function () {
    return fiche(boite(60, 64, 74, 64) + balle(60, 62, 11), "dans");
  };
  POSITION["sur"] = function () {
    return fiche(R(22, 78, 76, 14, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M40 78 v-30 M40 48 h8", { stroke: NOIR, "stroke-width": 3 }) + balle(52, 40, 11), "sur");
  };
  POSITION["en-dessous"] = function () {
    return fiche(R(22, 44, 76, 14, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 }) + balle(60, 76, 11), "en dessous");
  };
  POSITION["au-dessus"] = function () {
    return fiche(R(22, 66, 76, 14, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 }) + balle(60, 36, 11), "au-dessus");
  };
  POSITION["devant"] = function () {
    return fiche(boite(48, 60, 56, 62) + balle(78, 76, 14), "devant");
  };
  POSITION["derriere"] = function () {
    return fiche(boite(66, 60, 56, 62) + balle(44, 40, 13), "derrière");
  };
  POSITION["a-cote"] = function () {
    return fiche(boite(46, 62, 46, 58) + balle(94, 62, 12), "à côté de");
  };
  POSITION["entre"] = function () {
    return fiche(R(14, 44, 34, 56, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 }) +
      R(72, 44, 34, 56, 4, { fill: "#d96b3f", stroke: NOIR, "stroke-width": 2.5 }) + balle(60, 72, 12), "entre");
  };
  /* dessus / milieu / dessous : le livre pointe trois mots sur une même pile
   de livres. On garde la pile pour les trois, sinon « dessus » et « dessous »
   se lisaient comme deux mots sans rapport avec « milieu ». */
  function pileLivres() {
    return R(20, 38, 80, 14, 3, { fill: "#5a7f3f", stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 56, 80, 14, 3, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 74, 80, 14, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 });
  }
  POSITION["dessus"] = function () {
    return fiche(pileLivres() + balle(60, 22, 12) +
      ST("M92 32 l10 -10 M102 22 l-6 0 M102 22 l0 6", { stroke: C.bleu, "stroke-width": 3 }),
      "dessus");
  };
  POSITION["milieu"] = function () {
    return fiche(pileLivres() +
      ST("M92 66 l10 -8 M102 58 l-6 0 M102 58 l0 6", { stroke: C.bleu, "stroke-width": 3 }),
      "milieu");
  };
  POSITION["dessous"] = function () {
    return fiche(pileLivres() + balle(60, 102, 12) +
      ST("M92 100 l10 8 M102 108 l-6 0 M102 108 l0 -6", { stroke: C.bleu, "stroke-width": 3 }),
      "dessous");
  };
  POSITION["gauche"] = function () {
    return fiche(R(28, 26, 64, 74, 6, { fill: C.creme, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 26 v74", { stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "5 5" }) + balle(44, 62, 12), "gauche");
  };
  POSITION["centre"] = function () {
    return fiche(R(28, 26, 64, 74, 6, { fill: C.creme, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 26 v74", { stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "5 5" }) + balle(60, 62, 12), "centre");
  };
  POSITION["droite"] = function () {
    return fiche(R(28, 26, 64, 74, 6, { fill: C.creme, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M60 26 v74", { stroke: C.gris, "stroke-width": 2, "stroke-dasharray": "5 5" }) + balle(76, 62, 12), "droite");
  };

  /* ======================================================================
     3. Les mots pour décrire le mouvement (8) — une flèche
     ====================================================================== */
  var MOUV = {};

  function fleche(d, col) { return P(d, { fill: col || C.rouge, stroke: NOIR, "stroke-width": 2.5 }); }
  function toboggan() {
    return P("M22 100 q10 -60 40 -66 q22 -4 30 22 v18 h-30 q-4 -14 -18 -12 q-16 2 -14 26",
      { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 });
  }

  MOUV["en-haut"] = function () {
    return fiche(toboggan() + fleche("M44 30 l-8 -12 M44 30 l8 -12 M44 16 v-8", C.vert) +
      ST("M36 42 h16", { stroke: C.vert, "stroke-width": 3 }), "en haut");
  };
  MOUV["en-bas"] = function () {
    return fiche(toboggan() + fleche("M76 44 l-8 12 M76 44 l8 12 M76 56 v8", C.rouge), "en bas");
  };
  MOUV["entrer"] = function () {
    return fiche(R(46, 34, 56, 52, 3, { fill: "#3f8f14", stroke: NOIR, "stroke-width": 2.5 }) +
      R(40, 58, 14, 32, 3, { fill: "#2f6b0d", stroke: NOIR, "stroke-width": 2 }) +
      fleche("M6 72 h28 M26 64 l8 8 l-8 8", C.rouge), "entrer dans");
  };
  MOUV["sortir"] = function () {
    return fiche(R(30, 34, 56, 52, 3, { fill: "#3f8f14", stroke: NOIR, "stroke-width": 2.5 }) +
      R(26, 58, 14, 32, 3, { fill: "#2f6b0d", stroke: NOIR, "stroke-width": 2 }) +
      fleche("M64 72 h30 M86 64 l8 8 l-8 8", C.rouge), "sortir de");
  };
  MOUV["aller-vers"] = function () {
    // une flèche pleine : un simple trait se perdait dans la vague
    return fiche(P("M0 74 q14 -22 34 -8 q14 12 34 -4 q12 -10 22 0 q10 10 30 4 v34 H0 z",
      { fill: "#5aa9e6", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M14 56 l36 -16 l-3 12 l16 6 l-16 6 l3 12 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      P("M18 58 q12 -8 22 -4 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }),
      "aller vers");
  };
  MOUV["s-eloigner"] = function () {
    return fiche(P("M0 74 q14 -22 34 -8 q14 12 34 -4 q12 -10 22 0 q10 10 30 4 v34 H0 z",
      { fill: "#5aa9e6", stroke: NOIR, "stroke-width": 2.5 }) +
      P("M50 68 l-36 16 l3 -12 l-16 -6 l16 -6 l-3 -12 z", { fill: C.rouge, stroke: NOIR, "stroke-width": 2 }) +
      P("M88 56 q14 -8 24 2 z", { fill: C.jaune, stroke: NOIR, "stroke-width": 2 }),
      "s’éloigner de");
  };
  MOUV["a-travers"] = function () {
    return fiche(P("M0 30 h120 v54 q-30 16 -60 0 t-60 0 z",
      { fill: "#a9673a", stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M0 30 h120", { stroke: NOIR, "stroke-width": 2.5 }) +
      fleche("M14 22 h76 M82 14 l8 8 l-8 8", C.rouge) +
      ST("M14 22 v-6 M104 22 v-6", { stroke: C.rouge, "stroke-width": 2.5 }), "à travers");
  };
  MOUV["autour"] = function () {
    return fiche(EL(60, 62, 44, 28, { fill: "none", stroke: C.rouge, "stroke-width": 6 }) +
      P("M104 62 l8 -6 v12 z", { fill: C.rouge }) +
      CI(60, 62, 20, { fill: C.jaune, stroke: NOIR, "stroke-width": 2.5 }), "autour");
  };

  /* ======================================================================
     4. Le temps : moments, jours de la semaine
     ====================================================================== */
  var TEMPS = {};

  function ciel(nuit) {
    return R(0, 0, 120, 120, 0, { fill: nuit ? "#20304f" : "#bfe3f5" }) +
      R(0, 82, 120, 38, 0, { fill: nuit ? "#2e3f5c" : "#8fc86a" });
  }
  function soleil(x, y, r) {
    return CI(x, y, r, { fill: "#ffd23f" }) +
      ST("M" + x + " " + (y - r - 8) + " v-6 M" + x + " " + (y + r + 8) + " v6 M" +
        (x - r - 8) + " " + y + " h-6 M" + (x + r + 8) + " " + y + " h6", { stroke: "#ffd23f", "stroke-width": 3 });
  }

  TEMPS["matin"] = function () {
    return fiche(ciel(false) + soleil(94, 30, 13) +
      P("M0 82 h120 v38 H0 z", { fill: "#8fc86a" }) +
      P("M0 82 q14 -12 28 0 z", { fill: "#6aa84f" }) +
      P("M6 82 q12 -8 24 0 z", { fill: "#6aa84f" }) +
      P("M0 82 h120 v4 H0 z", { fill: "#ffd23f", opacity: ".5" }), "le matin");
  };
  TEMPS["apres-midi"] = function () {
    return fiche(ciel(false) + soleil(60, 40, 17) +
      CI(90, 28, 10, { fill: C.jaune }) +
      P("M18 92 q10 -10 20 0 z", { fill: "#6aa84f" }) +
      R(20, 98, 32, 12, 2, { fill: C.rouge }) +
      P("M0 82 h120 v4 H0 z", { fill: "#ffd23f", opacity: ".5" }), "l’après-midi");
  };
  TEMPS["soir"] = function () {
    return fiche(R(0, 0, 120, 120, 0, { fill: "#f7b267" }) +
      P("M0 82 h120 v38 H0 z", { fill: "#6b8f3f" }) +
      CI(60, 62, 15, { fill: "#e2574c" }) +
      ST("M60 62 m-22 0 a22 22 0 0 1 44 0", { stroke: "#e2574c", "stroke-width": 3 }) +
      R(20, 90, 12, 10, 1, { fill: "#3c5526" }) +
      P("M26 90 q-13 -16 0 -26 q13 10 0 26 z", { fill: "#3c5526" }) +
      P("M96 90 q-11 -20 0 -32 q11 12 0 32 z", { fill: "#4a6630" }), "le soir");
  };
  TEMPS["nuit"] = function () {
    return fiche(ciel(true) +
      P("M84 24 a13 13 0 1 0 6 20 a15 15 0 0 1 -6 -20 z", { fill: "#f0e6a8" }) +
      [[26, 22], [44, 44], [20, 56], [100, 58], [62, 18], [104, 30]].map(function (p) {
        return CI(p[0], p[1], 2, { fill: "#fff" });
      }).join(""), "la nuit");
  };

  /* Un bloc de calendrier : hier / aujourd'hui / demain.
     Le mot se lit sous le bloc, jamais dedans : « aujourd'hui » ne tient pas
     dans 84 px et débordait sur les bords. */
  function bloc(couleur, mot, taille) {
    return R(20, 24, 80, 54, 5, { fill: couleur, stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 24, 80, 16, 5, { fill: NOIR }) +
      R(28, 48, 14, 12, 2, { fill: "#ffffff", opacity: ".5" }) +
      R(48, 48, 14, 12, 2, { fill: "#ffffff", opacity: ".5" }) +
      R(68, 48, 14, 12, 2, { fill: "#ffffff", opacity: ".5" }) +
      T("text", { x: 60, y: 102, "text-anchor": "middle", "font-family": "Georgia,serif",
        "font-size": taille || 16, "font-weight": "700", fill: NOIR }).replace("/>", ">") +
      mot + "</text>";
  }
  /* hier : une flèche qui revient vers la gauche ; demain : qui part vers la
   droite ; aujourd'hui : un simple cercle. */
  function flecheRetour(couleur, x) {
    return ST("M" + (x + 16) + " 68 q-18 -12 0 -26", { stroke: couleur, "stroke-width": 4.5 }) +
      P("M" + (x + 16) + " 42 l-7 4 l7 4 z", { fill: couleur });
  }
  function flecheAvant(couleur, x) {
    return ST("M" + (x - 16) + " 68 q18 -12 0 -26", { stroke: couleur, "stroke-width": 4.5 }) +
      P("M" + (x - 16) + " 42 l7 4 l-7 4 z", { fill: couleur });
  }
  TEMPS["hier"] = function () {
    return fiche(bloc("#dfe9f2", "hier") + flecheRetour(C.rouge, 8), "hier");
  };
  TEMPS["aujourdhui"] = function () {
    return fiche(bloc("#fff3c4", "aujourd’hui", 15) +
      R(14, 18, 92, 66, 8, { fill: "none", stroke: C.rouge, "stroke-width": 3.5 }),
      "aujourd’hui");
  };
  TEMPS["demain"] = function () {
    return fiche(bloc("#dff0d8", "demain") + flecheAvant(C.vert, 112), "demain");
  };

  /* les sept jours, avec leur petite scène */
  var JOUR = {};
  var JOUR_NOM = {
    lundi: "lundi", mardi: "mardi", mercredi: "mercredi", jeudi: "jeudi",
    vendredi: "vendredi", samedi: "samedi", dimanche: "dimanche"
  };

  function enteteJour(txt) {
    return T("text", { x: 60, y: 22, "text-anchor": "middle", "font-family": "Georgia,serif",
      "font-size": 17, "font-weight": "700", fill: NOIR }).replace("/>", ">") + txt + "</text>";
  }
  function carte(txt, scene) {
    return fiche(R(8, 6, 104, 108, 5, { fill: "#fdf6e8", stroke: NOIR, "stroke-width": 2.5 }) +
      enteteJour(txt) + scene, txt);
  }

  JOUR.lundi = function () {
    return carte("lundi", CI(56, 66, 22, { fill: C.orange, stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M56 66 m-22 0 a22 22 0 0 1 44 0", { stroke: NOIR, "stroke-width": 2.5 }) +
      ST("M30 48 q10 -8 20 -3 M82 48 q-10 -8 -20 -3", { stroke: NOIR, "stroke-width": 2.5 }));
  };
  JOUR.mardi = function () {
    return carte("mardi", EL(42, 68, 26, 20, { fill: BLANC, stroke: NOIR, "stroke-width": 2.5 }) +
      CI(34, 62, 5, { fill: C.rouge }) + CI(48, 58, 5, { fill: C.jaune }) +
      CI(42, 72, 5, { fill: C.bleu }) + CI(52, 70, 5, { fill: C.vert }) +
      P("M74 54 l16 -22 l7 5 l-16 22 l-8 1 z", { fill: C.violet, stroke: NOIR, "stroke-width": 2 }));
  };
  JOUR.mercredi = function () {
    return carte("mercredi", R(26, 46, 40, 48, 3, { fill: C.gris, stroke: NOIR, "stroke-width": 2.5 }) +
      R(22, 38, 48, 10, 3, { fill: "#7d8a95", stroke: NOIR, "stroke-width": 2.5 }) +
      R(44, 52, 4, 12, 1, { fill: C.bleuC }) +
      ST("M86 50 q10 6 6 18", { stroke: C.gris, "stroke-width": 3 }));
  };
  JOUR.jeudi = function () {
    return carte("jeudi", EL(42, 82, 20, 16, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(60, 50, 10, 36, 2, { fill: C.bois, stroke: NOIR, "stroke-width": 2.5 }) +
      R(56, 48, 22, 8, 3, { fill: "#c98a4b", stroke: NOIR, "stroke-width": 2.5 }) +
      CI(88, 62, 5, { fill: NOIR, stroke: "none" }) + CI(98, 70, 5, { fill: NOIR, stroke: "none" }) +
      CI(82, 74, 5, { fill: NOIR, stroke: "none" }));
  };
  /* la promenade du chien : la laisse relie nettement les deux silhouettes */
  function chienPromenade() {
    var s = "";
    // le garçon
    s += CI(30, 44, 11, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 });
    s += P("M23 38 q7 -6 14 0 q-2 -8 -7 -8 t-7 8 z", { fill: C.brun });
    s += P("M23 56 q7 -4 14 0 l3 34 h-20 z", { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 });
    s += P("M36 60 l10 8", { stroke: C.peau, "stroke-width": 6, fill: "none", "stroke-linecap": "round" });
    s += P("M24 90 l0 12 M34 90 l2 12", { stroke: C.marine, "stroke-width": 8, "stroke-linecap": "round" });
    // la laisse
    s += ST("M45 68 q14 8 22 4", { stroke: "#6b4a2a", "stroke-width": 2.5 });
    // le chien
    s += P("M62 78 q-2 -16 12 -16 q14 0 14 12 q0 10 -12 10 z",
      { fill: "#c98a4b", stroke: NOIR, "stroke-width": 2.5 });
    s += P("M84 68 q10 -4 14 2 q2 6 -4 8 q-8 2 -10 -4 z",
      { fill: "#c98a4b", stroke: NOIR, "stroke-width": 2.5 });
    s += P("M92 70 l3 -4 l1 4 z", { fill: "#c98a4b", stroke: NOIR, "stroke-width": 2 });
    s += P("M104 74 q6 2 4 8", { fill: "none", stroke: "#c98a4b", "stroke-width": 3, "stroke-linecap": "round" });
    s += CI(92, 72, 1.8, { fill: NOIR, stroke: "none" });
    s += P("M64 84 l-2 14 M84 84 l3 14", { stroke: "#c98a4b", "stroke-width": 5, "stroke-linecap": "round" });
    s += P("M76 76 q6 12 2 22", { fill: "none", stroke: "#c98a4b", "stroke-width": 3, "stroke-linecap": "round" });
    return s;
  }
  JOUR.vendredi = function () {
    return carte("vendredi", chienPromenade());
  };
  /* l'écran des deux derniers jours, avec la pastille « congé ! » */
  function ecranWeekend(icone) {
    return R(18, 34, 58, 44, 4, { fill: C.bleuC, stroke: NOIR, "stroke-width": 2.5 }) +
      R(24, 40, 46, 32, 2, { fill: "#9fd0f5" }) +
      R(39, 20, 16, 15, 2, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      icone +
      P("M52 98 h52 a6 6 0 0 1 6 6 v0 a6 6 0 0 1 -6 6 h-52 a6 6 0 0 1 -6 -6 a6 6 0 0 1 6 -6 z",
        { fill: C.rouge }) +
      T("text", { x: 78, y: 108, "text-anchor": "middle", "font-family": "Arial,sans-serif",
        "font-size": 11, "font-weight": "700", fill: BLANC }).replace("/>", ">") +
      "congé !" + "</text>";
  }
  JOUR.samedi = function () {
    // une tablette tenue à deux mains
    return carte("samedi", ecranWeekend(
      P("M80 52 h16 v24 h-16 z", { fill: BLANC, stroke: NOIR, "stroke-width": 2 }) +
      P("M78 78 l4 6 M98 78 l-4 6", { stroke: C.peau, "stroke-width": 5, "stroke-linecap": "round" })));
  };
  JOUR.dimanche = function () {
    // une manette et une tasse : on ne fait rien de spécial, mais on le voit
    return carte("dimanche", ecranWeekend(
      EL(84, 66, 13, 7, { fill: C.grisC, stroke: NOIR, "stroke-width": 2 }) +
      CI(80, 63, 2.4, { fill: BLANC, stroke: "none" }) + CI(88, 63, 2.4, { fill: BLANC, stroke: "none" }) +
      R(82, 74, 12, 8, 2, { fill: C.rouge, stroke: NOIR, "stroke-width": 1.6 }) +
      ST("M94 76 q5 1 5 4", { stroke: NOIR, "stroke-width": 1.6, fill: "none" })));
  };

  /* ======================================================================
     Export
     ====================================================================== */
  global.ART8 = {
    metier: function (k) { return METIER[k] ? METIER[k]() : ""; },
    metierNom: function (k) { return MET_NOM[k] || k; },
    position: function (k) { return POSITION[k] ? POSITION[k]() : ""; },
    mouvement: function (k) { return MOUV[k] ? MOUV[k]() : ""; },
    temps: function (k) { return TEMPS[k] ? TEMPS[k]() : ""; },
    jour: function (k) { return JOUR[k] ? JOUR[k]() : ""; },
    jourNom: function (k) { return JOUR_NOM[k] || k; }
  };
})(window);
