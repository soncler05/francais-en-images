/* ==========================================================================
   Le français en images — contenu des 10 premières pages
   Transcrit depuis le balayage du livre (86 pages, image seule par page).
   Les illustrations d'origine (Frédéric et Patrick Bizier) sont des œuvres
   protégées : elles sont remplacées par des photographies Wikimedia Commons
   et des dessins vectoriels originaux, tous deux plus nets que le scan 2015.
   ========================================================================== */
(function (global) {
  "use strict";

  /* --- L'alphabet : 2 mots par lettre, comme dans le livre ---------------- */
  var ALPHABET = [
    { letter: "A", items: ["arc-en-ciel", "avion"] },
    { letter: "B", items: ["ballon", "bateau"] },
    { letter: "C", items: ["carotte", "clou"] },
    { letter: "D", items: ["dinosaure", "drapeau"] },
    { letter: "E", items: ["elephant", "escargot"] },
    { letter: "F", items: ["fleur", "fourmi"] },
    { letter: "G", items: ["girafe", "gorille"] },
    { letter: "H", items: ["helicoptere", "hibou"] },
    { letter: "I", items: ["iglou", "ile"] },
    { letter: "J", items: ["jongleur", "jus"] },
    { letter: "K", items: ["kangourou", "koala"] },
    { letter: "L", items: ["licorne", "lion"] },
    { letter: "M", items: ["maison", "marteau"] },
    { letter: "N", items: ["nez", "nid"] },
    { letter: "O", items: ["orange", "otarie"] },
    { letter: "P", items: ["pomme", "porte"] },
    { letter: "Q", items: ["quenouille", "quilles"] },
    { letter: "R", items: ["radio", "rateau"] },
    { letter: "S", items: ["serpent", "souris"] },
    { letter: "T", items: ["tortue", "train"] },
    { letter: "U", items: ["uniforme", "usine"] },
    { letter: "V", items: ["velo", "violon"] },
    { letter: "W", items: ["wagon", "wapiti"] },
    { letter: "X", items: ["xavier", "xylophone"] },
    { letter: "Y", items: ["yaourt", "yoyo"] },
    { letter: "Z", items: ["zebre", "zebu"] }
  ];

  /* --- Le vocabulaire : index des thèmes, 3 colonnes (page 7) ------------- */
  // t = titre, p = page, k = true si c'est une sous-rubrique (en bleu)
  var VOCABULAIRE = [
    [
      { t: "L’alphabet", p: 2 },
      { t: "Les nombres", p: 4 },
      { t: "Le rang", p: 4, k: true },
      { t: "L’argent", p: 4, k: true },
      { t: "Ma famille", p: 5 },
      { t: "Le corps", p: 6 },
      { t: "Les vêtements", p: 7 },
      { t: "Les accessoires", p: 8 },
      { t: "Les motifs", p: 8 },
      { t: "Les chaussures", p: 8 },
      { t: "Les couleurs", p: 9 },
      { t: "Les formes", p: 9 },
      { t: "Les couleurs de cheveux", p: 10 },
      { t: "Pour parler des cheveux", p: 10, k: true },
      { t: "Les contraires", p: 11 },
      { t: "Les aliments", p: 12 },
      { t: "Les repas", p: 12, k: true },
      { t: "Les différents menus", p: 12, k: true },
      { t: "Les condiments", p: 12, k: true },
      { t: "Les fruits", p: 13, k: true },
      { t: "Les légumes", p: 13, k: true },
      { t: "Les viandes et substituts", p: 14, k: true },
      { t: "Les produits céréaliers", p: 14, k: true },
      { t: "Les boissons", p: 15, k: true },
      { t: "Les desserts", p: 15, k: true },
      { t: "Les tâches", p: 16 },
      { t: "Les actions de la journée", p: 17 }
    ],
    [
      { t: "Les sentiments et les sensations", p: 18 },
      { t: "Les problèmes de santé", p: 19 },
      { t: "Les fêtes", p: 20 },
      { t: "Halloween", p: 21, k: true },
      { t: "Noël", p: 21, k: true },
      { t: "Saint-Valentin", p: 22, k: true },
      { t: "Pâques", p: 22, k: true },
      { t: "L’école", p: 23 },
      { t: "Les actions à l’école", p: 23, k: true },
      { t: "Les objets de la classe", p: 24, k: true },
      { t: "Le personnel de l’école", p: 25, k: true },
      { t: "Les matières", p: 25, k: true },
      { t: "L’école et ses environs", p: 26, k: true },
      { t: "Les sports", p: 27 },
      { t: "Les passe-temps", p: 28 },
      { t: "Les instruments de musique", p: 29 },
      { t: "Les appareils électroniques", p: 29 },
      { t: "Les métiers", p: 30 },
      { t: "Les moyens de transport", p: 31 },
      { t: "Les animaux domestiques", p: 32 },
      { t: "Les animaux de la ferme", p: 32 },
      { t: "Les animaux sauvages", p: 33 }
    ],
    [
      { t: "Les insectes", p: 34 },
      { t: "Les animaux aquatiques", p: 34 },
      { t: "Les différents lieux dans la ville", p: 35 },
      { t: "Les mots pour situer différents endroits", p: 36 },
      { t: "Les mots pour décrire le mouvement", p: 36 },
      { t: "La maison", p: 37 },
      { t: "Les pièces de la maison", p: 37, k: true },
      { t: "Les objets de la maison", p: 37, k: true },
      { t: "Les pays", p: 38 },
      { t: "Le Canada", p: 38, k: true },
      { t: "Quelques pays", p: 38, k: true },
      { t: "Le temps", p: 39 },
      { t: "Les moments de la journée", p: 39, k: true },
      { t: "Les moments de la semaine", p: 39, k: true },
      { t: "Les jours de la semaine", p: 39, k: true },
      { t: "Les mois de l’année", p: 39, k: true },
      { t: "Les saisons", p: 40, k: true },
      { t: "Une année", p: 40, k: true },
      { t: "La nature", p: 41 },
      { t: "La terre", p: 41, k: true },
      { t: "L’eau", p: 41, k: true },
      { t: "L’air", p: 41, k: true },
      { t: "Le temps qu’il fait", p: 42 },
      { t: "Les phénomènes météorologiques", p: 42, k: true }
    ]
  ];

  /* --- Les nombres (page 4 du livre) ------------------------------------- */
  var NOMBRES = {
    banner: "Les nombres",
    unites: [
      ["0", "zéro"], ["1", "un"], ["2", "deux"], ["3", "trois"],
      ["4", "quatre"], ["5", "cinq"], ["6", "six"], ["7", "sept"],
      ["8", "huit"], ["9", "neuf"], ["10", "dix"], ["11", "onze"],
      ["12", "douze"], ["13", "treize"], ["14", "quatorze"], ["15", "quinze"],
      ["16", "seize"], ["17", "dix-sept"], ["18", "dix-huit"],
      ["19", "dix-neuf"], ["20", "vingt"]
    ],
    dizaines: [
      ["10", "dix"], ["20", "vingt"], ["30", "trente"], ["40", "quarante"],
      ["50", "cinquante"], ["60", "soixante"], ["70", "soixante-dix"],
      ["80", "quatre-vingt"], ["90", "quatre-vingt-dix"], ["100", "cent"]
    ],
    rang: [
      ["1", "première, premier"], ["2", "deuxième"], ["3", "troisième"],
      ["4", "quatrième"], ["5", "cinquième"]
    ]
  };

  /* --- L'argent (page 4 du livre) ---------------------------------------- */
  // Redessiné en SVG : lapiaçante est nette à toute résolution.
  var ARGENT = [
    { id: "piece-5-cents", label: "5 cents", kind: "coin", value: 5, cents: true },
    { id: "piece-10-cents", label: "10 cents", kind: "coin", value: 10, cents: true },
    { id: "piece-25-cents", label: "25 cents", kind: "coin", value: 25, cents: true },
    { id: "billet-1-dollar", label: "un dollar", kind: "coin", value: 1 },
    { id: "billet-2-dollars", label: "deux dollars", kind: "coin", value: 2 },
    { id: "billet-5-dollars", label: "5 dollars", kind: "note", value: 5 },
    { id: "billet-10-dollars", label: "10 dollars", kind: "note", value: 10 },
    { id: "billet-20-dollars", label: "20 dollars", kind: "note", value: 20 },
    { id: "billet-50-dollars", label: "50 dollars", kind: "note", value: 50 },
    { id: "billet-100-dollars", label: "100 dollars", kind: "note", value: 100 }
  ];

  /* --- La planche illustrée (page 6 du PDF) ------------------------------ */
  var DIALOGUE = {
    question: "Qu’est-ce que tu aimes manger au déjeuner ?",
    reponse: "Moi, j’aime les kiwis et les oranges.",
    foods: ["kiwi", "oranges", "banane", "papaye", "melon"]
  };

  /* --- Les crédits (page 4 du PDF, deux colonnes) ----------------------- */
  var CREDITS = [
    { r: "Direction de l’édition", n: "Katie Moquin" },
    { r: "Direction de la production", n: "Danielle Latendresse" },
    { r: "Direction de la coordination", n: "Rodolphe Courcy" },
    { r: "Charge de projet", n: "Suzanne Bélanger" },
    { r: "Révision linguistique", n: "Marie Auclair" },
    { r: "Correction d’épreuves", n: "Marie Théorêt et Odille Dallerue" },
    { r: "Conception graphique", n: "Matière parent — graphisme et communication<br>Geneviève Guérard" },
    { r: "Mise en pages", n: "Interscript" },
    { r: "Illustrations", n: "Frédéric Bizier<br>Patrick Bizier" }
  ];

  var REMERCIEMENTS = [
    "Ghislaine Gagné, chargée de cours, Université du Québec à Montréal.",
    "Lyne Kohut, enseignante, St. Emily Catholic, Nepean, Ontario.",
    "Carolle Rose, Rockland Public School, Rockland, Ontario."
  ];

  /* --- Les numéros de page, en toutes lettres (pied des pages du livre) -- */
  var PAGE_MOTS = {
    5: "cinq", 6: "six", 7: "sept", 8: "huit", 9: "neuf", 10: "dix",
    11: "onze", 12: "douze", 13: "treize", 14: "quatorze", 15: "quinze",
    16: "seize", 17: "dix-sept", 18: "dix-huit", 19: "dix-neuf",
    20: "vingt", 21: "vingt et un", 22: "vingt-deux", 23: "vingt-trois",
    24: "vingt-quatre", 25: "vingt-cinq", 26: "vingt-six", 27: "vingt-sept",
    28: "vingt-huit", 29: "vingt-neuf", 30: "trente", 31: "trente et un",
    32: "trente-deux", 33: "trente-trois", 34: "trente-quatre",
    35: "trente-cinq", 36: "trente-six", 37: "trente-sept",
    38: "trente-huit", 39: "trente-neuf"
  };

  /* ======================================================================
     Pages 11 à 25 du balayage (pages 5 à 19 du livre)
     ----------------------------------------------------------------------
     Le décor change : fond orange texturé, bandeau vert, fiches blanches à
     filet vert, « Boîte de dialogue » bordeaux.
     ====================================================================== */
  var PAGES2 = [
    {
      id: "famille", label: "Ma famille", render: "vocab", book: 5,
      sections: [
        { title: "les grands-parents", kind: "avatar", cols: 2,
          items: ["grand-pere", "grand-mere"] },
        { title: "les parents", kind: "avatar", cols: 4,
          items: ["pere", "mere", "oncle", "tante"] },
        { title: "les enfants", kind: "avatar", cols: 5,
          items: ["frere", "moi", "soeur", "cousin", "cousine"] }
      ],
      dialogue: ["Comment s’appellent tes parents?",
                 "Ma mère s’appelle Isabelle et mon père s’appelle Martin."]
    },
    {
      id: "corps", label: "Le corps", render: "corps", book: 6
    },
    {
      id: "vetements", label: "Les vêtements", render: "vocab", book: 7,
      sections: [
        { title: "Les vêtements", kind: "dessin", cols: 6, items: [
          "bermuda", "blouson-court", "camisole", "chandail",
          "chandail-capuchon", "chapeau", "chaussettes", "chemise",
          "chemisier", "complet", "gants", "impermeable", "jean", "jupe",
          "maillot-bain", "manteau", "mitaines", "pantalon", "pyjama", "robe",
          "robe-chambre", "salopette", "sous-vetement", "tee-shirt"
        ] }
      ],
      dialogue: ["Qu’est-ce que tu portes?",
                 "Je porte un chapeau orange et un imperméable jaune."]
    },
    {
      id: "accessoires", label: "Les accessoires", render: "vocab", book: 8,
      sections: [
        { title: "Les accessoires", kind: "dessin", cols: 5, items: [
          "bague", "bandeau", "boucles-oreilles", "bracelet", "casquette",
          "ceinture", "collier", "cravate", "foulard", "lunettes",
          "lunettes-soleil", "maquillage", "montre", "parapluie", "porte-cles",
          "portefeuille", "sac-dos", "sac-main", "sac-plage", "tuque"
        ] },
        { title: "Les motifs", kind: "motif", cols: 6, items:
          ["carreaux", "ecossais", "imprime", "pois", "rayures", "uni"] },
        { title: "Les chaussures", kind: "dessin", cols: 6, items:
          ["bottes", "escarpins", "espadrilles", "pantoufles", "sandales", "souliers"] }
      ],
      dialogue: null
    },
    {
      id: "couleurs-formes", label: "Les couleurs et les formes", render: "vocab", book: 9,
      sections: [
        { title: "Les couleurs", kind: "couleur", cols: 8, items:
          ["beige", "blanc", "bleu", "brun", "gris", "jaune", "noir", "orange",
           "rose", "rouge", "turquoise", "vert", "violet", "argent", "or", "bronze"] },
        { title: "Les formes", kind: "forme", cols: 5, items:
          ["carre", "cercle", "coeur", "etoile", "fleche",
           "losange", "ovale", "rectangle", "triangle", "ligne"] }
      ],
      dialogue: null
    },
    {
      id: "cheveux", label: "Les cheveux", render: "vocab", book: 10,
      sections: [
        { title: "Les couleurs de cheveux", kind: "cheveux-couleur", cols: 6,
          items: ["blanc", "blond", "brun", "gris", "noir", "roux"] },
        { title: "Pour parler des cheveux", kind: "coiffure", cols: 6, items:
          ["afro", "cheveux-boucles", "cheveux-courts", "cheveux-frices",
           "cheveux-longs", "cheveux-raides", "couettes", "crane-chauve",
           "queue-cheval", "tete-rasee", "tresse", "tresses-rastas"] }
      ],
      dialogue: ["Décris-moi tes cheveux.",
                 "Mes cheveux sont longs, blonds avec des tresses."]
    },
    {
      id: "contraires", label: "Les contraires", render: "contraires", book: 11
    },
    {
      id: "aliments", label: "Les aliments", render: "vocab", book: 12,
      sections: [
        { title: "Les repas", kind: "photo", cols: 4, items:
          ["dejeuner", "collation", "diner", "souper"] },
        { title: "Les différents menus", kind: "photo", cols: 5, items:
          ["cari-legumes", "chili", "falafels", "hachis-parmentier", "hamburger",
           "lasagne", "pizza", "spaghetti", "sushis", "taco"] },
        { title: "Les condiments", kind: "photo", cols: 6, items:
          ["ketchup", "mayonnaise", "miel", "moutarde", "relish", "salsa"] }
      ],
      dialogue: ["Qu’est-ce que tu aimes manger au déjeuner?",
                 "J’aime manger des céréales et boire un jus d’orange."]
    },
    {
      id: "fruits-legumes", label: "Les fruits et les légumes", render: "vocab", book: 13,
      sections: [
        { title: "Les fruits", kind: "photo", cols: 5, items:
          ["ananas", "banane-fruit", "bleuets", "cerise", "citron",
           "fraise", "framboise", "kiwi-fruit", "melon-eau", "orange-fruit",
           "pamplemousse", "peche", "poire", "pomme-fruit", "raisins"] },
        { title: "Les légumes", kind: "photo", cols: 5, items:
          ["betterave", "brocoli", "carotte-legume", "champignon", "chou",
           "chou-fleur", "concombre", "epinards", "laitue", "mais",
           "oignon", "patate", "poivron", "radis", "tomate"] }
      ],
      dialogue: null
    },
    {
      id: "viandes-cereales", label: "Les viandes et les céréales", render: "vocab", book: 14,
      sections: [
        { title: "Les viandes et substituts", kind: "photo", cols: 5, items:
          ["bacon", "bifteck", "dinde", "jambon", "legumineuses",
           "noix", "oeufs", "poisson", "poulet", "tofu"] },
        { title: "Les produits céréaliers", kind: "photo", cols: 5, items:
          ["bagel", "cereales", "couscous", "gruau", "muffin",
           "pain", "pates", "pitas", "riz", "tortillas"] }
      ],
      dialogue: null
    },
    {
      id: "boissons-desserts", label: "Les boissons et les desserts", render: "vocab", book: 15,
      sections: [
        { title: "Les boissons", kind: "photo", cols: 4, items:
          ["boisson-gazeuse", "boisson-soja", "eau", "jus-orange",
           "jus-raisin", "lait", "lait-chocolat", "limonade"] },
        { title: "Les desserts", kind: "photo", cols: 5, items:
          ["baklava", "beigne", "biscuit", "chocolat", "creme-glacee",
           "gateau", "pouding", "salade-fruits", "sorbet", "tarte"] }
      ],
      dialogue: ["Veux-tu boire de l’eau ou du lait au chocolat?",
                 "De l’eau, s’il te plaît."]
    },
    {
      id: "taches", label: "Les tâches", render: "vocab", book: 16,
      sections: [
        { title: "Les tâches", kind: "phrase", cols: 4, items:
          ["arrose-plantes", "nettoie-litiere", "range-chambre", "lave-vaisselle",
           "lave-linge", "epoussette", "nourrit-chien", "plie-linge",
           "nettoie-plancher", "tond-gazon", "racle-feuilles", "vide-lave-vaisselle",
           "balaie-plancher", "sort-poubelle", "passe-aspirateur", "promene-chien"] }
      ],
      dialogue: ["Quelles tâches fais-tu?",
                 "Je nourris mon chat et j’époussette ma bibliothèque."]
    },
    {
      id: "journee", label: "Les actions de la journée", render: "vocab", book: 17,
      sections: [
        { title: "Les actions de la journée", kind: "phrase", cols: 4, items:
          ["reveille", "salle-bain", "lave-visage", "fait-lit",
           "dejeuner-matin", "brosse-dents", "habille", "va-ecole",
           "met-table", "retourne-maison", "dine", "va-classe",
           "soupe", "devoirs", "douche", "couche"] }
      ],
      dialogue: ["Quelle est la première chose que tu fais le matin?",
                 "Je me réveille!"]
    },
    {
      id: "sentiments", label: "Les sentiments et les sensations", render: "vocab", book: 18,
      sections: [
        { title: "Les sentiments et les sensations", kind: "sentiment", cols: 4, items:
          ["avoir-chaud", "avoir-faim", "avoir-froid", "avoir-hate",
           "avoir-peur", "avoir-raison", "avoir-soif", "avoir-sommeil",
           "amoureux", "content", "fache", "fatigue",
           "heureux", "malade", "timide", "triste"] }
      ],
      dialogue: ["Comment te sens-tu aujourd’hui?",
                 "Aujourd’hui, je me sens amoureux!"]
    },
    {
      id: "sante", label: "Les problèmes de santé", render: "vocab", book: 19,
      sections: [
        { title: "Les problèmes de santé", kind: "sante", cols: 4, items:
          ["coupure", "fievre", "mal-dent", "mal-gorge",
           "mal-tete", "mal-ventre", "nez-bouche", "piqure",
           "rhume", "rhume-foins", "rougeur", "toux"] }
      ],
      dialogue: null
    }
  ];

  /* ======================================================================
     Pages 26 à 45 du balayage (pages 20 à 39 du livre)
     ----------------------------------------------------------------------
     Le décor est identique (fiches blanches à filet vert, bandeau vert) :
     ce qui change, c'est le contenu. Trois stratégies d'illustration se
     partageent ces vingt pages — photos pour ce qui existe et se
     photographie, dessins pour ce qui est un geste ou un lieu, et
     portraits + attribut pour les métiers.
     ====================================================================== */
  var PAGES3 = [
    {
      id: "fetes", label: "Les fêtes", render: "vocab", book: 20,
      sections: [
        { title: "Les fêtes", kind: "photo", cols: 4, items: [
          "action-grace", "aid-al-fitr", "anniversaire", "diwali",
          "fete-canada", "fete-noel", "fete-paques", "halloween",
          "jour-an", "jour-terre", "annee-chinoise", "ramadan",
          "rosh-hashanah", "saint-jean", "saint-patrick", "saint-valentin"
        ] }
      ],
      dialogue: ["Quelle est la date de ton anniversaire?",
                 "Mon anniversaire est le 15 mars."]
    },
    {
      id: "halloween-noel", label: "Halloween et Noël", render: "vocab", book: 21,
      sections: [
        { title: "Halloween", kind: "photo", cols: 4, items: [
          "bonbons-halloween", "citrouille", "deguisement", "fantome",
          "maison-hantee", "masque", "sorciere", "squelette"
        ] },
        { title: "Noël", kind: "photo", cols: 4, items: [
          "cadeaux", "couronne-noel", "guirlande", "lumieres",
          "pere-noel", "renne", "sapin", "traineau"
        ] }
      ],
      dialogue: null
    },
    {
      id: "valentin-paques", label: "Saint-Valentin et Pâques", render: "vocab", book: 22,
      sections: [
        { title: "Saint-Valentin", kind: "photo", cols: 4, items: [
          "amoureux", "bisou", "bouquet", "carte", "chocolat-valentin",
          "coeur", "cupidon", "mot-amour"
        ] },
        { title: "Pâques", kind: "photo", cols: 4, items: [
          "chasse-oeufs", "chocolat-paques", "lapin-paques", "oeuf-paques",
          "paille", "panier", "poussin", "tulipe"
        ] }
      ],
      dialogue: null
    },
    {
      id: "actions-ecole", label: "Les actions à l’école", render: "vocab", book: 23,
      sections: [
        { title: "Les actions à l’école", kind: "action-ecole", cols: 5, items: [
          "s-asseoir", "associer", "se-calmer", "choisir", "colorier",
          "corriger", "decrire", "demander", "dessiner", "ecouter",
          "ecrire", "encercler", "fermer", "se-lever", "lever-main",
          "lire", "observer", "ouvrir", "parler", "partager",
          "ranger", "sortir", "souligner", "surligner", "trouver"
        ] }
      ],
      dialogue: null
    },
    {
      id: "objets-classe", label: "Les objets de la classe", render: "vocab", book: 24,
      sections: [
        { title: "Les objets de la classe", kind: "photo", cols: 5, items: [
          "bureau", "cahier", "chaise", "chemise-classement", "ciseaux",
          "colle", "crayons-couleur", "crayon-plomb", "etui-crayons", "feuille",
          "gomme", "livre", "regle", "ruban-adhesif", "sac-ecole",
          "stylo", "surligneur", "tableau", "tni", "taille-crayon"
        ] }
      ],
      dialogue: ["Qu’est-ce que tu as dans ton sac d’école?",
                 "J’ai un étui à crayons, un cahier et un livre."]
    },
    {
      id: "personne-matieres", label: "Le personnel de l’école", render: "vocab", book: 25,
      sections: [
        { title: "Le personnel de l’école", kind: "personnel", cols: 4, items: [
          "bibliothecaire", "concierge", "orthophoniste", "secretaire",
          "brigadier", "directeur", "enseignant", "infirmiere"
        ] },
        { title: "Les matières", kind: "matiere", cols: 4, items: [
          "anglais", "arts-plastiques", "education-physique", "francais",
          "mathematiques", "musique", "sciences", "univers-social"
        ] }
      ],
      dialogue: null
    },
    {
      id: "ecole-environs", label: "L’école et ses environs", render: "vocab", book: 26,
      sections: [
        { title: "L’école et ses environs", kind: "lieu-ecole", cols: 5, items: [
          "arret-autobus-ecole", "auditorium", "bibliotheque", "bureau-directeur",
          "cafeteria", "casiers", "classe", "corridor", "cour-recre",
          "gymnase", "local-arts", "local-info", "local-musique",
          "secretariat", "toilettes"
        ] }
      ],
      dialogue: null
    },
    {
      id: "sports", label: "Les sports", render: "vocab", book: 27,
      sections: [
        { title: "Les sports", kind: "photo", cols: 4, items: [
          "badminton", "baseball", "basketball", "cyclisme", "football",
          "gymnastique", "hockey", "karate", "natation", "patinage-artistique",
          "planche-neige", "planche-roulettes", "ski", "soccer", "tennis",
          "volleyball"
        ] }
      ],
      dialogue: ["Quel est ton sport préféré?", "J’aime le hockey."]
    },
    {
      id: "passe-temps", label: "Les passe-temps", render: "vocab", book: 28,
      sections: [
        { title: "Les passe-temps", kind: "phrase", cols: 4, items: [
          "collectionner", "cuisiner", "danser", "ecouter-musique",
          "faire-du-sport", "casse-tete", "modele-reduit", "jardiner",
          "jeu-video", "jouer-dehors", "jouer-instrument", "livre",
          "naviguer-internet", "peindre", "photographier", "television"
        ] }
      ],
      dialogue: null
    },
    {
      id: "musique-electronique", label: "La musique et les appareils électroniques",
      render: "vocab", book: 29,
      sections: [
        { title: "Les instruments de musique", kind: "photo", cols: 4, items: [
          "batterie", "flute", "guitare", "piano",
          "saxophone", "trompette", "violon", "xylophone"
        ] },
        { title: "Les appareils électroniques", kind: "photo", cols: 4, items: [
          "cellulaire", "console-jeu", "ecouteurs", "imprimante",
          "ordinateur", "portable", "tablette", "television"
        ] }
      ],
      // Cette page est la seule du livre à avoir trois répliques : la boîte
      // de dialogue accepte un nombre quelconque de bulles.
      dialogue: ["As-tu une tablette numérique?",
                 "Non, je n’en ai pas.",
                 "Oui, j’en ai une. Et toi?"]
    },
    {
      id: "metiers", label: "Les métiers", render: "vocab", book: 30,
      sections: [
        { title: "Les métiers", kind: "metier", cols: 5, items: [
          "architecte", "acteur", "agriculteur", "chauffeur-autobus",
          "chauffeur-taxi", "coiffeur", "cuisinier", "dentiste",
          "dessinateur", "facteur", "ingenieur", "mecanicien", "medecin",
          "ouvrier-batiment", "pilote", "policier", "pompier", "serveur",
          "vendeur", "veterinaire"
        ] }
      ],
      dialogue: null
    },
    {
      id: "transports", label: "Les moyens de transport", render: "vocab", book: 31,
      sections: [
        { title: "Les moyens de transport", kind: "photo", cols: 5, items: [
          "ambulance", "auto", "autobus", "auto-patrouille", "avion-transport",
          "bateau-transport", "bicyclette", "camion", "camion-pompiers",
          "fourgonnette", "fusee", "helicoptere-transport", "limousine",
          "metro", "motocyclette", "taxi", "tracteur", "train-transport",
          "traversier", "trottinette"
        ] }
      ],
      dialogue: null
    },
    {
      id: "animaux-domestiques", label: "Les animaux domestiques", render: "vocab", book: 32,
      sections: [
        { title: "Les animaux domestiques", kind: "photo", cols: 4, items: [
          "chat", "chien", "cochon-inde", "furet", "hamster", "lapin",
          "lezard", "oiseau-domestique", "poisson-domestique",
          "serpent-domestique", "souris-domestique", "tortue-domestique"
        ] },
        { title: "Les animaux de la ferme", kind: "photo", cols: 4, items: [
          "ane", "canard", "cheval", "chevre", "cochon", "mouton",
          "poule", "vache"
        ] }
      ],
      dialogue: ["Quel est ton animal préféré?",
                 "Mon animal préféré est le chat."]
    },
    {
      id: "animaux-sauvages", label: "Les animaux sauvages", render: "vocab", book: 33,
      sections: [
        { title: "Les animaux sauvages", kind: "photo", cols: 5, items: [
          "castor", "chameau", "chevreuil", "elephant-sauvage",
          "girafe-sauvage", "gorille-sauvage", "grenouille", "hibou-sauvage",
          "hippopotame", "kangourou-sauvage", "koala-sauvage", "lion-sauvage",
          "loup", "manchot", "oie", "original", "ours", "panda", "phoque",
          "porc-epic", "raton-laveur", "renard", "singe", "tigre",
          "zebra-sauvage"
        ] }
      ],
      dialogue: ["Qu’est-ce que c’est?", "C’est une grenouille verte."]
    },
    {
      id: "insectes-aquatiques", label: "Les insectes et les animaux aquatiques",
      render: "vocab", book: 34,
      sections: [
        { title: "Les insectes", kind: "photo", cols: 5, items: [
          "abeille", "chenille", "coccinelle", "coquerelle", "fourmi-insecte",
          "guêpe", "libellule", "luciole", "mante-religieuse", "mille-pattes",
          "mouche", "moustique", "papillon", "sauterelle", "scarabée"
        ] },
        { title: "Les animaux aquatiques", kind: "photo", cols: 4, items: [
          "anguille", "baleine", "crabe", "crevette", "dauphin", "écrevisse",
          "épaulard", "etoile-mer", "hippocampe", "homard", "pieuvre", "requin"
        ] }
      ],
      dialogue: null
    },
    {
      id: "lieux-ville", label: "Les différents lieux dans la ville", render: "vocab", book: 35,
      sections: [
        { title: "Les différents lieux dans la ville", kind: "photo", cols: 5, items: [
          "aeroport", "arret-autobus", "banque", "boulangerie", "boutique",
          "bureau-poste", "caserne-pompiers", "centre-commercial", "cinema",
          "depanneur", "ecole-ville", "epicerie", "garage", "gare-train",
          "hopital", "hotel", "librairie", "maison-ville", "musee", "parc",
          "pharmacie", "poste-police", "restaurant", "station-essence",
          "terrain-jeux"
        ] }
      ],
      dialogue: null
    },
    {
      id: "position-mouvement", label: "Des mots pour situer et se déplacer",
      render: "vocab", book: 36,
      sections: [
        { title: "Des mots pour situer différents endroits", kind: "position", cols: 4,
          items: [
            "dans", "sur", "en-dessous", "au-dessus",
            "devant", "derriere", "a-cote", "entre",
            "dessus", "milieu", "dessous",
            "gauche", "centre", "droite"
          ] },
        { title: "Des mots pour décrire le mouvement", kind: "mouvement", cols: 4,
          items: [
            "en-haut", "en-bas", "sortir", "entrer",
            "aller-vers", "s-eloigner", "a-travers", "autour"
          ] }
      ],
      dialogue: null
    },
    {
      id: "maison", label: "La maison", render: "vocab", book: 37,
      sections: [
        { title: "Les pièces de la maison", kind: "photo", cols: 4, items: [
          "bureau-maison", "chambre", "cuisine", "garage-maison",
          "salle-manger", "salle-bain-piece", "salon", "sous-sol"
        ] },
        { title: "Les objets de la maison", kind: "photo", cols: 5, items: [
          "bain", "commode", "cuisiniere", "divan", "etagere", "fenetre",
          "grille-pain", "lampe", "lave-vaisselle-objet", "lit", "micro-ondes",
          "miroir", "refrigerateur", "table", "toilette"
        ] }
      ],
      dialogue: ["Où est ton ordinateur?", "Il est sur ma table."]
    },
    {
      id: "pays", label: "Les pays", render: "vocab", book: 38,
      sections: [
        { title: "Le Canada", kind: "photo", cols: 2, items: ["carte-canada"] },
        { title: "Quelques pays", kind: "photo", cols: 4, items: [
          "pays-allemagne", "pays-angleterre", "pays-argentine", "pays-bresil",
          "pays-chine", "pays-espagne", "pays-etats-unis", "pays-france",
          "pays-italie", "pays-japon", "pays-mexique", "pays-russie"
        ] }
      ],
      dialogue: null
    },
    {
      id: "temps", label: "Le temps", render: "vocab", book: 39,
      sections: [
        { title: "Les moments de la journée", kind: "temps", cols: 4, items: [
          "matin", "apres-midi", "soir", "nuit"
        ] },
        { title: "Les moments de la semaine", kind: "temps", cols: 3, items: [
          "hier", "aujourdhui", "demain"
        ] },
        { title: "Les jours de la semaine", kind: "jour-semaine", cols: 7, items: [
          "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi",
          "dimanche"
        ] },
        { title: "Les mois de l’année", kind: "photo", cols: 4, items: [
          "mois-janvier", "mois-fevrier", "mois-mars", "mois-avril",
          "mois-mai", "mois-juin", "mois-juillet", "mois-aout",
          "mois-septembre", "mois-octobre", "mois-novembre", "mois-decembre"
        ] }
      ],
      dialogue: null
    }
  ];

  /* --- Les pages du lecteur ---------------------------------------------- */
  var PAGES = [
    { id: "couverture", label: "Couverture", render: "cover" },
    { id: "divertissement", label: "Intercalaire", render: "divider" },
    { id: "titre", label: "Page de titre", render: "title" },
    { id: "credits", label: "Crédits", render: "credits" },
    { id: "bonjour", label: "Bonjour !", render: "bonjour" },
    { id: "fruits", label: "Au déjeuner", render: "fruits" },
    { id: "vocabulaire", label: "Le vocabulaire", render: "vocab" },
    { id: "alphabet-an", label: "L’alphabet A–N", render: "alphabet", range: [0, 14] },
    { id: "alphabet-oz", label: "L’alphabet O–Z", render: "alphabet2", range: [14, 26] },
    { id: "nombres", label: "Les nombres", render: "numbers" }
  ].concat(PAGES2).concat(PAGES3);

  /* --- Correspondance page du livre → page du lecteur ------------------- */
  // Permet de cliquer un thème de l'index pour tomber sur la bonne page.
  //
  // Cette table ne doit surtout pas être écrite à la main : elle était
  // décalée d'une page sur toute sa longueur, parce qu'on avait compté le
  // décalage PDF (page du livre + 6) au lieu du décalage lecteur
  // (page du livre + 5). On la déduit donc des pages elles-mêmes : une
  // entrée existe dès qu'une page porte le numéro voulu.
  var PAGE_MAP = (function () {
    var map = {}, i, p;
    for (i = 0; i < PAGES.length; i++) {
      p = PAGES[i];
      if (p.book != null && map[p.book] === undefined) map[p.book] = i;
    }
    // L'alphabet et les nombres ne sont pas des pages de vocabulaire : ils
    // n'ont pas de numéro de livre, on les désigne par leur identifiant.
    map[2] = indexOfId("alphabet-an");
    map[4] = indexOfId("nombres");
    return map;
    function indexOfId(id) {
      for (var j = 0; j < PAGES.length; j++) if (PAGES[j].id === id) return j;
      return undefined;
    }
  })();

  global.BOOK = {
    alphabet: ALPHABET,
    vocabulaire: VOCABULAIRE,
    nombres: NOMBRES,
    argent: ARGENT,
    dialogue: DIALOGUE,
    credits: CREDITS,
    remerciements: REMERCIEMENTS,
    pages: PAGES,
    pageMots: PAGE_MOTS,
    pageMap: PAGE_MAP,
    meta: {
      title: "Le français en images",
      author: "Jean-François Brochet",
      adaptation: "Une adaptation de Suzanne Lemay",
      publisher: "Les Éditions CEC",
      isbn: "978-2-7617-7972-2",
      year: "2015",
      place: "Anjou (Québec)",
      subjects: ["Vocabulaire", "Grammaire", "Communication", "Stratégies"]
    }
  };
})(window);
