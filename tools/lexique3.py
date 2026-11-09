# -*- coding: utf-8 -*-
"""
Vocabulary photographique des pages 26 à 45 du balayage (pages 20 à 39
du livre) : fêtes, école, sports, musique, métiers, transports, animaux,
lieux, maison, pays, temps.

Pour les animaux, les drapeaux, les véhicules et le mobilier, Commons dispose
de catégories très fournies ; on s'appuie dessus plutôt que sur la recherche en
texte libre, qui confond « un raton laveur » avec un gant de toilette.
"""

# ---------------------------------------------------------------------------
# p20 · Les fêtes
# ---------------------------------------------------------------------------
FETES = [
    ("action-grace", "l’Action de grâce", ["thanksgiving dinner turkey table"], ["thanksgiving", "turkey"]),
    ("aid-al-fitr", "l’Aïd al-Fitr", ["eid al fitr celebration", "eid celebration mosque"], ["eid", "fitr"]),
    ("anniversaire", "l’anniversaire", ["birthday cake candles party"], ["birthday", "cake"]),
    ("diwali", "la Diwali", ["diwali diyas lamps", "diwali celebration lights"], ["diwali", "diya"]),
    ("fete-canada", "la fête du Canada", ["canada day flag canada"], ["canada", "flag"]),
    ("fete-noel", "la fête de Noël", ["christmas tree decorations", "christmas celebration"], ["christmas", "noel"]),
    ("fete-paques", "la fête de Pâques", ["easter celebration eggs", "easter bunny eggs"], ["easter", "paques"]),
    ("halloween", "l’Halloween", ["halloween pumpkin jack o lantern", "halloween decoration"], ["halloween", "pumpkin"]),
    ("jour-an", "le jour de l’An", ["new year fireworks celebration", "new year celebration"], ["new year", "firework"]),
    ("jour-terre", "le jour de la Terre", ["earth day globe nature", "earth globe planet"], ["earth", "globe", "planet"]),
    ("annee-chinoise", "la nouvelle année chinoise", ["chinese new year lion dance", "lunar new year celebration"], ["chinese new year", "lunar new year", "dragon"]),
    ("ramadan", "le Ramadan", ["ramadan lantern crescent", "ramadan mosque"], ["ramadan", "crescent", "lantern"]),
    ("rosh-hashanah", "le Rosh Hashanah", ["rosh hashanah candles", "jewish holiday candles menorah"], ["rosh", "menorah", "hanukkiah", "jewish"]),
    ("saint-jean", "la Saint-Jean-Baptiste", ["québec flag fleur de lys", "saint jean baptiste quebec"], ["quebec", "québec", "fleur de lys"]),
    ("saint-patrick", "la Saint-Patrick", ["shamrock clover", "irish shamrock"], ["shamrock", "clover", "shamrocks"]),
    ("saint-valentin", "la Saint-Valentin", ["valentine heart", "valentine card heart"], ["valentine", "heart"]),
]

# ---------------------------------------------------------------------------
# p21 · Halloween et Noël
# ---------------------------------------------------------------------------
HALLOWEEN = [
    ("bonbons-halloween", "des bonbons", ["candy sweets colourful", "candy assortment"], ["candy", "sweet", "bonbon"]),
    ("citrouille", "une citrouille", ["pumpkin jack o lantern", "pumpkin halloween"], ["pumpkin", "citrouille"]),
    ("deguisement", "un déguisement", ["halloween costume mask", "costume halloween person"], ["costume", "halloween", "mask"]),
    ("fantome", "un fantôme", ["ghost costume halloween", "ghost white sheet costume"], ["ghost", "fantome", "fantôme"]),
    ("maison-hantee", "une maison hantée", ["haunted house halloween", "haunted house decoration"], ["haunted", "halloween"]),
    ("masque", "un masque", ["mask carnival venice", "mask costume face"], ["mask", "masque"]),
    ("sorciere", "une sorcière", ["witch halloween costume", "witch hat halloween"], ["witch", "sorciere", "sorcière"]),
    ("squelette", "un squelette", ["skeleton costume halloween", "skeleton bones"], ["skeleton", "squelette"]),
]

NOEL = [
    ("cadeaux", "des cadeaux", ["christmas presents gifts wrapped", "gift boxes christmas"], ["gift", "christmas", "present", "cadeau"]),
    ("couronne-noel", "une couronne", ["advent wreath", "christmas wreath candles"], ["wreath", "couronne"]),
    ("guirlande", "une guirlande", ["christmas garland lights", "christmas lights string"], ["garland", "lights", "christmas"]),
    ("lumieres", "des lumières", ["christmas lights tree", "string lights"], ["lights", "christmas", "lights"]),
    ("pere-noel", "le père Noël", ["santa claus", "santa clause costume"], ["santa", "claus"]),
    ("renne", "un renne", ["reindeer", "reindeer christmas"], ["reindeer", "renne"]),
    ("sapin", "un sapin", ["christmas tree", "christmas tree decorated"], ["christmas tree", "tree", "sapin"]),
    ("traineau", "le traîneau", ["sleigh sleigh", "santa sleigh reindeer"], ["sleigh", "traineau", "traîneau"]),
]

# ---------------------------------------------------------------------------
# p22 · Saint-Valentin et Pâques
# ---------------------------------------------------------------------------
VALENTIN = [
    ("amoureux", "des amoureux", ["couple in love embrace", "lovers couple"], ["couple", "love", "embrace"]),
    ("bisou", "un bisou", ["kiss couple lips", "couple kissing"], ["kiss", "kissing"]),
    ("bouquet", "un bouquet de fleurs", ["bouquet of flowers roses", "flower bouquet"], ["bouquet", "flowers", "roses"]),
    ("carte", "une carte", ["greeting card valentine", "postcard valentine"], ["card", "postcard", "carte"]),
    ("chocolat-valentin", "du chocolat", ["chocolate box valentine", "chocolate hearts"], ["chocolate", "chocolat"]),
    ("coeur", "un cœur", ["heart shape red", "heart love"], ["heart", "coeur", "cœur"]),
    ("cupidon", "un cupidon", ["cupid statue", "cupid wings"], ["cupid", "amour"]),
    ("mot-amour", "un mot d’amour", ["love letter note", "love note handwritten"], ["love", "letter", "note"]),
]

