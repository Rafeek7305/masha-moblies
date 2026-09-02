import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiInbox } from 'react-icons/fi';
import styles from './Products.module.css';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {
  const { products, categories, loading } = useProducts();
  const location = useLocation();
  
  // Extract search query & category query from URL
  const queryParams = new URLSearchParams(location.search);
  const urlSearch = queryParams.get('search') || '';
  const urlCategory = queryParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Sync state if URL query changes
  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlCategory) {
      // Find category matching URL category ID or name
      const matchedCat = categories.find(
        c => c.id === urlCategory || c.name.toLowerCase() === urlCategory.toLowerCase()
      );
      if (matchedCat) {
        setSelectedCategory(matchedCat.name);
      } else {
        setSelectedCategory(urlCategory);
      }
    }
  }, [urlSearch, urlCategory, categories]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const pCat = (product.category || product.categoryName || '').toLowerCase();
    const pBrand = (product.brand || product.brandName || '').toLowerCase();
    const pModel = (product.model || product.name || '').toLowerCase();

    const matchesCategory = 
      selectedCategory === 'All' || 
      pCat === selectedCategory.toLowerCase() ||
      product.categoryId === selectedCategory;

    const matchesSearch = 
      !searchQuery ||
      pModel.includes(searchQuery.toLowerCase()) ||
      pBrand.includes(searchQuery.toLowerCase()) ||
      pCat.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    return 0; // default order
  });

  // Build category list for tabs dynamically from Firestore categories + products
  const categoryTabList = ['All', ...categories.map(c => c.name)];
  // Add any product categories that might not be in categories collection yet
  products.forEach(p => {
    const catName = p.categoryName || p.category;
    if (catName && !categoryTabList.some(c => c.toLowerCase() === catName.toLowerCase())) {
      categoryTabList.push(catName);
    }
  });

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Premium Showroom Catalog</span>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>
            Devices Collection
          </h1>
          <p className={styles.subtitle}>
            Explore our curated premium selection of flagship smartphones and accessories. Fully dynamic, updated live.
          </p>
        </div>

        {/* Search, Filter, Sort Controls */}
        <div className={styles.controlsRow}>
          {/* Category Tabs */}
          <div className={styles.filterTabs}>
            {categoryTabList.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory.toLowerCase() === cat.toLowerCase() ? styles.activeFilter : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Search & Sort group */}
          <div className={styles.searchSortGroup}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search catalog..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.6)' }}>
            Loading products...
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <FiInbox className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No matching items</h3>
            <p className={styles.emptyDesc}>
              We couldn't find any products matching your search or filters. Try adjusting your search query or reset parameters.
            </p>
            <button className={styles.resetBtn} onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

