import {Card} from "../src/card"
import {highestCards, isFourOfKind, isFullHouse, isPair, isThreeOfKind} from "../src/hand"

describe('hand', () => {
    test('highest card in hand', () => {
        const hand: Card[] = [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '3',
                suite: 'S'
            },
            {
                value: '8',
                suite: 'C'
            },
            {
                value: '7',
                suite: 'D'
            },
            {
                value: '9',
                suite: 'H'
            }]

            expect(highestCards(hand)).toStrictEqual({
                value: '9',
                suite: 'H'
            });
    })

    test('pair', () => {
        const hand: Card[] = [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '8',
                suite: 'C'
            },
            {
                value: '7',
                suite: 'D'
            },
            {
                value: '9',
                suite: 'H'
            }]

        expect(isPair(hand)).toStrictEqual([true, [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            }
        ]]);
    })

    test('three of kind', () => {
        const hand: Card[] = [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            },
            {
                value: '7',
                suite: 'D'
            },
            {
                value: '9',
                suite: 'H'
            }]

        expect(isThreeOfKind(hand)).toStrictEqual([true, [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            }
        ]]);
    })

    test('three of kind', () => {
        const hand: Card[] = [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            },
            {
                value: '2',
                suite: 'D'
            },
            {
                value: '9',
                suite: 'H'
            }]

        expect(isFourOfKind(hand)).toStrictEqual([true, [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            },
            {
                value: '2',
                suite: 'D'
            }
        ]]);
    })

    test('fullhouse', () => {
        const hand: Card[] = [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            },
            {
                value: '3',
                suite: 'D'
            },
            {
                value: '3',
                suite: 'H'
            }]

        expect(isFullHouse(hand)).toStrictEqual([true, [
            {
                value: '2',
                suite: 'H'
            },
            {
                value: '2',
                suite: 'S'
            },
            {
                value: '2',
                suite: 'C'
            },
            {
                value: '3',
                suite: 'D'
            },
            {
                value: '3',
                suite: 'H'
            }]]);
    })
})