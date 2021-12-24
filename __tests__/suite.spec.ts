import {Suite} from "../src/suite"

describe('Suite', () => {
    test('testCase', () => {
        let a = ['init'];
        const d  = new Suite('describe test', () => {})
            .test('first', () => {
                a = [...a, 'test'];
            })

        d.runAllTests()
        expect(a).toEqual(['init', 'test'])
    })

    test('beforeEach', () => {
        let a = ['init'];
        const d  = new Suite('describe test', () => {})
            .beforeEach(() => {
                a = [...a, 'before each']
            })
            .test('first', () => {
                a = [...a, 'test 1'];
            })
            .test('second', () => {
                a = [...a, 'test 2'];
            })
            .afterEach(() => {
                a = [...a, 'after each']
            })

        d.runAllTests()
        expect(a).toEqual([
            'init',
            'before each', 'test 1', 'after each',
            'before each', 'test 2', 'after each'
        ])
    })
})