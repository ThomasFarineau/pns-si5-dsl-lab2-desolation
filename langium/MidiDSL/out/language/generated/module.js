/******************************************************************************
 * This file was generated by langium-cli 2.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
import { MidiDslAstReflection } from './ast.js';
import { MidiDslGrammar } from './grammar.js';
export const MidiDslLanguageMetaData = {
    languageId: 'midi-dsl',
    fileExtensions: ['.ddm'],
    caseInsensitive: false
};
export const MidiDslGeneratedSharedModule = {
    AstReflection: () => new MidiDslAstReflection()
};
export const MidiDslGeneratedModule = {
    Grammar: () => MidiDslGrammar(),
    LanguageMetaData: () => MidiDslLanguageMetaData,
    parser: {}
};
//# sourceMappingURL=module.js.map