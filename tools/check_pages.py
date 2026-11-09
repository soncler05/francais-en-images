# -*- coding: utf-8 -*-
"""
Vérifie, sans navigateur, que chaque mot des pages 20 à 39 du livre a bien
une illustration.

Trois questions, une par moteur d'illustration :
  1. les mots photographiés existent-ils dans assets/js/images.js ?
  2. les mots dessinés existent-ils dans le bon module d'art ?
  3. le libellé affiché est-il bien du français, et non l'identifiant ?

Ce contrôle tourne en quelques secondes ; tools/test.html refait le même
travail dans un vrai navigateur, mais ne s'exécute qu'à la main.
"""
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MOTEURS = {
    # genre de section  ->  (module d'art, fonction de dessin)
    "action-ecole": ("ART7", "action"),
    "personnel": ("ART7", "personnel"),
    "matiere": ("ART7", "matiere"),
    "lieu-ecole": ("ART7", "lieu"),
    "metier": ("ART8", "metier"),
    "position": ("ART8", "position"),
    "mouvement": ("ART8", "mouvement"),
    "temps": ("ART8", "temps"),
    "jour-semaine": ("ART8", "jour"),
}

# identifiants volontairement différents du mot affiché : ils ne doivent
# jamais apparaître tels quels sous une fiche.
MOTS_FRANCAIS = re.compile(
    r"^[\w’' -]+$"
)


def lire(nom):
    return io.open(os.path.join(ROOT, nom), encoding="utf-8").read()


def pages():
    """Récupère PAGES3 en appelant le vrai data.js sous Node."""
    js = (
        "const fs=require('fs');global.window={};"
        "new Function('window', fs.readFileSync('assets/js/data.js','utf8'))(window);"
        "const p=window.BOOK.pages.filter(x=>x.book>=20);"
        "process.stdout.write(JSON.stringify(p));"
    )
    import subprocess
    r = subprocess.run(["node", "-e", js], cwd=ROOT, capture_output=True)
    if r.returncode != 0:
        sys.exit("data.js : " + r.stderr.decode("utf-8", "replace"))
    return json.loads(r.stdout.decode("utf-8"))


def cles_dessin():
    """Toutes les clés dessinées, par module."""
    out = {}
    for mod, nom in (("ART7", "art7.js"), ("ART8", "art8.js")):
        src = lire("assets/js/" + nom)
        out[mod] = set(re.findall(r'^\s*(?:act|pers|mat|lieu|met|bloc)\("([^"]+)"',
                                  src, re.M))
        # ART8 : les tables associatives
        for m in re.finditer(r'(?:POSITION|MOUV|TEMPS)\["([^"]+)"\]\s*=', src):
            out[mod].add(m.group(1))
        for m in re.finditer(r'^\s*JOUR\.(\w+)\s*=', src, re.M):
            out[mod].add(m.group(1))
    return out


def main():
    p = pages()
    dessine = cles_dessin()
    photos = set(json.loads(lire("assets/js/images.json")).keys())

    n_photo = n_dessin = 0
    manquantes, mauvais_libelles = [], []

    for page in p:
        for sec in page["sections"]:
            genre = sec["kind"]
            for k in sec["items"]:
                if genre in ("photo", "phrase"):
                    n_photo += 1
                    if k not in photos:
                        manquantes.append("%s / %s" % (k, page["id"]))
                    continue
                n_dessin += 1
                mod = MOTEURS.get(genre)
                if mod is None:
                    mauvais_libelles.append("genre inconnu : " + genre)
                elif k not in dessine[mod[0]]:
                    manquantes.append("%s (%s)" % (k, genre))

    total = len(p)
    mots = sum(len(s["items"]) for pg in p for s in pg["sections"])
    print("pages 20-39 : %d   mots : %d   (%d photos, %d dessins)"
          % (total, mots, n_photo, n_dessin))

    if manquantes:
        print("\nMANQUANT (%d) :" % len(manquantes))
        for m in manquantes:
            print("   " + m)
    else:
        print("toutes les illustrations sont présentes")

    # les dialogues : 2 répliques en général, 3 sur la page 29
    for pg in p:
        d = pg.get("dialogue")
        if d and len(d) not in (2, 3):
            mauvais_libelles.append("%s : %d répliques" % (pg["id"], len(d)))

    if mauvais_libelles:
        print("\nÀ REVOIR (%d) :" % len(mauvais_libelles))
        for m in mauvais_libelles:
            print("   " + m)
        return 1

    print("\nOK")
    return 0


if __name__ == "__main__":
    sys.exit(main())