/* ==========================================================================
   Illustrations vectorielles — pages 14 à 16 (motifs, couleurs, formes,
   cheveux) et page 11 (corps)
   ========================================================================== */
(function (global) {
  "use strict";

  var shade = global.ART2.shade;
  var esc = global.ART2.esc;

  function wrap(inner, vb, label, cls) {
    return '<svg class="art ' + (cls || "") + '" viewBox="' + (vb || "0 0 120 120") +
      '" role="img" aria-label="' + esc(label || "") + '">' + inner + '</svg>';
  }

  /* ======================================================================
     LES FORMES
     ====================================================================== */
  var FORMES = {
    carre:     { d: "M20 20h80v80H20z", nom: "un carré" },
    cercle:    { c: [60, 60, 42], nom: "un cercle" },
    coeur:     { d: "M60 100S16 74 16 48a22 22 0 0 1 44-8 22 22 0 0 1 44 8c0 26-44 52-44 52z", nom: "un cœur" },
    etoile:    { d: "M60 12l13 30 33 4-24 23 6 33-28-16-28 16 6-33L12 46l33-4z", nom: "une étoile" },
    fleche:    { d: "M12 50h62V28l34 32-34 32V70H12z", nom: "une flèche" },
    losange:   { d: "M60 10l50 50-50 50L10 60z", nom: "un losange" },
    ovale:     { e: [60, 60, 50, 32], nom: "un ovale" },
    rectangle: { d: "M12 34h96v52H12z", nom: "un rectangle" },
    triangle:  { d: "M60 14l48 88H12z", nom: "un triangle" },
    ligne:     { d: "M10 60h100", stroke: true, nom: "une ligne" }
  };

  function forme(key, color) {
    var f = FORMES[key];
    var c = color || "#e2574c";
    var inner;
    if (f.c) {
      inner = '<circle cx="' + f.c[0] + '" cy="' + f.c[1] + '" r="' + f.c[2] + '" fill="' + c + '"/>';
    } else if (f.e) {
      inner = '<ellipse cx="' + f.e[0] + '" cy="' + f.e[1] + '" rx="' + f.e[2] +
        '" ry="' + f.e[3] + '" fill="' + c + '"/>';
    } else if (f.stroke) {
      inner = '<path d="' + f.d + '" stroke="' + c + '" stroke-width="12" ' +
        'stroke-linecap="round" fill="none"/>';
    } else {
      inner = '<path d="' + f.d + '" fill="' + c + '"/>';
    }
    return wrap(inner, "0 0 120 120", f.nom, "art-forme");
  }

  /* ======================================================================
     LES COULEURS — des pastilles, avec contour pour les teintes claires
     ====================================================================== */
  var COULEURS = [
    ["beige", "#e8dcc0"], ["blanc", "#ffffff"], ["bleu", "#2f6fb5"],
    ["brun", "#6b4423"], ["gris", "#8d8d8d"], ["jaune", "#ffd23f"],
    ["noir", "#1f1f1f"], ["orange", "#ef7c1c"], ["rose", "#f4a6b8"],
    ["rouge", "#d63a2f"], ["turquoise", "#2ec4b6"], ["vert", "#3f8f14"],
    ["violet", "#8e44ad"], ["argent", "#b9bfc7"], ["or", "#e3b23c"],
    ["bronze", "#b0703c"]
  ];

  var COULEUR_HEX = {};
  COULEURS.forEach(function (c) { COULEUR_HEX[c[0]] = c[1]; });

  function couleurSwatch(hex, nom) {
    // Les teintes claires disparaîtraient sur fond blanc : contour gris.
    var clair = isLight(hex);
    var defs = '<defs><linearGradient id="g' + hex.replace("#", "") + '" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="' + shade(hex, 28) + '"/>' +
      '<stop offset="1" stop-color="' + hex + '"/></linearGradient></defs>';
    var inner = defs +
      '<rect x="6" y="6" width="108" height="108" rx="14" fill="url(#g' +
      hex.replace("#", "") + ')"' +
      (clair ? ' stroke="#9a9a9a" stroke-width="2"' : "") + '/>';
    return wrap(inner, "0 0 120 120", nom, "art-pastille");
  }

  function isLight(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return true;
    var r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 190;
  }

  /* ======================================================================
     LES COULEURS DE CHEVEUX
     ====================================================================== */
  var CHEVEUX = [
    ["blanc", "#e6e2d8"], ["blond", "#e2c268"], ["brun", "#5b3a1e"],
    ["gris", "#9a9a9a"], ["noir", "#221c18"], ["roux", "#c1440e"]
  ];

  function couleurCheveux(hex, nom) {
    var clair = isLight(hex);
    return wrap(
      '<rect x="6" y="6" width="108" height="108" rx="14" fill="' + hex + '"' +
      (clair ? ' stroke="#9a9a9a" stroke-width="2"' : "") + '/>' +
      '<path d="M6 20a14 14 0 0 1 14-14h80a14 14 0 0 1 14 14v14H6z" fill="#fff" opacity=".22"/>',
      "0 0 120 120", nom, "art-pastille");
  }

  /* ======================================================================
     POUR PARLER DES CHEVEUX — une tête de profil + la coiffure
     ====================================================================== */
  var STYLES_CHEVEUX = [
    ["afro", "un afro"],
    ["cheveux-boucles", "des cheveux bouclés"],
    ["cheveux-courts", "des cheveux courts"],
    ["cheveux-frices", "des cheveux frisés"],
    ["cheveux-longs", "des cheveux longs"],
    ["cheveux-raides", "des cheveux raides"],
    ["couettes", "des couettes"],
    ["crane-chauve", "un crâne chauve"],
    ["queue-cheval", "une queue de cheval"],
    ["tete-rasee", "une tête rasée"],
    ["tresse", "une tresse"],
    ["tresses-rastas", "des tresses rastas"]
  ];

  var hc = "#6b4423";

  function coiffure(key, nom) {
    var g = '<path d="M32 118c0-10 6-16 16-16h24c10 0 16 6 16 16z" fill="#e8b48c"/>' +
            '<ellipse cx="60" cy="70" rx="34" ry="40" fill="#f2c49c"/>' +
            '<circle cx="60" cy="40" r="4" fill="#e2574c" opacity="0"/>';
    // une oreille pour situer le profil
    g += '<ellipse cx="92" cy="74" rx="6" ry="9" fill="#e8b48c"/>';
    g += '<circle cx="42" cy="66" r="3" fill="#3a2a1c"/>';
    g = '<path d="M26 74a8 8 0 0 1 8-8" stroke="#d79a70" stroke-width="3" fill="none" stroke-linecap="round"/>';

    function base() {
      return '<path d="M26 78c0-32 14-52 34-52s34 20 34 52c0 14-2 26-6 34H32c-4-8-6-20-6-34z" fill="#f2c49c"/>' +
        '<ellipse cx="90" cy="82" rx="7" ry="10" fill="#e8b48c"/>' +
        '<circle cx="46" cy="76" r="3.4" fill="#3a2a1c"/>' +
        '<path d="M52 92q8 6 16 0" stroke="#a8503c" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
        '<path d="M32 120h56l-8-30H40z" fill="#e2574c" opacity=".85"/>';
    }

    var extra = "";
    switch (key) {
      case "afro":
        extra = '<circle cx="60" cy="48" r="38" fill="' + hc + '"/>';
        break;
      case "cheveux-boucles":
        extra = '<circle cx="60" cy="44" r="34" fill="' + hc + '"/>' +
          '<circle cx="32" cy="60" r="14" fill="' + hc + '"/><circle cx="88" cy="60" r="14" fill="' + hc + '"/>' +
          '<circle cx="34" cy="80" r="12" fill="' + hc + '"/><circle cx="86" cy="80" r="12" fill="' + hc + '"/>';
        break;
      case "cheveux-courts":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>';
        break;
      case "cheveux-frices":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>' +
          '<circle cx="34" cy="36" r="9" fill="' + hc + '"/><circle cx="50" cy="30" r="9" fill="' + hc + '"/>' +
          '<circle cx="70" cy="30" r="9" fill="' + hc + '"/><circle cx="86" cy="36" r="9" fill="' + hc + '"/>';
        break;
      case "cheveux-longs":
        extra = '<path d="M24 80c0-32 16-52 36-52s36 20 36 52c0 22-4 38-10 48-4 6-11 3-9-6 3-14 2-28-2-38H45c-4 10-5 24-2 38 2 9-5 12-9 6-6-10-10-26-10-48z" fill="' + hc + '"/>';
        break;
      case "cheveux-raides":
        extra = '<path d="M22 84c0-36 18-56 38-56s38 20 38 56v40h-12V86c-8-4-16-6-26-6s-18 2-26 6v38H22z" fill="' + hc + '"/>';
        break;
      case "couettes":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>' +
          '<circle cx="22" cy="40" r="16" fill="' + hc + '"/><circle cx="98" cy="40" r="16" fill="' + hc + '"/>';
        break;
      case "crane-chauve":
        extra = "";
        break;
      case "queue-cheval":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>' +
          '<path d="M94 60c12 4 18 20 14 36-2 10-8 16-14 12-5-3-2-11 1-18 4-9 4-18-1-24z" fill="' + shade(hc, -20) + '"/>' +
          '<circle cx="96" cy="58" r="7" fill="#e2574c"/>';
        break;
      case "tete-rasee":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + shade(hc, 30) + '"/>';
        break;
      case "tresse":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>' +
          '<path d="M94 84c10 10 10 26 2 36" stroke="' + shade(hc, -20) + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
          '<path d="M94 84l-4-4M96 96l-5-2M96 108l-5 2M92 118l-3 4" stroke="#00000033" stroke-width="2"/>';
        break;
      case "tresses-rastas":
        extra = '<path d="M26 78c0-30 14-50 34-50s34 20 34 50c0-8-3-14-8-18-8 6-18 9-26 9s-18-3-26-9c-5 4-8 10-8 18z" fill="' + hc + '"/>';
        ["#d63a2f", "#e3b23c", "#3f8f14"].forEach(function (col, i) {
          extra += '<path d="M' + (32 + i * 10) + ' 48 q6 26 0 52" stroke="' + col +
            '" stroke-width="7" fill="none" stroke-linecap="round"/>';
        });
        break;
    }
    return wrap(base() + extra, "0 0 120 130", nom, "art-coiffure");
  }

  /* ======================================================================
     LES MOTIFS — des aplats répétables, dessinés et non photographiés
     ====================================================================== */
  var MOTIFS = ["carreaux", "ecossais", "imprime", "pois", "rayures", "uni"];

  var MOTIF_NOM = {
    carreaux: "à carreaux", ecossais: "écossais", imprime: "imprimé",
    pois: "à pois", rayures: "à rayures", uni: "uni"
  };

  function motif(key) {
    var defs = '<defs>' +
      '<pattern id="p-carreaux" width="28" height="28" patternUnits="userSpaceOnUse">' +
      '<rect width="28" height="28" fill="#f7f3e8"/>' +
      '<path d="M0 0h14v14H0zM14 14h14v14H14z" fill="#c0392b"/>' +
      '<path d="M0 14h14M14 0v14" stroke="#2c6e49" stroke-width="2"/></pattern>' +
      '<pattern id="p-ecossais" width="40" height="40" patternUnits="userSpaceOnUse">' +
      '<rect width="40" height="40" fill="#20242e"/>' +
      '<path d="M0 0h20v20H0zM20 20h20v20H20z" fill="#2e4a7a"/>' +
      '<path d="M0 20h40M20 0v40" stroke="#e8e4d8" stroke-width="1.5"/>' +
      '<circle cx="10" cy="10" r="1.6" fill="#e8e4d8"/></pattern>' +
      '<pattern id="p-imprime" width="36" height="36" patternUnits="userSpaceOnUse">' +
      '<rect width="36" height="36" fill="#fdf6e8"/>' +
      '<path d="M4 26q6-10 12 0t12 0" stroke="#6aa84f" stroke-width="2.5" fill="none"/>' +
      '<path d="M8 12q5-7 10 0" stroke="#e3b23c" stroke-width="2.5" fill="none"/>' +
      '<circle cx="28" cy="10" r="3" fill="#d6336c"/></pattern>' +
      '<pattern id="p-pois" width="30" height="30" patternUnits="userSpaceOnUse">' +
      '<rect width="30" height="30" fill="#fdeef2"/>' +
      '<circle cx="8" cy="8" r="5" fill="#d6336c"/>' +
      '<circle cx="23" cy="23" r="5" fill="#d6336c"/></pattern>' +
      '<pattern id="p-rayures" width="24" height="24" patternUnits="userSpaceOnUse" ' +
      'patternTransform="rotate(30)">' +
      '<rect width="24" height="24" fill="#fdf6e8"/>' +
      '<rect width="12" height="24" fill="#2f6fb5"/></pattern>' +
      '<pattern id="p-uni" width="10" height="10" patternUnits="userSpaceOnUse">' +
      '<rect width="10" height="10" fill="#8e44ad"/></pattern>' +
      '</defs>';
    return wrap(defs + '<rect x="6" y="6" width="108" height="108" rx="12" ' +
      'fill="url(#p-' + key + ')" stroke="#9a9a9a" stroke-width="1.5"/>',
      "0 0 120 120", MOTIF_NOM[key], "art-motif");
  }

  global.ART3 = {
    forme: forme,
    FORMES: FORMES,
    couleurSwatch: couleurSwatch,
    couleurs: COULEURS,
    COULEUR_HEX: COULEUR_HEX,
    couleurCheveux: couleurCheveux,
    cheveux: CHEVEUX,
    coiffure: coiffure,
    stylesCheveux: STYLES_CHEVEUX,
    motif: motif,
    MOTIFS: MOTIFS,
    MOTIF_NOM: MOTIF_NOM,
    isLight: isLight
  };
})(window);
