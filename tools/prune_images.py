# -*- coding: utf-8 -*-
"""Ne garde plus que les photos que le lecteur montre réellement.

La liste vient de `fetch_images.jobs()`, qui est la seule source de vérité :
une version antérieure énumérait lexique et lexique2 à la main, et le
troisième lexique — les 281 photos des pages 20 à 39 — aurait été entièrement
supprimé au premier passage de l'outil.

On retire ensuite les mots que le lecteur dessine : une scène dessinée n'a pas
besoin de photo.
"""
import io
import json
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(ICI)
IMG = os.path.join(ROOT, "assets", "img")
MAN = os.path.join(ROOT, "assets", "js", "images.json")
sys.path.insert(0, ICI)

from fetch_images import jobs          # noqa: E402
import art6_keys                      # noqa: E402

dessines = set(art6_keys.ART6_KEYS)

garder = {j[0] for j in jobs()} - dessines

man = json.loads(io.open(MAN, encoding="utf-8").read())
keep = {k: v for k, v in man.items() if k in garder}
drop = sorted(set(man) - set(keep))

libere = 0
for k in drop:
    for ext in ("jpg", "png"):
        p = os.path.join(IMG, k + "." + ext)
        if os.path.exists(p):
            libere += os.path.getsize(p)
            os.remove(p)

io.open(MAN, "w", encoding="utf-8").write(
    json.dumps(keep, ensure_ascii=False, indent=2))

print("conservées : %d   supprimées : %d   libéré : %.1f Mo"
      % (len(keep), len(drop), libere / 1048576.0))
if drop:
    print("supprimées :", ", ".join(drop))