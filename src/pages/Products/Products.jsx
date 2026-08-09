import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiInbox } from 'react-icons/fi';
import styles from './Products.module.css';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Products = () => {
  const { products, categories } = useProducts();
  const location = useLocation();
  
  // Extract search query from URL if navigating from search bar
  const queryParams = new URLSearchParams(location.search);
  const urlSearch = queryParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Sync state if URL search query changes
  useEffect(() => {
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('default');
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = 
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
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
            {['All', ...categories.map(c => c.name)].map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilter : ''}`}
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
        {sortedProducts.length === 0 ? (
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
