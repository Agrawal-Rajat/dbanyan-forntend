import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paper,
  Stack,
  Title,
  Text,
  Checkbox,
  RangeSlider,
  Rating,
  Button,
  Group,
  Divider,
  Badge,
  Collapse,
  ActionIcon,
  NumberFormatter
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconFilter,
  IconStar
} from '@tabler/icons-react';

const ProfessionalFilterSidebar = ({ 
  onFiltersChange, 
  products = [],
  activeFilters = {},
  isVisible = true 
}) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [availability, setAvailability] = useState([]);
  
  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    benefits: false,
    availability: true
  });

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  
  // Get price range from products
  const productPrices = products.map(p => p.price).filter(p => p > 0);
  const minPrice = Math.min(...productPrices, 0);
  const maxPrice = Math.max(...productPrices, 2000);

  // Benefits/Features options
  const benefitOptions = [
    'Organic Certified',
    'Fresh Produce',
    'Processed Products',
    'High Protein',
    'Antioxidant Rich',
    'Vitamin Rich',
    'Iron Rich',
    'Calcium Rich'
  ];

  // Rating options
  const ratingOptions = [
    { value: 4, label: '4+ Stars', count: 45 },
    { value: 3, label: '3+ Stars', count: 78 },
    { value: 2, label: '2+ Stars', count: 95 },
    { value: 1, label: '1+ Stars', count: 102 }
  ];

  // Availability options
  const availabilityOptions = [
    { value: 'in_stock', label: 'In Stock', count: products.filter(p => p.stock_quantity > 0).length },
    { value: 'featured', label: "Dbanyan's Choice", count: products.filter(p => p.is_featured).length },
    { value: 'free_delivery', label: 'Free Delivery', count: products.filter(p => p.price >= 1000).length }
  ];

  // Update filters when any filter changes
  useEffect(() => {
    const filters = {
      priceRange,
      categories: selectedCategories,
      ratings: selectedRatings,
      benefits: selectedBenefits,
      availability
    };
    
    onFiltersChange(filters);
  }, [priceRange, selectedCategories, selectedRatings, selectedBenefits, availability]);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category, checked) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const handleRatingChange = (rating, checked) => {
    setSelectedRatings(prev =>
      checked
        ? [...prev, rating]
        : prev.filter(r => r !== rating)
    );
  };

  const handleBenefitChange = (benefit, checked) => {
    setSelectedBenefits(prev =>
      checked
        ? [...prev, benefit]
        : prev.filter(b => b !== benefit)
    );
  };

  const handleAvailabilityChange = (option, checked) => {
    setAvailability(prev =>
      checked
        ? [...prev, option]
        : prev.filter(a => a !== option)
    );
  };

  const clearAllFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedBenefits([]);
    setAvailability([]);
  };

  const activeFilterCount = selectedCategories.length + selectedRatings.length + selectedBenefits.length + availability.length;

  const FilterSection = ({ title, isOpen, onToggle, children, count = null }) => (
    <div>
      <Group 
        justify="space-between" 
        style={{ cursor: 'pointer' }}
        onClick={onToggle}
        mb="sm"
      >
        <Group gap="xs">
          <Text fw={600} size="sm">{title}</Text>
          {count && <Badge variant="light" size="xs">{count}</Badge>}
        </Group>
        {isOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
      </Group>
      <Collapse in={isOpen}>
        <Stack gap="xs" mb="md">
          {children}
        </Stack>
      </Collapse>
    </div>
  );

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper p="lg" radius="md" withBorder style={{ position: 'sticky', top: '20px' }}>
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <Group gap="xs">
              <IconFilter size={18} />
              <Title order={4}>Filters</Title>
              {activeFilterCount > 0 && (
                <Badge variant="filled" color="green" size="sm">
                  {activeFilterCount}
                </Badge>
              )}
            </Group>
            {activeFilterCount > 0 && (
              <ActionIcon 
                variant="subtle" 
                size="sm"
                onClick={clearAllFilters}
              >
                <IconX size={14} />
              </ActionIcon>
            )}
          </Group>

          <Divider />

          {/* Categories */}
          <FilterSection
            title="Category"
            isOpen={openSections.category}
            onToggle={() => toggleSection('category')}
          >
            {categories.map(category => {
              const count = products.filter(p => p.category === category).length;
              return (
                <Checkbox
                  key={category}
                  label={
                    <Group justify="space-between" style={{ width: '100%' }}>
                      <Text size="sm">{category}</Text>
                      <Text size="xs" c="dimmed">({count})</Text>
                    </Group>
                  }
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.currentTarget.checked)}
                  size="sm"
                />
              );
            })}
          </FilterSection>

          <Divider />

          {/* Price Range */}
          <FilterSection
            title="Price"
            isOpen={openSections.price}
            onToggle={() => toggleSection('price')}
          >
            <Stack gap="sm">
              <RangeSlider
                value={priceRange}
                onChange={setPriceRange}
                min={minPrice}
                max={maxPrice}
                step={50}
                color="green"
                marks={[
                  { value: minPrice, label: `₹${minPrice}` },
                  { value: 500, label: '₹500' },
                  { value: 1000, label: '₹1000' },
                  { value: maxPrice, label: `₹${maxPrice}` }
                ]}
              />
              <Group justify="space-between">
                <Text size="sm" fw={500}>
                  <NumberFormatter prefix="₹" value={priceRange[0]} thousandSeparator />
                </Text>
                <Text size="sm" fw={500}>
                  <NumberFormatter prefix="₹" value={priceRange[1]} thousandSeparator />
                </Text>
              </Group>
            </Stack>
          </FilterSection>

          <Divider />

          {/* Customer Rating */}
          <FilterSection
            title="Customer Rating"
            isOpen={openSections.rating}
            onToggle={() => toggleSection('rating')}
          >
            {ratingOptions.map(option => (
              <Checkbox
                key={option.value}
                label={
                  <Group justify="space-between" style={{ width: '100%' }}>
                    <Group gap="xs">
                      <Rating value={option.value} readOnly size="xs" />
                      <Text size="sm">{option.label}</Text>
                    </Group>
                    <Text size="xs" c="dimmed">({option.count})</Text>
                  </Group>
                }
                checked={selectedRatings.includes(option.value)}
                onChange={(e) => handleRatingChange(option.value, e.currentTarget.checked)}
                size="sm"
              />
            ))}
          </FilterSection>

          <Divider />

          {/* Benefits */}
          <FilterSection
            title="Health Benefits"
            isOpen={openSections.benefits}
            onToggle={() => toggleSection('benefits')}
          >
            {benefitOptions.map(benefit => (
              <Checkbox
                key={benefit}
                label={<Text size="sm">{benefit}</Text>}
                checked={selectedBenefits.includes(benefit)}
                onChange={(e) => handleBenefitChange(benefit, e.currentTarget.checked)}
                size="sm"
              />
            ))}
          </FilterSection>

          <Divider />

          {/* Availability */}
          <FilterSection
            title="Availability"
            isOpen={openSections.availability}
            onToggle={() => toggleSection('availability')}
          >
            {availabilityOptions.map(option => (
              <Checkbox
                key={option.value}
                label={
                  <Group justify="space-between" style={{ width: '100%' }}>
                    <Text size="sm">{option.label}</Text>
                    <Text size="xs" c="dimmed">({option.count})</Text>
                  </Group>
                }
                checked={availability.includes(option.value)}
                onChange={(e) => handleAvailabilityChange(option.value, e.currentTarget.checked)}
                size="sm"
              />
            ))}
          </FilterSection>

          {/* Clear All Button */}
          {activeFilterCount > 0 && (
            <>
              <Divider />
              <Button
                variant="outline"
                color="gray"
                fullWidth
                onClick={clearAllFilters}
                leftSection={<IconX size={16} />}
              >
                Clear All Filters
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </motion.div>
  );
};

export default ProfessionalFilterSidebar;
