import {Spek} from "../src/spek"

describe('Spek', () => {
    test('using spec', () => {

        let x: string[] = []
        const spec = new Spek('describe', (t) => {
            x = ['init']
            t.beforeEach(() => {
                x.push('before each')
            })

            t.test('test 1', () => {
                x.push('test 1')
            })

            t.test('test 2', () => {
                x.push('test 2')
            })

            t.afterEach(() => {
                x.push('after each')
            })
        })

        spec.runAllTests()
        expect(x).toEqual([
            'init',
            'before each', 'test 1', 'after each',
            'before each', 'test 2', 'after each'
        ])
    })

    test('nested spec', () => {

        let x: string[] = []
        const spec = new Spek('describe', (t) => {
            x = ['init']
            t.beforeEach(() => {
                x.push('before each')
            })

            t.test('test 1', () => {
                x.push('test 1')
            })

            t.test('test 2', () => {
                x.push('test 2')
            })

            t.afterEach(() => {
                x.push('after each')
            })

            t.describe('nested description', (t) => {
                t.beforeEach(() => {
                    x.push('nested before each')
                })

                t.test('test 1', () => {
                    x.push('nested test 1')
                })

                t.test('test 2', () => {
                    x.push('nested test 2')
                })

                t.afterEach(() => {
                    x.push('nested after each')
                })
            })
        })

        spec.runAllTests()
        expect(x).toEqual([
            'init',
            'before each', 'test 1', 'after each',
            'before each', 'test 2', 'after each',
            'before each', 'nested before each', 'nested test 1', 'nested after each', 'after each',
            'before each', 'nested before each', 'nested test 2', 'nested after each', 'after each',
        ])
    })

    describe('error handling', () => {
        test('error in before each, skips test but not after each', () => {
            let x: string[] = []
            const spec = new Spek('describe', (t) => {
                x = ['init']
                t.beforeEach(() => {
                    x.push('before each')
                    throw new Error('something bad happened')
                })

                t.test('test 1', () => {
                    x.push('test 1')
                })

                t.afterEach(() => {
                    x.push('after each')
                })
            })

            spec.runAllTests()

            // even error happened, after each block still executes
            expect(x).toEqual([
                'init',
                'before each', 'after each',
            ])
        })

        test('error in test, after each still executes', () => {

            let x: string[] = []
            const spec = new Spek('describe', (t) => {
                x = ['init']
                t.beforeEach(() => {
                    x.push('before each')
                })

                t.test('test 1', () => {
                    x.push('test 1')
                    throw new Error('something bad happened')
                })

                t.afterEach(() => {
                    x.push('after each')
                })
            })

            spec.runAllTests()

            // even error happened, after each block still executes
            expect(x).toEqual([
                'init',
                'before each', 'test 1', 'after each',
            ])
        })

        test('error in after each, other after each block still executes', () => {

            let x: string[] = []
            const spec = new Spek('describe', (t) => {
                x = ['init']
                t.beforeEach(() => {
                    x.push('before each')
                })

                t.test('test 1', () => {
                    x.push('test 1')
                })

                t.afterEach(() => {
                    x.push('after each 1')
                    throw new Error('something bad happened')
                })

                t.afterEach(() => {
                    x.push('after each 2')
                    throw new Error('something bad happened')
                })
            })

            spec.runAllTests()

            // even error happened, other after each blocks still execute
            expect(x).toEqual([
                'init',
                'before each', 'test 1', 'after each 1', 'after each 2',
            ])
        })

    })
})