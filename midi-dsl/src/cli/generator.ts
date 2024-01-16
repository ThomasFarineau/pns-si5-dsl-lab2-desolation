import type {Model, Pattern} from '../language/generated/ast.js';

const durationMap = new Map([["w", "1"], ["h", "2"], ["dh", "d2"], ["ddh", "dd2"], ["q", "4"], ["qt", "4t"], ["dq", "d4"], ["ddq", "dd4"], ["e", "8"], ["et", "8t"], ["de", "d8"], ["dde", "dd8"], ["s", "16"], ["st", "16t"], ["ts", "32"], ["sf", "64"]]);
const drumMap = new Map([["bd", "C2"], ["sd", "E2"], ["ch", "F#2"], ["oh", "G#2"], ["cc", "C#3"], ["rc", "D#3"]])

const latinToEnglish = new Map([["do", "C"], ["re", "D"], ["ré", "D"], ["mi", "E"], ["fa", "F"], ["sol", "G"], ["la", "A"], ["si", "B"], ["ut", "C"],]);
const germanToEnglish = new Map([["c", "C"], ["d", "D"], ["e", "E"], ["f", "F"], ["g", "G"], ["a", "A"], ["h", "B"]]);


const getPatterns = (patterns: Array<Pattern>, notation: string): any => {
    let newPatterns: any = {};
    patterns.forEach(pattern => {
        // @ts-ignore
        newPatterns[pattern.name] = getElements(pattern.elements, notation)
    });
    return newPatterns;
};

const parseNote = (note: string, notation: string): any => {
    let n = extractPart(note);
    return {
        type: "Note",
        note: convertNote(notation, n.note),
        octave: n.octave,
        duration: convertDuration(n.duration),
        accidental: n.accidental
    }
}

const parseChord = (element: string, notation: string): any => {
    let newChord: any = [];
    element.slice(2, -2).split(" ").forEach(e => {
        newChord.push(matchNote(e) ? parseNote(e, notation) : parseNote(convertDrum(e), notation));
    });
    return {type: "Chord", notes: newChord};
};

const parseWait = (element: string): any => {
    let duration = element.replace("|", "")
    return {type: "Wait", duration: convertDuration(duration)};
}

const parsePlayable = (elements: Array<string>, notation: string): any => {
    let newElements: any = [];
    let result = elements.join(" ").match(/\[.*?]|\b\w+#?\d\w*\b|(\|\w+)|\b\w{2}\b/g)
    if (result !== null) result.forEach(element => {
        if (element.startsWith('[')) {
            newElements.push(parseChord(element, notation))
        } else if (element.startsWith('|')) {
            newElements.push(parseWait(element))
        } else {
            newElements.push(matchNote(element) ? parseNote(element, notation) : parseNote(convertDrum(element), notation));
        }
    });
    return newElements;
}

const extractPart = (str: string): { note: string, accidental: string, octave: number, duration: string } => {
    const regex = /([A-Zac-z]{1,3})([b#]?)(\d)(.+)/;
    const match = str.match(regex);
    return {
        note: match ? match[1] : "",
        accidental: match ? match[2] : "",
        octave: match ? parseInt(match[3]) : -1,
        duration: match ? match[4] : ""
    }
};

const matchNote = (str: string): string | null => {
    const regex = /([A-Zac-z]{1,3})([b#]?)(\d)(.)/;
    const match = str.match(regex);
    return match ? match[0] : null;
};

const convertDuration = (duration: string): string => durationMap.get(duration) || "";
const convertDrum = (drum: string): string => drumMap.get(drum) + "e" || "";

const convertNote = (notation: string, note: string): string => {
    switch (notation) {
        case "latin":
            return latinToEnglish.get(note) || note;
        case "german":
            return germanToEnglish.get(note) || note;
        default:
            return note;
    }
}

const getElements = (elements: Array<any>, notation: string): any => {
    let newElements: any = [];
    elements.forEach(element => {
        if (element.$type === "Playable") {
            // @ts-ignore
            parsePlayable(element.elements, notation).forEach((e: any) => newElements.push(e));
        } else {
            let elementToPush = {
                type: element.$type,
            }
            if (element.$type === "Tempo") {
                // @ts-ignore
                elementToPush["tempo"] = element.value;
            } else if (element.$type === "Signature") {
                // @ts-ignore
                elementToPush["numerator"] = element.numerator;
                // @ts-ignore
                elementToPush["denominator"] = element.denominator;
            } else if (element.$type === "Track") {
                // @ts-ignore
                elementToPush["instrument"] = element.instrument.value;
                // @ts-ignore
                elementToPush["patterns"] = getPatterns(element.patterns);
                // @ts-ignore
                elementToPush["elements"] = getElements(element.elements);
                if (element.channel) {
                    // @ts-ignore
                    elementToPush["channel"] = element.channel.value;
                }
            } else if (element.$type === "PatternInvocation") {
                // @ts-ignore
                elementToPush["repeat"] = element.repeat;
                // @ts-ignore
                elementToPush["id"] = element.Pattern.ref.name;
            } else if (element.type === "Pattern") {
                // @ts-ignore
                elementToPush["id"] = element.name;
            }

            newElements.push(elementToPush);
        }
    });
    return newElements;
};

export function generateJson(model: Model): string {

    let newModel = {
        name: model.name.value,
        notation: model.notation.value,
        patterns: getPatterns(model.patterns, model.notation.value),
        elements: getElements(model.elements, model.notation.value)
    };

    return JSON.stringify(newModel, null, 2);
}
