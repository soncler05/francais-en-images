# -*- coding: utf-8 -*-
"""Cherche plusieurs mots en une passe et affiche les candidats.

    python tools/chercher_plusieurs.py "chest of drawers" "kissing couple" ...

Évite l'aller-retour quand une planche de revue a révélé dix photos à
remplacer d'un coup.
"""
import io
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)

from fetch_images import api_get  # noqa: E402
from chercher import chercher     # noqa: E402

IGNORER = (".svg", ".tif", ".tif", "commons-logo", "edit-", "question_book",
           "padlock", "ambox", "commons-", "wikipedia", "wiki", "nuvola",
           "crystal clear", "user_", "text_document")


def main():
    n = 6
    args = []
    for a in sys.argv[1:]:
        if a.startswith("--n"):
            n = int(a[3:])
        else:
            args.append(a)
    for q in args:
        print("=== %s" % q)
        try:
            for t in chercher(q, n + 4):
                base = t.lower()
                if any(x in base for x in IGNORER):
                    continue
                print("   " + t.replace("File:", ""))
                n -= 1
                if n <= 0:
                    break
        except Exception as e:      # noqa: BLE001
            print("   ERREUR:", e)
        n = 6


if __name__ == "__main__":
    main()