# -*- coding: utf-8 -*-
"""Garde-fous des listes d'épinglage.

Trois erreurs ont déjà coûté du temps, et chacune était silencieuse :

  1. une clé en double dans `PICK` écrase la précédente sans avertissement ;
  2. un identifiant défini dans deux lexiques fait que le premier est ignoré
     sans rien dire — c'est ainsi qu'un « un violon » a été cherché deux fois,
     et qu'un « lave-vaisselle » dessiné (une tâche) a volé la place du
     lave-vaisselle photographié (un appareil) ;
  3. une épingle devenue inutile traîne dans le code.

`fetch_images.jobs()` est l'unique source de vérité pour les identifiants : il
 refuse déjà de démarrer s'il y en a un en double. Ce script vérifie le reste.
"""
import io
import os
import re
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, ICI)

from fetch_images import jobs
import lexique
import lexique2
import lexique3

SOURCES = [
    ("lexique.py", lexique.PICK, "PICK"),
    ("lexique2.py", lexique2.PICK2, "PICK2"),
    ("lexique3.py", getattr(lexique3, "PICK3", {}), "PICK3"),
]

problemes = []
ids = {j[0] for j in jobs()}

print("%-14s %10s %10s" % ("lexique", "épingles", "sans pin"))
print("-" * 38)
total_pin = 0
for nom, pick, var in SOURCES:
    src = io.open(os.path.join(ICI, nom), encoding="utf-8").read()
    bloc = re.search(r"^%s = \{(.*?)^\}" % var, src, re.S | re.M)
    if bloc:
        cles = re.findall(r'^\s*"([^"]+)"\s*:', bloc.group(1), re.M)
        dup = sorted({k for k in cles if cles.count(k) > 1})
        if dup:
            problemes.append("%s : clé en double dans %s : %s"
                             % (nom, var, ", ".join(dup)))
    perime = sorted(set(pick) - ids)
    if perime:
        problemes.append("%s : épingles devenues inutiles : %s"
                         % (nom, ", ".join(perime)))
    total_pin += len(pick)
    print("%-14s %10d %10d" % (nom, len(pick), len(ids - set(pick))))

print("\n%d mots à illustrer, %d épinglés à la main." % (len(ids), total_pin))

if problemes:
    print()
    for p in problemes:
        print("PROBLÈME : " + p)
    sys.exit(1)

print("Aucune clé en double, aucune épingle inutile.")