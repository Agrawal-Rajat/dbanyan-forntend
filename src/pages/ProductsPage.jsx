// Dbanyan Group - Modern Products Listing Page
// Premium e-commerce product showcase with advanced filtering and real API data

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  SimpleGrid,
  Stack,
  Group,
  Center,
  Loader
} from '@mantine/core';
import { IconGitCompare } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CartIndicator from '../components/layout/CartIndicator';
import ProfessionalBreadcrumbs from '../components/ui/ProfessionalBreadcrumbs';
import ProfessionalFilterSidebar from '../components/ui/ProfessionalFilterSidebar';
import ProductListingControls from '../components/ui/ProductListingControls';
import ProfessionalProductCard from '../components/ui/ProfessionalProductCard';
import ProductComparisonModal from '../components/ui/ProductComparisonModal';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Redux state
  const { products, isLoading, error } = useSelector(state => state.products);
  const { items: cartItems } = useSelector(state => state.cart);

  // Enhanced state for filtering and sorting
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [0, 2000],
    categories: [],
    ratings: [],
    benefits: [],
    availability: []
  });
  const [sortBy, setSortBy] = useState('featured');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilterSidebar, setShowFilterSidebar] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());
  
  // Product comparison state
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    console.log('🚀 [PRODUCTS PAGE] Component mounted, fetching all products...');
    dispatch(fetchProducts({ skip: 0, limit: 100 }));
  }, [dispatch]);

  // Console log when products state changes
  useEffect(() => {
    console.log('�️ [PRODUCTS PAGE] Component state:', { 
      productsCount: products.length, 
      isLoading, 
      error: error || 'none',
      cartItemsCount: cartItems.length 
    });
    console.log('�📦 [PRODUCTS PAGE] Products state updated:', {
      productsCount: products.length,
      isLoading,
      error: error || 'none',
      products: products.map(p => ({ 
        product_id: p.product_id, 
        name: p.name, 
        category: p.category,
        price: p.price,
        inStock: p.stock_quantity > 0
      }))
    });
  }, [products, isLoading, error, cartItems.length]);

  // Handle add to cart
  const handleAddToCart = (product, quantity = 1) => {
    console.log('🛒 [PRODUCTS PAGE] Adding product to cart:', {
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
      image: product.images?.[0] || '/images/placeholder.jpg'
    }));

    // Add success notification
    dispatch(addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`
    }));

    console.log('✅ [PRODUCTS PAGE] Product added to cart successfully');
  };

  // Store and restore filter state in localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('products_filters');
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        setAppliedFilters(filters.appliedFilters || {
          priceRange: [0, 2000],
          categories: [],
          ratings: [],
          benefits: [],
          availability: []
        });
        setSortBy(filters.sortBy || 'featured');
        setViewMode(filters.viewMode || 'grid');
      } catch (error) {
        console.warn('⚠️ [PRODUCTS PAGE] Failed to restore filters from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const filters = {
      appliedFilters,
      sortBy,
      viewMode
    };
    localStorage.setItem('products_filters', JSON.stringify(filters));
  }, [appliedFilters, sortBy, viewMode]);
  // Handler functions for the new components
  const handleFiltersChange = (newFilters) => {
    setAppliedFilters(newFilters);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleViewChange = (newView) => {
    setViewMode(newView);
  };

  const handleToggleFilters = () => {
    setShowFilterSidebar(!showFilterSidebar);
  };

  // Enhanced filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (appliedFilters.categories?.length > 0) {
      filtered = filtered.filter(product => 
        appliedFilters.categories.includes(product.category)
      );
    }

    // Price range filter
    if (appliedFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= appliedFilters.priceRange[0] && 
        product.price <= appliedFilters.priceRange[1]
      );
    }

    // Rating filter (mock rating based on stock and featured status)
    if (appliedFilters.ratings?.length > 0) {
      filtered = filtered.filter(product => {
        const mockRating = product.is_featured ? 5 : (product.stock_quantity > 10 ? 4 : 3);
        return appliedFilters.ratings.some(rating => mockRating >= rating);
      });
    }

    // Benefits filter
    if (appliedFilters.benefits?.length > 0) {
      filtered = filtered.filter(product =>
        appliedFilters.benefits.some(benefit => 
          product.benefits?.some(b => b.toLowerCase().includes(benefit.toLowerCase())) ||
          product.description?.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }

    // Availability filter
    if (appliedFilters.availability?.length > 0) {
      filtered = filtered.filter(product => {
        return appliedFilters.availability.some(option => {
          switch (option) {
            case 'in_stock':
              return product.stock_quantity > 0;
            case 'featured':
              return product.is_featured;
            case 'free_delivery':
              return product.price >= 1000;
            default:
              return true;
          }
        });
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price_low':
          comparison = a.price - b.price;
          break;
        case 'price_high':
          comparison = b.price - a.price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'name_desc':
          comparison = b.name.localeCompare(a.name);
          break;
        case 'rating': {
          const ratingA = a.is_featured ? 5 : (a.stock_quantity > 10 ? 4 : 3);
          const ratingB = b.is_featured ? 5 : (b.stock_quantity > 10 ? 4 : 3);
          comparison = ratingB - ratingA;
          break;
        }
        case 'newest':
          comparison = new Date(b.created_at || 0) - new Date(a.created_at || 0);
          break;
        case 'popularity':
          comparison = (b.stock_quantity || 0) - (a.stock_quantity || 0);
          break;
        case 'featured':
        default:
          // Featured products first, then by name
          if (a.is_featured && !b.is_featured) comparison = -1;
          else if (!a.is_featured && b.is_featured) comparison = 1;
          else comparison = a.name.localeCompare(b.name);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, appliedFilters, sortBy, sortOrder]);

  const handleViewDetails = (productId) => {
    console.log('👁️ [PRODUCTS PAGE] Navigating to product details:', { productId });
    navigate(`/products/${productId}`);
  };

  const toggleWishlist = (productUid) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productUid)) {
        newWishlist.delete(productUid);
      } else {
        newWishlist.add(productUid);
      }
      return newWishlist;
    });
  };

  // Handle product comparison
  const handleAddToComparison = (product) => {
    if (comparisonProducts.length >= 3) {
      dispatch(addNotification({
        type: 'warning',
        title: 'Comparison Limit',
        message: 'You can compare up to 3 products at once'
      }));
      return;
    }
    
    if (comparisonProducts.find(p => p.product_id === product.product_id)) {
      dispatch(addNotification({
        type: 'info',
        title: 'Already Added',
        message: 'This product is already in comparison'
      }));
      return;
    }
    
    setComparisonProducts(prev => [...prev, product]);
    dispatch(addNotification({
      type: 'success',
      title: 'Added to Comparison',
      message: `${product.name} added to comparison`
    }));
  };

  const handleRemoveFromComparison = (productId) => {
    setComparisonProducts(prev => prev.filter(p => p.product_id !== productId));
  };

  const handleShowComparison = () => {
    if (comparisonProducts.length < 2) {
      dispatch(addNotification({
        type: 'warning',
        title: 'Need More Products',
        message: 'Please add at least 2 products to compare'
      }));
      return;
    }
    setShowComparisonModal(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Products - Dbanyan Group</title>
          <meta name="description" content="Explore our premium moringa products" />
        </Helmet>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
          <Container size="xl">
            <Center style={{ paddingTop: '3rem' }}>
              <Stack align="center" gap="md">
                <Loader size="lg" color="green" />
                <Text style={{ fontFamily: '"Inter", sans-serif' }}>
                  Loading our premium products...
                </Text>
              </Stack>
            </Center>
          </Container>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Helmet>
          <title>Products - Dbanyan Group</title>
        </Helmet>
        <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', paddingTop: '2rem' }}>
          <Container size="xl">
            <Center style={{ paddingTop: '3rem' }}>
              <Stack align="center" gap="md">
                <Text size="lg" c="red">Error Loading Products</Text>
                <Text size="sm" c="dimmed">
                  Unable to load products. Please try again later.
                </Text>
                {error && <Text size="xs" c="dimmed">{error.message}</Text>}
              </Stack>
            </Center>
          </Container>
        </div>
      </>
    );
  }

  // No products state
  if (!products || products.length === 0) {
    return (
      <>
        <Helmet>
          <title>Products - Dbanyan Group</title>
          <meta name="description" content="Explore our premium moringa products" />
        </Helmet>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '2rem' }}>
          <Container size="xl">
            <Center style={{ paddingTop: '3rem' }}>
              <Stack align="center" gap="md">
                <Text size="lg" style={{ fontFamily: '"Inter", sans-serif' }}>
                  No products available at the moment.
                </Text>
                <Text size="sm" c="dimmed">
                  Please check back later for our latest products.
                </Text>
              </Stack>
            </Center>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products - Dbanyan Group | Premium Moringa Products</title>
        <meta name="description" content="Explore our premium moringa products - organic, fresh, and nutrient-rich" />
        <meta name="keywords" content="moringa, organic, health, wellness, dbanyan" />
      </Helmet>
      
      <div style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Container size="xl" px="md" py="lg">
          {/* Breadcrumbs */}
          <ProfessionalBreadcrumbs />

          {/* Header */}
          <Group justify="space-between" align="center" mb="xl">
            <Stack gap="xs">
              <Title 
                order={1} 
                size="h2"
                fw={600}
                c="dark"
                style={{ fontFamily: '"Lora", serif' }}
              >
                Premium Moringa Products
              </Title>
              <Text 
                size="sm" 
                c="dimmed"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Discover our carefully curated selection of organic moringa products
              </Text>
            </Stack>
            <CartIndicator />
          </Group>

          {/* Product Listing Controls */}
          <ProductListingControls
            totalProducts={products.length}
            filteredProducts={filteredAndSortedProducts.length}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
            currentView={viewMode}
            activeFilters={appliedFilters}
            onToggleFilters={handleToggleFilters}
            showFilters={!showFilterSidebar}
          />

          {/* Main Content Area */}
          <Grid gutter="lg">
            {/* Filter Sidebar */}
            {showFilterSidebar && (
              <Grid.Col span={3}>
                <ProfessionalFilterSidebar
                  onFiltersChange={handleFiltersChange}
                  products={products}
                  activeFilters={appliedFilters}
                  isVisible={showFilterSidebar}
                />
              </Grid.Col>
            )}

            {/* Products Grid */}
            <Grid.Col span={showFilterSidebar ? 9 : 12}>
              {filteredAndSortedProducts.length === 0 ? (
                <Center py="xl">
                  <Stack align="center" gap="md">
                    <Text size="lg" fw={500}>No products found</Text>
                    <Text size="sm" c="dimmed">
                      Try adjusting your filters or search terms
                    </Text>
                  </Stack>
                </Center>
              ) : (
                <SimpleGrid
                  cols={viewMode === 'grid' ? 3 : 1}
                  spacing="lg"
                  breakpoints={[
                    { maxWidth: 'md', cols: viewMode === 'grid' ? 2 : 1 },
                    { maxWidth: 'sm', cols: 1 }
                  ]}
                >
                  {filteredAndSortedProducts.map((product) => (
                    <ProfessionalProductCard
                      key={product.product_id}
                      product={product}
                      onAddToCart={(quantity) => handleAddToCart(product, quantity)}
                      onViewDetails={() => handleViewDetails(product.product_id)}
                      onToggleWishlist={() => toggleWishlist(product.product_id)}
                      onAddToComparison={() => handleAddToComparison(product)}
                      isInWishlist={wishlist.has(product.product_id)}
                      isInComparison={comparisonProducts.some(p => p.product_id === product.product_id)}
                      viewMode={viewMode}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Grid.Col>
          </Grid>
        </Container>
      </div>
      
      {/* Product Comparison Modal */}
      <ProductComparisonModal
        opened={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        products={comparisonProducts}
        onRemoveProduct={handleRemoveFromComparison}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />

      {/* Floating Comparison Widget */}
      {comparisonProducts.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: '#2C5F2D',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={handleShowComparison}
        >
          <Group gap="xs">
            <IconGitCompare size={20} />
            <Text size="sm" fw={600}>
              Compare ({comparisonProducts.length})
            </Text>
          </Group>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
