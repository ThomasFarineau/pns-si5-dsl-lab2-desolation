import type {AstNode, ValidationAcceptor, ValidationChecks} from 'langium';
import {Instrument, MidiDslAstType, Model, Notation, Playable} from './generated/ast.js';
import type {MidiDslServices} from './midi-dsl-module.js';

export function registerValidationChecks(services: MidiDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MidiDslValidator;
    const checks: ValidationChecks<MidiDslAstType> = {
        Notation: validator.checkNotation,
        Instrument: validator.checkInstrument,
        Playable: validator.checkPlayable,
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MidiDslValidator {
    checkPlayable(playable: Playable, accept: ValidationAcceptor): void {
        let isInChord = false;
        let chordElementCount = 0;
        for (let i = 0; i < playable.elements.length; i++) {
            let element = playable.elements[i];

            if (element === '[') {
                if (isInChord) {
                    accept('error', `Invalid chord nesting at element ${i}`, {node: playable, property: 'elements', index: i});
                }
                isInChord = true;
                chordElementCount = 0;
                continue;
            }
            // Vérifier si nous sortons d'un accord
            if (element === ']') {
                if (!isInChord) {
                    accept('error', `Unmatched chord closing at element ${i}`, {node: playable, property: 'elements', index: i});
                } else if (chordElementCount < 2) {
                    accept('error', `Chord at element ${i} must contain at least two notes`, {node: playable, property: 'elements', index: i});
                }
                isInChord = false;
                continue;
            }

            if (isInChord) {
                if (element === '|' || element === '[') {
                    accept('error', `Invalid element "${element}" inside chord at ${i}`, {node: playable, property: 'elements', index: i});
                } else {
                    chordElementCount++;
                }
            }
        }

        if (isInChord) {
            accept('error', `Unclosed chord at the end of Playable`, {node: playable});
        }
    }

    findParentModel(element: any): Model | null {
        // Remonter dans l'arborescence AST jusqu'à trouver un Model
        while (element && !(element instanceof Model)) {
            element = element.$container;
        }
        return element instanceof Model ? element : null;
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
}

enum NotationType {
    english = "english",
    latin = "latin",
    german = "german",
    slavs = "slavs",
}

enum InstrumentType {
    piano = "piano",
    guitar = "guitar",
    drumkit = "drumkit",
    bass = "bass"
}