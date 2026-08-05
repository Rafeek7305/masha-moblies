import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import styles from './LatestArrivals.module.css';

// Import phone images to reuse
import iphoneImg from '../../assets/images/iphone15.png';
import s24Img from '../../assets/images/s24ultra.png';
import oneplusImg from '../../assets/images/oneplus12.png';
import nothingImg from '../../assets/images/nothing2.png';

const LatestArrivals = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  const arrivals = [
    {
      id: 101,
      brand: 'Xiaomi',
      model: 'Xiaomi 14 Ultra',
      price: 99999,
      storage: '512GB',
      tag: 'Leica Optics',
      image: s24Img, // reuse premium image
    },
    {
      id: 102,
      brand: 'Motorola',
      model: 'Edge 50 Ultra',
      price: 54999,
      storage: '512GB',
      tag: 'Wooden Back',
      image: oneplusImg,
    },
    {
      id: 103,
      brand: 'Realme',
      model: 'Realme GT 6',
      price: 40999,
      storage: '256GB',
      tag: 'AI Features',
      image: nothingImg,
    },
    {
      id: 104,
      brand: 'Apple',
      model: 'iPhone 15 Plus',
      price: 79999,
      storage: '128GB',
      tag: 'A16 Bionic',
      image: iphoneImg,
    },
    {
      id: 105,
      brand: 'Nothing',
      model: 'Nothing Phone (2a)',
      price: 23999,
      storage: '256GB',
      tag: 'Co-Branded',
      image: nothingImg,
    },
  ];

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

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
          <div>
            <span className={styles.tag}>Fresh In Store</span>
            <h2 className={styles.title}>Latest Arrivals</h2>
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
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.itemTag}>{item.tag}</span>
                  <span className={styles.exchangeBadge}>
                    <FiRefreshCw /> Exchange Ok
                  </span>
                </div>
                
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.model} className={styles.cardImg} />
                </div>

                <div className={styles.cardBody}>
                  <span className={styles.brandName}>{item.brand}</span>
                  <h3 className={item.model.length > 15 ? styles.longModelName : styles.modelName}>{item.model}</h3>
                  <div className={styles.specs}>{item.storage} | Dual SIM</div>
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
