import React from 'react';

const AdminLogin = () => {
  return (
    <div style={{ padding: '8rem 2rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--border-radius-md)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Admin Portal</h2>
        <p style={{ color: 'var(--subtext-color)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Future Firebase authentication and management module.
        </p>
        <button style={{
          width: '100%',
          padding: '0.8rem',
          background: 'var(--primary-gradient)',
          color: '#000',
          fontWeight: '600',
          border: 'none',
          borderRadius: 'var(--border-radius-sm)',
          cursor: 'not-allowed',
          opacity: 0.7
        }}>
          Login Disabled
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
