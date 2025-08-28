import React, { useState } from 'react';
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
  Image,
  Paper,
  Badge,
  Anchor,
  Select,
  Modal,
  Alert
} from '@mantine/core';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import ProfessionalBreadcrumbs from './ProfessionalBreadcrumbs';
import { TrustSignals, SecurityBadges } from './TrustSignals';
import {
  IconShoppingCart,
  IconTrash,
  IconPlus,
  IconMinus,
  IconArrowLeft,
  IconTruck,
  IconShield,
  IconHeart,
  IconGift,
  IconTicket,
  IconLock,
  IconCreditCard,
  IconCheck,
  IconX
} from '@tabler/icons-react';

const EnhancedCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart state from Redux
  const { items, total } = useSelector(state => state.cart);
  
  // Local state for save for later items
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Mock delivery and tax calculations
  const subtotal = total;
  const deliveryCharge = total >= 1000 ? 0 : 99;
  const tax = Math.round(total * 0.05); // 5% tax
  const discount = appliedPromo ? Math.round(total * 0.1) : 0; // 10% discount
  const finalTotal = subtotal + deliveryCharge + tax - discount;

  // Cart operations with notifications
  const handleRemoveItem = (productId, productName) => {
    console.log('🗑️ [ENHANCED CART] Removing item:', productId);
    dispatch(removeFromCart(productId));
    dispatch(addNotification({
      type: 'info',
      title: 'Item Removed',
      message: `${productName} removed from cart`
    }));
  };

  const handleUpdateQuantity = (productId, newQuantity, productName) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, productName);
      return;
    }
    
    console.log('📝 [ENHANCED CART] Updating quantity:', { productId, newQuantity });
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleSaveForLater = (item) => {
    setSavedItems(prev => [...prev, item]);
    dispatch(removeFromCart(item.productId));
    dispatch(addNotification({
      type: 'success',
      title: 'Saved for Later',
      message: `${item.productName} moved to saved items`
    }));
  };

  const handleMoveToCart = (item) => {
    setSavedItems(prev => prev.filter(saved => saved.productId !== item.productId));
    dispatch(addNotification({
      type: 'success',
      title: 'Moved to Cart',
      message: `${item.productName} added back to cart`
    }));
  };

  const handleRemoveSaved = (productId, productName) => {
    setSavedItems(prev => prev.filter(item => item.productId !== productId));
    dispatch(addNotification({
      type: 'info',
      title: 'Item Removed',
      message: `${productName} removed from saved items`
    }));
  };

  const handleApplyPromo = () => {
    // Mock promo code validation
    const validPromoCodes = ['SAVE10', 'WELCOME20', 'FIRST15'];
    
    if (validPromoCodes.includes(promoCode.toUpperCase())) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: promoCode.toUpperCase() === 'WELCOME20' ? 0.2 : 0.1,
        description: `${promoCode.toUpperCase() === 'WELCOME20' ? '20' : '10'}% off your order`
      });
      dispatch(addNotification({
        type: 'success',
        title: 'Promo Applied!',
        message: `${promoCode.toUpperCase()} code applied successfully`
      }));
      setShowPromoModal(false);
    } else {
      dispatch(addNotification({
        type: 'error',
        title: 'Invalid Code',
        message: 'The promo code you entered is not valid'
      }));
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      dispatch(addNotification({
        type: 'warning',
        title: 'Empty Cart',
        message: 'Please add items to your cart before checkout'
      }));
      return;
    }
    
    console.log('💳 [ENHANCED CART] Proceeding to checkout:', { items, total: finalTotal });
    navigate('/checkout');
  };

  const CartItem = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card withBorder p="md" mb="md">
        <Grid align="center">
          <Grid.Col span={2}>
            <Image
              src={item.image || '/images/placeholder.jpg'}
              alt={item.productName}
              height={80}
              fit="contain"
              radius="sm"
            />
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Stack gap="xs">
              <Text fw={600} size="sm" lineClamp={2}>
                {item.productName}
              </Text>
              <Group gap="xs">
                <Badge color="green" variant="light" size="xs">In Stock</Badge>
                <Badge color="blue" variant="light" size="xs">Free Delivery</Badge>
              </Group>
              <Group gap="md">
                <Button 
                  variant="subtle" 
                  size="xs" 
                  leftSection={<IconHeart size={12} />}
                  onClick={() => handleSaveForLater(item)}
                >
                  Save for later
                </Button>
                <Button 
                  variant="subtle" 
                  size="xs" 
                  color="red"
                  leftSection={<IconTrash size={12} />}
                  onClick={() => handleRemoveItem(item.productId, item.productName)}
                >
                  Remove
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={3}>
            <Group gap="xs" justify="center">
              <ActionIcon
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, item.productName)}
                disabled={item.quantity <= 1}
              >
                <IconMinus size={14} />
              </ActionIcon>
              
              <NumberInput
                value={item.quantity}
                onChange={(val) => handleUpdateQuantity(item.productId, val || 1, item.productName)}
                min={1}
                max={10}
                size="sm"
                w={60}
                styles={{ input: { textAlign: 'center' } }}
              />
              
              <ActionIcon
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, item.productName)}
                disabled={item.quantity >= 10}
              >
                <IconPlus size={14} />
              </ActionIcon>
            </Group>
          </Grid.Col>
          
          <Grid.Col span={3}>
            <Stack gap="xs" align="flex-end">
              <Text size="lg" fw={700} c="green">
                ₹{(item.price * item.quantity).toLocaleString()}
              </Text>
              <Text size="xs" c="dimmed">
                ₹{item.price.toLocaleString()} each
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    </motion.div>
  );

  const SavedItem = ({ item }) => (
    <Card withBorder p="sm" mb="sm">
      <Grid align="center">
        <Grid.Col span={3}>
          <Image
            src={item.image || '/images/placeholder.jpg'}
            alt={item.productName}
            height={60}
            fit="contain"
            radius="sm"
          />
        </Grid.Col>
        
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500} size="sm" lineClamp={2}>
              {item.productName}
            </Text>
            <Text size="sm" c="green" fw={600}>
              ₹{item.price.toLocaleString()}
            </Text>
          </Stack>
        </Grid.Col>
        
        <Grid.Col span={3}>
          <Stack gap="xs">
            <Button 
              size="xs" 
              variant="outline"
              onClick={() => handleMoveToCart(item)}
            >
              Move to Cart
            </Button>
            <Button 
              size="xs" 
              variant="subtle" 
              color="red"
              onClick={() => handleRemoveSaved(item.productId, item.productName)}
            >
              Remove
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${items?.length || 0} items) - Dbanyan Group`}</title>
        <meta name="description" content="Review your cart and proceed to checkout" />
      </Helmet>

      <Container size="xl" py="md">
        <ProfessionalBreadcrumbs />

        <Grid gutter="xl">
          {/* Cart Items */}
          <Grid.Col span={8}>
            <Stack gap="lg">
              {/* Cart Header */}
              <Group justify="space-between">
                <Title order={2}>Shopping Cart</Title>
                <Text c="dimmed">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </Text>
              </Group>

              {/* Cart Items List */}
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Paper withBorder p="xl" style={{ textAlign: 'center' }}>
                      <Stack align="center" gap="md">
                        <IconShoppingCart size={48} color="gray" />
                        <Title order={3} c="dimmed">Your cart is empty</Title>
                        <Text c="dimmed">Add some products to get started!</Text>
                        <Button 
                          leftSection={<IconArrowLeft size={16} />}
                          onClick={() => navigate('/products')}
                        >
                          Continue Shopping
                        </Button>
                      </Stack>
                    </Paper>
                  </motion.div>
                ) : (
                  <>
                    {items.map((item, index) => (
                      <CartItem key={item.productId || item.id || `cart-item-${index}`} item={item} />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Saved for Later Section */}
              {savedItems.length > 0 && (
                <div>
                  <Divider my="xl" />
                  <Title order={3} mb="md">Saved for Later ({savedItems.length})</Title>
                  {savedItems.map((item) => (
                    <SavedItem key={item.productId} item={item} />
                  ))}
                </div>
              )}

              {/* Trust Signals */}
              <Paper withBorder p="md" mt="lg">
                <TrustSignals variant="compact" />
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Order Summary */}
          <Grid.Col span={4}>
            <Card withBorder p="lg" style={{ position: 'sticky', top: '20px' }}>
              <Stack gap="md">
                <Title order={3}>Order Summary</Title>
                
                <Divider />

                {/* Pricing Breakdown */}
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text>Subtotal ({items.length} items)</Text>
                    <Text>₹{subtotal.toLocaleString()}</Text>
                  </Group>
                  
                  <Group justify="space-between">
                    <Text>Delivery Charges</Text>
                    <Text c={deliveryCharge === 0 ? 'green' : 'dark'}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </Text>
                  </Group>
                  
                  <Group justify="space-between">
                    <Text>Tax</Text>
                    <Text>₹{tax.toLocaleString()}</Text>
                  </Group>
                  
                  {appliedPromo && (
                    <Group justify="space-between">
                      <Text c="green">Discount ({appliedPromo.code})</Text>
                      <Text c="green">-₹{discount.toLocaleString()}</Text>
                    </Group>
                  )}
                </Stack>

                <Divider />

                {/* Total */}
                <Group justify="space-between">
                  <Text size="lg" fw={700}>Total</Text>
                  <Text size="lg" fw={700} c="green">
                    ₹{finalTotal.toLocaleString()}
                  </Text>
                </Group>

                {/* Promo Code */}
                <Stack gap="xs">
                  <Button 
                    variant="subtle" 
                    leftSection={<IconTicket size={16} />}
                    onClick={() => setShowPromoModal(true)}
                    fullWidth
                  >
                    Apply Promo Code
                  </Button>
                  
                  {appliedPromo && (
                    <Alert color="green" p="xs">
                      <Group justify="space-between">
                        <Text size="sm">{appliedPromo.description}</Text>
                        <ActionIcon 
                          size="sm" 
                          color="green"
                          onClick={() => {
                            setAppliedPromo(null);
                            setPromoCode('');
                          }}
                        >
                          <IconX size={12} />
                        </ActionIcon>
                      </Group>
                    </Alert>
                  )}
                </Stack>

                {/* Checkout Button */}
                <Button
                  size="lg"
                  fullWidth
                  leftSection={<IconLock size={20} />}
                  onClick={handleProceedToCheckout}
                  disabled={items.length === 0}
                  color="green"
                >
                  Proceed to Checkout
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  fullWidth
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </Button>

                {/* Security Badges */}
                <Divider />
                <SecurityBadges />
                
                {/* Delivery Info */}
                <Paper bg="green.0" p="sm" radius="sm">
                  <Group gap="xs">
                    <IconTruck size={16} color="green" />
                    <Text size="sm" c="green" fw={500}>
                      Free delivery on orders over ₹1000
                    </Text>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Promo Code Modal */}
        <Modal 
          opened={showPromoModal} 
          onClose={() => setShowPromoModal(false)}
          title="Apply Promo Code"
          size="sm"
        >
          <Stack gap="md">
            <Select
              label="Choose a promo code"
              placeholder="Select or enter code"
              data={[
                { value: 'SAVE10', label: 'SAVE10 - 10% off your order' },
                { value: 'WELCOME20', label: 'WELCOME20 - 20% off for new customers' },
                { value: 'FIRST15', label: 'FIRST15 - 15% off first purchase' }
              ]}
              value={promoCode}
              onChange={setPromoCode}
              searchable
              creatable
              getCreateLabel={(query) => `Use code: ${query}`}
              onCreate={(query) => {
                setPromoCode(query);
                return query;
              }}
            />
            
            <Group justify="space-between">
              <Button variant="outline" onClick={() => setShowPromoModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyPromo} disabled={!promoCode}>
                Apply Code
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </>
  );
};

export default EnhancedCartPage;
