import { Card, CardValue } from "./card";

export class Hand {
    private readonly cards: Array<Card>
    constructor(cards: Array<Card>) {
        this.cards = cards;
    }

    compareHand(hand: Hand): number {
        const [, rankHandA] = this.getRank();
        const [, rankHandB] = hand.getRank();
        if (rankHandA === rankHandB) {
            const handA = this.getHighestCard()
            const handB = hand.getHighestCard()
            return handA.compareTo(handB)
        }
        return rankHandA > rankHandB ? 1 : -1;
    }

    getHighestCard(): Card {
        let maxCard = this.cards[0];
        this.cards.forEach(card => {
            if (maxCard.compareTo(card) === -1) {
                maxCard = card;
            }
        });

        return maxCard;
    }

    getOccurrence(value: number): boolean {
        const occurrence = new Map();
        for (let card of this.cards) {
            const value = occurrence.get(card.value) || 0
            occurrence.set(card.value, value + 1)
        }

        for (let [, v] of occurrence) {
            if (v === value) {
                return true;
            }
        }

        return false;
    }

    isPair(): boolean {
        return this.getOccurrence(2);
    }

    isThreeOfKind(): boolean {
        return this.getOccurrence(3);
    }

    getRank(): [string, number] {
        if (this.isThreeOfKind()) return ['three of kind', 2]
        if (this.isPair()) return ['pair', 1]

        return ['high card', 0]
    }
}

