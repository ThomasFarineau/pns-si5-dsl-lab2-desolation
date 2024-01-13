export enum Instrument {
    Piano = 1, Violin = 41, Guitar = 25, Drumkit = 115, Bass = 33
}

export const fromString = (instrument: string): Instrument => {
    switch (instrument.toLowerCase()) {
        case "piano":
            return Instrument.Piano;
        case "violin":
            return Instrument.Violin;
        case "guitar":
            return Instrument.Guitar;
        case "drumkit":
            return Instrument.Drumkit;
        case "bass":
            return Instrument.Bass;
        default:
            return Instrument.Piano;
    }
};
