import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiRefreshCw, FiDollarSign, FiZap, FiHeadphones } from 'react-icons/fi';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: <FiAward size={26} />,
      title: 'Original Products',
      desc: '100% genuine and verified electronics sourced directly from certified manufacturing partners.',
    },
    {
      icon: <FiShield size={26} />,
      title: 'Brand Warranty',
      desc: 'Every purchase is backed by full brand coverage and official showroom warranty terms.',
    },
    {
      icon: <FiRefreshCw size={26} />,
      title: 'Best Exchange Price',
      desc: 'Get highly competitive market valuations for your pre-owned devices instantly.',
    },
    {
      icon: <FiDollarSign size={26} />,
      title: 'Affordable Pricing',
      desc: 'Premium value deals with flexible financing options, zero-interest EMIs, and promotional discounts.',
    },
    {
      icon: <FiZap size={26} />,
      title: 'Fast Service',
      desc: 'Get instant device setup, quick exchange diagnostic tests, and immediate technical hand-overs.',
    },
    {
      icon: <FiHeadphones size={26} />,
      title: 'Expert Support',
      desc: 'Our staff provides professional guidance to find the exact devices tailored to your workflow.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.tag}>Why Choose Us</span>
          <h2 className={styles.title}>The Showroom Difference</h2>
          <p className={styles.subtitle}>
            We combine high-end product selection with transparent pricing models and immediate in-store services.
          </p>
        </div>

        <div className={styles.grid}>
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              className={`${styles.card} glass`}
              whileHover={{ y: -8, boxShadow: 'var(--glow-primary)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className={styles.iconWrapper}>
                {benefit.icon}
              </div>
              <h3 className={styles.cardTitle}>{benefit.title}</h3>
              <p className={styles.cardDesc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
