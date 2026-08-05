import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Exchange from '../pages/Exchange/Exchange';
import AccessoriesPage from '../pages/Accessories/Accessories';
import Contact from '../pages/Contact/Contact';
import AdminLogin from '../pages/Admin/AdminLogin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin/login" element={<AdminLogin />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
