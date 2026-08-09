import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

// Clean slate - no initial dummy products
const initialProducts = [];

const defaultCategories = [
  { id: '1', name: 'Smartphones' },
  { id: '2', name: 'Accessories' }
];

export const ProductsProvider = ({ children }) => {
  // Products state with localStorage persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('masha_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved products, loading defaults.', e);
      }
    }
    return initialProducts;
  });

  // Categories state with localStorage persistence
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('masha_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved categories, loading defaults.', e);
      }
    }
    return defaultCategories;
  });

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('masha_products', JSON.stringify(products));
  }, [products]);

  // Sync categories to localStorage
  useEffect(() => {
    localStorage.setItem('masha_categories', JSON.stringify(categories));
  }, [categories]);

  // Products CRUD handlers
  const addProduct = (product) => {
    setProducts((prev) => [
      {
        ...product,
        id: Date.now(),
        inStock: product.stock > 0
      },
      ...prev
    ]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...updatedProduct, inStock: updatedProduct.stock > 0 } : p))
    );
  };

  // Categories CRUD handlers
  const addCategory = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    // Check if category name already exists (case-insensitive)
    const exists = categories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      alert('Category already exists.');
      return;
    }

    const newCat = {
      id: Date.now().toString(),
      name: trimmedName
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id) => {
    const categoryToDelete = categories.find((c) => c.id === id);
    if (categoryToDelete) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      // Reset matching products' category to an empty string to keep page dynamic and error-free
      setProducts((prev) =>
        prev.map((p) => (p.category === categoryToDelete.name ? { ...p, category: '' } : p))
      );
    }
  };

  const updateCategory = (id, newName) => {
    const trimmedName = newName.trim();
    if (!trimmedName) return;

    // Check if name is already taken by another category
    const exists = categories.some(c => c.id !== id && c.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      alert('Another category with this name already exists.');
      return;
    }

    const oldCategory = categories.find((c) => c.id === id);
    if (oldCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: trimmedName } : c))
      );
      // Re-map all products under the old category name to the new category name
      setProducts((prev) =>
        prev.map((p) => (p.category === oldCategory.name ? { ...p, category: trimmedName } : p))
      );
    }
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      addProduct, 
      deleteProduct, 
      updateProduct,
      categories,
      addCategory,
      deleteCategory,
      updateCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
