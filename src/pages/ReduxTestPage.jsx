import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Title, Text, Button, Group, Loader, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { 
  fetchFeaturedProducts, 
  selectFeaturedProducts, 
  selectProductsLoading, 
  selectProductsError 
} from '../store/slices/productsSlice';

const ReduxTestPage = () => {
  const dispatch = useDispatch();
  
  // Redux selectors
  const products = useSelector(selectFeaturedProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    console.log('🧪 [REDUX TEST] Component mounted, testing Redux integration');
    console.log('🧪 [REDUX TEST] Current state:', { products, isLoading, error });
  }, [products, isLoading, error]);

  const handleTestFetch = () => {
    console.log('🧪 [REDUX TEST] Manual fetch triggered');
    dispatch(fetchFeaturedProducts(4));
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Redux Integration Test</Title>
      
      <Alert icon={<IconInfoCircle size="1rem" />} title="Test Status" mb="lg">
        This page tests the Redux store integration with our FastAPI backend.
        Check the browser console for detailed logs.
      </Alert>

      <Group mb="lg">
        <Button onClick={handleTestFetch} loading={isLoading}>
          Test Fetch Products
        </Button>
      </Group>

      {isLoading && (
        <Group>
          <Loader size="sm" />
          <Text>Loading products from backend...</Text>
        </Group>
      )}

      {error && (
        <Alert color="red" title="Error" mb="lg">
          {error}
        </Alert>
      )}

      {products.length > 0 && (
        <div>
          <Title order={2} mb="md">Products from Database ({products.length})</Title>
          {products.map((product) => (
            <Alert key={product.id} title={product.name} mb="sm">
              <Text size="sm">ID: {product.id}</Text>
              <Text size="sm">Price: ${product.price}</Text>
              <Text size="sm">Category: {product.category}</Text>
              <Text size="sm">Stock: {product.stock_quantity}</Text>
            </Alert>
          ))}
        </div>
      )}

      {!isLoading && !error && products.length === 0 && (
        <Text c="dimmed">No products loaded yet. Click the button to test.</Text>
      )}
    </Container>
  );
};

export default ReduxTestPage;
