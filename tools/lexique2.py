# -*- coding: utf-8 -*-
"""
Vocabulary des pages 11 à 25 du balayage (pages 5 à 19 du livre).

Même format que lexique.py : (id, libellé, requêtes Commons, mots-clés
obligatoires dans le titre). Tout ce qui se photographie bien part dans le
pipeline d'acquisition ; ce qui est abstrait, médical ou renvoie à des
personnes réelles est dessiné en SVG (voir assets/js/art.js).
"""

# --- p13 · Les vêtements ---------------------------------------------------
VETEMENTS = [
    ("bermuda", "un bermuda", ["bermuda shorts man", "bermuda shorts"], ["bermuda", "shorts"]),
    ("blouson-court", "un blouson court", ["cropped jacket denim", "cropped jacket woman"], ["cropped", "jacket", "blouson"]),
    ("camisole", "une camisole", ["tank top camisole", "camisole singlet"], ["tank", "camisole", "singlet"]),
    ("chandail", "un chandail", ["sweater wool knit", "pullover sweater"], ["sweater", "pullover", "jumper", "chandail"]),
    ("chandail-capuchon", "un chandail à capuchon", ["hoodie sweatshirt", "hooded sweatshirt"], ["hoodie", "hooded", "hood", "sweatshirt"]),
    ("chapeau", "un chapeau", ["hat straw fedora", "hat on white background"], ["hat", "chapeau"]),
    ("chaussettes", "des chaussettes", ["socks pair wool", "socks knitted"], ["sock", "socks", "chaussette"]),
    ("chemise", "une chemise", ["shirt buttoned cotton", "dress shirt folded"], ["shirt", "chemise"]),
    ("chemisier", "un chemisier", ["blouse woman silk", "blouse folded"], ["blouse", "chemisier"]),
    ("complet", "un complet", ["suit business man", "two piece suit"], ["suit", "complet"]),
    ("gants", "des gants", ["gloves pair wool", "gloves leather pair"], ["glove", "gloves", "gant"]),
    ("impermeable", "un imperméable", ["raincoat yellow", "raincoat waterproof"], ["raincoat", "impermeable", "mac"]),
    ("jean", "un jean", ["jeans denim", "denim jeans folded"], ["jeans", "jean", "denim"]),
    ("jupe", "une jupe", ["skirt woman", "skirt fashion"], ["skirt", "jupe"]),
    ("maillot-bain", "un maillot de bain", ["swimsuit one piece", "bathing suit"], ["swimsuit", "bathing", "swim"]),
    ("manteau", "un manteau", ["coat wool winter", "winter coat"], ["coat", "manteau", "overcoat"]),
    ("mitaines", "des mitaines", ["fingerless gloves knitted", "fingerless gloves"], ["fingerless"]),
    ("pantalon", "un pantalon", ["trousers pants folded", "trousers men"], ["trouser", "trousers", "pantalon", "pants"]),
    ("pyjama", "un pyjama", ["pyjamas pajamas", "pajama set"], ["pyjama", "pajama"]),
    ("robe", "une robe", ["dress woman", "dress fashion"], ["dress", "robe"]),
    ("robe-chambre", "une robe de chambre", ["bathrobe", "dressing gown"], ["bathrobe", "gown", "robe de chambre"]),
    ("salopette", "une salopette", ["overalls dungarees", "overalls trousers"], ["overalls", "dungaree", "salopette"]),
    ("sous-vetement", "un sous-vêtement", ["underwear briefs", "underwear pants"], ["underwear", "briefs", "panties", "sous vetement"]),
    ("tee-shirt", "un tee-shirt", ["t-shirt plain", "tshirt white"], ["shirt", "tshirt"]),
]