PAQUES = [
    ("chasse-oeufs", "une chasse aux œufs", ["easter egg hunt basket", "easter egg hunt"], ["easter egg", "hunt", "basket"]),
    ("chocolat-paques", "un chocolat de Pâques", ["easter chocolate egg", "easter bunny chocolate"], ["easter", "chocolate", "chocolat"]),
    ("lapin-paques", "un lapin", ["easter bunny rabbit", "rabbit easter"], ["rabbit", "bunny", "lapin"]),
    ("oeuf-paques", "un œuf de Pâques", ["easter egg decorated", "painted easter egg"], ["easter egg", "egg", "oeuf"]),
    ("paille", "de la paille", ["straw bale", "hay bale field"], ["straw", "hay", "paille"]),
    ("panier", "un panier", ["wicker basket", "basket handle"], ["basket", "panier"]),
    ("poussin", "un poussin", ["chick easter baby chicken", "baby chick"], ["chick", "chicken", "poussin"]),
    ("tulipe", "une tulipe", ["tulips flowers", "tulip flower"], ["tulip", "tulipe"]),
]

# ---------------------------------------------------------------------------
# p24 · Les objets de la classe
# ---------------------------------------------------------------------------
CLASSE = [
    ("bureau", "un bureau", ["school desk pupil", "desk wooden"], ["desk", "bureau"]),
    ("cahier", "un cahier", ["notebook exercise book", "school notebook"], ["notebook", "exercise book", "cahier"]),
    ("chaise", "une chaise", ["chair school", "chair wooden"], ["chair", "chaise"]),
    ("chemise-classement", "une chemise de classement", ["ring binder folder", "binder folder"], ["binder", "folder", "ring"]),
    ("ciseaux", "des ciseaux", ["scissors pair", "scissors"], ["scissors", "ciseaux"]),
    ("colle", "de la colle", ["glue stick", "white glue bottle craft", "school glue"],
     ["glue", "colle", "stick"]),
    ("crayons-couleur", "des crayons de couleur", ["coloured pencils set", "colored pencils"], ["pencils", "coloured", "colored", "crayon"]),
    ("crayon-plomb", "un crayon de plomb", ["pencil writing", "wooden pencil"], ["pencil", "crayon"]),
    ("etui-crayons", "un étui à crayons", ["pencil case pouch", "pencil pouch"], ["pencil case", "pouch", "etui", "étui"]),
    ("feuille", "une feuille", ["sheet of paper", "paper sheet blank"], ["paper", "sheet", "feuille"]),
    ("gomme", "une gomme à effacer", ["eraser rubber", "rubber eraser"], ["eraser", "rubber", "gomme"]),
    ("livre", "un livre", ["book open closed", "hardcover book"], ["book", "livre"]),
    ("regle", "une règle", ["ruler measuring", "ruler plastic"], ["ruler", "regle", "règle"]),
    ("ruban-adhesif", "du ruban adhésif", ["adhesive tape roll", "scotch tape"], ["tape", "scotch", "adhesive", "ruban"]),
    ("sac-ecole", "un sac d’école", ["back to school bag", "school satchel bag"], ["backpack", "satchel", "school bag", "sac"]),
    ("stylo", "un stylo", ["pen writing", "ballpoint pen"], ["pen", "stylo"]),
    ("surligneur", "un surligneur", ["highlighter marker", "fluorescent highlighter"], ["highlighter", "marker", "surligneur"]),
    ("tableau", "un tableau", ["chalkboard blackboard", "whiteboard school"], ["blackboard", "chalkboard", "whiteboard", "tableau"]),
    ("tni", "un tableau numérique interactif", ["interactive whiteboard", "smart board classroom"], ["interactive whiteboard", "smartboard", "smart board"]),
    ("taille-crayon", "un taille-crayon", ["pencil sharpener", "sharpener"], ["sharpener", "taille"]),
]

# ---------------------------------------------------------------------------
# p27 · Les sports
# ---------------------------------------------------------------------------
SPORTS = [
    ("badminton", "le badminton", ["badminton racket", "shuttlecock badminton", "badminton court"],
     ["badminton", "shuttlecock", "racket"]),
    ("baseball", "le baseball", ["baseball player bat", "baseball game"], ["baseball"]),
    ("basketball", "le basketball", ["basketball player court", "basketball"], ["basketball"]),
    ("cyclisme", "le cyclisme", ["cyclist road cycling race", "cycling"], ["cycl", "cyclist", "cyclisme"]),
    ("football", "le football", ["football player match", "soccer match"], ["football", "soccer"]),
    ("gymnastique", "la gymnastique", ["gymnastics gymnast", "gymnast"], ["gymnast", "gymnastic"]),
    ("hockey", "le hockey", ["ice hockey player rink", "hockey"], ["hockey"]),
    ("karate", "le karaté", ["karate kata", "karate practitioner"], ["karate", "karaté"]),
    ("natation", "la natation", ["swimmer pool swimming", "swimming"], ["swim", "swimmer", "natation"]),
    ("patinage-artistique", "le patinage artistique", ["figure skating pair", "figure skater"], ["skating", "skater", "patinage"]),
    ("planche-neige", "la planche à neige", ["snowboarder", "snowboarding"], ["snowboard", "snowboarding", "planche"]),
    ("planche-roulettes", "la planche à roulettes", ["skateboarder skateboarding", "skateboard"], ["skateboard", "skater"]),
    ("ski", "le ski", ["skier snow slope", "alpine skiing"], ["ski", "skier", "skieur"]),
    ("soccer", "le soccer", ["soccer player field", "soccer match ball"], ["soccer", "football player"]),
    ("tennis", "le tennis", ["tennis player racket court", "tennis"], ["tennis", "tennis player"]),
    ("volleyball", "le volleyball", ["volleyball player court", "volleyball"], ["volleyball"]),
]

