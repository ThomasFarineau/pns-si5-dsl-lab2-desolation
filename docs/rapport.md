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

\newpage

# Introduction

# Description du langage

## Modèle de domaine

_L'image est cliquable pour pouvoir zoomer sur les différents points du modèle de domaine._  
[![Domain Model](domain_model.png)](https://github.com/ThomasFarineau/pns-si5-dsl-lab2-desolation/docs/domain_model.png)

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

### Mise en oeuvre