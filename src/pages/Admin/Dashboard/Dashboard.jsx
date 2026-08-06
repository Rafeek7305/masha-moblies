import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiBox, FiList, FiAward, FiHeadphones, 
  FiImage, FiStar, FiClock, FiTag, FiMessageSquare,
  FiPhone, FiMapPin, FiArrowRight
} from 'react-icons/fi';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const managementCards = [
    { title: 'Products', desc: 'Add, edit, or remove showcase devices.', icon: <FiBox />, path: '/admin/products', color: 'rgba(0, 212, 255, 0.15)', textColor: '#00d4ff' },
    { title: 'Categories', desc: 'Manage device categories and types.', icon: <FiList />, path: '/admin/categories', color: 'rgba(46, 196, 182, 0.15)', textColor: '#2ec4b6' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <div className={styles.glowBg}></div>
        <div className={styles.welcomeContent}>
          <h1 className={styles.title}>Welcome Back 👋</h1>
          <p className={styles.subtitle}>Manage your showroom content from one place.</p>
          <p className={styles.description}>
            Keep your products, offers, banners, and accessories completely updated. 
            Select a module below to begin editing your live public website.
          </p>
        </div>
      </div>

      <motion.div 
        className={styles.cardsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {managementCards.map((card, idx) => (
          <motion.div 
            key={idx} 
            className={styles.managementCard}
            variants={itemVariants}
            whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(0, 212, 255, 0.2)', borderColor: 'rgba(0, 212, 255, 0.3)' }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper} style={{ background: card.color, color: card.textColor }}>
                {card.icon}
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <button onClick={() => navigate(card.path)} className={styles.manageBtn}>
                <span>Manage</span>
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
