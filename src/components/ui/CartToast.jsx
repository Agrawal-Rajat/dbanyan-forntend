import React from 'react';
import { Notification } from '@mantine/core';
import { IconCheck, IconX, IconShoppingCart, IconTrash } from '@tabler/icons-react';

const CartToast = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IconCheck size={16} />;
      case 'error':
        return <IconX size={16} />;
      case 'cart-add':
        return <IconShoppingCart size={16} />;
      case 'cart-remove':
        return <IconTrash size={16} />;
      default:
        return <IconCheck size={16} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
      case 'cart-add':
        return 'green';
      case 'error':
        return 'red';
      case 'cart-remove':
        return 'orange';
      default:
        return 'blue';
    }
  };

  return (
    <Notification
      icon={getIcon()}
      color={getColor()}
      title={type === 'cart-add' ? 'Added to Cart' : type === 'cart-remove' ? 'Removed from Cart' : 'Cart Update'}
      onClose={onClose}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        maxWidth: '300px'
      }}
    >
      {message}
    </Notification>
  );
};

export default CartToast;
