import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { MidiDslAstType, Person } from './generated/ast.js';
import type { MidiDslServices } from './midi-dsl-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: MidiDslServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.MidiDslValidator;
    const checks: ValidationChecks<MidiDslAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class MidiDslValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
