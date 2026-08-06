import React from 'react';
import styles from './BrandSlider.module.css';

const BrandSlider = () => {
  const brands = [
    'Apple',
    'Samsung',
    'OnePlus',
    'Nothing',
    'Xiaomi',
    'Oppo',
    'Vivo', 
    'Realme',
    'Motorola',
    'Honor',
  ];

  // Double the list to ensure seamless transition in marquee
  const sliderBrands = [...brands, ...brands];

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderContainer}>
        <div className={styles.track}>
          {sliderBrands.map((brand, idx) => (
            <div key={idx} className={styles.slide}>
              <span className={styles.brandText}>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
