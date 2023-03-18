export interface NewDeck {
  deck_id: string;
  remaining: number;
  success: boolean;
  shuffled: boolean;
}

export interface DrawCardResponse {
  deck_id: string;
  remaining: number;
  success: boolean;
  cards: Card[];
}

export interface Card {
  image: string;
  suit: string;
  faceUp: boolean;
  color: string;
  value: number;
}

export interface CardLocation {
  pileType: string | null;
  pileNumber: number | null;
  cardNumber: number | null;
}

export type Foundation = Card[] | null;

export type Pile = "tableaus" | "talon" | "foundations";

export type CardCoordinates =
  | {
      toPileType: string;
      fromPileType: string;
      toPileNumber: number;
      fromPileNumber: number;
      toCardNumber: number | null;
      fromCardNumber: number;
    }
  | false;
