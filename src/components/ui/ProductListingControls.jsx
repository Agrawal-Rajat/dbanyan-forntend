import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Group,
  Select,
  Text,
  Button,
  ActionIcon,
  NumberFormatter,
  Tooltip,
  Badge
} from '@mantine/core';
import {
  IconSortAscending,
  IconSortDescending,
  IconGridDots,
  IconList,
  IconFilter
} from '@tabler/icons-react';

const ProductListingControls = ({
  totalProducts,
  filteredProducts,
  onSortChange,
  onViewChange,
  currentView = 'grid',
  activeFilters = {},
  onToggleFilters,
  showFilters = true
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortOptions = [
    { value: 'featured', label: "Dbanyan's Choice" },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Best Selling' }
  ];

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value, sortOrder);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    onSortChange(sortBy, newOrder);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.categories?.length) count += activeFilters.categories.length;
    if (activeFilters.ratings?.length) count += activeFilters.ratings.length;
    if (activeFilters.benefits?.length) count += activeFilters.benefits.length;
    if (activeFilters.availability?.length) count += activeFilters.availability.length;
    return count;
  }, [activeFilters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Group justify="space-between" align="center" mb="md" wrap="wrap">
        {/* Left side - Results count and filters */}
        <Group gap="md">
          <Text size="sm" c="dimmed">
            {filteredProducts < totalProducts ? (
              <>
                <NumberFormatter value={filteredProducts} thousandSeparator /> of{' '}
                <NumberFormatter value={totalProducts} thousandSeparator /> products
              </>
            ) : (
              <>
                <NumberFormatter value={totalProducts} thousandSeparator /> products
              </>
            )}
          </Text>

          {/* Filter toggle button (mobile) */}
          <Button
            variant="outline"
            size="sm"
            leftSection={<IconFilter size={16} />}
            onClick={onToggleFilters}
            style={{ display: showFilters ? 'none' : 'flex' }}
          >
            Filters
            {activeFilterCount > 0 && (
              <Badge
                variant="filled"
                color="green"
                size="sm"
                ml="xs"
              >
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </Group>

        {/* Right side - Sorting and view controls */}
        <Group gap="md">
          {/* Sort controls */}
          <Group gap="xs">
            <Text size="sm" fw={500}>Sort by:</Text>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              data={sortOptions}
              size="sm"
              w={200}
              variant="filled"
              comboboxProps={{ 
                transitionProps: { transition: 'pop', duration: 200 } 
              }}
            />
            <Tooltip label={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}>
              <ActionIcon
                variant="outline"
                size="md"
                onClick={toggleSortOrder}
              >
                {sortOrder === 'asc' ? 
                  <IconSortAscending size={16} /> : 
                  <IconSortDescending size={16} />
                }
              </ActionIcon>
            </Tooltip>
          </Group>

          {/* View toggle */}
          <Group gap={2}>
            <Tooltip label="Grid View">
              <ActionIcon
                variant={currentView === 'grid' ? 'filled' : 'outline'}
                color={currentView === 'grid' ? 'green' : 'gray'}
                onClick={() => onViewChange('grid')}
              >
                <IconGridDots size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="List View">
              <ActionIcon
                variant={currentView === 'list' ? 'filled' : 'outline'}
                color={currentView === 'list' ? 'green' : 'gray'}
                onClick={() => onViewChange('list')}
              >
                <IconList size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Group>
    </motion.div>
  );
};

export default ProductListingControls;
