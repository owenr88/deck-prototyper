import React, { useContext, useState } from 'react';
import Papa from 'papaparse';

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

    const decksContent = Papa.unparse(decks);

    const cardsContent = Papa.unparse(
      cards.map((card) => ({
        ...card,
        decks: getCardDeckNames(card?.decks ?? [])
          .filter(Boolean)
          .join(','),
      }))
    );

    const prefix = 'data:text/csv;charset=utf-8,';

    console.log(prefix + decksContent);
    console.log(prefix + cardsContent);

    const encodedDeckUri = encodeURI(prefix + decksContent);
    window.open(encodedDeckUri);
    const encodedCardsUri = encodeURI(prefix + cardsContent);
    window.open(encodedCardsUri);
    setExporting(false);
  };

  return { exportData, exporting };
};

export default useExport;
