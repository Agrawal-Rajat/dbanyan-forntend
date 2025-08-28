// Dbanyan Group - Modern Checkout Page
// Premium e-commerce checkout experience with real inventory validation

import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Card, 
  Title, 
  Text, 
  Button, 
  TextInput, 
  Select, 
  Group, 
  Stack, 
  Badge, 
  Divider,
  Alert,
  Stepper,
  Radio,
  Checkbox,
  NumberInput,
  ActionIcon,
  Loader,
  Center
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';
import BreadcrumbNav from '../components/layout/BreadcrumbNav';
import {
  IconShoppingCart, 
  IconTruck, 
  IconCreditCard, 
  IconShield,
  IconMapPin,
  IconUser,
  IconMail,
  IconPhone,
  IconEdit,
  IconCheck,
  IconArrowLeft,
  IconLock,
  IconGift,
  IconDiscount,
  IconPlus,
  IconMinus,
  IconX,
  IconAlertTriangle
} from '@tabler/icons-react';

// Mock user data (minimal)
const mockUser = {
  id: null,
  name: "",
  email: "",
  phone: ""
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart state from Redux
  const { items, total } = useSelector(state => state.cart);
  const user = mockUser;
  
  // All hooks must be declared before any early returns
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [inventoryErrors, setInventoryErrors] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [isValidatingInventory, setIsValidatingInventory] = useState(false);
  
  // Type-safe customer info state with validation
  const [customerInfo, setCustomerInfo] = useState({
    firstName: user?.full_name?.split(' ')[0] || '',
    lastName: user?.full_name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  
  console.log('💳 [CHECKOUT PAGE] Cart state:', { 
    itemCount: items.length, 
    total: total,
    items: items.map(item => ({ id: item.productId, name: item.productName, quantity: item.quantity }))
  });
  
  // Redux cart functions
  const removeItem = (productId, productName) => {
    dispatch(removeFromCart(productId));
    dispatch(addNotification({
      type: 'info',
      title: 'Item Removed',
      message: `${productName} removed from cart`
    }));
  };
  
  const updateItemQuantity = (productId, quantity, productName) => {
    if (quantity <= 0) {
      removeItem(productId, productName);
      return;
    }
    dispatch(updateQuantity({ productId, quantity }));
  };
  
  const clearCartItems = () => {
    dispatch(clearCart());
    dispatch(addNotification({
      type: 'success',
      title: 'Cart Cleared',
      message: 'All items removed from cart'
    }));
  };

  // Validation function for customer info
  const validateCustomerInfo = useCallback(() => {
    const errors = {};
    if (!customerInfo.firstName?.trim()) errors.firstName = 'First name is required';
    if (!customerInfo.lastName?.trim()) errors.lastName = 'Last name is required';
    if (!customerInfo.email?.trim()) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(customerInfo.email)) errors.email = 'Invalid email format';
    if (!customerInfo.phone?.trim()) errors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) errors.phone = 'Phone must be 10 digits';
    if (!customerInfo.address?.trim()) errors.address = 'Address is required';
    if (!customerInfo.city?.trim()) errors.city = 'City is required';
    if (!customerInfo.state?.trim()) errors.state = 'State is required';
    if (!customerInfo.pincode?.trim()) errors.pincode = 'Pincode is required';
    if (!/^\d{6}$/.test(customerInfo.pincode)) errors.pincode = 'Pincode must be 6 digits';
    return errors;
  }, [customerInfo]);
  
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Real API functions
  const createOrder = async (orderData) => {
    try {
      const result = await orderService.checkout(orderData);
      return { success: true, orderId: result.order_uid || result.id };
    } catch (error) {
      console.error('Order creation failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  const validateInventory = async (items) => {
    try {
      const result = await orderService.validateInventory(items);
      return { available: true, errors: result.errors || [] };
    } catch (error) {
      console.error('Inventory validation failed:', error);
      return { available: false, errors: ['Unable to validate inventory'] };
    }
  };
  
  const validateCoupon = async (code) => {
    try {
      const result = await orderService.validateCoupon(code);
      return { valid: result.valid, discount: result.discount || 0 };
    } catch (error) {
      console.error('Coupon validation failed:', error);
      return { valid: false, discount: 0 };
    }
  };
  
  const calculateShipping = async (address) => {
    try {
      const result = await orderService.calculateShipping(address);
      return { cost: result.cost || 49 };
    } catch (error) {
      console.error('Shipping calculation failed:', error);
      return { cost: 49 }; // Default shipping cost
    }
  };

  // Real inventory validation effect
  useEffect(() => {
    if (items.length > 0) {
      setIsValidatingInventory(true);
      validateInventory(items).then(result => {
        setInventoryErrors(result.errors || []);
        setIsValidatingInventory(false);
      });
    }
  }, [items]);

  // Real shipping calculation when pincode or delivery option changes
  useEffect(() => {
    if (customerInfo.pincode && customerInfo.pincode.length === 6 && items.length > 0) {
      const shippingData = {
        pincode: customerInfo.pincode,
        city: customerInfo.city,
        state: customerInfo.state,
        delivery_option: deliveryOption,
        total_amount: total
      };
      
      calculateShipping(shippingData).then(result => {
        setShippingCost(result.cost || 0);
      });
    }
  }, [customerInfo.pincode, customerInfo.city, customerInfo.state, deliveryOption, items, total]);

  // Add error handling for empty cart
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Empty Cart - Dbanyan Group</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-8">
          <Container size="xl">
            <Alert 
              title="Empty Cart" 
              color="blue" 
              variant="filled"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Your cart is empty. Please add some products before proceeding to checkout.
              <Button 
                color="green" 
                mt="md" 
                onClick={() => navigate('/products')}
              >
                Browse Products
              </Button>
            </Alert>
          </Container>
        </div>
      </>
    );
  }

  // Calculate totals with real data
  const subtotal = total;
  const deliveryCharge = shippingCost || (deliveryOption === 'express' ? 99 : (subtotal > 499 ? 0 : 49));
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal + deliveryCharge - discountAmount;

  // Steps configuration
  const steps = [
    { label: 'Cart Review', icon: <IconShoppingCart className="w-4 h-4" /> },
    { label: 'Delivery Details', icon: <IconTruck className="w-4 h-4" /> },
    { label: 'Payment', icon: <IconCreditCard className="w-4 h-4" /> },
    { label: 'Confirmation', icon: <IconCheck className="w-4 h-4" /> }
  ];

  const handlePromoApply = async () => {
    try {
      const result = await validateCoupon(promoCode);
      
      if (result.valid) {
        setDiscount(result.discount || 0);
        setPromoApplied(true);
        dispatch(addNotification({
          title: 'Promo Applied!',
          message: `${result.discount}% off applied`,
          type: 'success'
        }));
      } else {
        dispatch(addNotification({
          title: 'Invalid Promo Code',
          message: 'Please check your promo code and try again',
          type: 'error'
        }));
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      dispatch(addNotification({
        title: 'Coupon Error',
        message: 'Unable to validate promo code. Please try again.',
        type: 'error'
      }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Prepare order data with correct backend field mapping
      const orderData = {
        items: items.map(item => {
          const productName = item.productName || item.name || item.title || 'Unknown Product';
          return {
            product_id: item.productId || item.product_id,
            product_name: productName,
            product_slug: productName.toLowerCase().replace(/\s+/g, '-'),
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
          };
        }),
        shipping_address: {
          full_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          phone: customerInfo.phone,
          address_line_1: customerInfo.address,
          address_line_2: customerInfo.landmark || null,
          city: customerInfo.city,
          state: customerInfo.state,
          postal_code: customerInfo.pincode,
          country: "India"
        },
        order_notes: `Payment: ${paymentMethod}${promoApplied ? ` | Promo: ${promoCode}` : ''}`
      };

      if (paymentMethod === 'cod') {
        // Handle Cash on Delivery
        try {
          const result = await paymentService.processCODOrder(orderData);
          
          if (result.order_id) {
            clearCartItems();
            dispatch(addNotification({
              title: 'Order Placed Successfully!',
              message: `Order #${result.order_number || result.order_id}. You will receive a confirmation email shortly.`,
              type: 'success'
            }));
            navigate('/');
          } else {
            throw new Error(result.message || 'Failed to place COD order');
          }
        } catch (error) {
          console.error('COD order error:', error);
          throw new Error('Failed to place COD order. Please try again.');
        }
      } else if (paymentMethod === 'upi') {
        // Handle UPI Payment through Razorpay
        try {
          // Create order first
          const orderResult = await createOrder(orderData);
          
          if (orderResult.success) {
            // Process UPI payment
            const paymentResult = await paymentService.processUPIPayment({
              amount: finalTotal,
              id: orderResult.orderId,
              customer: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                phone: customerInfo.phone
              }
            });
            
            if (paymentResult.success) {
              clearCartItems();
              dispatch(addNotification({
                title: 'UPI Payment Successful!',
                message: `Order #${orderResult.orderId}. Payment processed via UPI.`,
                type: 'success'
              }));
              navigate('/');
            } else {
              throw new Error('UPI payment failed');
            }
          } else {
            throw new Error('Failed to create order');
          }
        } catch (error) {
          console.error('UPI payment error:', error);
          throw new Error('UPI payment failed. Please try again.');
        }
      } else if (paymentMethod === 'razorpay' || paymentMethod === 'online' || paymentMethod === 'card') {
        // Handle Razorpay Payment (supports UPI, Cards, Net Banking)
        try {
          // Create order first
          const orderResult = await createOrder(orderData);
          
          if (orderResult.success) {
            // Process online payment
            const paymentResult = await paymentService.initializeRazorpayPayment({
              amount: finalTotal,
              id: orderResult.orderId,
              customer: {
                name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                email: customerInfo.email,
                phone: customerInfo.phone
              }
            });
            
            if (paymentResult.success) {
              // Verify payment with backend
              const verificationResult = await paymentService.verifyPayment({
                razorpay_order_id: paymentResult.orderId,
                razorpay_payment_id: paymentResult.paymentId,
                razorpay_signature: paymentResult.signature
              });
              
              if (verificationResult.success) {
                clearCartItems();
                dispatch(addNotification({
                  title: 'Payment Successful!',
                  message: `Order #${orderResult.orderId}. Payment ID: ${paymentResult.paymentId}`,
                  type: 'success'
                }));
                navigate('/');
              } else {
                throw new Error('Payment verification failed');
              }
            } else {
              throw new Error('Payment processing failed');
            }
          } else {
            throw new Error('Failed to create order');
          }
        } catch (error) {
          console.error('Razorpay payment error:', error);
          throw new Error(error.message || 'Payment failed. Please try again.');
        }
      } else {
        // Handle other payment methods
        try {
          const orderResult = await createOrder(orderData);
          
          if (orderResult.success) {
            clearCartItems();
            dispatch(addNotification({
              title: 'Order Placed Successfully!',
              message: `Order #${orderResult.orderId}. Thank you for your purchase!`,
              type: 'success'
            }));
            navigate('/');
          } else {
            throw new Error('Failed to create order');
          }
        } catch (error) {
          console.error('Order creation error:', error);
          throw new Error('Failed to create order. Please try again.');
        }
      }
      
    } catch (error) {
      console.error('Order placement error:', error);
      dispatch(addNotification({
        title: 'Order Failed',
        message: error.message || 'There was an error processing your order. Please try again.',
        type: 'error'
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Checkout | Dbanyan Group</title>
        <meta name="description" content="Secure checkout for your products" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav 
          items={[
            { title: 'Cart', href: '/cart' },
            { title: 'Checkout' }
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
                Back to Shopping
              </Button>
              <div className="text-center">
                <Title order={1} className="text-3xl font-serif text-green-800">
                  Secure Checkout
                </Title>
                <Group justify="center" gap="xs" className="mt-2">
                  <IconShield className="w-4 h-4 text-green-600" />
                  <Text size="sm" className="text-green-600">256-bit SSL Encrypted</Text>
                </Group>
              </div>
              <div className="w-32" /> {/* Spacer for centering */}
            </Group>

            {/* Progress Stepper */}
            <Card className="bg-white shadow-sm">
              <Stepper 
                active={activeStep} 
                onStepClick={setActiveStep}
                allowNextStepsSelect={false}
                className="w-full"
              >
                {steps.map((step, index) => (
                  <Stepper.Step 
                    key={index}
                    label={step.label}
                    icon={step.icon}
                  />
                ))}
              </Stepper>
            </Card>
          </motion.div>

          {/* Inventory Validation Alert */}
          {inventoryErrors.length > 0 && (
            <Alert 
              color="orange" 
              icon={<IconAlertTriangle size={16} />}
              className="mb-4"
            >
              <Text size="sm" weight={500}>Inventory Issues Detected</Text>
              <Text size="xs" mt="xs">
                Some items in your cart are no longer available in the requested quantity. 
                Please review and update your cart.
              </Text>
            </Alert>
          )}

          <Grid gutter="lg">
            {/* Main Content */}
            <Grid.Col span={{ base: 12, lg: 8 }}>
              <AnimatePresence mode="wait">
                {/* Step 1: Cart Review */}
                {activeStep === 0 && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="bg-white shadow-sm">
                      <Stack gap="lg">
                        <Group justify="space-between">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Review Your Order
                          </Title>
                          {isValidatingInventory && (
                            <Group gap="xs">
                              <Loader size="sm" />
                              <Text size="sm" color="dimmed">Validating inventory...</Text>
                            </Group>
                          )}
                        </Group>
                        
                        {items.map((item) => {
                          const inventoryError = inventoryErrors.find(err => err.product_uid === item.product_id);
                          return (
                            <div key={item.product_id} className="border-b border-gray-100 pb-4 last:border-b-0">
                              <Group justify="space-between" align="flex-start">
                                <div className="flex-1">
                                  <Group gap="md">
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                      <img 
                                        src={item.image || '/images/moringaPowderPic.jpg'} 
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
                                      {inventoryError && (
                                        <Alert color="red" size="xs" className="mb-2">
                                          <Text size="xs">
                                            Only {inventoryError.available_quantity} available
                                          </Text>
                                        </Alert>
                                      )}
                                      <Group gap="xs">
                                        <ActionIcon
                                          variant="outline"
                                          size="sm"
                                          onClick={() => updateItemQuantity(item.product_id, Math.max(1, item.quantity - 1), item.name)}
                                          className="border-green-300 text-green-600"
                                          disabled={inventoryError && item.quantity <= 1}
                                        >
                                          <IconMinus className="w-3 h-3" />
                                        </ActionIcon>
                                        <Text className="mx-2 min-w-8 text-center font-semibold">
                                          {item.quantity}
                                        </Text>
                                        <ActionIcon
                                          variant="outline"
                                          size="sm"
                                          onClick={() => updateItemQuantity(item.product_id, item.quantity + 1, item.name)}
                                          className="border-green-300 text-green-600"
                                          disabled={inventoryError && item.quantity >= inventoryError.available_quantity}
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
                                    onClick={() => removeItem(item.product_id, item.name)}
                                    className="mt-2"
                                  >
                                    <IconX className="w-4 h-4" />
                                  </ActionIcon>
                                </div>
                              </Group>
                            </div>
                          );
                        })}

                        <Button 
                          fullWidth 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setActiveStep(1)}
                          disabled={inventoryErrors.length > 0 || isValidatingInventory}
                        >
                          Continue to Delivery Details
                        </Button>
                      </Stack>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Delivery Details */}
                {activeStep === 1 && (
                  <motion.div
                    key="delivery"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Stack gap="lg">
                      {/* Contact Information */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Contact Information
                          </Title>
                          
                          <Grid>
                            <Grid.Col span={6}>
                              <TextInput
                                label="First Name"
                                placeholder="Enter first name"
                                value={customerInfo.firstName}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, firstName: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Last Name"
                                placeholder="Enter last name"
                                value={customerInfo.lastName}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, lastName: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Email"
                                placeholder="your@email.com"
                                type="email"
                                value={customerInfo.email}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, email: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={6}>
                              <TextInput
                                label="Phone"
                                placeholder="+91 XXXXX XXXXX"
                                value={customerInfo.phone}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, phone: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                          </Grid>
                        </Stack>
                      </Card>

                      {/* Delivery Address */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Delivery Address
                          </Title>
                          
                          <TextInput
                            label="Address"
                            placeholder="House no, Building, Street"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo(prev => ({...prev, address: e.target.value}))}
                            required
                          />
                          
                          <Grid>
                            <Grid.Col span={4}>
                              <TextInput
                                label="City"
                                placeholder="City"
                                value={customerInfo.city}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, city: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Select
                                label="State"
                                placeholder="Select state"
                                value={customerInfo.state}
                                onChange={(value) => setCustomerInfo(prev => ({...prev, state: value}))}
                                data={[
                                  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat',
                                  'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Punjab', 'Haryana'
                                ]}
                                required
                              />
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <TextInput
                                label="PIN Code"
                                placeholder="000000"
                                value={customerInfo.pincode}
                                onChange={(e) => setCustomerInfo(prev => ({...prev, pincode: e.target.value}))}
                                required
                              />
                            </Grid.Col>
                          </Grid>
                          
                          <TextInput
                            label="Landmark (Optional)"
                            placeholder="Near landmark for easy delivery"
                            value={customerInfo.landmark}
                            onChange={(e) => setCustomerInfo(prev => ({...prev, landmark: e.target.value}))}
                          />
                        </Stack>
                      </Card>

                      {/* Delivery Options */}
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Delivery Options
                          </Title>
                          
                          <Stack gap="sm">
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                deliveryOption === 'standard' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setDeliveryOption('standard')}
                            >
                              <Group justify="space-between">
                                <div>
                                  <Group gap="sm">
                                    <Radio 
                                      checked={deliveryOption === 'standard'} 
                                      onChange={() => setDeliveryOption('standard')}
                                    />
                                    <div>
                                      <Text className="font-semibold">Standard Delivery</Text>
                                      <Text size="sm" className="text-gray-600">5-7 business days</Text>
                                    </div>
                                  </Group>
                                </div>
                                <Text className="font-semibold text-green-600">
                                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                                </Text>
                              </Group>
                            </Card>
                            
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                deliveryOption === 'express' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setDeliveryOption('express')}
                            >
                              <Group justify="space-between">
                                <div>
                                  <Group gap="sm">
                                    <Radio 
                                      checked={deliveryOption === 'express'} 
                                      onChange={() => setDeliveryOption('express')}
                                    />
                                    <div>
                                      <Text className="font-semibold">Express Delivery</Text>
                                      <Text size="sm" className="text-gray-600">2-3 business days</Text>
                                    </div>
                                  </Group>
                                </div>
                                <Text className="font-semibold text-orange-600">₹{deliveryCharge}</Text>
                              </Group>
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>

                      <Group justify="space-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveStep(0)}
                          className="border-green-600 text-green-600"
                        >
                          Back to Cart
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => setActiveStep(2)}
                          disabled={!customerInfo.firstName || !customerInfo.email || !customerInfo.address || !customerInfo.pincode}
                        >
                          Continue to Payment
                        </Button>
                      </Group>
                    </Stack>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {activeStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Stack gap="lg">
                      <Card className="bg-white shadow-sm">
                        <Stack gap="md">
                          <Title order={3} className="text-xl font-semibold text-gray-800">
                            Payment Method
                          </Title>
                          
                          <Stack gap="sm">
                            {/* UPI Payment */}
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'upi' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('upi')}
                            >
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Radio 
                                    checked={paymentMethod === 'upi'} 
                                    onChange={() => setPaymentMethod('upi')}
                                  />
                                  <div>
                                    <Group gap="xs">
                                      <Text className="font-semibold">UPI Payment</Text>
                                      <Badge size="xs" className="bg-green-100 text-green-700">Recommended</Badge>
                                    </Group>
                                    <Text size="sm" className="text-gray-600">
                                      Google Pay, PhonePe, Paytm & more
                                    </Text>
                                  </div>
                                </Group>
                                <Text className="text-2xl">📱</Text>
                              </Group>
                            </Card>

                            {/* Cards */}
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'card' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('card')}
                            >
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Radio 
                                    checked={paymentMethod === 'card'} 
                                    onChange={() => setPaymentMethod('card')}
                                  />
                                  <div>
                                    <Text className="font-semibold">Credit/Debit Cards</Text>
                                    <Text size="sm" className="text-gray-600">
                                      Visa, Mastercard, Rupay
                                    </Text>
                                  </div>
                                </Group>
                                <Text className="text-2xl">💳</Text>
                              </Group>
                            </Card>

                            {/* Wallets */}
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'wallet' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('wallet')}
                            >
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Radio 
                                    checked={paymentMethod === 'wallet'} 
                                    onChange={() => setPaymentMethod('wallet')}
                                  />
                                  <div>
                                    <Text className="font-semibold">Digital Wallets</Text>
                                    <Text size="sm" className="text-gray-600">
                                      Paytm, PhonePe, Amazon Pay
                                    </Text>
                                  </div>
                                </Group>
                                <Text className="text-2xl">👛</Text>
                              </Group>
                            </Card>

                            {/* Net Banking */}
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'netbanking' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('netbanking')}
                            >
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Radio 
                                    checked={paymentMethod === 'netbanking'} 
                                    onChange={() => setPaymentMethod('netbanking')}
                                  />
                                  <div>
                                    <Text className="font-semibold">Net Banking</Text>
                                    <Text size="sm" className="text-gray-600">
                                      All major banks supported
                                    </Text>
                                  </div>
                                </Group>
                                <Text className="text-2xl">🏦</Text>
                              </Group>
                            </Card>
                            
                            {/* Cash on Delivery */}
                            <Card 
                              className={`cursor-pointer border-2 transition-all ${
                                paymentMethod === 'cod' 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-green-300'
                              }`}
                              onClick={() => setPaymentMethod('cod')}
                            >
                              <Group justify="space-between">
                                <Group gap="sm">
                                  <Radio 
                                    checked={paymentMethod === 'cod'} 
                                    onChange={() => setPaymentMethod('cod')}
                                  />
                                  <div>
                                    <Text className="font-semibold">Cash on Delivery</Text>
                                    <Text size="sm" className="text-gray-600">
                                      Pay when you receive your order
                                    </Text>
                                  </div>
                                </Group>
                                <Text className="text-2xl">💰</Text>
                              </Group>
                            </Card>
                          </Stack>
                        </Stack>
                      </Card>

                      <Group justify="space-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveStep(1)}
                          className="border-green-600 text-green-600"
                        >
                          Back to Delivery
                        </Button>
                        <Button 
                          size="lg"
                          className="bg-green-600 hover:bg-green-700"
                          loading={isProcessing}
                          onClick={handlePlaceOrder}
                          disabled={inventoryErrors.length > 0}
                        >
                          {isProcessing ? 'Processing...' : `Place Order - ₹${finalTotal}`}
                        </Button>
                      </Group>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Grid.Col>

            {/* Order Summary Sidebar */}
            <Grid.Col span={{ base: 12, lg: 4 }}>
              <div className="sticky top-8">
                <Card className="bg-white shadow-sm">
                  <Stack gap="md">
                    <Title order={3} className="text-xl font-semibold text-gray-800">
                      Order Summary
                    </Title>
                    
                    <Divider />
                    
                    {/* Promo Code */}
                    {!promoApplied && (
                      <div>
                        <Group gap="xs">
                          <TextInput
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline"
                            onClick={handlePromoApply}
                            className="border-green-600 text-green-600"
                            loading={false}
                          >
                            Apply
                          </Button>
                        </Group>
                      </div>
                    )}
                    
                    {promoApplied && (
                      <Alert color="green" icon={<IconGift className="w-4 h-4" />}>
                        <Text size="sm">Promo code applied - {discount}% off!</Text>
                      </Alert>
                    )}
                    
                    <Divider />
                    
                    {/* Price Breakdown */}
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</Text>
                        <Text>₹{subtotal}</Text>
                      </Group>
                      
                      <Group justify="space-between">
                        <Text>Delivery charges</Text>
                        <Text className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                          {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                        </Text>
                      </Group>
                      
                      {promoApplied && (
                        <Group justify="space-between">
                          <Text className="text-green-600">Discount ({discount}%)</Text>
                          <Text className="text-green-600">-₹{discountAmount}</Text>
                        </Group>
                      )}
                      
                      <Divider />
                      
                      <Group justify="space-between" className="text-lg font-semibold">
                        <Text>Total</Text>
                        <Text>₹{finalTotal}</Text>
                      </Group>
                    </Stack>
                    
                    {/* Security Badge */}
                    <Card className="bg-green-50 border border-green-200">
                      <Group gap="sm">
                        <IconLock className="w-5 h-5 text-green-600" />
                        <div>
                          <Text size="sm" className="font-semibold text-green-800">
                            Secure Payment
                          </Text>
                          <Text size="xs" className="text-green-600">
                            Your payment information is protected
                          </Text>
                        </div>
                      </Group>
                    </Card>
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

export default CheckoutPage;
