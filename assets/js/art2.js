/* ==========================================================================
   Illustrations vectorielles — pages 11 à 25
   --------------------------------------------------------------------------
   Tout ce qui ne se photographie pas bien est dessiné ici :
     · les personnes de « Ma famille »  → avatars paramétriques
     · les sentiments                  → le même visage, d'autres expressions
     · le corps                        → schéma cliquable
     · les couleurs, formes, motifs, cheveux, contraires, problems de santé

   Un seul moteur de visage (FACE) sert la famille et les sentiments : ça
   garantit un style homogène et ça évite d'étiqueter des photos de vraies
   personnes avec des émotions.
   ========================================================================== */
(function (global) {
  "use strict";

  var uidN = 0;
  function uid() { return "a" + (++uidN); }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ======================================================================
     1. MOTEUR DE VISAGE
     ====================================================================== */

  var SKIN = ["#f6d3b4", "#eebb99", "#d9a173", "#b87c4e", "#8d5a34", "#f2cba8"];
  var HAIR = ["#3a2a1c", "#6b4423", "#b8792f", "#d9b26a", "#8d8d8d", "#d8d8d8",
              "#1f1a17", "#c1440e", "#f0d9b5"];

  // coiffures : "court", "long", "boucle", "raide", "pattes", "chauve",
  // "queue", "afro", "frange", "court-f", "queue2", "rastas"
  var STYLES = {
    court: function (c) {
      return '<path d="M23 60c0-26 15-42 37-42s37 16 37 42c0-11-4-19-9-22-9 6-18 9-28 9s-19-3-28-9c-5 3-9 11-9 22z" fill="' + c + '"/>';
    },
    long: function (c) {
      return '<path d="M20 64c0-26 16-44 40-44s40 18 40 44c0 14-3 26-7 36-3 8-9 6-8-4 2-12 1-22-3-30H38c-4 8-5 18-3 30 1 10-5 12-8 4-4-10-7-22-7-36z" fill="' + c + '"/>';
    },
    boucle: function (c) {
      var s = '<path d="M22 60c0-24 15-40 38-40s38 16 38 40" fill="' + c + '"/>';
      s += '<circle cx="26" cy="52" r="13" fill="' + c + '"/>';
      s += '<circle cx="94" cy="52" r="13" fill="' + c + '"/>';
      s += '<circle cx="30" cy="34" r="12" fill="' + c + '"/>';
      s += '<circle cx="90" cy="34" r="12" fill="' + c + '"/>';
      s += '<circle cx="50" cy="26" r="12" fill="' + c + '"/>';
      s += '<circle cx="70" cy="26" r="12" fill="' + c + '"/>';
      return s;
    },
    raide: function (c) {
      return '<rect x="20" y="20" width="80" height="52" rx="20" fill="' + c + '"/>' +
             '<rect x="18" y="52" width="14" height="56" rx="7" fill="' + c + '"/>' +
             '<rect x="88" y="52" width="14" height="56" rx="7" fill="' + c + '"/>';
    },
    pattes: function (c) {
      return '<path d="M22 58c0-24 14-38 38-38s38 14 38 38c0-8-3-14-8-17H30c-5 3-8 9-8 17z" fill="' + c + '"/>' +
             '<path d="M30 52c-4 8-4 18 0 26l14-4c-4-8-4-16-1-22zM90 52c4 8 4 18 0 26l-14-4c4-8 4-16 1-22z" fill="' + c + '"/>';
    },
    chauve: function (c) {
      return "";
    },
    queue: function (c) {
      return '<path d="M22 58c0-24 14-38 38-38s38 14 38 38c0-10-4-16-9-18-9 6-20 8-29 8s-20-2-29-8c-5 2-9 8-9 18z" fill="' + c + '"/>' +
             '<path d="M94 52c10 4 14 16 12 28-1 8-5 12-10 10-4-2-3-8 0-14 3-7 3-14-2-18z" fill="' + c + '"/>';
    },
    afro: function (c) {
      return '<circle cx="60" cy="46" r="42" fill="' + c + '"/>' +
             '<circle cx="26" cy="62" r="18" fill="' + c + '"/>' +
             '<circle cx="94" cy="62" r="18" fill="' + c + '"/>';
    },
    frange: function (c) {
      return '<path d="M20 60c0-26 16-42 40-42s40 16 40 42c0-10-4-16-9-19-8 9-20 13-31 13s-23-4-31-13c-5 3-9 9-9 19z" fill="' + c + '"/>' +
             '<path d="M20 58c-2 8-1 14 1 18 3 4 8 2 8-4l1-14z" fill="' + c + '"/>';
    },
    "court-f": function (c) {
      return '<path d="M22 58c0-24 14-38 38-38s38 14 38 38c0-10-4-16-9-18-9 6-20 8-29 8s-20-2-29-8c-5 2-9 8-9 18z" fill="' + c + '"/>';
    },
    queue2: function (c) {
      return '<path d="M22 58c0-24 14-38 38-38s38 14 38 38c0-10-4-16-9-18-9 6-20 8-29 8s-20-2-29-8c-5 2-9 8-9 18z" fill="' + c + '"/>' +
             '<circle cx="20" cy="26" r="12" fill="' + c + '"/>' +
             '<circle cx="100" cy="26" r="12" fill="' + c + '"/>';
    },
    rastas: function (c) {
      var s = '<path d="M22 58c0-24 14-38 38-38s38 14 38 38c0-10-4-16-9-18-9 6-20 8-29 8s-20-2-29-8c-5 2-9 8-9 18z" fill="' + c + '"/>';
      for (var i = 0; i < 7; i++) {
        var x = 24 + i * 12;
        s += '<path d="M' + x + ' 44 q5 20 0 40" stroke="' + c + '" stroke-width="7" fill="none" stroke-linecap="round"/>';
      }
      return s;
    }
  };

  /* --- sourcils -------------------------------------------------------- */
  function brows(kind, c) {
    switch (kind) {
      case "leve":  // levés (surprise)
        return '<path d="M37 51q10-10 19-3" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
               '<path d="M64 48q9-7 19 3" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      case "fache": // froncés
        return '<path d="M36 55l19-7" stroke="' + c + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
               '<path d="M84 55l-19-7" stroke="' + c + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
      case "triste":
        return '<path d="M38 58q9-7 18-1" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
               '<path d="M64 57q9-6 18 1" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      case "mou":   // fatigués
        return '<path d="M38 54h17" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
               '<path d="M65 54h17" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      case "un":    // un seul sourcil
        return '<path d="M38 52h16" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
               '<path d="M66 52h16" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      default:      // neutre
        return '<path d="M38 52h17" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
               '<path d="M65 52h17" stroke="' + c + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    }
  }

  /* --- yeux ------------------------------------------------------------ */
  function eyes(kind, dark) {
    var d = dark || "#2b2118";
    function open(r) {
      return '<ellipse cx="49" cy="' + (r || 68) + '" rx="5.5" ry="6.5" fill="#fff"/>' +
             '<ellipse cx="71" cy="' + (r || 68) + '" rx="5.5" ry="6.5" fill="#fff"/>' +
             '<circle cx="49" cy="' + (r || 68) + '" r="3" fill="' + d + '"/>' +
             '<circle cx="71" cy="' + (r || 68) + '" r="3" fill="' + d + '"/>';
    }
    switch (kind) {
      case "fermes":  // fermés (sommeil, rire)
        return '<path d="M43 68q6 6 12 0" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               '<path d="M65 68q6 6 12 0" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "riants":
        return '<path d="M42 70q7-10 14 0" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               '<path d="M64 70q7-10 14 0" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "grands":  // écarquillés (surprise)
        return open(68).replace(/rx="5.5" ry="6.5"/g, 'rx="7" ry="8"');
      case "faches":
        return '<ellipse cx="49" cy="70" rx="5" ry="5" fill="' + d + '"/>' +
               '<ellipse cx="71" cy="70" rx="5" ry="5" fill="' + d + '"/>';
      case "tristes": // larmoyants
        return '<ellipse cx="49" cy="70" rx="6" ry="6.5" fill="#fff"/>' +
               '<ellipse cx="71" cy="70" rx="6" ry="6.5" fill="#fff"/>' +
               '<circle cx="49" cy="71" r="3.2" fill="' + d + '"/>' +
               '<circle cx="71" cy="71" r="3.2" fill="' + d + '"/>' +
               '<path d="M41 74q8 4 16 0" stroke="' + d + '" stroke-width="1.6" fill="none"/>' +
               '<path d="M63 74q8 4 16 0" stroke="' + d + '" stroke-width="1.6" fill="none"/>';
      case "endormis":
        return '<path d="M42 70h14" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
               '<path d="M64 70h14" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "un":
        return '<ellipse cx="49" cy="68" rx="6" ry="7" fill="#fff"/>' +
               '<ellipse cx="71" cy="68" rx="6" ry="7" fill="#fff"/>' +
               '<circle cx="50" cy="67" r="3" fill="' + d + '"/>' +
               '<circle cx="72" cy="67" r="3" fill="' + d + '"/>';
      case "regard":  // vers le haut (avide)
        return '<ellipse cx="49" cy="68" rx="6" ry="6.5" fill="#fff"/>' +
               '<ellipse cx="71" cy="68" rx="6" ry="6.5" fill="#fff"/>' +
               '<circle cx="50" cy="65" r="3" fill="' + d + '"/>' +
               '<circle cx="72" cy="65" r="3" fill="' + d + '"/>';
      case "fievreux": // fiévreux, rouges
        return '<ellipse cx="49" cy="68" rx="5.5" ry="6" fill="#fff"/>' +
               '<ellipse cx="71" cy="68" rx="5.5" ry="6" fill="#fff"/>' +
               '<circle cx="49" cy="68" r="3" fill="' + d + '"/>' +
               '<circle cx="71" cy="68" r="3" fill="' + d + '"/>' +
               '<ellipse cx="49" cy="71" rx="4" ry="2.4" fill="#e2574c" opacity=".8"/>' +
               '<ellipse cx="71" cy="71" rx="4" ry="2.4" fill="#e2574c" opacity=".8"/>';
      default:
        return open();
    }
  }

  /* --- bouche ---------------------------------------------------------- */
  function mouth(kind) {
    var c = "#a8503c";
    switch (kind) {
      case "grand-sourire":
        return '<path d="M42 84q18 22 36 0z" fill="#c25346"/>' +
               '<path d="M44 84h32v5q-16 6-32 0z" fill="#fff"/>' +
               '<path d="M42 84q18 22 36 0" stroke="#a8503c" stroke-width="2.5" fill="none"/>';
      case "sourire":
        return '<path d="M46 86q14 11 28 0" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "grand-rire":
        return '<path d="M40 82q20 28 40 0z" fill="#c25346"/>' +
               '<path d="M43 82h34v6q-17 7-34 0z" fill="#fff"/>';
      case "triste":
        return '<path d="M46 90q14-11 28 0" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "fache":
        return '<path d="M44 88q16-9 32 0" stroke="#a8503c" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      case "ouverte":  // surprise
        return '<ellipse cx="60" cy="88" rx="9" ry="12" fill="#c25346"/>';
      case "neutre":
        return '<path d="M50 88h20" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>';
      case "bouche-e":
        return '<ellipse cx="60" cy="86" rx="5" ry="7" fill="#c25346"/>' +
               '<path d="M50 78q10-5 20 0" stroke="#a8503c" stroke-width="2.5" fill="none"/>';
      case "malade":   // bouche crispée
        return '<path d="M48 90q12-8 24 0" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>';
      default:
        return '<path d="M46 86q14 11 28 0" stroke="#a8503c" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }
  }

  /**
   * Un visage. Toutes les parties sont optionnelles pour que le même moteur
   * rende un grand-père barbu et un visage joyeux.
   * o : { skin, hair, hairColor, style, brow, eye, mouth, glasses, beard,
   *       blush, tears, sweat, zzz, rousseur, freckles, bg }
   */
  function face(o) {
    o = o || {};
    var skin = o.skin || SKIN[0];
    // `hair` porte la couleur dans FAMILLE/SENTIMENTS, `hairColor` ailleurs :
    // on accepte les deux plutôt que d'obliger à renommer partout.
    var hc = o.hairColor || o.hair || HAIR[0];
    var id = uid();
    var style = o.style && STYLES[o.style] ? STYLES[o.style](hc) : STYLES.court(hc);

    var s = '<svg class="face" viewBox="0 0 120 130" role="img"' +
      (o.alt ? ' aria-label="' + esc(o.alt) + '"' : "") + '>';

    if (o.bg) {
      s += '<rect x="0" y="0" width="120" height="130" rx="10" fill="' + o.bg + '"/>';
    }

    // cou
    s += '<path d="M50 96h20v16a10 10 0 0 1-20 0z" fill="' + shade(skin, -18) + '"/>';
    // visage
    s += '<ellipse cx="60" cy="62" rx="33" ry="38" fill="' + skin + '"/>';
    // oreilles
    s += '<ellipse cx="27" cy="66" rx="5" ry="8" fill="' + shade(skin, -10) + '"/>';
    s += '<ellipse cx="93" cy="66" rx="5" ry="8" fill="' + shade(skin, -10) + '"/>';

    if (o.rousseur) {
      s += '<ellipse cx="38" cy="80" rx="8" ry="5.5" fill="#e2574c" opacity=".55"/>';
      s += '<ellipse cx="82" cy="80" rx="8" ry="5.5" fill="#e2574c" opacity=".55"/>';
    }
    if (o.blush) {
      s += '<ellipse cx="38" cy="80" rx="9" ry="6" fill="#f3a3a3" opacity=".6"/>';
      s += '<ellipse cx="82" cy="80" rx="9" ry="6" fill="#f3a3a3" opacity=".6"/>';
    }
    if (o.freckles) {
      var f = "";
      for (var i = 0; i < 6; i++) {
        f += '<circle cx="' + (40 + (i % 3) * 5) + '" cy="' + (78 + Math.floor(i / 3) * 5) + '" r="1.3" fill="#c98d5e"/>';
      }
      s += f;
    }

    // cheveux derrière puis devant
    s += style;
    s += brows(o.brow || "neutre", o.browColor || shade(hc, -25));
    s += eyes(o.eye || "ouverts", o.eyeColor);
    s += mouth(o.mouth || "sourire");

    // nez
    s += '<path d="M58 74q3 6 6 2" stroke="' + shade(skin, -28) + '" stroke-width="2" ' +
         'fill="none" stroke-linecap="round"/>';

    if (o.beard) {
      s += '<path d="M28 70q0 40 32 44 32-4 32-44-6 14-32 14t-32-14z" fill="' + hc + '" opacity=".95"/>';
      s += '<path d="M50 92q10 6 20 0" stroke="' + shade(skin, -30) + '" stroke-width="2.5" fill="none"/>';
    }
    if (o.glasses) {
      s += '<g fill="none" stroke="#3a3a3a" stroke-width="2.4">' +
           '<circle cx="49" cy="68" r="12"/><circle cx="71" cy="68" r="12"/>' +
           '<path d="M61 68h-0M49 66l-9-3M71 66l9-3"/></g>';
    }
    if (o.tears) {
      s += '<path d="M45 76q2 9 1 13" stroke="#5aa9e6" stroke-width="4" fill="none" stroke-linecap="round"/>' +
           '<path d="M75 76q-2 9-1 13" stroke="#5aa9e6" stroke-width="4" fill="none" stroke-linecap="round"/>';
    }
    if (o.sweat) {
      s += '<path d="M84 26q5 8 0 11t-6-8z" fill="#5aa9e6"/>';
    }
    if (o.zzz) {
      s += '<text x="88" y="28" font-family="sans-serif" font-size="13" fill="#4b6b8a">z</text>' +
           '<text x="96" y="19" font-family="sans-serif" font-size="9" fill="#4b6b8a">z</text>';
    }
    if (o.bulles) {
      // bulles de pensée : faim, soif, sommeil
      var b = o.bulles;
      if (b === "faim") {
        s += '<circle cx="86" cy="20" r="13" fill="#fff" stroke="#c9c9c9" stroke-width="1.5"/>' +
             '<path d="M78 22h16M80 17h12M82 26h8" stroke="#8a5a3a" stroke-width="2" stroke-linecap="round"/>';
      } else if (b === "soif") {
        s += '<circle cx="86" cy="20" r="13" fill="#fff" stroke="#c9c9c9" stroke-width="1.5"/>' +
             '<path d="M80 16h11l-11 8h11" stroke="#3a7fbf" stroke-width="2" fill="none" ' +
             'stroke-linejoin="round" stroke-linecap="round"/>';
      }
    }

    return s + "</svg>";
  }

  /** Assombrit (k<0) ou éclaircit (k>0) une couleur hexadécimale. */
  function shade(hex, k) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    if (!m) return hex;
    var out = "#";
    [1, 2, 3].forEach(function (i) {
      var v = parseInt(m[i], 16) + k;
      v = Math.max(0, Math.min(255, v));
      out += ("0" + v.toString(16)).slice(-2);
    });
    return out;
  }

  global.FACE = face;
  global.ART2 = { face: face, STYLES: STYLES, shade: shade, esc: esc, uid: uid };
})(window);
