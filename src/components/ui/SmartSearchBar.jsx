import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  Paper,
  Group,
  Text,
  Stack,
  Image,
  Badge,
  Loader,
  ActionIcon,
  Highlight
} from '@mantine/core';
import { 
  IconSearch, 
  IconX,
  IconTrendingUp,
  IconClock
} from '@tabler/icons-react';
import { searchProducts } from '../../store/slices/productsSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import GetAllProductData from '../../API_FILES/product_apis/GetAllProductData';
import { API_URL } from '../../NwConfig';

const SmartSearchBar = ({ compact = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef(null);
  // const { searchResults, searchLoading } = useSelector(state => state.products);

  // Popular search terms (Amazon-style trending searches)
  const popularSearches = [
    'Moringa Powder',
    'Organic Products',
    'Fresh Produce',
    'Drumsticks',
    'Moringa Paste'
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dbanyan_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Debounced search suggestions
  useEffect(() => {
    if (query.length > 1) {
      const timer = setTimeout(() => {
        handleSearchSuggestions(query);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSuggestions = async (searchQuery) => {
    setIsLoading(true);
    try {
      const result = await GetAllProductData(1,1000)
      console.log(result)
      setSuggestions(result?.data?.slice(0, 5));
    } catch (error) {
      console.error('Search suggestions failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm = query) => {
    if (!searchTerm.trim()) return;

    // Save to recent searches
    const newRecentSearches = [
      searchTerm,
      ...recentSearches.filter(s => s !== searchTerm)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('dbanyan_recent_searches', JSON.stringify(newRecentSearches));

    // Navigate to products page with search
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setIsOpen(false);
    setQuery('');

    // Analytics tracking
    console.log('🔍 [SMART SEARCH] Search performed:', { query: searchTerm });
  };

  const handleSuggestionClick = (product) => {
    console.log('🎯 [SMART SEARCH] Suggestion clicked:', product.name);
    window.location.href=`/products/${product.id}`;
    setIsOpen(false);
    setQuery('');
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('dbanyan_recent_searches');
    dispatch(addNotification({
      type: 'success',
      message: 'Search history cleared',
      duration: 2000
    }));
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: compact ? '280px' : '600px' }}>
      <TextInput
        placeholder={compact ? "Search products..." : "Search for organic moringa products..."}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        leftSection={<IconSearch size={compact ? 16 : 18} />}
        rightSection={
          query && (
            <ActionIcon 
              variant="subtle" 
              onClick={() => setQuery('')}
              size="sm"
            >
              <IconX size={14} />
            </ActionIcon>
          )
        }
        size={compact ? "md" : "lg"}
        radius="md"
        styles={{
          input: {
            border: '2px solid #e9ecef',
            '&:focus': {
              borderColor: '#2C5F2D',
              boxShadow: '0 0 0 3px rgba(44, 95, 45, 0.1)'
            }
          }
        }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Paper
              shadow="lg"
              p={compact ? "sm" : "md"}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                marginTop: '4px',
                maxHeight: compact ? '300px' : '400px',
                overflowY: 'auto'
              }}
            >
              <Stack gap="sm">
                {/* Search Loading */}
                {isLoading && (
                  <Group>
                    <Loader size="sm" />
                    <Text size="sm" c="dimmed">Searching...</Text>
                  </Group>
                )}

                {/* Product Suggestions */}
                {suggestions.length > 0 && (
                  <>
                    <Text size="sm" fw={600} c="dimmed">Products</Text>
                    {suggestions.map((product) => (
                      <Group
                        key={product.id}
                        p="xs"
                        style={{
                          cursor: 'pointer',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: '#f8f9fa' }
                        }}
                        onClick={() => handleSuggestionClick(product)}
                      >
                        <Image
                          src={`${API_URL}/${product?.images[0]}` || '/images/moringaPowderPic.jpg'}
                          alt={product.name}
                          w={40}
                          h={40}
                          radius="sm"
                        />
                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>
                            <Highlight highlight={query} highlightColor="green.1">
                              {product.name}
                            </Highlight>
                          </Text>
                          <Group gap="xs">
                            <Badge variant="light" size="xs">{product.category}</Badge>
                            <Text size="xs" c="dimmed">₹{product.price}</Text>
                          </Group>
                        </div>
                      </Group>
                    ))}
                  </>
                )}

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <>
                    <Group justify="space-between">
                      <Text size="sm" fw={600} c="dimmed">Recent Searches</Text>
                      <ActionIcon
                        variant="subtle"
                        size="sm"
                        onClick={clearRecentSearches}
                      >
                        <IconX size={12} />
                      </ActionIcon>
                    </Group>
                    {recentSearches.map((search, index) => (
                      <Group
                        key={index}
                        p="xs"
                        style={{
                          cursor: 'pointer',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: '#f8f9fa' }
                        }}
                        onClick={() => handleSearch(search)}
                      >
                        <IconClock size={16} color="#868e96" />
                        <Text size="sm">{search}</Text>
                      </Group>
                    ))}
                  </>
                )}

                {/* Popular Searches */}
                {query.length === 0 && (
                  <>
                    <Text size="sm" fw={600} c="dimmed">Popular Searches</Text>
                    {popularSearches.map((search, index) => (
                      <Group
                        key={index}
                        p="xs"
                        style={{
                          cursor: 'pointer',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: '#f8f9fa' }
                        }}
                        onClick={() => handleSearch(search)}
                      >
                        <IconTrendingUp size={16} color="#2C5F2D" />
                        <Text size="sm">{search}</Text>
                      </Group>
                    ))}
                  </>
                )}

                {/* No results */}
                {query.length > 2 && suggestions.length === 0 && !isLoading && (
                  <Text size="sm" c="dimmed" ta="center" py="md">
                    No products found for "{query}"
                  </Text>
                )}
              </Stack>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearchBar;
