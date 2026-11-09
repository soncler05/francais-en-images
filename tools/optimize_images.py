# -*- coding: utf-8 -*-
"""Allège les photographies : réduction puis recompression.

Certaines vignettes de Commons sortent à 4 Mo pour 1280 px : encodées sans
prudence. À la taille d'une fiche (~250 px) la différence est invisible, alors
on ré-encode avec un quotient plus bas. Les fichiers restent les mêmes, sous
la même licence et avec le même crédit — seule la compression change.

Le gain le plus grand ne vient pas du quotient mais de la **réduction** : les
images arrivent en 1280 px pour être affichées sur 230 px, puis agrandies
parfois une fois dans la visionneuse. On ramène donc le grand côté à
`COTE_MAX`, ce qui divise le poids par quatre sans perte visible.

    python tools/optimize_images.py            # tous les fichiers trop gros
    python tools/optimize_images.py --force    # même les petits
"""
import io
import os
import sys

from PIL import Image

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(RACINE, "assets", "img")

COTE_MAX = 1000        # visionneuse : ~900 px, on garde une marge
QUALITE = 82
SEUIL = 90 * 1024      # en dessous, on ne touche à rien
FORCE = "--force" in sys.argv


def poids(dossier):
    return sum(os.path.getsize(os.path.join(dossier, n))
               for n in os.listdir(dossier))


def main():
    avant = poids(IMG)
    gains = []

    for nom in sorted(os.listdir(IMG)):
        if not nom.lower().endswith((".jpg", ".jpeg")):
            continue
        p = os.path.join(IMG, nom)
        taille = os.path.getsize(p)
        if not FORCE and taille <= SEUIL:
            continue
        try:
            with Image.open(p) as im:
                trop_grand = max(im.size) > COTE_MAX
                if not (trop_grand or FORCE):
                    continue
                im = im.convert("RGB")
                if trop_grand:
                    facteur = COTE_MAX / float(max(im.size))
                    im = im.resize((max(1, round(im.width * facteur)),
                                    max(1, round(im.height * facteur))),
                                   Image.LANCZOS)
                buf = io.BytesIO()
                im.save(buf, "JPEG", quality=QUALITE, optimize=True,
                        progressive=True)
                nouveau = buf.getvalue()
        except Exception as e:  # noqa: BLE001
            print("  %s : %s" % (nom, e))
            continue

        if len(nouveau) >= taille:
            continue
        # on ne réécrit qu'après avoir vérifié que l'image se relit
        with Image.open(io.BytesIO(nouveau)) as verif:
            verif.load()
        io.open(p, "wb").write(nouveau)
        gains.append((nom, taille, len(nouveau)))

    apres = poids(IMG)
    for nom, a, b in sorted(gains, key=lambda g: g[1] - g[2], reverse=True)[:12]:
        print("  %-24s %6.0f kB -> %6.0f kB" % (nom[:-4], a / 1024.0,
                                                  b / 1024.0))
    print("dossier : %.1f Mo -> %.1f Mo  (%d fichiers allégés, "
          "%.1f Mo gagnés)"
          % (avant / 1048576.0, apres / 1048576.0, len(gains),
             (avant - apres) / 1048576.0))


if __name__ == "__main__":
    main()