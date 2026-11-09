# -*- coding: utf-8 -*-
"""Les clés d'assets/js/art6.js, pour que les outils Python sachent quelles
photos ne sont plus utilisées (elles sont dessinées à la place)."""
import io, os, re

P = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..",
                 "assets", "js", "art6.js")
src = io.open(P, encoding="utf-8").read()

# SCENES["cle"] = function …  ou  SCENES.cle = function …
# `\s*=(?!null)` : sans cela le moteur fait un retour arrière sur `\s*` et
# « = null » est malgré tout accepté, ce qui effaçait une bonne photo.
ART6_KEYS = re.findall(r'SCENES\[\s*"([^"]+)"\s*\]\s*=(?!null)\s*function', src) + \
    re.findall(r'SCENES\.([A-Za-z_][A-Za-z0-9_]*)\s*=\s*function', src)
