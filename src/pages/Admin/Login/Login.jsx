import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // No actual authentication for now, just navigate to dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className={styles.loginContainer}>
      {/* Background glow effects */}
      <div className={styles.glowTop}></div>
      <div className={styles.glowBottom}></div>

      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>MASHA <span>Mobiles</span></h1>
          <p className={styles.subtitle}>Admin Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} />
            <input type="email" placeholder="Email address" className={styles.input} required defaultValue="admin@mashamobiles.com" />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input type="password" placeholder="Password" className={styles.input} required defaultValue="password123" />
          </div>

          <div className={styles.formActions}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" defaultChecked />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <a href="#" className={styles.forgotLink}>Forgot password?</a>
          </div>

          <motion.button 
            type="submit" 
            className={styles.loginBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In <FiArrowRight className={styles.btnIcon} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
