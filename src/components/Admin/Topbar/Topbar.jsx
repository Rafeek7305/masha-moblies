import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiBell, FiSearch, FiExternalLink } from 'react-icons/fi';
import styles from './Topbar.module.css';

const Topbar = ({ toggleSidebar, sidebarOpen }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </div>
      </div>
      
      <div className={styles.right}>
        <Link to="/" className={styles.publicLink}>
          View Site <FiExternalLink />
        </Link>
        <span className={styles.date}>{currentDate}</span>
        
        <button className={styles.notifBtn}>
          <FiBell size={20} />
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>A</div>
          <div className={styles.adminInfo}>
            <span className={styles.name}>Admin User</span>
            <span className={styles.role}>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
