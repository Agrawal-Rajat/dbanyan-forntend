import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Modal,
  Paper,
  Stack,
  Group,
  Title,
  Text,
  Button,
  ActionIcon,
  Table,
  Image,
  Badge,
  Rating,
  Divider,
  NumberFormatter
} from '@mantine/core';
import {
  IconX,
  IconShoppingCart,
  IconHeart,
  IconScale,
  IconCheck,
  IconMinus
} from '@tabler/icons-react';

const ProductComparisonModal = ({ opened, onClose, products = [], onAddToCart, onRemoveFromComparison }) => {
  const [selectedProducts, setSelectedProducts] = useState(products);

  const comparisonFeatures = [
    { key: 'price', label: 'Price', type: 'currency' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'stock_quantity', label: 'Stock', type: 'number' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
    { key: 'organic', label: 'Organic Certified', type: 'boolean' },
    { key: 'shelf_life', label: 'Shelf Life', type: 'text' },
    { key: 'weight', label: 'Weight', type: 'text' }
  ];

  const mockProductData = (product) => ({
    ...product,
    organic: true,
    shelf_life: '12 months',
    weight: '500g',
    rating: product.is_featured ? 4.8 : 4.2,
    reviews: Math.floor(Math.random() * 200) + 50
  });

  const enrichedProducts = selectedProducts.map(mockProductData);

  const removeProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(p => p.product_id !== productId);
    setSelectedProducts(updatedProducts);
    onRemoveFromComparison?.(productId);
  };

  const renderFeatureValue = (product, feature) => {
    const value = product[feature.key];
    
    switch (feature.type) {
      case 'currency':
        return (
          <Text fw={600} c="green" size="lg">
            <NumberFormatter prefix="₹" value={value} thousandSeparator />
          </Text>
        );
      case 'boolean':
        return value ? (
          <Group gap="xs">
            <IconCheck size={16} color="green" />
            <Text size="sm" c="green">Yes</Text>
          </Group>
        ) : (
          <Group gap="xs">
            <IconMinus size={16} color="gray" />
            <Text size="sm" c="gray">No</Text>
          </Group>
        );
      case 'number':
        return (
          <Text fw={500}>
            {value > 0 ? value : 'Out of Stock'}
          </Text>
        );
      default:
        return <Text>{value || 'N/A'}</Text>;
    }
  };

  if (enrichedProducts.length === 0) {
    return (
      <Modal opened={opened} onClose={onClose} title="Product Comparison" size="lg">
        <Stack align="center" py="xl">
          <IconScale size={48} color="gray" />
          <Text size="lg" fw={500}>No products to compare</Text>
          <Text size="sm" c="dimmed">Add products to comparison to see them here</Text>
          <Button onClick={onClose}>Browse Products</Button>
        </Stack>
      </Modal>
    );
  }

  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      title="Product Comparison" 
      size="95%"
      styles={{ body: { padding: 0 } }}
    >
      <div style={{ overflowX: 'auto', maxHeight: '80vh' }}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ minWidth: '150px', position: 'sticky', left: 0, background: 'white', zIndex: 1 }}>
                <Text fw={600}>Features</Text>
              </Table.Th>
              {enrichedProducts.map((product) => (
                <Table.Th key={product.product_id} style={{ minWidth: '250px' }}>
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Badge color="blue" variant="light" size="sm">
                        Product {enrichedProducts.indexOf(product) + 1}
                      </Badge>
                      <ActionIcon 
                        size="sm" 
                        color="red" 
                        variant="subtle"
                        onClick={() => removeProduct(product.product_id)}
                      >
                        <IconX size={14} />
                      </ActionIcon>
                    </Group>
                    
                    <Image
                      src={product.images?.[0] || '/images/placeholder.jpg'}
                      alt={product.name}
                      height={120}
                      fit="contain"
                      radius="sm"
                    />
                    
                    <Stack gap="xs">
                      <Text fw={600} size="sm" lineClamp={2}>
                        {product.name}
                      </Text>
                      <Group gap="xs">
                        <Rating value={product.rating} size="xs" readOnly />
                        <Text size="xs" c="dimmed">({product.reviews})</Text>
                      </Group>
                    </Stack>
                  </Stack>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {/* Price Row */}
            <Table.Tr>
              <Table.Td style={{ position: 'sticky', left: 0, background: 'white', zIndex: 1 }}>
                <Text fw={600}>Price</Text>
              </Table.Td>
              {enrichedProducts.map((product) => (
                <Table.Td key={`price-${product.product_id}`}>
                  {renderFeatureValue(product, { key: 'price', type: 'currency' })}
                </Table.Td>
              ))}
            </Table.Tr>

            {/* Feature Comparison Rows */}
            {comparisonFeatures.slice(1).map((feature) => (
              <Table.Tr key={feature.key}>
                <Table.Td style={{ position: 'sticky', left: 0, background: 'white', zIndex: 1 }}>
                  <Text fw={500}>{feature.label}</Text>
                </Table.Td>
                {enrichedProducts.map((product) => (
                  <Table.Td key={`${feature.key}-${product.product_id}`}>
                    {renderFeatureValue(product, feature)}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}

            {/* Action Buttons Row */}
            <Table.Tr>
              <Table.Td style={{ position: 'sticky', left: 0, background: 'white', zIndex: 1 }}>
                <Text fw={600}>Actions</Text>
              </Table.Td>
              {enrichedProducts.map((product) => (
                <Table.Td key={`actions-${product.product_id}`}>
                  <Stack gap="xs">
                    <Button
                      fullWidth
                      leftSection={<IconShoppingCart size={16} />}
                      onClick={() => onAddToCart?.(product)}
                      disabled={product.stock_quantity === 0}
                      color="green"
                    >
                      {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      fullWidth
                      variant="outline"
                      leftSection={<IconHeart size={16} />}
                      size="sm"
                    >
                      Wishlist
                    </Button>
                  </Stack>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>

      <Paper p="md" style={{ borderTop: '1px solid #dee2e6' }}>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Comparing {enrichedProducts.length} products
          </Text>
          <Group gap="md">
            <Button variant="outline" onClick={onClose}>
              Close Comparison
            </Button>
            <Button onClick={onClose}>
              Continue Shopping
            </Button>
          </Group>
        </Group>
      </Paper>
    </Modal>
  );
};

export default ProductComparisonModal;
