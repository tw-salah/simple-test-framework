import {Result} from "./result"

export class TestReport {
    private readonly describeName: string
    private readonly results: Result[]
    private readonly nestedSuitesResults: TestReport[]

    constructor(describe: string, results: Result[], nestedSuitesResults: TestReport[]) {
        this.describeName = describe;
        this.results = results;
        this.nestedSuitesResults = nestedSuitesResults;
    }

    printAll(indent = '') {
        let str = ''
        str += `${indent}${this.describeName}\n`
        this.results.forEach(r => {
            switch (r.tagged) {
                case "passed": str += `${indent}\t${r.name}: passed\n`; break;
                case "failed": str += `${indent}\t${r.name}: failed\n`; break;
                case "exception": str += `${indent}\t${r.name}: error\n`; break;
            }
        })

        this.nestedSuitesResults.forEach(n => {
            str += n.printAll(`${indent}\t`);
        })

        return str;
    }
}