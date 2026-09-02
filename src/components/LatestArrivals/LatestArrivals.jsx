import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import styles from './LatestArrivals.module.css';
import { useProducts } from '../../context/ProductsContext';

// Import fallback phone images
import iphoneImg from '../../assets/images/iphone15.png';
import s24Img from '../../assets/images/s24ultra.png';
import oneplusImg from '../../assets/images/oneplus12.png';
import nothingImg from '../../assets/images/nothing2.png';

const fallbackArrivals = [
  {
    id: 'l1',
    brand: 'Xiaomi',
    model: 'Xiaomi 14 Ultra',
    price: 99999,
    storage: '512GB',
    tag: 'Leica Optics',
    image: s24Img,
  },
  {
    id: 'l2',
    brand: 'Motorola',
    model: 'Edge 50 Ultra',
    price: 54999,
    storage: '512GB',
    tag: 'Wooden Back',
    image: oneplusImg,
  },
  {
    id: 'l3',
    brand: 'Realme',
    model: 'Realme GT 6',
    price: 40999,
    storage: '256GB',
    tag: 'AI Features',
    image: nothingImg,
  },
  {
    id: 'l4',
    brand: 'Apple',
    model: 'iPhone 15 Plus',
    price: 79999,
    storage: '128GB',
    tag: 'A16 Bionic',
    image: iphoneImg,
  },
  {
    id: 'l5',
    brand: 'Nothing',
    model: 'Nothing Phone (2a)',
    price: 23999,
    storage: '256GB',
    tag: 'Co-Branded',
    image: nothingImg,
  },
];

const LatestArrivals = () => {
  const { products } = useProducts();
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const arrivals = products.length > 0 ? products.slice(0, 8) : fallbackArrivals;

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [arrivals]);

  const scroll = (direction) => {
    if (carousel.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carousel.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.tag}>Fresh In Store</span>
            <h2 className={styles.title}>Latest Arrivals</h2>
            <p className={styles.subtitle}>Experience the pinnacle of mobile technology.</p>
          </div>
          <div className={styles.navControls}>
            <button onClick={() => scroll('left')} className={styles.controlBtn} aria-label="Previous">
              <FiChevronLeft size={22} />
            </button>
            <button onClick={() => scroll('right')} className={styles.controlBtn} aria-label="Next">
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <motion.div ref={carousel} className={styles.carousel} whileTap={{ cursor: 'grabbing' }}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className={styles.innerCarousel}
          >
            {arrivals.map((item) => (
              <motion.div 
                key={item.id} 
                className={`${styles.card} glass`}
                whileHover={{ scale: 1.04, y: -8 }}
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.itemTag}>{item.productCode || item.tag || 'New Arrival'}</span>
                  {item.exchangeAvailable && (
                    <span className={styles.exchangeBadge}>
                      <FiRefreshCw /> Exchange Ok
                    </span>
                  )}
                </div>
                
                <div className={styles.imageWrapper}>
                  {item.image ? (
                    <img src={item.image} alt={item.model} className={styles.cardImg} />
                  ) : (
                    <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '2rem' }}>No Image</div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.brandName}>{item.brand || item.brandName}</span>
                  <h3 className={(item.model || '').length > 15 ? styles.longModelName : styles.modelName}>{item.model}</h3>
                  {(() => {
                    const isValid = (v) => Boolean(v && v !== 'N/A' && v !== 'None' && String(v).trim() !== '');
                    const st = isValid(item.storage) ? item.storage : '';
                    const rm = isValid(item.ram) ? (String(item.ram).toLowerCase().includes('ram') ? item.ram : `${item.ram} RAM`) : '';
                    if (!st && !rm) return null;
                    return (
                      <div className={styles.specs}>
                        {st} {st && rm ? '| ' : ''}{rm}
                      </div>
                    );
                  })()}
                  <div className={styles.price}>{formatPrice(item.price)}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArrivals;

