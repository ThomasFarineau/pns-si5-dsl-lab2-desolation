grammar MidiDsl

entry Music:
    (elements=Element | pattern=Pattern | tempo=Tempo | timeSignature=TimeSignature | name=ID)+ ;

Note:
    'note' pitch=Pitch duration=DURATION? velocity=VELOCITY? repeat=INT? channel=INT? sequential=SEQUENTIAL? name=ID;

Pitch: 
    noteName=NoteName octave=OCTAVE;

NoteName:
    note=(A | B | C | D | E | F | G) accidental=ACCIDENTAL?;

Chord:
    'chord' notes+=Note+;

Pattern:
    'pattern' elements+=(Note | Chord | Wait)+ name=ID;

Track:
    'track'  timeSignature=TimeSignature? instrument=INT Pattern+=Pattern* track+=[Pattern:ID] name=ID;

TimeSignature:
    'timeSignature' numerator=INT denominator=INT;

Tempo:
    'tempo' tempo=INT;

Element:
    'element' (tempo=Tempo | timeSignature=TimeSignature | track+=Track)* id=ID;

Wait:
    '|' wait=WAIT;




hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal BOOLEAN: 'true' | 'false';
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

terminal NOTE: (A | B | C | D | E | F | G);
terminal DURATION: 'q' | 'w' | 'h' | 'e' | 's';
terminal OCTAVE: /[1-8]/;

terminal WAIT: DURATION;
terminal VELOCITY: /[1-9][0-9]? | 100/;
terminal SEQUENTIAL: BOOLEAN;
terminal TICK: INT;

terminal ACCIDENTAL: SHARP | FLAT;

terminal A: 'a' | 'A' | 'do' | 'DO' | 'Do';
terminal B: 'b' | 'B' | 're' | 'RE' | 'Re';
terminal C: 'c' | 'C' | 'mi' | 'MI' | 'Mi';
terminal D: 'd' | 'D' | 'fa' | 'FA' | 'Fa';
terminal E: 'e' | 'E' | 'sol' | 'SOL' | 'Sol';
terminal F: 'f' | 'F' | 'la' | 'LA' | 'La';
terminal G: 'g' | 'G' | 'si' | 'SI' | 'Si';

terminal SHARP: '#';
terminal FLAT: 'b';
