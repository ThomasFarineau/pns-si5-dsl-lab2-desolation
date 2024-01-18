


# Langage Spécifique à un Domaine
## Livraison de projet
Le projet concerne la deuxième livraison du cours DSL. Il comprendra la mise en œuvre d'un DSL axé sur la spécification de tablatures pour au moins une batterie, dans un DSL interne ou externe.    
Les livraisons sont attendues par email (à Julien Deantoni : prenom.nom@univ-cotedazur.fr, avec [DSL] comme préfixe d'objet) suivi de « Groupe X » où X est le numéro de votre groupe. La livraison est attendue avant le 21 janvier 2024 22h00 heure de Paris. La livraison doit se faire sous forme de rapport PDF (veuillez faire en sorte que votre rapport soit succinct et rigoureux).    
Le rapport doit contenir :
- le nom des membres de votre équipe
- un lien vers le code de votre DSL (typiquement un lien vers le dépôt de votre code)
- une description du langage proposé :
    - le modèle de domaine représenté sous forme de diagramme de classes ;
    - la syntaxe concrète représentée sous une forme semblable à BNF ;
    - une description de votre langage et de sa mise en œuvre ;
- un ensemble de scénarios pertinents mis en œuvre en utilisant votre/vos langage(s) (interne ou externe) ;
- une analyse critique de (i) la mise en œuvre du DSL par rapport au cas d'utilisation MusicML et (ii) de la technologie choisie pour y parvenir ;
- la responsabilité de chaque membre dans le groupe par rapport au projet livré.

## Objectifs : Définir le langage MusicML
Votre objectif ici est de définir un DSL permettant la description d'une pièce musicale, que nous considérons comme un ensemble de pistes évoluant dans le temps. Une piste est définie comme une séquence de notes contrainte par le temps. Le temps est défini par des signatures temporelles, il est « organisé » par une séquence (potentiellement infinie) de mesures. Une mesure est divisée par une séquence de n battements. À son tour, chaque battement est subdivisé en un nombre de tics. Ce nombre de tics par battement définit la résolution d'une piste. Les valeurs courantes pour la résolution sont un quart ou un tiers de battement. Une position dans le temps est donc définie par un tuple (mesure, battement, tic). Les notes ont une position dans le temps, une valeur et une durée. Les valeurs possibles pour une note sont connues dans les pays latins comme do, do#, re, re# mi, fa, fa#, sol, sol#, la, la# si (les mêmes notes sont appelées C, C#, D, D# E, F, F#, G, G#, A, A#, B dans les pays anglophones). La durée d'une note est exprimée en nombre de tics. Le temps logique défini ci-dessus est augmenté par la notion de tempo qui définit sa projection dans le temps physique. Le tempo est le nombre de battements par minute (BPM).    
Les pistes de batterie sont un peu spécifiques : Une batterie est un instrument de musique composé de différents éléments, chacun produisant un timbre spécifique. Ces éléments sont connus sous les noms de :
- grosse caisse ou bass drum (bd),
- caisse claire (sd),
- charleston fermé (ch),
- charleston ouvert (oh),
- cymbale crash (cc)
- cymbale ride (rc).    
  Dans ce projet, tout comme dans le [MIDI](https://fr.wikipedia.org/wiki/Musical_Instrument_Digital_Interface) (qui est la norme de facto pour le codage de la musique numérique "basée sur des événements"), chaque élément de la batterie est assigné à une note spécifique. Consultez cette fiche technique pour l'attribution d'un ensemble de percussions complet : https://drummagazine.com/drum-notation-guide-2/.    
  À partir de vos programmes dans le langage MusicML, vous générerez du code exécutable. Le langage cible et la bibliothèque utilisée sont de votre choix, mais il est requis d'utiliser MIDI.    
  En MIDI, vous avez accès à plusieurs instruments (appelés programmes) qui peuvent être assignés à des canaux. Une chanson (ou séquence) se compose de 16 canaux distincts. Les canaux jouent simultanément, permettant ainsi des séquences multi-pistes. Les batteries sont généralement assignées au canal 10. Dans le canal de batterie (dans le canal auquel un son de batterie est assigné), les notes déclenchent des éléments de batterie, comme indiqué par le mappage suivant : https://en.wikipedia.org/wiki/File:GMStandardDrumMap.gif, ou ici : https://www.midi.org/specifications-old/item/gm-level-1-sound-set).
### Prise en charge d'autres instruments
_pas une option après discussion avec l'Expert du Domaine, désolé_ Midi prend en charge d'autres instruments (https://www.zikinf.com/articles/mao/tablemidi.php). Il peut être intéressant de fournir un support pour d'autres instruments, jouant en même temps que la batterie. Dans ce cas, vous devriez permettre la description des différentes barres parallèles mais aussi la durée des notes, ce qui ne tient pas pour la batterie ; voir ici pour un exemple de durée de note : https://www.songsterr.com/a/wsa/michael-jackson-billie-jean-tab-s10586t4.
## Scénario de base
1. Billie Jean, Mickael Jackson https://youtu.be/V29FNfECL9k : dans cet exemple, nous considérerons également uniquement le début de la chanson - les 34 premières mesures jusqu'à l'arrivée du refrain. Le motif de la batterie utilise 3 éléments : charleston fermé, caisse claire et grosse caisse. Il répète régulièrement 4 battements formant une seule mesure. La grosse caisse est jouée à chaque deux battements (c'est-à-dire au battement 1 et 3). La caisse claire souligne les battements 2 et 4, et le charleston martèle chaque noire. La basse ne joue que des croches. https://www.songsterr.com/a/wsa/michael-jackson-billie-jean-drum-tab-s10586t1    
   Le DSL devrait permettre à l'utilisateur de décrire chaque variation de cette chanson, y compris le remplissage de batterie introduisant le refrain, et les remplissages de tom-tom qui augmentent le motif dans le couplet après le refrain.

2. Love Is All : Dans cet exemple, vous trouverez deux signatures temporelles différentes. Alors que la plupart de la chanson est en 4/4 ; il y a un pont qui se déroule en 3/4, avec un tempo qui monte plusieurs fois à différents endroits.    
   La tablature peut être trouvée ici : https://www.songsterr.com/a/wsa/roger-glover-love-is-all-drum-tab-s52270. Le DSL devrait permettre la spécification et la génération de code pour de tels cas.


## Parties Communes
Les éléments suivants doivent être disponibles dans votre DSL :
- Syntaxe abstraite : La syntaxe abstraite doit être clairement identifiée dans le code livré.
- Syntaxe concrète : La syntaxe concrète (externe ou intégrée) doit être clairement identifiée et utilisée par un ensemble pertinent de scénarios. La syntaxe doit tirer parti de l'outil choisi pour sa mise en œuvre afin de la rendre claire et facile à utiliser.
- Validation : Soutenez votre utilisateur final en vérifiant qu'un modèle est réalisable sur la plateforme attendue. Par exemple, choix des instruments, tempo, etc.
- Génération de code : Fournissez un générateur produisant du code midi clé en main, jouant le rythme. Ce code peut être directement compilé (si nécessaire) et joué. Le langage cible est votre choix mais il est requis d'utiliser l'Interface Numérique pour Instrument de Musique (https://fr.wikipedia.org/wiki/Musical_Instrument_Digital_Interface).
- Addon DSL pour l'Acceptation des Utilisateurs : L'acceptation d'un langage par les utilisateurs n'est généralement pas due uniquement au langage lui-même, mais aussi aux services supplémentaires fournis par les langages. Ces services peuvent être liés au langage lui-même (comme le borrowchecker en Rust) ou utilisés ici pour aider l'utilisateur dans la définition de ses programmes (comme par exemple une représentation graphique du flux de contrôle ou une localisation d'erreur très précise et didactique). Vous fournirez au moins un service supplémentaire pour le DSL MusicML.


## Fonctionnalités "À la carte"
Le reste de ce document décrit certaines extensions que vous pouvez implémenter en complément de votre  
langage. Chaque extension est définie par une courte description et au moins un scénario d'acceptation.  
Choisissez (au moins) une fonctionnalité à introduire dans votre projet.

### Prise en charge des modifications de mesure
Il arrive souvent que certaines mesures soient des variations d'une mesure précédemment définie. Il est donc intéressant  
de permettre à l'utilisateur de définir une mesure basée sur une précédente. Il pourrait par exemple spécifier que la nouvelle mesure est égale à la mesure #n mais avec un charleston ouvert au battement #3 au lieu d'un charleston fermé. Dans cette extension, envisagez différents types de manipulations comme l'ajout de nouvelles notes, remplacements, suppression, etc.

~~### Prise en charge des erreurs humaines  
Certains batteurs sont connus pour avoir de petites erreurs de timing spécifiques qui rendent la musique plus agréable. Au lieu d'essayer de vous l'expliquer, il vaut mieux lire ceci : https://news.harvard.edu/gazette/story/2012/07/when-the-beat-goes-off/ ou ceci : https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0026457. Choisir cette extension signifie fournir un moyen à votre utilisateur de caractériser l'erreur et de l'injecter dans le code généré.~~

### Prise en charge de l'entrée interactive de l'utilisateur
En choisissant cette extension, vous permettez à votre utilisateur de définir une correspondance entre une entrée au clavier et une note d'un instrument spécifique. Lorsque le programme résultant est joué, l'utilisateur peut jouer sur le clavier,  
conjointement avec la musique telle que définie dans son programme.

~~### Prise en charge des sons définis par l'utilisateur  
Il existe deux façons de faire de la musique en Java : l'API Midi et l'API Audio (c'est généralement la même chose pour les autres langues).  
Le Midi est basé sur une banque de sons, étant une collection d'instruments définis dans un soundFont (https://en.wikipedia.org/wiki/SoundFont). L'audio est basé sur la lecture possiblement parallèle de certains fichiers wav. Il est  alors possible de jouer n'importe quel type de sons de sorte qu'un utilisateur pourrait créer ses propres échantillons sonores et créer des tablatures à partir d'eux.  
En choisissant cette extension, vous permettez à l'utilisateur d'importer ses propres échantillons, de les modifier (ajouter du silence, concaténer, couper, etc). Il doit également être possible pour l'utilisateur d'utiliser ses échantillons de la manière la plus appropriée pour créer son propre mix d'échantillons. Notez que cette extension peut être utilisée en parallèle avec la partie MIDI précédemment définie.~~