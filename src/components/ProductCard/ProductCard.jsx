import React from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiShoppingCart, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const {
    brand,
    model,
    storage,
    ram,
    price,
    oldPrice,
    discount,
    inStock,
    exchangeAvailable,
    image,
  } = product;

  // Format price helper (Indian Rupees formatting)
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCardClick = () => {
    alert(`Viewing details for ${brand} ${model}`);
  };

  return (
    <motion.div 
      className={`${styles.card} glass`}
      whileHover={{ y: -8, boxShadow: 'var(--glow-primary)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Badges Container */}
      <div className={styles.badgeContainer}>
        {discount && <span className={styles.discountBadge}>{discount}</span>}
        {exchangeAvailable && (
          <span className={styles.exchangeBadge}>
            <FiRefreshCw className={styles.badgeIcon} /> Exchange
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className={styles.stockBadge}>
        {inStock ? (
          <span className={styles.inStock}><FiCheckCircle /> In Stock</span>
        ) : (
          <span className={styles.outOfStock}><FiXCircle /> Out of Stock</span>
        )}
      </div>

      {/* Product Image */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={`${brand} ${model}`} className={styles.productImg} />
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        <span className={styles.brandName}>{brand}</span>
        <h3 className={styles.modelName}>{model}</h3>
        
        {/* Specifications */}
        <div className={styles.specs}>
          <span>{storage}</span>
          <span className={styles.separator}>|</span>
          <span>{ram} RAM</span>
        </div>

        {/* Pricing */}
        <div className={styles.pricing}>
          <span className={styles.currentPrice}>{formatPrice(price)}</span>
          {oldPrice && (
            <span className={styles.originalPrice}>{formatPrice(oldPrice)}</span>
          )}
        </div>

        {/* Action Button */}
        <motion.button 
          className={styles.actionBtn} 
          onClick={handleCardClick}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