# --- p14 · Les accessoires (les motifs et les chaussures aussi) -----------
ACCESSOIRES = [
    ("bague", "une bague", ["ring finger jewellery", "ring gold"], ["ring", "bague"]),
    ("bandeau", "un bandeau", ["headband hair", "headband"], ["headband", "bandeau"]),
    ("boucles-oreilles", "des boucles d'oreilles", ["earrings pair", "earrings"], ["earring", "earrings"]),
    ("bracelet", "un bracelet", ["bracelet wrist", "wristband bracelet"], ["bracelet", "wristband"]),
    ("casquette", "une casquette", ["baseball cap", "cap hat"], ["cap", "casquette"]),
    ("ceinture", "une ceinture", ["belt leather", "belt buckle"], ["belt", "ceinture"]),
    ("collier", "un collier", ["necklace jewellery", "necklace gold"], ["necklace", "collier", "collier"]),
    ("cravate", "une cravate", ["necktie tie", "tie silk"], ["tie", "necktie", "cravate"]),
    ("foulard", "un foulard", ["silk scarf", "scarf neck"], ["scarf", "foulard"]),
    ("lunettes", "des lunettes", ["eyeglasses pair", "spectacles glasses"], ["glasses", "spectacles", "lunette"]),
    ("lunettes-soleil", "des lunettes soleil", ["sunglasses", "sun glasses"], ["sunglasses", "sun"]),
    ("maquillage", "du maquillage", ["makeup cosmetics", "cosmetics makeup"], ["makeup", "cosmetic", "maquillage"]),
    ("montre", "une montre", ["wristwatch", "watch wrist"], ["watch", "montre"]),
    ("parapluie", "un parapluie", ["umbrella open", "umbrella"], ["umbrella", "parapluie"]),
    ("porte-cles", "un porte-clés", ["keyring keys", "keychain"], ["key", "keys", "keyring", "keychain"]),
    ("portefeuille", "un portefeuille", ["wallet leather", "billfold wallet"], ["wallet", "billfold", "portefeuille"]),
    ("sac-dos", "un sac à dos", ["backpack rucksack", "backpack"], ["backpack", "rucksack"]),
    ("sac-main", "un sac à main", ["handbag purse", "handbag"], ["handbag", "purse"]),
    ("sac-plage", "un sac de plage", ["beach bag tote", "beach bag"], ["beach", "tote"]),
    ("tuque", "une tuque", ["beanie winter hat", "knit cap beanie"], ["beanie", "knit cap", "tuque"]),
]

CHAUSSURES = [
    ("bottes", "des bottes", ["boots leather pair", "winter boots"], ["boot", "boots"]),
    ("escarpins", "des escarpins", ["high heels shoes", "pumps shoes"], ["heel", "heels", "pumps", "escarpin"]),
    ("espadrilles", "des espadrilles", ["espadrilles shoes", "espadrille"], ["espadrille", "espadrilles"]),
    ("pantoufles", "des pantoufles", ["slippers slippers", "slipper indoor"], ["slipper", "slippers", "pantoufle"]),
    ("sandales", "des sandales", ["sandals pair", "sandal foot"], ["sandal", "sandals"]),
    ("souliers", "des souliers", ["leather shoes pair", "dress shoes"], ["shoe", "shoes", "souliers"]),
]

# --- p17 · Les contraires (paires) ----------------------------------------
CONTRAIRES = [
    ("clair", "clair", "clair"), ("sombre", "sombre", "sombre"),
    ("drôle", "drôle", "drôle"), ("ennuyeux", "ennuyeux", "ennuyeux"),
    ("court", "court", "court"), ("long", "long", "long"),
    ("facile", "facile", "facile"), ("difficile", "difficile", "difficile"),
    ("fort", "fort", "fort"), ("faible", "faible", "faible"),
    ("grand", "grand", "grand"), ("petit", "petit", "petit"),
    ("gros", "gros", "gros"), ("haut", "haut", "haut"), ("bas", "bas", "bas"),
    ("laid", "laid", "laid"), ("belle", "belle", "belle"),
    ("lent", "lent", "lent"), ("vite", "vite", "vite"),
    ("lourd", "lourd", "lourd"), ("leger", "léger", "léger"),
    ("proche", "proche", "proche"), ("loin", "loin", "loin"),
    ("propre", "propre", "propre"), ("sale", "sale", "sale"),
    ("vide", "vide", "vide"), ("plein", "plein", "plein"),
    ("vieux", "vieux", "vieux"), ("neuf", "neuf", "neuf"),
]

