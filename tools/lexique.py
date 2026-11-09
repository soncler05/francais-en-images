# -*- coding: utf-8 -*-
"""
Vocabulary data for the first 10 pages of "Le francais en images".

Each entry: (id, label, letter, queries, must)
  queries - Commons search phrases, tried in order
  must    - at least one of these normalised words must appear in the file
            title, otherwise the candidate is discarded. This is what stops
            "25 cents" from returning a paramotor and "un dollar" from
            returning a dollar-store sign.
"""

ALPHABET = [
    ("arc-en-ciel", "un arc-en-ciel", "A",
     ["double rainbow landscape sky", "rainbow arc sky"],
     ["rainbow", "rainbows"]),

    ("avion", "un avion", "A",
     ["airliner in flight sky", "modern airliner takeoff"],
     ["airliner", "aircraft", "airplane", "plane", "jet", "boeing", "airbus"]),

    ("ballon", "un ballon", "B",
     ["soccer ball on grass", "football soccer ball match"],
     ["football", "soccer", "football", "ball"]),

    ("bateau", "un bateau", "B",
     ["sailboat with sails sea", "sailing yacht"],
     ["sailboat", "sailing", "sailboat", "yacht", "sailboat", "bateau"]),

    ("carotte", "une carotte", "C",
     ["carrots bunch market", "carrot vegetables fresh"],
     ["carrot", "carrots", "carotte"]),

    ("clou", "un clou", "C",
     ["steel nails pile", "nails hardware box"],
     ["nail", "nails", "clou", "nails"]),

    ("dinosaure", "un dinosaure", "D",
     ["tyrannosaurus rex skeleton museum", "dinosaur skeleton"],
     ["dinosaur", "tyrannosaurus", "rex", "saurus"]),

    ("drapeau", "un drapeau", "D",
     ["flag waving wind pole", "flag flying blue sky"],
     ["flag", "flags", "flag"]),

    ("elephant", "un éléphant", "E",
     ["African elephant savanna herd", "elephant tusks"],
     ["elephant"]),

    ("escargot", "un escargot", "E",
     ["snail shell macro closeup", "land snail moss"],
     ["snail", "snails", "escargot"]),

    ("fleur", "une fleur", "F",
     ["flower blooming garden", "tulips flower bed"],
     ["flower", "flowers", "tulip", "tulips", "rose", "fleur"]),

    ("fourmi", "une fourmi", "F",
     ["ants on twig macro", "ant colony leaf"],
     ["ant", "ants", "ant"]),

    ("girafe", "une girafe", "G",
     ["giraffe zoo", "giraffe head"],
     ["giraffe", "giraffes"]),

    ("gorille", "un gorille", "G",
     ["gorilla portrait", "mountain gorilla"],
     ["gorilla", "gorillas"]),

    ("helicoptere", "un hélicoptère", "H",
     ["helicopter flying sky", "helicopter hovering"],
     ["helicopter", "helicopter"]),

    ("hibou", "un hibou", "H",
     ["barn owl perched branch", "eagle owl portrait"],
     ["owl", "owls", "hibou"]),

    ("iglou", "un iglou", "I",
     ["igloo snow village", "igloo arctic"],
     ["igloo", "igloos", "iglou"]),

    ("ile", "une île", "I",
     ["tropical island beach palm", "island sea aerial"],
     ["island", "islands", "atoll"]),

    ("jongleur", "un jongleur", "J",
     ["juggling performer balls", "juggler juggling"],
     ["juggling", "juggler", "jongleur"]),

    ("jus", "un jus", "J",
     ["glass of orange juice", "juice glass table"],
     ["juice", "jus", "smoothie"]),

    ("kangourou", "un kangourou", "K",
     ["kangaroo australia", "red kangaroo"],
     ["kangaroo", "kangaroos"]),

    ("koala", "un koala", "K",
     ["koala eucalyptus tree", "koala australia"],
     ["koala", "koalas"]),

    ("licorne", "une licorne", "L",
     ["unicorn toy figurine", "unicorn"],
     ["unicorn", "unicorn"]),

    ("lion", "un lion", "L",
     ["lion mane portrait", "lion africa"],
     ["lion", "lions"]),

    ("maison", "une maison", "M",
     ["modern house exterior", "house architecture residential"],
     ["house", "houses", "home", "maison", "cottage"]),

    ("marteau", "un marteau", "M",
     ["claw hammer", "hammer tool work"],
     ["hammer", "hammers", "marteau"]),

    ("nez", "un nez", "N",
     ["human nose closeup face", "woman face nose"],
     ["nose", "nez"]),

    ("nid", "un nid", "N",
     ["bird nest eggs tree", "nest birds spring"],
     ["nest", "nests", "nid"]),

    ("orange", "une orange", "O",
     ["orange fruit halves", "oranges citrus"],
     ["orange", "oranges"]),

    ("otarie", "une otarie", "O",
     ["California sea lion", "sea lion beach"],
     ["sea lion", "sealion", "otarie", "pinniped"]),

    ("pomme", "une pomme", "P",
     ["red apples", "apple fruit"],
     ["apple", "apples", "pomme"]),

    ("porte", "une porte", "P",
     ["wooden door", "door entrance house"],
     ["door", "doors", "porte"]),

    ("quenouille", "une quenouille", "Q",
     ["paddle ball toy paddle", "paddleball paddle"],
     ["paddle", "paddleball"]),

    ("quilles", "des quilles", "Q",
     ["bowling pins lane", "bowling alley"],
     ["bowling", "quilles"]),

    ("radio", "une radio", "R",
     ["portable radio", "radio receiver"],
     ["radio"]),

    ("rateau", "un râteau", "R",
     ["garden rake leaves", "rake tool"],
     ["rake", "rakes", "rateau"]),

    ("serpent", "un serpent", "S",
     ["snake coiled reptile", "snake portrait"],
     ["snake", "snakes", "serpent", "viper", "python", "boa"]),

    ("souris", "une souris", "S",
     ["house mouse", "mouse rodent"],
     ["mouse", "mice", "souris"]),

    ("tortue", "une tortue", "T",
     ["tortoise shell grass", "turtle tortoise"],
     ["tortoise", "turtle", "tortue"]),

    ("train", "un train", "T",
     ["passenger train locomotive", "train railway station"],
     ["train", "trains", "locomotive", "railway"]),

    ("uniforme", "un uniforme", "U",
     ["school uniform students", "school children uniform"],
     ["uniform", "uniforms", "uniforme"]),

    ("usine", "une usine", "U",
     ["factory industrial plant", "factory building"],
     ["factory", "usine", "industrial"]),

    ("velo", "un vélo", "V",
     ["bicycle city street", "bicycle bike"],
     ["bicycle", "bicycles", "bike"]),

    ("violon", "un violon", "V",
     ["violin closeup", "violin instrument"],
     ["violin"]),

    ("wagon", "un wagon", "W",
     ["passenger railway carriage", "train carriage coach"],
     ["carriage", "coach", "wagon", "railway", "train"]),

    ("wapiti", "un wapiti", "W",
     ["elk wapiti bull", "wapiti deer"],
     ["elk", "wapiti", "wapiti"]),

    ("xavier", "Xavier", "X",
     ["smiling boy portrait", "boy child face portrait"],
     ["boy", "boys", "child", "children", "portrait"]),

    ("xylophone", "un xylophone", "X",
     ["xylophone instrument", "xylophone bars"],
     ["xylophone", "xilophone", "glockenspiel"]),

    ("yaourt", "un yaourt", "Y",
     ["yogurt bowl", "yoghurt yogurt"],
     ["yogurt", "yoghurt", "yaourt"]),

    ("yoyo", "un yoyo", "Y",
     ["yoyo toy", "yo-yo"],
     ["yoyo"]),

    ("zebre", "un zèbre", "Z",
     ["zebra portrait closeup", "zebras"],
     ["zebra", "zebras"]),

    ("zebu", "un zébu", "Z",
     ["zebu cattle", "zebu bullock"],
     ["zebu", "bos indicus", "cattle"]),
]

