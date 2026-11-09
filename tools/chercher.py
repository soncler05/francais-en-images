# -*- coding: utf-8 -*-
"""Cherche des fichiers Commons pour un mot, et affiche les candidats.

Outil de travail : quand une planche de revue montre qu'une photo ne veut rien
dire, on cherche ici le fichier qu'il faut épingler, puis on le note dans
PICK / PICK2 / PICK3.

    python tools/chercher.py "shamrock"
    python tools/chercher.py "new year fireworks" --n 12
"""
import io
import json
import os
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)

from fetch_images import api_get, UA  # noqa: E402


def chercher(q, n=10):
    d = api_get({
        "action": "query",
        "list": "search",
        "srsearch": "%s filetype:bitmap" % q,
        "srnamespace": 6,
        "srlimit": n,
    })
    return [r["title"] for r in (d.get("query") or {}).get("search") or []]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    n = 10
    for a in sys.argv[1:]:
        if a.startswith("--n"):
            n = int(a[3:])
    if not args:
        sys.exit(__doc__)
    for titre in chercher(" ".join(args), n):
        # on écarte ce qui n'a rien d'un fichier photographique
        if any(x in titre.lower() for x in (".svg", "commons-logo", "edit-",
                                            "question_book", "padlock", "ambox")):
            continue
        print(titre.replace("File:", ""))


if __name__ == "__main__":
    main()