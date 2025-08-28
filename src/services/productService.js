import api from './api';

export const productService = {
  // Get all products
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async (limit = 10) => {
    const response = await api.get('/products/featured', { 
      params: { limit } 
    });
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get product by slug
  getProductBySlug: async (slug) => {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category, limit = 50) => {
    const response = await api.get(`/products/category/${category}`, {
      params: { limit }
    });
    return response.data;
  },

  // Search products
  searchProducts: async (query, limit = 50) => {
    const response = await api.get('/products/search', {
      params: { q: query, limit }
    });
    return response.data;
  },

  // Admin: Create product
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Admin: Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};

export default productService;
