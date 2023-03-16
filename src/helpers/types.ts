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

export type Foundation = Card[] | null;
