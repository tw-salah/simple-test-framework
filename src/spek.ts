import {Suite} from "./suite"

export class Spek {
    private readonly name: string;
    private readonly fn: (t: Suite) => void;

    constructor(name: string, fn: (t: Suite) => void) {
        this.name = name;
        this.fn = fn;
    }

    runAllTests() {
        const suite = new Suite(this.name, this.fn);
        return suite.runAllTests();
    }
}

