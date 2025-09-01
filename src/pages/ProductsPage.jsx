// Dbanyan Group - Modern Products Listing Page
// Premium e-commerce product showcase with advanced filtering and real API data

import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import verifyuser from '../API_FILES/Verify';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Title, 
  Text, 
  Grid, 
  SimpleGrid,
  Stack,
  Group,
  Center
} from '@mantine/core';
import { IconGitCompare } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import CartIndicator from '../components/layout/CartIndicator';
import ProfessionalBreadcrumbs from '../components/ui/ProfessionalBreadcrumbs';
import ProfessionalFilterSidebar from '../components/ui/ProfessionalFilterSidebar';
import ProductListingControls from '../components/ui/ProductListingControls';
import ProfessionalProductCard from '../components/ui/ProfessionalProductCard';
import ProductComparisonModal from '../components/ui/ProductComparisonModal';
import { addToCart } from '../store/slices/cartSlice';
import { addNotification } from '../store/slices/notificationSlice';
import GetAllProductData from '../API_FILES/product_apis/GetAllProductData';
import CustomLoader from '../Loader/CustomLoader';
import BackendPagination from '../Pagination/BackendPagination';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AddToCart from '../API_FILES/product_apis/AddToCart';
import AddToWishlist from '../API_FILES/product_apis/AddToWishlist';
import { addcart, addwishlist } from '../store/slices/WishlistAndCartSlice';
const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const cart = useSelector(state => state.wishlistandcart.cart);
const wishlistRedux = useSelector(state => state.wishlistandcart.wishlist);

  const [productList, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from API
  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const getProducts = async (page) => {
    setSpinner(true);
    const res = await GetAllProductData(page, 6);
    if (res?.data?.length >= 1) {
      setProducts(res.data);
      setTotalPages(res?.pagination?.totalPages || 1);
    }
    setSpinner(false);
  };

  // Get Redux state (cart only, no products needed)
  const { items: cartItems } = useSelector(state => state.cart);

  // Filters and sorting
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

  // Product comparison
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Save filters to localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('products_filters');
    if (savedFilters) {
      try {
        const filters = JSON.parse(savedFilters);
        setAppliedFilters(filters.appliedFilters || appliedFilters);
        setSortBy(filters.sortBy || 'featured');
        setViewMode(filters.viewMode || 'grid');
      } catch (error) {
        console.warn('⚠️ Failed to restore filters from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const filters = { appliedFilters, sortBy, viewMode };
    localStorage.setItem('products_filters', JSON.stringify(filters));
  }, [appliedFilters, sortBy, viewMode]);

  // Filtering + Sorting applied on productList (NOT Redux)
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productList];

    // Category filter
    if (appliedFilters.categories?.length > 0) {
      filtered = filtered.filter(product => 
        appliedFilters.categories.includes(product.category)
      );
    }

    // Price range
    if (appliedFilters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= appliedFilters.priceRange[0] && 
        product.price <= appliedFilters.priceRange[1]
      );
    }

    // Ratings (mocked from is_featured + stock_quantity)
    if (appliedFilters.ratings?.length > 0) {
      filtered = filtered.filter(product => {
        const mockRating = product.is_featured ? 5 : (product.stock_quantity > 10 ? 4 : 3);
        return appliedFilters.ratings.some(rating => mockRating >= rating);
      });
    }

    // Benefits
    if (appliedFilters.benefits?.length > 0) {
      filtered = filtered.filter(product =>
        appliedFilters.benefits.some(benefit => 
          product.benefits?.some(b => b.toLowerCase().includes(benefit.toLowerCase())) ||
          product.description?.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }

    // Availability
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
        case 'price_low': comparison = a.price - b.price; break;
        case 'price_high': comparison = b.price - a.price; break;
        case 'name': comparison = a.name.localeCompare(b.name); break;
        case 'name_desc': comparison = b.name.localeCompare(a.name); break;
        case 'rating': {
          const ratingA = a.is_featured ? 5 : (a.stock_quantity > 10 ? 4 : 3);
          const ratingB = b.is_featured ? 5 : (b.stock_quantity > 10 ? 4 : 3);
          comparison = ratingB - ratingA;
          break;
        }
        case 'newest': comparison = new Date(b.created_at || 0) - new Date(a.created_at || 0); break;
        case 'popularity': comparison = (b.stock_quantity || 0) - (a.stock_quantity || 0); break;
        case 'featured':
        default:
          if (a.is_featured && !b.is_featured) comparison = -1;
          else if (!a.is_featured && b.is_featured) comparison = 1;
          else comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [productList, appliedFilters, sortBy, sortOrder]);

  // Cart handler
  const handleAddToCart = async(product, quantity = 1) => {
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
            id:product
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
                          dispatch(addcart(product))
                          navigate("/cart")
                        }, 1000);
          }
          else{
            setSpinner(false)
            toast.error("Not Added To Cart Try Again later", {
                          position: "top-center",
                        });
          }
    
          console.log("add to cart",product,quantity)
        }
  };

  // Other helpers
  const handleViewDetails = (productId) =>       window.location.href=`/products/${productId}`
