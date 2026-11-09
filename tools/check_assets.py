# -*- coding: utf-8 -*-
"""Sanity checks: every referenced asset exists and the manifest is sane."""
import io
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
man = json.loads(io.open(os.path.join(ROOT, "assets/js/images.json"),
                         encoding="utf-8").read())

bad = []
for k, v in man.items():
    p = os.path.join(ROOT, v["file"].replace("/", os.sep))
    if not os.path.exists(p):
        bad.append((k, "MISSING FILE", v["file"]))
    elif os.path.getsize(p) < 3000:
        # Les drapeaux viennent de fichiers vectoriels : leur rendu est plat et
        # pèse quelques kilo-octets. C'est normal, ce n'est pas une image
        # tronquée — on vérifie donc la source plutôt que le poids.
        if not str(v.get("source", "")).lower().endswith(".svg"):
            bad.append((k, "SUSPICIOUSLY SMALL", v["file"]))
    for f in ("label", "source", "license", "author"):
        if not v.get(f):
            bad.append((k, "MISSING FIELD: " + f, ""))

# every <img src="assets/img/..."> referenced from the JS must be in the manifest
files = set(v["file"] for v in man.values())
app = io.open(os.path.join(ROOT, "assets/js/app.js"), encoding="utf-8").read()
for m in re.finditer(r'"(arc-en-ciel|avion|ballon|bateau|carotte|clou|dinosaure|drapeau|elephant|escargot|fleur|fourmi|girafe|gorille|helicoptere|hibou|iglou|ile|jongleur|jus|kangourou|koala|licorne|lion|maison|marteau|nez|nid|orange|otarie|pomme|porte|quenouille|quilles|radio|rateau|serpent|souris|tortue|train|uniforme|usine|velo|violon|wagon|wapiti|xavier|xylophone|yaourt|yoyo|zebre|zebu)"', app):
    if m.group(1) not in man:
        bad.append((m.group(1), "APP REQUIRES, NOT IN MANIFEST", ""))

# every key used by the reader's photographic sections must exist.
# Attention : `vocabCard` rend le dessin ART6 *avant* de consulter le
# manifeste, donc une scène dessinée n'a besoin d'aucune photo. Sans cette
# exclusion, le contrôle exigerait des images que le lecteur n'utilise pas.
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import art6_keys                                          # noqa: E402
DESSINES = set(art6_keys.ART6_KEYS)

data = io.open(os.path.join(ROOT, "assets/js/data.js"), encoding="utf-8").read()
sections = re.findall(
    r'\{\s*title:\s*"[^"]+",\s*kind:\s*"(photo|phrase)",[^}]*?items:\s*\[(.*?)\]',
    data, re.S)
refs = 0
for _titre, corps in sections:
    for k in re.findall(r'"([^"]+)"', corps):
        if k in DESSINES:
            continue
        refs += 1
        if k not in man:
            bad.append((k, "PAGE REQUIRES, NOT IN MANIFEST", ""))

print("manifest entries :", len(man))
print("files on disk    :", len(os.listdir(os.path.join(ROOT, "assets/img"))))
print("referenced by pages :", refs)
print("total size       : %.1f MB" % (
    sum(os.path.getsize(os.path.join(ROOT, v["file"].replace("/", os.sep)))
        for v in man.values()) / 1048576.0))

lic = {}
for v in man.values():
    lic[v.get("license", "?")] = lic.get(v.get("license", "?"), 0) + 1
print("licences         :", json.dumps(lic, ensure_ascii=False))

if bad:
    print("\nPROBLEMS (%d):" % len(bad))
    for k, why, extra in bad[:20]:
        print("  %-20s %-34s %s" % (k, why, extra))
    raise SystemExit(1)

print("\nno problems found.")