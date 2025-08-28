import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Notification } from '@mantine/core';
import { IconCheck, IconX, IconShoppingCart, IconTrash, IconHeart } from '@tabler/icons-react';
import { removeNotification } from '../../store/slices/notificationSlice';

const NotificationContainer = () => {
  const { notifications } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <IconCheck size={18} />;
      case 'error':
        return <IconX size={18} />;
      case 'cart-add':
        return <IconShoppingCart size={18} />;
      case 'cart-remove':
        return <IconTrash size={18} />;
      case 'wishlist':
        return <IconHeart size={18} />;
      default:
        return <IconCheck size={18} />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success':
      case 'cart-add':
        return 'green';
      case 'error':
        return 'red';
      case 'cart-remove':
        return 'orange';
      case 'wishlist':
        return 'pink';
      default:
        return 'blue';
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case 'cart-add':
        return 'Added to Cart';
      case 'cart-remove':
        return 'Removed from Cart';
      case 'wishlist':
        return 'Wishlist Updated';
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      default:
        return 'Notification';
    }
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, notification.duration);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '350px'
      }}
    >
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Notification
              icon={getIcon(notification.type)}
              color={getColor(notification.type)}
              title={getTitle(notification.type)}
              onClose={() => dispatch(removeNotification(notification.id))}
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              {notification.message}
            </Notification>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
