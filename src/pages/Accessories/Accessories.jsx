import React from 'react';
import { FiInbox } from 'react-icons/fi';
import styles from './AccessoriesPage.module.css';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const AccessoriesPage = () => {
  const { products } = useProducts();

  // Filter only accessories
  const accessories = products.filter(product => product.category === 'Accessories');

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
        {accessories.length === 0 ? (
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
