# -*- coding: utf-8 -*-
"""Vérifie d'un coup que tous les fichiers épinglés existent vraiment sur Commons.

`python tools/check_pins.py` vérifie la logique des épingles (doublons,
obsolètes) mais pas que le fichier désigné existe encore : une épingle fausse
échoue silencieusement, et le mot reste sans illustration.

    python tools/check_pins_fichiers.py
"""
import io
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)

import lexique
import lexique2
import lexique3
from fetch_images import api_get

PINS = []
for nom, pick in (("PICK", lexique.PICK),
                  ("PICK2", lexique2.PICK2),
                  ("PICK3", lexique3.PICK3)):
    for mot, fichier in sorted(pick.items()):
        PINS.append((nom, mot, fichier))


def main():
    titres = [f for _, _, f in PINS]
    vus = set()
    for i in range(0, len(titres), 20):
        d = api_get({"action": "query",
                     "titles": "|".join(titres[i:i + 20]),
                     "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 900})
        for p in (d.get("query") or {}).get("pages") or []:
            if "missing" in p:
                continue
            ii = (p.get("imageinfo") or [{}])[0]
            if ii.get("thumburl"):
                vus.add(p["title"])

    absents = [(v, m, f) for v, m, f in PINS if f not in vus]
    print("%d épingles, %d fichiers trouvés sur Commons." % (len(PINS), len(vus)))
    if absents:
        print()
        for v, m, f in absents:
            print("ABSENT  %-18s %-6s %s" % (m, v, f))
        return 1
    print("Toutes les épingles pointent vers un fichier existant.")
    return 0


if __name__ == "__main__":
    sys.exit(main())