// Dbanyan Group - Main App Component
// Modern design - Frontend only

import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Modern Pages
import ModernLandingPage from './pages/ModernLandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import EnhancedProductDetailPage from './components/ui/EnhancedProductDetailPage';
import MoringaGuidePage from './pages/MoringaGuidePage';
import CartPage from './pages/CartPage';
import EnhancedCartPage from './components/ui/EnhancedCartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ReduxTestPage from './pages/ReduxTestPage';

// Authentication Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Company Pages
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';

// Components
import NotificationContainer from './components/ui/NotificationContainer';

// Components
// import NotificationSystem from './components/layout/NotificationSystem';

// Placeholder components for future development

const ContactPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-emerald-800 mb-4" style={{ fontFamily: '"Lora", serif' }}>
        Contact Us
      </h1>
      <p className="text-emerald-600 text-lg" style={{ fontFamily: '"Inter", sans-serif' }}>
        Coming Soon - Get in touch with our team
      </p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const initialized = useRef(false);

  // Initialize app
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      console.log('Dbanyan Group App initialized');
    }
  }, []); // Empty dependency array - only run once

  // Store page in localStorage for navigation persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('last_visited_page', location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Global SEO defaults */}
      <Helmet defaultTitle="Dbanyan Group | Premium Moringa Products | Natural Health & Wellness">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>

      {/* Main Application Routes */}
      <Routes>
        {/* Landing Page - Modern Design */}
        <Route path="/" element={<ModernLandingPage />} />
        
        {/* Test Routes */}
        <Route path="/test-redux" element={<ReduxTestPage />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Product System */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:uid" element={<EnhancedProductDetailPage />} />
        
        {/* Cart & Checkout System */}
        <Route path="/cart" element={<EnhancedCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        
        {/* Educational Content */}
        <Route path="/moringa-guide" element={<MoringaGuidePage />} />
        
        {/* Company Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="text-center p-8">
              <h1 className="text-6xl font-bold text-emerald-800 mb-4" style={{ fontFamily: '"Lora", serif' }}>
                404
              </h1>
              <h2 className="text-2xl font-semibold text-emerald-700 mb-4" style={{ fontFamily: '"Lora", serif' }}>
                Page Not Found
              </h2>
              <p className="text-emerald-600 mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
                The page you're looking for doesn't exist.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Go Home
              </button>
            </div>
          </div>
        } />
      </Routes>
      
      {/* Global Notification Container */}
      <NotificationContainer />
    </>
  );
}

export default App;
