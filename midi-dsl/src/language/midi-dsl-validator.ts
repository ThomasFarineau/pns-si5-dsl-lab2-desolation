import type {AstNode, ValidationAcceptor, ValidationChecks} from 'langium';
import {Instrument, MidiDslAstType, Model, Notation, Playable, Track} from './generated/ast.js';
import type {MidiDslServices} from './midi-dsl-module.js';

export function registerValidationChecks(services: MidiDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MidiDslValidator;
    const checks: ValidationChecks<MidiDslAstType> = {
        Notation: validator.checkNotation, Instrument: validator.checkInstrument, Playable: validator.checkPlayable,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MidiDslValidator {
    checkPlayable(playable: Playable, accept: ValidationAcceptor): void {
        // get notation from parent model
        let notation = this.getModelNotation(playable, accept);
        let instrument = this.getTrackInstrument(playable, accept);
        let isInChord = false;
        let chordElementCount = 0;
        for (let i = 0; i < playable.elements.length; i++) {
            let element = playable.elements[i];
            this.checkElementNotation(playable, element, i, notation, accept);

            if (this.isDrumkitNote(element) && instrument !== InstrumentType.drumkit) {
                accept('error', `Drumkit note ${element} is not valid for instrument ${instrument}`, {
                    node: playable, property: 'elements', index: i
                });
            } else if ((!this.isDrumkitNote(element) && element !== "|") && instrument === InstrumentType.drumkit) {
                accept('error', `Note ${element} is not valid for instrument ${instrument}`, {
                    node: playable, property: 'elements', index: i
                });
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
            // Vérifier si nous sortons d'un accord
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
        return !element.match(/[0-9]/) && element !== '|' && element !== '[' && element !== ']'
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
        this.checkType(instrument, instrument.value, InstrumentType, "The instrument should be %values%", accept);
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
    piano = "piano", guitar = "guitar", drumkit = "drumkit", bass = "bass"
}