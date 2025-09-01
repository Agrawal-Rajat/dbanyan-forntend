// Dbanyan Group - User Profile Page
// Complete user dashboard with orders, profile, and cart management

import React, { useState, useEffect } from 'react';
import GetProductByIdData from '../API_FILES/product_apis/GetProductByIdData';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Group, 
  Stack, 
  Button, 
  Card, 
  Avatar, 
  Badge, 
  Divider,
  Tabs,
  TextInput,
  Table,
  ActionIcon,
  Alert,
  Grid,
  Box,
  Progress
} from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Verify from '../API_FILES/auth_apis/Verify';
import Logout from '../API_FILES/auth_apis/Logout';
import RemoveFromCart from '../API_FILES/product_apis/RemoveFromCart';
import GetOrderById from '../API_FILES/order_apis/GetOrderById';
// import { useUserStore, useCartStore } from '../store';
import { 
  IconUser, 
  IconShoppingBag, 
  IconSettings, 
  IconEdit, 
  IconMail, 
  IconPhone,
  IconCalendar,
  IconTruck,
  IconCheck,
  IconX,
  IconTrash,
  IconHeart,
  IconLogout,
  IconShield,
  IconPlaceholder,
  IconCircle0,
  IconBuildingBank,
  IconBuildingEstate,
  IconMapPinCode,
  IconHomeLink
} from '@tabler/icons-react';
import { addcart,removecart, addwishlist, clearCartData, clearWishlistData } from '../store/slices/WishlistAndCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, getorderbyid } from '../NwConfig';
import CustomLoader from '../Loader/CustomLoader';
import EditUserDetails from '../API_FILES/auth_apis/EditUserDetails';
const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
    const cart=useSelector((state)=>state.wishlistandcart.cart)
  // console.log(cart)
    const [cartdata, setCartdata] = useState([]);
      const [counters, setCounters] = useState({}); // Track per-item counter
    const [spinner,setSpinner]=useState(false)
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
    const [orders,setorders]=useState([])
    const getuserorder=async()=>{
      const res=await GetOrderById()
      // console.log(res)
      if(res?.data){
        setorders(res?.data)
      }
    }
    useEffect(() => { getCartDataForUser(cart); getuserorder() }, [cart]);
    
