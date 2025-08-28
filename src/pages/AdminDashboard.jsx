// Dbanyan Group - Professional Admin Dashboard
// Amazon-style administrative interface with comprehensive e-commerce management

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { 
  Container, 
  Box,
  Alert,
  Loader,
  Center,
  Stack,
  Text
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboardOverview from '../components/admin/AdminDashboardOverview';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import AnalyticsDashboard from '../components/admin/AnalyticsDashboard';
import { getCurrentUser, logoutUser } from '../store/slices/authSlice';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeView, setActiveView] = useState('dashboard');

  // Get auth state from Redux
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);

  console.log('🔐 [ADMIN DASHBOARD] Auth state:', { 
    user: user ? { email: user.email, isAdmin: user.is_admin } : null, 
    isAuthenticated, 
    isLoading 
  });

  // Check authentication and admin privileges
  useEffect(() => {
    const checkAuth = async () => {
      // If we have a token but no user, fetch the user
      const token = localStorage.getItem('token');
      if (token && !user && !isLoading) {
        console.log('📡 [ADMIN DASHBOARD] Token found, fetching user...');
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          console.error('❌ [ADMIN DASHBOARD] Failed to get user:', error);
          navigate('/login');
          return;
        }
      }

      // If no token at all, redirect to login
      if (!token) {
        console.log('🚫 [ADMIN DASHBOARD] No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // If user is loaded but not admin, redirect to home
      if (user && !user.is_admin) {
        console.log('⛔ [ADMIN DASHBOARD] User is not admin, redirecting to home');
        navigate('/');
        return;
      }
    };

    checkAuth();
  }, [user, isAuthenticated, isLoading, dispatch, navigate]);

  const logout = async () => {
    console.log('🚪 [ADMIN DASHBOARD] Admin logout');
    await dispatch(logoutUser());
    navigate('/');
  };

  // Store admin state in localStorage
  useEffect(() => {
    if (activeView) {
      localStorage.setItem('admin_active_view', activeView);
    }
  }, [activeView]);

  // Restore admin state from localStorage
  useEffect(() => {
    const storedView = localStorage.getItem('admin_active_view');
    if (storedView && ['dashboard', 'products', 'orders', 'customers', 'analytics'].includes(storedView)) {
      setActiveView(storedView);
    }
  }, []);

  // IMPORTANT: Authentication check - redirect if not authorized
  useEffect(() => {
    // This effect already runs in the main useEffect above
    // Keeping this comment for clarity
  }, []);

  // Show loading state if any data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          <Center className="py-12">
            <Stack align="center" spacing="md">
              <Loader size="lg" color="#2C5F2D" />
              <Text style={{ fontFamily: '"Inter", sans-serif' }}>
                Loading admin dashboard...
              </Text>
            </Stack>
          </Center>
        </Container>
      </div>
    );
  }

  // Show unauthorized access message if user is not admin
  if (!user || !user.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          <Center className="py-12">
            <Alert 
              icon={<IconAlertCircle size="1rem" />} 
              title="Access Denied" 
              color="red"
              radius="lg"
            >
              <Text>You don't have permission to access the admin dashboard.</Text>
            </Alert>
          </Center>
        </Container>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboardOverview />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'customers':
        return <UserManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <AdminDashboardOverview />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Dbanyan Group</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Box className="min-h-screen bg-gray-50">
        <AdminLayout activeView={activeView} onViewChange={setActiveView}>
          {renderContent()}
        </AdminLayout>
      </Box>
    </>
  );
};

export default AdminDashboard;
