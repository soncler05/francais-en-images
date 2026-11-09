# -*- coding: utf-8 -*-
"""Planche de revue par section : une image par entrée, avec son identifiant.

C'est l'outil qui a permis de débusquer un lézard pour « un kangourou » ou
une boutique pour « un dollar ». On regarde la planche, on note les ids à
épingler dans tools/lexique.py, on relance fetch_images.py.
"""
import io, json, os, re, math
from PIL import Image, ImageFont, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")
OUT = os.path.join(ROOT, "tools", "sheets")

# les mots que le lecteur dessine n'ont pas de photo : les planches doivent
# les ignorer, sinon elles annoncent « MANQUE » pour dix chores qui sont très
# bien illustrés par un dessin
import art6_keys  # noqa: E402
DESSINES = set(art6_keys.ART6_KEYS)

man = json.loads(io.open(os.path.join(ROOT, "assets", "js", "images.json"),
                         encoding="utf-8").read())

# récupère les sections déclarées dans data.js
data = io.open(os.path.join(ROOT, "assets", "js", "data.js"), encoding="utf-8").read()
sections = []
for m in re.finditer(r'\{\s*title:\s*"([^"]+)",\s*kind:\s*"([^"]+)",[^}]*?items:\s*\[(.*?)\]', data, re.S):
    title, kind, body = m.group(1), m.group(2), m.group(3)
    if kind != "photo" and kind != "phrase":
        continue
    ids = re.findall(r'"([^"]+)"', body)
    if ids:
        sections.append((title, kind, ids))

# dédoublonne en gardant l'ordre
seen, uniq = set(), []
for t, k, ids in sections:
    ids = [i for i in ids if i not in DESSINES and i not in seen]
    seen.update(ids)
    uniq.append((t, k, ids))
sections = uniq

os.makedirs(OUT, exist_ok=True)


def font(sz, bold=False):
    for name in (("segoeuib.ttf" if bold else "segoeui.ttf"), "arialbd.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, sz)
        except Exception:
            pass
    return ImageFont.load_default()


CELL, PAD, LABEL, TITLE = 230, 8, 22, 46
COLS = 6
f_lab = font(13)
f_t = font(20, True)

total_missing = 0
for title, kind, ids in sections:
    rows = math.ceil(len(ids) / COLS)
    W = COLS * (CELL + PAD) + PAD
    H = TITLE + rows * (CELL + LABEL + PAD) + PAD
    sheet = Image.new("RGB", (W, H), (250, 248, 244))
    d = ImageDraw.Draw(sheet)
    d.text((PAD, 12), "%s  (%d)" % (title, len(ids)), fill=(20, 20, 20), font=f_t)
    miss = []
    for i, ident in enumerate(ids):
        r, c = divmod(i, COLS)
        x = PAD + c * (CELL + PAD)
        y = TITLE + r * (CELL + LABEL + PAD)
        p = os.path.join(IMG, ident + ".jpg")
        if not os.path.exists(p):
            p2 = os.path.join(IMG, ident + ".png")
            if os.path.exists(p2):
                p = p2
            else:
                miss.append(ident)
                d.rectangle([x, y, x + CELL, y + CELL], fill=(255, 220, 220))
                d.text((x + 10, y + CELL // 2), "MANQUE", fill=(200, 0, 0), font=f_lab)
                d.text((x + 2, y + CELL + 4), ident, fill=(10, 10, 10), font=f_lab)
                continue
        im = Image.open(p).convert("RGB")
        im.thumbnail((CELL, CELL), Image.LANCZOS)
        sheet.paste(im, (x + (CELL - im.width) // 2, y + (CELL - im.height) // 2))
        d.rectangle([x, y, x + CELL, y + CELL], outline=(200, 195, 185))
        d.text((x + 2, y + CELL + 4), ident, fill=(10, 10, 10), font=f_lab)
    total_missing += len(miss)
    safe = re.sub(r"[^0-9A-Za-z]+", "_", title.lower()).strip("_")[:28]
    out = os.path.join(OUT, safe + ".jpg")
    sheet.save(out, quality=86)
    print("%-30s %2d images  %s" % (title, len(ids),
          ("MANQUE: " + ", ".join(miss)) if miss else ""))

print("\nfichiers manquants :", total_missing)
