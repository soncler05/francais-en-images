# -*- coding: utf-8 -*-
"""
Fetch high-resolution, freely-licensed illustrations from Wikimedia Commons
for the vocabulary of "Le francais en images".

For every entry we run a Commons search, score the candidates on
  * resolution (we want something clearly sharper than the 2015 scan)
  * aspect ratio (cards are near-square, so avoid panoramas)
  * freshness (the brief asks for recent imagery)
  * title relevance
then download the winner as a sized JPEG thumbnail and record its licence
and author so the web page can show proper credits.
"""

import io, json, os, re, sys, time
from urllib.parse import urlencode

import requests

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lexique import ALPHABET, ALIMENTS, PICK
from lexique2 import all_lists as lists2, CATEGORIES, PICK2
from lexique3 import all_lists as lists3, PICK3
from lexique import PICK as PICK1

PICK = dict(PICK1)
PICK.update(PICK2)
PICK.update(PICK3)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "assets", "img")
MANIFEST = os.path.join(ROOT, "assets", "js", "images.json")
CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")

API = "https://commons.wikimedia.org/w/api.php"
UA = "LeFrancaisEnImages-edu/1.0 (educational rebuild; contact: local)"

# Commons throttles hard; be a polite client.
THROTTLE = 1.1


def norm(s):
    """Lower-case, strip accents, collapse punctuation - for title matching."""
    import unicodedata
    s = unicodedata.normalize("NFKD", str(s).lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"[^0-9a-z]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()

# Words that betray a non-photographic / unwanted result.
BAD = re.compile(
    r"logo|coat[ _]of[ _]arms|\bmap\b|diagram|chart|graph|\bsvg\b|poster|stamp|"
    r"icon|symbol|sign[ _]?(board|post)|plaque|banner|graffiti|sketch|drawing|"
    r"painting|illustration|cartoon|comic|screenshot|title[ _]card|poster|"
    r"infographic|timetable|plan[ _]de|blueprint|patent|cover[ _]|book[ _]",
    re.I,
)
GOOD_HINT = re.compile(r"\b(photo|photograph)\b", re.I)

# Une photo de boutique, de foule ou de restaurant ne sert pas à montrer un
# vêtement : on la pénalise au lieu de l'éliminer (parfois la seule option).
SCENE = re.compile(
    r"\b(shop|store|supermarket|market|stall|vendor|window|sign|advert|"
    r"poster|festival|parade|crowd|group|people|restaurant|cafe|bar|"
    r"street|building|interior|window display)\b",
    re.I,
)


def log(*a):
    print(*a, flush=True)


def api_get(params, retries=6):
    params = dict(params)
    params.setdefault("format", "json")
    params.setdefault("formatversion", "2")
    last = None
    for attempt in range(retries):
        try:
            r = requests.get(API, params=params, headers={"User-Agent": UA}, timeout=45)
            if r.status_code == 429:
                wait = 8.0 * (attempt + 1)
                log("   429 - backing off %.0fs" % wait)
                time.sleep(wait)
                continue
            r.raise_for_status()
            time.sleep(THROTTLE)
            return r.json()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(3.0 * (attempt + 1))
    raise RuntimeError("Commons API failed: %s" % last)


def cached_search(query, limit=14):
    """Search Commons, memoised on disk so re-runs never re-hit the API."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = re.sub(r"[^0-9A-Za-z]+", "_", query.lower())[:80]
    path = os.path.join(CACHE_DIR, key + ".json")
    if os.path.exists(path):
        try:
            return json.loads(io.open(path, encoding="utf-8").read())
        except Exception:  # noqa: BLE001
            pass
    data = api_get({
        "action": "query",
        "generator": "search",
        "gsrsearch": "filetype:bitmap " + query,
        "gsrlimit": limit,
        "gsrnamespace": 6,
        "prop": "imageinfo",
        "iiprop": "url|size|mime|timestamp",
        "iiurlwidth": 1000,
    })
    pages = (data.get("query") or {}).get("pages") or []
    out = []
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        if not ii:
            continue
        title = p.get("title", "")
        w, h = ii.get("width", 0), ii.get("height", 0)
        mime = ii.get("mime", "")
        if mime not in ("image/jpeg", "image/png"):
            continue
        if title.lower().endswith(".svg"):
            continue
        if BAD.search(title):
            continue
        if w < 1200 or h < 800:
            continue
        ar = w / float(h)
        if ar < 0.55 or ar > 2.1:
            continue
        ts = ii.get("timestamp", "")
        year = int(ts[:4]) if ts[:4].isdigit() else 0
        out.append({"title": title, "url": ii.get("thumburl"), "w": w, "h": h,
                    "year": year, "mime": mime})
    io.open(path, "w", encoding="utf-8").write(json.dumps(out, ensure_ascii=False))
    return out


def score(c, query_terms):
    s = 0.0
    s += 2.2 * min(c["w"] / 2400.0, 1.5)          # resolution head-room
    ar = c["w"] / float(c["h"])
    s += 1.0 * max(0.0, 1.0 - abs(ar - 1.15))     # near-square is ideal for a card
    y = c["year"]
    s += 0.9 if y >= 2016 else (0.5 if y >= 2010 else (0.2 if y >= 2005 else 0.0))
    t = norm(c["title"])
    if SCENE.search(c["title"]):
        s -= 2.5                      # une scène ne montre pas l'objet
    # les fiches du livre sont des objets isolés : on privilégie les fonds unis
    if re.search(r"\b(white background|isolated|transparent background|cutout|"
                 r"studio|product shot|catalog)\b", c["title"], re.I):
        s += 1.4
    for term in set(norm(x) for x in query_terms):
        if term and len(term) > 3 and term in t:
            s += 0.45
    if GOOD_HINT.search(t):
        s += 0.1
    return s


def cached_category(cat, limit=40):
    """Fichiers d'une catégorie Commons, mémoïsés comme les recherches."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    key = "cat__" + re.sub(r"[^0-9A-Za-z]+", "_", cat.lower()).strip("_")[:80]
    path = os.path.join(CACHE_DIR, key + ".json")
    if os.path.exists(path):
        try:
            return json.loads(io.open(path, encoding="utf-8").read())
        except Exception:  # noqa: BLE001
            pass
    out = []
    # les catégories sont souvent hierarchies : on descend d'un cran
    for depth in (0, 1):
        data = api_get({
            "action": "query",
            "generator": "categorymembers",
            "gcmtitle": cat,
            "gcmlimit": limit,
            "gcmtype": "file" if depth == 0 else "subcat",
            "prop": "imageinfo",
            "iiprop": "url|size|mime|timestamp",
            "iiurlwidth": 1000,
        })
        for p in (data.get("query") or {}).get("pages") or []:
            ii = (p.get("imageinfo") or [{}])[0]
            if not ii or ii.get("mime") not in ("image/jpeg", "image/png"):
                continue
            w, h = ii.get("width", 0), ii.get("height", 0)
            if w < 1000 or h < 750:
                continue
            if BAD.search(p.get("title", "")):
                continue
            ts = ii.get("timestamp", "")
            out.append({"title": p["title"], "url": ii.get("thumburl"), "w": w,
                        "h": h, "year": int(ts[:4]) if ts[:4].isdigit() else 0,
                        "mime": ii["mime"]})
        if depth == 0 and out:
            break
    if not out:  # première catégorie vide : on essaie les sous-catégories
        data = api_get({"action": "query", "generator": "categorymembers",
                        "gcmtitle": cat, "gcmlimit": 8, "gcmtype": "subcat"})
        subs = [(p.get("title") or "")[9:] for p in
                (data.get("query") or {}).get("pages") or []]
        for sub in subs[:4]:
            out.extend(cached_category(sub, 20))
    io.open(path, "w", encoding="utf-8").write(json.dumps(out, ensure_ascii=False))
    return out


def choose(queries, must, cats):
    """Meilleur candidat. Les catégories passent devant la recherche texte."""
    pool, terms = [], []
    for cat in (cats or []):
        pool.extend(cached_category(cat))
    from_cat = len(pool)
    for q in queries:
        terms += [w for w in re.split(r"[^0-9A-Za-zÀ-ÿ]+", q.lower()) if len(w) > 3]
        pool.extend(cached_search(q))
    if not pool:
        return None
    need = [norm(m) for m in (must or []) if m]
    seen, cands = set(), []
    for c in pool:
        if c["title"] in seen:
            continue
        seen.add(c["title"])
        t = norm(c["title"])
        if need and not any(m and (m in t) for m in need):
            continue                      # relevance gate
        cands.append(c)
    if not cands:
        log("      (no candidate passed the relevance gate)")
        return None
    best, best_s = None, -1e9
    for c in cands:
        s = score(c, terms)
        # un fichier venu d'une catégorie a un a priori, mais pas carte blanche :
        # certaines catégories sont pleines de photos de boutique.
        if from_cat and c in pool[:from_cat]:
            s += 1.2
        if s > best_s:
            best, best_s = c, s
    return best


def details(titles):
    """Resolve thumbnails + licence/author metadata in one batched call."""
    out = {}
    for i in range(0, len(titles), 25):
        chunk = titles[i:i + 25]
        data = api_get({
            "action": "query",
            "titles": "|".join(chunk),
            "prop": "imageinfo",
            "iiprop": "url|size|extmetadata",
            "iiextmetadatafilter": "LicenseShortName|Artist|Credit|AttributionRequired|LicenseUrl",
            "iiurlwidth": 1000,
        })
        for p in (data.get("query") or {}).get("pages") or []:
            ii = (p.get("imageinfo") or [{}])[0]
            if ii:
                out[p.get("title", "")] = ii
        time.sleep(0.2)
    return out


def details_ci(titles):
    """details(), but matched case-insensitively - Commons titles are
    inconsistently capitalised and a near-miss should not silently skip."""
    out = details(titles)
    if all(t in out for t in titles):
        return out
    lower = {k.lower(): v for k, v in out.items()}
    return {t: out.get(t) or lower.get(t.lower()) for t in titles}


def clean(s):
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", "", str(s))
    s = re.sub(r"\s+", " ", s).strip()
    return s


def find_local(ident):
    """Existing downloaded file for an id, whatever its extension."""
    for ext in ("jpg", "png"):
        p = os.path.join(IMG_DIR, ident + "." + ext)
        if os.path.exists(p):
            return p
    return None


def download(url):
    """Télécharge une vignette en reculant sur 429.

    Le CDN des vignettes est aussi limité que l'API : sans reprise, une trentaine
    d'images manquaient silencieusement au dossier final.
    """
    last = None
    for attempt in range(5):
        try:
            r = requests.get(url, headers={"User-Agent": UA}, timeout=90)
            if r.status_code == 429:
                wait = 10.0 * (attempt + 1)
                log("     429 — pause %.0fs" % wait)
                time.sleep(wait)
                last = "429 répété"
                continue
            r.raise_for_status()
            time.sleep(0.6)
            return r.content, (r.headers.get("Content-Type") or "image/jpeg")
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(4.0 * (attempt + 1))
    raise RuntimeError(str(last))


def save(ident, ii, title, label, letter, width, query, manifest):
    """Download one resolved imageinfo record and record it in the manifest.

    `title` must be the Commons file title: imageinfo records do not carry one
    (the title belongs to the surrounding page object), so passing it in is the
    only way to keep the credits table honest.
    """
    url = (ii or {}).get("thumburl")
    if not url:
        log("  no thumb for %s" % ident)
        return
    try:
        body, ctype = download(url)
    except Exception as e:  # noqa: BLE001
        log("  download failed %s: %s" % (ident, e))
        return
    # Commons serves .png thumbnails for PNG originals - keep the real format
    # so the browser never gets a PNG named .jpg.
    ext = "png" if "png" in ctype else "jpg"
    path = os.path.join(IMG_DIR, ident + "." + ext)
    stale = os.path.join(IMG_DIR, ident + (".jpg" if ext == "png" else ".png"))
    if os.path.exists(stale):
        os.remove(stale)
    io.open(path, "wb").write(body)

    em = (ii or {}).get("extmetadata") or {}
    title = title or ("File:" + ident)
    manifest[ident] = {
        "label": label,
        "letter": letter,
        "file": "assets/img/%s.%s" % (ident, ext),
        "source": title.replace("File:", ""),
        "page": (ii or {}).get("descriptionurl", ""),
        "width": (ii or {}).get("thumbwidth"),
        "height": (ii or {}).get("thumbheight"),
        "originalWidth": (ii or {}).get("width"),
        "originalHeight": (ii or {}).get("height"),
        "year": int((ii or {}).get("timestamp", "0")[:4] or 0),
        "license": clean(em.get("LicenseShortName", {}).get("value", "")),
        "licenseUrl": clean(em.get("LicenseUrl", {}).get("value", "")),
        # quelques fichiers du domaine public n'ont aucune mention d'auteur ;
        # on l'écrit plutôt que de laisser un trou dans le crédit
        "author": (clean(em.get("Artist", {}).get("value", ""))
                   or clean(em.get("Credit", {}).get("value", ""))
                   or "Auteur non précisé (domaine public)"),
        "query": query,
    }
    log("  saved %-18s %6.1f kB  (%sx%s of %sx%s)  %s" % (
        ident, os.path.getsize(path) / 1024.0,
        manifest[ident]["width"], manifest[ident]["height"],
        manifest[ident]["originalWidth"], manifest[ident]["originalHeight"],
        manifest[ident]["license"][:24]))


def jobs():
    """Toutes les entrées à photographier, avec leur largeur de service.

    WIDTH_MAP : les fiches de catálogo du livre (vêtements, aliments) sont
    composées sur fond blanc et valent mieux en grand.
    """
    wide = {"vetements", "accessoires", "chaussures", "fruits", "legumes",
            "viandes", "cereales", "boissons", "desserts", "menus",
            "condiments", "repas", "taches", "journee"}
    out = [(i, fr, l, q, m, 800) for i, fr, l, q, m in ALPHABET]
    out += [(i, fr, None, q, m, 1100) for i, fr, q, m in ALIMENTS]
    for i, fr, q, m in lists2():
        out.append((i, fr, None, q, m, 900))
    for i, fr, q, m in lists3():
        out.append((i, fr, None, q, m, 900))
    ids = [j[0] for j in out]
    dupes = sorted({x for x in ids if ids.count(x) > 1})
    if dupes:
        raise SystemExit("identifiants en double : %s" % dupes)
    return out


def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    force = "--force" in sys.argv

    alljobs = jobs()
    byid = {j[0]: j for j in alljobs}

    if os.path.exists(MANIFEST):
        try:
            manifest = json.loads(io.open(MANIFEST, encoding="utf-8").read())
        except Exception:  # noqa: BLE001
            manifest = {}
    else:
        manifest = {}

    # --- pinned files first (exact titles, resolved in one batch) -----------
    pins = {i: PICK[i] for i in byid if i in PICK}
    if pins:
        log("resolving %d pinned files ..." % len(pins))
        pmeta = details_ci(sorted(set(pins.values())))
        canon = {k.lower(): k for k in pmeta}
        for ident, title in pins.items():
            ii = pmeta.get(title)
            if not ii:
                log("  MISS pin %-14s %s" % (ident, title))
                continue
            # Commons capitalisation is inconsistent; keep whatever it says.
            real = canon.get(title.lower(), title)
            cur = manifest.get(ident)
            if (not force and find_local(ident)
                    and cur and cur.get("source") == real[5:]):
                log("  cached %-14s %s" % (ident, real[5:][:44]))
                continue
            save(ident, ii, real, byid[ident][1], byid[ident][2], byid[ident][-1],
                 "pinned", manifest)

    picked = []
    for idx, (ident, fr, letter, queries, must, width) in enumerate(alljobs, 1):
        if ident in pins:
            continue
        cur = manifest.get(ident)
        want = CATEGORIES.get(ident)
        if (not force and find_local(ident) and cur and cur.get("source")
                and not want):
            continue
        c = choose(queries, must, want)
        if not c:
            log("[%3d/%d] MISS  %-18s (%s)" % (idx, len(alljobs), ident, queries[0]))
            continue
        c["id"], c["fr"], c["letter"], c["width"] = ident, fr, letter, width
        c["query"] = queries[0]
        picked.append(c)
        log("[%3d/%d] ok    %-18s %-52s %dx%d (%d)" %
            (idx, len(alljobs), ident, c["title"][:52], c["w"], c["h"], c["year"]))
        time.sleep(0.15)

    log("resolving metadata for %d files ..." % len(picked))
    meta = details([c["title"] for c in picked])

    for c in picked:
        ii = meta.get(c["title"])
        if not ii:
            log("  unresolved %s (%s)" % (c["id"], c["title"]))
            continue
        save(c["id"], ii, c["title"], c["fr"], c["letter"], c["width"],
             c["query"], manifest)

    io.open(MANIFEST, "w", encoding="utf-8").write(
        json.dumps(manifest, ensure_ascii=False, indent=2))
    log("wrote %s with %d entries" % (MANIFEST, len(manifest)))


if __name__ == "__main__":
    main()
