import React from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiShoppingCart, FiCheckCircle, FiXCircle, FiArrowRight } from 'react-icons/fi';
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

  const saveAmount = oldPrice && oldPrice > price ? oldPrice - price : 0;

  const isValidSpec = (val) => Boolean(val && val !== 'N/A' && val !== 'None' && String(val).trim() !== '');
  const validStorage = isValidSpec(storage) ? storage : '';
  const validRam = isValidSpec(ram) 
    ? (String(ram).toLowerCase().includes('ram') ? ram : `${ram} RAM`) 
    : '';
  const hasSpecs = Boolean(validStorage || validRam);

  return (
    <motion.div 
      className={`${styles.card} glass`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
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
          <span className={styles.inStock}><span className={styles.pulse}></span> In Stock</span>
        ) : (
          <span className={styles.outOfStock}><span className={styles.pulse}></span> Out of Stock</span>
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
        {hasSpecs && (
          <div className={styles.specs}>
            {validStorage && <span>{validStorage}</span>}
            {validStorage && validRam && <span className={styles.separator}>|</span>}
            {validRam && <span>{validRam}</span>}
          </div>
        )}


        {/* Pricing */}
        <div className={styles.pricing}>
          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>{formatPrice(price)}</span>
            {oldPrice && (
              <span className={styles.originalPrice}>{formatPrice(oldPrice)}</span>
            )}
          </div>
          {saveAmount > 0 && (
            <div className={styles.saveLabel}>
              You Save {formatPrice(saveAmount)}
            </div>
          )}
        </div>

        {/* Action Button */}
        <motion.button 
          className={styles.actionBtn} 
          onClick={handleCardClick}
          whileTap={{ scale: 0.97 }}
        >
          <span>View Details</span>
          <FiArrowRight className={styles.btnIcon} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