# ---------------------------------------------------------------------------
# p29 · Les instruments de musique et les appareils électroniques
# ---------------------------------------------------------------------------
INSTRUMENTS = [
    ("batterie", "une batterie", ["drum kit drum set", "drums percussion"], ["drum", "percussion"]),
    ("flute", "une flûte", ["flute instrument", "flautist"], ["flute", "flautist", "flûte"]),
    ("guitare", "une guitare", ["guitar acoustic", "guitarist guitar"], ["guitar", "guitare"]),
    ("piano", "un piano", ["piano keyboard", "pianist piano"], ["piano", "pianist"]),
    ("saxophone", "un saxophone", ["saxophone", "saxophonist"], ["saxophone", "sax"]),
    ("trompette", "une trompette", ["trumpet", "trumpeter"], ["trumpet", "trompette"]),
    # « un violon » et « un xylophone » sont déjà illustrés dans l'alphabet
    # (pages 8-9) : on réutilise ces deux images plutôt que d'en télécharger
    # d'autres qui seraient redondantes.
]

ELECTRONIQUE = [
    ("cellulaire", "un cellulaire", ["mobile phone smartphone", "smartphone cell phone"], ["mobile", "smartphone", "cell phone", "cellulaire"]),
    ("console-jeu", "une console de jeu", ["video game console", "game console controller"], ["console", "controller", "game"]),
    ("ecouteurs", "des écouteurs", ["headphones", "headset earphones"], ["headphone", "headset", "earphone", "ecouteur"]),
    ("imprimante", "une imprimante", ["printer office", "inkjet printer"], ["printer", "imprimante"]),
    ("ordinateur", "un ordinateur", ["desktop computer", "computer tower monitor"], ["computer", "desktop", "ordinateur"]),
    ("portable", "un ordinateur portable", ["laptop computer", "notebook computer"], ["laptop", "notebook computer", "portable"]),
    ("tablette", "une tablette numérique", ["tablet computer", "ipad tablet"], ["tablet", "ipad", "tablette"]),
    ("television", "une télévision", ["television set", "flat screen tv"], ["television", "tv set", "télévision"]),
]

# ---------------------------------------------------------------------------
# p31 · Les moyens de transport
# ---------------------------------------------------------------------------
TRANSPORTS = [
    ("ambulance", "une ambulance", ["ambulance vehicle emergency"], ["ambulance", "ambulance"]),
    ("auto", "une auto", ["car automobile driving", "car parked"], ["car", "automobile", "auto"]),
    ("autobus", "un autobus", ["bus city", "city bus"], ["bus", "autobus"]),
    ("auto-patrouille", "une auto-patrouille", ["police car", "patrol car police"], ["police car", "patrol car", "patrouille"]),
    ("avion-transport", "un avion", ["airliner passenger aircraft", "airplane"], ["airliner", "aircraft", "airplane", "avion"]),
    ("bateau-transport", "un bateau", ["sailing boat ship", "boat sea"], ["boat", "ship", "bateau"]),
    ("bicyclette", "une bicyclette", ["bicycle bike", "cycling bicycle"], ["bicycle", "bike"]),
    ("camion", "un camion", ["truck lorry road", "semi truck"], ["truck", "lorry", "camion"]),
    ("camion-pompiers", "un camion de pompiers", ["fire engine truck", "fire truck"], ["fire truck", "fire engine"]),
    ("fourgonnette", "une fourgonnette", ["van delivery vehicle", "panel van"], ["van", "delivery van", "fourgonnette"]),
    ("fusee", "une fusée", ["rocket launch space", "rocket on launch pad"], ["rocket", "launch", "fusee"]),
    ("helicoptere-transport", "un hélicoptère", ["helicopter", "helicopter flight"], ["helicopter"]),
    ("limousine", "une limousine", ["limousine car", "limo"], ["limousine", "limo"]),
    ("metro", "un métro", ["metro train subway", "subway car"], ["metro", "subway", "métro"]),
    ("motocyclette", "une motocyclette", ["motorcycle", "motorbike"], ["motorcycle", "motorbike", "motocyclette"]),
    ("taxi", "un taxi", ["taxi cab", "taxicab"], ["taxi", "taxicab"]),
    ("tracteur", "un tracteur", ["tractor farm", "tractor"], ["tractor", "tracteur"]),
    ("train-transport", "un train", ["train railway locomotive", "passenger train"], ["train", "locomotive", "railway"]),
    ("traversier", "un traversier", ["ferry boat", "car ferry"], ["ferry", "traversier"]),
    ("trottinette", "une trottinette", ["kick scooter", "scooter kick"], ["scooter", "trottinette"]),
]

# ---------------------------------------------------------------------------
# p32 · Les animaux domestiques et les animaux de la ferme
# ---------------------------------------------------------------------------
DOMESTIQUES = [
    ("chat", "un chat", ["cat domestic animal", "cat kitten"], ["cat", "chat"]),
    ("chien", "un chien", ["dog domestic animal", "dog puppy"], ["dog", "chien"]),
    ("cochon-inde", "un cochon d’Inde", ["guinea pig", "cavy"], ["guinea pig", "cavy", "cochin"]),
    ("furet", "un furet", ["ferret animal", "ferret pet"], ["ferret", "furet"]),
    ("hamster", "un hamster", ["hamster pet", "hamster"], ["hamster", "hamster"]),
    ("lapin", "un lapin", ["rabbit animal", "rabbit bunny"], ["rabbit", "bunny", "lapin"]),
    ("lezard", "un lézard", ["lizard reptile", "lizard"], ["lizard", "le_zard", "lézard"]),
    ("oiseau-domestique", "un oiseau", ["pet bird parrot", "bird perched"], ["bird", "parrot", "oiseau"]),
    ("poisson-domestique", "un poisson", ["goldfish bowl", "aquarium fish"], ["fish", "goldfish", "poisson"]),
    ("serpent-domestique", "un serpent", ["pet snake", "snake terrarium"], ["snake", "serpent"]),
    ("souris-domestique", "une souris", ["mouse pet", "white mouse"], ["mouse", "mice", "souris"]),
    ("tortue-domestique", "une tortue", ["turtle pet", "tortoise"], ["turtle", "tortoise", "tortue"]),
]

