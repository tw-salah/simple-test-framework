import {createResult, Result} from "./result"
import {AssertError} from "./asserts"
import {TestReport} from "./test-report"

type TestCase = {
    name: string
    fn: () => void
}

export class Suite {
    private readonly testCases: TestCase[];
    private readonly name: string;
    private readonly fn: (t: Suite) => void;
    private readonly beforeEachFn: [() => unknown]
    private readonly afterEachFn: [() => unknown]
    private readonly nestedSuites: Suite[];
    private readonly parentSuite: Suite | null;

    constructor(name: string, fn: (t: Suite) => void, parent: Suite | null = null) {
        this.name = name;
        this.fn = fn;
        this.testCases = [];
        this.beforeEachFn = [() => {}]
        this.afterEachFn = [() => {}]
        this.nestedSuites = []
        this.parentSuite = parent;
    }

    test(name: string, fn: () => unknown): this {
        this.testCases.push({ name, fn });
        return this;
    }

    beforeEach(fn: () => unknown): this {
        this.beforeEachFn.push(fn);
        return this
    }

    afterEach(fn: () => unknown): this {
        this.afterEachFn.push(fn);
        return this
    }

    describe(name: string, fn: (t: Suite) => unknown): this {
        this.nestedSuites.push(new Suite(name, fn, this))
        return this;
    }

    private runAllBeforeEach(suit: Suite | null) {
        if (suit !== null) {
            this.runAllBeforeEach(suit.parentSuite)
            suit.beforeEachFn.forEach(fn => fn())
        }
    }

    private runAllAfterEach(suite: Suite | null, errors: unknown[] = []): unknown[] {

        if (suite !== null) {
            suite.afterEachFn.forEach(fn => {
                try {
                    fn()
                } catch (e) {
                    errors.push(e)
                }
            })

            this.runAllAfterEach(suite.parentSuite, errors)
        }

        return errors;
    }

    runAllTests(): TestReport {

        // execute the setup block
        this.fn(this);

        const results: Result[] = this.testCases.map((t) => {

            let errors: unknown[] = [];
            let fails: AssertError[] = [];
            try {

                // execute all before each blocks
                this.runAllBeforeEach(this)
                // execute the test
                t.fn()
            } catch (e) {
                if (e instanceof AssertError) {
                    fails = [e];
                } else {
                    errors = [e];
                }
            }

            // execute all after each blocks
            this.runAllAfterEach(this, errors)
            return createResult(t.name, errors, fails)
        })

        // repeat again for nested suites
        const nestedSuitesResults = this.nestedSuites.map(s => s.runAllTests())

        return new TestReport(
            this.name,
            results,
            nestedSuitesResults
        )
    }
}


