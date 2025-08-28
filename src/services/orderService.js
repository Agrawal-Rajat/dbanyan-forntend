import api from './api';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get user's orders
  getUserOrders: async (params = {}) => {
    const response = await api.get('/orders/my-orders', { params });
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  // Admin: Get all orders
  getAllOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Admin: Update order
  updateOrder: async (id, orderData) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  },

  // Admin: Delete order
  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },

  // Checkout process - create order with full checkout data
  checkout: async (checkoutData) => {
    const response = await api.post('/orders/checkout', checkoutData);
    return response.data;
  },

  // Process COD order
  processCODOrder: async (orderData) => {
    const response = await api.post('/orders/checkout', {
      ...orderData,
      payment_method: 'cod'
    });
    return response.data;
  },

  // Validate coupon/promo code
  validateCoupon: async (code) => {
    const response = await api.post('/orders/validate-coupon', { code });
    return response.data;
  },

  // Calculate shipping cost
  calculateShipping: async (shippingData) => {
    const response = await api.post('/orders/calculate-shipping', shippingData);
    return response.data;
  },

  // Validate inventory
  validateInventory: async (items) => {
    const response = await api.post('/orders/validate-inventory', { items });
    return response.data;
  }
};

export default orderService;
