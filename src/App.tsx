import { useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastProvider } from '@components/common/Toast';
import { useAuthStore } from '@store/authStore';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/auth/ProtectedRoute';
import RoleGuard from '@components/auth/RoleGuard';
import LoadingScreen from '@components/common/LoadingScreen';
import AuthModal from '@components/auth/AuthModal';
import DeliveryZonesPage from '@pages/admin/DeliveryZonesPage';

// Public Pages
import HomePage from '@pages/public/HomePage';
import LoginPage from '@pages/public/LoginPage';
import RegisterPage from '@pages/public/RegisterPage';
import ContactPage from '@pages/public/ContactPage';
import ForgotPasswordPage from '@pages/public/ForgotPasswordPage';
import ResetPasswordPage from '@pages/public/ResetPasswordPage';

// Customer Pages
import DailyMenuPage from '@pages/customer/DailyMenuPage';
import MealsSubscriptionPage from '@pages/customer/MealsSubscriptionPage';
import CateringPage from '@pages/customer/CateringPage';
import CartPage from '@pages/customer/CartPage';
import CheckoutPage from '@pages/customer/CheckoutPage';
import ProfilePage from '@pages/customer/ProfilePage';

// Admin Pages
import AdminDashboard from '@pages/admin/AdminDashboard';
import MenuManagement from '@pages/admin/MenuManagement';
import OrderManagement from '@pages/admin/OrderManagement';
import CategoryManagement from '@pages/admin/CategoryManagement';
import MealPlanManagement from '@pages/admin/MealPlanManagement';
import ReportsPage from '@pages/admin/ReportsPage';

function App() {
  const { checkAuth, isLoading, logout } = useAuthStore();
  const hasTriggeredAuth = useRef(false);

  useEffect(() => {
    if (hasTriggeredAuth.current) {
      return;
    }
    hasTriggeredAuth.current = true;
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('bakars:auth-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('bakars:auth-unauthorized', handleUnauthorized);
    };
  }, [logout]);

  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Layout wrapper for all pages */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="contact" element={<ContactPage />} />

            {/* Menu Routes (Public) */}
            <Route path="menu/daily" element={<DailyMenuPage />} />
            <Route path="menu/meals/*" element={<MealsSubscriptionPage />} />
            <Route path="catering" element={<CateringPage />} />

            {/* Protected Customer Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<RoleGuard requiredRole="admin" />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/menu" element={<MenuManagement />} />
              <Route path="admin/orders" element={<OrderManagement />} />
              <Route path="admin/categories" element={<CategoryManagement />} />
              <Route path="admin/meal-plans" element={<MealPlanManagement />} />
              <Route path="admin/menu-orders" element={<ReportsPage />} />
              <Route
                path="/admin/delivery-zones"
                element={<DeliveryZonesPage />}
              />
            </Route>
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Auth Modal */}
        <AuthModal />
      </Router>
    </ToastProvider>
  );
}

export default App;
