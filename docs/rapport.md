---
  geometry: margin=2cm
---
\newpage 
\vspace*{\fill}
\begin{center}
\Huge MusicML\\[0.5em]
\Large Rapport de projet - Domain Specific Language\\[2em]
\LARGE \textbf{Groupe Désolation} \\[0.5em]
\Large \textbf{21/01/2024} \\[5em]
\large \href{https://github.com/ThomasFarineau/}{Thomas FARINEAU} \\[0.5em]
\large \href{https://github.com/LeoKitabdjian}{Léo KITABADJIAN} \\[0.5em]
\large \href{https://github.com/Ludovic-BAILET}{Ludovic BAILET} \\[0.5em]
\large \href{https://github.com/Yaplupile}{Mohamed MAHJOUB} \\[5em]
\normalsize https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation
\end{center}
\vspace*{\fill} 
\newpage

# Table des matières

1. [Introduction](#introduction)
2. [Description du langage](#description-du-langage)
   1. [Modèle de domaine](#modèle-de-domaine)
   2. [Syntaxe concrète sous forme BNF](#syntaxe-concrète-sous-forme-bnf)
   3. [Description du langage](#description-du-langage-1)
      - [Mise en oeuvre](#mise-en-oeuvre)
3. Scénarios mis en œuvre
   1. Faut
   2. Trouver
   3. Des
   4. Scénarios
4. Analyse critique
   1. Mise en œuvre du DSL par rapport au cas d'utilisation MusicML
   2. Technologie choisie pour la mise en œuvre du DSL
5. [Responsabilités de chaque membre](#responsabilités-de-chaque-membre)

\newpage

# Introduction

Ce projet se concentre sur la création d'un DSL (Domain Specific Language) destiné à faciliter la composition musicale. Ce DSL offre une interface intuitive pour la création de pièces musicales, en mettant l'accent sur la flexibilité et la simplicité. Il permet aux compositeurs de définir des pistes, des notes et des éléments de batterie dans un cadre temporel précis. Chaque piste représente une séquence de notes, tandis que le temps est organisé en signatures, mesures, battements et tics. Notre DSL prend également en charge le tempo, permettant aux compositeurs de contrôler la dynamique de leur musique.

L'une de ses caractéristiques notables est la gestion des pistes de batterie, où chaque élément de batterie est associé à une note MIDI spécifique. En résumé, notre projet vise à simplifier le processus de composition musicale en offrant un outil flexible et intuitif pour l'expression artistique. Les détails de son fonctionnement seront explorés plus en profondeur dans les sections suivantes.

# Description du langage

## Modèle de domaine

_L'image est cliquable pour pouvoir zoomer sur les différents points du modèle de domaine._  
[![Domain Model](domain_model.png)](https://raw.githubusercontent.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/main/docs/domain_model.png?raw=true)

## Syntaxe concrète sous forme BNF

```xml
<Model> ::= 'name' <Name> 'notation' <Notation> { <Pattern> }* { <MusicElement> }*
<Name> ::= 'name' <STRING>
<Notation> ::= 'notation' ( 'NOTATION_LATIN' | 'NOTATION_ENGLISH' | 'NOTATION_GERMAN' )
<Tempo> ::= 'tempo' <INT>
<Signature> ::= 'signature' <INT> '/' <INT>
<Instrument> ::= 'instrument' <ID>
<Channel> ::= 'channel' <INT>
<Track> ::= 'track' '{' <Instrument> [ <Channel> ] { <Pattern> }* { <TrackElement> }* '}'
<Pattern> ::= 'pattern' <ID> '{' { <Playable> }+ '}'
<PatternInvocation> ::= 'play' <INT> <Pattern>
<MusicElement> ::= <Tempo> | <Signature> | <Track>
<Playable> ::= { ( <NOTE> | <DRUMKIT_NOTE> | <SEPARATOR> | <CHORD_OPENER> | <CHORD_CLOSER> ) }+
<TrackElement> ::= <PatternInvocation> | <Playable> | <Tempo> | <Signature>

<NOTATION_ENGLISH> ::= 'english'
<NOTATION_LATIN> ::= 'latin'
<NOTATION_GERMAN> ::= 'german'

<SEPARATOR> ::= '|' <NOTE_DURATION>?
<DRUMKIT_NOTE> ::= ( 'bd' | 'sd' | 'ch' | 'oh' | 'cc' | 'rc' )

<ENGLISH_NOTES> ::= 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
<LATIN_NOTES> ::= 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si' | 'Ut'
<GERMAN_NOTES> ::= 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'H'

<NOTE_DURATION_BASE> ::= 'w' | 'h' | 'ts' | 'sf' | 's' | 'q' | 'e'
<NOTE_DURATION_PLUS> ::= 'dh'|'ddh'|'qt'|'dq'|'ddq'|'et'|'de'|'dde'|'st'
<NOTE_DURATION> ::= ( <NOTE_DURATION_PLUS> | <NOTE_DURATION_BASE> )
<NOTE_OCTAVE> ::= /[0-9]/
<NOTE_A_SHARP> ::= '#'
<NOTE_A_FLAT> ::= 'b'
<NOTE> ::= ( <ENGLISH_NOTES> | <LATIN_NOTES> | <GERMAN_NOTES> ) 
    ( <NOTE_A_SHARP> | <NOTE_A_FLAT> )? <NOTE_OCTAVE> <NOTE_DURATION>
<CHORD_OPENER> ::= '['
<CHORD_CLOSER> ::= ']'

<ID> ::= /[_a-zA-Z][\w_]*/
<INT> ::= /[0-9]+/
<STRING> ::= /"[^"]*"/
```

## Description du langage

MusicML est un langage spécifique au domaine musical, conçu pour simplifier la création de compositions musicales grâce à une syntaxe intuitive et flexible. Il se concentre sur la facilité d'expression musical en permettant aux utilisateurs de définir des éléments essentiels tels que des notes, des patterns et des pistes de manière organisée. MusicML offre des abstractions claires pour des concepts musicaux complexes, facilitant ainsi la composition musicale.

Ce langage propose une structure claire pour la composition musicale, permettant aux compositeurs de définir le nom de la composition, la notation musicale (latin, english ou german), et de créer des patterns réutilisables. Les compositions sont structurées en éléments clés tels que le tempo, la signature rythmique et les pistes, chacun pouvant être personnalisé en fonction des besoins du compositeur.

Les pistes sont un élément central de MusicML, chacune dispose son propre instrument, et potentiellement, un canal MIDI et des patterns uniques. Les compositeurs peuvent invoquer des patterns (issu de la musique ou de la piste) dans les pistes avec une fréquence de répétition spécifiée, ce qui facilite la création de compositions cohérentes et structurées.

Les instructions de musique décrivent les notes, les accords, les pauses et les rythmes de la composition. Les compositeurs peuvent utiliser différentes notations pour représenter ces éléments, en fonction de leurs préférences. MusicML prend en charge une gamme diversifiée d'instruments, des instruments traditionnels aux instruments électroniques, offrant ainsi une variété d'options pour l'expression musicale.

La durée des éléments musicaux est spécifiée à l'aide de symboles tels que "w" (noire), "h" (blanche), "q" (croche) et d'autres, permettant ainsi de créer des motifs rythmiques complexes. Les accords, les notes de batterie et les pauses sont également pris en charge, offrant une variété d'expressions musicales.

MusicML offre également la possibilité de générer des fichiers JSON à partir des compositions, ce qui facilite le débogage et la visualisation des détails de la composition. Cela permet aux compositeurs de vérifier le contenu musical de manière pratique, même si les fichiers JSON générés sont assez longs.

En résumé, MusicML est un langage spécifique au domaine musical qui simplifie la composition musicale en offrant une syntaxe intuitive, une structure claire et une variété d'options pour l'expression musicale. Il permet aux compositeurs de créer des compositions cohérentes et personnalisées, que ce soit pour des compositions simples ou complexes, tout en offrant des outils de débogage pratiques pour le processus de création musicale.

### Mise en oeuvre

La mise en œuvre de MusicML se réalise grâce à une approche logicielle, reposant sur Node.js (version 18.4.0 minimum) et un système d'exploitation Linux (ou Windows avec quelques limitations, en utilisant WSL pour l'exécution des scripts).

Pour mettre en œuvre MusicML, vous devez suivre les étapes suivantes :

1. **Clonage du Projet :** La première étape consiste à cloner le projet `pns-si5-dsl-lab2-desolation` à partir du repo GitHub. Cela peut être réalisé en utilisant la commande git clone suivie de l'URL du référentiel, comme indiqué dans le [README](https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/blob/main/README.md). Cette action télécharge tous les fichiers et scripts nécessaires localement.

2. **Préparation de l'Environnement :** Après le clonage du projet, l'étape suivante est la préparation de l'environnement. Pour ce faire, exécutez le script prepare.sh à l'aide de la commande `sh prepare.sh`. Ce script se charge de mettre en place les dépendances nécessaires et de préparer l'environnement de travail.

3. **Utilisation :** Une fois que l'environnement est prêt, vous pouvez commencer à utiliser MusicML pour composer de la musique. Utilisez la commande sh run.sh en spécifiant le chemin vers le fichier MML que vous souhaitez convertir en fichier MIDI. Vous pouvez également utiliser des options facultatives telles que -d pour spécifier le dossier de destination, -j pour générer un fichier JSON, -w pour ouvrir un serveur web pour l'écoute, et -mt pour afficher les pistes multiples sur le serveur web.

4. **Exemples :** Le [README](https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/blob/main/README.md) propose des exemples d'utilisation pour illustrer comment composer des morceaux musicaux avec MusicML. Vous pouvez vous référer à ces exemples pour comprendre comment utiliser efficacement le langage.

5. **Documentation :** Pour une mise en œuvre plus avancée, la documentation fournie dans le [README](https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/blob/main/README.md) explique en détail la syntaxe du langage MusicML, les éléments de composition, les instructions de musique, les notations disponibles et les instruments pris en charge. Cette documentation est essentielle pour créer des compositions complexes et personnalisées.

https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/blob/main/README.md

# Responsabilités de chaque membre

- **Thomas FARINEAU**
  - Mise en place du kernel
    - Mise en place de la structure du projet
      - Parsing des données reçues sur le kernel
      - Implémentation de Midi Writer JS
    - Tests sur la structure
    - Mise en place du serveur Web pour l'écoute des fichiers MIDI
      - Conception de l'interface Web de A à Z
      - Mise en place de l'affichage multi-pistes
  - Mise en place du projet Langium
     - Mise en place de la grammaire
       - Écriture au format BNF
     - Mise en place des validateurs
     - Mise en place des générateurs
     - Tests sur la grammaire
     - Tests sur les validateurs
     - Tests sur les générateurs


- **Léo KITABADJIAN**
   - Mise en place de la structure du projet
     - Parsing des données reçues sur le kernel
     - Implémentation de Midi Writer JS
       - Tests de Midi Writer JS


- **Ludovic BAILET**


- **Mohamed MAHJOUB**
  - Diagramme de classe du modèle de domaine