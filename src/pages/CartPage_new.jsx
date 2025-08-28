// Dbanyan Group - Professional Cart Page
// Clean cart management with notifications

import React, { useEffect } from 'react';
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
  Divider,
  ActionIcon,
  NumberInput,
  Image
} from '@mantine/core';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';
import {
  IconShoppingCart,
  IconTrash,
  IconPlus,
  IconMinus,
  IconArrowLeft,
  IconTruck,
  IconShield
} from '@tabler/icons-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart state from Redux
  const { items, total } = useSelector(state => state.cart);
  
  // Cart operations with notifications
  const handleRemoveItem = (productId, productName) => {
    console.log('🗑️ [CART PAGE] Removing item:', productId);
    dispatch(removeFromCart(productId));
    dispatch(addNotification({
      type: 'cart-remove',
      message: `${productName} removed from cart`,
      duration: 3000
    }));
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      const item = items.find(i => i.id === productId || i.product_id === productId);
      handleRemoveItem(productId, item?.name || 'Item');
      return;
    }
    console.log('🔄 [CART PAGE] Updating quantity:', { productId, newQuantity });
    dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    console.log('🗑️ [CART PAGE] Clearing entire cart');
    dispatch(clearCart());
    dispatch(addNotification({
      type: 'success',
      message: 'Cart cleared successfully',
      duration: 3000
    }));
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      dispatch(addNotification({
        type: 'error',
        message: 'Your cart is empty',
        duration: 3000
      }));
      return;
    }
    
    console.log('💳 [CART PAGE] Proceeding to checkout');
    navigate('/checkout');
  };

  // Store cart visit
  useEffect(() => {
    localStorage.setItem('lastCartVisit', new Date().toISOString());
    console.log('📝 [CART PAGE] Cart page visit logged');
  }, []);

  // Calculate totals
  const subtotal = total;
  const shippingCost = subtotal > 499 ? 0 : 49;
  const finalTotal = subtotal + shippingCost;

  // Empty cart state
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
              <Title order={2} className="text-2xl text-gray-700 mb-4">
                Your cart is empty
              </Title>
              <Text className="text-gray-600 mb-6">
                Add some products to get started with your order
              </Text>
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/products')}
                leftSection={<IconArrowLeft size={18} />}
              >
                Continue Shopping
              </Button>
            </motion.div>
          </Container>
        </main>
      </>
    );
  }

  // Cart with items
  return (
    <>
      <Helmet>
        <title>Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'}) | Dbanyan Group</title>
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
        <Container size="xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Group justify="space-between" className="mb-4">
              <Title order={1} className="text-3xl text-gray-800">
                Shopping Cart
              </Title>
              <Button
                variant="outline"
                color="red"
                onClick={handleClearCart}
                leftSection={<IconTrash size={16} />}
              >
                Clear Cart
              </Button>
            </Group>
            <Text className="text-gray-600">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </Text>
          </motion.div>

          <Grid gutter="xl">
            {/* Cart Items */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack spacing="md">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id || item.product_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Grid align="center">
                          <Grid.Col span={2}>
                            <Image
                              src={item.image || '/images/moringaPowderPic.jpg'}
                              alt={item.name}
                              height={80}
                              radius="md"
                            />
                          </Grid.Col>
                          
                          <Grid.Col span={4}>
                            <Stack spacing="xs">
                              <Text weight={500} size="lg">
                                {item.name}
                              </Text>
                              <Text size="sm" color="dimmed">
                                ₹{item.price} each
                              </Text>
                            </Stack>
                          </Grid.Col>
                          
                          <Grid.Col span={3}>
                            <Group spacing="xs" align="center">
                              <ActionIcon
                                variant="outline"
                                onClick={() => handleUpdateQuantity(
                                  item.id || item.product_id, 
                                  item.quantity - 1
                                )}
                              >
                                <IconMinus size={16} />
                              </ActionIcon>
                              
                              <NumberInput
                                value={item.quantity}
                                onChange={(value) => handleUpdateQuantity(
                                  item.id || item.product_id, 
                                  value || 1
                                )}
                                min={1}
                                max={99}
                                style={{ width: 70 }}
                              />
                              
                              <ActionIcon
                                variant="outline"
                                onClick={() => handleUpdateQuantity(
                                  item.id || item.product_id, 
                                  item.quantity + 1
                                )}
                              >
                                <IconPlus size={16} />
                              </ActionIcon>
                            </Group>
                          </Grid.Col>
                          
                          <Grid.Col span={2}>
                            <Text weight={600} size="lg">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </Text>
                          </Grid.Col>
                          
                          <Grid.Col span={1}>
                            <ActionIcon
                              color="red"
                              variant="outline"
                              onClick={() => handleRemoveItem(
                                item.id || item.product_id, 
                                item.name
                              )}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Grid.Col>
                        </Grid>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Stack>
            </Grid.Col>

            {/* Order Summary */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card shadow="md" padding="lg" radius="md" withBorder>
                  <Stack spacing="md">
                    <Title order={3} className="text-xl text-gray-800">
                      Order Summary
                    </Title>
                    
                    <Divider />
                    
                    <Group justify="space-between">
                      <Text>Subtotal:</Text>
                      <Text weight={500}>₹{subtotal.toFixed(2)}</Text>
                    </Group>
                    
                    <Group justify="space-between">
                      <Group spacing="xs">
                        <IconTruck size={16} />
                        <Text>Shipping:</Text>
                      </Group>
                      <Text weight={500} color={shippingCost === 0 ? 'green' : undefined}>
                        {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                      </Text>
                    </Group>
                    
                    {subtotal > 0 && subtotal < 499 && (
                      <Text size="sm" color="orange">
                        Add ₹{(499 - subtotal).toFixed(2)} more for free shipping!
                      </Text>
                    )}
                    
                    <Divider />
                    
                    <Group justify="space-between">
                      <Text size="lg" weight={600}>Total:</Text>
                      <Text size="xl" weight={700} color="green">
                        ₹{finalTotal.toFixed(2)}
                      </Text>
                    </Group>
                    
                    <Button
                      size="lg"
                      fullWidth
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate('/products')}
                      leftSection={<IconArrowLeft size={16} />}
                    >
                      Continue Shopping
                    </Button>
                    
                    {/* Security badges */}
                    <Stack spacing="xs" className="mt-4">
                      <Group spacing="xs">
                        <IconShield size={16} className="text-green-600" />
                        <Text size="sm" color="dimmed">Secure Checkout</Text>
                      </Group>
                      <Text size="xs" color="dimmed">
                        Your payment information is encrypted and secure
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CartPage;
