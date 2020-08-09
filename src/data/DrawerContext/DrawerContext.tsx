import React, { useContext, useState } from 'react';
import { without } from 'lodash';

import { ConfigPages } from '../../types';

interface ProviderProps {
  children?: React.ReactNode;
}

interface CardContextProps {
  pages: ConfigPages[];
  hasPage: (page: ConfigPages) => boolean;
  togglePage: (page: ConfigPages) => void;
}

const Context = React.createContext<CardContextProps>({
  pages: [],
  hasPage: () => false,
  togglePage: () => {},
});

const DrawerContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [pages, setPages] = useState<ConfigPages[]>([]);

  const hasPage = (page?: ConfigPages) =>
    page !== undefined && pages.includes(page);

  const togglePage = (page?: ConfigPages) => {
    if (page === undefined) return;
    if (!ConfigPages[page]) return;
    if (hasPage(page)) {
      setPages(without(pages, page));
    } else {
      setPages([...pages, page]);
    }
  };

  return (
    <Context.Provider
      value={{
        pages,
        hasPage,
        togglePage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
export { DrawerContextProvider };