const handleRemoveItem = async(productId) => {
  setSpinner(true);
  const form={id:productId}
  const res = await RemoveFromCart(form);
  if(res.message === "Removed From Cart"){
    setSpinner(false);
    dispatch(removecart(productId.toString()));
    setCartdata(prev => prev.filter(item => item.id !== productId));
    addNotification({ type: 'info', title: 'Removed', message: 'Item removed from cart' });
  }
};

  
  const [isAuthenticated,setisAuthnticated] = useState(false);
    const [name,setname] = useState({});
    const [admin,setadmin] = useState(false);
     const [user,setuser] = useState({
    userId:"",
    email:"",
    mobile_number:"",
    created_at:"",
    city:"",
    state:"",
    pincode:0,
    full_address:""
  });
  const [profileForm, setProfileForm] = useState({
  userId: user?.userId || '',
  mobile_number: user?.mobile_number || '',
  email:user?.email,
  city: user?.city || '',
  state: user?.state || '',
  pincode: user?.pincode || 0,
  full_address: user?.full_address || ''
});
   const scheduleAutoLogout = () => {
        const expiry = localStorage.getItem("tehunyzu@37673");
        if (!expiry) return;
      
        const timeout = expiry - Date.now();
        if (timeout > 0) {
          setTimeout(() => {
            logoutUser(); // clear storage, redirect
          }, timeout);
        } else {
          logoutUser();
        }
      };
      const verifyuser=async()=>{
        const expiry=localStorage.getItem('tehunyzu@37673')
        const timeout = expiry - Date.now();
        if(timeout>0 && expiry){
          const res=await Verify()
          if(res?.message=="Login verified successfully"){
            setisAuthnticated(true)
            setuser({
              userId:res?.userId,
              email:res?.email,
              mobile_number:res?.mobile_number,
              created_at:res?.created_at,
              city:res?.city,
              state:res?.state,
              pincode:res?.pincode,
              full_address:res?.full_address
            })
            setProfileForm({
              userId:res?.userId,
              email:res?.email,
              mobile_number:res?.mobile_number,
              created_at:res?.created_at,
              city:res?.city,
              state:res?.state,
              pincode:res?.pincode,
              full_address:res?.full_address
            })
            setadmin(res?.admin)
            console.log("yedhwb2781980@998")
            dispatch(clearCartData())
            dispatch(clearWishlistData())
            // console.log(res)
            if(res?.cartlist && Array.isArray(res?.cartlist) && res?.cartlist?.length>=1){
              res?.cartlist?.forEach((item)=>dispatch(addcart(item)))
            }
            if(res?.wishlist && Array.isArray(res?.wishlist) && res?.wishlist?.length>=1){
              res?.wishlist?.forEach((item)=>dispatch(addwishlist(item)))
            }
            // console.log(cart,wishlist)
          }
          
        }
        
      }
      
      useEffect(()=>{
      scheduleAutoLogout()
      verifyuser()
      
      },[])
      const logoutUser = async() => {
                  const res=await Logout()
            
          };
  //
  // Mock data (until backend is rebuilt)
  // Will be fetched from backend
  // const isAuthenticated = false; // Will be managed by auth system
  const logout = () => {
    // Logout functionality will be implemented with backend
    navigate('/');
  };
  const cartItems = [];
 
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  // const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
const handleProfileChange = (field, value) => {
  setProfileForm(prev => ({ ...prev, [field]: value }));
};
const handleProfileSave = async() => {
  if (editMode) {
    setSpinner(true)
    // console.log("Updated Profile Data:", profileForm);
    const res=await EditUserDetails(profileForm)
    // console.log(res)
    if(res.message==="User Updated SuccessFully"){
      setSpinner(false)
      window.location.reload()
    }
    else{
      setSpinner(false)
    }
  }
  setEditMode(!editMode);
};
  
  // Redirect if not authenticated
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated, navigate]);

  

  if (!isAuthenticated || !user) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'shipped': return 'blue';
      case 'processing': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  if(spinner){
    return <CustomLoader />
  }
  return (
    <>
      <Helmet>
        <title>Profile | Dbanyan Group</title>
        <meta name="description" content="Manage your Dbanyan Group account, view orders, and update profile information." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <Paper className="p-6 mb-6" shadow="sm">
              <Group justify="space-between" align="center">
                <Group align="center">
                  <Avatar 
                    size="lg" 
                    className="bg-emerald-500"
                    style={{ fontSize: '24px' }}
                  >
                    {user.userId?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </Avatar>
                  <div>
                    <Title order={2} className="text-gray-800">
                      {user.userId || 'User'}
                    </Title>
                    <Text c="dimmed" size="sm">
                      {user.email}
                    </Text>
                    <Badge 
                      color={admin  ? 'red' : 'blue'} 
                      variant="light" 
                      size="sm"
                      leftSection={admin ? <IconShield size={12} /> : <IconUser size={12} />}
                    >
                      {admin ? 'Administrator' : 'Customer'}
                    </Badge>
                  </div>
                </Group>
                <Group>
                  {admin && (
                    <Button 
                      leftSection={<IconSettings size={16} />}
                      onClick={() => navigate('/admin')}
                      variant="light"
                    >
                      Admin Panel
                    </Button>
                  )}
                  <Button 
                    leftSection={<IconLogout size={16} />}
                    onClick={logoutUser}
                    variant="outline"
                    color="red"
                  >
                    Logout
                  </Button>
                </Group>
              </Group>
            </Paper>

            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab 
                  value="profile" 
                  leftSection={<IconUser size={16} />}
                >
                  Profile
                </Tabs.Tab>
                <Tabs.Tab 
                  value="orders" 
                  leftSection={<IconShoppingBag size={16} />}
                >
                  Orders ({orders.length})
                </Tabs.Tab>
                <Tabs.Tab 
                  value="cart" 
                  leftSection={<IconTruck size={16} />}
                >
                  Cart ({cart?.length})
                </Tabs.Tab>
              </Tabs.List>

              {/* Profile Tab */}
              <Tabs.Panel value="profile" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Group justify="space-between" mb="md">
                    <Title order={3}>Personal Information</Title>
                    <Button 
                      leftSection={<IconEdit size={16} />}
                      onClick={handleProfileSave}
                      variant={editMode ? 'filled' : 'light'}
                    >
                      {editMode ? 'Save' : 'Edit'}
                    </Button>
                  </Group>

                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Full Name"
                        value={profileForm.userId}
                        disabled={!editMode}
                        onChange={(e) => handleProfileChange('userId', e.target.value)}
                        leftSection={<IconUser size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Email"
                        value={profileForm.email}
                        disabled
                        leftSection={<IconMail size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Phone"
                        value={profileForm.mobile_number || ''}
                        onChange={(e) => handleProfileChange('mobile_number', e.target.value)}
                        disabled={!editMode}
                        leftSection={<IconPhone size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Member Since"
                        value={new Date(user.created_at).toLocaleDateString()}
                        disabled
                        leftSection={<IconCalendar size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="City"
                        value={profileForm.city}
                        onChange={(e) => handleProfileChange('city', e.target.value)}
                        disabled={!editMode}
                        leftSection={<IconBuildingBank size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="State"
                        value={profileForm.state}
                        onChange={(e) => handleProfileChange('state', e.target.value)}
                        disabled={!editMode}
                        leftSection={<IconBuildingEstate size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Pincode"
                        value={profileForm.pincode}
                        type='number'
                        onChange={(e) => handleProfileChange('pincode', e.target.value)}
                        disabled={!editMode}
                        leftSection={<IconMapPinCode size={16} />}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Full Address"
                        value={profileForm.full_address}
                        onChange={(e) => handleProfileChange('full_address', e.target.value)}
                        disabled={!editMode}
                        leftSection={<IconHomeLink size={16} />}
                      />
                    </Grid.Col>
                  </Grid>

                  {user.last_login && (
                    <Alert color="blue" mt="md" variant="light">
                      Last login: {new Date(user.last_login).toLocaleString()}
                    </Alert>
                  )}
                </Paper>
              </Tabs.Panel>

              {/* Orders Tab */}
              <Tabs.Panel value="orders" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Title order={3} mb="md">Order History</Title>
                  
                  {orders.length === 0 ? (
                    <Alert color="blue" variant="light">
                      No orders found. Start shopping to see your orders here!
                    </Alert>
                  ) : (
                    <Stack gap="md">
                      {orders?.map((order) => (
  <Card key={order.order_id} className="border border-gray-200 mb-4">
    <Group justify="space-between" mb="sm">
      <Group>
        <Text fw={600}>#{order.order_id}</Text>
        <Badge color={getStatusColor(order.status)} variant="light">
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </Group>
      <Text size="sm" c="dimmed">
        {new Date(order.created_at).toLocaleDateString()}
      </Text>
    </Group>

    <Divider my="sm" />

    <Group justify="space-between">
      <img 
        src={`${API_URL}/${order?.products?.images?.[0]}` || '/images/placeholder.jpg'}
        alt={order.products.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <Text size="sm">
        {order.products.name} × {order.quantity}
      </Text>
      <Text size="sm" fw={500}>
        ₹{order.amount}
      </Text>
    </Group>

    <Divider my="sm" />

    <Group justify="space-between">
      <Text fw={600}>Total</Text>
      <Text fw={600} size="lg" className="text-emerald-600">
        ₹{order.amount}
      </Text>
    </Group>
  </Card>
))}


                    </Stack>
                  )}
                </Paper>
              </Tabs.Panel>

              {/* Cart Tab */}
              <Tabs.Panel value="cart" pt="md">
                <Paper className="p-6" shadow="sm">
                  <Group justify="space-between" mb="md">
                    <Title order={3}>Shopping Cart</Title>
                    {cart.length > 0 && (
                      <Button onClick={() => navigate('/checkout')}>
                        Proceed to Checkout
                      </Button>
                    )}
                  </Group>
                  
                  {cart.length === 0 ? (
                    <Alert color="blue" variant="light">
                      Your cart is empty. Browse our products to add items!
                    </Alert>
                  ) : (
                    <Stack gap="md">
                      {cartdata.map((item) => (
                        <Card key={item.id} className="border border-gray-200">
                          <Group justify="space-between" align="center">
                            <Group>
                              <Box className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                {item.images ? (
                                  <img 
                                    src={`${API_URL}/${item?.images?.[0]}` || '/images/placeholder.jpg'}
                                    alt={item.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <IconShoppingBag size={24} className="text-gray-400" />
                                )}
                              </Box>
                              <div>
                                <Text fw={500}>{item.name}</Text>
                                <Text size="sm" c="dimmed">₹{item.price} each</Text>
                                {/* <Text size="sm">Quantity: {item.quantity}</Text> */}
                              </div>
                            </Group>
                            <Group>
                              <Text fw={600} size="lg">
                                ₹{(item.price ).toFixed(2)}
                              </Text>
                              <ActionIcon 
                                color="red" 
                                variant="light"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Group>
                          </Group>
                        </Card>
                      ))}
                      
                      <Divider />
                      
                      <Group justify="space-between">
                        <Text size="lg" fw={600}>Total</Text>
                        <Text size="xl" fw={700} className="text-emerald-600">
                          ₹{cartdata.reduce((sum, item) => sum + (item.price ), 0).toFixed(2)}
                        </Text>
                      </Group>
                    </Stack>
                  )}
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
