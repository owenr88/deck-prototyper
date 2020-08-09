const IMPORTED_OWN_CARDS = 'deck-prototyper-imported-own-cards';

export const getHasImportedOwnCards = (): boolean => {
  const data = localStorage.getItem(IMPORTED_OWN_CARDS);
  if (!data) return false;
  return JSON.parse(data) as boolean;
};

export const saveHasImportedOwnCards = (value: boolean): void => {
  return localStorage.setItem(IMPORTED_OWN_CARDS, JSON.stringify(value));
};
