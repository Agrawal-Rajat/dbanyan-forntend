// Dbanyan Group - Professional Product Management System
// Amazon-style product CRUD with advanced features, bulk operations, and inventory management

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Title,
  Text,
  Group,
  Stack,
  Button,
  Table,
  Badge,
  ActionIcon,
  Modal,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Switch,
  Image,
  Avatar,
  Menu,
  Pagination,
  MultiSelect,
  Tabs,
  Progress,
  Alert,
  Loader,
  Grid,
  FileInput,
  SimpleGrid,
  Indicator,
  Tooltip,
  Checkbox,
  Center,
  Divider
} from '@mantine/core';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconEye,
  IconDots,
  IconSearch,
  IconFilter,
  IconDownload,
  IconUpload,
  IconPhoto,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconArrowUp,
  IconArrowDown,
  IconPackage,
  IconTags,
  IconCurrency,
  IconChartBar,
  IconStar,
  IconRefresh,
  IconCopy,
  IconArchive
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../store/slices/productsSlice';
import { productService } from '../../services/productService';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  // Modal and form states
  const [productModalOpened, { open: openProductModal, close: closeProductModal }] = useDisclosure(false);
  const [bulkModalOpened, { open: openBulkModal, close: closeBulkModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  
  // Component state
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 10;

  // Load products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Professional product form with comprehensive Amazon-style fields
  const productForm = useForm({
    initialValues: {
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: 0,
      compare_price: 0,
      cost_price: 0,
      sku: '',
      brand: 'Dbanyan Group',
      category: '',
      subcategory: '',
      stock_quantity: 0,
      low_stock_threshold: 5,
      status: 'active',
      is_featured: false,
      is_digital: false,
      manage_stock: true,
      allow_backorder: false,
      tags: [],
      images: [],
      // Shipping information
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      shipping_class: 'standard',
      free_shipping: false,
      shipping_cost: 0,
      // SEO fields
      meta_title: '',
      meta_description: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      og_image: '',
      // Product attributes
      attributes: {},
      related_products: [],
      cross_sells: [],
      // Moringa-specific fields
      ingredients: '',
      benefits: '',
      usage_instructions: '',
      nutritional_info: '',
      certifications: []
    },
    validate: {
      name: (value) => value.length < 3 ? 'Product name must be at least 3 characters' : null,
      description: (value) => value.length < 20 ? 'Description must be at least 20 characters' : null,
      price: (value) => value <= 0 ? 'Price must be greater than 0' : null,
      sku: (value) => !value ? 'SKU is required' : null,
      stock_quantity: (value) => value < 0 ? 'Quantity cannot be negative' : null,
      category: (value) => !value ? 'Category is required' : null,
      low_stock_threshold: (value) => value < 0 ? 'Threshold cannot be negative' : null
    }
  });

  // Enhanced product categories with subcategories
  const productCategories = [
    { 
      value: 'powder', 
      label: 'Moringa Powder',
      subcategories: ['Pure Powder', 'Flavored Powder', 'Capsules', 'Bulk Powder']
    },
    { 
      value: 'paste', 
      label: 'Moringa Paste',
      subcategories: ['Pure Paste', 'Seasoned Paste', 'Cooking Paste']
    },
    { 
      value: 'fresh', 
      label: 'Fresh Produce',
      subcategories: ['Fresh Leaves', 'Fresh Pods', 'Fresh Seeds', 'Fresh Flowers']
    },
    { 
      value: 'processed', 
      label: 'Processed Products',
      subcategories: ['Dried Leaves', 'Seed Oil', 'Protein Powder', 'Tea Blends']
    },
    { 
      value: 'supplements', 
      label: 'Supplements',
      subcategories: ['Tablets', 'Capsules', 'Liquid Extracts', 'Gummies']
    },
    { 
      value: 'cosmetics', 
      label: 'Cosmetic Products',
      subcategories: ['Face Cream', 'Body Lotion', 'Hair Oil', 'Soap']
    }
  ];

  // Enhanced status options with Amazon-style workflow
  const statusOptions = [
    { value: 'active', label: 'Active', color: 'green', description: 'Available for purchase' },
    { value: 'inactive', label: 'Inactive', color: 'red', description: 'Not visible to customers' },
    { value: 'draft', label: 'Draft', color: 'yellow', description: 'Being prepared' },
    { value: 'archived', label: 'Archived', color: 'gray', description: 'Permanently removed' }
  ];

  // Bulk operation options
  const bulkActions = [
    { value: 'activate', label: 'Activate Products', icon: 'check', color: 'green' },
    { value: 'deactivate', label: 'Deactivate Products', icon: 'x', color: 'red' },
    { value: 'feature', label: 'Feature Products', icon: 'star', color: 'yellow' },
    { value: 'unfeature', label: 'Unfeature Products', icon: 'star-off', color: 'gray' },
    { value: 'delete', label: 'Archive Products', icon: 'archive', color: 'orange' },
    { value: 'export', label: 'Export Selected', icon: 'download', color: 'blue' }
  ];

  // Advanced sorting options
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'stock_quantity', label: 'Stock' },
    { value: 'created_at', label: 'Created Date' },
    { value: 'updated_at', label: 'Updated Date' },
    { value: 'total_sales', label: 'Sales Count' },
    { value: 'average_rating', label: 'Rating' },
    { value: 'view_count', label: 'Views' }
  ];

  // Filter and search logic
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle product form submission
  const handleProductSubmit = async (values) => {
    try {
      const productData = {
        ...values,
        price: parseFloat(values.price),
        compare_at_price: parseFloat(values.compare_at_price) || null,
        cost_price: parseFloat(values.cost_price) || null,
        quantity: parseInt(values.quantity),
        low_stock_threshold: parseInt(values.low_stock_threshold),
        images: [] // Will be handled separately
      };

      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct.id, productData })).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Product updated successfully',
          color: 'green',
          icon: <IconCheck size={16} />
        });
      } else {
        await dispatch(createProduct(productData)).unwrap();
        notifications.show({
          title: 'Success',
          message: 'Product created successfully',
          color: 'green',
          icon: <IconCheck size={16} />
        });
      }

      closeProductModal();
      setEditingProduct(null);
      productForm.reset();
    } catch (error) {
      console.error('Product operation failed:', error);
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to save product',
        color: 'red',
        icon: <IconX size={16} />
      });
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await dispatch(deleteProduct(productToDelete.id)).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Product deleted successfully',
        color: 'green',
        icon: <IconCheck size={16} />
      });
      closeDeleteModal();
      setProductToDelete(null);
    } catch (error) {
      console.error('Product deletion failed:', error);
      notifications.show({
        title: 'Error',
        message: error.message || 'Failed to delete product',
        color: 'red',
        icon: <IconX size={16} />
      });
    }
  };

  // Handle bulk operations
  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) {
      notifications.show({
        title: 'Warning',
        message: 'Please select products first',
        color: 'yellow'
      });
      return;
    }

    try {
      switch (action) {
        case 'activate':
          // Bulk activate products
          break;
        case 'deactivate':
          // Bulk deactivate products
          break;
        case 'delete':
          // Bulk delete products
          break;
        default:
          break;
      }
      setSelectedProducts([]);
      closeBulkModal();
    } catch (error) {
      console.error('Bulk operation failed:', error);
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    productForm.setValues({
      name: product.name || '',
      description: product.description || '',
      short_description: product.short_description || '',
      price: product.price || 0,
      compare_at_price: product.compare_at_price || 0,
      cost_price: product.cost_price || 0,
      sku: product.sku || '',
      quantity: product.quantity || 0,
      category: product.category || '',
      brand: product.brand || 'Dbanyan Group',
      status: product.status || 'active',
      featured: product.featured || false,
      manage_stock: product.manage_stock !== false,
      low_stock_threshold: product.low_stock_threshold || 5,
      weight: product.weight || '',
      dimensions: product.dimensions || '',
      ingredients: product.ingredients || '',
      benefits: product.benefits || '',
      usage_instructions: product.usage_instructions || '',
      meta_title: product.meta_title || '',
      meta_description: product.meta_description || '',
      tags: product.tags || []
    });
    openProductModal();
  };

  // Open delete confirmation modal
  const confirmDelete = (product) => {
    setProductToDelete(product);
    openDeleteModal();
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    return statusOption?.color || 'gray';
  };

  // Calculate inventory statistics
  const inventoryStats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.quantity < (p.low_stock_threshold || 5)).length,
    outOfStock: products.filter(p => p.quantity === 0).length
  };

  return (
    <Box>
      {/* Page Header with Actions */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Product Management</Title>
          <Text c="dimmed">Manage your product catalog, inventory, and pricing</Text>
        </div>
        
        <Group>
          <Button
            leftSection={<IconUpload size={16} />}
            variant="light"
            onClick={openBulkModal}
          >
            Bulk Import
          </Button>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              setEditingProduct(null);
              productForm.reset();
              openProductModal();
            }}
          >
            Add Product
          </Button>
        </Group>
      </Group>

      {/* Inventory Overview Cards */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} mb="xl">
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Products</Text>
              <Text size="xl" fw={700}>{inventoryStats.total}</Text>
            </div>
            <IconPackage size={24} color="blue" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Active Products</Text>
              <Text size="xl" fw={700} c="green">{inventoryStats.active}</Text>
            </div>
            <IconCheck size={24} color="green" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Low Stock</Text>
              <Text size="xl" fw={700} c="orange">{inventoryStats.lowStock}</Text>
            </div>
            <IconAlertCircle size={24} color="orange" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Out of Stock</Text>
              <Text size="xl" fw={700} c="red">{inventoryStats.outOfStock}</Text>
            </div>
            <IconX size={24} color="red" />
          </Group>
        </Card>
      </SimpleGrid>

      {/* Filters and Search */}
      <Card shadow="sm" p="lg" radius="md" withBorder mb="xl">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <TextInput
              placeholder="Search products, SKU, or description..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 2 }}>
            <Select
              data={[
                { value: 'all', label: 'All Status' },
                ...statusOptions
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              leftSection={<IconFilter size={16} />}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 2 }}>
            <Select
              data={[
                { value: 'all', label: 'All Categories' },
                ...productCategories
              ]}
              value={categoryFilter}
              onChange={setCategoryFilter}
              leftSection={<IconTags size={16} />}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 2 }}>
            <Select
              data={[
                { value: 'name', label: 'Sort by Name' },
                { value: 'price', label: 'Sort by Price' },
                { value: 'quantity', label: 'Sort by Stock' },
                { value: 'created_at', label: 'Sort by Date' }
              ]}
              value={sortBy}
              onChange={setSortBy}
              leftSection={<IconChartBar size={16} />}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 2 }}>
            <Group>
              <ActionIcon
                variant={sortOrder === 'asc' ? 'filled' : 'light'}
                onClick={() => setSortOrder('asc')}
              >
                <IconArrowUp size={16} />
              </ActionIcon>
              <ActionIcon
                variant={sortOrder === 'desc' ? 'filled' : 'light'}
                onClick={() => setSortOrder('desc')}
              >
                <IconArrowDown size={16} />
              </ActionIcon>
              <ActionIcon variant="light" onClick={() => dispatch(fetchProducts())}>
                <IconRefresh size={16} />
              </ActionIcon>
            </Group>
          </Grid.Col>
        </Grid>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <Group mt="md" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}>
            <Text size="sm" fw={500}>
              {selectedProducts.length} product(s) selected
            </Text>
            <Group gap="xs">
              <Button size="xs" variant="light" color="green">
                Bulk Activate
              </Button>
              <Button size="xs" variant="light" color="orange">
                Bulk Deactivate
              </Button>
              <Button size="xs" variant="light" color="red">
                Bulk Delete
              </Button>
            </Group>
          </Group>
        )}
      </Card>

      {/* Products Table */}
      <Card shadow="sm" p="lg" radius="md" withBorder>
        {loading ? (
          <Center py="xl">
            <Loader size="lg" />
          </Center>
        ) : error ? (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error}
          </Alert>
        ) : paginatedProducts.length === 0 ? (
          <Center py="xl">
            <Stack align="center">
              <IconPackage size={48} color="gray" />
              <Text size="lg" fw={500} c="dimmed">No products found</Text>
              <Text size="sm" c="dimmed">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Create your first product to get started'
                }
              </Text>
              {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
                <Button leftSection={<IconPlus size={16} />} onClick={openProductModal}>
                  Add Your First Product
                </Button>
              )}
            </Stack>
          </Center>
        ) : (
          <>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Checkbox
                      checked={selectedProducts.length === paginatedProducts.length}
                      indeterminate={selectedProducts.length > 0 && selectedProducts.length < paginatedProducts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(paginatedProducts.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                    />
                  </Table.Th>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>SKU</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Stock</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {paginatedProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Table.Td>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                          }
                        }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar
                          src={product.images?.[0]}
                          alt={product.name}
                          size="sm"
                          radius="md"
                        >
                          <IconPackage size={16} />
                        </Avatar>
                        <div>
                          <Text size="sm" fw={500} lineClamp={1}>
                            {product.name}
                          </Text>
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {product.short_description}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {product.sku || 'N/A'}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" size="sm">
                        {productCategories.find(cat => cat.value === product.category)?.label || product.category}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>
                        ₹{product.price?.toLocaleString()}
                      </Text>
                      {product.compare_at_price && product.compare_at_price > product.price && (
                        <Text size="xs" c="dimmed" td="line-through">
                          ₹{product.compare_at_price.toLocaleString()}
                        </Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Text size="sm" fw={500}>
                          {product.quantity || 0}
                        </Text>
                        {product.quantity < (product.low_stock_threshold || 5) && (
                          <Tooltip label="Low stock warning">
                            <IconAlertCircle size={14} color="orange" />
                          </Tooltip>
                        )}
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(product.status)} variant="light" size="sm">
                        {product.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View Product">
                          <ActionIcon variant="light" size="sm">
                            <IconEye size={14} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Edit Product">
                          <ActionIcon
                            variant="light"
                            size="sm"
                            onClick={() => openEditModal(product)}
                          >
                            <IconEdit size={14} />
                          </ActionIcon>
                        </Tooltip>
                        <Menu shadow="md" width={120}>
                          <Menu.Target>
                            <ActionIcon variant="light" size="sm">
                              <IconDots size={14} />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item leftSection={<IconCopy size={14} />}>
                              Duplicate
                            </Menu.Item>
                            <Menu.Item leftSection={<IconArchive size={14} />}>
                              Archive
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item 
                              leftSection={<IconTrash size={14} />}
                              color="red"
                              onClick={() => confirmDelete(product)}
                            >
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Table.Td>
                  </motion.tr>
                ))}
              </Table.Tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Group justify="center" mt="xl">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                  size="sm"
                />
              </Group>
            )}
          </>
        )}
      </Card>

      {/* Product Modal */}
      <Modal
        opened={productModalOpened}
        onClose={closeProductModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="xl"
        scrollAreaComponent={Modal.NativeScrollArea}
      >
        <form onSubmit={productForm.onSubmit(handleProductSubmit)}>
          <Tabs defaultValue="basic">
            <Tabs.List>
              <Tabs.Tab value="basic">Basic Information</Tabs.Tab>
              <Tabs.Tab value="pricing">Pricing & Inventory</Tabs.Tab>
              <Tabs.Tab value="details">Product Details</Tabs.Tab>
              <Tabs.Tab value="seo">SEO & Marketing</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="basic" pt="md">
              <Stack>
                <TextInput
                  label="Product Name"
                  placeholder="Enter product name"
                  required
                  {...productForm.getInputProps('name')}
                />
                
                <TextInput
                  label="SKU"
                  placeholder="Enter product SKU"
                  required
                  {...productForm.getInputProps('sku')}
                />
                
                <Select
                  label="Category"
                  placeholder="Select category"
                  data={productCategories}
                  required
                  {...productForm.getInputProps('category')}
                />
                
                <TextInput
                  label="Brand"
                  placeholder="Enter brand name"
                  {...productForm.getInputProps('brand')}
                />
                
                <Textarea
                  label="Short Description"
                  placeholder="Brief product description"
                  rows={3}
                  {...productForm.getInputProps('short_description')}
                />
                
                <Textarea
                  label="Full Description"
                  placeholder="Detailed product description"
                  rows={5}
                  required
                  {...productForm.getInputProps('description')}
                />
                
                <Group>
                  <Switch
                    label="Featured Product"
                    {...productForm.getInputProps('featured', { type: 'checkbox' })}
                  />
                  <Select
                    label="Status"
                    data={statusOptions}
                    {...productForm.getInputProps('status')}
                  />
                </Group>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="pricing" pt="md">
              <Stack>
                <NumberInput
                  label="Price (₹)"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  required
                  {...productForm.getInputProps('price')}
                />
                
                <NumberInput
                  label="Compare at Price (₹)"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  {...productForm.getInputProps('compare_at_price')}
                />
                
                <NumberInput
                  label="Cost Price (₹)"
                  placeholder="0.00"
                  min={0}
                  decimalScale={2}
                  {...productForm.getInputProps('cost_price')}
                />
                
                <Divider />
                
                <Switch
                  label="Track Inventory"
                  description="Enable inventory tracking for this product"
                  {...productForm.getInputProps('manage_stock', { type: 'checkbox' })}
                />
                
                <NumberInput
                  label="Stock Quantity"
                  placeholder="0"
                  min={0}
                  {...productForm.getInputProps('quantity')}
                />
                
                <NumberInput
                  label="Low Stock Threshold"
                  placeholder="5"
                  min={0}
                  {...productForm.getInputProps('low_stock_threshold')}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="details" pt="md">
              <Stack>
                <TextInput
                  label="Weight"
                  placeholder="e.g., 500g, 1kg"
                  {...productForm.getInputProps('weight')}
                />
                
                <TextInput
                  label="Dimensions"
                  placeholder="e.g., 10cm x 15cm x 5cm"
                  {...productForm.getInputProps('dimensions')}
                />
                
                <Textarea
                  label="Ingredients"
                  placeholder="List product ingredients"
                  rows={3}
                  {...productForm.getInputProps('ingredients')}
                />
                
                <Textarea
                  label="Benefits"
                  placeholder="List product benefits"
                  rows={3}
                  {...productForm.getInputProps('benefits')}
                />
                
                <Textarea
                  label="Usage Instructions"
                  placeholder="How to use this product"
                  rows={3}
                  {...productForm.getInputProps('usage_instructions')}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="seo" pt="md">
              <Stack>
                <TextInput
                  label="Meta Title"
                  placeholder="SEO title for search engines"
                  {...productForm.getInputProps('meta_title')}
                />
                
                <Textarea
                  label="Meta Description"
                  placeholder="SEO description for search engines"
                  rows={3}
                  {...productForm.getInputProps('meta_description')}
                />
                
                <MultiSelect
                  label="Tags"
                  placeholder="Add product tags"
                  data={[
                    'organic', 'natural', 'herbal', 'ayurvedic', 'superfood',
                    'protein', 'antioxidant', 'vitamin', 'mineral', 'healthy'
                  ]}
                  {...productForm.getInputProps('tags')}
                />
              </Stack>
            </Tabs.Panel>
          </Tabs>

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={closeProductModal}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
        size="sm"
      >
        <Stack>
          <Text>
            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
          </Text>
          
          <Group justify="flex-end">
            <Button variant="light" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteProduct} loading={loading}>
              Delete Product
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        opened={bulkModalOpened}
        onClose={closeBulkModal}
        title="Bulk Import Products"
        size="md"
      >
        <Stack>
          <Text size="sm" c="dimmed">
            Upload a CSV file to import multiple products at once. Download the template below to get started.
          </Text>
          
          <Button variant="light" leftSection={<IconDownload size={16} />}>
            Download CSV Template
          </Button>
          
          <FileInput
            label="Upload CSV File"
            placeholder="Select file"
            accept=".csv"
            leftSection={<IconUpload size={16} />}
          />
          
          <Group justify="flex-end">
            <Button variant="light" onClick={closeBulkModal}>
              Cancel
            </Button>
            <Button leftSection={<IconUpload size={16} />}>
              Import Products
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};

export default ProductManagement;
