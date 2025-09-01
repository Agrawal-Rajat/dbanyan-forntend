import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import notificationReducer from './slices/notificationSlice';
import WishlistAndCartReducer from "./slices/WishlistAndCartSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    user: userReducer,
    notifications: notificationReducer,
    wishlistandcart: WishlistAndCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// Export types for TypeScript support
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;