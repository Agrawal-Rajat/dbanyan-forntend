/**
 * Professional Payment Service
 * Handles Razorpay integration with proper environment configuration
 */

import api from './api';
import { config } from '../config';

class PaymentService {
  constructor() {
    this.razorpayKeyId = config.RAZORPAY_KEY_ID;
    this.isRazorpayLoaded = false;
  }

  /**
   * Dynamically load Razorpay script
   */
  async loadRazorpay() {
    return new Promise((resolve, reject) => {
      if (this.isRazorpayLoaded || window.Razorpay) {
        this.isRazorpayLoaded = true;
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        this.isRazorpayLoaded = true;
        resolve(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        reject(new Error('Failed to load Razorpay script'));
      };
      
      document.head.appendChild(script);
    });
  }

  // Create Razorpay order
  async createPaymentOrder(orderData) {
    const response = await api.post('/orders/create-payment-order', {
      amount: orderData.amount,
      currency: 'INR',
      receipt: orderData.receipt || `order_${Date.now()}`,
      notes: orderData.notes || {}
    });
    return response.data;
  }

  // Verify Razorpay payment
  async verifyPayment(paymentData) {
    const response = await api.post('/orders/verify-payment', paymentData);
    return response.data;
  }

  /**
   * Initialize Razorpay payment
   */
  async initializeRazorpayPayment(orderData) {
    try {
      if (!this.razorpayKeyId) {
        throw new Error('Razorpay key not configured. Please check environment variables.');
      }

      await this.loadRazorpay();

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded');
      }

      return new Promise((resolve, reject) => {
        const options = {
          key: this.razorpayKeyId,
          amount: orderData.amount * 100, // Convert to paise
          currency: 'INR',
          name: 'Dbanyan Group',
          description: 'Premium Moringa Products',
          order_id: orderData.id,
          handler: (response) => {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
          },
          prefill: {
            name: orderData.customer?.name || '',
            email: orderData.customer?.email || '',
            contact: orderData.customer?.phone || ''
          },
          theme: {
            color: '#10B981' // Green theme matching your brand
          },
          modal: {
            ondismiss: () => {
              reject(new Error('Payment cancelled by user'));
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });
    } catch (error) {
      console.error('Razorpay initialization failed:', error);
      throw error;
    }
  }

  /**
   * Process UPI payment
   */
  async processUPIPayment(orderData) {
    try {
      const result = await this.initializeRazorpayPayment(orderData);
      return result;
    } catch (error) {
      console.error('UPI payment failed:', error);
      throw new Error('UPI payment failed. Please try again.');
    }
  }

  /**
   * Process Card payment
   */
  async processCardPayment(orderData) {
    try {
      const result = await this.initializeRazorpayPayment(orderData);
      return result;
    } catch (error) {
      console.error('Card payment failed:', error);
      throw new Error('Card payment failed. Please try again.');
    }
  }

  /**
   * Process Net Banking payment
   */
  async processNetBankingPayment(orderData) {
    try {
      const result = await this.initializeRazorpayPayment(orderData);
      return result;
    } catch (error) {
      console.error('Net Banking payment failed:', error);
      throw new Error('Net Banking payment failed. Please try again.');
    }
  }

  // Process COD payment
  async processCODOrder(orderData) {
    const response = await api.post('/orders/checkout', {
      ...orderData,
      payment_method: 'cod'
    });
    return response.data;
  }

  // Get payment status
  async getPaymentStatus(paymentId) {
    const response = await api.get(`/orders/payment-status/${paymentId}`);
    return response.data;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
