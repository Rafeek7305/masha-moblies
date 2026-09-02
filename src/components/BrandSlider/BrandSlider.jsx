import React from 'react';
import styles from './BrandSlider.module.css';
import { useProducts } from '../../context/ProductsContext';

const defaultBrands = [
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

const BrandSlider = () => {
  const { categories, products } = useProducts();

  // Combine dynamic brands from categories subBrands and products
  const dynamicBrands = [...new Set([
    ...categories.flatMap(c => c.subBrands || []),
    ...products.map(p => p.brand || p.brandName).filter(Boolean)
  ])];

  const brands = dynamicBrands.length >= 3 ? dynamicBrands : defaultBrands;

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

