import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Grid, Card, Title, Text, Button, Group, Stack, Divider,
  Image, Paper, Badge, ActionIcon
} from '@mantine/core';
import { addNotification } from '../../store/slices/notificationSlice';
import ProfessionalBreadcrumbs from './ProfessionalBreadcrumbs';
import { TrustSignals } from './TrustSignals';
import { IconTrash, IconArrowLeft, IconHeart } from '@tabler/icons-react';
import GetProductByIdData from '../../API_FILES/product_apis/GetProductByIdData';
import CustomLoader from '../../Loader/CustomLoader';
import { API_URL } from '../../NwConfig';
import AddToCart from '../../API_FILES/product_apis/AddToCart';
import { addcart, removewishlist } from '../../store/slices/WishlistAndCartSlice';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import RemoveFromWishlist from '../../API_FILES/product_apis/RemoveFromWishlist';
const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlistandcart.wishlist); // assuming wishlist is stored in redux
  const cart=useSelector(state=>state.wishlistandcart.cart)
  const [spinner, setSpinner] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);

  // Fetch wishlist items
  const getWishlistData = async () => {
    try {
      setSpinner(true);
      const data = await Promise.all(wishlist.map(async (item) => {
        const res = await GetProductByIdData(item);
        return res.data;
      }));
      setWishlistData(data);
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, [wishlist]);

  // Move item to cart
 const handleMoveToCart = async (item) => {
    setSpinner(true)
    const form={id:item.id}
    const res=await AddToCart(form)
    if(res.message=="Added To Cart"){
        setSpinner(false)
        dispatch(addcart(item.id))
        toast.success("Moved To Cart ", {
                            position: "top-center",
                          });
                    setTimeout(()=>{
                      window.location.href="/cart"
                    },1000)
    }
    // console.log(res)

};


  // Remove item from wishlist
  const handleRemoveItem = async(item) => {
        // console.log(item.id)
        setSpinner(true)
        const form={id:item.id}
        const res=await RemoveFromWishlist(form)
        // console.log(res)
        if(res.message==="Remove From Wishlist"){
            setSpinner(false)
            dispatch(removewishlist((item.id).toString()))
            
        }


  };
if(spinner){
  return <CustomLoader />
}
  // WishlistItem component

const WishlistItem = ({ item }) => {
  const cart = useSelector((state) => state.wishlistandcart.cart); // access cart
  

  // check if item exists in cart
  const isInCart = cart.some((cartItem) => cartItem === (item.id).toString());

  return (
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
              src={`${API_URL}/${item?.images?.[0]}` || "/images/placeholder.jpg"}
              alt={item.name}
              height={80}
              fit="contain"
              radius="sm"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack gap="xs">
              <Text fw={600} size="sm" lineClamp={2}>
                {item.name}
              </Text>
              <Group gap="xs">
                <Badge color="green" variant="light" size="xs">
                  In Stock
                </Badge>
              </Group>
              <Text size="sm" c="green" fw={600}>
                ₹{item.price?.toLocaleString()}
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Group direction="column" spacing="xs">
              {isInCart ? (
                <Button size="sm" variant="outline" disabled>
                  ✅ Already in Cart
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<IconHeart size={14} />}
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </Button>
              )}

              <Button
                size="sm"
                variant="subtle"
                color="red"
                leftIcon={<IconTrash size={14} />}
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>
    </motion.div>
  );
};

  return (
    <>
      <Helmet>
        <title>{`My Wishlist (${wishlistData?.length || 0}) - Dbanyan Group`}</title>
        <meta name="description" content="View and manage your wishlist items" />
      </Helmet>
<ToastContainer />


      <Container size="xl" py="md">
        <ProfessionalBreadcrumbs />
        <Stack gap="lg">
          <Group justify="space-between">
            <Title order={2}>My Wishlist</Title>
            <Text c="dimmed">{wishlistData.length} {wishlistData.length === 1 ? 'item' : 'items'}</Text>
          </Group>

          <AnimatePresence mode="popLayout">
            {wishlistData.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Paper withBorder p="xl" style={{ textAlign: 'center' }}>
                  <Stack align="center" gap="md">
                    <IconHeart size={48} color="gray" />
                    <Title order={3} c="dimmed">Your wishlist is empty</Title>
                    <Text c="dimmed">Add some products to save for later!</Text>
                    <Button leftIcon={<IconArrowLeft size={16} />} onClick={() => navigate('/products')}>Continue Shopping</Button>
                  </Stack>
                </Paper>
              </motion.div>
            ) : (
              <>
                {wishlistData.map(item => <WishlistItem key={item.id} item={item} />)}
              </>
            )}
          </AnimatePresence>

          <Paper withBorder p="md" mt="lg">
            <TrustSignals variant="compact" />
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

export default WishlistPage;
