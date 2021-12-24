import {createResult, Result} from "./result"
import {AssertError} from "./asserts"
import {TestReport} from "./test-report"

type TestCase = {
    name: string
    fn: () => void
}

export class Suite {
    testCases: TestCase[];
    private readonly name: string;
    private readonly fn: (t: Suite) => void;
    private readonly beforeEachFn: [() => void]
    private readonly afterEachFn: [() => void]
    private nestedSuites: Suite[];
    private parentSuite: Suite | null;

    constructor(name: string, fn: (t: Suite) => void, parent: Suite | null = null) {
        this.name = name;
        this.fn = fn;
        this.testCases = [];
        this.beforeEachFn = [() => {}]
        this.afterEachFn = [() => {}]
        this.nestedSuites = []
        this.parentSuite = parent;
    }

    test(name: string, fn: () => void): this {
        this.testCases.push({ name, fn });
        return this;
    }

    beforeEach(fn: () => void): this {
        this.beforeEachFn.push(fn);
        return this
    }

    afterEach(fn: () => void): this {
        this.afterEachFn.push(fn);
        return this
    }

    private runAllBeforeEach() {
        this.beforeEachFn.forEach(fn => fn())
    }

    private runAllAfterEach(): unknown[] {
        let errors: unknown[] = []
        this.afterEachFn.forEach(fn => {
            try {
                fn()
            } catch (e) {
                errors.push(e)
            }
        })

        return errors;
    }

    runAllTests(): TestReport {

        // execute the setup block
        this.fn(this);

        const results: Result[] = this.testCases.map((t) => {

            let error: unknown[] = [];
            let fail: AssertError | null = null;
            try {

                // execute all before each blocks
                this.parentSuite?.runAllBeforeEach()
                this.runAllBeforeEach()

                // execute the test
                t.fn()
            } catch (e) {
                if (e instanceof AssertError) {
                    fail = e;
                } else {
                    error = [e];
                }
            }

            // execute all after each blocks
            const afterEachErrors = this.runAllAfterEach()
            const parentsAfterEachErrors = this.parentSuite?.runAllAfterEach() || []

            const errors = [...error, ...afterEachErrors, ...parentsAfterEachErrors]

            return createResult(t.name, errors, fail)
        })

        // repeat again for nested suites
        const nestedSuitesResults = this.nestedSuites.map(s => s.runAllTests())

        return new TestReport(
            this.name,
            results,
            nestedSuitesResults
        )
    }

    describe(name: string, fn: (t: Suite) => void): this {
        this.nestedSuites.push(new Suite(name, fn, this))
        return this;
    }
}


