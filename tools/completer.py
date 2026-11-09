# -*- coding: utf-8 -*-
"""Re-télécharge les images épinglées que le CDN a refusées.

Le fetcher réessaie cinq fois en attendant 50 s au maximum ; quand Commons
limite encore après ça, le mot garde son ancienne photo — souvent la mauvaise,
puisqu'on vient justement de l'épingler. Ce script reprend uniquement les
épingles dont le fichier local ne correspond pas encore, avec une patience
beaucoup plus longue, et réécrit le manifeste.

    python tools/completer.py            # tout ce qui reste
    python tools/completer.py soccer     # un mot donné
"""
import io
import json
import os
import sys
import time

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)

import requests                                   # noqa: E402
import lexique, lexique2, lexique3                # noqa: E402
from fetch_images import api_get, UA, clean       # noqa: E402

ROOT = os.path.dirname(ICI)
IMG = os.path.join(ROOT, "assets", "img")
MAN = os.path.join(ROOT, "assets", "js", "images.json")

PINS = {}
for _pick in (lexique.PICK, lexique2.PICK2, lexique3.PICK3):
    PINS.update(_pick)

man = {}


def meta(titre, largeur=1000):
    d = api_get({"action": "query", "titles": titre,
                 "prop": "imageinfo", "iiprop": "url|size|extmetadata",
                 "iiextmetadatafilter":
                     "LicenseShortName|Artist|Credit|AttributionRequired|LicenseUrl",
                 "iiurlwidth": largeur})
    for p in (d.get("query") or {}).get("pages") or []:
        ii = (p.get("imageinfo") or [{}])[0]
        if ii:
            return ii
    return None


# Le CDN ne limite pas uniformément : une même vignette peut répondre 429 en
# 1000 px et 200 en 500 px. On descend donc l'échelle plutôt que d'abandonner —
# 500 px de large suffisent largement à une fiche de vocabulaire.
# Deux largeurs seulement. Le seau de jetons se vide à chaque requête : les
# essais rapprochés ne le remplissent pas, ils l'épuisent. Le rythme qui
# marche, c'est une requête puis un long silence.
LARGEURS = (1000, 600)
PATIENCE = 240          # secondes entre deux requêtes, succès ou non


def reprendre(ident, titre, essais=4):
    """Télécharge en descendant d'échelle ; renvoie True si obtenu."""
    for largeur in LARGEURS:
        ii = meta(titre, largeur)
        if not ii or not ii.get("thumburl"):
            continue
        for n in range(essais):
            try:
                r = requests.get(ii["thumburl"], headers={"User-Agent": UA},
                                 timeout=90)
                if r.status_code == 429:
                    print("  %-18s %dpx 429 (%d/%d), on patiente %ds"
                          % (ident, largeur, n + 1, essais, PATIENCE))
                    time.sleep(PATIENCE)
                    continue
                r.raise_for_status()
            except Exception as e:                       # noqa: BLE001
                print("  %-18s %dpx %s (%d/%d)"
                      % (ident, largeur, e, n + 1, essais))
                time.sleep(PATIENCE)
                continue
            return ecrire(ident, titre, ii, largeur, r)
        print("  %-18s %dpx : épuisé, on essaye plus petit" % (ident, largeur))
    print("  %-18s ABANDON" % ident)
    return False


def ecrire(ident, titre, ii, largeur, r):
    ctype = r.headers.get("Content-Type") or "image/jpeg"
    ext = "png" if "png" in ctype else "jpg"
    chemin = os.path.join(IMG, ident + "." + ext)
    for autre in ("jpg", "png"):
        if autre != ext:
            p = os.path.join(IMG, ident + "." + autre)
            if os.path.exists(p):
                os.remove(p)
    io.open(chemin, "wb").write(r.content)

    em = ii.get("extmetadata") or {}
    cur = man.setdefault(ident, {})
    cur.update({
        "label": cur.get("label") or ident,
        "letter": cur.get("letter"),
        "file": "assets/img/%s.%s" % (ident, ext),
        "source": titre.replace("File:", ""),
        "page": ii.get("descriptionurl", ""),
        "width": ii.get("thumbwidth"),
        "height": ii.get("thumbheight"),
        "originalWidth": ii.get("width"),
        "originalHeight": ii.get("height"),
        "license": clean((em.get("LicenseShortName") or {}).get("value", "")),
        "author": (clean((em.get("Artist") or {}).get("value", ""))
                  or clean((em.get("Credit") or {}).get("value", ""))
                  or "Auteur non précisé (domaine public)"),
        "credit": clean((em.get("Credit") or {}).get("value", "")),
    })
    print("  %-18s %dpx  %s  (%d Ko)"
          % (ident, largeur, cur["source"][:38], len(r.content) // 1024))
    # le manifeste est écrit après chaque image : interrompre le script (le
    # réseau lâche, on Ctrl-C) ne doit pas faire perdre les downloads réussis
    ecrire_manifeste()
    time.sleep(PATIENCE)
    return True


def ecrire_manifeste():
    io.open(MAN, "w", encoding="utf-8").write(
        json.dumps(man, ensure_ascii=False, indent=2))


def main():
    global man
    man = json.loads(io.open(MAN, encoding="utf-8").read())

    demandes = [a for a in sys.argv[1:] if not a.startswith("--")]
    cibles = demandes or sorted(PINS)
    a_reprendre = []
    for ident in cibles:
        if ident not in PINS:
            print("pas épinglé :", ident)
            continue
        attendu = PINS[ident].replace("File:", "")
        if man.get(ident, {}).get("source") != attendu:
            a_reprendre.append(ident)

    if not a_reprendre:
        print("Tout est déjà à jour (%d épingles vérifiées)." % len(cibles))
        return 0

    print("%d image(s) à reprendre sur %d" % (len(a_reprendre), len(cibles)))
    ok = 0
    for ident in a_reprendre:
        if reprendre(ident, PINS[ident]):
            ok += 1
    ecrire_manifeste()
    print("récupérées : %d / %d" % (ok, len(a_reprendre)))
    return 0 if ok == len(a_reprendre) else 1


if __name__ == "__main__":
    sys.exit(main())