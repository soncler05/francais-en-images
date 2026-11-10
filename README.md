# Le français en images — les 45 premières pages

Les quarante-cinq premières pages de *Le français en images* de **Jean‑François
Brochet** (une adaptation de Suzanne Lemay, Les Éditions CEC, 2015) reprises
dans un lecteur web, avec des illustrations recentifiées et nettement plus
définies que celles du livre imprimé.

```
index.html              le lecteur
assets/css/style.css    la mise en page
assets/js/data.js       le texte des 45 pages (transcrit du livre)
assets/js/app.js        le rendu, la navigation, la recherche
assets/js/art.js        mascottes, pièces, billets, soleil
assets/js/art2.js       moteur de visage (famille + sentiments)
assets/js/art3.js       couleurs, formes, motifs, cheveux
assets/js/art4.js       corps, contraires, santé
assets/js/art5.js       50 vêtements et accessoires
assets/js/art6.js       10 scènes d'action (tâches, journée)
assets/js/art7.js       l'école : 25 actions, personnel, matières, lieux
assets/js/art8.js       métiers, position, mouvement, temps
assets/js/images.js     les crédits des photographies (généré)
assets/img/             photographies Wikimedia Commons
tools/                  outillage : acquisition, contrôles, planches, tests
```

## Lancer le lecteur

Aucune dépendance, aucune étape de compilation : il suffit d'ouvrir
`index.html`. Le site fonctionne aussi bien depuis `file://` que derrière un
serveur, parce que les données sont en JavaScript plutôt que chargées en `fetch`.

```bash
python tools/serve.py 8765     # http://localhost:8765, sans cache
```

## Ce qui a changé par rapport au livre

Le fac-similé est un balayage de 2015 : **86 pages, une image par page, aucune
couche de texte, 1200 × 1500 px**. Tout a donc été retranscrit à la main, et les
illustrations ont été remplacées.

Depuis, 147 cartes concrètes dessinées en SVG sont devenues des photographies
Wikimedia Commons, revues à l'œil une par une : vêtements, accessoires et
chaussures, métiers, lieux et personnel de l'école, actions à l'école, famille,
sentiments, santé et tâches. Les 19 cartes sans photo claire (un sous-vêtement,
14 gestes et 4 sentiments ou symptômes) restent en dessin, comme les schémas
abstraits — couleurs, formes, motifs, coiffures, contraires, position,
mouvement, temps, jours, corps, argent et mascottes.

Le décor change deux fois :

| Pages | Décor | Sections |
|---|---|---|
| 1 à 10 | fiches blanches à filet vert | couverture, alphabet, nombres |
| 11 à 45 | fond orange texturé, bandeaux verts, « Boîte de dialogue » | famille, corps, vêtements, couleurs, sentiments, santé, fêtes, école, sports, métiers, transports, animaux, lieux, maison, pays, temps |

**Le texte, la structure et la pédagogie d'origine sont conservés** : mêmes
mots, mêmes sous-rubriques, mêmes numéros de page dans l'index, mêmes dialogues,
et le pied de page garde le numéro en toutes lettres (`37 trente-sept`).

L'index du vocabulaire devient cliquable : **65 des 73 thèmes** mènent
directement à la bonne page du lecteur.

### Trois façons d'illustrer, selon la nature du mot

La question n'est pas « quelle image est la plus jolie » mais « qu'est-ce qui
se prête à une image, et qu'est-ce qui ne se prête pas ». La revue à l'œil a
montré que la frontière ne tombe pas du bon côté : **une image trompeuse coûte
plus cher qu'un dessin**.

* **Photographies** pour le réel et le figuratif : l'alphabet, les aliments, les
  vêtements, les fêtes, les sports, les instruments, les véhicules, les
  animaux, les lieux, le mobilier, les drapeaux.
* **Dessins vectoriels** pour ce qui est un geste ou un lieu, et pour ce que la
  photo ne peut pas dire. Deux raisons, souvent combinées : Commons n'a pas
  l'image, ou l'image existe mais ne veut rien dire.
* **Ni photo, ni dessin générique** pour les personnes et pour l'abstrait :
  portraits paramétriques, professions en silhouette + attribut, et schémas
  pour la position et le mouvement.

