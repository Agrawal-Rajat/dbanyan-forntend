import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const initialState = {
  notifications: []
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { type, message, duration = 4000 } = action.payload;
      const notification = {
        id: nanoid(),
        type,
        message,
        duration,
        timestamp: Date.now()
      };
      
      state.notifications.push(notification);
      
      console.log('🔔 [NOTIFICATION] Added:', notification);
    },
    
    removeNotification: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== id);
      console.log('🔕 [NOTIFICATION] Removed:', id);
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
      console.log('🗑️ [NOTIFICATION] Cleared all notifications');
    }
  }
});

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
