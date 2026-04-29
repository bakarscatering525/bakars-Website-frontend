import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import RoleGuard from '@components/auth/RoleGuard';

// Public Pages
import HomePage from '@pages/public/HomePage';
import LoginPage from '@pages/public/LoginPage';
import RegisterPage from '@pages/public/RegisterPage';
import ContactPage from '@pages/public/ContactPage';

// Customer Pages
import DailyMenuPage from '@pages/customer/DailyMenuPage';
import MealsSubscriptionPage from '@pages/customer/MealsSubscriptionPage';
import CateringPage from '@pages/customer/CateringPage';
import CheckoutPage from '@pages/customer/CheckoutPage';
import ProfilePage from '@pages/customer/ProfilePage';

// Admin Pages
import AdminDashboard from '@pages/admin/AdminDashboard';
import OrderManagement from '@pages/admin/OrderManagement';
import MenuManagement from '@pages/admin/MenuManagement';
import MealPlanManagement from '@pages/admin/MealPlanManagement';
import ReportsPage from '@pages/admin/ReportsPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ✅ Menu Pages - Accessible without login */}
        <Route path="/menu/daily" element={<DailyMenuPage />} />
        <Route path="/menu/meals" element={<MealsSubscriptionPage />} />
        <Route path="/catering" element={<CateringPage />} />

        {/* ✅ Protected Customer Routes - Login Required */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleGuard requiredRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
            <Route path="/admin/meal-plans" element={<MealPlanManagement />} />
            <Route path="/admin/menu-orders" element={<ReportsPage />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
