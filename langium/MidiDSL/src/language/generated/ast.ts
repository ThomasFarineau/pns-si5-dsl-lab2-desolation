/******************************************************************************
 * This file was generated by langium-cli 2.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, Reference, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const MidiDslTerminals = {
    WS: /\s+/,
    ID: /[_a-zA-Z][\w_]*/,
    INT: /[0-9]+/,
    ML_COMMENT: /\/\*[\s\S]*?\*\//,
    SL_COMMENT: /\/\/[^\n\r]*/,
    DURATION: /((((q|w)|h)|e)|s)/,
    OCTAVE: /[1-8]/,
    WAIT: /(((((q|w)|h)|e)|s))/,
    VELOCITY: /[1-9][0-9]? | 100/,
    SEQUENTIAL: /((true|false))/,
    ACCIDENTAL: /((#)|(b))/,
    A: /((((a|A)|do)|DO)|Do)/,
    B: /((((b|B)|re)|RE)|Re)/,
    C: /((((c|C)|mi)|MI)|Mi)/,
    D: /((((d|D)|fa)|FA)|Fa)/,
    E: /((((e|E)|sol)|SOL)|Sol)/,
    F: /((((f|F)|la)|LA)|La)/,
    G: /((((g|G)|si)|SI)|Si)/,
};

export interface Chord extends AstNode {
    readonly $container: Pattern;
    readonly $type: 'Chord';
    notes: Array<Note>
}

export const Chord = 'Chord';

export function isChord(item: unknown): item is Chord {
    return reflection.isInstance(item, Chord);
}

export interface Element extends AstNode {
    readonly $container: Music;
    readonly $type: 'Element';
    id: string
    tempo?: Tempo
    timeSignature?: TimeSignature
    track: Array<Track>
}

export const Element = 'Element';

export function isElement(item: unknown): item is Element {
    return reflection.isInstance(item, Element);
}

export interface Music extends AstNode {
    readonly $type: 'Music';
    elements?: Element
    name?: string
    pattern?: Pattern
    tempo?: Tempo
    timeSignature?: TimeSignature
}

export const Music = 'Music';

export function isMusic(item: unknown): item is Music {
    return reflection.isInstance(item, Music);
}

export interface Note extends AstNode {
    readonly $container: Chord | Pattern;
    readonly $type: 'Note';
    channel?: number
    duration?: string
    name: string
    pitch: Pitch
    repeat?: number
    sequential?: string
    velocity?: string
}

export const Note = 'Note';

export function isNote(item: unknown): item is Note {
    return reflection.isInstance(item, Note);
}

export interface NoteName extends AstNode {
    readonly $container: Pitch;
    readonly $type: 'NoteName';
    accidental?: string
    note: string
}

export const NoteName = 'NoteName';

export function isNoteName(item: unknown): item is NoteName {
    return reflection.isInstance(item, NoteName);
}

export interface Pattern extends AstNode {
    readonly $container: Music | Track;
    readonly $type: 'Pattern';
    elements: Array<Chord | Note | Wait>
    name: string
}

export const Pattern = 'Pattern';

export function isPattern(item: unknown): item is Pattern {
    return reflection.isInstance(item, Pattern);
}

export interface Pitch extends AstNode {
    readonly $container: Note;
    readonly $type: 'Pitch';
    noteName: NoteName
    octave: string
}

export const Pitch = 'Pitch';

export function isPitch(item: unknown): item is Pitch {
    return reflection.isInstance(item, Pitch);
}

export interface Tempo extends AstNode {
    readonly $container: Element | Music;
    readonly $type: 'Tempo';
    tempo: number
}

export const Tempo = 'Tempo';

export function isTempo(item: unknown): item is Tempo {
    return reflection.isInstance(item, Tempo);
}

export interface TimeSignature extends AstNode {
    readonly $container: Element | Music | Track;
    readonly $type: 'TimeSignature';
    denominator: number
    numerator: number
}

export const TimeSignature = 'TimeSignature';

export function isTimeSignature(item: unknown): item is TimeSignature {
    return reflection.isInstance(item, TimeSignature);
}

export interface Track extends AstNode {
    readonly $container: Element;
    readonly $type: 'Track';
    instrument: number
    name: string
    Pattern: Array<Pattern>
    timeSignature?: TimeSignature
    track: Array<Reference<Pattern>>
}

export const Track = 'Track';

export function isTrack(item: unknown): item is Track {
    return reflection.isInstance(item, Track);
}

export interface Wait extends AstNode {
    readonly $container: Pattern;
    readonly $type: 'Wait';
    wait: string
}

export const Wait = 'Wait';

export function isWait(item: unknown): item is Wait {
    return reflection.isInstance(item, Wait);
}

export type MidiDslAstType = {
    Chord: Chord
    Element: Element
    Music: Music
    Note: Note
    NoteName: NoteName
    Pattern: Pattern
    Pitch: Pitch
    Tempo: Tempo
    TimeSignature: TimeSignature
    Track: Track
    Wait: Wait
}

export class MidiDslAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['Chord', 'Element', 'Music', 'Note', 'NoteName', 'Pattern', 'Pitch', 'Tempo', 'TimeSignature', 'Track', 'Wait'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Track:track': {
                return Pattern;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'Chord': {
                return {
                    name: 'Chord',
                    mandatory: [
                        { name: 'notes', type: 'array' }
                    ]
                };
            }
            case 'Element': {
                return {
                    name: 'Element',
                    mandatory: [
                        { name: 'track', type: 'array' }
                    ]
                };
            }
            case 'Pattern': {
                return {
                    name: 'Pattern',
                    mandatory: [
                        { name: 'elements', type: 'array' }
                    ]
                };
            }
            case 'Track': {
                return {
                    name: 'Track',
                    mandatory: [
                        { name: 'Pattern', type: 'array' },
                        { name: 'track', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new MidiDslAstReflection();