| Fichier | Contenu |
|---|---|
| `art.js` | mascottes, pièces et billets canadiens, soleil |
| `art2.js` | moteur de visage paramétrique (famille + sentiments) |
| `art3.js` | couleurs, formes, motifs, coiffures |
| `art4.js` | schéma du corps, contraires, pictogrammes de santé |
| `art5.js` | 50 vêtements, accessoires et chaussures |
| `art6.js` | 10 scènes d'action (tâches, journée) |
| `art7.js` | 25 actions à l'école, 8 membres du personnel, 8 matières, 15 lieux |
| `art8.js` | 20 métiers, 14 mots de position, 8 de mouvement, 7 moments, 7 jours |

Le lecteur **mélange** les deux dans une même section quand c'est nécessaire :
« Les tâches » associe des photos (arroser les plantes, promener le chien) et
des dessins (passer l'aspirateur, plier le linge).

Les illustrations originales de l'édition 2015 (Frédéric et Patrick Bizier)
sont des œuvres protégées : elles ne sont pas reproduites ici.

### Ce que les vingt dernières pages ont appris

Les pages 20 à 39 (fêtes, école, sports, métiers, transports, animaux, lieux,
maison, pays, temps) ont fait tomber deux idées qu'on croyait acquises.

**Le sport est un mauvais sujet pour la recherche en texte libre.** Huit photos
sur seize ne montraient pas le sport : « le volleyball » donnait trois hommes en
costume à l'aéroport, « le cyclisme » des coureurs à pied, « le tennis » une
boîte en fer-blanc, « le soccer » un practice green de golf. La cause n'est pas
Commons, qui est plein de sport : c'est qu'une requête comme *« player racket
shuttlecock »* accepte un fichier dont le titre contient « player » sans exiger
que le sport y soit nommé. **La requête doit nommer le sport, pas seulement ses
accessoires.**

**Les concepts abstraits n'ont pas de photographie, seulement des
coïncidences.** « le bisou » était un rocher du canyon du Colorado ; « le cœur »
un générique de YouTube ; « le cupidon » un masque de pierre aztèque ; « la
commode » un parc public avec un monument ; « la fête du Canada » un chef de
police portant un drapeau. Ces mots-là demandent soit une épingle patiente, soit
un dessin.

Les drapeaux montrent l'autre face : douze fichiers vectoriels canoniques
(`Flag of Japan.svg` et compagnie) remplacent douze photos de drapeaux
perdus dans la foule — un drapeau peint sur une pelouse, une foule de supporters
brésiliens, une photo de 1930 en noir et blanc. Commons rasterise le vectoriel
à la demande, et le livre montrait de toute façon des drapeaux à plat.

## Le lecteur

* **← →** ou **Espace** pour tourner les pages, **Début**/**Fin** pour les
  extrémités, **G** pour les vignettes, **C** pour les crédits, **Échap** pour
  fermer.
* **Clic** sur une photographie pour l'agrandir ; la visionneuse donne l'auteur,
  la licence, la résolution originale et la page Commons.
* **Recherche** dans l'index des thèmes.
* **Schéma du corps** : cliquer un mot le met en évidence sur le schéma.
* Balayage latéral sur écran tactile. Lien profond : `index.html#38`.

## Régénérer les images

Les photographies sont choisies automatiquement, puis **revues à l'œil** : les
mots où le choix automatique se trompe sont épinglés à la main.

```bash
pip install requests Pillow PyMuPDF
python tools/fetch_images.py        # recherche + téléchargement (reprend où il s'est arrêté)
python tools/fetch_images.py --force # tout retélécharger
python tools/completer.py           # reprend les épingles que le CDN a refusées
python tools/fix_dims.py            # enregistre la taille réelle de chaque fichier
python tools\build_images_js.py     # régénère assets/js/images.js
python tools/png_vers_jpeg.py       # convertit les PNG photographiques
python tools/optimize_images.py     # recompresse les JPEG trop lourds
python tools/prune_images.py        # efface les photos devenues inutiles
```

### Les planches de revue

C'est l'étape qui change tout. Aucun classement automatique ne remplace un
regard : sur les vingt dernières pages, **une photo sur quatre** ne montrait pas
le mot annoncé. Le pipeline produit une planche par section.

```bash
python tools/sheets.py              # photographies, une planche par section
python tools/svg_sheet.py           # dessins, une planche par module
powershell -File tools/shoot_sheet.ps1 art7   # …puis capture de la planche
```

On regarde la planche, on note les identifiants à épingler, on relance
`fetch_images.py`. C'est ainsi qu'on a débusqué un lézard pour *un
kangourou*, un bracelet serpent pour *un serpent*, et trois hommes en costume
pour *un volleyball*.

### Pourquoi les catégories Commons

La recherche en texte libre est très efficace sur un mot rare
(« dinosaure » → squelette) et trompeuse sur un mot courant. Pour « bermuda »
elle renvoyait un tableau de Caraïbes, pour « tee-shirt » une capture de code.
Pour la mode et les accessoires on parcourt donc directement les catégories
(`lexique2.CATEGORIES`), beaucoup plus fiables, et le choix texte n'est plus
qu'un repli.

Le reste du classement — résolution, cadrage, **date** — fait pencher vers des
images récentes. La pertinence reste un filtre : un fichier dont le titre ne
contient aucun mot-clé attendu est éliminé.

Un second garde-fou épingle à la main ce qui reste trompeur. Il y en a
**88**, répartis sur trois lexiques :

```python
PICK3 = {
    "volleyball": "File:Serve during volleyball match 4.jpg",
    # sans ce garde-fou, la recherche renvoie trois hommes à l'aéroport
}
```

`python tools/chercher.py "shamrock"` aide à trouver le fichier à épingler.

> **Attention :** une clé en double dans `PICK` écrase silencieusement la
> précédente, et un identifiant défini dans deux lexiques fait que le premier
> est ignoré sans rien dire. `python tools/check_pins.py` détecte les deux.

### Quand Commons refuse

Le CDN des vignettes renvoie des 429 sans distinction, et la limite est **par
session**, pas par fichier : après quatre cents images, plus rien ne passe en
1000 px. Deux contournements :

* **descendre l'échelle.** Une même vignette peut répondre 429 en 1000 px et 200
  en 500 px. `tools/completer.py` essaie 1000 → 400 px ; 500 px de large
  suffisent largement à une fiche de vocabulaire affichée à 200 px.
* **changer de fichier.** Si une image reste refusée, la throttling suit
  l'URL : épingler un autre fichier du même sujet suffit.

## Contrôler

```bash
python tools/check_pages.py         # chaque mot des pages 20-39 a son média
python tools/check_assets.py        # chaque fichier existe, licence plausible
python tools/check_pins.py          # pas de clé dupliquée, pas de pin inutile
python tools/check_pins_fichiers.py # chaque épingle pointe vers un fichier réel
python tools/run_tests.py           # la suite complète, dans un vrai navigateur
```

`run_tests.py` pilote Edge en mode headless (`--dump-dom`) et lit le tableau
de `tools/test.html` : **36 vérifications** — rendu des 45 pages, absence de
fiche vide, index cliquable au bon endroit, alphabet, visionneuse, clavier,
ancrages, vignettes, crédits, recherche, schéma du corps, contraires, avatars,
débordement horizontal, dessins des pages nouvelles, et **chargement effectif
de chaque photo**. Cette dernière vérifie `naturalWidth` : un `<img>` présent
dans le DOM peut pointer un fichier introuvable, et seule une vraie lecture
dans un navigateur s'en aperçoit.

`tools/shoot.ps1` capture les pages avec Edge en mode headless, ce qui permet
de vérifier le rendu sans navigateur interactif. Il ajoute `?photos=toutes` à
l'URL : sans cela, le chargement paresseux des vignettes fait qu'Edge — qui ne
fait pas défiler la page — ne dessine que la première rangée.

### Les chiffres

| | |
|---|---|
| pages du lecteur | 45 |
| mots illustrés | 393 sur les 20 nouvelles pages (281 photos, 112 dessins) |
| photographies | 591, toutes libres, 77 Mo |
| épingles à la main | 249 |
| licences | CC BY / CC BY-SA / CC0 / domaine public — aucune photo sous licence incompatible |

## Limites

* Les pages 40 à 86 ne sont pas reprises ; l'index va jusqu'à la page 42, dont
  les trois dernières pages manquent encore.
* Le vocabulaire est celui de 2017, à jour de l'édition 2015. L'index a été
  reconduit tel quel, sans mise à jour.
* Les photographies montrent des personnes réelles. Elles sont choisies pour
  leur licence et leur lisibilité, pas pour le modèle qu'elles représentent.
* Les dessins de sentiments, de santé et de métiers sont des caricatures
  pédagogiques : « être malade » ne prétend pas décrire un état clinique.
* La mise en page diffère du livre imprimé : c'est une lecture sur écran, pas
  une reproduction à l'identique.