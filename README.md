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
#### Création de bindings
Spécifiez une liste de bindings qui vous permettront de jouer de la musique en direct
```
bindings {
    instrument acoustic_grand_piano
    bind 'a' C#5
    bind 'f' D3
}
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
[A3et F#4et] B3et D#4et |ts
```

Attention, si l'intrument de la piste musical est un drumkit, les notes conventionnel ne fonctionneront pas, il faudra utiliser les notes de batterie (voir [liste des notes de batterie](#note-de-batterie)).
Exemple:
```
bd sd |w
```

###### Notes
Pour définir une note, on va mettre une note (selon la [notation](#choix-de-la-notation) choisie), suivi de son octave, suivi d'une [durée](#durée).
Si on a choisi une notation latin, on pourrait avoir :

```
La#3q
```
Cela va produire une note La# sur la 3ème octave, avec une durée de 1/4 de temps.
###### Attentes
Pour définir une attente, on va mettre une barre verticale `|` suivi d'une [durée](#durée) optionnelle. Si aucune durée n'est spécifiée, la durée par défaut est une noire (1/4 de temps).
```
| |w
```
Cela va produire une attente de 5/4 de temps (1/4 de temps + 1 temps)
###### Note de Batterie
Une note de batterie n'a pas de durée, car elle est jouée instantanément (1/8 de temps dans le midi). On va donc simplement mettre le nom de la note de batterie. Pour accélérer la cadence, exemple, pour un roulement de tambour, on peut mettre plusieurs notes de batterie à la suite et augmenter le tempo.

- grosse caisse ou bass drum : bd
- caisse claire : sd
- charleston fermé : ch
- charleston ouvert : oh
- cymbale crash : cc
- cymbale ride : rc

###### Durée
Voici un dictionnaire avec la valeur dans notre langage et la valeur reel
- w : 1
- h: 1/2
- dh: 3/4
- ddh: 7/8
- q: 1/4
- qt: 1/4 + 1/8
- dq: 1/4 + 1/16
- ddq: 1/4 + 1/32
- e: 1/8
- et: 1/8 + 1/16
- de: 1/8 + 1/32
- dde: 1/8 + 1/64
- s: 1/16
- st: 1/16 + 1/32
- ts: 1/32
- sf: 1/64

###### Accord
Pour définir un accord, on va mettre une note ou une note de batterie dans les crochets `[]`. On peut mettre plusieurs notes ou notes de batterie dans un accord, si il n'y a qu'une note, cela ne fonctionnera pas. Il ne peut pas y avoir d'attente dans un accord.
Attention, en cas de note avec des durées différentes, la durée de l'accord sera la durée de la première note.
```
[A3et F#4et]
```

#### Instruments
Voici un dictionnaire avec la valeur dans notre langage et le nom de l'instrument
- drumkit : Standard Drum Kit
- acoustic_grand_piano : Acoustic Grand Piano
- bright_acoustic_piano : Bright Acoustic Piano
- electric_grand_piano : Electric Grand Piano
- honky_tonk_piano : Honky Tonk Piano
- electric_piano_1 = "electric_piano_1"
- electric_piano_2 = "electric_piano_2"
- harpsichord = "harpsichord"
- clavinet = "clavinet"
- celesta = "celesta"
- glockenspiel = "glockenspiel"
- music_box = "music_box"
- vibraphone = "vibraphone"
- marimba = "marimba"
- xylophone = "xylophone"
- tubular_bells = "tubular_bells"
- dulcimer = "dulcimer"
- drawbar_organ = "drawbar_organ"
- percussive_organ = "percussive_organ"
- rock_organ = "rock_organ"
- church_organ = "church_organ"
- reed_organ = "reed_organ"
- accordion = "accordion"
- harmonica = "harmonica"
- tango_accordion = "tango_accordion"
- nylon_acoustic_guitar = "nylon_acoustic_guitar"
- steel_acoustic_guitar = "steel_acoustic_guitar"
- jazz_electric_guitar = "jazz_electric_guitar"
- clean_electric_guitar = "clean_electric_guitar"
- muted_electric_guitar = "muted_electric_guitar"
- overdrive_guitar = "overdrive_guitar"
- distorted_guitar = "distorted_guitar"
- guitar_harmonics = "guitar_harmonics"
- acoustic_bass = "acoustic_bass"
- electric_fingered_bass = "electric_fingered_bass"
- electric_picked_bass = "electric_picked_bass"
- fretless_bass = "fretless_bass"
- slap_bass_1 = "slap_bass_1"
- slap_bass_2 = "slap_bass_2"
- synth_bass_1 = "synth_bass_1"
- synth_bass_2 = "synth_bass_2"
- violin = "violin"
- viola = "viola"
- cello = "cello"
- contrabass = "contrabass"
- tremolo_strings = "tremolo_strings"
- pizzicato_strings = "pizzicato_strings"
- orchestral_harp = "orchestral_harp"
- timpani = "timpani"
- string_ensemble_1 = "string_ensemble_1"
- string_ensemble_2_slow = "string_ensemble_2_slow"
- synth_strings_1 = "synth_strings_1"
- synth_strings_2 = "synth_strings_2"
- choir_aahs = "choir_aahs"
- voice_oohs = "voice_oohs"
- syn_choir = "syn_choir"
- orchestral_hit = "orchestral_hit"
- trumpet = "trumpet"
- trombone = "trombone"
- tuba = "tuba"
- muted_trumpet = "muted_trumpet"
- french_horn = "french_horn"
- brass_section = "brass_section"
- syn_brass_1 = "syn_brass_1"
- syn_brass_2 = "syn_brass_2"
- soprano_sax = "soprano_sax"
- alto_sax = "alto_sax"
- tenor_sax = "tenor_sax"
- baritone_sax = "baritone_sax"
- oboe = "oboe"
- english_horn = "english_horn"
- bassoon = "bassoon"
- clarinet = "clarinet"
- piccolo = "piccolo"
- flute = "flute"
- recorder = "recorder"
- pan_flute = "pan_flute"
- bottle_blow = "bottle_blow"
- shakuhachi = "shakuhachi"
- whistle = "whistle"
- ocarina = "ocarina"
- synth_square_wave = "synth_square_wave"
- synth_sawtooth_wave = "synth_sawtooth_wave"
- synth_calliope = "synth_calliope"
- synth_chiff = "synth_chiff"
- synth_charang = "synth_charang"
- synth_voice = "synth_voice"
- synth_fifths_sawtooth_wave = "synth_fifths_sawtooth_wave"
- synth_brass_and_lead = "synth_brass_and_lead"
- new_age_synth_pad = "new_age_synth_pad"
- warm_synth_pad = "warm_synth_pad"
- polysynth_synth_pad = "polysynth_synth_pad"
- choir_synth_pad = "choir_synth_pad"
- bowed_synth_pad = "bowed_synth_pad"
- metal_synth_pad = "metal_synth_pad"
- halo_synth_pad = "halo_synth_pad"
- sweep_synth_pad = "sweep_synth_pad"
- sfx_rain = "sfx_rain"
- sfx_soundtrack = "sfx_soundtrack"
- sfx_crystal = "sfx_crystal"
- sfx_atmosphere = "sfx_atmosphere"
- sfx_brightness = "sfx_brightness"
- sfx_goblins = "sfx_goblins"
- sfx_echoes = "sfx_echoes"
- sfx_sci_fi = "sfx_sci_fi"
- sitar = "sitar"
- banjo = "banjo"
- shamisen = "shamisen"
- koto = "koto"
- kalimba = "kalimba"
- bag_pipe = "bag_pipe"
- fiddle = "fiddle"
- shanai = "shanai"
- tinkle_bell = "tinkle_bell"
- agogo = "agogo"
- steel_drums = "steel_drums"
- woodblock = "woodblock"
- taiko_drum = "taiko_drum"
- melodic_tom = "melodic_tom"
- synth_drum = "synth_drum"
- reverse_cymbal = "reverse_cymbal"
- guitar_fret_noise = "guitar_fret_noise"
- breath_noise = "breath_noise"
- seashore = "seashore"
- bird_tweet = "bird_tweet"
- telephone_ring = "telephone_ring"
- helicopter = "helicopter"
- applause = "applause"
- gun_shot = "gun_shot"