# --- p18 · Les repas, les menus, les condiments ----------------------------
REPAS = [
    ("dejeuner", "le déjeuner",
     ["breakfast table spread", "breakfast morning meal"], ["breakfast", "dejeuner", "petit dejeuner"]),
    ("collation", "la collation",
     ["afternoon snack plate", "snack plate food"], ["snack", "afternoon", "collation"]),
    ("diner", "le dîner",
     ["dinner table meal", "dinner evening food"], ["dinner", "diner", "supper"]),
    ("souper", "le souper",
     ["supper table meal evening", "evening meal family"], ["supper", "souper", "dinner"]),
]

MENUS = [
    ("cari-legumes", "du cari aux légumes", ["vegetable curry", "curry vegetables"], ["curry", "cari"]),
    ("chili", "du chili", ["chili con carne", "chilli con carne"], ["chili", "chilli"]),
    ("falafels", "des falafels", ["falafel plate", "falafel"], ["falafel"]),
    ("hachis-parmentier", "du hachis Parmentier", ["shepherds pie", "hachis parmentier"], ["shepherd", "shepherds", "parmentier", "hachis"]),
    ("hamburger", "un hamburger", ["hamburger", "cheeseburger"], ["hamburger", "burger", "cheeseburger"]),
    ("lasagne", "de la lasagne", ["lasagne dish", "lasagna"], ["lasagne", "lasagna"]),
    ("pizza", "de la pizza", ["pizza whole", "pizza margherita"], ["pizza"]),
    ("spaghetti", "du spaghetti", ["spaghetti plate", "spaghetti pasta"], ["spaghetti"]),
    ("sushis", "des sushis", ["sushi platter", "sushi"], ["sushi"]),
    ("taco", "un taco", ["taco", "tacos"], ["taco"]),
]

CONDIMENTS = [
    ("ketchup", "du ketchup", ["ketchup bottle", "ketchup"], ["ketchup"]),
    ("mayonnaise", "de la mayonnaise", ["mayonnaise jar", "mayonnaise"], ["mayonnaise", "mayo"]),
    ("miel", "du miel", ["honey jar", "honey", "honeycomb"], ["honey", "miel", "honeycomb"]),
    ("moutarde", "de la moutarde", ["mustard jar", "mustard"], ["mustard", "moutarde"]),
    ("relish", "de la relish", ["relish condiment jar", "pickle relish"], ["relish", "pickle"]),
    ("salsa", "de la salsa", ["salsa bowl", "salsa sauce"], ["salsa"]),
]

# --- p19 · Les fruits, les légumes -----------------------------------------
FRUITS = [
    ("ananas", "un ananas", ["pineapple fruit", "pineapple whole"], ["pineapple", "ananas"]),
    ("banane-fruit", "une banane", ["banana fruit", "bananas"], ["banana"]),
    ("bleuets", "des bleuets", ["blueberries", "blueberry"], ["blueberr", "bleuet"]),
    ("cerise", "une cerise", ["cherries fruit", "cherry"], ["cherri"]),
    ("citron", "un citron", ["lemon fruit", "lemons"], ["lemon", "citron"]),
    ("fraise", "une fraise", ["strawberries", "strawberry"], ["strawberr", "fraise"]),
    ("framboise", "une framboise", ["raspberries", "raspberry"], ["raspberr", "framboise"]),
    ("kiwi-fruit", "un kiwi", ["kiwi fruit sliced", "kiwi"], ["kiwi"]),
    ("melon-eau", "un melon d'eau", ["watermelon", "watermelon sliced"], ["watermelon", "melon"]),
    ("orange-fruit", "une orange", ["oranges fruit", "orange"], ["orange"]),
    ("pamplemousse", "un pamplemousse", ["grapefruit", "grapefruit halved"], ["grapefruit", "pamplemousse"]),
    ("peche", "une pêche", ["peaches fruit", "peach"], ["peach", "peche"]),
    ("poire", "une poire", ["pears fruit", "pear"], ["pear", "poire"]),
    ("pomme-fruit", "une pomme", ["apples fruit", "apple"], ["apple", "pomme"]),
    ("raisins", "des raisins", ["grapes bunch", "grapes"], ["grape", "raisin"]),
]

