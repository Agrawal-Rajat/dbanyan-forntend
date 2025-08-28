import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, productName, price, quantity = 1, image, product } = action.payload;
      
      // Handle both old and new payload formats
      const itemToAdd = product || {
        id: productId,
        product_id: productId,
        name: productName,
        price: price,
        image: image || '/images/moringaPowderPic.jpg'
      };
      
      console.log('🛒 [CART SLICE] Adding to cart:', { 
        productId: itemToAdd.id || itemToAdd.product_id, 
        productName: itemToAdd.name, 
        quantity 
      });
      
      const existingItem = state.items.find(item => 
        item.id === (itemToAdd.id || itemToAdd.product_id) || 
        item.product_id === (itemToAdd.id || itemToAdd.product_id)
      );
      
      if (existingItem) {
        console.log('📦 [CART SLICE] Product already in cart, updating quantity:', {
          oldQuantity: existingItem.quantity,
          newQuantity: existingItem.quantity + quantity
        });
        existingItem.quantity += quantity;
      } else {
        console.log('🆕 [CART SLICE] Adding new product to cart');
        const newItem = {
          id: itemToAdd.id || itemToAdd.product_id,
          product_id: itemToAdd.product_id || itemToAdd.id,
          name: itemToAdd.name,
          price: itemToAdd.price,
          image: itemToAdd.image,
          quantity
        };
        state.items.push(newItem);
      }
      
      cartSlice.caseReducers.calculateTotals(state);
      console.log('💰 [CART SLICE] Cart updated - Items:', state.itemCount, 'Total:', state.total);
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      console.log('🗑️ [CART SLICE] Removing from cart:', productId);
      const removedItem = state.items.find(item => item.id === productId);
      if (removedItem) {
        console.log('📤 [CART SLICE] Removed item:', removedItem.name);
      }
      state.items = state.items.filter(item => item.id !== productId);
      cartSlice.caseReducers.calculateTotals(state);
      console.log('💰 [CART SLICE] Cart after removal - Items:', state.itemCount, 'Total:', state.total);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      console.log('🔄 [CART SLICE] Updating quantity:', { productId: id, newQuantity: quantity });
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          console.log('🗑️ [CART SLICE] Quantity <= 0, removing item:', item.name);
          state.items = state.items.filter(item => item.id !== id);
        } else {
          console.log('📦 [CART SLICE] Updating item quantity:', {
            itemName: item.name,
            oldQuantity: item.quantity,
            newQuantity: quantity
          });
          item.quantity = quantity;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
      console.log('💰 [CART SLICE] Cart after quantity update - Items:', state.itemCount, 'Total:', state.total);
    },
    
    clearCart: (state) => {
      console.log('🧹 [CART SLICE] Clearing cart, previous items:', state.itemCount);
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      console.log('✨ [CART SLICE] Cart cleared successfully');
    },
    
    calculateTotals: (state) => {
      const previousTotal = state.total;
      const previousCount = state.itemCount;
      
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => {
        const price = item.sale_price || item.price;
        return total + (price * item.quantity);
      }, 0);
      
      console.log('🧮 [CART SLICE] Recalculated totals:', {
        previousCount,
        newCount: state.itemCount,
        previousTotal: previousTotal.toFixed(2),
        newTotal: state.total.toFixed(2)
      });
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartItemById = (id) => (state) => 
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;
