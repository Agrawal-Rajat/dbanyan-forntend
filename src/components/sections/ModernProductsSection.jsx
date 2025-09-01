// Dbanyan Group - Modern Products Section
// Clean product showcase with optimized performance and auto-refresh

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Card, 
  Group, 
  Badge,
  Button,
  Box,
  Stack,
  Image,
  Center,
  Loader
} from '@mantine/core';
import { 
  IconShoppingCart, 
  IconEye, 
  IconStar,
  IconLeaf,
  IconTrendingUp
} from '@tabler/icons-react';
import { 
  fetchFeaturedProducts, 
  selectFeaturedProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../../store/slices/productsSlice';
import { 
  addToCart, 
  selectCartItemCount 
} from '../../store/slices/cartSlice';

import { notifications } from '@mantine/notifications';
import { addNotification } from '../../store/slices/notificationSlice';
import { addcart } from '../../store/slices/WishlistAndCartSlice';

import GetFeaturedProducts from "../../API_FILES/product_apis/GetFeaturedProducts"
import AddToCart from "../../API_FILES/product_apis/AddToCart"
import { API_URL } from "../../NwConfig"
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from '../../Loader/CustomLoader';
import { toast, ToastContainer } from "react-toastify";
const ModernProductsSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const cart=useSelector((state)=>state.wishlistandcart.cart)
console.log(cart);

  // const isInCart = cart.some(item => Number(item) === prdata?.id);
  
// console.log(API_URL)
  // Redux selectors
  // const products = useSelector(selectFeaturedProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const cartItemCount = useSelector(selectCartItemCount);
  const [products,setProducts]=useState([])
  const [isRefreshing, setIsRefreshing] = useState(false);
    const getfeatureproduct=async()=>{
      const res=await GetFeaturedProducts()
      // console.log(res)
      if(res?.data){
        setProducts(res?.data)
      }
    }

  useEffect(() => {
    console.log('🎯 [MODERN PRODUCTS SECTION] Component mounted, fetching featured products...');
    getfeatureproduct()
  }, []);

  useEffect(() => {
    console.log('📊 [MODERN PRODUCTS SECTION] Products state updated:', {
      productsCount: products.length,
      isLoading,
      error,
      products
    });
  }, [products, isLoading, error]);

  // Refresh function to reload products
  const handleRefreshProducts = async () => {
    console.log('🔄 [MODERN PRODUCTS SECTION] Manual refresh triggered');
    setIsRefreshing(true);
    try {
      getfeatureproduct()
    } catch (error) {
      console.error('❌ [MODERN PRODUCTS SECTION] Refresh failed:', error);
      notifications.show({
        title: 'Refresh Failed',
        message: 'Failed to refresh products. Please try again.',
        color: 'red'
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  const [spinner,setSpinner]=useState(false)
  const handleAddToCart = async(product) => {
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
            id:product.id
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
                          dispatch(addcart(product.id))
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
    };

  const handleViewAllProducts = () => {
    console.log('🔗 [MODERN PRODUCTS SECTION] Navigating to products page');
    navigate('/products');
  };

  // Show error state
  if (error || products.length==0) {
    console.error('💥 [MODERN PRODUCTS SECTION] Error state:', error);
    return (
      <Box className="py-20 bg-white">
        <Container size="xl">
          <Center className="py-12">
            <Stack align="center" gap="md">
              <Text color="red" size="lg">Error loading products: {error}</Text>
              <Button onClick={handleRefreshProducts} loading={isRefreshing}>
                Try Again
              </Button>
            </Stack>
          </Center>
        </Container>
      </Box>
    );
  }

  // Show loading state
  if (isLoading) {
    console.log('⏳ [MODERN PRODUCTS SECTION] Loading state active');
    return (
      <Box className="py-20 bg-white">
        <Container size="xl">
          <Center className="py-12">
            <Stack align="center" gap="md">
              <Loader size="xl" />
              <Text c="dimmed">Loading featured products...</Text>
            </Stack>
          </Center>
        </Container>
      </Box>
    );
  }

  console.log('🎨 [MODERN PRODUCTS SECTION] Rendering products:', {
    productCount: products.length,
    cartItems: cartItemCount
  });
  if(spinner){
    return <CustomLoader />
  }

  return (
    <Box className="py-20 bg-white">
      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
              <ToastContainer />

          <div className="flex flex-col items-center justify-center text-center w-full">
            <Badge 
              size="lg" 
              variant="light" 
              color="green"
              className="mb-4 mx-auto"
              style={{ textAlign: 'center' }}
            >
              Premium Products
            </Badge>
            <Title 
              order={2} 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center"
              style={{ fontFamily: 'Lora, serif', textAlign: 'center' }}
            >
              Our
              <Text component="span" className="text-emerald-600"> Signature </Text>
              Collection
            </Title>
            <Text 
              size="lg" 
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-center"
              style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
            >
              Carefully crafted Moringa products to support your wellness journey. 
              Each product is made with premium organic ingredients and rigorous quality standards.
            </Text>
          </div>
        </motion.div>

        {/* Products Grid */}
        <Grid gutter="xl">
          {products.length > 0 ? (
            products.slice(0, 4).map((product, index) => {
              console.log(`🏷️ [MODERN PRODUCTS SECTION] Rendering product: ${product.name}`, {
                productId: product.id,
                price: product.price,
                category: product.category,
                inStock: product.quantity > 0
              });
                const isInCart = cart.some(item => Number(item) === product?.id);


              return (
                <Grid.Col key={product.id} span={{ base: 12, sm: 6, lg: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1 
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="lg"
                      className="h-full bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                    >
                      <Card.Section className="relative overflow-hidden">
                        {/* Product Image */}
                        <Box className="relative h-64 bg-gradient-to-br from-emerald-50 to-green-100">
                          <Image
                              src={`${API_URL}/${product?.images?.[0] || '/images/placeholder.jpg'}`}

                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            fallbackSrc="/images/moringa-placeholder.jpg"
                          />
                          
                          {/* Badges */}
                          <Box className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.is_organic && (
                              <Badge 
                                size="sm" 
                                variant="filled" 
                                color="green"
                                leftSection={<IconLeaf size={12} />}
                              >
                                Organic
                              </Badge>
                            )}
                            {product.compare_at_price && product.compare_at_price < product.price && (
                              <Badge 
                                size="sm" 
                                variant="filled" 
                                color="red"
                                leftSection={<IconTrendingUp size={12} />}
                              >
                                {Math.round(((product.price - product.compare_at_price) / product.price) * 100)}% OFF
                              </Badge>
                            )}
                          </Box>

                          {/* Hover Actions */}
                          <Box className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="xs"
                              variant="white"
                              className="shadow-lg"
                              onClick={() => window.location.href=`/products/${product.id}`}
                              leftSection={<IconEye size={14} />}
                            >
                              View
                            </Button>
                          </Box>
                        </Box>
                      </Card.Section>

                  <Stack gap="sm" className="pt-4">
                    {/* Product Category */}
                    <Text size="xs" className="text-emerald-600 font-medium uppercase tracking-wide">
                      {product.category}
                    </Text>

                    {/* Product Name */}
                    <Title 
                      order={4} 
                      className="text-gray-800 font-semibold line-clamp-2"
                      style={{ fontFamily: 'Lora, serif' }}
                    >
                      {product.name}
                    </Title>

                      {/* Product Description */}
                      <Text 
                        size="sm" 
                        className="text-gray-600 line-clamp-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {product.description}
                      </Text>

                      {/* Pricing */}
                      <Group justify="space-between" align="center">
                        <Box>
                          <Group align="center" gap="xs">
                            <Text 
                              size="lg" 
                              className="font-bold text-gray-800"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              ₹{product.compare_at_price || product.price}
                            </Text>
                            {product.compare_at_price && product.compare_at_price < product.price && (
                              <Text 
                                size="sm" 
                                className="text-gray-500 line-through"
                              >
                                ₹{product.price}
                              </Text>
                            )}
                          </Group>
                        </Box>
                      </Group>

                      {/* Add to Cart Button */}
                      <Button
                        variant="light"
                        color="green"
                        fullWidth
                        leftSection={<IconShoppingCart size={16} />}
                        onClick={() => {isInCart?console.log("incart"):handleAddToCart(product)}}
                        className="mt-2"
                        disabled={product.stock_quantity === 0}
                      >
                        {isInCart ? 'Already In Cart' : 'Add to Cart'}
                      </Button>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid.Col>
              );
            })
          ) : (
            <Grid.Col span={12}>
              <Center className="py-12">
                <Stack align="center" gap="md">
                  <Text size="lg" c="dimmed">No featured products available</Text>
                  <Button onClick={handleRefreshProducts} loading={isRefreshing}>
                    Refresh Products
                  </Button>
                </Stack>
              </Center>
            </Grid.Col>
          )}
        </Grid>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            color="green"
            onClick={handleViewAllProducts}
            className="px-8"
          >
            View All Products
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernProductsSection;
