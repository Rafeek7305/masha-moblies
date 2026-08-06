import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiHeadphones, FiMusic, FiZap, FiBattery, FiShield, FiSmartphone, FiBluetooth, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Accessories.module.css';

// Import accessories images
import headphonesImg from '../../assets/images/premium_headphones.png';
import earbudsImg from '../../assets/images/premium_earbuds.png';
import chargerImg from '../../assets/images/premium_charger.png';
import smartwatchImg from '../../assets/images/premium_smartwatch.png';
import phoneCaseImg from '../../assets/images/premium_case.png';
import screenProtectorImg from '../../assets/images/premium_screen_protector.png';
import speakerImg from '../../assets/images/premium_speaker.png';
import powerbankImg from '../../assets/images/premium_powerbank.png';
 
const Accessories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Headphones', desc: 'Premium Over-Ear Sound', img: headphonesImg, link: '/accessories', icon: <FiHeadphones /> },
    { name: 'Earbuds', desc: 'True Wireless Audio', img: earbudsImg, link: '/accessories', icon: <FiMusic /> },
    { name: 'Chargers', desc: 'High Speed Fast Adapters', img: chargerImg, link: '/accessories', icon: <FiZap /> },
    { name: 'Power Banks', desc: 'Backup Energy On the Go', img: powerbankImg, link: '/accessories', icon: <FiBattery /> },
    { name: 'Cases', desc: 'Luxury Shells & Covers', img: phoneCaseImg, link: '/accessories', icon: <FiShield /> },
    { name: 'Tempered Glass', desc: '9H Screen Protection', img: screenProtectorImg, link: '/accessories', icon: <FiSmartphone /> },
    { name: 'Bluetooth Speakers', desc: 'Loud Outdoor Sound', img: speakerImg, link: '/accessories', icon: <FiBluetooth /> },
    { name: 'Smart Watches', desc: 'Wearable Tech & Trackers', img: smartwatchImg, link: '/accessories', icon: <FiHeart /> },
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
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => handleCategoryClick(cat.link)}
            >
              <div className={styles.iconWrapper}>{cat.icon}</div>
              <div className={styles.imageContainer}>
                <img src={cat.img} alt={cat.name} className={styles.cardImg} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.name}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
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