LEGUMES = [
    ("betterave", "une betterave", ["beetroot", "beets"], ["beet", "betterave"]),
    ("brocoli", "un brocoli", ["broccoli", "broccoli head"], ["broccoli", "brocoli"]),
    ("carotte-legume", "une carotte", ["carrots bunch", "carrot"], ["carrot", "carotte"]),
    ("champignon", "un champignon", ["mushrooms", "mushroom"], ["mushroom", "champignon"]),
    ("chou", "un chou", ["cabbage", "cabbage head"], ["cabbage", "chou"]),
    ("chou-fleur", "un chou-fleur", ["cauliflower", "cauliflower head"], ["cauliflower", "chou fleur"]),
    ("concombre", "un concombre", ["cucumber", "cucumbers"], ["cucumber", "concombre"]),
    ("epinards", "des épinards", ["spinach leaves", "spinach"], ["spinach", "epinard"]),
    ("laitue", "une laitue", ["lettuce head", "lettuce"], ["lettuce", "laitue"]),
    ("mais", "du maïs", ["corn cobs", "maize cob"], ["corn", "maize", "mais"]),
    ("oignon", "un oignon", ["onions", "onion"], ["onion", "oignon"]),
    ("patate", "une patate", ["potatoes", "potato"], ["potato", "potatoe", "patate"]),
    ("poivron", "un poivron", ["bell pepper", "bell peppers"], ["pepper", "bell pepper", "poivron"]),
    ("radis", "un radis", ["radishes", "radish"], ["radish", "radis"]),
    ("tomate", "une tomate", ["tomatoes", "tomato"], ["tomato", "tomate"]),
]

# --- p20 · Les viandes et substituts, les produits céréaliers -------------
VIANDES = [
    ("bacon", "du bacon", ["bacon rashers", "bacon slices"], ["bacon"]),
    ("bifteck", "du bifteck", ["steak beef", "beef steak"], ["steak", "beef"]),
    ("dinde", "de la dinde", ["turkey roast", "turkey whole"], ["turkey", "dinde"]),
    ("jambon", "du jambon", ["ham slices", "ham"], ["ham", "jambon"]),
    ("legumineuses", "des légumineuses", ["legumes beans lentils", "pulses legumes"], ["legume", "bean", "lentil", "pulse", "legumineuse"]),
    ("noix", "des noix", ["walnuts nuts", "nuts walnut"], ["walnut", "nut", "noix"]),
    ("oeufs", "des œufs", ["eggs basket", "eggs"], ["egg", "oeuf"]),
    ("poisson", "du poisson", ["fish whole", "fresh fish"], ["fish", "poisson"]),
    ("poulet", "du poulet", ["chicken meat", "roast chicken"], ["chicken", "poulet"]),
    ("tofu", "du tofu", ["tofu", "tofu block"], ["tofu"]),
]

CEREALES = [
    ("bagel", "un bagel", ["bagels", "bagel"], ["bagel"]),
    ("cereales", "des céréales", ["breakfast cereal bowl", "cornflakes cereal"], ["cereal", "cornflake"]),
    ("couscous", "du couscous", ["couscous", "couscous dish"], ["couscous"]),
    ("gruau", "du gruau", ["oatmeal porridge", "oatmeal"], ["oatmeal", "porridge", "gruau"]),
    ("muffin", "un muffin", ["muffins", "muffin"], ["muffin"]),
    ("pain", "du pain", ["bread loaf", "bread"], ["bread", "pain"]),
    ("pates", "des pâtes", ["pasta spaghetti dry", "dried pasta"], ["pasta", "spaghetti", "pate"]),
    ("pitas", "des pitas", ["pita bread", "pita"], ["pita"]),
    ("riz", "du riz", ["rice grains", "rice bowl"], ["rice", "riz"]),
    ("tortillas", "des tortillas", ["tortillas", "tortilla"], ["tortilla"]),
]

