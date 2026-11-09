# -*- coding: utf-8 -*-
"""
Planche de revue des dessins vectoriels.

`tools/sheets.py` relit les photographies ; celui-ci relit les dessins, que la
planche de photos ignore complètement. Sans lui, les 112 dessins des pages
20 à 39 n'auraient été vus qu'en ouvrant le lecteur page par page.

Il produit une page HTML par module, puis il suffit de la capturer :

    node tools/svg_sheet.js art7 > tools/sheets/art7.html
    powershell -File tools/shoot_sheet.ps1 art7
"""
import io
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "tools", "sheets")

# genre de section  ->  (module, fonction, fonction de libellé)
GROUPES = [
    ("Les actions à l’école", "ART7", "action", "actionNom",
     ["s-asseoir", "associer", "se-calmer", "choisir", "colorier", "corriger",
      "decrire", "demander", "dessiner", "ecouter", "ecrire", "encercler",
      "fermer", "se-lever", "lever-main", "lire", "observer", "ouvrir",
      "parler", "partager", "ranger", "sortir", "souligner", "surligner",
      "trouver"]),
    ("Le personnel de l’école", "ART7", "personnel", "personnelNom",
     ["bibliothecaire", "concierge", "orthophoniste", "secretaire",
      "brigadier", "directeur", "enseignant", "infirmiere"]),
    ("Les matières", "ART7", "matiere", "matiereNom",
     ["anglais", "arts-plastiques", "education-physique", "francais",
      "mathematiques", "musique", "sciences", "univers-social"]),
    ("L’école et ses environs", "ART7", "lieu", "lieuNom",
     ["arret-autobus-ecole", "auditorium", "bibliotheque", "bureau-directeur",
      "cafeteria", "casiers", "classe", "corridor", "cour-recre", "gymnase",
      "local-arts", "local-info", "local-musique", "secretariat", "toilettes"]),
    ("Les métiers", "ART8", "metier", "metierNom",
     ["architecte", "acteur", "agriculteur", "chauffeur-autobus",
      "chauffeur-taxi", "coiffeur", "cuisinier", "dentiste", "dessinateur",
      "facteur", "ingenieur", "mecanicien", "medecin", "ouvrier-batiment",
      "pilote", "policier", "pompier", "serveur", "vendeur", "veterinaire"]),
    ("Les mots de position", "ART8", "position", None,
     ["dans", "sur", "en-dessous", "au-dessus", "devant", "derriere", "a-cote",
      "entre", "dessus", "milieu", "dessous", "gauche", "centre", "droite"]),
    ("Les mots de mouvement", "ART8", "mouvement", None,
     ["en-haut", "en-bas", "sortir", "entrer", "aller-vers", "s-eloigner",
      "a-travers", "autour"]),
    ("Les moments", "ART8", "temps", None,
     ["matin", "apres-midi", "soir", "nuit", "hier", "aujourdhui", "demain"]),
    ("Les jours de la semaine", "ART8", "jour", "jourNom",
     ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]),
]

# le module qui définit chaque objet global
FICHIERS = {"ART7": "art7.js", "ART8": "art8.js"}

# le nom du fichier de planche n'a rien à voir avec le module : ART7 et ART8
# alimentent les deux planches, sinon on ne verrait que la moitié des dessins.
PLANCHES = {
    "art7": [g for g in GROUPES if g[1] == "ART7"],
    "art8": [g for g in GROUPES if g[1] == "ART8"],
    "all": GROUPES,
}

PAGE = """<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8">
<title>%(titre)s</title>
<style>
 body { margin:0; padding:14px; background:#fff; font:13px "Segoe UI",Arial,sans-serif; }
 h1 { font-size:20px; margin:0 0 4px; }
 h2 { font-size:16px; margin:18px 0 6px; color:#2f6fb5; }
 .grid { display:grid; grid-template-columns:repeat(7,1fr); gap:8px; }
 figure { margin:0; border:1px solid #ddd; border-radius:6px; padding:4px; text-align:center; }
 svg { width:100%%; height:112px; }
 figcaption { font-size:11.5px; color:#333; margin-top:2px; }
 .vide { color:#c00; font-weight:bold; }
</style></head><body>
<h1>Planche de revue — %(titre)s</h1>
%(corps)s
</body></html>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    modules = sys.argv[1:] or ["art7", "art8"]

    for m in modules:
        groupes = PLANCHES.get(m)
        if groupes is None:
            sys.exit("planche inconnue : %s (connues : %s)"
                     % (m, ", ".join(sorted(PLANCHES))))
        corps = []
        vides = 0
        total = 0
        for titre, art, fn, nomfn, cles in groupes:
            if not cles:
                continue
            js = (
                "global.window={};"
                "require('./assets/js/%s');"
                "const A=window.%s;"
                "const out={};"
                "for (const k of %s) out[k]=A.%s(k);"
                "process.stdout.write(JSON.stringify(out));"
                % (FICHIERS[art], art, json.dumps(cles), fn)
            )
            r = subprocess.run(["node", "-e", js], cwd=ROOT, capture_output=True)
            if r.returncode != 0:
                sys.exit("%s : %s" % (m, r.stderr.decode("utf-8", "replace")))
            dessins = json.loads(r.stdout.decode("utf-8"))

            js2 = (
                "global.window={};"
                "require('./assets/js/%s');"
                "const A=window.%s;"
                "const out={};"
                "for (const k of %s) out[k]=A.%s ? A.%s(k) : k;"
                "process.stdout.write(JSON.stringify(out));"
                % (FICHIERS[art], art, json.dumps(cles), nomfn, nomfn)
            )
            libelles = {}
            if nomfn:
                r2 = subprocess.run(["node", "-e", js2], cwd=ROOT, capture_output=True)
                libelles = json.loads(r2.stdout.decode("utf-8"))

            cases = []
            for k in cles:
                svg = dessins.get(k) or ""
                total += 1
                if not svg or "undefined" in svg or "NaN" in svg:
                    vides += 1
                    cases.append('<figure><div class="vide">VIDE<br>%s</div></figure>' % k)
                    continue
                cases.append("<figure>%s<figcaption>%s</figcaption></figure>"
                             % (svg, libelles.get(k, k)))
            corps.append("<h2>%s (%d)</h2><div class=\"grid\">%s</div>"
                         % (titre, len(cles), "".join(cases)))

        page = PAGE % {"titre": m, "corps": "".join(corps)}
        chemin = os.path.join(OUT, m + ".html")
        io.open(chemin, "w", encoding="utf-8").write(page)
        print("%-6s %d dessins, %d vides  ->  %s"
              % (m, total, vides, os.path.relpath(chemin, ROOT)))


if __name__ == "__main__":
    main()