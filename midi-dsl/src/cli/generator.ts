import type {Model, Pattern} from '../language/generated/ast.js';

const durationMap = new Map([["w", 1], ["h", 2], ["q", 4], ["e", 8], ["s", 16]]);
const drumMap = new Map([["bd", "C1"], ["sd", "D1#"], ["ch", "F1#"], ["oh", "G1#"], ["cc", "C2#"], ["rc", "D2#"]])

const getPatterns = (patterns: Array<Pattern>): any => {
    let newPatterns: any = {};
    patterns.forEach(pattern => {
        // @ts-ignore
        newPatterns[pattern.name] = getElements(pattern.elements)
    });
    return newPatterns;
};

const parseNote = (note: string): any => {
    let n = extractPart(note);
    return {
        type: "Note", note: n.note, octave: n.octave, duration: convertDuration(n.duration), accidental: n.accidental
    }
}

const parseChord = (element: string): any => {
    let newChord: any = [];
    element.slice(2, -2).split(" ").forEach(e => {
        newChord.push(matchNote(e) ? parseNote(e) : parseNote(convertDrum(e)));
    });
    return {type: "Chord", notes: newChord};
};

const parseWait = (element: string): any => {
    return {type: "Wait", duration: convertDuration(element.slice(1))};
}

const parsePlayable = (elements: Array<string>): any => {
    let newElements: any = [];
    let result = elements.join(" ").match(/\[.*?]|\b\w+#?\d\w*\b|(\|\w?)|\b\w{2}\b/g)
    if (result !== null) result.forEach(element => {
        if (element.startsWith('[')) {
            newElements.push(parseChord(element))
        } else if (element.startsWith('|')) {
            newElements.push(parseWait(element))
        } else {
            console.log(element)
            newElements.push(matchNote(element) ? parseNote(element) : parseNote(convertDrum(element)));
        }
    });
    return newElements;
}

const extractPart = (str: string): { note: string, accidental: string, octave: number, duration: string } => {
    const regex = /([A-Zac-z]{1,3})([b#]?)(\d)(.)/;
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

const convertDuration = (duration: string): number => durationMap.get(duration) || 4;
const convertDrum = (drum: string): string => drumMap.get(drum) + "q" || "";

const getElements = (elements: Array<any>): any => {
    let newElements: any = [];
    elements.forEach(element => {
        if (element.$type === "Playable") {
            // @ts-ignore
            parsePlayable(element.elements).forEach((e: any) => newElements.push(e));
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
        patterns: getPatterns(model.patterns),
        elements: getElements(model.elements)
    };

    return JSON.stringify(newModel, null, 2);
}
