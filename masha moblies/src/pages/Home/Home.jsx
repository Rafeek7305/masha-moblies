import React from 'react';
import Hero from '../../components/Hero/Hero';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import LatestArrivals from '../../components/LatestArrivals/LatestArrivals';
import ExchangeBanner from '../../components/ExchangeBanner/ExchangeBanner';
import Accessories from '../../components/Accessories/Accessories';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTA from '../../components/CTA/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <BrandSlider />
      <FeaturedProducts />
      <LatestArrivals />
      <ExchangeBanner />
      <Accessories />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
