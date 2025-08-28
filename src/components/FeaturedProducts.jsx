import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Card, Text, Button, Group, Badge, LoadingOverlay } from '@mantine/core';
import { 
  fetchFeaturedProducts, 
  selectFeaturedProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../store/slices/productsSlice';
import { 
  addToCart, 
  selectCartItems, 
  selectCartTotal, 
  selectCartItemCount 
} from '../store/slices/cartSlice';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const featuredProducts = useSelector(selectFeaturedProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartItemCount = useSelector(selectCartItemCount);

  useEffect(() => {
    console.log('🎯 [FEATURED PRODUCTS COMPONENT] Component mounted, fetching featured products...');
    dispatch(fetchFeaturedProducts(6));
  }, [dispatch]);

  useEffect(() => {
    console.log('📊 [FEATURED PRODUCTS COMPONENT] Featured products state updated:', {
      productsCount: featuredProducts.length,
      products: featuredProducts,
      isLoading,
      error
    });
  }, [featuredProducts, isLoading, error]);

  useEffect(() => {
    console.log('🛒 [FEATURED PRODUCTS COMPONENT] Cart state updated:', {
      cartItemCount,
      cartTotal,
      cartItems: cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
    });
  }, [cartItems, cartTotal, cartItemCount]);

  const handleAddToCart = (product) => {
    console.log('➕ [FEATURED PRODUCTS COMPONENT] Adding product to cart:', {
      productId: product.id,
      productName: product.name,
      price: product.price
    });
    
    dispatch(addToCart({ product, quantity: 1 }));
    
    console.log('✅ [FEATURED PRODUCTS COMPONENT] Add to cart action dispatched');
  };

  if (error) {
    console.error('💥 [FEATURED PRODUCTS COMPONENT] Error state:', error);
    return (
      <Container>
        <Text color="red">Error loading featured products: {error}</Text>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <LoadingOverlay visible={isLoading} />
      
      <Group justify="space-between" mb="xl">
        <Text size="xl" fw={700}>Featured Products</Text>
        <Group>
          <Badge variant="light" size="lg">
            Cart: {cartItemCount} items
          </Badge>
          <Badge variant="filled" size="lg">
            Total: ${cartTotal.toFixed(2)}
          </Badge>
        </Group>
      </Group>

      <Grid>
        {featuredProducts.map((product) => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const isInCart = !!cartItem;
          
          console.log(`🏷️ [FEATURED PRODUCTS COMPONENT] Rendering product: ${product.name}`, {
            productId: product.id,
            price: product.price,
            isInCart,
            cartQuantity: cartItem?.quantity || 0
          });

          return (
            <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={500} size="lg" mb="xs">
                  {product.name}
                </Text>
                
                <Text size="sm" c="dimmed" mb="md">
                  {product.description}
                </Text>
                
                <Group justify="space-between" mb="md">
                  <Text fw={700} size="lg">
                    ${product.price}
                  </Text>
                  {product.sale_price && (
                    <Text td="line-through" c="dimmed">
                      ${product.sale_price}
                    </Text>
                  )}
                </Group>

                {isInCart && (
                  <Badge variant="light" color="green" mb="sm">
                    In Cart: {cartItem.quantity}
                  </Badge>
                )}

                <Button 
                  variant={isInCart ? "light" : "filled"}
                  fullWidth 
                  mt="md" 
                  radius="md"
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart ? `Add Another (+${cartItem.quantity})` : 'Add to Cart'}
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      {featuredProducts.length === 0 && !isLoading && (
        <Text ta="center" c="dimmed" size="lg" mt="xl">
          No featured products available
        </Text>
      )}
    </Container>
  );
};

export default FeaturedProducts;
