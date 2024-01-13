



export class Instrument {
    name: string;
    midiNumber: number;
    channel: number;

    constructor(name: string, midiNumber: number, channel: number) {
        this.name = name;
        this.midiNumber = midiNumber;
        this.channel = channel;
    }

    static get(name: string): Instrument {
        let instrument = instrumentMidiMap.get(name);
        return instrument ? new Instrument(instrument.name, instrument.midiNumber, instrument.channel) : new Instrument(name, -1, -1);
    }
}

const instrumentMidiMap = new Map<string, Instrument>([
    ["drumkit", new Instrument("Standart Drum Kit", -1, 10)],
    // Piano
    ["acoustic_grand_piano", new Instrument("Acoustic Grand Piano", 0, 1)],
    ["bright_acoustic_piano", new Instrument("Bright Acoustic Piano", 1, 1)],
    ["electric_grand_piano", new Instrument("Electric Grand Piano", 2, 1)],
    ["honky_tonk_piano", new Instrument("Honky Tonk Piano", 3,1)],
    ["electric_piano_1", new Instrument("Electric Piano 1", 4, 1)],
    ["electric_piano_2", new Instrument("Electric Piano 2", 5, 1)],
    ["harpsichord", new Instrument("Harpsichord", 6, 1)],
    ["clavinet", new Instrument("Clavinet", 7,1)],
    // Chromatic Percussion
    ["celesta", new Instrument("Celesta", 8, 1)],
    ["glockenspiel", new Instrument("Glockenspiel", 9, 1)],
    ["music_box", new Instrument("Music Box", 10, 1)],
    ["vibraphone", new Instrument("Vibraphone", 11, 1)],
    ["marimba", new Instrument("Marimba", 12, 1)],
    ["xylophone", new Instrument("Xylophone", 13, 1)],
    ["tubular_bells", new Instrument("Tubular Bells", 14, 1)],
    ["dulcimer", new Instrument("Dulcimer", 15, 1)],
    // Organ
    ["drawbar_organ", new Instrument("Drawbar Organ", 16, 1)],
    ["percussive_organ", new Instrument("Percussive Organ", 17, 1)],
    ["rock_organ", new Instrument("Rock Organ", 18, 1)],
    ["church_organ", new Instrument("Church Organ", 19, 1)],
    ["reed_organ", new Instrument("Reed Organ", 20, 1)],
    ["accordion", new Instrument("Accordion", 21, 1)],
    ["harmonica", new Instrument("Harmonica", 22, 1)],
    ["tango_accordion", new Instrument("Tango Accordion", 23, 1)],
    // Guitar
    ["nylon_acoustic_guitar", new Instrument("Nylon Acoustic Guitar", 24, 1)],
    ["steel_acoustic_guitar", new Instrument("Steel Acoustic Guitar", 25, 1)],
    ["jazz_electric_guitar", new Instrument("Jazz Electric Guitar", 26, 1)],
    ["clean_electric_guitar", new Instrument("Clean Electric Guitar", 27, 1)],
    ["muted_electric_guitar", new Instrument("Muted Electric Guitar", 28, 1)],
    ["overdrive_guitar", new Instrument("Overdrive Guitar", 29, 1)],
    ["distorted_guitar", new Instrument("Distorted Guitar", 30, 1)],
    ["guitar_harmonics", new Instrument("Guitar Harmonics", 31, 1)],
    // Bass
    ["acoustic_bass", new Instrument("Acoustic Bass", 32, 1)],
    ["electric_fingered_bass", new Instrument("Electric Fingered Bass", 33, 1)],
    ["electric_picked_bass", new Instrument("Electric Picked Bass", 34, 1)],
    ["fretless_bass", new Instrument("Fretless Bass", 35, 1)],
    ["slap_bass_1", new Instrument("Slap Bass 1", 36, 1)],
    ["slap_bass_2", new Instrument("Slap Bass 2", 37, 1)],
    ["synth_bass_1", new Instrument("Synth Bass 1", 38, 1)],
    ["synth_bass_2", new Instrument("Synth Bass 2", 39, 1)],
    // Strings/Orchestra
    ["violin", new Instrument("Violin", 40, 1)],
    ["viola", new Instrument("Viola", 41, 1)],
    ["cello", new Instrument("Cello", 42, 1)],
    ["contrabass", new Instrument("Contrabass", 43, 1)],
    ["tremolo_strings", new Instrument("Tremolo Strings", 44, 1)],
    ["pizzicato_strings", new Instrument("Pizzicato Strings", 45, 1)],
    ["orchestral_harp", new Instrument("Orchestral Harp", 46, 1)],
    ["timpani", new Instrument("Timpani", 47, 1)],
    // Ensemble
    ["string_ensemble_1", new Instrument("String Ensemble 1", 48, 1)],
    ["string_ensemble_2_slow", new Instrument("String Ensemble 2 (Slow)", 49, 1)],
    ["synth_strings_1", new Instrument("Synth Strings 1", 50, 1)],
    ["synth_strings_2", new Instrument("Synth Strings 2", 51, 1)],
    ["choir_aahs", new Instrument("Choir Aahs", 52, 1)],
    ["voice_oohs", new Instrument("Voice Oohs", 53, 1)],
    ["syn_choir", new Instrument("Syn Choir", 54, 1)],
    ["orchestral_hit", new Instrument("Orchestral Hit", 55, 1)],
    // Brass
    ["trumpet", new Instrument("Trumpet", 56, 1)],
    ["trombone", new Instrument("Trombone", 57, 1)],
    ["tuba", new Instrument("Tuba", 58, 1)],
    ["muted_trumpet", new Instrument("Muted Trumpet", 59, 1)],
    ["french_horn", new Instrument("French Horn", 60, 1)],
    ["brass_section", new Instrument("Brass Section", 61, 1)],
    ["syn_brass_1", new Instrument("Syn Brass 1", 62, 1)],
    ["syn_brass_2", new Instrument("Syn Brass 2", 63, 1)],
    // Reed
    ["soprano_sax", new Instrument("Soprano Sax", 64, 1)],
    ["alto_sax", new Instrument("Alto Sax", 65, 1)],
    ["tenor_sax", new Instrument("Tenor Sax", 66, 1)],
    ["baritone_sax", new Instrument("Baritone Sax", 67, 1)],
    ["oboe", new Instrument("Oboe", 68, 1)],
    ["english_horn", new Instrument("English Horn", 69, 1)],
    ["bassoon", new Instrument("Bassoon", 70, 1)],
    ["clarinet", new Instrument("Clarinet", 71, 1)],
    // Pipe
    ["piccolo", new Instrument("Piccolo", 72, 1)],
    ["flute", new Instrument("Flute", 73, 1)],
    ["recorder", new Instrument("Recorder", 74, 1)],
    ["pan_flute", new Instrument("Pan Flute", 75, 1)],
    ["bottle_blow", new Instrument("Bottle Blow", 76, 1)],
    ["shakuhachi", new Instrument("Shakuhachi", 77, 1)],
    ["whistle", new Instrument("Whistle", 78, 1)],
    ["ocarina", new Instrument("Ocarina", 79, 1)],
    // Synth Lead
    ["synth_square_wave", new Instrument("Synth Square Wave", 80, 1)],
    ["synth_sawtooth_wave", new Instrument("Synth Sawtooth Wave", 81, 1)],
    ["synth_calliope", new Instrument("Synth Calliope", 82, 1)],
    ["synth_chiff", new Instrument("Synth Chiff", 83, 1)],
    ["synth_charang", new Instrument("Synth Charang", 84, 1)],
    ["synth_voice", new Instrument("Synth Voice", 85, 1)],
    ["synth_fifths_sawtooth_wave", new Instrument("Synth Fifths Sawtooth Wave", 86, 1)],
    ["synth_brass_and_lead", new Instrument("Synth Brass & Lead", 87, 1)],
    // Synth Pad
    ["new_age_synth_pad", new Instrument("New Age Synth Pad", 88, 1)],
    ["warm_synth_pad", new Instrument("Warm Synth Pad", 89, 1)],
    ["polysynth_synth_pad", new Instrument("Polysynth th Pad", 90, 1)],
    ["choir_synth_pad", new Instrument("Choir Synth Pad", 91, 1)],
    ["bowed_synth_pad", new Instrument("Bowed Synth Pad", 92, 1)],
    ["metal_synth_pad", new Instrument("Metal Synth Pad", 93, 1)],
    ["halo_synth_pad", new Instrument("Halo Synth Pad", 94, 1)],
    ["sweep_synth_pad", new Instrument("Sweep Synth Pad", 95, 1)],
    // Synth Effects
    ["sfx_rain", new Instrument("SFX Rain", 96, 1)],
    ["sfx_soundtrack", new Instrument("SFX Soundtrack", 97, 1)],
    ["sfx_crystal", new Instrument("SFX Crystal", 98, 1)],
    ["sfx_atmosphere", new Instrument("SFX Atmosphere", 99, 1)],
    ["sfx_brightness", new Instrument("SFX Brightness", 100, 1)],
    ["sfx_goblins", new Instrument("SFX Goblins", 101, 1)],
    ["sfx_echoes", new Instrument("SFX Echoes", 102, 1)],
    ["sfx_sci_fi", new Instrument("SFX Sci-fi", 103, 1)],
    // Ethnic
    ["sitar", new Instrument("Sitar", 104, 1)],
    ["banjo", new Instrument("Banjo", 105, 1)],
    ["shamisen", new Instrument("Shamisen", 106, 1)],
    ["koto", new Instrument("Koto", 107, 1)],
    ["kalimba", new Instrument("Kalimba", 108, 1)],
    ["bag_pipe", new Instrument("Bag Pipe", 109, 1)],
    ["fiddle", new Instrument("Fiddle", 110, 1)],
    ["shanai", new Instrument("Shanai", 111, 1)],
    // Percussive
    ["tinkle_bell", new Instrument("Tinkle Bell", 112, 1)],
    ["agogo", new Instrument("Agogo", 113, 1)],
    ["steel_drums", new Instrument("Steel Drums", 114, 1)],
    ["woodblock", new Instrument("Woodblock", 115, 1)],
    ["taiko_drum", new Instrument("Taiko Drum", 116, 1)],
    ["melodic_tom", new Instrument("Melodic Tom", 117, 1)],
    ["synth_drum", new Instrument("Synth Drum", 118, 1)],
    ["reverse_cymbal", new Instrument("Reverse Cymbal", 119, 1)],
    // Sound Effects
    ["guitar_fret_noise", new Instrument("Guitar Fret Noise", 120, 1)],
    ["breath_noise", new Instrument("Breath Noise", 121, 1)],
    ["seashore", new Instrument("Seashore", 122, 1)],
    ["bird_tweet", new Instrument("Bird Tweet", 123, 1)],
    ["telephone_ring", new Instrument("Telephone Ring", 124, 1)], // Corrected the MIDI number to 124
    ["helicopter", new Instrument("Helicopter", 125, 1)],
    ["applause", new Instrument("Applause", 126, 1)],
    ["gun_shot", new Instrument("Gun Shot", 127, 1)],
]);