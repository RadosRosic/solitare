import { NewDeck, DrawCardResponse, Card } from "./types";

export const getNewDeck = async (): Promise<NewDeck> => {
  const response = await fetch("https://deckofcardsapi.com/api/deck/new/");
  const deck = await response.json();
  return deck;
};

export const drawCard = async (
  deckId: string,
  amountOfCards: number
): Promise<DrawCardResponse> => {
  const response = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${amountOfCards}`
  );
  const card = await response.json();
  return card;
};

export const formTabealu = async (cards: Card[]): Promise<Card[][]> => {
  const tabealuPiles = [];
  tabealuPiles.push(cards.slice(0, 1));
  tabealuPiles.push(cards.slice(1, 3));
  tabealuPiles.push(cards.slice(3, 6));
  tabealuPiles.push(cards.slice(6, 10));
  tabealuPiles.push(cards.slice(10, 15));
  tabealuPiles.push(cards.slice(15, 21));
  tabealuPiles.push(cards.slice(21, 28));

  return tabealuPiles;
};

export const flipTabealuCards = async (tabealuPiles: Card[][]) => {
  const tabealuPilesCopy = [...tabealuPiles];
  tabealuPilesCopy.forEach(
    (tabealuPile) => (tabealuPile.at(-1)!.faceUp = true)
  );

  return tabealuPilesCopy;
};

export const formStock = async (cards: Card[]): Promise<Card[]> => {
  const stock = cards.slice(28);
  return stock;
};

const formatCardValue = (cardValue: string | number) => {
  switch (cardValue) {
    case "KING":
      return 13;
    case "QUEEN":
      return 12;
    case "JACK":
      return 11;
    case "ACE":
      return 1;
    default:
      return +cardValue;
  }
};

const addCardColor = (suit: string) => {
  if (suit === "HEARTS" || suit === "DIAMONDS") {
    return "RED";
  } else {
    return "BLACK";
  }
};

export const addCardProperties = (drawnCards: Card[]) => {
  const cardWithFormattedProperties = drawnCards.map((drawnCard) => ({
    image: drawnCard.image,
    suit: drawnCard.suit,
    value: formatCardValue(drawnCard.value),
    color: addCardColor(drawnCard.suit),
    faceUp: false,
  }));

  return cardWithFormattedProperties;
};
