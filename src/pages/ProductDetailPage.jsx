// Dbanyan Group - Product Detail Page
// Minimal implementation to fix ReferenceError: page is not defined

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  Breadcrumbs,
  Anchor
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { 
  IconShoppingCart, 
  IconCreditCard,
  IconHome,
  IconPlus,
  IconMinus
} from '@tabler/icons-react';

const ProductDetailPage = () => {
  const { uid } = useParams(); // This should be the product_id UUID
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Redux state
  const { currentProduct: product, isLoading, error } = useSelector(state => state.products);

  console.log('📄 [PRODUCT DETAIL PAGE] Component loaded:', { 
    productId: uid, 
    product: product ? { product_id: product.product_id, name: product.name } : null,
    isLoading,
    error: error || 'none'
  });
  
  const [quantity, setQuantity] = useState(1);

  // Fetch product when component mounts or uid changes
  useEffect(() => {
    if (uid) {
      console.log('🚀 [PRODUCT DETAIL PAGE] Fetching product with ID:', uid);
      dispatch(fetchProductById(uid));
    } else {
      console.warn('⚠️ [PRODUCT DETAIL PAGE] No UID provided in params');
    }
  }, [dispatch, uid]);

  // Log state changes
  useEffect(() => {
    console.log('📊 [PRODUCT DETAIL PAGE] State updated:', {
      hasProduct: !!product,
      productId: product?.product_id,
      productName: product?.name,
      isLoading,
      error: error || 'none'
    });
  }, [product, isLoading, error]);

  // Clean up localStorage when component unmounts
  useEffect(() => {
    return () => {
      // Don't clear on unmount to maintain navigation history
    };
  }, []);

  // Handle add to cart
  const handleAddToCart = (product, quantity) => {
    console.log('🛒 [PRODUCT DETAIL PAGE] Adding product to cart:', {
      productId: product.product_id,
      productName: product.name,
      quantity,
      price: product.price
    });

    dispatch(addToCart({
      productId: product.product_id,
      productName: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0] || '/images/moringaPowderPic.jpg'
    }));

    // Show success notification
    dispatch(addNotification({
      type: 'cart-add',
      message: `${quantity} x ${product.name} added to cart`,
      duration: 3000
    }));

    console.log('✅ [PRODUCT DETAIL PAGE] Product added to cart successfully');
  };

  const handleBuyNow = () => {
    if (product && product.stock_quantity > 0) {
      handleAddToCart(product, quantity);
      navigate('/cart');
    }
  };

  // Handle add to cart with Redux integration
  const handleAddToCartWithQuantity = () => {
    if (product && product.stock_quantity > 0) {
      handleAddToCart(product, quantity);
    } else {
      console.warn('⚠️ [PRODUCT DETAIL PAGE] Cannot add to cart - product out of stock');
    }
  };

  // Loading state check
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Product - Dbanyan Group</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-8">
          <Container size="xl">
            <Center className="py-12">
              <Stack align="center" spacing="md">
                <Loader size="lg" color="#2C5F2D" />
                <Text style={{ fontFamily: '"Inter", sans-serif' }}>
                  Loading product details...
                </Text>
              </Stack>
            </Center>
          </Container>
        </div>
      </>
    );
  }

  // Error state check - after loading is complete
  if (error || (!isLoading && !product)) {
    return (
      <>
        <Helmet>
          <title>Product Not Found - Dbanyan Group</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50 py-8">
          <Container size="xl">
            <Alert 
              title="Product Not Found" 
              color="red" 
              variant="filled"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              The product you're looking for could not be found. Please check the URL or browse our products.
              {error && <Text size="sm" mt="xs">Error: {error}</Text>}
              <Button 
                variant="outline" 
                color="red" 
                size="sm" 
                component={Link} 
                to="/products"
                className="mt-3"
              >
                Browse Products
              </Button>
            </Alert>
          </Container>
        </div>
      </>
    );
  }

  // Main product display
  return (
    <>
      <Helmet>
        <title>{product.name} - Dbanyan Group</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <Container size="xl">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-6">
            <Anchor 
              component="button" 
              onClick={() => navigate('/')}
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
            >
              <IconHome size={16} />
              Home
            </Anchor>
            <Anchor 
              component="button" 
              onClick={() => navigate('/products')}
              className="text-emerald-600 hover:text-emerald-700"
            >
              Products
            </Anchor>
            <Text className="text-gray-600">{product?.name || 'Product Details'}</Text>
          </Breadcrumbs>

          <Grid gutter="xl">
            {/* Product Images */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div className="relative">
                  <img
                    src={product.images?.[0] || '/images/moringaPowderPic.jpg'}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/images/moringaPowderPic.jpg';
                    }}
                  />
                  {product.is_featured && (
                    <Badge 
                      color="green" 
                      className="absolute top-4 left-4"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
              </Card>
            </Grid.Col>

            {/* Product Details */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack spacing="lg">
                <div>
                  <Title 
                    order={1} 
                    className="text-3xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: '"Lora", serif' }}
                  >
                    {product.name}
                  </Title>
                  
                  <Text 
                    size="lg" 
                    color="dimmed" 
                    className="mb-4"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    {product.description}
                  </Text>

                  <Group spacing="md" className="mb-4">
                    <Text weight={700} size="2xl" color="green">
                      ₹{product.price}
                    </Text>
                    {product.compare_at_price && product.compare_at_price > product.price && (
                      <Text 
                        size="lg" 
                        color="dimmed" 
                        style={{ textDecoration: 'line-through' }}
                      >
                        ₹{product.compare_at_price}
                      </Text>
                    )}
                  </Group>

                  <Group spacing="md" className="mb-4">
                    <Badge color="blue" variant="light">
                      {product.category}
                    </Badge>
                    <Badge color="green" variant="light">
                      {product.weight}
                    </Badge>
                    <Badge 
                      color={product.quantity > 0 ? 'green' : 'red'} 
                      variant="light"
                    >
                      {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </Group>
                </div>

                {/* Quantity Selector */}
                <div>
                  <Text weight={600} size="sm" className="mb-2">Quantity</Text>
                  <Group spacing="xs">
                    <ActionIcon
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <IconShoppingCart size={16} />
                    </ActionIcon>
                    <NumberInput
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={product.quantity}
                      className="w-20"
                    />
                    <ActionIcon
                      variant="outline"
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      disabled={quantity >= product.quantity}
                    >
                      <IconCreditCard size={16} />
                    </ActionIcon>
                  </Group>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button 
                    color="green" 
                    size="lg"
                    fullWidth
                    disabled={product.stock_quantity <= 0}
                    onClick={handleAddToCartWithQuantity}
                    leftSection={<IconShoppingCart size={20} />}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    color="blue" 
                    size="lg"
                    fullWidth
                    disabled={product.stock_quantity <= 0}
                    onClick={handleBuyNow}
                    leftSection={<IconCreditCard size={20} />}
                  >
                    Buy Now
                  </Button>
                </div>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ProductDetailPage;