# Fruit still-life replacing the book plate on PDF page 6.
ALIMENTS = [
    ("kiwi", "kiwi", ["kiwi fruit sliced", "kiwis fruit tree"], ["kiwi"]),
    ("oranges", "oranges", ["orange halves sliced fruit", "oranges citrus"], ["orange", "oranges"]),
    ("banane", "banane", ["bananas bunch", "banana fruit"], ["banana", "bananas", "banane"]),
    ("papaye", "papaye", ["papaya cut", "papaya fruit"], ["papaya", "papaye"]),
    ("melon", "melon", ["melon cantaloupe halves", "melon fruit"], ["melon", "melons", "melon"]),
]

# "L'argent" is drawn as crisp SVG instead of photography - Commons has no
# usable set of modern Canadian notes, and vector art stays sharp forever.
ARGENT = [
    ("piece-5-cents",  "5 cents",       "coin", 0.05),
    ("piece-10-cents", "10 cents",      "coin", 0.10),
    ("piece-25-cents", "25 cents",      "coin", 0.25),
    ("billet-1-dollar",  "un dollar",  "coin", 1),
    ("billet-2-dollars", "deux dollars", "coin", 2),
    ("billet-5-dollars",  "5 dollars",  "note", 5),
    ("billet-10-dollars", "10 dollars", "note", 10),
    ("billet-20-dollars", "20 dollars", "note", 20),
    ("billet-50-dollars", "50 dollars", "note", 50),
    ("billet-100-dollars", "100 dollars", "note", 100),
]

