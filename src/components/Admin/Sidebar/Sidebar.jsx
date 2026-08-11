import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiBox, FiList, FiAward, FiHeadphones, 
  FiImage, FiStar, FiClock, FiTag, FiMessageSquare,
  FiPhone, FiMapPin, FiSettings, FiLogOut, FiX 
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/admin/dashboard' },
    { name: 'Categories', icon: <FiList />, path: '/admin/categories' },
    { name: 'Products', icon: <FiBox />, path: '/admin/products' },
    { name: 'Settings', icon: <FiSettings />, path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <motion.aside 
      className={`${styles.sidebar} ${!isOpen ? styles.collapsed : styles.openMobile}`}
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.logoContainer}>
        {isOpen ? (
          <motion.div className={styles.logoWrapper} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className={styles.logo}>MASHA <span>Admin</span></h1>
            <button className={styles.mobileCloseBtn} onClick={toggleSidebar}>
              <FiX />
            </button>
          </motion.div>
        ) : (
          <h1 className={styles.logoIcon}>M</h1>
        )}
      </div>

      <div className={styles.menuContainer}>
        <p className={styles.menuLabel}>{isOpen ? 'SHOWROOM CMS' : 'CMS'}</p>
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                title={!isOpen ? item.name : ""}
                onClick={() => {
                  if (window.innerWidth <= 992 && toggleSidebar) {
                    toggleSidebar();
                  }
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                {isOpen && <span className={styles.name}>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottomMenu}>
        <button className={styles.logoutBtn} onClick={handleLogout} title={!isOpen ? "Logout" : ""}>
          <span className={styles.icon}><FiLogOut /></span>
          {isOpen && <span className={styles.name}>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
