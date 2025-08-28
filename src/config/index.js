// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Payment Configuration (Razorpay)
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
const PAYMENT_SUCCESS_URL = import.meta.env.VITE_PAYMENT_SUCCESS_URL || '/payment-success';
const PAYMENT_FAILURE_URL = import.meta.env.VITE_PAYMENT_FAILURE_URL || '/payment-failure';

export const config = {
  API_BASE_URL,
  BACKEND_URL,
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development',
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_TOOLS: import.meta.env.VITE_ENABLE_DEBUG_TOOLS === 'true',
  
  // Payment Configuration
  RAZORPAY_KEY_ID,
  PAYMENT_SUCCESS_URL,
  PAYMENT_FAILURE_URL
};

export default config;
