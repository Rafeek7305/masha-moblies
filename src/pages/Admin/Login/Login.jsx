import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    const { error: loginError } = await login(email, password);
    
    setLoading(false);
    
    if (loginError) {
      setError('Invalid email or password.');
    } else {
      navigate('/admin/dashboard');
    }
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
            <input type="email" name="email" placeholder="Email address" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} />
            <input type="password" name="password" placeholder="Password" className={styles.input} required />
          </div>

          {error && <div style={{ color: '#ff4d4d', fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '-0.5rem' }}>{error}</div>}

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
            disabled={loading}
          >
            {loading ? 'Signing in...' : <>Sign In <FiArrowRight className={styles.btnIcon} /></>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
