const possibleValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"] as const
export type CardValue = typeof possibleValues[number]

type Suite = 'H' | 'C' | 'D' | 'S'
type ValueSuite = `${CardValue}${Suite}`
export class Card {
    private readonly number: CardValue;
    private readonly symbol: Suite;

    static create(v: ValueSuite) {
        const [value, suit] = v.split('')
        return new Card(value as CardValue, suit as Suite);
    }

    constructor(number: CardValue, symbol: Suite) {
        this.number = number;
        this.symbol = symbol;
    }

    public compareTo(card: Card): number {
        const indexA = possibleValues.indexOf(this.number)
        const indexB = possibleValues.indexOf(card.number)

        if (indexA == indexB) return 0
        return indexA > indexB ? 1 : -1
    }

    toString() {
        return `${this.number}${this.symbol}`
    }

    get value() {
        return this.number;
    }
}
