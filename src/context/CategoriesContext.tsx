import React, { useCallback, useEffect } from 'react';

const CategoriesContext = React.createContext<
  | {
      categories: CategoryForm[];
      setCategories: (newCategories: CategoryForm[]) => void;
    }
  | undefined
>(undefined);

export function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cat, setCat] = React.useState<CategoryForm[]>([]);

  useEffect(() => {
    const categoriesInSessionStorage = sessionStorage.getItem('categories');
    if (categoriesInSessionStorage) {
      setCategories(JSON.parse(categoriesInSessionStorage) as CategoryForm[]);
    }
  }, []);

  const setCategories = useCallback((newCategories: CategoryForm[]) => {
    setCat(newCategories);
    sessionStorage.setItem('categories', JSON.stringify(newCategories));
  }, []);

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
