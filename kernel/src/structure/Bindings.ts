import Binding from "./Binding";

class Bindings {
    instrument: string;
    bindings: Binding[];

    constructor(instrument: string, bindings: Binding[]) {
        this.instrument = instrument;
        this.bindings = bindings;
    }
}

export default Bindings;