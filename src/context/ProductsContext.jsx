import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  subscribeToProducts, 
  createProduct, 
  updateProduct as updateProductService, 
  deleteProduct as deleteProductService 
} from '../services/productService';
import { 
  subscribeToCategories, 
  createCategory, 
  updateCategory as updateCategoryService, 
  deleteCategory as deleteCategoryService 
} from '../services/categoryService';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to Firestore Products Collection
    const unsubProducts = subscribeToProducts((data, err) => {
      if (err) {
        console.error('Error fetching real-time products:', err);
        setError(err);
      } else {
        // Normalize products so all public components work smoothly
        const normalized = data.map((p) => {
          const brand = p.brandName || p.brand || '';
          const category = p.categoryName || p.category || '';
          const model = p.model || p.name || '';
          const stockNum = p.stock !== undefined ? Number(p.stock) : 0;
          const inStock = p.stock !== undefined ? stockNum > 0 : (p.inStock !== undefined ? p.inStock : true);
          
          return {
            ...p,
            brand,
            brandName: brand,
            category,
            categoryName: category,
            model,
            name: model,
            stock: stockNum,
            inStock,
            exchangeAvailable: p.exchangeAvailable !== undefined ? p.exchangeAvailable : true,
            storage: (p.storage && p.storage !== 'N/A' && p.storage !== 'None') ? p.storage : '',
            ram: (p.ram && p.ram !== 'N/A' && p.ram !== 'None') ? p.ram : '',
            price: Number(p.price) || 0,
            image: p.image || ''
          };
        });
        setProducts(normalized);
      }
      setLoading(false);
    });

    // Subscribe to Firestore Categories Collection
    const unsubCategories = subscribeToCategories((data, err) => {
      if (err) {
        console.error('Error fetching real-time categories:', err);
      } else {
        setCategories(data);
      }
    });

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  // Products CRUD handlers (delegated to Firestore services)
  const addProduct = async (productData) => {
    return await createProduct(productData);
  };

  const deleteProduct = async (id) => {
    return await deleteProductService(id);
  };

  const updateProduct = async (id, updatedProduct) => {
    return await updateProductService(id, updatedProduct);
  };

  // Categories CRUD handlers (delegated to Firestore services)
  const addCategory = async (name, subBrands = []) => {
    return await createCategory(name, subBrands);
  };

  const deleteCategory = async (id) => {
    return await deleteCategoryService(id);
  };

  const updateCategory = async (id, newName, subBrands = []) => {
    return await updateCategoryService(id, newName, subBrands);
  };

  return (
    <ProductsContext.Provider value={{ 
      products, 
      categories,
      loading,
      error,
      addProduct, 
      deleteProduct, 
      updateProduct,
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