FERME = [
    ("ane", "un âne", ["donkey", "donkey animal"], ["donkey", "ane", "âne"]),
    ("canard", "un canard", ["duck", "duck pond"], ["duck", "canard"]),
    ("cheval", "un cheval", ["horse", "horse pasture"], ["horse", "cheval"]),
    ("chevre", "une chèvre", ["goat", "goat farm"], ["goat", "chevre", "chèvre"]),
    ("cochon", "un cochon", ["pig farm", "pigs"], ["pig", "cochon"]),
    ("mouton", "un mouton", ["sheep", "sheep flock"], ["sheep", "mouton", "lamb"]),
    ("poule", "une poule", ["hen chicken farm", "chicken hen"], ["hen", "chicken", "poule"]),
    ("vache", "une vache", ["cow cattle", "cows pasture"], ["cow", "cattle", "vache"]),
]

# ---------------------------------------------------------------------------
# p33 · Les animaux sauvages
# ---------------------------------------------------------------------------
SAUVAGES = [
    ("castor", "un castor", ["beaver", "beaver animal"], ["beaver", "castor"]),
    ("chameau", "un chameau", ["camel", "camel desert"], ["camel", "chameau"]),
    ("chevreuil", "un chevreuil", ["roe deer", "deer"], ["deer", "roe", "chevreuil"]),
    ("elephant-sauvage", "un éléphant", ["elephant", "elephant africa"], ["elephant", "éléphant"]),
    ("girafe-sauvage", "une girafe", ["giraffe", "giraffe savanna"], ["giraffe", "girafe"]),
    ("gorille-sauvage", "un gorille", ["gorilla", "gorilla wild"], ["gorilla", "gorille"]),
    ("grenouille", "une grenouille", ["frog", "frog green"], ["frog", "grenouille"]),
    ("hibou-sauvage", "un hibou", ["owl bird", "owl wild"], ["owl", "hibou"]),
    ("hippopotame", "un hippopotame", ["hippopotamus", "hippo"], ["hippopotamus", "hippo"]),
    ("kangourou-sauvage", "un kangourou", ["kangaroo", "kangaroo australia"], ["kangaroo", "kangourou"]),
    ("koala-sauvage", "un koala", ["koala", "koala tree"], ["koala"]),
    ("lion-sauvage", "un lion", ["lion", "lion male"], ["lion"]),
    ("loup", "un loup", ["wolf", "wolf wild"], ["wolf", "loup"]),
    ("manchot", "un manchot", ["penguin", "penguin colony"], ["penguin", "manchot"]),
    ("oie", "une oie", ["goose", "geese"], ["goose", "geese", "oie"]),
    ("original", "un original", ["moose", "moose alaska"], ["moose", "original"]),
    ("ours", "un ours", ["bear", "bear brown"], ["bear", "ours"]),
    ("panda", "un panda", ["giant panda", "panda"], ["panda"]),
    ("phoque", "un phoque", ["seal", "seal beach"], ["seal", "phoque"]),
    ("porc-epic", "un porc-épic", ["porcupine", "porcupine animal"], ["porcupine", "porc epic"]),
    ("raton-laveur", "un raton laveur", ["raccoon", "raccoon animal"], ["raccoon", "raton"]),
    ("renard", "un renard", ["fox", "fox red"], ["fox", "renard"]),
    ("singe", "un singe", ["monkey", "monkey primate"], ["monkey", "singe"]),
    ("tigre", "un tigre", ["tiger", "tiger stripes"], ["tiger", "tigre"]),
    ("zebra-sauvage", "un zèbre", ["zebra", "zebras plains"], ["zebra", "zèbre", "zebra"]),
]

# ---------------------------------------------------------------------------
# p34 · Les insectes et les animaux aquatiques
# ---------------------------------------------------------------------------
INSECTES = [
    ("abeille", "une abeille", ["bee honeybee flower", "bee insect"], ["bee", "honeybee", "abeille"]),
    ("chenille", "une chenille", ["caterpillar", "caterpillar larva"], ["caterpillar", "chenille"]),
    ("coccinelle", "une coccinelle", ["ladybug ladybird", "ladybird insect"], ["ladybug", "ladybird", "coccinelle"]),
    ("coquerelle", "une coquerelle", ["cockroach", "cockroach insect"], ["cockroach", "coquerelle"]),
    ("fourmi-insecte", "une fourmi", ["ant insect macro", "ants"], ["ant", "ants", "fourmi"]),
    ("guêpe", "une guêpe", ["wasp insect", "wasp yellow"], ["wasp", "guêpe", "guepe"]),
    ("libellule", "une libellule", ["dragonfly", "dragonfly insect"], ["dragonfly", "libellule"]),
    ("luciole", "une luciole", ["firefly", "firefly glowing"], ["firefly", "luciole"]),
    ("mante-religieuse", "une mante religieuse", ["praying mantis", "mantis"], ["mantis", "mante"]),
    ("mille-pattes", "un mille-pattes", ["millipede", "millipede centipede"], ["millipede", "centipede", "mille pattes"]),
    ("mouche", "une mouche", ["fly insect", "housefly"], ["fly", "mouche"]),
    ("moustique", "un moustique", ["mosquito", "mosquito insect"], ["mosquito", "moustique"]),
    ("papillon", "un papillon", ["butterfly", "butterfly wings"], ["butterfly", "papillon"]),
    ("sauterelle", "une sauterelle", ["grasshopper", "grasshopper insect"], ["grasshopper", "sauterelle"]),
    ("scarabée", "un scarabée", ["beetle", "beetle insect"], ["beetle", "scarabee", "scarabée"]),
]

