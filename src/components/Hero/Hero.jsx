import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiRefreshCw, FiTrendingUp, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import heroBg from '../../assets/images/hero-showroom.png';
import iphoneImg from '../../assets/images/iphone15.png';
import s24Img from '../../assets/images/s24ultra.png';
import nothingImg from '../../assets/images/nothing2.png';

const Hero = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    // Scroll to Featured Products
    const target = document.getElementById('featured-products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/products');
    }
  };

  const handleExchange = () => {
    navigate('/exchange');
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className={styles.heroSection}>
      {/* Dark showroom background with gradients */}
      <div 
        className={styles.heroBg} 
        style={{ backgroundImage: `linear-gradient(to right, rgba(5, 8, 22, 0.95) 40%, rgba(5, 8, 22, 0.4) 100%), url(${heroBg})` }}
      />

      <div className={`${styles.container} container`}>
        <motion.div 
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline Badge */}
          <motion.div className={styles.badge} variants={itemVariants}>
            <FiAward className={styles.badgeIcon} />
            <span>Masha Mobiles Showroom</span>
          </motion.div>

          {/* Large Title */}
          <motion.h1 className={styles.title} variants={itemVariants}>
            Upgrade Your <br />
            <span className="text-gradient">Mobile Experience</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Discover premium smartphones, exchange offers, and accessories with trusted quality, warranty, and unbeatable showroom prices.
          </motion.p>

          {/* Action Buttons */}
          <motion.div className={styles.btnGroup} variants={itemVariants}>
            <motion.button 
              className={styles.primaryBtn} 
              onClick={handleExplore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Products <FiArrowRight className={styles.btnIcon} />
            </motion.button>
            <motion.button 
              className={styles.secondaryBtn} 
              onClick={handleExchange}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Exchange Phone <FiRefreshCw className={styles.btnIcon} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side floating elements */}
        <div className={styles.heroVisual}>
          {/* Card 1: New Arrival */}
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardOne} glass`}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.cardBadge} ${styles.badgeNew}`}>New Arrival</span>
              <FiTrendingUp className={styles.cardIcon} />
            </div>
            <div className={styles.cardBody}>
              <img src={iphoneImg} alt="iPhone 15 Pro" className={styles.cardImg} />
              <div className={styles.cardDetails}>
                <h4>iPhone 15 Pro</h4>
                <p>Natural Titanium</p>
                <span className={styles.cardPrice}>₹1,24,900</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Exchange Offer */}
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardTwo} glass`}
            animate={{ y: [-15, 5, -15] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotateY: -10 }}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.cardBadge} ${styles.badgeExchange}`}>Exchange Offer</span>
              <FiRefreshCw className={styles.cardIcon} />
            </div>
            <div className={styles.cardBody}>
              <img src={s24Img} alt="Galaxy S24 Ultra" className={styles.cardImg} />
              <div className={styles.cardDetails}>
                <h4>Galaxy S24 Ultra</h4>
                <p>Save up to 60%</p>
                <span className={styles.cardPrice}>Exchange Value max</span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Best Seller */}
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardThree} glass`}
            animate={{ y: [5, -10, 5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05, rotateX: 10 }}
          >
            <div className={styles.cardHeader}>
              <span className={`${styles.cardBadge} ${styles.badgeSeller}`}>Best Seller</span>
              <FiAward className={styles.cardIcon} />
            </div>
            <div className={styles.cardBody}>
              <img src={nothingImg} alt="Nothing Phone (2)" className={styles.cardImg} />
              <div className={styles.cardDetails}>
                <h4>Nothing Phone (2)</h4>
                <p>Glyph Interface</p>
                <span className={styles.cardPrice}>₹39,999</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
