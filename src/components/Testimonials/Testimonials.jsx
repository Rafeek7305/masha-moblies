import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ananth Krishnan',
      role: 'Verified Buyer',
      initials: 'AK',
      gradient: 'linear-gradient(135deg, #00D4FF 0%, #0077FF 100%)',
      rating: 5,
      comment: 'Excellent customer service. Bought my iPhone 15 Pro Max here, and the trade-in valuation they gave for my old phone was way better than other shops in town. Highly recommended showroom!',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Sarah Mathew',
      role: 'Tech Enthusiast',
      initials: 'SM',
      gradient: 'linear-gradient(135deg, #FFD166 0%, #FF9F1C 100%)',
      rating: 5,
      comment: 'This showroom feels like an official Apple/Samsung store. Beautifully designed, well-lit displays, and extremely helpful staff. Got my earbuds and custom cases with awesome discounts.',
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'Rohan Sharma',
      role: 'Regular Customer',
      initials: 'RS',
      gradient: 'linear-gradient(135deg, #e0aaff 0%, #c084fc 100%)',
      rating: 5,
      comment: 'Extremely fast mobile exchange diagnostic. Walked in with my old OnePlus and walked out with a Samsung S24 Ultra in under 20 minutes. Professional service at its best.',
      date: '3 weeks ago',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.tag}>Client Feedback</span>
          <h2 className={styles.title}>What Our Customers Say</h2>
          <p className={styles.subtitle}>
            Hear from our community of buyers who upgraded their mobile setup through Masha Mobiles.
          </p>
        </div>

        <div className={styles.grid}>
          {reviews.map((rev) => (
            <motion.div 
              key={rev.id}
              className={`${styles.card} glass`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <div 
                  className={styles.avatar} 
                  style={{ background: rev.gradient }}
                >
                  {rev.initials}
                </div>
                <div>
                  <h4 className={styles.name}>{rev.name}</h4>
                  <span className={styles.role}>{rev.role}</span>
                </div>
              </div>

              <div className={styles.rating}>
                {[...Array(rev.rating)].map((_, i) => (
                  <FiStar key={i} className={styles.starIcon} />
                ))}
              </div>

              <p className={styles.comment}>"{rev.comment}"</p>
              
              <span className={styles.date}>{rev.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
