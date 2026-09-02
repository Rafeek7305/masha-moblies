import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './FeaturedProducts.module.css';
import { useProducts } from '../../context/ProductsContext';

// Fallback phone images
import iphoneImg from '../../assets/images/iphone15.png';
import s24Img from '../../assets/images/s24ultra.png';
import oneplusImg from '../../assets/images/oneplus12.png';
import nothingImg from '../../assets/images/nothing2.png';

const fallbackProducts = [
  {
    id: 'f1',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    storage: '256GB',
    ram: '8GB',
    price: 139900,
    oldPrice: 159900,
    discount: '12% OFF',
    inStock: true,
    exchangeAvailable: true,
    image: iphoneImg,
  },
  {
    id: 'f2',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    storage: '512GB',
    ram: '12GB',
    price: 129999,
    oldPrice: 139999,
    discount: '7% OFF',
    inStock: true,
    exchangeAvailable: true,
    image: s24Img,
  },
  {
    id: 'f3',
    brand: 'OnePlus',
    model: 'OnePlus 12',
    storage: '512GB',
    ram: '16GB',
    price: 64999,
    oldPrice: 69999,
    discount: '7% OFF',
    inStock: true,
    exchangeAvailable: true,
    image: oneplusImg,
  },
  {
    id: 'f4',
    brand: 'Nothing',
    model: 'Nothing Phone (2)',
    storage: '256GB',
    ram: '12GB',
    price: 37999,
    oldPrice: 44999,
    discount: '15% OFF',
    inStock: false,
    exchangeAvailable: true,
    image: nothingImg,
  },
];

const FeaturedProducts = () => {
  const { products } = useProducts();

  const displayProducts = products.length > 0 ? products.slice(0, 4) : fallbackProducts;

  return (
    <section id="featured-products" className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.tag}>Curated Selection</span>
          <h2 className={styles.title}>Featured Flagships</h2>
          <p className={styles.subtitle}>
            Explore our handpicked premium smartphones representing the pinnacle of performance, design, and hardware innovation.
          </p>
        </div>

        <div className={styles.grid}>
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

