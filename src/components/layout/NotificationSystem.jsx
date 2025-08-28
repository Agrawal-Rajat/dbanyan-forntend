// Dbanyan Group - Simple Notification System
// Shows notifications for cart actions and other events

import React, { useEffect } from 'react';
import { Notification } from '@mantine/core';
// import { useUIStore } from '../../store';

const NotificationSystem = () => {
  // Mock data (until backend is rebuilt)
  const notifications = [];
  const removeNotification = (id) => console.log('Remove notification:', id);

  useEffect(() => {
    // Auto-remove notifications after 3 seconds
    notifications.forEach(notification => {
      if (notification.id) {
        setTimeout(() => {
          removeNotification(notification.id);
        }, 3000);
      }
    });
  }, [notifications, removeNotification]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          title={notification.title}
          color={notification.type === 'error' ? 'red' : 'green'}
          onClose={() => removeNotification(notification.id)}
          style={{ maxWidth: '350px' }}
        >
          {notification.message}
        </Notification>
      ))}
    </div>
  );
};

export default NotificationSystem;
