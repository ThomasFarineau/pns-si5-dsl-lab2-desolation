grammar MusicML

entry Model:
    name=Name
    notation=Notation
    (patterns+=Pattern)*
    (elements+=MusicElement)*;

Name:
    'name' value=STRING;

Notation:
    'notation' value=(NOTATION_LATIN | NOTATION_ENGLISH | NOTATION_GERMAN);

Tempo:
    'tempo' value=INT;

Signature:
    'signature' numerator=INT '/' denominator=INT;

Instrument:
    'instrument' value=ID;

Channel:
    'channel' value=INT;

Track:
    'track' '{'
        instrument=Instrument
        (channel=Channel)?
        (patterns+=Pattern)*
        (elements+=TrackElement)*
    '}';

Pattern:
    'pattern' name=ID '{'
        elements+=Playable
    '}';

PatternInvocation:
    'play' repeat=INT Pattern=[Pattern];

MusicElement: Tempo | Signature | Track;

Playable:
    elements+=(NOTE | DRUMKIT_NOTE | SEPARATOR | CHORD_OPENER | CHORD_CLOSER)+;

TrackElement: PatternInvocation | Playable | Tempo | Signature;


terminal NOTATION_ENGLISH: 'english';
terminal NOTATION_LATIN: 'latin';
terminal NOTATION_GERMAN: 'german';

terminal SEPARATOR: '|' NOTE_DURATION?;

terminal DRUMKIT_NOTE_BD: 'bd';
terminal DRUMKIT_NOTE_SD: 'sd';
terminal DRUMKIT_NOTE_CH: 'ch';
terminal DRUMKIT_NOTE_OH: 'oh';
terminal DRUMKIT_NOTE_CC: 'cc';
terminal DRUMKIT_NOTE_RC: 'rc';

terminal DRUMKIT_NOTE: ( DRUMKIT_NOTE_BD | DRUMKIT_NOTE_SD | DRUMKIT_NOTE_CH | DRUMKIT_NOTE_OH | DRUMKIT_NOTE_CC | DRUMKIT_NOTE_RC );

terminal ENGLISH_NOTES: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
terminal LATIN_NOTES: 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si' | 'Ut';
terminal GERMAN_NOTES: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'H';

terminal NOTE_DURATION_BASE: 'w' | 'h' | 'ts' | 'sf' | 's' | 'q' | 'e';
terminal NOTE_DURATION_PLUS: 'dh'|'ddh'|'qt'|'dq'|'ddq'|'et'|'de'|'dde'|'st';
terminal NOTE_DURATION: ( NOTE_DURATION_PLUS | NOTE_DURATION_BASE);
terminal NOTE_OCTAVE: /[0-9]/;
terminal NOTE_A_SHARP: '#';
terminal NOTE_A_FLAT: 'b';
terminal NOTE: (ENGLISH_NOTES | LATIN_NOTES | GERMAN_NOTES) (NOTE_A_SHARP | NOTE_A_FLAT)? NOTE_OCTAVE NOTE_DURATION;
terminal CHORD_OPENER: '[';
terminal CHORD_CLOSER: ']';

hidden terminal WS: /\s+/;

terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;