import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import Exchange from '../pages/Exchange/Exchange';
import AccessoriesPage from '../pages/Accessories/Accessories';
import Contact from '../pages/Contact/Contact';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import Login from '../pages/Admin/Login/Login';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import AdminProducts from '../pages/Admin/Products/AdminProducts';
import AdminCategories from '../pages/Admin/Categories/AdminCategories';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="exchange" element={<Exchange />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="contact" element={<Contact />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
