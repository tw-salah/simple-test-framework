export type Card = {
    value: '2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'T'|'J'|'Q'|'K'|'A';
    suite: string;
}

export const compareCard = (cardA: Card, cardB: Card): number => {
    const possibleValues = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
    const cardBIndex = possibleValues.indexOf(cardB.value);
    const cardAIndex = possibleValues.indexOf(cardA.value);

    if (cardBIndex === cardAIndex) return 0;
    return cardBIndex > cardAIndex ? 1 : -1;
}

export const display = (card: Card): string => `${card.value}${card.suite}`