# --- p21 · Les boissons, les desserts -------------------------------------
BOISSONS = [
    ("boisson-gazeuse", "une boisson gazeuse", ["soda bottle glass", "soft drink bottle"], ["soda", "soft drink", "cola", "gazeuse"]),
    ("boisson-soja", "une boisson de soja", ["soy milk glass", "soymilk"], ["soy", "soya", "soja"]),
    ("eau", "de l'eau", ["glass of water", "water glass"], ["water", "eau"]),
    ("jus-orange", "du jus d'orange", ["orange juice glass", "orange juice"], ["juice", "jus"]),
    ("jus-raisin", "du jus de raisin", ["grape juice glass", "grape juice"], ["grape juice", "raisin"]),
    ("lait", "du lait", ["glass of milk", "milk glass"], ["milk", "lait"]),
    ("lait-chocolat", "du lait au chocolat", ["chocolate milk glass", "hot chocolate"], ["chocolate", "chocolat", "cocoa"]),
    ("limonade", "de la limonade", ["lemonade glass", "lemonade"], ["lemonade", "limonade"]),
]

DESSERTS = [
    ("baklava", "un baklava", ["baklava", "baklava pastry"], ["baklava"]),
    ("beigne", "un beigne", ["doughnuts", "doughnut"], ["doughnut", "donut", "beigne"]),
    ("biscuit", "un biscuit", ["biscuits cookies", "cookie"], ["biscuit", "cookie"]),
    ("chocolat", "du chocolat", ["chocolate bar", "chocolate pieces"], ["chocolate", "chocolat"]),
    ("creme-glacee", "de la crème glacée", ["ice cream sundae", "ice cream"], ["ice cream", "glace", "glacee"]),
    ("gateau", "du gâteau", ["birthday cake", "cake slice"], ["cake", "gateau"]),
    ("pouding", "du pouding", ["pudding dessert", "pudding"], ["pudding", "pouding"]),
    ("salade-fruits", "une salade de fruits", ["fruit salad bowl", "fruit salad"], ["fruit salad", "salade"]),
    ("sorbet", "du sorbet", ["sorbet", "sorbet ice"], ["sorbet", "sherbet"]),
    ("tarte", "une tarte", ["apple pie", "pie dessert"], ["pie", "tarte"]),
]