AQUATIQUES = [
    ("anguille", "une anguille", ["eel", "eel fish"], ["eel", "anguille"]),
    ("baleine", "une baleine", ["whale", "whale ocean"], ["whale", "baleine"]),
    ("crabe", "un crabe", ["crab", "crab beach"], ["crab", "crabe"]),
    ("crevette", "une crevette", ["shrimp", "prawn shrimp"], ["shrimp", "prawn", "crevette"]),
    ("dauphin", "un dauphin", ["dolphin", "dolphin sea"], ["dolphin", "dauphin"]),
    ("écrevisse", "une écrevisse", ["crayfish", "crayfish freshwater"], ["crayfish", "ecrevisse", "écrevisse"]),
    ("épaulard", "un épaulard", ["orca killer whale", "killer whale"], ["orca", "killer whale", "epaulard", "épaulard"]),
    ("etoile-mer", "une étoile de mer", ["starfish sea star", "starfish"], ["starfish", "sea star", "etoile", "étoile"]),
    ("hippocampe", "un hippocampe", ["seahorse", "seahorse fish"], ["seahorse", "hippocampe"]),
    ("homard", "un homard", ["lobster", "lobster sea"], ["lobster", "homard"]),
    ("pieuvre", "une pieuvre", ["octopus", "octopus sea"], ["octopus", "pieuvre"]),
    ("requin", "un requin", ["shark", "shark ocean"], ["shark", "requin"]),
]

# ---------------------------------------------------------------------------
# p35 · Les différents lieux dans la ville
# ---------------------------------------------------------------------------
LIEUX = [
    ("aeroport", "l’aéroport", ["airport terminal building", "airport"], ["airport", "aeroport", "aéroport"]),
    ("arret-autobus", "l’arrêt d’autobus", ["bus stop", "bus shelter stop"], ["bus stop", "bus shelter", "arret"]),
    ("banque", "la banque", ["bank building facade", "bank"], ["bank", "banque"]),
    ("boulangerie", "la boulangerie", ["bakery shop bread", "baker"], ["bakery", "baker", "boulangerie"]),
    ("boutique", "la boutique", ["clothing shop store", "shop storefront"], ["shop", "store", "boutique"]),
    ("bureau-poste", "le bureau de poste", ["post office building", "post office"], ["post office", "poste"]),
    ("caserne-pompiers", "la caserne de pompiers", ["fire station building", "fire brigade station"], ["fire station", "fire brigade"]),
    ("centre-commercial", "le centre commercial", ["shopping mall", "shopping centre"], ["mall", "shopping centre", "shopping mall"]),
    ("cinema", "le cinéma", ["cinema building", "movie theater"], ["cinema", "movie theater", "cinema"]),
    ("depanneur", "le dépanneur", ["convenience store", "corner shop"], ["convenience", "corner shop"]),
    ("ecole-ville", "l’école", ["school building exterior", "school"], ["school", "ecole", "école"]),
    ("epicerie", "l’épicerie", ["grocery store supermarket", "grocery"], ["grocery", "supermarket"]),
    ("garage", "le garage", ["garage building repair shop", "car repair shop"], ["garage", "repair shop"]),
    ("gare-train", "la gare de train", ["railway station building", "train station"], ["railway station", "train station", "gare"]),
    ("hopital", "l’hôpital", ["hospital building", "hospital"], ["hospital", "hopital", "hôpital"]),
    ("hotel", "l’hôtel", ["hotel building facade", "hotel"], ["hotel", "hôtel"]),
    ("librairie", "la librairie", ["bookshop bookstore", "bookshop"], ["bookshop", "bookstore", "librairie"]),
    ("maison-ville", "la maison", ["house home exterior", "detached house"], ["house", "home"]),
    ("musee", "le musée", ["museum building", "museum"], ["museum", "musee", "musée"]),
    ("parc", "le parc", ["park public green trees", "city park"], ["park", "parc"]),
    ("pharmacie", "la pharmacie", ["pharmacy shop storefront", "pharmacy"], ["pharmacy", "pharmacie"]),
    ("poste-police", "le poste de police", ["police station building", "police station"], ["police station", "police"]),
    ("restaurant", "le restaurant", ["restaurant interior", "restaurant"], ["restaurant"]),
    ("station-essence", "la station d’essence", ["gas station petrol", "filling station"], ["gas station", "petrol station", "filling station"]),
    ("terrain-jeux", "le terrain de jeux", ["playground children", "playground"], ["playground", "play area"]),
]

# ---------------------------------------------------------------------------
# p37 · La maison
# ---------------------------------------------------------------------------
PIECES = [
    ("bureau-maison", "le bureau", ["home office desk", "study desk room"], ["desk", "office", "bureau"]),
    ("chambre", "la chambre", ["bedroom interior", "bedroom"], ["bedroom", "bed", "chambre"]),
    ("cuisine", "la cuisine", ["kitchen interior", "kitchen"], ["kitchen", "cuisine"]),
    ("garage-maison", "le garage", ["garage interior car", "garage"], ["garage"]),
    ("salle-manger", "la salle à manger", ["dining room table chairs", "dining room"], ["dining room", "dining"]),
    # « aller à la salle de bain » est déjà une scène dessinée (la journée) ;
    # ici c'est la pièce.
    ("salle-bain-piece", "la salle de bain", ["bathroom interior", "bathroom"], ["bathroom", "bath"]),
    ("salon", "le salon", ["living room sofa", "living room"], ["living room", "sofa", "salon"]),
    ("sous-sol", "le sous-sol", ["basement room interior", "basement"], ["basement", "cellar"]),
]

