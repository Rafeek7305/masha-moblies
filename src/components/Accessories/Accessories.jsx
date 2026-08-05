import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Accessories.module.css';

// Import accessories images
import headphonesImg from '../../assets/images/headphones.png';
import earbudsImg from '../../assets/images/earbuds.png';
import chargerImg from '../../assets/images/charger.png';
import smartwatchImg from '../../assets/images/smartwatch.png';
import phoneCaseImg from '../../assets/images/iphone15.png'; // Reused for cases representation

const Accessories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Headphones', desc: 'Premium Over-Ear Sound', img: headphonesImg, link: '/accessories' },
    { name: 'Earbuds', desc: 'True Wireless Audio', img: earbudsImg, link: '/accessories' },
    { name: 'Chargers', desc: 'High Speed Fast Adapters', img: chargerImg, link: '/accessories' },
    { name: 'Power Banks', desc: 'Backup Energy On the Go', img: chargerImg, link: '/accessories' },
    { name: 'Cases', desc: 'Luxury Shells & Covers', img: phoneCaseImg, link: '/accessories' },
    { name: 'Tempered Glass', desc: '9H Screen Protection', img: phoneCaseImg, link: '/accessories' },
    { name: 'Bluetooth Speakers', desc: 'Loud Outdoor Sound', img: headphonesImg, link: '/accessories' },
    { name: 'Smart Watches', desc: 'Wearable Tech & Trackers', img: smartwatchImg, link: '/accessories' },
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.tag}>Essential Gear</span>
          <h2 className={styles.title}>Premium Accessories</h2>
          <p className={styles.subtitle}>
            Enhance your device with premium audio gear, high-speed charging units, and robust protection systems.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx} 
              className={`${styles.card} glass`}
              whileHover={{ y: -8, borderColor: 'var(--primary-color)' }}
              onClick={() => handleCategoryClick(cat.link)}
            >
              <div className={styles.imageContainer}>
                <img src={cat.img} alt={cat.name} className={styles.cardImg} />
              </div>
              <div className={styles.cardOverlay}>
                <div>
                  <h3 className={styles.cardTitle}>{cat.name}</h3>
                  <p className={styles.cardDesc}>{cat.desc}</p>
                </div>
                <span className={styles.cardLink}>
                  Explore <FiArrowRight />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accessories;