# --- p22 · Les tâches (phrases entières) -----------------------------------
TACHES = [
    ("arrose-plantes", "Elle arrose les plantes.", ["watering plants can", "watering plants"], ["water", "watering", "plant", "arros"]),
    ("nettoie-litiere", "Il nettoie la litière.", ["cat litter box", "litter box cat"], ["litter", "cat litter", "litiere"]),
    ("range-chambre", "Elle range sa chambre.", ["tidy bedroom making", "clean bedroom"], ["bedroom", "tidy", "clean room", "make bed"]),
    ("lave-vaisselle", "Il lave la vaisselle.", ["washing dishes sink", "dishwashing hands"], ["dish", "washing", "sink"]),
    ("lave-linge", "Elle lave le linge.", ["washing machine laundry", "laundry washing"], ["laundry", "washing machine", "linge"]),
    ("epoussette", "Elle époussette.", ["dusting furniture", "dusting cloth"], ["dust", "dusting"]),
    ("nourrit-chien", "Elle nourrit le chien.", ["feeding dog bowl", "dog food bowl"], ["dog", "feeding", "feed"]),
    ("plie-linge", "Il plie le linge.", ["folding clothes", "folded laundry stack"], ["fold", "folding", "laundry"]),
    ("nettoie-plancher", "Il nettoie le plancher.", ["mopping floor", "mop floor"], ["mop", "mopping", "floor"]),
    ("tond-gazon", "Elle tond le gazon.", ["mowing lawn mower", "lawn mowing"], ["mow", "mowing", "lawn", "grass"]),
    ("racle-feuilles", "Elle racle les feuilles.", ["raking leaves rake", "rake leaves"], ["rake", "raking", "leaves"]),
    ("vide-lave-vaisselle", "Il vide le lave-vaisselle.", ["unloading dishwasher", "dishwasher door open"], ["dishwasher", "unload"]),
    ("balaie-plancher", "Il balaie le plancher.", ["sweeping floor broom", "broom sweeping"], ["sweep", "sweeping", "broom"]),
    ("sort-poubelle", "Il sort la poubelle.", ["garbage bin trash", "wheelie bin"], ["garbage", "trash", "bin", "waste"]),
    ("passe-aspirateur", "Il passe l'aspirateur.", ["vacuuming carpet", "vacuum cleaner"], ["vacuum", "vacuuming"]),
    ("promene-chien", "Il promène le chien.", ["walking dog leash", "dog walker"], ["dog", "walk", "leash", "walking"]),
]

# --- p23 · Les actions de la journée (phrases entières) --------------------
JOURNEE = [
    ("reveille", "Elle se réveille.", ["waking up alarm", "alarm clock waking"], ["alarm", "wake", "waking"]),
    ("salle-bain", "Elle va à la salle de bain.", ["bathroom sink mirror", "bathroom interior"], ["bathroom", "salle de bain"]),
    ("lave-visage", "Elle se lave le visage.", ["washing face water", "washing face"], ["face", "washing", "wash"]),
    ("fait-lit", "Elle fait son lit.", ["making bed sheets", "making the bed"], ["bed", "making bed"]),
    ("dejeuner-matin", "Elle déjeune.", ["child eating breakfast", "kid eating breakfast"], ["breakfast", "eating", "child", "kid"]),
    ("brosse-dents", "Elle se brosse les dents.", ["brushing teeth toothbrush", "toothbrush"], ["tooth", "teeth", "toothbrush"]),
    ("habille", "Elle s'habille.", ["getting dressed child", "dressing clothes"], ["dressing", "dressed", "getting dressed"]),
    ("va-ecole", "Elle va à l'école.", ["school children walking", "school entrance"], ["school", "ecole", "école"]),
    ("met-table", "Elle met la table.", ["setting table cutlery", "laying table"], ["table", "setting", "cutlery", "place setting"]),
    ("retourne-maison", "Elle retourne à la maison.", ["coming home door", "child walking home"], ["home", "door", "house"]),
    ("dine", "Elle dîne.", ["family dinner table eating", "dinner family"], ["dinner", "family", "eating"]),
    ("va-classe", "Elle va en classe.", ["classroom pupils desks", "classroom school"], ["classroom", "school", "pupil", "student"]),
    ("soupe", "Elle soupe.", ["eating soup bowl", "soup bowl"], ["soup", "soupe"]),
    ("devoirs", "Elle fait ses devoirs.", ["child homework desk writing", "homework"], ["homework", "writing", "desk"]),
    ("douche", "Elle prend sa douche.", ["shower bathroom", "taking shower"], ["shower"]),
    ("couche", "Elle se couche.", ["child sleeping bed", "sleeping bed"], ["sleep", "sleeping", "bed"]),
]


