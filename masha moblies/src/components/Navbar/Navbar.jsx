import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';
import logoImg from '../../assets/logos/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchActive(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Exchange', path: '/exchange' },
    { name: 'Accessories', path: '/accessories' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchActive(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logoImg} alt="Masha Mobiles" className={styles.logoImg} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.navMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.active : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Navigation Action Buttons */}
        <div className={styles.navActions}>
          {/* Search Toggle */}
          <div className={styles.searchWrapper}>
            <button
              onClick={() => setSearchActive(!searchActive)}
              className={styles.actionBtn}
              aria-label="Search"
              id="nav-search-button"
            >
              <FiSearch size={20} />
            </button>
            {searchActive && (
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search phones, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.searchSubmitBtn}>Go</button>
              </form>
            )}
          </div>

          {/* Admin User Button */}
          <button
            onClick={handleAdminClick}
            className={styles.actionBtn}
            aria-label="Admin Portal"
            id="nav-admin-button"
          >
            <FiUser size={20} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label="Toggle Menu"
            id="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${styles.mobileNavLink} ${
                location.pathname === link.path ? styles.activeMobile : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button onClick={handleAdminClick} className={styles.mobileAdminBtn}>
            <FiUser size={18} style={{ marginRight: '8px' }} /> Admin Panel
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
