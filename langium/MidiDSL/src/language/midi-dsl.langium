grammar MidiDsl

entry Music:
    (elements=Element | pattern=Pattern | tempo=Tempo | timeSignature=TimeSignature)*;

NoteEvent:
    'note' pitch+=PITCH duration=DURATION? velocity=VELOCITY? repeat=REPEAT? channel=CHANNEL? sequential=SEQUENTIAL? wait=WAIT? name=ID;

Pattern:
    'pattern' noteEvent+=[NoteEvent] name=ID;

Track:
    'track' track+=[Pattern:ID] name=ID timeSignature=TimeSignature? instrument=INT;

TimeSignature:
    'timeSignature' numerator=INT denominator=INT;

Tempo:
    'tempo' tempo=INT;

Element:
    'element' tempo=Tempo | timeSignature=TimeSignature track+=Track id=ID;




hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal BOOLEAN: 'true' | 'false';
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

terminal NOTE_NAME: (A | B | C | D | E | F | G) (SHARP | FLAT)? ;
terminal DURATION: '1' | '2' | 'd2' | 'dd2' | '4' | '4t' | 'd4' | 'dd4' | '8' | '8t' | 'd8' | 'dd8' | '16' | '16t' | '32' | '64' | '128';
terminal OCTAVE: /[1-8]/;

terminal WAIT: DURATION;
terminal PITCH: NOTE_NAME OCTAVE;
terminal VELOCITY: /[1-9][0-9]? | 100/;
terminal REPEAT: INT;
terminal CHANNEL: INT;
terminal SEQUENTIAL: BOOLEAN;
terminal TICK: INT;

terminal NOTE_EVENT: PITCH+ DURATION? VELOCITY? REPEAT? CHANNEL? SEQUENTIAL? WAIT?;

terminal A: 'a' | 'A' | 'do' | 'DO' | 'Do';
terminal B: 'b' | 'B' | 're' | 'RE' | 'Re';
terminal C: 'c' | 'C' | 'mi' | 'MI' | 'Mi';
terminal D: 'd' | 'D' | 'fa' | 'FA' | 'Fa';
terminal E: 'e' | 'E' | 'sol' | 'SOL' | 'Sol';
terminal F: 'f' | 'F' | 'la' | 'LA' | 'La';
terminal G: 'g' | 'G' | 'si' | 'SI' | 'Si';

terminal SHARP: '#';
terminal FLAT: 'b';
