/* ==========================================================================
   Scènes d'action — « Les tâches » et « Les actions de la journée »
   --------------------------------------------------------------------------
   Commons n'a pas de photo des gestes du quotidien : « époussette » renvoie
   une image de microscope (la poussière spatiale), « tond le gazon » une
   enseigne de paysagisme, « balaie le plancher » une plaque de laboratoire,
   « se réveille » une gravure de 1862. Comme pour les vêtements, on dessine :
   l'objet et le geste, en aplats, sans détour par une photo inexploitable.
   ========================================================================== */
(function (global) {
  "use strict";

  var esc = global.ART2.esc;

  function T(tag, o) {
    var s = "<" + tag;
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] != null) {
        s += " " + k + '="' + o[k] + '"';
      }
    }
    return s + "/>";
  }
  function G(o, inner) {
    var s = "<g";
    for (var k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k) && o[k] != null) {
        s += " " + k + '="' + o[k] + '"';
      }
    }
    return s + ">" + inner + "</g>";
  }
  function P(d, o) { return T("path", Object.assign({ d: d }, o || {})); }
  function R(x, y, w, h, rx, o) {
    return T("rect", Object.assign({ x: x, y: y, width: w, height: h, rx: rx || 0 }, o || {}));
  }
  function CI(cx, cy, r, o) { return T("circle", Object.assign({ cx: cx, cy: cy, r: r }, o || {})); }
  function EL(cx, cy, rx, ry, o) {
    return T("ellipse", Object.assign({ cx: cx, cy: cy, rx: rx, ry: ry }, o || {}));
  }
  function ST(d, o) {
    return T("path", Object.assign({
      d: d, fill: "none", "stroke-width": 3, "stroke-linecap": "round"
    }, o || {}));
  }

  var NOIR = "#2b2b2b", BLANC = "#ffffff";
  var C = {
    gris: "#9aa5b1", grisC: "#6b7280", bois: "#a9673a", clair: "#eef3f7",
    vert: "#3f8f14", vertC: "#6aa84f", orange: "#ef7c1c", jaune: "#f2c14e",
    rouge: "#d63a2f", bleu: "#4a90d9", bleuC: "#2f6fb5", peau: "#f6d3b4",
    violet: "#8e44ad", turquoise: "#2ec4b6", brun: "#8d6b4a", creme: "#fdf6e8",
    terre: "#b08968"
  };

  function fiche(inner, label) {
    return T("svg", {
      "class": "art art-vet", viewBox: "0 0 120 120", role: "img", "aria-label": label
    }).replace("/>", ">") + inner + "</svg>";
  }

  /* sol commun : donne le point de vue « scène » plutôt que « objet » */
  function sol(h) {
    return R(0, h, 120, 120 - h, 0, { fill: C.clair });
  }

  /* ---- Les tâches ------------------------------------------------------ */
  var SCENES = {};

  SCENES["arrose-plantes"] = null; // la photo est bonne : pas de dessin

  SCENES["nettoie-litiere"] = function () {
    return fiche(
      sol(86) +
      G({ fill: C.gris }, R(20, 66, 80, 24, 4)) +
      R(24, 62, 72, 6, 2, { fill: C.grisC }) +
      P("M28 72 h64 l-8 10 H36 z", { fill: "#e8d9b8" }) +
      P("M88 44 l22 -12 l5 8 l-22 12 z", { fill: C.orange }) +
      R(92, 20, 26, 12, 3, { fill: C.grisC }) +
      P("M40 40 a6 6 0 1 0 0.1 0 z", { fill: C.bleu }) +
      P("M64 34 a6 6 0 1 0 0.1 0 z", { fill: C.bleu }) +
      P("M52 50 a6 6 0 1 0 0.1 0 z", { fill: C.bleu }),
      "Il nettoie la litière.");
  };

  SCENES["lave-linge"] = function () {
    return fiche(
      sol(92) +
      R(24, 26, 72, 66, 8, { fill: BLANC, stroke: NOIR, "stroke-width": 3 }) +
      CI(60, 58, 24, { fill: C.bleu, stroke: NOIR, "stroke-width": 3 }) +
      P("M40 66 q10 -16 20 0 t20 0", { fill: "none", stroke: BLANC, "stroke-width": 5 }) +
      P("M44 48 q8 -10 16 0", { fill: "none", stroke: "#cfe6f7", "stroke-width": 5 }) +
      R(32, 34, 20, 8, 2, { fill: C.grisC }) +
      CI(86, 38, 4, { fill: C.rouge, stroke: "none" }),
      "Elle lave le linge.");
  };

  SCENES.epoussette = function () {
    return fiche(
      sol(88) +
      R(28, 74, 64, 14, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 3 }) +
      R(22, 68, 76, 8, 3, { fill: C.creme, stroke: NOIR, "stroke-width": 3 }) +
      // plumes et traits de mouvement
      P("M32 66 l-4 -10 M44 64 l-3 -11 M56 63 l-2 -12 M68 64 l3 -12 M80 66 l4 -10",
        { fill: "none", stroke: C.jaune, "stroke-width": 3, "stroke-linecap": "round" }) +
      P("M30 50 l-8 -6 M40 46 l-8 -7 M78 50 l8 -6 M86 54 l8 -5",
        { fill: "none", stroke: C.gris, "stroke-width": 3, "stroke-linecap": "round" }),
      "Elle époussette.");
  };

  SCENES["nettoie-plancher"] = function () {
    return fiche(
      sol(90) +
      R(22, 62, 44, 28, 4, { fill: C.bleu, stroke: NOIR, "stroke-width": 3 }) +
      R(26, 68, 36, 6, 2, { fill: C.bleuC }) +
      ST("M64 56 l10 44", { stroke: C.bois, "stroke-width": 5 }) +
      R(64, 96, 30, 8, 3, { fill: C.creme, stroke: NOIR, "stroke-width": 3 }) +
      P("M92 70 q6 -6 10 0 t6 -2", { fill: "none", stroke: C.bleu, "stroke-width": 3 }),
      "Il nettoie le plancher.");
  };

  SCENES["tond-gazon"] = function () {
    return fiche(
      sol(72) +
      P("M0 72 h120 v48 H0 z", { fill: C.vertC }) +
      P("M8 90 l4 -10 M20 96 l4 -10 M34 88 l4 -10 M88 94 l4 -10 M100 88 l4 -10",
        { fill: "none", stroke: C.vert, "stroke-width": 3, "stroke-linecap": "round" }) +
      R(24, 48, 56, 22, 6, { fill: C.orange, stroke: NOIR, "stroke-width": 3 }) +
      R(76, 40, 26, 10, 4, { fill: C.grisC, stroke: NOIR, "stroke-width": 3 }) +
      CI(40, 74, 11, { fill: NOIR, stroke: BLANC, "stroke-width": 2 }) +
      CI(64, 74, 11, { fill: NOIR, stroke: BLANC, "stroke-width": 2 }) +
      ST("M84 58 q10 6 20 2", { stroke: C.gris, "stroke-width": 3 }),
      "Elle tond le gazon.");
  };

  SCENES["balaie-plancher"] = function () {
    return fiche(
      sol(92) +
      ST("M46 20 l14 56", { stroke: C.bois, "stroke-width": 5 }) +
      R(46, 72, 28, 10, 2, { fill: C.jaune, stroke: NOIR, "stroke-width": 3 }) +
      P("M52 84 l-2 10 M60 84 l0 10 M68 84 l2 10",
        { fill: "none", stroke: C.jaune, "stroke-width": 3, "stroke-linecap": "round" }) +
      CI(26, 84, 5, { fill: C.gris, stroke: "none" }) +
      CI(18, 92, 3.5, { fill: C.gris, stroke: "none" }) +
      CI(96, 88, 5, { fill: C.gris, stroke: "none" }) +
      ST("M84 74 q10 -4 18 2", { stroke: C.gris, "stroke-width": 2.5 }),
      "Il balaie le plancher.");
  };

  SCENES["plie-linge"] = function () {
    return fiche(
      sol(96) +
      R(24, 84, 72, 14, 3, { fill: C.bleu, stroke: NOIR, "stroke-width": 3 }) +
      R(30, 68, 60, 14, 3, { fill: BLANC, stroke: NOIR, "stroke-width": 3 }) +
      R(34, 52, 52, 14, 3, { fill: C.turquoise, stroke: NOIR, "stroke-width": 3 }) +
      ST("M38 59 h44M34 75h52M30 91h60", { stroke: C.gris, "stroke-width": 2 }) +
      // mains qui plient
      P("M22 48 a10 10 0 1 1 20 0 z", { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M78 48 a10 10 0 1 1 20 0 z", { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }),
      "Il plie le linge.");
  };

  /* ---- Les actions de la journée --------------------------------------- */
  SCENES.reveille = function () {
    return fiche(
      sol(96) +
      R(10, 62, 100, 34, 6, { fill: BLANC, stroke: NOIR, "stroke-width": 3 }) +
      R(6, 56, 34, 20, 6, { fill: C.creme, stroke: NOIR, "stroke-width": 3 }) +
      // tête qui se lève
      CI(78, 52, 15, { fill: C.peau, stroke: NOIR, "stroke-width": 3 }) +
      P("M63 56 q15 -8 30 0", { fill: "none", stroke: NOIR, "stroke-width": 2.5 }) +
      CI(74, 50, 2, { fill: NOIR, stroke: "none" }) +
      CI(83, 50, 2, { fill: NOIR, stroke: "none" }) +
      P("M74 57q4 3 8 0", { fill: "none", stroke: NOIR, "stroke-width": 2 }) +
      // réveil qui sonne
      CI(96, 40, 14, { fill: C.rouge, stroke: NOIR, "stroke-width": 3 }) +
      ST("M96 32 v8 M104 40 h8 M96 48 v-8 M88 40 h-8", { stroke: NOIR, "stroke-width": 3 }) +
      ST("M106 26 q8 6 4 14 M110 20 q14 10 6 22", { stroke: C.orange, "stroke-width": 3 }),
      "Elle se réveille.");
  };

  SCENES.habille = function () {
    return fiche(
      sol(100) +
      P("M40 24 l-14 8 l6 14 l8 -4 v42 h40 V42 l8 4 l6 -14 l-14 -8 l-8 -6 H48 z",
        { fill: C.bleu, stroke: NOIR, "stroke-width": 3 }) +
      // flèche : le vêtement se met sur la personne
      ST("M78 34 q22 8 16 28", { stroke: C.orange, "stroke-width": 4 }) +
      P("M88 60 l8 4 l-4 8 z", { fill: C.orange }) +
      CI(24, 30, 10, { fill: C.peau, stroke: NOIR, "stroke-width": 2.5 }) +
      P("M22 46 q-2 18 4 26 M26 46 q0 20 6 26", { fill: "none", stroke: NOIR, "stroke-width": 2.5 }),
      "Elle s’habille.");
  };

  SCENES["retourne-maison"] = function () {
    return fiche(
      sol(96) +
      R(24, 16, 72, 80, 4, { fill: C.creme, stroke: NOIR, "stroke-width": 3 }) +
      R(34, 26, 52, 44, 3, { fill: C.bois, stroke: NOIR, "stroke-width": 3 }) +
      CI(76, 50, 4, { fill: C.orange, stroke: "none" }) +
      // sac à dos posé
      R(14, 62, 24, 28, 5, { fill: C.rouge, stroke: NOIR, "stroke-width": 2.5 }) +
      R(20, 70, 12, 10, 2, { fill: "#e07a6f" }) +
      // clé dans la serrure
      ST("M96 62 l12 0 M108 62 l0 8", { stroke: C.jaune, "stroke-width": 4 }) +
      // flèche vers la porte
      ST("M100 24 q12 6 10 20", { stroke: C.vertC, "stroke-width": 3 })
    , "Elle retourne à la maison.");
  };

  var OUT = {};
  Object.keys(SCENES).forEach(function (k) {
    if (SCENES[k]) OUT[k] = SCENES[k];
  });

  global.ART6 = {
    a: function (k) { return OUT[k] ? OUT[k]() : ""; },
    cles: Object.keys(OUT)
  };
})(window);
