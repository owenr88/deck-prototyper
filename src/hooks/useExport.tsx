import React, { useContext, useState } from 'react';

import DataContext from '../data/DataContext';

interface UseExportOutput {
  exportData: () => Promise<void>;
  exporting: boolean;
}

/**
 * Hook to export data from the app
 */
const useExport = (): UseExportOutput => {
  const { decks, cards, getCardDeckNames } = useContext(DataContext);
  const [exporting, setExporting] = useState(false);

  const exportData = async () => {
    setExporting(true);
    let decksContent = 'data:text/csv;charset=utf-8,';
    decksContent +=
      ['number', 'title', 'description', 'color'].join(',') + '\n';
    decksContent += decks
      .map((deck) =>
        [deck.number, deck.title, deck.description, deck.color].join(',')
      )
      .join('\n');

    let cardsContent = 'data:text/csv;charset=utf-8,';
    cardsContent +=
      ['numner', 'title', 'body1', 'body1', 'decks'].join(',') + '\n';
    // cardsContent += CardType['props'] // Add the headers
    cardsContent += cards
      .map((card) =>
        [
          card.number,
          card.title,
          card.body1,
          card.body2,
          getCardDeckNames(card?.decks ?? [])
            .filter(Boolean)
            .join(','),
        ].join(',')
      )
      .join('\n');

    const encodedDeckUri = encodeURI(decksContent);
    window.open(encodedDeckUri);
    const encodedCardsUri = encodeURI(cardsContent);
    window.open(encodedCardsUri);
    setExporting(false);
  };

  return { exportData, exporting };
};

export default useExport;
