// Dbanyan Group - Product Showcase Section
// Implementing project_context.md Section 2.1 FR1.5
// Grid/carousel with real products from backend API

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Title, Card, Text, Button, Badge, Grid, Loader, Alert, Center, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
// import { useCartStore } from '../../store';
import { Helmet } from 'react-helmet-async';

const ProductShowcase = () => {
  const navigate = useNavigate();

  // Mock function (until backend is rebuilt)
  const addToCart = (product, quantity) => {
    console.log('Adding to cart:', product, quantity);
    // TODO: Implement with Redux when ready
  };

  // No featured products until backend is connected
  const products = [];
  const isLoading = false;
  const isError = false;

  // Animation variants for staggered card animation (FR1.5)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const handleViewDetails = (productUid) => {
    navigate(`/products/${productUid}`);
  };

  const handleQuickAdd = (product) => {
    if (product.quantity > 0) {
      addToCart(product, 1);
      // You would show a notification here
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <Container size="xl">
          <Center className="py-12">
            <Stack align="center" spacing="md">
              <Loader size="lg" color="#2C5F2D" />
              <Text style={{ fontFamily: '"Inter", sans-serif' }}>
                Loading our premium products...
              </Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <Container size="xl">
          <Alert 
            title="Error Loading Products" 
            color="red" 
            variant="filled"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Unable to load products. Please try again later.
            {error && <Text size="sm" mt="xs">{error.message}</Text>}
          </Alert>
        </Container>
      </section>
    );
  }

  // No products state
  if (!products || products.length === 0) {
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <Container size="xl">
          <Center className="py-12">
            <Stack align="center" spacing="md">
              <Text size="lg" style={{ fontFamily: '"Inter", sans-serif' }}>
                No featured products available at the moment.
              </Text>
              <Text size="sm" color="dimmed">
                Please check back later for our latest products.
              </Text>
            </Stack>
          </Center>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: '#F5F5F5' }}>
      <Container size="xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <Title 
              order={2} 
              className="text-4xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: '"Lora", serif' }}
            >
              Our Premium Moringa Products
            </Title>
            <Text 
              size="lg" 
              className="text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Discover our carefully curated selection of organic moringa products, 
              each crafted to deliver maximum health benefits and natural wellness.
            </Text>
          </div>

          <Grid gutter="xl">
            {products.map((product, index) => (
              <Grid.Col key={product.uid || index} span={{ base: 12, sm: 6, lg: 3 }}>
                <motion.div variants={cardVariants}>
                  <Card 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder
                    className="h-full flex flex-col"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    <Card.Section>
                      <div className="relative">
                        <img
                          src={product.images?.[0] || '/images/moringaPowderPic.jpg'}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-t-md"
                          onError={(e) => {
                            e.target.src = '/images/moringaPowderPic.jpg';
                          }}
                        />
                        {product.is_featured && (
                          <Badge 
                            color="green" 
                            className="absolute top-2 left-2"
                          >
                            Featured
                          </Badge>
                        )}
                        {product.is_organic && (
                          <Badge 
                            color="blue" 
                            className="absolute top-2 right-2"
                          >
                            Organic
                          </Badge>
                        )}
                      </div>
                    </Card.Section>

                    <div className="flex-grow flex flex-col justify-between mt-4">
                      <div>
                        <Text 
                          weight={600} 
                          size="lg" 
                          className="mb-2"
                          style={{ fontFamily: '"Lora", serif' }}
                        >
                          {product.name}
                        </Text>
                        
                        <Text 
                          size="sm" 
                          color="dimmed" 
                          className="mb-3 line-clamp-2"
                        >
                          {product.description}
                        </Text>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Text weight={700} size="xl" color="green">
                              ₹{product.price}
                            </Text>
                            {product.compare_at_price && product.compare_at_price > product.price && (
                              <Text 
                                size="sm" 
                                color="dimmed" 
                                style={{ textDecoration: 'line-through' }}
                              >
                                ₹{product.compare_at_price}
                              </Text>
                            )}
                          </div>
                          <Text size="sm" color="dimmed">
                            {product.weight}
                          </Text>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          color="green" 
                          fullWidth
                          onClick={() => handleViewDetails(product.id || product.uid)}
                        >
                          View Details
                        </Button>
                        <Button 
                          color="green" 
                          fullWidth
                          disabled={product.quantity <= 0}
                          onClick={() => handleQuickAdd(product)}
                        >
                          {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </section>
  );
};

export default ProductShowcase;
