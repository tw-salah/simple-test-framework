import {Spek} from "../src/spek"
import {AssertError} from "../src/asserts"

describe('test suite reports', () => {
    test('passed, failed, error', () => {
        const spec = new Spek('my describe', (t) => {

            t.test('test 1', () => {
            })

            t.test('test 2', () => {
                throw new Error()
            })

            t.test('test 3', () => {
                throw new AssertError()
            })
        })

        const report = spec.runAllTests()
        const str = report.printAll()

        expect(str).toEqual(
    "my describe\n"
            + "\ttest 1: passed\n"
            + "\ttest 2: error\n"
            + "\ttest 3: failed\n"
        )
    })

    test('nested suite', () => {
        const spec = new Spek('my describe', (t) => {

            t.test('test 1', () => {
            })

            t.describe('nested describe', (t) => {
                t.test('nested test', () => {
                })

                t.describe('nested nested describe', (t) => {
                    t.test('nested nested test', () => {
                    })
                })
            })
        })

        const report = spec.runAllTests()
        const str = report.printAll()

        expect(str).toEqual(
            "my describe\n"
            + "\ttest 1: passed\n"
            + "\tnested describe\n"
            + "\t\tnested test: passed\n"
            + "\t\tnested nested describe\n"
            + "\t\t\tnested nested test: passed\n"
        )
    })


})