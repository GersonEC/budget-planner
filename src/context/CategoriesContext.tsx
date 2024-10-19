import React from 'react';

const CategoriesContext = React.createContext<
  | {
      categories: string[];
      setCategories: (newCategories: string[]) => void;
    }
  | undefined
>(undefined);

export function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cat, setCat] = React.useState<string[]>([]);

  const setCategories = (newCategories: string[]) => {
    setCat(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };
  const value = {
    categories: cat,
    setCategories,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = React.useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
}
