// Dbanyan Group - Modern Login Page
// Elegant authentication with guest/admin flow

import React, { useState, useEffect } from 'react';
import { Container, Paper, Title, Text, TextInput, PasswordInput, Button, Group, Alert, Anchor, Divider, Stack, Breadcrumbs } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { IconLeaf, IconMail, IconLock, IconEye, IconEyeOff, IconAlertCircle, IconHome } from '@tabler/icons-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Redux state
  const { isLoading, error, user } = useSelector(state => state.auth);

  console.log('🔐 [LOGIN PAGE] Component loaded, auth state:', { 
    isLoading, 
    error: error || 'none',
    isAuthenticated: !!user 
  });
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  // Store login page visit and restore form data if available
  useEffect(() => {
    localStorage.setItem('last_login_visit', new Date().toISOString());
    
    // Restore email from localStorage if user was previously here
    const savedEmail = localStorage.getItem('login_email');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Save email to localStorage when it changes
  useEffect(() => {
    if (formData.email) {
      localStorage.setItem('login_email', formData.email);
    }
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (!formData.email || !formData.password) {
      console.warn('⚠️ [LOGIN PAGE] Missing email or password');
      return;
    }

    console.log('🚀 [LOGIN PAGE] Attempting login for:', formData.email);
    
    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();

      console.log('✅ [LOGIN PAGE] Login successful:', result);
      
      // Redirect based on user role
      if (result.user && result.user.is_admin) {
        console.log('👑 [LOGIN PAGE] Redirecting admin to dashboard');
        navigate('/admin');
      } else {
        console.log('🏠 [LOGIN PAGE] Redirecting user to home');
        navigate('/');
      }
    } catch (error) {
      console.error('❌ [LOGIN PAGE] Login failed:', error);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    if (error) clearError();
  };

  return (
    <>
      <Helmet>
        <title>Login | Dbanyan Group</title>
        <meta name="description" content="Login to your Dbanyan Group account to access exclusive features and manage your orders." />
      </Helmet>

      <div 
        className="min-h-screen flex items-center justify-center py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #dcfce7 100%)'
        }}
      >
        <Container size="xs" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconLeaf className="w-8 h-8 text-white" />
              </motion.div>
              
              <Title 
                order={1} 
                className="text-3xl mb-2"
                style={{ 
                  fontFamily: '"Lora", serif',
                  background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Welcome Back
              </Title>
              
              <Text c="dimmed" size="md">
                Sign in to your Dbanyan Group account
              </Text>
            </div>

            {/* Login Form */}
            <Paper 
              className="p-8 bg-white/80 backdrop-blur-sm border border-emerald-100"
              radius="xl" 
              shadow="lg"
            >
              <form onSubmit={handleSubmit}>
                <Stack gap="lg">
                  {/* Error Alert */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Alert 
                        icon={<IconAlertCircle className="w-4 h-4" />} 
                        color="red" 
                        radius="lg"
                        variant="light"
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}

                  {/* Email Input */}
                  <TextInput
                    label="Email Address"
                    placeholder="your@email.com"
                    size="md"
                    leftSection={<IconMail className="w-4 h-4 text-gray-500" />}
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                    radius="lg"
                    styles={{
                      input: {
                        border: '2px solid #e5e7eb',
                        '&:focus': {
                          borderColor: '#10b981'
                        }
                      }
                    }}
                  />

                  {/* Password Input */}
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    size="md"
                    leftSection={<IconLock className="w-4 h-4 text-gray-500" />}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />
                    }
                    visible={showPassword}
                    onVisibilityChange={setShowPassword}
                    value={formData.password}
                    onChange={handleChange('password')}
                    required
                    radius="lg"
                    styles={{
                      input: {
                        border: '2px solid #e5e7eb',
                        '&:focus': {
                          borderColor: '#10b981'
                        }
                      }
                    }}
                  />

                  {/* Forgot Password */}
                  <Group justify="flex-end">
                    <Anchor 
                      component={Link} 
                      to="/forgot-password" 
                      size="sm"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Forgot your password?
                    </Anchor>
                  </Group>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    size="md"
                    radius="lg"
                    loading={isLoading}
                    fullWidth
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  {/* Guest Mode Info */}
                  <Alert 
                    color="blue" 
                    variant="light" 
                    radius="lg"
                    className="text-center"
                  >
                    <Text size="sm">
                      <strong>Guest Mode:</strong> You can browse and shop without an account. 
                      Create one during checkout for order tracking.
                    </Text>
                  </Alert>

                  {/* Divider */}
                  <Divider label="New to Dbanyan?" labelPosition="center" />

                  {/* Sign Up Link */}
                  <Button
                    variant="outline"
                    size="md"
                    radius="lg"
                    fullWidth
                    onClick={() => navigate('/signup')}
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    Create New Account
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() => navigate('/')}
                    className="text-gray-600 hover:bg-gray-50"
                  >
                    Continue Shopping as Guest
                  </Button>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
