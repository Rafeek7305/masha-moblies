import React from 'react';
import { FiInbox } from 'react-icons/fi';
import styles from './AccessoriesPage.module.css';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const AccessoriesPage = () => {
  const { products, loading } = useProducts();

  // Dynamic filter for accessories (matches category names like headset, accessories, audio, charger, cases, etc., or non-smartphone items)
  const accessories = products.filter(product => {
    const cat = (product.category || product.categoryName || '').toLowerCase();
    if (!cat) return true; // show if unassigned or fallback
    
    // Explicit smartphone exclusions
    if (cat.includes('smartphone') || cat.includes('mobile') || cat.includes('phone') && !cat.includes('headphone') && !cat.includes('earphone')) {
      return false;
    }
    
    return true;
  });

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Premium Gear & Extras</span>
          <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>
            Premium Accessories
          </h1>
          <p className={styles.subtitle}>
            Enhance your mobile device with luxury audio gear, high-speed power units, and screen protection.
          </p>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.6)' }}>
            Loading accessories...
          </div>
        ) : accessories.length === 0 ? (
          <div className={styles.emptyState}>
            <FiInbox className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No accessories listed</h3>
            <p className={styles.emptyDesc}>
              No accessories are currently available in the catalog. Check back soon or manage inventory in the admin dashboard.
            </p>
          </div>
        ) : (
          <div className={styles.grid}>
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AccessoriesPage;

