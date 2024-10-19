import React from 'react';

const CategoriesContext = React.createContext<
  | {
      categories: string[];
      setCategories: React.Dispatch<React.SetStateAction<string[]>>;
    }
  | undefined
>(undefined);

export function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = React.useState<string[]>([]);

  const value = { categories, setCategories };

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
