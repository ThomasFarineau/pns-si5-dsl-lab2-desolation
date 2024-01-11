import {NoteEvent} from "midi-writer-js/build/types/midi-events/note-event";

interface NoteEventElementI {
    noteEvent(): NoteEvent;
}

export default NoteEventElementI;