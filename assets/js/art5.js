/* ==========================================================================
   Vêtements, accessoires et chaussures — pictogrammes vectoriels
   --------------------------------------------------------------------------
   Commons n'a pas de photographie de produit isolée pour ces mots : « bermuda »
   donne la vitrine d'un magasin de jean, « chapeau » un chapeau de femme des
   années 1920, « camisole » des camisoles de force (!), « robe » un jardin
   japonais. Comme pour les couleurs et les formes, on dessine : plus net,
   cohérent avec le reste du livre, et sans ambiguïté.

   Les formes sont construites par des helpers plutôt que par des littéraux
   concaténés : un attribut oublié ne casse pas tout le fichier.
   ========================================================================== */
(function (global) {
  "use strict";

  var esc = global.ART2.esc;

  /* --- helpers ---------------------------------------------------------- */
  function attrs(o) {
    var s = "";
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] != null) {
        s += " " + k + '="' + o[k] + '"';
      }
    }
    return s;
  }
  function T(tag, o) { return "<" + tag + attrs(o) + "/>"; }

  var NOIR = "#2b2b2b";
  var BLANC = "#ffffff";

  /* --- couleurs du nuancier --------------------------------------------- */
  var C = {
    bleu: "#4a90d9", bleuC: "#2f6fb5", marine: "#2f4858",
    rouge: "#d63a2f", rose: "#f4a6b8", vert: "#3f8f14",
    jaune: "#f2c14e", orange: "#ef7c1c", gris: "#9aa5b1", grisC: "#6b7280",
    violet: "#8e44ad", turquoise: "#2ec4b6", or: "#e3b23c",
    marron: "#a9673a", brun: "#8d6b4a", beige: "#e8dcc0", creme: "#fdf6e8",
    peau: "#f2cba8"
  };

  /* enveloppe une fiche */
  function fiche(interieur, label, w, h) {
    return T("svg", {
      "class": "art art-vet", viewBox: "0 0 120 120", role: "img",
      "aria-label": label || ""
    }).replace("/>", ">") + interieur + "</svg>";
  }

  /* contour commun : on l'applique une fois sur le groupe */
  function g(interieur, fill, stroke) {
    return T("g", {
      fill: fill || "none",
      stroke: stroke === undefined ? NOIR : stroke,
      "stroke-width": stroke === undefined ? 3 : null,
      "stroke-linejoin": "round",
      "stroke-linecap": "round"
    }).replace("/>", ">") + interieur + "</g>";
  }
  function st(interieur, stroke, width) {
    return T("g", {
      fill: "none", stroke: stroke, "stroke-width": width || 3,
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }).replace("/>", ">") + interieur + "</g>";
  }
  function P(d, o) { return T("path", Object.assign({ d: d }, o || {})); }
  function R(x, y, w, h, rx, o) {
    return T("rect", Object.assign({ x: x, y: y, width: w, height: h, rx: rx == null ? 0 : rx }, o || {}));
  }
  function CI(cx, cy, r, o) { return T("circle", Object.assign({ cx: cx, cy: cy, r: r }, o || {})); }
  function EL(cx, cy, rx, ry, o) {
    return T("ellipse", Object.assign({ cx: cx, cy: cy, rx: rx, ry: ry }, o || {}));
  }
  function TX(x, y, t, o) {
    return T("text", Object.assign({
      x: x, y: y, "text-anchor": "middle",
      "font-family": "Arial,Helvetica,sans-serif",
      "font-weight": "700", "font-size": 11, fill: NOIR
    }, o || {})).replace("/>", ">") + t + "</text>";
  }
  function etiq(cx, cy, r, col) {
    return CI(cx, cy, r, { fill: col || C.orange, stroke: NOIR, "stroke-width": 2 });
  }

  /* --- patron commun : un t-shirt --------------------------------------- */
  function tshirtPath(col, col2) {
    return P("M42 26 L18 38 L26 58 L38 53 V100 H82 V53 L94 58 L102 38 L78 26 L70 16 H50 Z",
      { fill: col2 || col }) +
      P("M50 16 h20 v10 h-20 z", { fill: C.creme });
  }

  /* ======================================================================
     LES VÊTEMENTS
     ====================================================================== */
  var VET = {};
  var VET_NOM = {};

  VET_NOM["tee-shirt"] = "un tee-shirt";
  VET["tee-shirt"] = function () {
    return fiche(g(tshirtPath(BLANC, C.creme), C.creme), "un tee-shirt");
  };

  VET_NOM.camisole = "une camisole";
  VET.camisole = function () {
    return fiche(g(
      P("M46 24 h28 l-4 12 H50 z", { fill: BLANC }) +
      P("M48 36 l6 10 v50 h24 V46 l6 -10 l-6 -10 h-24 z", { fill: C.creme }),
      BLANC), "une camisole");
  };

  VET_NOM.bermuda = "un bermuda";
  VET.bermuda = function () {
    // des shortS : les jambes s'arrêtent à mi-cuisse, pas aux chevilles
    return fiche(g(
      R(30, 22, 60, 12, 2, { fill: C.bleuC }) +
      P("M32 34 h26 l-3 36 H30 z", { fill: C.bleu }) +
      P("M62 34 h26 l2 36 H65 z", { fill: C.bleu }) +
      R(58, 44, 4, 14, 1, { fill: NOIR, stroke: "none" }) +
      st("<path d=\"M32 48h56\"/>", C.bleuC, 2), C.bleu), "un bermuda");
  };

  VET_NOM.pantalon = "un pantalon";
  VET.pantalon = function () {
    return fiche(g(
      R(34, 18, 52, 12, 2, { fill: C.grisC }) +
      P("M36 30 h22 l-3 68 H31 z", { fill: C.grisC }) +
      P("M62 30 h22 l5 68 H65 z", { fill: C.grisC }) +
      CI(60, 24, 3.5, { fill: C.orange, stroke: "none" }), C.grisC), "un pantalon");
  };

  VET_NOM.jean = "un jean";
  VET.jean = function () {
    return fiche(g(
      R(34, 18, 52, 12, 2, { fill: C.bleuC }) +
      P("M36 30 h22 l-3 68 H31 z", { fill: C.bleu }) +
      P("M62 30 h22 l5 68 H65 z", { fill: C.bleu }) +
      R(36, 30, 12, 14, 0, { fill: C.bleuC, "stroke-width": 2 }) +
      R(72, 30, 12, 14, 0, { fill: C.bleuC, "stroke-width": 2 }) +
      R(56, 30, 8, 8, 1, { fill: C.orange, stroke: "none" }), C.bleu), "un jean");
  };

  VET_NOM["blouson-court"] = "un blouson court";
  VET["blouson-court"] = function () {
    return fiche(g(
      P("M42 28 L22 40 L28 60 L38 55 V102 H82 V55 L92 60 L98 40 L78 28 L70 18 H50 Z", { fill: C.marine }) +
      R(48, 36, 24, 9, 2, { fill: C.orange }) +
      R(52, 58, 16, 4, 2, { fill: BLANC, stroke: "none" }) +
      R(52, 72, 16, 4, 2, { fill: BLANC, stroke: "none" }), C.marine),
      "un blouson court");
  };

  VET_NOM.chandail = "un chandail";
  VET.chandail = function () {
    return fiche(
      g(P("M42 28 L22 40 L28 60 L38 55 V102 H82 V55 L92 60 L98 40 L78 28 L70 18 H50 Z",
        { fill: C.rouge }) +
        P("M48 20 q12 12 24 0", { fill: "none", stroke: NOIR, "stroke-width": 4 }) +
        st("<path d=\"M38 58h44M38 70h44M38 82h44\"/>", BLANC, 2.5), C.rouge),
      "un chandail");
  };

  VET_NOM["chandail-capuchon"] = "un chandail à capuchon";
  VET["chandail-capuchon"] = function () {
    return fiche(g(
      P("M42 30 L22 42 L28 62 L38 57 V102 H82 V57 L92 62 L98 42 L78 30 L70 20 H50 Z", { fill: C.bleu }) +
      P("M44 22 q16 16 32 0 z", { fill: C.bleuC }) +
      st("<path d=\"M50 46v10M70 46v10\"/>", C.bleuC, 3) +
      st("<path d=\"M48 60h24M48 72h24\"/>", BLANC, 3), C.bleu), "un chandail à capuchon");
  };

  VET_NOM.chapeau = "un chapeau";
  VET.chapeau = function () {
    return fiche(g(
      EL(60, 84, 48, 12, { fill: NOIR }) +
      P("M34 84 q0 -40 26 -40 t26 40 z", { fill: NOIR }) +
      P("M34 76 q26 10 52 0 v8 q-26 10 -52 0 z", { fill: C.rouge }), NOIR), "un chapeau");
  };

  VET_NOM.tuque = "une tuque";
  VET.tuque = function () {
    return fiche(g(
      P("M26 86 q4 -52 34 -52 t34 52 z", { fill: C.bleu }) +
      R(22, 84, 76, 16, 7, { fill: C.creme }) +
      CI(60, 30, 7, { fill: C.creme }), C.bleu), "une tuque");
  };

  VET_NOM.casquette = "une casquette";
  VET.casquette = function () {
    return fiche(g(
      P("M26 82 q2 -40 34 -40 t34 40 z", { fill: C.rouge }) +
      P("M60 46 q-32 0 -38 24 q22 8 38 8 z", { fill: C.rouge }) +
      CI(60, 44, 4, { fill: C.creme }), C.rouge), "une casquette");
  };

  VET_NOM.chemise = "une chemise";
  VET.chemise = function () {
    return fiche(g(
      P("M42 26 L24 38 L30 58 L40 53 V104 H80 V53 L90 58 L96 38 L78 26 L70 16 H50 Z", { fill: BLANC }) +
      P("M52 20 l8 14 l8 -14 z", { fill: C.creme }) +
      CI(60, 54, 2.5, { fill: NOIR, stroke: "none" }) +
      CI(60, 70, 2.5, { fill: NOIR, stroke: "none" }) +
      CI(60, 86, 2.5, { fill: NOIR, stroke: "none" }), BLANC), "une chemise");
  };

  VET_NOM.chemisier = "un chemisier";
  VET.chemisier = function () {
    return fiche(g(
      P("M46 28 L32 38 L38 54 L46 50 V102 H74 V50 L82 54 L88 38 L74 28 L66 18 H54 Z", { fill: C.rose }) +
      P("M52 22 h16 q8 10 16 0 l-8 -8 h-16 z", { fill: BLANC }) +
      st("<path d=\"M60 36v62\"/>", BLANC, 3), C.rose), "un chemisier");
  };

  VET_NOM.complet = "un complet";
  VET.complet = function () {
    return fiche(g(
      P("M42 28 L26 40 L32 60 L42 55 V104 H78 V55 L88 60 L94 40 L78 28 L70 18 H50 Z", { fill: C.marine }) +
      P("M50 20 l10 16 l10 -16 z", { fill: BLANC }) +
      P("M56 46 h8 l4 20 l-8 8 l-8 -8 z", { fill: C.rouge }) +
      st("<path d=\"M42 58h10M68 58h10\"/>", BLANC, 2.5), C.marine), "un complet");
  };

  VET_NOM.gants = "des gants";
  VET.gants = function () {
    var gant = P("M30 66 V44 a5 5 0 0 1 10 0 v-6 a5 5 0 0 1 10 0 v-4 a5 5 0 0 1 10 0 v6 a5 5 0 0 1 8 5 v24 l-6 20 H36 z", { fill: C.marron });
    return fiche(g(gant + P("M90 66 V44 a5 5 0 0 0 -10 0 v-6 a5 5 0 0 0 -10 0 v-4 a5 5 0 0 0 -10 0 v6 a5 5 0 0 0 -8 5 v24 l6 20 h22 z", { fill: C.marron }), C.marron), "des gants");
  };

  VET_NOM.mitaines = "des mitaines";
  VET.mitaines = function () {
    var m = P("M32 64 V52 a4 4 0 0 1 8 0 v-4 a4 4 0 0 1 8 0 v-2 a4 4 0 0 1 8 0 v20 l-4 22 H36 z", { fill: C.orange });
    return fiche(g(m + P("M88 64 V52 a4 4 0 0 0 -8 0 v-4 a4 4 0 0 0 -8 0 v-2 a4 4 0 0 0 -8 0 v20 l4 22 h20 z", { fill: C.orange }), C.orange), "des mitaines");
  };

  VET_NOM.chaussettes = "des chaussettes";
  VET.chaussettes = function () {
    return fiche(g(
      P("M34 20 h18 l4 50 q0 8 -12 8 t-14 -8 z", { fill: BLANC }) +
      P("M68 20 h18 l4 50 q0 8 -12 8 t-14 -8 z", { fill: BLANC }) +
      st("<path d=\"M32 34h22M32 46h22M66 34h22M66 46h22\"/>", C.bleu, 4), BLANC),
      "des chaussettes");
  };

  VET_NOM.impermeable = "un imperméable";
  VET.impermeable = function () {
    return fiche(g(
      P("M42 26 L24 38 L30 58 L40 53 V104 H80 V53 L90 58 L96 38 L78 26 L70 16 H50 Z", { fill: C.jaune }) +
      P("M50 16 l10 14 l10 -14 z", { fill: C.jaune }) +
      st("<path d=\"M60 34v64\"/>", C.orange, 2) +
      etiq(60, 54, 3) + etiq(60, 70, 3) +
      st("<path d=\"M38 58h10M72 58h10\"/>", NOIR, 2.5), C.jaune), "un imperméable");
  };

  VET_NOM.manteau = "un manteau";
  VET.manteau = function () {
    return fiche(g(
      P("M40 30 L20 42 L26 62 L36 58 V102 H84 V58 L94 62 L100 42 L80 30 L72 20 H48 Z", { fill: C.marine }) +
      P("M48 20 h24 l-6 9 H54 z", { fill: C.marine }) +
      P("M56 36 l4 62 h8 l-4 -62 z", { fill: C.grisC }) +
      etiq(58, 52, 3, C.orange) + etiq(58, 68, 3, C.orange), C.marine), "un manteau");
  };

  VET_NOM.jupe = "une jupe";
  VET.jupe = function () {
    return fiche(g(
      P("M40 28 h40 l6 20 H34 z", { fill: C.violet }) +
      P("M34 48 h52 l12 46 H22 z", { fill: C.violet }) +
      st("<path d=\"M40 60v34M52 58v36M68 58v36M80 60v34\"/>", BLANC, 2), C.violet), "une jupe");
  };

  VET_NOM["maillot-bain"] = "un maillot de bain";
  VET["maillot-bain"] = function () {
    // un maillot une pièce : bretelles, corsaire, échancrures
    return fiche(
      P("M44 22 q8 -6 16 0 M76 22 q-8 -6 -16 0",
        { fill: "none", stroke: C.rouge, "stroke-width": 5 }) +
      g(P("M40 32 h40 q8 24 3 50 l-5 20 h-36 l-5 -20 q-5 -26 3 -50 z",
        { fill: C.rouge }) +
        st("<path d=\"M60 46v54\"/>", C.jaune, 2.5) +
        st("<path d=\"M48 50h24\"/>", C.jaune, 2.5), C.rouge),
      "un maillot de bain");
  };

  VET_NOM.pyjama = "un pyjama";
  VET.pyjama = function () {
    return fiche(g(
      P("M42 28 L26 40 L32 60 L40 55 V104 H80 V55 L88 60 L94 40 L78 28 L70 18 H50 Z", { fill: C.turquoise }) +
      st("<path d=\"M48 20 l12 12 l12 -12\"/>", BLANC, 3) +
      st("<path d=\"M38 62h44\"/>", BLANC, 3)), "un pyjama");
  };

  VET_NOM.robe = "une robe";
  VET.robe = function () {
    return fiche(g(
      P("M46 18 l6 10 h16 l6 -10 l14 8 l-6 16 l12 58 H30 l12 -58 l-6 -16 z", { fill: C.rose }) +
      st("<path d=\"M60 28v64M38 66h44\"/>", BLANC, 2.5), C.rose), "une robe");
  };

  VET_NOM["robe-chambre"] = "une robe de chambre";
  VET["robe-chambre"] = function () {
    return fiche(g(
      P("M42 28 L26 40 L32 60 L40 55 V104 H80 V55 L88 60 L94 40 L78 28 L70 18 H50 Z", { fill: C.beige }) +
      st("<path d=\"M48 20 l12 12 l12 -12\"/>", C.marron, 3) +
      R(40, 46, 20, 16, 2, { fill: C.creme }), C.beige), "une robe de chambre");
  };

  VET_NOM.salopette = "une salopette";
  VET.salopette = function () {
    return fiche(g(
      P("M38 22 h20 l2 14 H36 z M62 22 h20 l2 14 H60 z", { fill: C.bleu }) +
      R(36, 34, 48, 34, 0, { fill: C.bleu }) +
      P("M36 66 h22 l-4 34 H30 z M62 66 h22 l6 34 H66 z", { fill: C.bleuC }) +
      etiq(46, 50, 3) + etiq(74, 50, 3), C.bleu), "une salopette");
  };

  VET_NOM["sous-vetement"] = "un sous-vêtement";
  VET["sous-vetement"] = function () {
    // un slip : ceinture, cuisses, échancrures
    return fiche(g(
      R(26, 40, 68, 14, 3, { fill: C.creme }) +
      P("M28 54 h64 q-4 34 -18 42 h-28 q-14 -8 -18 -42 z", { fill: BLANC }) +
      st("<path d=\"M28 62h64\"/>", C.gris, 2) +
      st("<path d=\"M60 54v42\"/>", C.gris, 2), BLANC), "un sous-vêtement");
  };

  /* ======================================================================
     LES ACCESSOIRES
     ====================================================================== */
  var ACC = {};
  var ACC_NOM = {};

  ACC_NOM.bague = "une bague";
  ACC.bague = function () {
    return fiche(
      st("<circle cx=\"60\" cy=\"68\" r=\"26\"/>", C.orange, 9) +
      st("<path d=\"M60 42 a26 26 0 0 1 25 19\"/>", C.marine, 9) +
      P("M60 22 l8 12 l-8 12 l-8 -12 z", { fill: C.turquoise }), "une bague");
  };

  ACC_NOM.bandeau = "un bandeau";
  ACC.bandeau = function () {
    return fiche(g(
      P("M18 62 q42 -22 84 0 v14 q-42 -20 -84 0 z", { fill: C.rose }) +
      CI(78, 58, 6, { fill: C.rouge }), C.rose), "un bandeau");
  };

  ACC_NOM["boucles-oreilles"] = "des boucles d'oreilles";
  ACC["boucles-oreilles"] = function () {
    return fiche(
      st("<circle cx=\"38\" cy=\"64\" r=\"16\"/><circle cx=\"82\" cy=\"64\" r=\"16\"/>", C.orange, 6) +
      etiq(38, 32, 4, C.orange) + etiq(82, 32, 4, C.orange), "des boucles d'oreilles");
  };

  ACC_NOM.bracelet = "un bracelet";
  ACC.bracelet = function () {
    return fiche(
      st("<path d=\"M20 62h80\"/>", C.marine, 14) +
      CI(60, 62, 11, { fill: C.orange }), "un bracelet");
  };

  ACC_NOM.ceinture = "une ceinture";
  ACC.ceinture = function () {
    return fiche(g(
      R(8, 50, 104, 22, 4, { fill: C.marron }) +
      R(48, 44, 26, 34, 4, { fill: "none", stroke: C.orange, "stroke-width": 5 }) +
      R(55, 54, 12, 14, 2, { fill: C.orange, stroke: "none" }), C.marron), "une ceinture");
  };

  ACC_NOM.collier = "un collier";
  ACC.collier = function () {
    return fiche(
      st("<path d=\"M24 26 q6 52 36 52 t36 -52\"/>", C.orange, 6) +
      P("M60 78 l10 12 l-10 12 l-10 -12 z", { fill: C.turquoise }), "un collier");
  };

  ACC_NOM.cravate = "une cravate";
  ACC.cravate = function () {
    return fiche(g(
      P("M42 22 h36 l-10 14 l8 6 l-18 50 l-18 -50 l8 -6 z", { fill: C.rouge }) +
      st("<path d=\"M48 50h24M46 64h28M44 78h32\"/>", BLANC, 2.5), C.rouge), "une cravate");
  };

  ACC_NOM.foulard = "un foulard";
  ACC.foulard = function () {
    return fiche(g(
      P("M24 34 h72 l-12 20 l12 20 H24 l12 -20 z", { fill: C.turquoise }) +
      CI(44, 44, 4, { fill: BLANC, stroke: "none" }) +
      CI(76, 64, 4, { fill: BLANC, stroke: "none" }) +
      st("<path d=\"M56 32l6 38\"/>", BLANC, 3), C.turquoise), "un foulard");
  };

  var lunettes = function (teinte, verre) {
    return g(
      st("<circle cx=\"36\" cy=\"60\" r=\"19\"/><circle cx=\"84\" cy=\"60\" r=\"19\"/>", teinte, 4) +
      st("<path d=\"M55 60h10M17 54l-9 -4M103 54l9 -4\"/>", teinte, 4) +
      (verre ? CI(36, 60, 19, { fill: "#3a4a5a" }) + CI(84, 60, 19, { fill: "#3a4a5a" }) +
        st("<path d=\"M26 52a16 16 0 0 1 16 3M74 52a16 16 0 0 1 16 3\"/>", BLANC, 4) : "") +
      st("<path d=\"M28 48a16 16 0 0 1 14 6\"/>", BLANC, 4), teinte);
  };

  ACC_NOM.lunettes = "des lunettes";
  ACC.lunettes = function () {
    return fiche(lunettes(NOIR, false), "des lunettes");
  };
  ACC_NOM["lunettes-soleil"] = "des lunettes soleil";
  ACC["lunettes-soleil"] = function () {
    return fiche(lunettes(NOIR, true), "des lunettes soleil");
  };

  ACC_NOM.maquillage = "du maquillage";
  ACC.maquillage = function () {
    return fiche(g(
      R(22, 34, 76, 18, 4, { fill: C.violet }) +
      R(22, 68, 76, 18, 4, { fill: C.rose }) +
      R(52, 56, 16, 8, 2, { fill: C.orange }) +
      st("<path d=\"M30 43h60M30 77h60\"/>", BLANC, 2)), "du maquillage");
  };

  ACC_NOM.montre = "une montre";
  ACC.montre = function () {
    return fiche(g(
      R(46, 10, 28, 24, 5, { fill: C.grisC }) +
      R(46, 86, 28, 24, 5, { fill: C.grisC }) +
      CI(60, 60, 24, { fill: C.orange }) +
      CI(60, 60, 17, { fill: C.creme }) +
      st("<path d=\"M60 60V48M60 60l9 6\"/>", NOIR, 3), C.orange), "une montre");
  };

  ACC_NOM.parapluie = "un parapluie";
  ACC.parapluie = function () {
    return fiche(
      P("M12 58 q12 -30 48 -30 t48 30 q-12 -10 -24 0 q-12 -10 -24 0 q-12 -10 -24 0 q-12 -10 -24 0 z",
        { fill: C.rouge, stroke: NOIR, "stroke-width": 3 }) +
      st("<path d=\"M60 28v66\"/>", C.marron, 5) +
      st("<path d=\"M60 94q10 0 10 10t-10 10\"/>", C.marron, 5), "un parapluie");
  };

  ACC_NOM["porte-cles"] = "un porte-clés";
  ACC["porte-cles"] = function () {
    return fiche(
      st("<circle cx=\"40\" cy=\"40\" r=\"14\"/>", C.grisC, 6) +
      st("<path d=\"M50 50l18 18\"/>", C.grisC, 5) +
      R(62, 62, 16, 34, 4, { fill: C.orange }) +
      CI(70, 88, 3, { fill: NOIR, stroke: "none" }), "un porte-clés");
  };

  ACC_NOM.portefeuille = "un portefeuille";
  ACC.portefeuille = function () {
    return fiche(g(
      R(14, 42, 92, 46, 6, { fill: C.marron }) +
      st("<path d=\"M14 58h92\"/>", NOIR, 2.5) +
      R(72, 50, 30, 18, 3, { fill: C.creme }) +
      CI(87, 59, 3.5, { fill: C.orange, stroke: "none" }), C.marron), "un portefeuille");
  };

  ACC_NOM["sac-dos"] = "un sac à dos";
  ACC["sac-dos"] = function () {
    return fiche(g(
      R(30, 40, 60, 66, 10, { fill: C.bleuC }) +
      st("<path d=\"M42 40V28a18 18 0 0 1 36 0v12\"/>", NOIR, 5) +
      R(40, 62, 40, 26, 5, { fill: C.bleu }) +
      R(54, 72, 12, 6, 2, { fill: C.orange, stroke: "none" }), C.bleuC), "un sac à dos");
  };

  ACC_NOM["sac-main"] = "un sac à main";
  ACC["sac-main"] = function () {
    return fiche(g(
      P("M30 52 h60 l8 52 H22 z", { fill: C.rouge }) +
      st("<path d=\"M42 52V38a18 18 0 0 1 36 0v14\"/>", NOIR, 5) +
      R(44, 68, 32, 18, 3, { fill: C.orange }) +
      CI(60, 77, 4, { fill: C.jaune, stroke: "none" }), C.rouge), "un sac à main");
  };

  ACC_NOM["sac-plage"] = "un sac de plage";
  ACC["sac-plage"] = function () {
    return fiche(g(
      P("M16 48 h88 l-8 52 H24 z", { fill: C.beige }) +
      st("<path d=\"M38 48V34a22 22 0 0 1 44 0v14\"/>", C.marron, 5) +
      st("<path d=\"M40 70h40M40 82h40\"/>", C.turquoise, 4), C.beige), "un sac de plage");
  };

  /* ======================================================================
     LES CHAUSSURES
     ====================================================================== */
  var CH = {};
  var CH_NOM = {};

  CH_NOM.bottes = "des bottes";
  CH.bottes = function () {
    return fiche(g(
      P("M40 12 h26 v56 q16 6 22 18 l2 14 H34 z", { fill: C.marron }) +
      R(30, 94, 60, 10, 4, { fill: NOIR }) +
      st("<path d=\"M40 30h26M40 44h26\"/>", C.creme, 2.5), C.marron), "des bottes");
  };

  CH_NOM.escarpins = "des escarpins";
  CH.escarpins = function () {
    return fiche(g(
      P("M28 76 h34 l18 -30 l6 4 l-14 44 H28 z", { fill: NOIR }) +
      P("M28 76 h34 l-2 18 H28 z", { fill: C.grisC }) +
      st("<path d=\"M74 50l8 -12\"/>", NOIR, 5), NOIR), "des escarpins");
  };

  CH_NOM.espadrilles = "des espadrilles";
  CH.espadrilles = function () {
    return fiche(g(
      P("M30 68 q6 -20 24 -20 t30 16 q6 8 6 18 v8 H24 z", { fill: C.beige }) +
      R(24, 90, 72, 12, 3, { fill: C.marron }), C.beige), "des espadrilles");
  };

  CH_NOM.pantoufles = "des pantoufles";
  CH.pantoufles = function () {
    return fiche(g(
      P("M24 84 q0 -30 26 -30 t26 30 z", { fill: C.rose }) +
      P("M70 84 q0 -24 18 -24 t14 24 z", { fill: C.violet }) +
      R(18, 84, 84, 10, 3, { fill: C.creme }), C.rose), "des pantoufles");
  };

  CH_NOM.sandales = "des sandales";
  CH.sandales = function () {
    return fiche(g(
      R(16, 84, 88, 10, 3, { fill: NOIR }) +
      P("M26 84 l24 -20 M94 84 L70 64", { fill: "none", stroke: C.orange, "stroke-width": 5, "stroke-linecap": "round" }) +
      P("M22 84 h36 v-4 h-36 z M62 84 h36 v-4 h-36 z", { fill: C.marron }), NOIR), "des sandales");
  };

  CH_NOM.souliers = "des souliers";
  CH.souliers = function () {
    return fiche(g(
      P("M16 82 h46 q2 -18 14 -24 l14 6 l14 12 v10 H16 z", { fill: NOIR }) +
      st("<path d=\"M62 58q-6 14 -4 26M74 64l8 8M82 70l8 8\"/>", C.creme, 3) +
      R(14, 88, 92, 10, 3, { fill: C.grisC }), NOIR), "des souliers");
  };

  /* ======================================================================
     Index
     ====================================================================== */
  var TOUS = {};
  function indexer(src, noms) {
    Object.keys(src).forEach(function (k) {
      TOUS[k] = { f: src[k], n: noms[k] || k };
    });
  }
  indexer(VET, VET_NOM);
  indexer(ACC, ACC_NOM);
  indexer(CH, CH_NOM);

  global.ART5 = {
    dessin: function (k) { return TOUS[k] ? TOUS[k].f() : ""; },
    nom: function (k) { return (TOUS[k] && TOUS[k].n) || k; },
    cles: Object.keys(TOUS)
  };
})(window);
