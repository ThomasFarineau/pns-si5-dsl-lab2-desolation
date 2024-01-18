import type {AstNode, ValidationAcceptor, ValidationChecks} from 'langium';
import {Instrument, MusicMLAstType, Model, Notation, Playable, Track} from './generated/ast.js';
import type {MusicMLServices} from './musicml-module.js';

export function registerValidationChecks(services: MusicMLServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MusicMLValidator;
    const checks: ValidationChecks<MusicMLAstType> = {
        Notation: validator.checkNotation, Instrument: validator.checkInstrument, Playable: validator.checkPlayable,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MusicMLValidator {
    checkPlayable(playable: Playable, accept: ValidationAcceptor): void {
        // get notation from parent model
        let notation = this.getModelNotation(playable, accept);
        let isInTrack = this.isInTrack(playable);
        let instrument = "";
        if (isInTrack) {
            instrument = this.getTrackInstrument(playable, accept);
        }
        let isInChord = false;
        let chordElementCount = 0;
        for (let i = 0; i < playable.elements.length; i++) {
            let element = playable.elements[i];
            this.checkElementNotation(playable, element, i, notation, accept);

            if (instrument !== "") {
                if (!element.startsWith("|")) {
                    if (this.isDrumkitNote(element) && instrument !== InstrumentType.drumkit) {
                        accept('error', `Drumkit note ${element} is not valid for instrument ${instrument}`, {
                            node: playable, property: 'elements', index: i
                        });
                    } else if ((!this.isDrumkitNote(element)) && instrument === InstrumentType.drumkit) {
                        accept('error', `Note ${element} is not valid for instrument ${instrument}`, {
                            node: playable, property: 'elements', index: i
                        });
                    }
                }
            } else {
                // ici on verifie qu'on a pas de note de drumkit et de note normale dans le meme playable
            }

            if (element === '[') {
                if (isInChord) {
                    accept('error', `Invalid chord nesting at element ${i}`, {
                        node: playable, property: 'elements', index: i
                    });
                }
                isInChord = true;
                chordElementCount = 0;
                continue;
            }
            if (element === ']') {
                if (!isInChord) {
                    accept('error', `Unmatched chord closing at element ${i}`, {
                        node: playable, property: 'elements', index: i
                    });
                } else if (chordElementCount < 2) {
                    accept('error', `Chord at element ${i} must contain at least two notes`, {
                        node: playable, property: 'elements', index: i
                    });
                }
                isInChord = false;
                continue;
            }

            if (isInChord) {
                if (element === '|' || element === '[') {
                    accept('error', `Invalid element "${element}" inside chord at ${i}`, {
                        node: playable, property: 'elements', index: i
                    });
                } else {
                    chordElementCount++;
                }
            }
        }

        if (isInChord) {
            accept('error', `Unclosed chord at the end of Playable`, {node: playable});
        }
    }

    isDrumkitNote(element: any) {
        return !element.match(/[0-9]/) && element !== '[' && element !== ']'
    }

    isInTrack(node: AstNode) {
        let track = this.findParentTrack(node);
        return track !== null;
    }

    checkElementNotation(playable: AstNode, element: any, index: number, notation: string, accept: ValidationAcceptor) {
        if (element.match(/[a-zA-Z]*[0-9]/)) {
            let note = element.match(/[a-zA-Z]*/)?.toString();
            if (note !== undefined) {
                if (note[note.length - 1] === 'b') {
                    note = note.slice(0, -1);
                }
                if (!this.isNoteValid(notation, note)) {
                    accept('error', `Note ${note} is not valid for notation ${notation}`, {
                        node: playable, property: 'elements', index: index
                    });
                }
            }
        }
    }

    getTrackInstrument(node: AstNode, accept: ValidationAcceptor): string {
        let track = this.findParentTrack(node);
        if (!track) {
            accept('error', `Playable must be contained in a Track`, {node: node});
            return "";
        }
        return track.instrument.value;
    }

    getModelNotation(node: AstNode, accept: ValidationAcceptor): string {
        let model = this.findParentModel(node);
        if (!model) {
            accept('error', `Playable must be contained in a Model`, {node: node});
            return "";
        }
        return model.notation.value;
    }

    isModel(element: any): element is Model {
        return element && element.hasOwnProperty('notation') && element.hasOwnProperty('name');
    }

    isTrack(element: any): element is Track {
        return element && element.hasOwnProperty('instrument');
    }

    findParentModel(element: any): Model | null {
        while (element && !this.isModel(element)) {
            element = element.$container;
        }
        return this.isModel(element) ? element : null;
    }

    findParentTrack(element: any): Track | null {
        while (element && !this.isTrack(element)) {
            element = element.$container;
        }
        return this.isTrack(element) ? element : null;
    }

    checkType(node: AstNode, value: string, typeEnum: any, messageTemplate: string, accept: ValidationAcceptor): void {
        if (!(value in typeEnum)) {
            let possibleValues = Object.keys(typeEnum).join(", ").replace(/,([^,]*)$/, ' or$1');
            accept('error', messageTemplate.replace("%values%", possibleValues), {node: node});
        }
    }

    checkNotation(notation: Notation, accept: ValidationAcceptor): void {
        this.checkType(notation, notation.value, NotationType, "The notation should be %values%", accept);
    }

    checkInstrument(instrument: Instrument, accept: ValidationAcceptor): void {
        this.checkType(instrument, instrument.value, InstrumentType, "The chosen instrument is not valid. Please refer to the documentation to see the list of available instruments", accept);
    }

    isNoteValid(notation: string, note: string) {
        switch (notation) {
            case 'english':
                return ENGLISH_NOTATION.includes(note as string);
            case 'latin':
                return LATIN_NOTATION.includes(note as string);
            case 'german':
                return GERMAN_NOTATION.includes(note as string);
            default:
                return false;
        }
    }
}

const ENGLISH_NOTATION = ["C", "D", "E", "F", "G", "A", "B",]

const LATIN_NOTATION = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Ut"]

const GERMAN_NOTATION = ["C", "D", "E", "F", "G", "A", "H",]

enum NotationType {
    english = "english", latin = "latin", german = "german",
}

enum InstrumentType {
    drumkit = "drumkit",
    acoustic_grand_piano = "acoustic_grand_piano",
    bright_acoustic_piano = "bright_acoustic_piano",
    electric_grand_piano = "electric_grand_piano",
    honky_tonk_piano = "honky_tonk_piano",
    electric_piano_1 = "electric_piano_1",
    electric_piano_2 = "electric_piano_2",
    harpsichord = "harpsichord",
    clavinet = "clavinet",
    celesta = "celesta",
    glockenspiel = "glockenspiel",
    music_box = "music_box",
    vibraphone = "vibraphone",
    marimba = "marimba",
    xylophone = "xylophone",
    tubular_bells = "tubular_bells",
    dulcimer = "dulcimer",
    drawbar_organ = "drawbar_organ",
    percussive_organ = "percussive_organ",
    rock_organ = "rock_organ",
    church_organ = "church_organ",
    reed_organ = "reed_organ",
    accordion = "accordion",
    harmonica = "harmonica",
    tango_accordion = "tango_accordion",
    nylon_acoustic_guitar = "nylon_acoustic_guitar",
    steel_acoustic_guitar = "steel_acoustic_guitar",
    jazz_electric_guitar = "jazz_electric_guitar",
    clean_electric_guitar = "clean_electric_guitar",
    muted_electric_guitar = "muted_electric_guitar",
    overdrive_guitar = "overdrive_guitar",
    distorted_guitar = "distorted_guitar",
    guitar_harmonics = "guitar_harmonics",
    acoustic_bass = "acoustic_bass",
    electric_fingered_bass = "electric_fingered_bass",
    electric_picked_bass = "electric_picked_bass",
    fretless_bass = "fretless_bass",
    slap_bass_1 = "slap_bass_1",
    slap_bass_2 = "slap_bass_2",
    synth_bass_1 = "synth_bass_1",
    synth_bass_2 = "synth_bass_2",
    violin = "violin",
    viola = "viola",
    cello = "cello",
    contrabass = "contrabass",
    tremolo_strings = "tremolo_strings",
    pizzicato_strings = "pizzicato_strings",
    orchestral_harp = "orchestral_harp",
    timpani = "timpani",
    string_ensemble_1 = "string_ensemble_1",
    string_ensemble_2_slow = "string_ensemble_2_slow",
    synth_strings_1 = "synth_strings_1",
    synth_strings_2 = "synth_strings_2",
    choir_aahs = "choir_aahs",
    voice_oohs = "voice_oohs",
    syn_choir = "syn_choir",
    orchestral_hit = "orchestral_hit",
    trumpet = "trumpet",
    trombone = "trombone",
    tuba = "tuba",
    muted_trumpet = "muted_trumpet",
    french_horn = "french_horn",
    brass_section = "brass_section",
    syn_brass_1 = "syn_brass_1",
    syn_brass_2 = "syn_brass_2",
    soprano_sax = "soprano_sax",
    alto_sax = "alto_sax",
    tenor_sax = "tenor_sax",
    baritone_sax = "baritone_sax",
    oboe = "oboe",
    english_horn = "english_horn",
    bassoon = "bassoon",
    clarinet = "clarinet",
    piccolo = "piccolo",
    flute = "flute",
    recorder = "recorder",
    pan_flute = "pan_flute",
    bottle_blow = "bottle_blow",
    shakuhachi = "shakuhachi",
    whistle = "whistle",
    ocarina = "ocarina",
    synth_square_wave = "synth_square_wave",
    synth_sawtooth_wave = "synth_sawtooth_wave",
    synth_calliope = "synth_calliope",
    synth_chiff = "synth_chiff",
    synth_charang = "synth_charang",
    synth_voice = "synth_voice",
    synth_fifths_sawtooth_wave = "synth_fifths_sawtooth_wave",
    synth_brass_and_lead = "synth_brass_and_lead",
    new_age_synth_pad = "new_age_synth_pad",
    warm_synth_pad = "warm_synth_pad",
    polysynth_synth_pad = "polysynth_synth_pad",
    choir_synth_pad = "choir_synth_pad",
    bowed_synth_pad = "bowed_synth_pad",
    metal_synth_pad = "metal_synth_pad",
    halo_synth_pad = "halo_synth_pad",
    sweep_synth_pad = "sweep_synth_pad",
    sfx_rain = "sfx_rain",
    sfx_soundtrack = "sfx_soundtrack",
    sfx_crystal = "sfx_crystal",
    sfx_atmosphere = "sfx_atmosphere",
    sfx_brightness = "sfx_brightness",
    sfx_goblins = "sfx_goblins",
    sfx_echoes = "sfx_echoes",
    sfx_sci_fi = "sfx_sci_fi",
    sitar = "sitar",
    banjo = "banjo",
    shamisen = "shamisen",
    koto = "koto",
    kalimba = "kalimba",
    bag_pipe = "bag_pipe",
    fiddle = "fiddle",
    shanai = "shanai",
    tinkle_bell = "tinkle_bell",
    agogo = "agogo",
    steel_drums = "steel_drums",
    woodblock = "woodblock",
    taiko_drum = "taiko_drum",
    melodic_tom = "melodic_tom",
    synth_drum = "synth_drum",
    reverse_cymbal = "reverse_cymbal",
    guitar_fret_noise = "guitar_fret_noise",
    breath_noise = "breath_noise",
    seashore = "seashore",
    bird_tweet = "bird_tweet",
    telephone_ring = "telephone_ring",
    helicopter = "helicopter",
    applause = "applause",
    gun_shot = "gun_shot"
}