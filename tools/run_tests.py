# -*- coding: utf-8 -*-
"""Lance `tools/test.html` dans Edge en mode headless et lit le résultat.

Le tableau de vérifications vit dans une page web : sans navigateur, on ne
peut que le lire à la main. Ce script pilote Edge avec --dump-dom, ce qui rend
la suite de tests exécutable depuis la ligne de commande — donc lançable après
chaque modification.

    python tools/run_tests.py

Prérequis : `python tools/serve.py 8765` tourne dans un autre terminal.
"""
import io
import os
import re
import subprocess
import sys
import tempfile

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
URL = "http://localhost:8765/tools/test.html"


def main():
    if not os.path.exists(EDGE):
        sys.exit("Edge introuvable : " + EDGE)

    tmp = os.path.join(tempfile.gettempdir(), "opencode")
    os.makedirs(tmp, exist_ok=True)
    profil = os.path.join(tmp, "edgeprof-tests")
    sortie = os.path.join(tmp, "testdom.html")
    if os.path.exists(sortie):
        os.remove(sortie)

    subprocess.run(
        [EDGE, "--headless=new", "--disable-gpu", "--no-first-run",
         "--user-data-dir=" + profil,
         "--virtual-time-budget=180000",
         "--dump-dom", URL],
        stdout=open(sortie, "wb"), stderr=subprocess.DEVNULL, timeout=400)

    html = io.open(sortie, encoding="utf-8", errors="replace").read()

    resume = re.search(r'id="summary"[^>]*>([^<]*)<', html)
    lignes = re.findall(
        r'<td class="(ok|ko)">[^<]*</td><td>([^<]*)</td><td>([^<]*)</td>', html)

    if not lignes:
        sys.exit("Aucune ligne de résultat : la page ne s'est pas chargée "
                 "(le serveur tourne-t-il sur le port 8765 ?)")

    echecs = [l for l in lignes if l[0] == "ko"]
    for etat, nom, detail in lignes:
        print("%-6s %-46s %s" % ("OK" if etat == "ok" else "ÉCHEC", nom,
                                 detail[:80]))
    print()
    print(resume.group(1) if resume else "%d / %d" % (len(lignes) - len(echecs),
                                                     len(lignes)))
    return 1 if echecs else 0


if __name__ == "__main__":
    sys.exit(main())