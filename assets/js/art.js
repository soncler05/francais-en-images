/* ==========================================================================
   Illustrations vectorielles originales
   --------------------------------------------------------------------------
   Le livre original est illustré par Frédéric et Patrick Bizier : ce sont des
   œuvres protégées, on ne les redistribue donc pas. On les remplace par des
   dessins SVG originaux (personnages, pièces, billets, soleil) qui, à la
   différence d'un scan de 1200x1500 px, restent nets sur n'importe quel écran.
   ========================================================================== */
(function (global) {
  "use strict";

  /* --- Une tortue mascotte (varianteLeo / Lili) -------------------------- */
  // accent : couleur de carapace ; lunettes :true pour Lili.
  function turtle(opts) {
    opts = opts || {};
    var accent = opts.accent || "#7ab800";
    var glasses = !!opts.glasses;
    var uid = "t" + Math.random().toString(36).slice(2, 8);

    return '' +
      '<svg class="turtle" viewBox="0 0 160 150" role="img" aria-label="Une tortue">' +
      '  <defs>' +
      '    <radialGradient id="' + uid + 'shell" cx="35%" cy="28%" r="78%">' +
      '      <stop offset="0" stop-color="#a8d84a"/>' +
      '      <stop offset="1" stop-color="#5f8f00"/>' +
      '    </radialGradient>' +
      '  </defs>' +
      // ombre
      '  <ellipse cx="80" cy="139" rx="46" ry="6" fill="#000" opacity=".12"/>' +
      // pattes arrière
      '  <ellipse cx="44" cy="118" rx="13" ry="9" fill="' + accent + '"/>' +
      '  <ellipse cx="116" cy="118" rx="13" ry="9" fill="' + accent + '"/>' +
      // carapace
      '  <ellipse cx="80" cy="96" rx="46" ry="34" fill="url(#' + uid + 'shell)"/>' +
      '  <ellipse cx="80" cy="96" rx="34" ry="24" fill="none" stroke="#4f7a00" ' +
      '        stroke-width="2.5" opacity=".55"/>' +
      '  <path d="M80 72v48M56 96h48M62 80l36 32M98 80L62 112" stroke="#4f7a00" ' +
      '        stroke-width="2" opacity=".35" fill="none"/>' +
      // pattes avant
      '  <ellipse cx="56" cy="126" rx="11" ry="8" fill="' + accent + '"/>' +
      '  <ellipse cx="104" cy="126" rx="11" ry="8" fill="' + accent + '"/>' +
      // cou + tête
      '  <path d="M104 74c6-12 4-22 14-26" stroke="' + accent + '" stroke-width="15" ' +
      '        stroke-linecap="round" fill="none"/>' +
      '  <ellipse cx="126" cy="44" rx="21" ry="18" fill="' + accent + '"/>' +
      // yeux
      '  <ellipse cx="121" cy="38" rx="5" ry="6" fill="#fff"/>' +
      '  <ellipse cx="136" cy="40" rx="4" ry="5" fill="#fff"/>' +
      (glasses
        ? '  <g fill="none" stroke="#2b2b2b" stroke-width="2.4">' +
          '    <ellipse cx="120" cy="38" rx="9" ry="8"/>' +
          '    <ellipse cx="137" cy="40" rx="7.5" ry="7"/>' +
          '    <path d="M127 38h3"/><path d="M111 35l-7-3"/>' +
          '  </g>'
        : "") +
      '  <circle cx="122" cy="39" r="2.4" fill="#2b2b2b"/>' +
      '  <circle cx="137" cy="41" r="2.1" fill="#2b2b2b"/>' +
      // sourire
      '  <path d="M124 50c4 4 10 4 13-1" stroke="#2b2b2b" stroke-width="2" ' +
      '        stroke-linecap="round" fill="none"/>' +
      // traces de pas
      '  <path d="M28 122c-3 4-3 8 0 11M132 120c3 4 3 8 0 11" stroke="#4f7a00" ' +
      '        stroke-width="2" opacity=".4" fill="none"/>' +
      '</svg>';
  }

  /* --- Pièce.Canadienne (SVG net) --------------------------------------- */
  /* --- Un clou ------------------------------------------------------------ */
  // Commons n'a aucune photographie lisible d'un clou isolé : les résultats
  // sont des sachets, des fouilles archéologiques ou des boîtes de marque.
  // On le dessine — plus net, et sans ambiguïté pour l'enfant.
  function nail() {
    return '<svg class="art-nail" viewBox="0 0 200 124" role="img" aria-label="un clou">' +
      '<defs>' +
        '<linearGradient id="nshank" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#f2f4f7"/>' +
          '<stop offset="45%" stop-color="#bcc3cc"/>' +
          '<stop offset="100%" stop-color="#7a828d"/>' +
        '</linearGradient>' +
        '<linearGradient id="nhead" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#ccd2da"/>' +
          '<stop offset="100%" stop-color="#69717c"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<ellipse cx="106" cy="110" rx="72" ry="5" fill="#000" opacity=".10"/>' +
      // tige effilée vers la pointe
      '<path d="M60 44 h66 l50 10 v8 l-50 10 h-66 z" fill="url(#nshank)"/>' +
      // tête plate
      '<path d="M20 26 h44 v64 h-36 l-8 -9 v-46 z" fill="url(#nhead)"/>' +
      // arête de la tête
      '<path d="M20 26 h44 v6 h-44 z" fill="#fff" opacity=".35"/>' +
      // reflet sur la tige
      '<path d="M66 49 h58 l34 6 v4 l-34 5 h-58 z" fill="#fff" opacity=".42"/>' +
      '</svg>';
  }

  function coin(item) {
    var v = item.value;
    var cents = !!item.cents;
    var fill, ring, text, small;
    if (cents) {
      // 5 / 10 / 25 cents : aspect métallique
      fill = v === 5 ? "#c9ccd1" : "#c9ccd1";
      ring = "#8e9299";
      text = "#5a5e64";
    } else {
      // loonie / toonie
      fill = v === 1 ? "#f0c419" : "#d8a017";
      ring = v === 1 ? "#b8890a" : "#9a6f08";
      text = "#6b4e06";
    }
    small = v >= 10 ? "CENTS" : "";
    var label = cents ? String(v) : String(v);
    return '' +
      '<svg class="money-svg coin" viewBox="0 0 120 120" role="img" ' +
      '     aria-label="' + esc(item.label) + '">' +
      '  <defs><radialGradient id="c' + v + '" cx="34%" cy="28%" r="80%">' +
      '    <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/>' +
      '    <stop offset="55%" stop-color="' + fill + '"/>' +
      '    <stop offset="1" stop-color="' + ring + '"/>' +
      '  </radialGradient></defs>' +
      '  <circle cx="60" cy="60" r="54" fill="url(#c' + v + ')" stroke="' + ring + '" ' +
      '        stroke-width="2"/>' +
      '  <circle cx="60" cy="60" r="45" fill="none" stroke="' + ring + '" ' +
      '        stroke-width="1.6" opacity=".6"/>' +
      (cents && v === 25
        ? '  <path d="M60 78c-9 0-14-5-14-12 0-4 2-7 5-9-2-2-3-4-3-7 0-5 5-9 12-9s12 4 12 9c0 3-1 5-3 7 3 2 5 5 5 9 0 7-5 12-14 12z" ' +
          '        fill="' + text + '" opacity=".8"/>'
        : "") +
      (cents && v === 10
        ? '  <path d="M40 70h40l-8 18H48z" fill="' + text + '" opacity=".8"/>' +
          '  <path d="M60 70V46M60 52l-12 10M60 52l12 10" stroke="' + text + '" ' +
          '        stroke-width="2.5" fill="none" opacity=".8"/>'
        : "") +
      (cents && v === 5
        ? '  <path d="M60 34l7 16 17 2-13 12 4 17-15-9-15 9 4-17-13-12 17-2z" ' +
          '        fill="' + text + '" opacity=".75"/>'
        : "") +
      (!cents && v === 1
        ? '  <path d="M45 78c6 3 12 3 18 0 8-4 12-11 12-19 0-9-6-16-15-16s-15 7-15 16c0 8 4 15 12 19z" ' +
          '        fill="' + text + '" opacity=".35"/>'
        : "") +
      (!cents && v === 2
        ? '  <text x="60" y="72" text-anchor="middle" font-family="Georgia,serif" ' +
          '        font-size="30" fill="' + text + '" opacity=".85">$2</text>'
        : "") +
      '  <text x="60" y="' + (cents ? 100 : 96) + '" text-anchor="middle" ' +
      '        font-family="Arial,Helvetica,sans-serif" font-size="13" ' +
      '        font-weight="700" fill="' + (cents ? "#4b4f55" : text) + '">' + label + '</text>' +
      (small ? '  <text x="60" y="110" text-anchor="middle" font-family="Arial,sans-serif" ' +
        '        font-size="8" fill="#6b6f75">CENTS</text>' : "") +
      '</svg>';
  }

  /* --- Billet.canadien (SVG net) ----------------------------------------- */
  function note(item) {
    var v = item.value;
    var hue = v === 100 ? "#c0392b" : v === 50 ? "#2c6e49"
            : v === 20 ? "#8e44ad" : v === 10 ? "#d35400" : "#1f6fb2";
    var light = v === 100 ? "#e74c3c" : v === 50 ? "#3fa06a"
              : v === 20 ? "#a569bd" : v === 10 ? "#e67e22" : "#3498db";
    return '' +
      '<svg class="money-svg note" viewBox="0 0 200 92" role="img" ' +
      '     aria-label="' + esc(item.label) + '">' +
      '  <defs><linearGradient id="n' + v + '" x1="0" y1="0" x2="0" y2="1">' +
      '    <stop offset="0" stop-color="' + light + '"/>' +
      '    <stop offset="1" stop-color="' + hue + '"/>' +
      '  </linearGradient></defs>' +
      '  <rect x="3" y="3" width="194" height="86" rx="6" fill="url(#n' + v + ')"/>' +
      '  <rect x="10" y="10" width="180" height="72" rx="4" fill="none" ' +
      '        stroke="#fff" stroke-width="1.2" opacity=".45"/>' +
      '  <circle cx="26" cy="46" r="13" fill="#fff" opacity=".28"/>' +
      '  <text x="26" y="51" text-anchor="middle" font-family="Arial,sans-serif" ' +
      '        font-size="13" font-weight="700" fill="#fff">' + v + '</text>' +
      '  <text x="100" y="52" text-anchor="middle" font-family="Georgia,serif" ' +
      '        font-size="20" fill="#fff" opacity=".9">' + v + ' $</text>' +
      '  <text x="172" y="52" text-anchor="middle" font-family="Arial,sans-serif" ' +
      '        font-size="11" fill="#fff" opacity=".85">CANADA</text>' +
      '  <g opacity=".28" fill="#fff">' +
      '    <rect x="140" y="18" width="34" height="4" rx="2"/>' +
      '    <rect x="140" y="70" width="34" height="4" rx="2"/>' +
      '  </g>' +
      '</svg>';
  }

  /* --- Soleil / intercalaire -------------------------------------------- */
  // Fond perdu : le disque est centré, les rayons débordent du cadre.
  function sunburst(rays) {
    var n = rays || 24, parts = [], i, a1, a2;
    for (i = 0; i < n; i++) {
      a1 = (360 / n) * i;
      a2 = a1 + 180 / n;
      parts.push('<path d="M600 300 L' + polar(600, 300, 760, a1) + ' L' +
        polar(600, 300, 760, a2) + ' Z" fill="#ffcf3d"/>');
    }
    return '<svg class="sunburst" viewBox="0 0 1200 600" ' +
      'preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      parts.join("") +
      '<circle cx="600" cy="300" r="250" fill="#f9a825"/>' +
      '<circle cx="600" cy="300" r="190" fill="#fff6d8"/>' +
      '<circle cx="600" cy="300" r="150" fill="#fdd835"/>' +
      '<circle cx="600" cy="300" r="110" fill="#ffe9a8"/>' +
      '</svg>';
  }

  function polar(cx, cy, r, deg) {
    var t = (deg * Math.PI) / 180;
    return (cx + r * Math.cos(t)).toFixed(1) + " " + (cy + r * Math.sin(t)).toFixed(1);
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  global.ART = {
    turtle: turtle,
    nail: nail,
    coin: coin,
    note: note,
    sunburst: sunburst
  };
})(window);
