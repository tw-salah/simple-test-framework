import {Card, compareCard, display} from "../src/card"

describe("card", () => {
    test("card comparison", () => {
        const cardA: Card = {
            value: '2',
            suite: 'H'
        }

        const cardB: Card = {
            value: '3',
            suite: 'H'
        }

        expect(compareCard(cardA, cardB)).toBe(1)
        expect(compareCard(cardB, cardA)).toBe(-1)
        expect(compareCard(cardA, cardA)).toBe(0)
    })

    test("comparing [T, J, Q, K, A]", () => {
        const cardA: Card = {
            value: 'K',
            suite: 'H'
        }

        const cardB: Card = {
            value: '2',
            suite: 'H'
        }

        expect(compareCard(cardA, cardB)).toBe(-1)
    })

    test("display card", () => {
        const cardA: Card = {
            value: '2',
            suite: 'H'
        }

        expect(display(cardA)).toBe('2H')
    })
});
