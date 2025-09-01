import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Container, 
  Title, 
  Text, 
  Card, 
  Button, 
  Badge, 
  Grid, 
  Loader, 
  Alert,
  Group,
  Stack,
  NumberInput,
  ActionIcon,
  Center,
  Image,
  Divider,
  Paper,
  Rating,
  Avatar,
  Tabs,
  List,
  ThemeIcon,
  Progress,
  Select,
  Anchor
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import ProfessionalBreadcrumbs from './ProfessionalBreadcrumbs';
import { TrustSignals, SecurityBadges } from './TrustSignals';
import ProductComparisonModal from './ProductComparisonModal';
import ReviewsSection from './ReviewsSection';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { 
  IconShoppingCart, 
  IconHeart,
  IconShare,
  IconShield,
  IconTruck,
  IconRefresh,
  IconStar,
  IconStarFilled,
  IconCheck,
  IconPlus,
  IconMinus,
  IconGift,
  IconCertificate
} from '@tabler/icons-react';
import GetProductByIdData from '../../API_FILES/product_apis/GetProductByIdData';
import { API_URL, RAZORPAY_KEY_ID } from '../../NwConfig';
import CustomLoader from '../../Loader/CustomLoader';
import verifyuser from '../../API_FILES/Verify';
import RemoveFromWishlist from '../../API_FILES/product_apis/RemoveFromWishlist';
import { addcart, addwishlist, removewishlist } from '../../store/slices/WishlistAndCartSlice';
import AddToWishlist from '../../API_FILES/product_apis/AddToWishlist';
import AddToCart from '../../API_FILES/product_apis/AddToCart';
import VerifyOrderData from '../../API_FILES/order_apis/VerifyOrderData';
import CreateOrder from '../../API_FILES/order_apis/CreateOrder';
const EnhancedProductDetailPage = () => {
  const { uid } = useParams();
  // const {uid}=location.state || {}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressincomplete,setaddressincomplete]=useState(false)
    const cart=useSelector((state)=>state.wishlistandcart.cart)
  // console.log(cart)
  
    const wishlist=useSelector((state)=>state.wishlistandcart.wishlist)
  async function  getcartandwihslistdetails(){
    const res=await verifyuser(dispatch)
    // console.log(res)
    if(!res.city || !res.full_address || !res.pincode || !res.state){
      setaddressincomplete(true)
    }
  }
  useEffect(()=>{
    getcartandwihslistdetails()
  },[])
 
    // console.log(wishlist)
  // Get Redux state
  const { currentProduct: product, isLoading, error } = useSelector(state => state.products);
  // const { items: cartItems } = useSelector(state => state.cart);

  // Local state
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  // const [isInWishlist, setIsInWishlist] = useState(false);
  const [spinner,setSpinner]=useState(false)
  const [prdata,setprdata]=useState({})
  // Fetch product on component mount
   const getprbyid=async(uid)=>{
    setSpinner(true)
      const res=await GetProductByIdData(uid)
      // console.log(res)
      if(res?.data){
        setSpinner(false)
        setprdata(res?.data)
      }
      else{
        setSpinner(false)
      }
    }
  useEffect(() => {
    if (uid) {
      console.log('🚀 [ENHANCED PRODUCT DETAIL] Fetching product:', uid);
      getprbyid(uid)
    }
  }, [uid]);

  // Handle add to cart
  const handleAddToCart = async() => {
    if (!prdata) return;
          const expiry = localStorage.getItem("tehunyzu@37673");
    if(!expiry){
      toast.error("Signup or Login First", {
                    position: "top-center",
                  });
                  setTimeout(() => {
                    
                    navigate("/signup")
                  }, 1000);

    }
    else{
setSpinner(true)
          const form={
            id:prdata.id
          }
          
          const res=await AddToCart(form)
          // console.log(res)
          // console.log(res)
          if(res.message==="Added To Cart"){
            setSpinner(false)
            toast.success(res.message, {
                          position: "top-center",
                        });
                        setTimeout(() => {
                          dispatch(addcart(prdata.id))
                          navigate("/cart")
                        }, 1000);
          }
          else{
            setSpinner(false)
            toast.error("Not Added To Cart Try Again later", {
                          position: "top-center",
                        });
          }
    
          // console.log("add to cart",product,quantity)
        
    }
    // console.log('🛒 [ENHANCED PRODUCT DETAIL] Adding to cart:', {
    //   productId: product.product_id,
    //   quantity
    // });

    // dispatch(addToCart({
    //   productId: product.product_id,
    //   productName: product.name,
    //   price: product.price,
    //   quantity: quantity,
    //   image: product.images?.[0] || '/images/placeholder.jpg'
    // }));

    // dispatch(addNotification({
    //   type: 'success',
    //   title: 'Added to Cart',
    //   message: `${product.name} (${quantity}) has been added to your cart`
    // }));
  };

  const handleBuyNow = async() => {
    // handleAddToCart();
          const expiry = localStorage.getItem("tehunyzu@37673");

    if(!expiry){
      toast.error("Signup or Login First", {
                    position: "top-center",
                  });
                  setTimeout(() => {
                    
                    navigate("/signup")
                  }, 1000);

    }
    else if(addressincomplete){
      toast.error("Complete Address Before Proceding To Pay", {
                    position: "top-center",
                  });
                  setTimeout(() => {
                    
                    navigate("/profile")
                  }, 2000);
    }
    else{
              setSpinner(true)
      prdata["count"]=quantity
      prdata["totalprice"]=quantity*prdata.price
      // console.log("Buy Now data",prdata)
      const res = await CreateOrder(prdata)
       if(res?.data){
              // setSpinner(true)
      }
      handlePaymentVerify(prdata,res?.data?.id)

      // navigate('/cart');
    }
  };
//   function generateOrderId(prefix = "ORD") {
//   const timestamp = Date.now(); // current time in ms
//   const randomNum = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
//   return `${prefix}_${timestamp}_${randomNum}`;
// }
  const handlePaymentVerify = async (data,orderid) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.totalprice,
      currency: "INR",
      name: "Dbanyan Moringa",
      description: "Test Mode",
      order_id: orderid,
      handler: async (response) => {
        console.log("response", response)
        try {
          data["razorpay_order_id"] = response.razorpay_order_id
          data["razorpay_payment_id"] = response.razorpay_payment_id
          data["razorpay_signature"] = response.razorpay_signature
          const res = await VerifyOrderData(data)
          // console.log(res)
          const verifyData = res;

          if (verifyData.message) {
            setSpinner(false)
            toast.success(`Payment Completed We Will Contact You Soon`, { position: "top-center" });
            // setTimeout(() => {
            //   window.location.href = `/userorderdetails?id=${localStorage.getItem("userid_addressID")}`
            // }, 1500)
            setTimeout(() => {
             window.location.href="/profile"
            }, 1500)
          }
        } catch (error) {
            setSpinner(false)

          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
            setSpinner(false)

  }
  const removeprfromwislist=async()=>{
    // console.log("Remove ",prdata.id)
    setSpinner(true)
            const form={id:prdata.id}
            const res=await RemoveFromWishlist(form)
            // console.log(res)
            if(res.message==="Remove From Wishlist"){
                setSpinner(false)
                dispatch(removewishlist((prdata.id).toString()))
                
            }
  }
  const toggleWishlist = async() => {
          const expiry = localStorage.getItem("tehunyzu@37673");
    if(!expiry){
      toast.error("Signup or Login First", {
                    position: "top-center",
                  });
                  setTimeout(() => {
                    
                    navigate("/signup")
                  }, 1000);

    }
    else{
      setSpinner(true)
             const form={
                  id:prdata.id
                }
                const res=await AddToWishlist(form)
                // console.log(res)
                if(res.message==="Added To Wishlist"){
                  setSpinner(false)
                  toast.success(res.message, {
                                position: "top-center",
                              });
                              setTimeout(() => {
                                dispatch(addwishlist(prdata.id))
                                navigate("/wishlist")
                              }, 1000);
                }
                else{
                  setSpinner(false)
                  toast.error("Not Added To Wishlist Try Again later", {
                                position: "top-center",
                              });
                }
    }
    // setIsInWishlist(!isInWishlist);
    // dispatch(addNotification({
    //   type: isInWishlist ? 'info' : 'success',
    //   title: isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
    //   message: `${product.name} ${isInWishlist ? 'removed from' : 'added to'} your wishlist`
    // }));
  };

  // Mock data for enhanced features
  const mockRating = 4.3;
  const mockReviewCount = 127;
  const mockReviews = [
    {
      id: 1,
      author: 'Priya S.',
      rating: 5,
      date: '2024-12-15',
      verified: true,
      title: 'Excellent quality moringa products!',
      content: 'Fresh and pure. I can taste the difference in quality compared to other brands.',
      helpful: 23
    },
    {
      id: 2,
      author: 'Raj K.',
      rating: 4,
      date: '2024-12-10',
      verified: true,
      title: 'Good value for money',
      content: 'Good packaging and fast delivery. Product quality is as expected.',
      helpful: 15
    },
    {
      id: 3,
      author: 'Anita M.',
      rating: 5,
      date: '2024-12-05',
      verified: true,
      title: 'Fresh and organic',
      content: 'The freshness is remarkable. Will definitely order again.',
      helpful: 8
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 10, percentage: 8 },
    { stars: 2, count: 2, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 }
  ];

  const isInCart = cart.some(item => Number(item) === prdata?.id);
  const isInWishlist = wishlist?.some((item) => Number(item) === prdata?.id);

  // Loading state
  if (spinner) {
    return (
      <CustomLoader />
    );
  }

  // Error state
  if (error || !prdata) {
    return (
      <>
        <Helmet>
          <title>Product Not Found - Dbanyan Group</title>
        </Helmet>
        <Container size="xl" py="xl">
          <Center style={{ minHeight: '50vh' }}>
            <Stack align="center" gap="md">
              <Alert color="red" title="Product Not Found">
                The product you're looking for could not be found.
              </Alert>
              <Button onClick={() => navigate('/products')}>
                Browse All Products
              </Button>
            </Stack>
          </Center>
        </Container>
      </>
    );
  }

  const images = prdata?.images?.length ? prdata?.images : ['/images/placeholder.jpg'];

  return (
    <>
      <Helmet>
        <title>{`${prdata?.name || 'Product'} - Dbanyan Group | Premium Moringa Products`}</title>
        <meta name="description" content={prdata?.description || 'Premium moringa product'} />
        <meta name="keywords" content={`${prdata?.name || 'moringa'}, moringa, organic, ${prdata?.category || 'health'}`} />
      </Helmet>
              <ToastContainer />
      

      <Container size="xl" py="md">
        {/* Breadcrumbs */}
        <ProfessionalBreadcrumbs 
          productName={prdata.name}
          categoryName={prdata.category}
        />

        <Grid gutter="xl">
          {/* Product Images */}
          <Grid.Col span={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Stack gap="md">
                {/* Main Image */}
                <Paper withBorder radius="md" p="md">
                  <Image
  src={`${API_URL}/${prdata?.images?.[selectedImage] || '/images/placeholder.jpg'}`}
  alt={prdata?.name || 'Product Image'}
  fit="contain"
  height={400}
  radius="md"
/>

                </Paper>

                {/* Image Thumbnails */}
                {images.length > 1 && (
  <Group justify="center" gap="xs">
    {images.map((image, index) => (
      <ActionIcon
        key={index}
        variant={selectedImage === index ? 'filled' : 'outline'}
        color="green"
        size="lg"
        onClick={() => setSelectedImage(index)}
      >
        <Image
          src={image ? `${API_URL}/${image}` : '/images/placeholder.jpg'}
          alt={`View ${image}`}
          width={40}
          height={40}
        />
      </ActionIcon>
    ))}
  </Group>
)}


                {/* Trust Badges */}
                <Group justify="center" gap="lg" mt="md">
                  <Badge variant="light" color="green" leftSection={<IconCertificate size={14} />}>
                    100% Organic
                  </Badge>
                  <Badge variant="light" color="blue" leftSection={<IconShield size={14} />}>
                    Quality Assured
                  </Badge>
                  <Badge variant="light" color="orange" leftSection={<IconTruck size={14} />}>
                    Free Delivery
                  </Badge>
                </Group>
              </Stack>
            </motion.div>
          </Grid.Col>

          {/* Product Information */}
          <Grid.Col span={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Stack gap="lg">
                {/* Product Title and Rating */}
                <div>
                  <Title order={1} size="h2" mb="xs">
                    {prdata.name}
                  </Title>
                  
                  <Group gap="md" mb="sm">
                    <Group gap="xs">
                      <Rating value={mockRating} fractions={2} readOnly size="sm" />
                      <Text size="sm" fw={500}>{mockRating}</Text>
                      <Anchor size="sm" c="blue">({mockReviewCount} reviews)</Anchor>
                    </Group>
                    
                    {prdata.is_featured && (
                      <Badge color="yellow" variant="filled">
                        Dbanyan's Choice
                      </Badge>
                    )}
                  </Group>

                  <Text size="sm" c="dimmed" mb="md">
                    Brand: <Text component="span" fw={500} c="dark">Dbanyan Group</Text> | 
                    Category: <Text component="span" fw={500} c="dark">{prdata.category}</Text>
                  </Text>
                </div>

                <Divider />

                {/* Pricing */}
<div>
  <Group align="baseline" gap="md">
    <Text size="xl" fw={700} c="red">
      ₹{(prdata.price * quantity)?.toLocaleString()}
    </Text>
    {prdata.compare_at_price && prdata.compare_at_price > prdata.price && (
      <>
        <Text size="lg" td="line-through" c="dimmed">
          ₹{(prdata.compare_at_price * quantity)?.toLocaleString()}
        </Text>
        <Badge color="red" variant="filled">
          {Math.round(((prdata.compare_at_price - prdata.price) / prdata.compare_at_price) * 100)}% OFF
        </Badge>
      </>
    )}
  </Group>
  
  <Text size="sm" c="dimmed" mt="xs">
    Inclusive of all taxes • Free delivery on orders over ₹1000
  </Text>
</div>


                <Divider />

                {/* Stock Status */}
                <div>
                  {prdata.quantity > 0 ? (
                    <Group gap="xs">
                      <ThemeIcon color="green" variant="light" size="sm">
                        <IconCheck size={14} />
                      </ThemeIcon>
                      <Text size="sm" c="green" fw={500}>
                        In Stock ({prdata.quantity} available)
                      </Text>
                    </Group>
                  ) : (
                    <Group gap="xs">
                      <ThemeIcon color="red" variant="light" size="sm">
                        <IconRefresh size={14} />
                      </ThemeIcon>
                      <Text size="sm" c="red" fw={500}>
                        Out of Stock
                      </Text>
                    </Group>
                  )}
                </div>

                {/* Quantity Selector */}
                <Group gap="md">
                  <Text fw={500}>Quantity:</Text>
                  <Group gap="xs">
                    <ActionIcon 
                      variant="outline" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <IconMinus size={16} />
                    </ActionIcon>
                    <NumberInput
                      value={quantity}
                      onChange={(val) => setQuantity(Math.max(1, Math.min(val || 1, prdata.quantity)))}
                      min={1}
                      max={prdata.quantity}
                      w={80}
                      styles={{ input: { textAlign: 'center' } }}
                    />
                    <ActionIcon 
                      variant="outline"
                      onClick={() => setQuantity(Math.min(prdata.quantity, quantity + 1))}
                      disabled={quantity >= prdata.quantity}
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                </Group>

                {/* Action Buttons */}
                <Group gap="md">
                  <Button
                    size="lg"
                    leftSection={<IconShoppingCart size={20} />}
                    onClick={handleAddToCart}
                    disabled={prdata.quantity === 0}
                    variant={isInCart ? "outline" : "filled"}
                    color="green"
                    flex={1}
                  >
                    {isInCart ? 'Already in Cart' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    size="lg"
                    color="orange"
                    onClick={handleBuyNow}
                    disabled={prdata.quantity === 0}
                    flex={1}
                  >
                    Buy Now
                  </Button>
                </Group>

                {/* Secondary Actions */}
                <Group gap="md" justify="space-between">
                  <Button
                    variant="subtle"
                    leftSection={<IconHeart size={16} />}
                    onClick={isInWishlist?removeprfromwislist:toggleWishlist}
                    color={isInWishlist ? "red" : "gray"}
                  >
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  
                  <Button variant="subtle" leftSection={<IconShare size={16} />}>
                    Share
                  </Button>
                  
                  <Button variant="subtle" leftSection={<IconGift size={16} />}>
                    Gift This
                  </Button>
                </Group>

                {/* Delivery Info */}
                <Paper withBorder p="md" radius="md">
                  <Stack gap="sm">
                    <Group gap="xs">
                      <IconTruck size={16} color="green" />
                      <Text size="sm" fw={500}>Free Delivery</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Order within 2 hours for delivery by tomorrow
                    </Text>
                    <Divider size="xs" />
                    <Group gap="xs">
                      <IconRefresh size={16} color="blue" />
                      <Text size="sm" fw={500}>30-Day Return Policy</Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Easy returns and exchanges
                    </Text>
                  </Stack>
                </Paper>
              </Stack>
            </motion.div>
          </Grid.Col>
        </Grid>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs value={activeTab} onChange={setActiveTab} mt="xl">
            <Tabs.List>
              <Tabs.Tab value="description">Description</Tabs.Tab>
              <Tabs.Tab value="reviews">Reviews ({mockReviewCount})</Tabs.Tab>
              <Tabs.Tab value="specifications">Specifications</Tabs.Tab>
              <Tabs.Tab value="qa">Q&A</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="description" pt="md">
              <Card withBorder>
                <Stack gap="md">
                  <Title order={3}>Product Description</Title>
                  <Text>{prdata.description}</Text>
                  
                  <Title order={4}>Key Features</Title>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="green" size={16} radius="xl">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item>100% Organic and Natural</List.Item>
                    <List.Item>Rich in Vitamins and Minerals</List.Item>
                    <List.Item>Freshly Harvested</List.Item>
                    <List.Item>No Artificial Preservatives</List.Item>
                    <List.Item>Sustainably Sourced</List.Item>
                  </List>
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="reviews" pt="md">
              <ReviewsSection 
                productId={prdata?.uid || uid}
                productName={prdata?.name || 'Product'}
                averageRating={mockRating}
                totalReviews={mockReviewCount}
              />
            </Tabs.Panel>

            <Tabs.Panel value="specifications" pt="md">
              <Card withBorder>
                <Title order={3} mb="md">Product Specifications</Title>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text fw={500}>Weight:</Text>
                    <Text>500g</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fw={500}>Shelf Life:</Text>
                    <Text>12 months</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fw={500}>Storage:</Text>
                    <Text>Cool, dry place</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fw={500}>Origin:</Text>
                    <Text>India</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text fw={500}>Certification:</Text>
                    <Text>Organic Certified</Text>
                  </Group>
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="qa" pt="md">
              <Card withBorder>
                <Title order={3} mb="md">Customer Questions & Answers</Title>
                <Text c="dimmed">No questions yet. Be the first to ask!</Text>
                <Button variant="outline" mt="md">Ask a Question</Button>
              </Card>
            </Tabs.Panel>
          </Tabs>
          
          {/* Trust Signals */}
          <Paper withBorder p="md" mt="lg">
            <TrustSignals />
          </Paper>
        </motion.div>
      </Container>
    </>
  );
};

export default EnhancedProductDetailPage;
