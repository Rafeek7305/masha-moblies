import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import styles from './Footer.module.css';
import logoImg from '../../assets/logos/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleMapClick = () => {
    // Open Google Maps search for mobile showroom
    window.open('https://maps.google.com/?q=Masha+Mobiles+Showroom', '_blank');
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Column 1: Brand Info */}
        <div className={styles.brandCol}>
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="Masha Mobiles" className={styles.logoImg} />
          </Link>
          <p className={styles.brandDesc}>
            Experience luxury mobile showrooms with genuine electronics, transparent trade-in valuations, official brand warranties, and support.
          </p>
          <div className={styles.socials}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className={styles.socialBtn}>
              <FiFacebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className={styles.socialBtn}>
              <FiInstagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className={styles.socialBtn}>
              <FiTwitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className={styles.socialBtn}>
              <FiYoutube size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Buy Mobiles</Link></li>
            <li><Link to="/exchange">Exchange Center</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Column 3: Showroom Hours */}
        <div className={styles.hoursCol}>
          <h4 className={styles.colTitle}>Showroom Hours</h4>
          <ul className={styles.hoursList}>
            <li>
              <FiClock className={styles.infoIcon} />
              <div>
                <span className={styles.days}>Monday - Saturday</span>
                <p className={styles.time}>10:00 AM - 09:30 PM</p>
              </div>
            </li>
            <li>
              <FiClock className={styles.infoIcon} />
              <div>
                <span className={styles.days}>Sunday</span>
                <p className={styles.time}>11:00 AM - 07:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Location & Contact */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Store Information</h4>
          <ul className={styles.contactList}>
            <li className={styles.clickable} onClick={handleMapClick}>
              <FiMapPin className={styles.infoIcon} />
              <span>Main Bazaar Road, City Center (Click for Directions)</span>
            </li>
            <li>
              <FiPhone className={styles.infoIcon} />
              <a href="tel:+919999999999">+91 99999 99999</a>
            </li>
            <li>
              <FiMail className={styles.infoIcon} />
              <a href="mailto:info@mashamobiles.com">info@mashamobiles.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className={styles.copyrightBar}>
        <div className={`${styles.copyrightContainer} container`}>
          <p>&copy; {currentYear} MASHA MOBILES. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#privacy">Privacy Policy</a>
            <span className={styles.bullet}>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
