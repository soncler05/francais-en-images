/* ==========================================================================
   Illustrations vectorielles — pages 11, 12, 17, 18 et 19
     · Ma famille          → avatars
     · Les sentiments      → le même visage, d'autres expressions
     · Le corps            → schéma cliquable
     · Les contraires      → deux icônes côte à côte
     · Les problèmes de santé → pictogrammes
   ========================================================================== */
(function (global) {
  "use strict";

  var face = global.FACE;
  var esc = global.ART2.esc;
  var shade = global.ART2.shade;

  function wrap(inner, vb, label, cls) {
    return '<svg class="art ' + (cls || "") + '" viewBox="' + (vb || "0 0 120 120") +
      '" role="img" aria-label="' + esc(label || "") + '">' + inner + '</svg>';
  }

  /* ======================================================================
     MA FAMILLE
     ====================================================================== */
  var FAMILLE = {
    "grand-pere": { label: "mon grand-père", o: { skin: "#eebb99", hair: "#c9c9c9", style: "court", brow: "mou", eye: "riants", mouth: "sourire", glasses: true, bg: "#e8f1d8" } },
    "grand-mere": { label: "ma grand-mère", o: { skin: "#f2cba8", hair: "#d5d5d5", style: "boucle", brow: "neutre", eye: "riants", mouth: "sourire", glasses: true, bg: "#f6e6f0" } },
    "pere":       { label: "mon père", o: { skin: "#e5b189", hair: "#4a3322", style: "court", brow: "neutre", eye: "ouverts", mouth: "sourire", beard: true, bg: "#dcebf5" } },
    "mere":       { label: "ma mère", o: { skin: "#f2cba8", hair: "#b8792f", style: "long", brow: "neutre", eye: "riants", mouth: "grand-sourire", blush: true, bg: "#fdecd9" } },
    "oncle":      { label: "mon oncle", o: { skin: "#8d5a34", hair: "#2a1d14", style: "court-f", brow: "neutre", eye: "ouverts", mouth: "sourire", beard: true, bg: "#e6efe0" } },
    "tante":      { label: "ma tante", o: { skin: "#d9a173", hair: "#3a2a1c", style: "queue", brow: "neutre", eye: "riants", mouth: "sourire", bg: "#f3e8f8" } },
    "frere":      { label: "mon frère", o: { skin: "#f2cba8", hair: "#d9b26a", style: "court", brow: "leve", eye: "grands", mouth: "grand-rire", bg: "#fff4d6" } },
    "moi":        { label: "moi", o: { skin: "#f2cba8", hair: "#6b4423", style: "frange", brow: "neutre", eye: "ouverts", mouth: "sourire", bg: "#e6f4ea" } },
    "soeur":      { label: "ma sœur", o: { skin: "#f6d3b4", hair: "#d9b26a", style: "queue2", brow: "leve", eye: "riants", mouth: "grand-rire", blush: true, bg: "#fdeaf1" } },
    "cousin":     { label: "mon cousin", o: { skin: "#b87c4e", hair: "#2a1d14", style: "court", brow: "neutre", eye: "riants", mouth: "sourire", freckles: true, bg: "#e9f0e2" } },
    "cousine":    { label: "ma cousine", o: { skin: "#8d5a34", hair: "#221c17", style: "boucle", brow: "neutre", eye: "riants", mouth: "grand-sourire", bg: "#f0e8f8" } }
  };

  function avatar(key) {
    var f = FAMILLE[key];
    return face(f.o);
  }

  /* ======================================================================
     LES SENTIMENTS ET LES SENSATIONS
     ====================================================================== */
  var SENTIMENTS = {
    "avoir-chaud":  { label: "avoir chaud", o: { skin: "#f2cba8", hair: "#d9b26a", style: "queue2", brow: "mou", eye: "endormis", mouth: "ouverte", sweat: true, bg: "#f9c9a0" } },
    "avoir-faim":    { label: "avoir faim", o: { skin: "#f2cba8", hair: "#b8792f", style: "frange", brow: "leve", eye: "regard", mouth: "bouche-e", bulles: "faim", bg: "#fdf0d5" } },
    "avoir-froid":   { label: "avoir froid", o: { skin: "#dcebf5", hair: "#4a3322", style: "court", brow: "mou", eye: "fermes", mouth: "triste", bg: "#bcd9ee" } },
    "avoir-hate":    { label: "avoir hâte", o: { skin: "#eebb99", hair: "#221c17", style: "court-f", brow: "leve", eye: "grands", mouth: "grand-rire", sweat: true, bg: "#ffe2b8" } },
    "avoir-peur":    { label: "avoir peur", o: { skin: "#f2cba8", hair: "#4a3322", style: "long", brow: "leve", eye: "grands", mouth: "ouverte", sweat: true, bg: "#ded6f0" } },
    "avoir-raison":  { label: "avoir raison", o: { skin: "#e5b189", hair: "#6b4423", style: "court", brow: "leve", eye: "un", mouth: "sourire", bg: "#dcefe0" } },
    "avoir-soif":    { label: "avoir soif", o: { skin: "#d9a173", hair: "#221c17", style: "queue", brow: "mou", eye: "regard", mouth: "bouche-e", bulles: "soif", bg: "#cfe6f5" } },
    "avoir-sommeil": { label: "avoir sommeil", o: { skin: "#f2cba8", hair: "#6b4423", style: "court", brow: "mou", eye: "endormis", mouth: "bouche-e", zzz: true, bg: "#e2e0f5" } },
    "amoureux":      { label: "être amoureux", o: { skin: "#f6d3b4", hair: "#8d5a34", style: "court-f", brow: "leve", eye: "riants", mouth: "grand-sourire", blush: true, bg: "#fbd9e2" } },
    "content":        { label: "être content", o: { skin: "#eebb99", hair: "#4a3322", style: "court", brow: "neutre", eye: "riants", mouth: "grand-sourire", bg: "#dcefe0" } },
    "fache":         { label: "être fâché", o: { skin: "#f2cba8", hair: "#c1440e", style: "court-f", brow: "fache", eye: "faches", mouth: "fache", bg: "#f7cfc4" } },
    "fatigue":       { label: "être fatigué", o: { skin: "#e5b189", hair: "#2a1d14", style: "frange", brow: "mou", eye: "endormis", mouth: "neutre", bg: "#dfe4ec" } },
    "heureux":       { label: "être heureux", o: { skin: "#8d5a34", hair: "#221c17", style: "boucle", brow: "leve", eye: "riants", mouth: "grand-rire", blush: true, bg: "#fde9b0" } },
    "malade":        { label: "être malade", o: { skin: "#e0e4c8", hair: "#6b4423", style: "court", brow: "triste", eye: "endormis", mouth: "malade", sweat: true, bg: "#e6eccd" } },
    "timide":        { label: "être timide", o: { skin: "#f2cba8", hair: "#d9b26a", style: "long", brow: "triste", eye: "un", mouth: "neutre", blush: true, bg: "#fdeaf1" } },
    "triste":        { label: "être triste", o: { skin: "#f6d3b4", hair: "#c1440e", style: "court-f", brow: "triste", eye: "tristes", mouth: "triste", tears: true, bg: "#cfd8ea" } }
  };

  function sentiment(key) {
    return face(SENTIMENTS[key].o);
  }

  /* ======================================================================
     LE CORPS — schéma avec pastilles numérotées
     ====================================================================== */
  var CORPS = [
    ["cheveux", "les cheveux", 70, 22],
    ["sourcil", "le sourcil", 60, 38],
    ["oeil", "l’œil", 60, 46],
    ["oreille", "l’oreille", 43, 54],
    ["nez", "le nez", 70, 58],
    ["joue", "la joue", 55, 61],
    ["bouche", "la bouche", 70, 70],
    ["langue", "la langue", 70, 78],
    ["epaule", "l’épaule", 44, 98],
    ["bras", "le bras", 33, 140],
    ["coude", "le coude", 32, 168],
    ["doigt", "le doigt", 26, 196],
    ["main", "la main", 34, 209],
    ["ventre", "le ventre", 70, 145],
    ["jambe", "la jambe", 59, 250],
    ["genou", "le genou", 59, 270],
    ["pied", "le pied", 58, 330],
    ["talon", "le talon", 44, 336],
    ["orteil", "l’orteil", 70, 336]
  ];

  var DOIGTS = ["auriculaire", "annulaire", "majeur", "index", "pouce"];

  var PEAU = "#f6d3b4", trait = "#d9a173";

  /** Une pastille numérotée, reliée à une partie du schéma. */
  function point(part, n, x, y) {
    return '<g class="point" data-part="' + part + '">' +
      '<circle cx="' + x + '" cy="' + y + '" r="7.5" fill="#ef7c1c"/>' +
      '<text x="' + x + '" y="' + (y + 3.8) + '" text-anchor="middle" ' +
      'font-family="Arial,sans-serif" font-size="9.5" font-weight="700" fill="#fff">' +
      n + '</text></g>';
  }

  function corps() {
    var s = '<svg class="corps" viewBox="0 0 140 400" role="img" ' +
      'aria-label="Schéma du corps humain">' +
      '<rect width="140" height="400" fill="#fbfdf7"/>';

    s += '<g fill="' + PEAU + '" stroke="' + trait + '" stroke-width="2" ' +
      'stroke-linejoin="round">';
    // tête, cou
    s += '<ellipse cx="70" cy="48" rx="27" ry="31"/>';
    s += '<path d="M63 72h14v20H63z"/>';
    // torse : plus étroit que les épaules ne le suggèrent
    s += '<path d="M46 92h48a8 8 0 0 1 8 8v80a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8v-80a8 8 0 0 1 8-8z"/>';
    // bras : le long du torse, déhanchés
    s += '<path d="M42 96c-9 1-14 7-14 15v74c0 8 5 13 11 13s11-5 11-13v-74c0-8-3-14-8-15z"/>';
    s += '<path d="M98 96c9 1 14 7 14 15v74c0 8-5 13-11 13s-11-5-11-13v-74c0-8 3-14 8-15z"/>';
    // mains
    s += '<ellipse cx="35" cy="205" rx="10" ry="13"/>';
    s += '<ellipse cx="105" cy="205" rx="10" ry="13"/>';
    // jambes
    s += '<path d="M50 188h18v132H50z"/>';
    s += '<path d="M72 188h18v132H72z"/>';
    // pieds
    s += '<path d="M46 320h26a6 6 0 0 1 6 6v14a5 5 0 0 1-5 5H46z"/>';
    s += '<path d="M72 320h26a5 5 0 0 1 5 5v14a6 6 0 0 1-6 6H72z"/>';
    s += '</g>';

    // visage
    s += '<circle cx="61" cy="46" r="3.2" fill="#3a2a1c"/><circle cx="79" cy="46" r="3.2" fill="#3a2a1c"/>';
    s += '<path d="M58 38h7M75 38h7" stroke="#3a2a1c" stroke-width="2.2" stroke-linecap="round"/>';
    s += '<path d="M66 58h8" stroke="' + trait + '" stroke-width="2.2" stroke-linecap="round"/>';
    s += '<path d="M62 70q8 7 16 0" stroke="#a8503c" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    s += '<path d="M64 78q6 5 12 0" stroke="#d0634f" stroke-width="2" fill="none" stroke-linecap="round"/>';

    // doigts des mains et des pieds
    s += '<g stroke="' + trait + '" stroke-width="1.5" stroke-linecap="round">' +
      '<path d="M31 200v10M35 198v12M39 200v10M101 200v10M105 198v12M109 200v10"/>' +
      '<path d="M52 322v11M57 322v13M62 322v11M78 322v11M83 322v13M88 322v11"/>' +
      '</g>';

    CORPS.forEach(function (c, i) {
      s += point(c[0], i + 1, c[2], c[3]);
    });
    return s + '</svg>';
  }

  /** La main de face : les cinq doigts sont numérotés de gauche à droite. */
  function main() {
    var s = '<svg class="main" viewBox="0 0 140 140" role="img" ' +
      'aria-label="La main, les cinq doigts numérotés">' +
      '<rect width="140" height="140" fill="#fbfdf7"/>';
    s += '<g fill="' + PEAU + '" stroke="' + trait + '" stroke-width="2" ' +
      'stroke-linejoin="round">' +
      '<rect x="26" y="74" width="86" height="58" rx="10"/>' +
      '<rect x="26" y="34" width="16" height="46" rx="8"/>' +    // auriculaire
      '<rect x="46" y="22" width="16" height="58" rx="8"/>' +    // annulaire
      '<rect x="66" y="14" width="17" height="66" rx="8"/>' +    // majeur
      '<rect x="87" y="26" width="16" height="54" rx="8"/>' +    // index
      '<path d="M104 76c15-4 23 5 20 15-2 10-14 12-22 8z"/>' + // pouce
      '</g>';
    var xs = [34, 54, 74, 95, 117], ys = [50, 42, 36, 44, 92];
    DOIGTS.forEach(function (n, i) {
      s += point("doigt-" + n, i + 1, xs[i], ys[i]);
    });
    return s + '</svg>';
  }


  function main() {
    var s = '<svg class="main" viewBox="0 0 130 130" role="img" aria-label="La main">' +
      '<rect width="130" height="130" fill="#fbfdf7"/>' +
      '<g fill="#f6d3b4" stroke="#d9a173" stroke-width="1.5">' +
      '<path d="M30 118h70V70a8 8 0 0 0-8-8h-8V30a7 7 0 0 0-14 0v32H62V22a7 7 0 0 0-14 0v40H40V32a7 7 0 0 0-14 0v78a8 8 0 0 0 8 8z"/>' +
      '</g>';
    var xs = [53, 55, 47, 39, 31], names = ["majeur", "index", "annulaire", "auriculaire", "pouce"];
    xs.forEach(function (x, i) {
      var y = [48, 42, 56, 70, 84][i];
      s += '<g class="point" data-part="' + names[i] + '">' +
        '<circle cx="' + x + '" cy="' + y + '" r="8" fill="#ef7c1c"/>' +
        '<text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" ' +
        'font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#fff">' +
        (i + 1) + "</text></g>";
    });
    return s + "</svg>";
  }

  /* ======================================================================
     LES CONTRAIRES — deux petites scènes par paire
     ====================================================================== */
  var ICON = {};

  ICON.clair = function (c) {
    return '<circle cx="30" cy="30" r="13" fill="#f4b942"/>' +
      '<g stroke="#f4b942" stroke-width="3.5" stroke-linecap="round">' +
      '<path d="M30 8v-6M30 58v-6M8 30H2M58 30h-6M14 14l-4-4M50 50l-4-4M46 14l4-4M10 50l4-4"/></g>';
  };
  ICON.sombre = function () {
    return '<path d="M40 14a18 18 0 1 0 8 26 22 22 0 0 1-8-26z" fill="#3f4a6b"/>' +
      '<circle cx="16" cy="16" r="2" fill="#c3c9e0"/><circle cx="46" cy="20" r="2" fill="#c3c9e0"/>';
  };
  ICON.drole = function () {
    return '<circle cx="30" cy="30" r="20" fill="#ffd93b"/>' +
      '<path d="M16 26q6-8 12 0M32 26q6-8 12 0" stroke="#8a6d1f" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M18 32q12 16 24 0z" fill="#c25346"/>';
  };
  ICON.ennuyeux = function () {
    return '<circle cx="30" cy="30" r="20" fill="#c9cdd4"/>' +
      '<path d="M18 28h10M32 28h10" stroke="#6b7280" stroke-width="3" stroke-linecap="round"/>' +
      '<ellipse cx="44" cy="36" rx="7" ry="9" fill="#6b7280"/>' +
      '<path d="M20 40q10-5 20 0" stroke="#6b7280" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  };
  ICON.court = function () {
    return '<rect x="8" y="26" width="44" height="8" rx="3" fill="#8a6d1f"/>' +
      '<rect x="8" y="26" width="16" height="26" rx="3" fill="#ef7c1c"/>';
  };
  ICON.long = function () {
    return '<rect x="4" y="26" width="52" height="8" rx="3" fill="#8a6d1f"/>' +
      '<rect x="4" y="26" width="46" height="26" rx="3" fill="#3f8f14"/>';
  };
  ICON.facile = function () {
    return '<path d="M4 44h52" stroke="#6aa84f" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M4 44q14-6 26 0t22-4" stroke="#3f8f14" stroke-width="5" fill="none" stroke-linecap="round"/>';
  };
  ICON.difficile = function () {
    return '<path d="M4 46l14-8 10 4 12-26 12 30H4z" fill="#8d8d8d"/>' +
      '<circle cx="52" cy="20" r="4" fill="#ef7c1c"/>';
  };
  ICON.fort = function () {
    return '<rect x="6" y="27" width="9" height="11" rx="2" fill="#4a4a4a"/>' +
      '<rect x="45" y="27" width="9" height="11" rx="2" fill="#4a4a4a"/>' +
      '<rect x="8" y="31" width="44" height="3" rx="1.5" fill="#8d8d8d"/>' +
      '<rect x="20" y="19" width="20" height="15" rx="3" fill="#c0392b"/>' +
      '<rect x="24" y="22" width="12" height="9" rx="2" fill="#e2574c"/>';
  };
  ICON.faible = function () {
    return '<path d="M30 54V30" stroke="#6aa84f" stroke-width="3"/>' +
      '<path d="M30 30c-12 0-16-10-12-18 8 2 12 8 12 18z" fill="#8fbf6a"/>' +
      '<path d="M30 34c10 0 14-8 10-16-6 2-10 8-10 16z" fill="#a8d08a"/>' +
      '<path d="M30 54c-8 0-12 4-12 4h24s-4-4-12-4z" fill="#c9a227"/>';
  };
  ICON.grand = function () {
    return '<rect x="20" y="12" width="20" height="40" fill="#8d6b4a"/>' +
      '<rect x="16" y="8" width="28" height="8" rx="2" fill="#6b533a"/>' +
      '<rect x="26" y="22" width="8" height="11" fill="#ffd23f"/>' +
      '<rect x="17" y="40" width="9" height="12" fill="#8d6b4a"/><rect x="34" y="40" width="9" height="12" fill="#8d6b4a"/>';
  };
  ICON.petit = function () {
    return '<path d="M20 48h22l-3-20H23z" fill="#c9a227"/>' +
      '<path d="M29 28l-6-10 10 4 6-6-2 14z" fill="#8d6b4a"/>' +
      '<rect x="23" y="48" width="7" height="8" fill="#8d6b4a"/><rect x="32" y="48" width="7" height="8" fill="#8d6b4a"/>';
  };
  // « gros / petit » se dit aussi d'un objet : deux ballons, deux tailles
  ICON.gros = function () {
    return '<circle cx="30" cy="30" r="23" fill="#e2574c"/>' +
      '<ellipse cx="22" cy="22" rx="7" ry="5" fill="#fff" opacity=".45"/>';
  };
  ICON["petit-bis"] = function () {
    return '<circle cx="30" cy="34" r="11" fill="#4a90d9"/>' +
      '<ellipse cx="26" cy="30" rx="4" ry="3" fill="#fff" opacity=".5"/>';
  };
  ICON.haut = function () {
    return '<path d="M8 10h40v6H8z" fill="#4a90d9"/>' +
      '<path d="M40 16l8 28H34z" fill="#7fb3e8"/>' +
      '<path d="M6 50h50" stroke="#8d8d8d" stroke-width="4" stroke-linecap="round"/>';
  };
  ICON.bas = function () {
    return '<path d="M8 44h40v6H8z" fill="#4a90d9"/>' +
      '<path d="M40 44l8-24H34z" fill="#7fb3e8"/>' +
      '<path d="M6 50h50" stroke="#8d8d8d" stroke-width="4" stroke-linecap="round"/>';
  };
  ICON.lent = function () {
    return '<path d="M12 44c0-10 8-18 18-18h10a8 8 0 0 0 0-16H26" stroke="#8fbf6a" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      '<circle cx="44" cy="14" r="5" fill="#8fbf6a"/>' +
      '<path d="M6 50h50" stroke="#c8a06a" stroke-width="4" stroke-linecap="round"/>';
  };
  ICON.vite = function () {
    return '<path d="M6 44c8-2 12-8 16-14s8-10 14-10h10l6 8-10 4 4 8H30l-6-8-8 12z" fill="#e08a2e"/>' +
      '<path d="M4 50h52" stroke="#c8a06a" stroke-width="4" stroke-linecap="round"/>';
  };
  ICON.lourd = function () {
    return '<path d="M10 34h40v12H10z" fill="#6b7280"/>' +
      '<path d="M16 34c0-10 6-16 14-16s14 6 14 16z" fill="#8d95a3"/>' +
      '<rect x="20" y="46" width="8" height="8" fill="#6b7280"/><rect x="32" y="46" width="8" height="8" fill="#6b7280"/>';
  };
  ICON.leger = function () {
    return '<path d="M30 8c8 10 12 18 12 24a12 12 0 0 1-24 0c0-6 4-14 12-24z" fill="#cfd8e3"/>' +
      '<path d="M30 20v24" stroke="#aab6c6" stroke-width="2.5"/>';
  };
  ICON.proche = function () {
    return '<rect x="12" y="22" width="18" height="30" fill="#4a90d9"/>' +
      '<rect x="32" y="22" width="18" height="30" fill="#7fb3e8"/>';
  };
  ICON.loin = function () {
    return '<rect x="6" y="22" width="12" height="30" fill="#4a90d9"/>' +
      '<rect x="44" y="22" width="12" height="30" fill="#7fb3e8"/>' +
      '<path d="M22 37h18" stroke="#8d8d8d" stroke-width="3" stroke-dasharray="4 4"/>';
  };
  ICON.propre = function () {
    return '<rect x="16" y="12" width="28" height="38" rx="5" fill="#bfe6f7" stroke="#4a90d9" stroke-width="2.5"/>' +
      '<path d="M20 40l7 7 11-15" stroke="#2f8f5b" stroke-width="4" fill="none" ' +
      'stroke-linecap="round" stroke-linejoin="round"/>';
  };
  ICON.sale = function () {
    return '<rect x="16" y="12" width="28" height="38" rx="5" fill="#9aa08a"/>' +
      '<ellipse cx="26" cy="26" rx="6" ry="4.5" fill="#6b5f3e" transform="rotate(-20 26 26)"/>' +
      '<ellipse cx="35" cy="38" rx="7" ry="5" fill="#6b5f3e" transform="rotate(15 35 38)"/>' +
      '<circle cx="36" cy="22" r="3" fill="#6b5f3e"/><circle cx="24" cy="40" r="3" fill="#6b5f3e"/>';
  };
  ICON.vide = function () {
    return '<path d="M18 12h26l-4 40H22z" fill="none" stroke="#9aa5b1" stroke-width="3"/>' +
      '<path d="M19 16h24" stroke="#9aa5b1" stroke-width="2"/>';
  };
  ICON.plein = function () {
    return '<path d="M18 12h26l-4 40H22z" fill="#7fb3e8" stroke="#4a90d9" stroke-width="3"/>' +
      '<path d="M20 30h22" stroke="#fff" stroke-width="3" opacity=".7"/>';
  };
  ICON.vieux = function () {
    return '<path d="M10 40c8 2 14-1 20-8 5-6 10-8 15-4 4 4 1 11-5 15-8 5-18 7-28 6z" fill="#8d6b4a"/>' +
      '<path d="M18 40c4-4 8-8 12-12M26 40c3-3 6-6 9-8" stroke="#5d4630" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M12 46h26" stroke="#5d4630" stroke-width="3" stroke-linecap="round" opacity=".5"/>';
  };
  ICON.neuf = function () {
    return '<path d="M10 40c8 2 14-1 20-8 5-6 10-8 15-4 4 4 1 11-5 15-8 5-18 7-28 6z" fill="#d63a2f"/>' +
      '<path d="M16 42c5-5 10-10 16-14" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M12 46h26" stroke="#a11" stroke-width="3" stroke-linecap="round" opacity=".35"/>';
  };

  // « laid » est une caricature, pas une photo de quelqu'un : visage asymétrique,
  // gros nez, sourire de travers.
  ICON.laid = function () {
    return '<ellipse cx="30" cy="31" rx="23" ry="24" fill="#d9c39a"/>' +
      '<path d="M8 26c0-14 10-20 22-20s22 6 22 20c0-6-3-11-7-13-6 4-10 6-15 6s-9-2-15-6c-4 2-7 7-7 13z" fill="#6b6b6b"/>' +
      '<ellipse cx="21" cy="31" rx="6" ry="5" fill="#fff"/>' +
      '<ellipse cx="39" cy="30" rx="4" ry="5" fill="#fff"/>' +
      '<circle cx="21" cy="31" r="2.6" fill="#3a2a1c"/><circle cx="39" cy="31" r="2" fill="#3a2a1c"/>' +
      '<path d="M13 26l12-3M36 25l11 2" stroke="#4a4a4a" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M30 30c4 2 4 9 0 11-4-2-4-9 0-11z" fill="#c98d5e"/>' +
      '<path d="M20 46q6 6 12 1t8-2" stroke="#a8503c" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M26 46v5M32 46.5v5" stroke="#fff" stroke-width="2"/>';
  };
  ICON.belle = function () {
    return face({ skin: "#f6d3b4", hair: "#b8792f", style: "long", brow: "leve",
      eye: "riants", mouth: "grand-sourire", blush: true, bg: "transparent" });
  };

  // Les quinze paires de la page 11 du livre. « petit » apparaît deux fois
  // (grand/petit puis gros/petit) : la seconde occurrence a sa propre clé.
  var CONTRAIRES = [
    ["clair", "sombre"], ["drole", "ennuyeux"], ["court", "long"],
    ["facile", "difficile"], ["fort", "faible"], ["grand", "petit"],
    ["gros", "petit-bis"], ["haut", "bas"], ["laid", "belle"],
    ["lent", "vite"], ["lourd", "leger"], ["proche", "loin"],
    ["propre", "sale"], ["vide", "plein"], ["vieux", "neuf"]
  ];

  var CONTRAIRE_NOM = {
    clair: "clair", sombre: "sombre", drle: "drôle", ennuyeux: "ennuyeux",
    court: "court", long: "long", facile: "facile", difficile: "difficile",
    fort: "fort", faible: "faible", grand: "grand", petit: "petit",
    gros: "gros", "petit-bis": "petit", haut: "haut", bas: "bas",
    laid: "laid", belle: "belle", lent: "lent", vite: "vite",
    lourd: "lourd", leger: "léger", proche: "proche", loin: "loin",
    propre: "propre", sale: "sale", vide: "vide", plein: "plein",
    vieux: "vieux", neuf: "neuf", drole: "drôle"
  };

  function contraireIcon(key) {
    var f = ICON[key];
    return wrap(f ? f() : "", "0 0 60 60", key, "art-mini");
  }

  /* « laid / belle » sont définis avec « vieux / neuf », ci-dessus. */

  /* ======================================================================
     LES PROBLÈMES DE SANTÉ — pictogrammes, jamais de photos de gens
     ====================================================================== */
  function S() { return '<g stroke="#c0392b" stroke-width="3" fill="none" ' +
    'stroke-linecap="round" stroke-linejoin="round">'; }
  function SE() { return "</g>"; }

  var SANTE = {
    coupure: function () {
      return wrap('<ellipse cx="60" cy="60" rx="42" ry="30" fill="#f6d3b4"/>' +
        '<path d="M30 52l40 20" stroke="#d63a2f" stroke-width="5" stroke-linecap="round"/>' +
        '<rect x="42" y="44" width="20" height="14" rx="3" transform="rotate(27 52 51)" fill="#f6e0a8"/>' +
        '<circle cx="34" cy="48" r="3.5" fill="#d63a2f"/><circle cx="66" cy="76" r="3.5" fill="#d63a2f"/>',
        "0 0 120 120", "une coupure");
    },
    fievre: function () {
      return wrap('<rect x="52" y="14" width="16" height="72" rx="8" fill="#fff" stroke="#8d8d8d" stroke-width="3"/>' +
        '<rect x="52" y="56" width="16" height="34" rx="8" fill="#d63a2f"/>' +
        '<circle cx="60" cy="92" r="14" fill="#d63a2f"/><circle cx="60" cy="92" r="6" fill="#fff"/>' +
        '<path d="M30 30h8M30 44h8" stroke="#ef7c1c" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M82 30h8M82 44h8" stroke="#ef7c1c" stroke-width="4" stroke-linecap="round"/>',
        "0 0 120 120", "de la fièvre");
    },
    "mal-dent": function () {
      return wrap('<path d="M36 26h48a6 6 0 0 1 6 6v14c0 10-8 14-12 22-3 6-3 20-8 26-3 4-7 2-8-6-1-8-2-12-4-12s-3 4-4 12c-1 8-5 10-8 6-5-6-5-20-8-26-4-8-12-12-12-22V32a6 6 0 0 1 6-6z" fill="#fff" stroke="#8d8d8d" stroke-width="3"/>' +
        '<circle cx="74" cy="46" r="9" fill="none" stroke="#d63a2f" stroke-width="3.5"/>' +
        '<path d="M80 52l6 6" stroke="#d63a2f" stroke-width="3.5" stroke-linecap="round"/>',
        "0 0 120 120", "un mal de dent");
    },
    "mal-gorge": function () {
      return wrap('<path d="M60 16v22" stroke="#f6d3b4" stroke-width="22" stroke-linecap="round"/>' +
        '<ellipse cx="60" cy="66" rx="22" ry="18" fill="#e8a0a0"/>' +
        '<path d="M50 62q10-6 20 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
        S() + '<path d="M92 20v34"/><path d="M84 28l8-8 8 8"/>' + SE() +
        '<path d="M28 20v34" stroke="#4a90d9" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M22 28l6-8 6 8" stroke="#4a90d9" stroke-width="3" fill="none" stroke-linecap="round"/>',
        "0 0 120 120", "un mal de gorge");
    },
    "mal-tete": function () {
      return wrap('<circle cx="60" cy="60" r="34" fill="#f6d3b4"/>' +
        S() + '<path d="M60 20l6 16h14l-11 10 4 16-13-9-13 9 4-16-11-10h14z"/>' + SE() +
        '<path d="M96 26l8-6M102 40l9-1M24 26l-8-6M18 40l-9-1" stroke="#ef7c1c" stroke-width="3.5" stroke-linecap="round"/>',
        "0 0 120 120", "un mal de tête");
    },
    "mal-ventre": function () {
      return wrap('<path d="M60 18c18 0 30 14 30 32 0 20-10 44-30 54-20-10-30-34-30-54 0-18 12-32 30-32z" fill="#f6d3b4"/>' +
        '<path d="M44 62q8-10 16 0t16 0" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        '<path d="M46 80q7-9 14 0t14 0" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        S() + '<path d="M24 30l-6-6M96 30l6-6"/>' + SE(),
        "0 0 120 120", "un mal de ventre");
    },
    "nez-bouche": function () {
      return wrap('<circle cx="60" cy="60" r="32" fill="#f6d3b4"/>' +
        '<circle cx="40" cy="66" r="9" fill="#e2574c"/><circle cx="80" cy="66" r="9" fill="#e2574c"/>' +
        '<path d="M44 42q6 8 12 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
        '<path d="M64 42q6 8 12 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
        '<path d="M30 26l6-8M90 26l-6-8" stroke="#4a90d9" stroke-width="3.5" stroke-linecap="round"/>',
        "0 0 120 120", "un nez bouché");
    },
    piqure: function () {
      return wrap('<ellipse cx="46" cy="70" rx="28" ry="22" fill="#f6d3b4"/>' +
        '<path d="M74 44l22-22" stroke="#5a4a3a" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="98" cy="20" r="8" fill="#5a4a3a"/>' +
        '<path d="M92 26l-5 5M98 30l-5 5" stroke="#5a4a3a" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="46" cy="70" r="7" fill="#d63a2f"/>' +
        '<path d="M40 64q6-4 12 0" stroke="#f6d3b4" stroke-width="2" fill="none"/>',
        "0 0 120 120", "une piqûre");
    },
    rhume: function () {
      return wrap('<rect x="34" y="26" width="34" height="68" rx="8" fill="#fff" stroke="#8d8d8d" stroke-width="3"/>' +
        '<path d="M46 26v68M56 26v68" stroke="#d8d8d8" stroke-width="2"/>' +
        '<circle cx="51" cy="94" r="11" fill="#e8e8e8" stroke="#8d8d8d" stroke-width="2.5"/>' +
        S() + '<path d="M84 24q8 10 0 14t0 14"/><path d="M96 20q10 12 0 17t0 17"/>' + SE(),
        "0 0 120 120", "un rhume");
    },
    "rhume-foins": function () {
      return wrap('<path d="M60 100V44" stroke="#6aa84f" stroke-width="5"/>' +
        '<path d="M60 52q-14-6-16-20 14 2 16 20zM60 52q14-6 16-20-14 2-16 20z" fill="#6aa84f"/>' +
        '<path d="M60 34q-10-4-12-14 10 2 12 14zM60 34q10-4 12-14-10 2-12 14z" fill="#8fbf6a"/>' +
        S() + '<path d="M92 26q10 12 0 18t0 18"/><path d="M100 20q12 14 0 21t0 21"/>' + SE(),
        "0 0 120 120", "un rhume des foins");
    },
    toux: function () {
      return wrap('<circle cx="52" cy="66" r="30" fill="#f6d3b4"/>' +
        '<path d="M38 56q8-8 16 0" stroke="#c0392b" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
        '<path d="M44 74q8 10 16 0" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>' +
        S() + '<path d="M86 44h12a6 6 0 0 1 0 12H86z"/><path d="M88 60h14a6 6 0 0 1 0 12H88z"/>' + SE(),
        "0 0 120 120", "une toux");
    },
    rougeur: function () {
      return wrap('<circle cx="60" cy="60" r="34" fill="#f6d3b4"/>' +
        '<circle cx="40" cy="64" r="11" fill="#e2574c" opacity=".55"/>' +
        '<circle cx="80" cy="64" r="11" fill="#e2574c" opacity=".55"/>' +
        '<path d="M48 44q6 6 12 0" stroke="#3a2a1c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path d="M60 44q6 6 12 0" stroke="#3a2a1c" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path d="M48 86q12 8 24 0" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>',
        "0 0 120 120", "une rougeur");
    },
    MALADE: null
  };

  function sante(key) {
    return SANTE[key] ? SANTE[key]() : "";
  }

  global.ART4 = {
    FAMILLE: FAMILLE,
    avatar: avatar,
    SENTIMENTS: SENTIMENTS,
    sentiment: sentiment,
    CORPS: CORPS,
    DOIGTS: DOIGTS,
    corps: corps,
    main: main,
    CONTRAIRES: CONTRAIRES,
    CONTRAIRE_NOM: CONTRAIRE_NOM,
    contraireIcon: contraireIcon,
    SANTE: SANTE,
    sante: sante
  };
})(window);
