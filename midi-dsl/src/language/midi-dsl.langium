grammar MidiDsl

entry Model:
    name=Name
    notation=Notation
    (elements+=MusicElement)*;

Name:
    'name:' value=STRING;

Notation:
    'notation:' value=(NOTATION_LATIN | NOTATION_ENGLISH | NOTATION_GERMAN | NOTATION_SLAVS);

Tempo:
    'tempo:' value=INT;

Signature:
    'signature:' numerator=INT '/' denominator=INT;

Instrument:
    'instrument:' value=ID;

Track:
    'track' '{'
        instrument=Instrument
        (patterns+=Pattern)*
        (elements+=TrackElement)*
    '}';

Pattern:
    'pattern' name=ID '{'
        elements+=Playable
    '}';

PatternInvocation:
    'play:' repeat=INT Pattern=[Pattern];

MusicElement: Tempo | Signature | Track;

Playable:
    elements+=(NOTE | DRUMKIT_NOTE | SEPARATOR | CHORD_OPENENER | CHORD_CLOSER)+;

TrackElement: PatternInvocation | Playable;


terminal NOTATION_ENGLISH: 'english';
terminal NOTATION_LATIN: 'latin';
terminal NOTATION_GERMAN: 'german';
terminal NOTATION_SLAVS: 'slavs';

terminal SEPARATOR: '|';

terminal DRUMKIT_NOTE_BD: 'bd';
terminal DRUMKIT_NOTE_SD: 'sd';
terminal DRUMKIT_NOTE_CH: 'ch';
terminal DRUMKIT_NOTE_OH: 'oh';
terminal DRUMKIT_NOTE_CC: 'cc';
terminal DRUMKIT_NOTE_RC: 'rc';

terminal DRUMKIT_NOTE: ( DRUMKIT_NOTE_BD | DRUMKIT_NOTE_SD | DRUMKIT_NOTE_CH | DRUMKIT_NOTE_OH | DRUMKIT_NOTE_CC | DRUMKIT_NOTE_RC );

terminal ENGLISH_NOTES: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
terminal LATIN_NOTES: 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';
terminal SLAVS_NOTES: 'Ut' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';
terminal GERMAN_NOTES: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'H';

terminal NOTE_DURATION: 'w' | 'h' | 'q' | 'e' | 's';
terminal NOTE_OCTAVE: /[0-9]/;
terminal NOTE_A_SHARP: '#';
terminal NOTE_A_FLAT: 'b';
terminal NOTE: (ENGLISH_NOTES | LATIN_NOTES | SLAVS_NOTES | GERMAN_NOTES) (NOTE_A_SHARP | NOTE_A_FLAT)? NOTE_OCTAVE NOTE_DURATION;
terminal CHORD_OPENENER: '[';
terminal CHORD_CLOSER: ']';

hidden terminal WS: /\s+/;

terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;