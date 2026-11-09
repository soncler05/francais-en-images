# -*- coding: utf-8 -*-
"""Record the real on-disk dimensions of each image in the manifest.

Commons thumbnails can be re-rendered at a larger size than requested, so the
thumbwidth reported by the API is not always what we actually downloaded.
"""
import io, json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN = os.path.join(ROOT, "assets", "js", "images.json")

man = json.loads(io.open(MAN, encoding="utf-8").read())
changed = 0
for k, v in man.items():
    p = os.path.join(ROOT, v["file"].replace("/", os.sep))
    with Image.open(p) as im:
        w, h = im.size
    if (v.get("width"), v.get("height")) != (w, h):
        v["width"], v["height"] = w, h
        changed += 1

io.open(MAN, "w", encoding="utf-8").write(json.dumps(man, ensure_ascii=False, indent=2))
print("updated %d entries" % changed)
for k in sorted(man)[:3]:
    print("  %-14s %sx%s  (original %sx%s)" % (
        k, man[k]["width"], man[k]["height"],
        man[k]["originalWidth"], man[k]["originalHeight"]))