OBJETS_MAISON = [
    ("bain", "le bain", ["bathtub bathroom", "bathtub"], ["bathtub", "bath", "bain"]),
    ("commode", "la commode", ["chest of drawers dresser", "dresser"], ["chest of drawers", "dresser", "commode"]),
    ("cuisiniere", "la cuisinière", ["stove cooker kitchen", "kitchen stove"], ["stove", "cooker", "cuisiniere"]),
    ("divan", "le divan", ["sofa couch", "couch"], ["sofa", "couch", "divan"]),
    ("etagere", "l’étagère", ["bookshelf shelf", "shelving unit"], ["bookshelf", "shelf", "shelving", "etagere", "étagère"]),
    ("fenetre", "la fenêtre", ["window house interior", "window"], ["window", "fenetre", "fenêtre"]),
    ("grille-pain", "le grille-pain", ["toaster", "toaster kitchen"], ["toaster", "grille pain"]),
    ("lampe", "la lampe", ["table lamp", "lamp"], ["lamp", "lampe"]),
    # « le lave-vaisselle » existe déjà comme scène dessinée (les tâches) :
    # ici c'est l'appareil, d'où un identifiant distinct.
    ("lave-vaisselle-objet", "le lave-vaisselle", ["dishwasher", "dishwasher kitchen"], ["dishwasher", "lave vaisselle"]),
    ("lit", "le lit", ["bed bedroom", "double bed"], ["bed", "lit"]),
    ("micro-ondes", "le micro-ondes", ["microwave oven", "microwave"], ["microwave", "micro ondes"]),
    ("miroir", "le miroir", ["mirror wall", "mirror"], ["mirror", "miroir"]),
    ("refrigerateur", "le réfrigérateur", ["refrigerator fridge", "fridge"], ["refrigerator", "fridge", "refrigerateur"]),
    ("table", "la table", ["table wooden", "table furniture"], ["table"]),
    ("toilette", "la toilette", ["toilet wc", "toilet"], ["toilet", "wc", "toilette"]),
]

# ---------------------------------------------------------------------------
# p38 · Les pays
# ---------------------------------------------------------------------------
# Les drapeaux : Commons en a une couverture complète, y compris en image
# matricielle ; c'est le seul endroit fiable pour cette série.
DRAPEAUX = [
    ("pays-allemagne", "l’Allemagne", ["flag of Germany waving", "German flag"], ["germany", "german"]),
    ("pays-angleterre", "l’Angleterre", ["flag of England waving", "England flag St George"], ["england", "english", "st george"]),
    ("pays-argentine", "l’Argentine", ["flag of Argentina waving", "Argentine flag"], ["argentina", "argentine"]),
    ("pays-bresil", "le Brésil", ["flag of Brazil waving", "Brazil flag"], ["brazil", "brasil", "brazilian"]),
    ("pays-chine", "la Chine", ["flag of China waving", "China flag"], ["china", "chinese"]),
    ("pays-espagne", "l’Espagne", ["flag of Spain waving", "Spain flag"], ["spain", "spanish", "espagne"]),
    ("pays-etats-unis", "les États-Unis", ["flag of the United States waving", "US flag stars"], ["united states", "usa", "u.s.", "states"]),
    ("pays-france", "la France", ["flag of France waving", "French flag"], ["france", "french"]),
    ("pays-italie", "l’Italie", ["flag of Italy waving", "Italian flag"], ["italy", "italian", "italie"]),
    ("pays-japon", "le Japon", ["flag of Japan waving", "Japanese flag"], ["japan", "japanese", "japon"]),
    ("pays-mexique", "le Mexique", ["flag of Mexico waving", "Mexico flag"], ["mexico", "mexican", "mexique"]),
    ("pays-russie", "la Russie", ["flag of Russia waving", "Russian flag"], ["russia", "russian", "russie"]),
]

PAYS_CARTE = [
    ("carte-canada", "le Canada", ["map of Canada provinces", "Canada map"], ["canada", "map"]),
]

# ---------------------------------------------------------------------------
# p39 · Les mois de l'année — le livre montre une scène pour chaque mois
# ---------------------------------------------------------------------------
MOIS = [
    ("mois-janvier", "janvier", ["snowman winter snow", "snowman"], ["snowman", "snow"]),
    ("mois-fevrier", "février", ["skier snow ski slope", "skiing snow"], ["ski", "skier", "snow"]),
    ("mois-mars", "mars", ["spring thaw melting snow", "spring weather"], ["spring", "thaw", "melt"]),
    ("mois-avril", "avril", ["spring rain puddle", "rain puddle ground"], ["rain", "puddle"]),
    ("mois-mai", "mai", ["spring flowers garden", "planting flowers"], ["flower", "spring", "garden"]),
    ("mois-juin", "juin", ["reading book outdoors", "book reading"], ["book", "reading"]),
    ("mois-juillet", "juillet", ["swimming pool summer", "inflatable pool"], ["pool", "swimming"]),
    ("mois-aout", "août", ["fishing rod river", "angler fishing"], ["fishing", "angler", "rod"]),
    ("mois-septembre", "septembre", ["hiking trail mountains autumn", "hiker trail"], ["hiking", "hiker", "trail", "mountain"]),
    ("mois-octobre", "octobre", ["pumpkin halloween autumn", "pumpkin"], ["pumpkin", "autumn"]),
    ("mois-novembre", "novembre", ["autumn wind leaves trees", "windy tree"], ["autumn", "leaves", "wind"]),
    ("mois-decembre", "décembre", ["christmas gift presents", "christmas"], ["christmas", "gift", "present"]),
]


# ---------------------------------------------------------------------------
# p28 · Les passe-temps
# ---------------------------------------------------------------------------
# Ce sont des gestes, mais tous ont une photographie évidente sur Commons —
# contrairement aux « actions à l'école », où il faudrait photographier un élève
# en train d'encercler un mot. Trois réutilisent une image déjà présente.
PASSE_TEMPS = [
    ("collectionner", "collectionner des objets", ["collectible toys collection", "action figures collection"], ["collectible", "toy", "collection"]),
    ("cuisiner", "cuisiner", ["cooking kitchen person", "cooking food"], ["cooking", "cook", "cuisine"]),
    ("danser", "danser", ["dancing person dance", "dancer dancing"], ["dancing", "dancer", "danse"]),
    ("ecouter-musique", "écouter de la musique", ["listening to music headphones", "person headphones music"], ["headphones", "listening", "music"]),
    ("faire-du-sport", "faire du sport", ["jogging running person", "running outdoors sport"], ["running", "jogging", "sport"]),
    ("casse-tete", "faire un casse-tête", ["jigsaw puzzle pieces", "puzzle assembling"], ["puzzle", "jigsaw"]),
    ("modele-reduit", "faire un modèle réduit", ["scale model airplane", "model ship kit"], ["model", "scale model", "kit"]),
    ("jardiner", "jardiner", ["gardening person plants", "gardening garden"], ["gardening", "garden", "jardinage"]),
    ("jeu-video", "jouer à un jeu vidéo", ["video game playing console", "gamer playing videogame"], ["video game", "gaming", "joueur"]),
    ("jouer-dehors", "jouer dehors", ["children playing outside playground", "kids playing outdoors"], ["children", "playing", "outside"]),
    ("jouer-instrument", "jouer d'un instrument", ["playing musical instrument band", "musician playing instrument"], ["playing", "instrument", "musician"]),
    ("naviguer-internet", "naviguer sur Internet", ["using laptop internet cafe", "person laptop browsing"], ["laptop", "internet", "browsing"]),
    ("peindre", "peindre", ["painting brush canvas", "painter painting"], ["painting", "painter", "brush", "peindre"]),
    ("photographier", "photographier", ["taking photograph camera", "photographer taking photo"], ["photograph", "photographer", "camera"]),
]
# « lire un livre » et « regarder la télévision » réutilisent les images de
# « un livre » (p24) et de « une télévision » (p29) ; « faire du sport » et
# « jouer d'un instrument » ont eux aussi leur photo ci-dessus.


