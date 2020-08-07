export enum ConfigPages {
  DECKS,
  DATA,
  SETTINGS,
}

export interface CardType {
  number: number;
  title?: string;
  body1?: string;
  body2?: string;
  decks: number[];
}

export interface DeckType {
  number: number;
  title: string;
  description: string;
  color?: string;
}
