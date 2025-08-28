// Mock data - empty arrays until backend is connected
export const mockProducts = [];
export const mockUsers = [];
export const mockOrders = [];
export const mockCategories = [];
export const mockReviews = [];

// Helper functions
export const getProduct = (id) => {
  return mockProducts.find(p => p.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return mockProducts.slice(0, 3);
};
