# -*- coding: utf-8 -*-
"""Convertit les quelques PNG photographiques en JPEG.

Commons sert une vignette .png quand l'original est un PNG : pour une photo,
un PNG de 1280 px pèse 3 à 4 Mo là où le même fichier en JPEG pèse 300 kB.
On convertit, on met le manifeste à jour, on efface le PNG.
"""
import io, json, os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "assets", "img")
MAN = os.path.join(ROOT, "assets", "js", "images.json")
SEUIL = 400 * 1024

man = json.loads(io.open(MAN, encoding="utf-8").read())
gagne = 0

for ident, e in sorted(man.items()):
    src = os.path.join(ROOT, e["file"].replace("/", os.sep))
    if not src.lower().endswith(".png"):
        continue
    poids = os.path.getsize(src)
    if poids <= SEUIL:
        continue
    with Image.open(src) as im:
        # Une photo en PNG arrive souvent en RGBA (canal alpha inutile).
        # On l'aplatit sur fond blanc plutôt que de garder 2 Mo de PNG : les
        # drapeaux, eux, méritent le PNG, et pèsent moins de 400 Ko.
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            aplati = Image.new("RGB", im.size, (255, 255, 255))
            aplati.paste(im, mask=im.split()[-1])
            rgb = aplati
        elif im.mode in ("RGB", "L"):
            rgb = im.convert("RGB")
        else:
            print("  %s : mode %s, on garde le PNG" % (ident, im.mode))
            continue
        buf = io.BytesIO()
        rgb.save(buf, "JPEG", quality=84, optimize=True, progressive=True)
    dest = src[:-4] + ".jpg"
    io.open(dest, "wb").write(buf.getvalue())
    os.remove(src)
    e["file"] = e["file"][:-4] + ".jpg"
    print("  %-12s PNG %6.0f kB -> JPEG %6.0f kB"
          % (ident, poids / 1024.0, os.path.getsize(dest) / 1024.0))
    gagne += poids - os.path.getsize(dest)

io.open(MAN, "w", encoding="utf-8").write(
    json.dumps(man, ensure_ascii=False, indent=2))
print("gain total : %.1f Mo" % (gagne / 1048576.0))
