import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './ExchangeBanner.module.css';

const ExchangeBanner = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [estimatedValue, setEstimatedValue] = useState(75000);

  const brandEstimates = {
    Apple: 75000,
    Samsung: 65000,
    OnePlus: 42000,
    Nothing: 22000,
    Xiaomi: 18000,
    Other: 15000,
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setEstimatedValue(brandEstimates[brand]);
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const steps = [
    { num: '01', title: 'Bring Device', desc: 'Bring your current smartphone to our showroom.' },
    { num: '02', title: 'Quick Valuation', desc: 'Our technicians perform a fast state evaluation.' },
    { num: '03', title: 'Instant Discount', desc: 'Get your trade-in discount credited instantly.' },
  ];

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <span className={styles.tag}>Smart Trade-In</span>
          <h2 className={styles.title}>Swap Your Old Device <br />for a Premium Upgrade</h2>
          <p className={styles.desc}>
            Get the best trade-in rates in the region. We offer competitive valuations for all major smartphone brands, letting you walk out with the latest flagship today.
          </p>

          <div className={styles.steps}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.stepCard}>
                <span className={styles.stepNum}>{step.num}</span>
                <div>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Estimator Panel */}
        <motion.div 
          className={`${styles.estimatorPanel} glass`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.panelHeader}>
            <FiRefreshCw className={styles.panelIcon} />
            <h3>Trade-In Value Estimator</h3>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="exchange-brand-select">Select Old Phone Brand</label>
            <select 
              id="exchange-brand-select"
              value={selectedBrand} 
              onChange={handleBrandChange}
              className={styles.selectInput}
            >
              {Object.keys(brandEstimates).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className={styles.valuationBox}>
            <p className={styles.valLabel}>Estimated Valuation Up To</p>
            <h2 className={styles.valValue}>{formatPrice(estimatedValue)}*</h2>
            <p className={styles.valDisclaimer}>*Actual value depends on diagnostic test results.</p>
          </div>

          <ul className={styles.features}>
            <li><FiCheckCircle className={styles.listIcon} /> Free evaluation</li>
            <li><FiCheckCircle className={styles.listIcon} /> Zero documentation hassle</li>
            <li><FiCheckCircle className={styles.listIcon} /> Data safety guaranteed</li>
          </ul>

          <button onClick={() => navigate('/exchange')} className={styles.panelBtn}>
            Get Final Quote <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExchangeBanner;
