import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Grid, Card, Title, Text, Button, Group, Stack, Divider, ActionIcon,
  NumberInput, Image, Paper, Badge, Select, Modal, Alert
} from '@mantine/core';
import { addNotification } from '../../store/slices/notificationSlice';
import ProfessionalBreadcrumbs from './ProfessionalBreadcrumbs';
import { TrustSignals, SecurityBadges } from './TrustSignals';
import {
  IconShoppingCart, IconTrash, IconPlus, IconMinus, IconArrowLeft, IconTruck,
  IconHeart, IconTicket, IconLock, IconX
} from '@tabler/icons-react';
import verifyuser from '../../API_FILES/Verify';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import GetProductByIdData from '../../API_FILES/product_apis/GetProductByIdData';
import CustomLoader from '../../Loader/CustomLoader';
import { API_URL,RAZORPAY_KEY_ID } from '../../NwConfig';
import RemoveFromCart from '../../API_FILES/product_apis/RemoveFromCart';
import { removecart } from '../../store/slices/WishlistAndCartSlice';
import VerifyOrderData from '../../API_FILES/order_apis/VerifyOrderData';
import CreateOrder from '../../API_FILES/order_apis/CreateOrder';
const EnhancedCartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.wishlistandcart.cart);

  const [spinner, setSpinner] = useState(false);
  const [cartdata, setCartdata] = useState([]);
  const [counters, setCounters] = useState({}); // Track per-item counter
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Fetch product data
  const getCartDataForUser = async (cart) => {
    try {
      setSpinner(true);
      const data = await Promise.all(cart.map(async (item) => {
        const res = await GetProductByIdData(item);
        return res.data; // only data
      }));
      setCartdata(data);

      // Initialize counters to 1
      const initCounters = {};
      data.forEach(item => { initCounters[item.id] = 1; });
      setCounters(initCounters);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => { getCartDataForUser(cart); }, [cart]);

  // Counter handlers
 const handleUpdateCounter = (productId, newCount, price) => {
  setCounters(prev => ({
    ...prev,
    [productId]: {
      count: newCount < 1 ? 1 : newCount,
      price: price
    }
  }));
};

  // Order summary calculations
  const subtotal = cartdata.reduce(
    (acc, item) => acc + item.price * (counters[item.id]?.count || 1), 0
  );
  const deliveryCharge = subtotal >= 1000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const discount = appliedPromo ? Math.round(subtotal * appliedPromo.discount) : 0;
  // const finalTotal = subtotal + deliveryCharge + tax - discount;
  const finalTotal=subtotal

  // Cart operations
  const handleRemoveItem = async(productId, productName) => {
    // console.log(productId)
    setSpinner(true)
    const form={id:productId}
    const res=await RemoveFromCart(form)
    // console.log(res)
    if(res.message==="Removed From Cart"){
      setSpinner(false)
      dispatch(removecart(productId.toString()))
    }
  };

  const handleSaveForLater = (item) => {
    setSavedItems(prev => [...prev, item]);
    handleRemoveItem(item.id, item.name);
    dispatch(addNotification({
      type: 'success',
      title: 'Saved for Later',
      message: `${item.name} moved to saved items`
    }));
  };

  const handleMoveToCart = (item) => {
    setSavedItems(prev => prev.filter(saved => saved.id !== item.id));
    setCartdata(prev => [...prev, item]);
    setCounters(prev => ({ ...prev, [item.id]: 1 }));
    dispatch(addNotification({
      type: 'success',
      title: 'Moved to Cart',
      message: `${item.name} added back to cart`
    }));
  };

  const handleRemoveSaved = (productId, productName) => {
    setSavedItems(prev => prev.filter(item => item.id !== productId));
    dispatch(addNotification({
      type: 'info',
      title: 'Item Removed',
      message: `${productName} removed from saved items`
    }));
  };

  const handleApplyPromo = () => {
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

  const handleProceedToCheckout = async() => {
    // if (cartdata.length === 0) {
    //   dispatch(addNotification({
    //     type: 'warning',
    //     title: 'Empty Cart',
    //     message: 'Please add items to your cart before checkout'
    //   }));
    //   return;
    // }
              setSpinner(true)

    const res=await verifyuser(dispatch)
    if(!res.city || !res.full_address || !res.pincode || !res.state){
      toast.error("Complete Address Before Proceding To Pay", {
                    position: "top-center",
                  });
                  setTimeout(() => {
                    
                    navigate("/profile")
                  }, 2000);
    }
    else{
              console.log(counters)
              console.log(finalTotal)
              const form={totalprice:finalTotal}
              const res=await CreateOrder(form)
              if(res?.data){
      handlePaymentVerify(finalTotal,res?.data?.id)

              }
      //         prdata["count"]=quantity
      // prdata["totalprice"]=quantity*prdata.price
    }
    // navigate('/checkout');
  };
  const handlePaymentVerify = async (data, orderid) => {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: data.totalprice,
    currency: "INR",
    name: "Dbanyan Moringa",
    description: "Test Mode",
    order_id: orderid,
    handler: async (response) => {
      console.log("response", response);

      try {
        let commondata = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        };

        // Loop through counters and call VerifyOrderData for each product
        for (const [id, val] of Object.entries(counters)) {
          const productData = {
            ...commondata,
            id,
            count: val.count,
            totalprice: val.price * val.count
          };

          const res = await VerifyOrderData(productData);

          if (res?.message==="Payement Successfully") {
            const form={id:id}
            const res=await RemoveFromCart(form)
            if(res.message==="Removed From Cart"){
      // setSpinner(false)
      dispatch(removecart(id.toString()))
    }
            console.log(`✅ Product ${id} verified successfully`, res);
          } else {
            console.warn(`⚠️ Product ${id} verification failed`, res);
          }
        }

        setSpinner(false);
        toast.success(`Payment Completed! We Will Contact You Soon`, {
          position: "top-center"
        });

        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);

      } catch (err) {
        setSpinner(false);
        toast.error("Something went wrong during verification", {
          position: "top-center"
        });
        console.error(err);
      }
    },
    theme: {
      color: "#5f63b8"
    }
  };

  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  setSpinner(false);
};

