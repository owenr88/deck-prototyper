import { useContext, useState } from 'react';
import Papa from 'papaparse';

import DataContext from '../data/DataContext';
import { CardDecks } from '../types';

interface UseExportOutput {
  exportData: () => Promise<void>;
  exporting: boolean;
}

/**
 * Take the deck Ids and transform them into a string
 * @param deckData
 * @param getCardDeckNames
 */
const transformCardDecksToString = (
  deckData: CardDecks,
  getCardDeckNames: (decks: number[]) => string[]
) => {
  return Object.keys(deckData)
    .map((deckId) => {
      const total = deckData[parseInt(deckId)];
      const [name] = getCardDeckNames([parseInt(deckId)]);
      if (!name) return '';
      return `${name}|${total}`;
    })
    .filter(Boolean)
    .join(',');
};

/**
 * Hook to export data from the app
 */
const useExport = (): UseExportOutput => {
  const { cards, getCardDeckNames } = useContext(DataContext);
  const [exporting, setExporting] = useState(false);

  const exportData = async () => {
    setExporting(true);

    // const decksContent = Papa.unparse(decks);

    const cardsContent = Papa.unparse(
      cards.map((card) => ({
        ...card,
        decks: transformCardDecksToString(card.decks, getCardDeckNames),
      }))
    );

    const prefix = 'data:text/csv;charset=utf-8,';

    // const encodedDeckUri = encodeURI(prefix + decksContent);
    // window.open(encodedDeckUri);
    const encodedCardsUri = encodeURI(prefix + cardsContent);
    window.open(encodedCardsUri);
    setExporting(false);
  };

  return { exportData, exporting };
};

export default useExport;