# --- Catégories Commons, par identifiant ----------------------------------
# La recherche en texte libre confond « bermuda » (la ville) avec un short,
# « robe » avec un jardin japonais et « tee-shirt » avec une capture d'écran.
# Pour la mode et les accessoires, parcourir les catégories est bien plus sûr.
CATEGORIES = {
    # vêtements
    "bermuda": ["Category:Shorts"],
    "blouson-court": ["Category:Jackets", "Category:Jackets for women"],
    "camisole": ["Category:Tank tops", "Category:Camisoles"],
    "chandail": ["Category:Sweaters", "Category:Pullovers"],
    "chandail-capuchon": ["Category:Hoodies"],
    "chapeau": ["Category:Hats"],
    "chaussettes": ["Category:Socks"],
    "chemise": ["Category:Shirts"],
    "chemisier": ["Category:Blouses"],
    "complet": ["Category:Suits"],
    "gants": ["Category:Gloves"],
    "impermeable": ["Category:Raincoats"],
    "jean": ["Category:Jeans"],
    "jupe": ["Category:Skirts"],
    "maillot-bain": ["Category:Swimsuits", "Category:Swimwear"],
    "manteau": ["Category:Coats"],
    "mitaines": ["Category:Fingerless gloves"],
    "pantalon": ["Category:Trousers"],
    "pyjama": ["Category:Pyjamas"],
    "robe": ["Category:Dresses"],
    "robe-chambre": ["Category:Bathrobes"],
    "salopette": ["Category:Overalls"],
    "sous-vetement": ["Category:Underwear"],
    "tee-shirt": ["Category:T-shirts"],
    # chaussures
    "bottes": ["Category:Boots"],
    "escarpins": ["Category:High heels", "Category:Heels"],
    "espadrilles": ["Category:Espadrilles"],
    "pantoufles": ["Category:Slippers"],
    "sandales": ["Category:Sandals"],
    "souliers": ["Category:Shoes"],
    # accessoires
    "bague": ["Category:Rings"],
    "bandeau": ["Category:Headbands"],
    "boucles-oreilles": ["Category:Earrings"],
    "bracelet": ["Category:Bracelets"],
    "casquette": ["Category:Baseball caps"],
    "ceinture": ["Category:Belts"],
    "collier": ["Category:Necklaces"],
    "cravate": ["Category:Neckties"],
    "foulard": ["Category:Scarves"],
    "lunettes": ["Category:Glasses"],
    "lunettes-soleil": ["Category:Sunglasses"],
    "maquillage": ["Category:Cosmetics"],
    "montre": ["Category:Wristwatches"],
    "parapluie": ["Category:Umbrellas"],
    "porte-cles": ["Category:Keyrings"],
    "portefeuille": ["Category:Wallets"],
    "sac-dos": ["Category:Backpacks"],
    "sac-main": ["Category:Handbags"],
    "sac-plage": ["Category:Beach bags"],
    "tuque": ["Category:Beanies", "Category:Hats"],
}


DESSINS = {e[0] for e in VETEMENTS + ACCESSOIRES + CHAUSSURES}


# --- Mots où le choix automatique s'est trompé ----------------------------
# (voir tools/sheets.py, la planche de revue par section)
PICK2 = {
    # « kiwi » ramenait un motif de fougère de Nouvelle-Zélande
    "kiwi-fruit": "File:Kiwi Kaleidoscope Nature's Circular Elegance by Raju C Reddy.jpg",
    # « raisins » ramenait une devanture de café
    "raisins": "File:2019-02-25 23 37 51 A bunch of green seedless table grapes from Peru "
               "in the Franklin Farm section of Oak Hill, Fairfax County, Virginia.jpg",
}


def all_lists():
    """Toutes les listes photographiques, à plat : [(id, label, queries, must)].

    Les vêtements, accessoires et chaussures en sont exclus : ils sont dessinés
    (assets/js/art5.js), Commons n'ayant pas de photo de produit isolée.
    """
    out = []
    for group in (REPAS, MENUS, CONDIMENTS, FRUITS, LEGUMES, VIANDES,
                  CEREALES, BOISSONS, DESSERTS, TACHES, JOURNEE):
        out.extend(g for g in group if g[0] not in DESSINS)
    return out


def explicit():
    """Paires de contraires : dessinées, donc absentes du pipeline photo."""
    return CONTRAIRES
