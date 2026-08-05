import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';
import styles from './CTA.module.css'; // Let's use standard naming: CTA.module.css

const CTA = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919999999999?text=Hi%20Masha%20Mobiles,%20I%20am%20interested%20in%20upgrading%20my%20mobile!', '_blank');
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+919999999999';
  };

  return (
    <section className={styles.section}>
      {/* Glow Effects */}
      <div className={styles.glowLeft}></div>
      <div className={styles.glowRight}></div>

      <div className={`${styles.container} container`}>
        <motion.div 
          className={`${styles.card} glass`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Visit Masha Mobiles Today</span>
          <h2 className={styles.title}>Ready to Upgrade?</h2>
          <p className={styles.desc}>
            Experience luxury mobile shopping. Come down to our showroom to check out new flagships in hand, get an instant trade-in value diagnostic, or choose accessories.
          </p>

          <div className={styles.btnGroup}>
            <motion.button 
              onClick={handleWhatsApp} 
              className={styles.waBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiMessageCircle size={20} /> Chat on WhatsApp
            </motion.button>
            
            <motion.button 
              onClick={handlePhoneCall} 
              className={styles.phoneBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPhoneCall size={18} /> Call Showroom
            </motion.button>
          </div>

          <div className={styles.addressBar}>
            <FiMapPin className={styles.mapIcon} />
            <span>Masha Mobiles Showroom, Main Bazaar Road, City Center</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
