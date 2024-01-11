import TrackElementI from "./TrackElement.i";

abstract class NoteEventElement implements TrackElementI {
    abstract noteEvent(): any;

    type: string;


    protected constructor(type: string) {
        this.type = type;
    }
}

export default NoteEventElement;