# Search relevance alone kept picking look-alikes: "Kangaroo Island" (a
# lizard) for un kangourou, a dollar-store sign for un dollar, a preserved
# medical specimen for un nez, a coiled-snake bracelet for un serpent.
# These are reviewed by eye and pinned to exact Commons files.
PICK = {
    # second pass, after eyeballing the generated contact sheet
    "arc-en-ciel": "File:Double Rainbow at Sipaka Point.jpg",
    "avion":      "File:Airliners Nairobi 2025 (02).jpg",
    "drapeau":    "File:Turkish flag waving in the sky.jpg",
    "escargot":   "File:Snail on Plant.jpg",
    "iglou":      "File:Igloo-village Weissfluhjoch 1.jpg",
    "jongleur":   "File:A juggler at Ibirapuera Park, Sao Paulo.jpg",
    "licorne":    "File:Toy unicorn in Tuntorp.jpg",
    "melon":      "File:Golden honeydew melon.jpg",
    "nid":        "File:Bird-Nest-Chicks-Sitia--Crete-Greece.jpg",
    "orange":     "File:Single Orange (Fruit).jpg",
    "oranges":    "File:Fresh oranges for sale in Toronto Chinatown (27823022601).jpg",
    "quenouille": "File:Competitive paddle balling.jpg",
    "quilles":    "File:Bowling ball and pins for strike - front view.jpg",
    "serpent":    "File:Red-bellied black snake (coiled).jpg",
    "souris":     "File:Striped field mouse (51554361125).jpg",
    "usine":      "File:Kushva Roll Manufacturing Factory-1.jpg",
    "zebre":      "File:Zebra Close-up.jpg",

    # first pass
    "bateau":     "File:Sailing boat at sunset, Ionian Sea, Albania.jpg",
    "carotte":    "File:Preparing and slicing carrots.jpg",
    "clou":       "File:Ca 1980 Jaernia slagspik wire nail pack 70 x 3mm Sweden.jpg",
    "dinosaure":  "File:Dinosaur skeleton in Berkeley Square - 2024-12-14.jpg",
    "fourmi":     "File:Leaf-cutter ant (Atta cephalotes) Belize 3.jpg",
    "jus":        "File:Glass of orange juice with ice.jpeg",
    "kangourou":  "File:Red Kangaroos at Sturt National Park NSW.jpg",
    "nez":        "File:Highland cow nose.jpg",
    "radio":      "File:Sanyo M7770K Portable Radio Cassette Stereo (42668942385).jpg",
    "rateau":     "File:Metal Rake.jpg",
    "tortue":     "File:Tunisian tortoise (Testudo graeca nabeulensis) male Cap Bon 2.jpg",
    "velo":       "File:Bicycle parked at the Lower Agoda Fort.jpg",
    "wagon":      "File:Mini cabin coach of Siemens Viaggio Next Level ÖBB nightjet 2023-12 - 06.jpg",
    "xavier":     "File:Laughing boy at golden hour.jpg",

    # planche « Au déjeuner » : il faut des fruits immédiatement identifiables
    "kiwi":        "File:Kiwi Kaleidoscope Nature's Circular Elegance by Raju C Reddy.jpg",
    "banane":      "File:Bananas on black background 02.jpg",
}
