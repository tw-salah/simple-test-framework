import {Card, compareCard} from "./card"

export const highestCards = (cards: Card[]): Card => {
    const first = cards[0];
    return cards.reduce((c1, c2) => {
        const r = compareCard(c1, c2);
        return (r <= 0) ? c1 : c2;
    }, first);
}

const groupByCardValue = (cards: Card[]): Map<string, Card[]> => {
    const map = new Map<string, Card[]>();
    cards.forEach(card => {
        if (map.has(card.value)) {
            const group = map.get(card.value) || [];
            map.set(card.value, [...group, card])
        } else {
            map.set(card.value, [card])
        }
    })

    return map;
}

const filterGroup = (group: Map<string, Card[]>, occurrence: number): [boolean, Card[]] => {
    for(const [, v] of group.entries()) {
        if (v.length === occurrence) return [true, v];
    }

    return [false, []];
}

export const isPair = (cards: Card[]): [boolean, Card[]] => {
    const map = groupByCardValue(cards);
    return filterGroup(map, 2);
}

export const isThreeOfKind = (cards: Card[]): [boolean, Card[]] => {
    const map = groupByCardValue(cards);
    return filterGroup(map, 3);
}

export const isFourOfKind = (cards: Card[]): [boolean, Card[]] => {
    const map = groupByCardValue(cards);
    return filterGroup(map, 4);
}

export const isFullHouse = (cards: Card[]): [boolean, Card[]] => {
    const group = groupByCardValue(cards);
    const [isPair, pairs] = filterGroup(group, 2);
    const [isThreeOfKind, threes] = filterGroup(group, 3);

    return (isPair && isThreeOfKind)
        ? [true, [...threes, ...pairs]]
        : [false,[]];
}