// Dbanyan Group - Cart Page
// Professional cart management with real-time updates

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Divider,
  ActionIcon,
  NumberInput,
  Center,
  Loader
} from '@mantine/core';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import {
  IconShoppingCart,
  IconTrash,
  IconPlus,
  IconMinus,
  IconArrowLeft,
  IconTruck,
  IconShield
} from '@tabler/icons-react';

// Professional Cart Page with Redux integration
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart state from Redux
  const { items, total, itemCount } = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cart operations
  const handleRemoveItem = (productId) => {
    const item = items.find(item => item.id === productId || item.product_id === productId);
    console.log('🗑️ [CART PAGE] Removing item:', productId);
    
    dispatch(removeFromCart(productId));
    
    // Show notification
    if (item) {
      dispatch(addNotification({
        type: 'cart-remove',
        message: `${item.name} removed from cart`,
        duration: 3000
      }));
    }
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    console.log('🔄 [CART PAGE] Updating quantity:', { productId, newQuantity });
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    console.log('🗑️ [CART PAGE] Clearing entire cart');
    dispatch(clearCart());
    
    dispatch(addNotification({
      type: 'cart-remove',
      message: 'Cart cleared successfully',
      duration: 3000
    }));
  };

  // Handle checkout process
  const handleCheckout = () => {
    if (items.length === 0) {
      console.warn('⚠️ [CART PAGE] Cannot checkout with empty cart');
      return;
    }
    
    setIsLoading(true);
    console.log('💳 [CART PAGE] Proceeding to checkout with items:', items.length);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      navigate('/checkout');
    }, 500);
  };

  // Add notification system for better UX
  const showNotification = (type, message) => {
    // This would integrate with a toast/notification system
    console.log(`📢 [CART PAGE] ${type.toUpperCase()}: ${message}`);
  };

  // Store cart page visit in localStorage for persistence
  useEffect(() => {
    localStorage.setItem('last_cart_visit', new Date().toISOString());
  }, []);

  const handleQuantityChange = (productUid, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productUid);
      addNotification({
        title: 'Item Removed',
        message: 'Item has been removed from your cart',
        type: 'info'
      });
    } else {
      updateQuantity(productUid, newQuantity);
    }
  };

  const handleRemoveItem = (productUid, productName) => {
    removeItem(productUid);
    addNotification({
      title: 'Item Removed',
      message: `${productName} has been removed from your cart`,
      type: 'info'
    });
  };

  const handleClearCart = () => {
    clearCart();
    addNotification({
      title: 'Cart Cleared',
      message: 'All items have been removed from your cart',
      type: 'info'
    });
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      addNotification({
        title: 'Empty Cart',
        message: 'Please add items to your cart before proceeding',
        type: 'warning'
      });
      return;
    }
    navigate('/checkout');
  };

  // Calculate totals
  const subtotal = total;
  const shippingCost = subtotal > 499 ? 0 : 49;
  const finalTotal = subtotal + shippingCost;

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart | Dbanyan Group</title>
        </Helmet>
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-16">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <IconShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <Title order={2} className="text-2xl text-gray-700 mb-4">Your cart is empty</Title>
              <Text className="text-gray-600 mb-6">Add some products to get started</Text>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/products')}
              >
                Start Shopping
              </Button>
            </motion.div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Your Cart | Dbanyan Group</title>
        <meta name="description" content="Review your cart and proceed to checkout" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav 
          items={[
            { title: 'Products', href: '/products' },
            { title: 'Cart' }
          ]} 
        />
        
        <Container size="xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Group justify="space-between" align="center" className="mb-6">
              <Button
                variant="subtle"
                leftSection={<IconArrowLeft className="w-4 h-4" />}
                onClick={() => navigate('/products')}
                className="text-green-600 hover:bg-green-50"
              >
                Continue Shopping
              </Button>
              <div className="text-center">
                <Title order={1} className="text-3xl font-serif text-green-800">
                  Your Cart
                </Title>
                <Text className="text-gray-600 mt-2">
                  {items.length} item{items.length !== 1 ? 's' : ''} in your cart
                </Text>
              </div>
              <Button
                variant="subtle"
                color="red"
                onClick={handleClearCart}
                className="text-red-600 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </Group>
          </motion.div>

          <Grid gutter="lg">
            {/* Cart Items */}
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <Card className="bg-white shadow-sm">
                <Stack gap="lg">
                  <Title order={3} className="text-xl font-semibold text-gray-800">
                    Cart Items
                  </Title>
                  
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.uid}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-gray-100 pb-4 last:border-b-0"
                      >
                        <Group justify="space-between" align="flex-start">
                          <div className="flex-1">
                            <Group gap="md">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                <img 
                                  src={item.images?.[0] || '/images/moringaPowderPic.jpg'} 
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.src = '/images/moringaPowderPic.jpg';
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <Title order={5} className="text-gray-800 mb-1">
                                  {item.name}
                                </Title>
                                <Text size="sm" className="text-gray-600 mb-2">
                                  ₹{item.price} each
                                </Text>
                                <Group gap="xs">
                                  <ActionIcon
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.uid, item.quantity - 1)}
                                    className="border-green-300 text-green-600"
                                  >
                                    <IconMinus className="w-3 h-3" />
                                  </ActionIcon>
                                  <NumberInput
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(item.uid, value)}
                                    min={1}
                                    max={item.max_quantity || 999}
                                    size="sm"
                                    className="w-16"
                                    styles={{
                                      input: { textAlign: 'center' }
                                    }}
                                  />
                                  <ActionIcon
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.uid, item.quantity + 1)}
                                    className="border-green-300 text-green-600"
                                    disabled={item.quantity >= (item.max_quantity || 999)}
                                  >
                                    <IconPlus className="w-3 h-3" />
                                  </ActionIcon>
                                </Group>
                              </div>
                            </Group>
                          </div>
                          <div className="text-right">
                            <Text className="text-lg font-semibold text-gray-800">
                              ₹{item.price * item.quantity}
                            </Text>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              size="sm"
                              onClick={() => handleRemoveItem(item.uid, item.name)}
                              className="mt-2"
                            >
                              <IconTrash className="w-4 h-4" />
                            </ActionIcon>
                          </div>
                        </Group>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
              </Card>
            </Grid.Col>

            {/* Order Summary */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <div className="sticky top-8">
                <Card className="bg-white shadow-sm">
                  <Stack gap="md">
                    <Title order={3} className="text-xl font-semibold text-gray-800">
                      Order Summary
                    </Title>
                    
                    <Divider />
                    
                    {/* Price Breakdown */}
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</Text>
                        <Text>₹{subtotal}</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Text>Shipping</Text>
                        <Text className={shippingCost === 0 ? 'text-green-600' : ''}>
                          {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                        </Text>
                      </Group>
                      
                      <Divider />
                      
                      <Group justify="space-between" className="text-lg font-semibold">
                        <Text>Total</Text>
                        <Text>₹{finalTotal}</Text>
                      </Group>
                    </Stack>
                    
                    {/* Shipping Info */}
                    <Card className="bg-green-50 border border-green-200">
                      <Group gap="sm">
                        <IconTruck className="w-5 h-5 text-green-600" />
                        <div>
                          <Text size="sm" className="font-semibold text-green-800">
                            Free Shipping
                          </Text>
                          <Text size="xs" className="text-green-600">
                            On orders above ₹499
                          </Text>
                        </div>
                      </Group>
                    </Card>
                    
                    {/* Security Badge */}
                    <Card className="bg-blue-50 border border-blue-200">
                      <Group gap="sm">
                        <IconShield className="w-5 h-5 text-blue-600" />
                        <div>
                          <Text size="sm" className="font-semibold text-blue-800">
                            Secure Checkout
                          </Text>
                          <Text size="xs" className="text-blue-600">
                            Your payment is protected
                          </Text>
                        </div>
                      </Group>
                    </Card>
                    
                    {/* Checkout Button */}
                    <Button 
                      fullWidth 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </Stack>
                </Card>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CartPage; 