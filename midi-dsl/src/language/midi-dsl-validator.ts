import type {AstNode, ValidationAcceptor, ValidationChecks} from 'langium';
import {Instrument, MidiDslAstType, Notation} from './generated/ast.js';
import type {MidiDslServices} from './midi-dsl-module.js';

export function registerValidationChecks(services: MidiDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MidiDslValidator;
    const checks: ValidationChecks<MidiDslAstType> = {
        Notation: validator.checkNotation,
        Instrument: validator.checkInstrument
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MidiDslValidator {

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