if(spinner){
  return <CustomLoader />
}
  // CartItem component
  const CartItem = ({ item }) => (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
      <Card withBorder p="md" mb="md">
        <Grid align="center">
          <Grid.Col span={2}>
            <Image src={`${API_URL}/${item?.images?.[0]}` || '/images/placeholder.jpg'} alt={item.name} height={80} fit="contain" radius="sm" />
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack gap="xs">
              <Text fw={600} size="sm" lineClamp={2}>{item.name}</Text>
              <Group gap="xs">
                <Badge color="green" variant="light" size="xs">In Stock</Badge>
                <Badge color="blue" variant="light" size="xs">Free Delivery</Badge>
              </Group>
              <Group gap="md">
                <Button variant="subtle" size="xs" leftSection={<IconHeart size={12} />} onClick={() => handleSaveForLater(item)}>Save for later</Button>
                <Button variant="subtle" size="xs" color="red" leftSection={<IconTrash size={12} />} onClick={() => handleRemoveItem(item.id, item.name)}>Remove</Button>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={3}>
            <Group gap="xs" justify="center">
              <ActionIcon
  variant="outline"
  size="sm"
  onClick={() =>
    handleUpdateCounter(item.id, (counters[item.id]?.count || 1) - 1, item.price)
  }
  disabled={(counters[item.id]?.count || 1) <= 1}
>
  <IconMinus size={14} />
</ActionIcon>

<NumberInput
  value={counters[item.id]?.count || 1}
  onChange={(val) => handleUpdateCounter(item.id, val || 1, item.price)}
  min={1}
  max={10}
  size="sm"
  w={60}
  styles={{ input: { textAlign: "center" } }}
/>

<ActionIcon
  variant="outline"
  size="sm"
  onClick={() =>
    handleUpdateCounter(item.id, (counters[item.id]?.count || 1) + 1, item.price)
  }
  disabled={(counters[item.id]?.count || 1) >= 10}
>
  <IconPlus size={14} />
</ActionIcon>
</Group>
          </Grid.Col>

          <Grid.Col span={3}>
            <Stack gap="xs" align="flex-end">
              <Text size="lg" fw={700} c="green">₹{((item.price || 0) * (counters[item.id]?.count || 1)).toLocaleString()}</Text>
              <Text size="xs" c="dimmed">₹{item.price?.toLocaleString()} each</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    </motion.div>
  );

  // SavedItem component
  const SavedItem = ({ item }) => (
    <Card withBorder p="sm" mb="sm">
      <Grid align="center">
        <Grid.Col span={3}>
          <Image src={`${API_URL}/${item?.images?.[0]}` || '/images/placeholder.jpg'} alt={item.name} height={60} fit="contain" radius="sm" />
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack gap="xs">
            <Text fw={500} size="sm" lineClamp={2}>{item.name}</Text>
            <Text size="sm" c="green" fw={600}>₹{item.price.toLocaleString()}</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={3}>
          <Stack gap="xs">
            <Button size="xs" variant="outline" onClick={() => handleMoveToCart(item)}>Move to Cart</Button>
            <Button size="xs" variant="subtle" color="red" onClick={() => handleRemoveSaved(item.id, item.name)}>Remove</Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${cartdata?.length || 0} items) - Dbanyan Group`}</title>
        <meta name="description" content="Review your cart and proceed to checkout" />
      </Helmet>
              <ToastContainer />


      <Container size="xl" py="md">
        <ProfessionalBreadcrumbs />
        <Grid gutter="xl">
          <Grid.Col span={8}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Title order={2}>Shopping Cart</Title>
                <Text c="dimmed">{cartdata.length} {cartdata.length === 1 ? 'item' : 'items'}</Text>
              </Group>

              <AnimatePresence mode="popLayout">
                {cartdata.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Paper withBorder p="xl" style={{ textAlign: 'center' }}>
                      <Stack align="center" gap="md">
                        <IconShoppingCart size={48} color="gray" />
                        <Title order={3} c="dimmed">Your cart is empty</Title>
                        <Text c="dimmed">Add some products to get started!</Text>
                        <Button leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/products')}>Continue Shopping</Button>
                      </Stack>
                    </Paper>
                  </motion.div>
                ) : (
                  <>
                    {cartdata.map((item, index) => <CartItem key={item.id || `cart-item-${index}`} item={item} />)}
                  </>
                )}
              </AnimatePresence>

              {savedItems.length > 0 && (
                <div>
                  <Divider my="xl" />
                  <Title order={3} mb="md">Saved for Later ({savedItems.length})</Title>
                  {savedItems.map(item => <SavedItem key={item.id} item={item} />)}
                </div>
              )}

              <Paper withBorder p="md" mt="lg">
                <TrustSignals variant="compact" />
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card withBorder p="lg" style={{ position: 'sticky', top: '20px' }}>
              <Stack gap="md">
                <Title order={3}>Order Summary</Title>
                <Divider />
                <Stack gap="xs">
                  <Group justify="space-between"><Text>Subtotal ({cartdata.length} items)</Text><Text>₹{subtotal.toLocaleString()}</Text></Group>
                  {/* <Group justify="space-between"><Text>Delivery Charges</Text><Text c={deliveryCharge === 0 ? 'green' : 'dark'}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</Text></Group> */}
                  {/* <Group justify="space-between"><Text>Tax</Text><Text>₹{tax.toLocaleString()}</Text></Group> */}
                  {/* {appliedPromo && (<Group justify="space-between"><Text c="green">Discount ({appliedPromo.code})</Text><Text c="green">-₹{discount.toLocaleString()}</Text></Group>)} */}
                </Stack>
                <Divider />
                <Group justify="space-between"><Text size="lg" fw={700}>Total</Text><Text size="lg" fw={700} c="green">₹{finalTotal.toLocaleString()}</Text></Group>

                <Stack gap="xs">
                  {/* <Button variant="subtle" leftSection={<IconTicket size={16} />} onClick={() => setShowPromoModal(true)} fullWidth>Apply Promo Code</Button> */}
                  {appliedPromo && (
                    <Alert color="green" p="xs">
                      <Group justify="space-between">
                        <Text size="sm">{appliedPromo.description}</Text>
                        <ActionIcon size="sm" color="green" onClick={() => { setAppliedPromo(null); setPromoCode(''); }}><IconX size={12} /></ActionIcon>
                      </Group>
                    </Alert>
                  )}
                </Stack>

                <Button size="lg" fullWidth leftSection={<IconLock size={20} />} onClick={handleProceedToCheckout} disabled={cartdata.length === 0} color="green">Proceed to Checkout</Button>
                <Button variant="outline" fullWidth leftSection={<IconArrowLeft size={16} />} onClick={() => navigate('/products')}>Continue Shopping</Button>
                <Divider />
                <SecurityBadges />
                <Paper bg="green.0" p="sm" radius="sm">
                  <Group gap="xs">
                    <IconTruck size={16} color="green" />
                    <Text size="sm" c="green" fw={500}>Free delivery on orders over ₹1000</Text>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Promo Modal */}
        <Modal opened={showPromoModal} onClose={() => setShowPromoModal(false)} title="Apply Promo Code" size="sm">
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
              onCreate={(query) => { setPromoCode(query); return query; }}
            />
            <Group justify="space-between">
              <Button variant="outline" onClick={() => setShowPromoModal(false)}>Cancel</Button>
              <Button onClick={handleApplyPromo} disabled={!promoCode}>Apply Code</Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </>
  );
};

export default EnhancedCartPage;