# --- Épingles -------------------------------------------------------------
# Mots où le choix automatique se trompe, ou pour lesquels la recherche ne
# renvoie rien d'utile. `python tools/check_pins.py` signale les doublons.
PICK3 = {
    # Les drapeaux. La recherche en texte libre ramenait un drapeau peint sur
    # une pelouse, une foule de supporters, une photo de 1930 en noir et
    # blanc, ou un drapeau français sur une façade avec un « RF » — rien de
    # ce qui se reconnaisse en un coup d'œil. Commons a des fichiers vectoriels
    # canoniques pour chaque pays ; le.pipeline les rasterise, et le livre
    # montrait de toute façon des drapeaux à plat.
    "pays-allemagne": "File:Flag of Germany.svg",
    "pays-angleterre": "File:Flag of England.svg",
    "pays-argentine": "File:Flag of Argentina.svg",
    "pays-bresil": "File:Flag of Brazil.svg",
    "pays-chine": "File:Flag of China.svg",
    "pays-espagne": "File:Flag of Spain.svg",
    "pays-etats-unis": "File:Flag of the United States.svg",
    "pays-france": "File:Flag of France.svg",
    "pays-italie": "File:Flag of Italy.svg",
    "pays-japon": "File:Flag of Japan.svg",
    "pays-mexique": "File:Flag of Mexico.svg",
    "pays-russie": "File:Flag of Russia.svg",
    # « la fête du Canada » avait donné un chef de police portant un drapeau :
    # une scène, pas une fête.
    "fete-canada": "File:Flag of Canada.svg",

    # Les autres fêtes où le choix automatique se trompait :
    # « le jour de l'An » → une rue vide de nuit ; « la Saint-Jean-Baptiste »
    # → une plaque « Hôtel de ville » de village français ; « la Saint-Patrick »
    # → un trèfle à quatre feuilles (une chance, pas la fête) ; « la
    # Saint-Valentin » → une rose ; « le Rosh Hashanah » → un chandelier de
    # musée qui ressemble à une menora.
    "jour-an": "File:Fireworks on New Year's Eve in a small Swabian village (1), brightened.jpg",
    "saint-jean": "File:Flag of Quebec.svg",
    "saint-patrick": "File:Oxalis acetosella - surelle - shamrock (4639714369).jpg",
    "saint-valentin": "File:Love hearts (15347447765).jpg",
    "rosh-hashanah": "File:Shofar in Rosh Hashanah.jpg",

    # Les sports : huit photos sur seize ne montraient pas le sport.
    # Commons est pourtant plein de sport — c'est la recherche en texte libre
    # qui s'est trompée, parce qu'elle cherchait des mots comme « player »
    # sans exiger que le sport lui-même soit nommé.
    #   « le volleyball » → trois hommes en costume, à l'aéroport
    #   « le cyclisme »   → des coureurs à pied
    #   « le tennis »    → une boîte en fer-blanc
    #   « le soccer »    → un practice green de golf
    #   « le football »  → un huddle de rugby
    #   « le baseball »  → une photo de 1920 en noir et blanc
    #   « le badminton » → un court vide
    #   « le hockey »    → un Portrait rapproché d'un joueur
    "badminton": "File:Olympics 2012 Mixed Doubles Final.jpg",
    "baseball": "File:Baseball swing.jpg",
    "cyclisme": "File:2025 Australia National Road Cycling Championships Women & U23 road race 16.jpg",
    "football": "File:DFC 5330 Two players battle for possession during an evening soccer match at Klet Kaeo field in Sattahip Chon Buri.jpg",
    "hockey": "File:Player chasing the puck during an ice hockey game in Hull, 2025.jpg",
    "planche-roulettes": "File:Skateboarding in Central Park (New York) 02.jpg",
    "soccer": "File:DFC 5331 A late-night match at Klet Kaeo a player in red sprints toward goal as defenders close in under the floodlights.jpg",
    "tennis": "File:Isner-Mahut match WIM2010.jpg",
    "volleyball": "File:Serve during volleyball match 4.jpg",

    # Les lieux dans la ville : quatre photos sur vingt-cinq ne montraient
    # pas le lieu nommé. « la boutique » était un hall d'immeuble, « l'école »
    # un coucher de soleil, « la maison » une autoroute de nuit, « le
    # restaurant » un parc au crépuscule.
    "boutique": "File:A John Lewis Partnership shop window (8734851754).jpg",
    "ecole-ville": "File:Front entrance of Sylvan Hills High School.jpg",
    "maison-ville": "File:Chipping Ongar, Detached house and bungalow - geograph.org.uk - 6935779.jpg",
    "restaurant": "File:Restaurant in Place D'Youville, Quebec City.jpg",

    # Les mois de l'année : le livre montre une scène de saison par mois.
    # « avril » était un court de tennis, « août » un lac sans pêcheur,
    # « novembre » du bambou vert.
    "mois-avril": "File:Main Street Puddle Ferndale CA.JPG",
    "mois-aout": "File:DFC 1595 A lone angler silhouetted against the shimmering sea casting a line from rocky shore at dusk.jpg",
    "mois-novembre": "File:Wilted leaves - autumn - Dolný Kubín - Slovakia - 01.jpg",

    # Les transports : « le bateau » donnait une mer vide (le bateau était
    # sorti du cadre), « l'hélicoptère » un point noir dans le ciel à peine
    # visible, et « l'auto » comme « la limousine » deux vehicles d'avant-guerre.
    "auto": "File:Car driving along a road surrounded by trees.jpg",
    "bateau-transport": "File:03- Sailing on Sydney Harbour (17307794872).jpg",
    "helicoptere-transport": "File:Bell 206L-4 LongRanger IV over Botafogo Bay, Rio de Janeiro.jpg",
    "limousine": "File:Lincoln Town Car stretch limousine - 01.jpg",
    "traversier": "File:Car ferry KOOROONGABA in Sydney Harbour (8526161997).jpg",

    # La Saint-Valentin : cinq photos sur huit ne montraient rien de
    # romantique. « le bisou » était un rocher du canyon du Colorado, « le
    # cœur » un générique de vidéo YouTube, « le cupidon » un masque de
    # pierre, « les amoureux » deux和控制 guests d'un temple.
    "amoureux": "File:Romantic sunset Couple romance - panoramio.jpg",
    "bisou": "File:Kiss, Love kiss, Romance, People kissing, Rostov-on-Don, Russia.jpg",
    "coeur": "File:Heart Balloons in the sky (24190361616).jpg",
    "cupidon": "File:Cupid with golden wings-Louis Schroeder-RF 1116-IMG 0976.JPG",
    "mot-amour": "File:Caroline Frances Appleton to Fanny Appleton, 19 June 1836 (dd6bc9f1-6912-4169-a556-3aeb187d22ac).jpg",

    # Les objets de la classe et de la maison :
    # « le bureau » était un dessin au crayon d'un meuble, « le livre » un
    # portrait gravé du XVIIe, « le tableau » une pièce sombre, « la commode »
    # un parc avec un monument, « le réfrigérateur » une enseigne
    # « Silent Night », « le panier » un seau de cuivre.
    "bureau": "File:Workspace setup with a computer monitor and desk lamp in an office environment.jpg",
    "livre": "File:Open book with apples placed on a wooden table in a bright indoor setting.jpg",
    "tableau": "File:Hand pressed against a chalkboard revealing traces of past lessons and ideas in a classroom setting.jpg",
    "commode": "File:Dresser (366486720).jpg",
    "refrigerateur": "File:US Domestic Refrigerator - Frigidaire.jpg",
    "panier": "File:Eggs in basket 2020 G1.jpg",

    # Les passe-temps : « faire du sport » était un monument représentant
    # des haltères, « jouer dehors » une photo de 1907 en noir et blanc.
    "faire-du-sport": "File:2010 Army Ten Miler Start.jpg",
    "jouer-dehors": "File:Amsterdam, playground with playing children at the city square Frederiksplein; free photo by Fons Heijnsbroek, january 2022.jpg",
    "jouer-instrument": "File:Band playing at Sloppy Joe's in Key West Florida.jpg",

    # Les instruments et Noël, où l'automatique s'était trompé :
    # « la flûte » était un os préhistorique, « le saxophone » un concert de
    # musique de chambre où le saxophoniste fait trois pixels, « les cadeaux »
    # un étui à cigarettes en or, « le traîneau » une photographie de 1950.
    "flute": "File:Western concert flute (Yamaha).jpg",
    "saxophone": "File:Saxophone Player in Balboa Park.jpg",
    "cadeaux": "File:Christmas gifts or presents.jpg",
    "couronne-noel": "File:Advent wreath with violet and rose candles 2.jpg",
    "traineau": "File:Santa's sleigh and reindeer depiction, New Inn, Torfaen - geograph.org.uk - 7950268.jpg",

    # Les animaux. Commons en a une couverture complète, mais la recherche
    # en texte libre décroche vite sur les mots courants :
    #   « un furet »           → l'enseigne d'une quincaillerie
    #   « un poisson » (domestique) → un pot de porcelaine dans une vitrine
    #   « un oiseau » (domestique) → un oiseau à l'état de point sur un poteau
    #   « un phoque »          → un port de plaisance, sans phoque
    #   « un tigre »           → un tigre à quatre cents mètres
    "furet": "File:Mustela putorius furo.jpg",
    "oiseau-domestique": "File:Budgerigar and glass bird on carpet.jpg",
    "poisson-domestique": "File:Fish bowl2.jpg",
    "phoque": "File:View of a seal lying on the beach - geograph.org.uk - 7679783.jpg",
    "tigre": "File:Amur Tiger Panthera tigris altaica Eye 2112px edit.jpg",

    # Les pièces de la maison et les appareils : « l'imprimante » était un
    # monument photographié contre un ciel bleu, « le bureau » un café, « le
    # garage » une clôture en bois.
    "imprimante": "File:Lexmark Printer IMG 0001.jpg",
    "bureau-maison": "File:Laptop and lamp on table (Unsplash).jpg",
    "chambre": "File:Plas Mawr, Bed in Dorothy's bedroom - geograph.org.uk - 7821503.jpg",
    "garage-maison": "File:Garage with Car Parked Outside - DPLA - 5323b9271f71a9005c33e802a72b3018.jpg",
}


def all_lists():
    """Toutes les listes photographiques des pages 26 à 45."""
    out = []
    for g in (FETES, HALLOWEEN, NOEL, VALENTIN, PAQUES, CLASSE, PASSE_TEMPS,
              SPORTS, INSTRUMENTS, ELECTRONIQUE, TRANSPORTS, DOMESTIQUES, FERME,
              SAUVAGES, INSECTES, AQUATIQUES, LIEUX, PIECES, OBJETS_MAISON,
              DRAPEAUX, PAYS_CARTE, MOIS):
        out.extend(g)
    return out