;
  const toggleWishlist = async(productId) => {
    // alert(productId)
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
            id:productId
          }
          const res=await AddToWishlist(form)
          // console.log(res)
          if(res.message==="Added To Wishlist"){
            setSpinner(false)
            toast.success(res.message, {
                          position: "top-center",
                        });
                        setTimeout(() => {
                          dispatch(addwishlist(productId))
                          navigate("/wishlist")
                        }, 1000);
          }
          else{
            setSpinner(false)
            toast.error("Not Added To Wishlist Try Again later", {
                          position: "top-center",
                        });
          }
      // console.log("wishlist product add",productId)
    }
  };

  // Comparison
  const handleAddToComparison = (product) => {
    if (comparisonProducts.length >= 3) {
      dispatch(addNotification({
        type: 'warning',
        title: 'Comparison Limit',
        message: 'You can compare up to 3 products at once'
      }));
      return;
    }
    if (comparisonProducts.find(p => p.product_id === product.product_id)) return;
    setComparisonProducts(prev => [...prev, product]);
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

  // Loading
  if (spinner) return <CustomLoader />;

  // No products
  if (!productList || productList.length === 0) {
    return (
      <Container size="xl">
        <Center py="xl">
          <Stack align="center">
            <Text size="lg">No products available</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products - Dbanyan Group | Premium Moringa Products</title>
        <meta name="description" content="Explore our premium moringa products - organic, fresh, and nutrient-rich" />
      </Helmet>
    <ToastContainer />
      <Container size="xl" px="md" py="lg">
        <ProfessionalBreadcrumbs />

        <Group justify="space-between" mb="xl">
          <Stack gap="xs">
            <Title order={1}>Premium Moringa Products</Title>
            <Text size="sm" c="dimmed">Discover our curated organic moringa collection</Text>
          </Stack>
          <CartIndicator />
        </Group>

        <ProductListingControls
          totalProducts={productList.length}
          filteredProducts={filteredAndSortedProducts.length}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
          currentView={viewMode}
          activeFilters={appliedFilters}
          onToggleFilters={() => setShowFilterSidebar(!showFilterSidebar)}
          showFilters={!showFilterSidebar}
        />

        <Grid gutter="lg">
          {showFilterSidebar && (
            <Grid.Col span={3}>
              <ProfessionalFilterSidebar
                onFiltersChange={setAppliedFilters}
                products={productList}
                activeFilters={appliedFilters}
                isVisible={showFilterSidebar}
              />
            </Grid.Col>
          )}

          <Grid.Col span={showFilterSidebar ? 9 : 12}>
            {filteredAndSortedProducts.length === 0 ? (
              <Center py="xl">
                <Text>No products found</Text>
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
                {filteredAndSortedProducts.map(product => {
                  const isInCart = cart.some(c => Number(c) === product.id);
const isInWishlist = wishlistRedux.some(w => Number(w) === product.id);

                  return <ProfessionalProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(q) => handleAddToCart(product.id, q)}
                    onViewDetails={() => handleViewDetails(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    onAddToComparison={() => handleAddToComparison(product)}
                    isInWishlist={isInWishlist}
                    isInCart={isInCart}
                    isInComparison={comparisonProducts.some(p => p.id === product.id)}
                    viewMode={viewMode}
                  />
})}
                
              </SimpleGrid>
            )}
            <div className='flex  justify-center w-full'>
                <BackendPagination
                                                      currentPage={currentPage}
                                                      totalPages={totalPages}
                                                      onPageChange={(newPage) => setCurrentPage(newPage)}
                                                    />
                                                    </div>
          </Grid.Col>
        </Grid>
        
      </Container>

      <ProductComparisonModal
        opened={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
        products={comparisonProducts}
        onRemoveProduct={handleRemoveFromComparison}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
           

      {comparisonProducts.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: '#2C5F2D',
            color: 'white',
            padding: '12px 20px',
            borderRadius: 50,
            cursor: 'pointer'
          }}
          onClick={handleShowComparison}
        >
          <Group gap="xs">
            <IconGitCompare size={20} />
            <Text fw={600}>Compare ({comparisonProducts.length})</Text>
          </Group>
        </div>
      )}
 
    </>
  );
};

export default ProductsPage;
