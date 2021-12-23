import { Card } from "../src/card";
import { Hand } from "../src/hand";

describe("Card", () => {
    test("comparing two cards", () => {
        const cardA = Card.create("2H");
        const cardB = Card.create("3H");

        expect(cardA.compareTo(cardB)).toEqual(-1)
    });

    test("comparing two cards [T, J, Q, K, A]", () => {
        const cardA = new Card("J", "H");
        const cardB = new Card("T", "H");

        expect(cardA.compareTo(cardB)).toEqual(1)
        expect(cardA.compareTo(cardA)).toEqual(0)
    });

    test("display Card", () => {
        const cardA = new Card("2", "H");
        expect(cardA.toString()).toEqual("2H")
    })

    test("get highest card in hand", () => {
        const hand = new Hand([
            new Card("5", "C"),
            new Card("4", "H"),
            new Card("A", "D"),
            new Card("T", "S"),
            new Card("K", "H")
        ])

        const highestCard = hand.getHighestCard()
        expect(highestCard.toString()).toEqual("AD")
    })

    test("comparing between 2 hands", () => {

        const handA = new Hand([
            new Card("2", "C"),
            new Card("3", "H"),
            new Card("4", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])


        const handB = new Hand([
            new Card("2", "C"),
            new Card("3", "H"),
            new Card("4", "D"),
            new Card("5", "S"),
            new Card("8", "H")
        ]);

        expect(handA.compareHand(handB)).toEqual(-1)
    })

    test("hand with pair of 2", () => {
        const hand = new Hand([
            new Card("2", "C"),
            new Card("2", "H"),
            new Card("4", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.isPair()).toBeTruthy();
    })

    test("hand without pair", () => {
        const hand = new Hand([
            new Card("9", "C"),
            new Card("2", "H"),
            new Card("4", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.isPair()).toBeFalsy();
    })

    test("hand with three of kind of 3", () => {
        const hand = new Hand([
            new Card("3", "C"),
            new Card("3", "H"),
            new Card("3", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.isThreeOfKind()).toBeTruthy();
    })

    test("compare rank between 2 hands", () => {
        const handA = new Hand([
            new Card("A", "C"),
            new Card("2", "H"),
            new Card("3", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        const handB = new Hand([
            new Card("3", "C"),
            new Card("3", "H"),
            new Card("4", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(handA.compareHand(handB)).toEqual(-1)
    })

    test("get high card rank", () => {
        const hand = new Hand([
            new Card("A", "C"),
            new Card("2", "H"),
            new Card("3", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.getRank()).toEqual(['high card', 0])
    })

    test("get pair rank", () => {
        const hand = new Hand([
            new Card("A", "C"),
            new Card("A", "H"),
            new Card("3", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.getRank()).toEqual(['pair', 1])
    })

    test("get three of a kind rank", () => {
        const hand = new Hand([
            new Card("A", "C"),
            new Card("A", "H"),
            new Card("A", "D"),
            new Card("5", "S"),
            new Card("6", "H")
        ])

        expect(hand.getRank()).toEqual(['three of kind', 2])
    })
});