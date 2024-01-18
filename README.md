# Projet DSL MIDI

Ce projet fournit un DSL (Domain Specific Language) pour la création et la manipulation de fichiers MIDI. Il permet aux utilisateurs de générer des fichiers MIDI et JSON à partir de fichiers MML (Music Macro Language), et d'écouter les résultats via un serveur web.

## Installation

### Prérequis

- Node.js (version 18.4.0 minimum)
- Système d'exploitation Linux (ou windows, mais il vous faudra executer le contenu des scripts manuellement, essayer WSL si vous êtes sur Windows)

### Initialisation

Clonez le projet en utilisant la commande suivante :

```bash
git clone https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation
```
Après le clonage, exécutez la commande suivante pour préparer l'environnement :

```bash
sh prepare.sh
```

### Utilisation
Pour lancer le programme, utilisez la commande suivante :

```bash
sh run.sh "path/to/mml/file.mml" [-d="path/to/destination"] [-j] [-w] [-mt]
```

Options disponibles :

- `-d` ou `--destination` : Spécifie le dossier de destination des fichiers générés (par défaut, /generated dans le projet).
- `j` ou `--json` : Génère un fichier JSON à partir du fichier MML.
- `-w` ou `--web` : Ouvre un serveur web pour écouter les fichiers avec des soundfonts valides.
- `-mt` ou `--multi-track` : Affiche les différentes pistes dans le serveur web.

### Exemples
Génération de "Moonlight Sonata" avec sortie JSON et serveur web :
```bash
sh run.sh samples/moonlight_sonata.mml -j -w
```

Génération de "Billie Jean" avec sortie JSON, serveur web et pistes multiples :
```bash
sh run.sh samples/billie_jean.mml -j -w -mt
```

## Documentation

Le langage MusicML permet de définir une suite d'instructions interprétées par le programme pour générer un fichier MIDI. Il offre également la possibilité de générer un fichier JSON contenant les détails du fichier MIDI, ce qui est utile pour le débogage.

### Syntaxe
#### Définition du Nom
Définissez le nom de la composition en utilisant des guillemets pour intégrer des espaces :
```
name "nom de la composition"
```
#### Choix de la Notation
Spécifiez la notation musicale (latin, english ou german) :
```
notation english
```
#### Création de Patterns
Enregistrez des patterns réutilisables dans la composition :
```
pattern identifiant {
    // instructions de musique
}
```
Pour connaître les instructions de musique disponibles, [cliquez ici](#instructions-de-musique).
#### Éléments de la Composition
Définissez les éléments structurant la composition comme le tempo, la signature rythmique, et les pistes.
##### Tempo
Définissez le tempo global de la composition :
```
tempo 120
```
##### Signature
Spécifiez la signature rythmique de la composition :
```
signature 4/4
```
##### Piste Musicale (Track)
Définissez une piste musicale avec des informations telles que l'instrument ([liste des instruments](#instruments)), le canal MIDI, et des éléments spécifiques à la piste :
```
track {
    instrument acoustic_grand_piano
    channel? 1
    pattern test {
        // instructions de musique
    }
    tempo 50
    signature 3/4
    // Autres éléments de la piste
}
```
#### Elements de piste
##### Invocation de Pattern
Invoquez un pattern en spécifiant sa fréquence de répétition et son identifiant :
```
play 1 nom_du_pattern
```
##### Tempo de la Piste
Même fonctionnement que le [tempo global](#tempo)
##### Signature Rythmique de la Piste
Même fonctionnement que la [signature globale](#signature)
##### Instructions de Musique
Les instructions de musique sont des éléments qui peuvent être joués par le programme. Ils peuvent être combinés pour créer des mélodies et des rythmes.
Exemple:
```
A3et F#4et] B3et D#4et |ts
```
###### Notes
###### Attentes
###### Note de Batterie