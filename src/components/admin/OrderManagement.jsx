// Dbanyan Group - Professional Order Management System
// Amazon-style order processing with lifecycle management, bulk operations, and advanced analytics

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
  Textarea,
  Select,
  Avatar,
  Menu,
  Pagination,
  Tabs,
  Progress,
  Alert,
  Loader,
  Grid,
  SimpleGrid,
  Tooltip,
  Checkbox,
  Center,
  Divider,
  Timeline,
  NumberInput,
  Switch,
  ScrollArea,
  Paper,
  Image,
  CopyButton,
  Anchor
} from '@mantine/core';
import {
  IconShoppingCart,
  IconEdit,
  IconEye,
  IconDots,
  IconSearch,
  IconFilter,
  IconDownload,
  IconCheck,
  IconX,
  IconClock,
  IconTruck,
  IconPackage,
  IconUser,
  IconMapPin,
  IconPhone,
  IconMail,
  IconCreditCard,
  IconRefresh,
  IconPrinter,
  IconCopy,
  IconArchive,
  IconBan,
  IconAlertCircle,
  IconCalendar,
  IconArrowUp,
  IconArrowDown,
  IconNote,
  IconCurrencyRupee,
  IconTrendingUp,
  IconUsers,
  IconClipboard
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import GetAllOrderData from '../../API_FILES/order_apis/GetAllOrderData';
import CustomLoader from '../../Loader/CustomLoader';
import * as XLSX from 'xlsx';
import OrderDetailsModal from './OrderDetailsModal';
import { printData } from '../../utils/printUtils';

const OrderManagement = () => {
  // Component state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
    async function getordersdata(){
      setLoading(true)
      const res=await GetAllOrderData()
      // console.log(res)
      if(res?.data){
        setLoading(false)
        setOrders(res?.data)
      }
    }

  useEffect(()=>{
    getordersdata()
  },[])
  const [orderModalOpened, { open: openOrderModal, close: closeOrderModal }] = useDisclosure(false);
  const [updateModalOpened, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [bulkModalOpened, { open: openBulkModal, close: closeBulkModal }] = useDisclosure(false);
  const [refundModalOpened, { open: openRefundModal, close: closeRefundModal }] = useDisclosure(false);
  // const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  // Advanced filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('all-orders');
  const itemsPerPage = 15;

  // Amazon-style order lifecycle configuration
  const orderStatuses = [
    { 
      id: 'pending', 
      label: 'Pending Payment', 
      color: 'orange', 
      description: 'Awaiting payment confirmation',
      actions: ['cancel', 'edit', 'contact_customer'],
      nextStates: ['confirmed', 'cancelled']
    },
    { 
      id: 'confirmed', 
      label: 'Payment Confirmed', 
      color: 'blue', 
      description: 'Payment received, ready to process',
      actions: ['process', 'cancel', 'refund'],
      nextStates: ['processing', 'cancelled']
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      color: 'yellow', 
      description: 'Order is being prepared',
      actions: ['ship', 'cancel', 'add_note'],
      nextStates: ['shipped', 'cancelled']
    },
    { 
      id: 'shipped', 
      label: 'Shipped', 
      color: 'purple', 
      description: 'Package is in transit',
      actions: ['track', 'deliver', 'return'],
      nextStates: ['delivered', 'returned']
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      color: 'green', 
      description: 'Successfully delivered to customer',
      actions: ['complete', 'return', 'feedback'],
      nextStates: ['completed', 'returned']
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      color: 'teal', 
      description: 'Order successfully completed',
      actions: ['archive', 'reorder', 'review'],
      nextStates: ['archived']
    },
    { 
      id: 'cancelled', 
      label: 'Cancelled', 
      color: 'red', 
      description: 'Order was cancelled',
      actions: ['archive', 'reorder', 'refund'],
      nextStates: ['archived']
    },
    { 
      id: 'returned', 
      label: 'Returned', 
      color: 'gray', 
      description: 'Order was returned by customer',
      actions: ['refund', 'restock', 'archive'],
      nextStates: ['refunded', 'archived']
    },
    { 
      id: 'refunded', 
      label: 'Refunded', 
      color: 'pink', 
      description: 'Refund processed',
      actions: ['archive', 'reorder'],
      nextStates: ['archived']
    }
  ];

  const paymentStatuses = [
    { id: 'pending', label: 'Pending', color: 'orange' },
    { id: 'paid', label: 'Paid', color: 'green' },
    { id: 'failed', label: 'Failed', color: 'red' },
    { id: 'refunded', label: 'Refunded', color: 'gray' },
    { id: 'partially_refunded', label: 'Partially Refunded', color: 'yellow' }
  ];

  // Bulk actions for order management
  const bulkActions = [
    { value: 'update_status', label: 'Update Status', icon: 'edit', color: 'blue' },
    { value: 'export_orders', label: 'Export Orders', icon: 'download', color: 'green' },
    { value: 'print_labels', label: 'Print Shipping Labels', icon: 'printer', color: 'purple' },
    { value: 'send_emails', label: 'Send Email Updates', icon: 'mail', color: 'yellow' },
    { value: 'mark_shipped', label: 'Mark as Shipped', icon: 'truck', color: 'indigo' },
    { value: 'archive_orders', label: 'Archive Orders', icon: 'archive', color: 'gray' }
  ];

  // Mock orders data with comprehensive Amazon-style structure
  const mockOrders = [
    {
      id: 'ORD-001',
      order_number: 'DBN-2024-001',
      customer: {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 9876543210',
        avatar: 'RK'
      },
      items: [
        { name: 'Premium Moringa Powder', quantity: 2, price: 899, image: null },
        { name: 'Moringa Paste', quantity: 1, price: 599, image: null }
      ],
      total_amount: 2397,
      status: 'confirmed',
      payment_status: 'completed',
      payment_method: 'UPI',
      shipping_address: {
        address: '123 Green Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400001',
        country: 'India'
      },
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T11:00:00Z',
      timeline: [
        { status: 'pending', timestamp: '2024-01-15T10:30:00Z', note: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-15T11:00:00Z', note: 'Payment confirmed' }
      ]
    },
    {
      id: 'ORD-002',
      order_number: 'DBN-2024-002',
      customer: {
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 9876543211',
        avatar: 'PS'
      },
      items: [
        { name: 'Organic Moringa Drumsticks', quantity: 3, price: 299, image: null }
      ],
      total_amount: 897,
      status: 'processing',
      payment_status: 'completed',
      payment_method: 'Card',
      shipping_address: {
        address: '456 Health Avenue',
        city: 'Pune',
        state: 'Maharashtra',
        postal_code: '411001',
        country: 'India'
      },
      created_at: '2024-01-14T14:20:00Z',
      updated_at: '2024-01-15T09:15:00Z',
      timeline: [
        { status: 'pending', timestamp: '2024-01-14T14:20:00Z', note: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-14T14:30:00Z', note: 'Payment confirmed' },
        { status: 'processing', timestamp: '2024-01-15T09:15:00Z', note: 'Order is being processed' }
      ]
    },
    {
      id: 'ORD-003',
      order_number: 'DBN-2024-003',
      customer: {
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 9876543212',
        avatar: 'AP'
      },
      items: [
        { name: 'Moringa Powder Combo Pack', quantity: 1, price: 2499, image: null }
      ],
      total_amount: 2499,
      status: 'shipped',
      payment_status: 'completed',
      payment_method: 'Net Banking',
      shipping_address: {
        address: '789 Wellness Road',
        city: 'Ahmedabad',
        state: 'Gujarat',
        postal_code: '380001',
        country: 'India'
      },
      created_at: '2024-01-13T16:45:00Z',
      updated_at: '2024-01-15T08:30:00Z',
      timeline: [
        { status: 'pending', timestamp: '2024-01-13T16:45:00Z', note: 'Order placed' },
        { status: 'confirmed', timestamp: '2024-01-13T17:00:00Z', note: 'Payment confirmed' },
        { status: 'processing', timestamp: '2024-01-14T10:00:00Z', note: 'Order processed' },
        { status: 'shipped', timestamp: '2024-01-15T08:30:00Z', note: 'Package shipped via BlueDart' }
      ]
    }
  ];

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  // Calculate order statistics
  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length : 0
  };

  // Format currency
  const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };




const export_to_excel = (data, fileName) => {
  if (!Array.isArray(data) || data.length === 0) {
    alert("No data to export");
    return;
  }

  setLoading(true);

  const workbook = XLSX.utils.book_new();

  // Flatten data
  const flattened = data.map((item) => ({
    ...item,
    ...item.products, // merge product fields
    ...item.users,    // merge user fields
  }));

  // Remove nested objects (optional)
  flattened.forEach((item) => {
    delete item.products;
    delete item.users;
  });

  // Convert to sheet
  const worksheet = XLSX.utils.json_to_sheet(flattened);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

  // Save file
  XLSX.writeFile(workbook, fileName);

  setLoading(false);
};

 const handlePrint = (data) => {
  const product = data.products; // single product object
  const headers = ["Field", "Value"];
  const rows = [
    ["Product Name", product.name],
    ["Quantity", data.quantity],
    ["Price", product.price],
    ["Total", data.amount],
    ["Customer", data.users.full_name || "N/A"],
    ["Order ID", data.order_id || "N/A"],
    ["Date", data.created_at || new Date().toLocaleDateString()],
  ];

  printData(`${product.name}-Invoice`, headers, rows,"https://example.com/logo.png");
};


  return (
    <Box>
      {
        loading && <CustomLoader/>
      }
      {/* Page Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Order Management</Title>
          <Text c="dimmed">Process orders, track fulfillment, and manage customer orders</Text>
        </div>
        
        <Group>
                
          <Button onClick={()=>export_to_excel(orders,"orders.xlsx")} leftSection={<IconDownload size={16} />} variant="light">
            Export Orders
          </Button>
          <Button leftSection={<IconRefresh size={16} />} onClick={() => getordersdata()}>
            Refresh
          </Button>
        </Group>
      </Group>

      {/* Order Statistics */}
      <SimpleGrid cols={{ base: 2, sm: 4, lg: 6 }} mb="xl">
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Orders</Text>
              <Text size="xl" fw={700}>{orderStats.total}</Text>
            </div>
            <IconShoppingCart size={24} color="blue" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Processing</Text>
              <Text size="xl" fw={700} c="cyan">{orderStats.processing}</Text>
            </div>
            <IconPackage size={24} color="cyan" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Shipped</Text>
              <Text size="xl" fw={700} c="violet">{orderStats.shipped}</Text>
            </div>
            <IconTruck size={24} color="violet" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Completed</Text>
              <Text size="xl" fw={700} c="green">{orderStats.completed}</Text>
            </div>
            <IconCheck size={24} color="green" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Revenue</Text>
              <Text size="xl" fw={700} c="green">{formatCurrency(orderStats.totalRevenue)}</Text>
            </div>
            <IconTrendingUp size={24} color="green" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Avg Order Value</Text>
              <Text size="xl" fw={700}>{formatCurrency(orderStats.avgOrderValue)}</Text>
            </div>
            <IconCurrencyRupee size={24} color="blue" />
          </Group>
        </Card>
      </SimpleGrid>

      {/* Orders Table */}
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4} mb="md">Recent Orders</Title>
        {orders?.length === 0 ? (
          <Center py="xl">
            <Stack align="center">
              <IconShoppingCart size={48} color="gray" />
              <Text size="lg" fw={500} c="dimmed">No orders found</Text>
              <Text size="sm" c="dimmed">
                Orders will appear here once customers start placing them
              </Text>
            </Stack>
          </Center>
        ) : (
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Items</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders?.map((order, index) => (
                <motion.tr
                  key={order.order_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Table.Td>
                    <div>
                      <Text size="sm" fw={500}>{order.order_id}</Text>
                      <Text size="xs" c="dimmed">#{order.razorpay_order_id}</Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" color="blue">
                        {order?.users?.full_name}
                      </Avatar>
                      <div>
                        <Text size="sm" fw={500}>{order?.users?.full_name}</Text>
                        <Text size="xs" c="dimmed">{order?.users?.email}</Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>{order.quantity} item(s)</Text>
                    
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>₹{order.amount}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={orderStatuses.find(s => s.value === order.status)?.color || 'gray'}
                      variant="light"
                      size="sm"
                    >
                      {orderStatuses.find(s => s.value === order.status)?.label || order.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{formatDate(order.created_at)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="View Order">
                        <ActionIcon variant="light" size="sm">
                          <IconEye onClick={() => {
          setSelectedOrder(order);
          setOpened(true);
        }} size={14} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Edit Order">
                        <ActionIcon variant="light" size="sm">
                          <IconEdit onClick={() => {
          setSelectedOrder(order);
          setOpened(true);
        }} size={14} />
                        </ActionIcon>
                      </Tooltip>
                      <Menu shadow="md" width={160}>
                        <Menu.Target>
                          <ActionIcon variant="light" size="sm">
                            <IconDots size={14} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item onClick={()=>handlePrint(order)} leftSection={<IconPrinter size={14} />}>
                            Print Invoice
                          </Menu.Item>
                          {/* <Menu.Item leftSection={<IconClipboard size={14} />}>
                            Print Label
                          </Menu.Item> */}
                          <Menu.Item leftSection={<IconMail size={14} />}>
                            Send Email
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </motion.tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
        {selectedOrder && (
        <OrderDetailsModal
          opened={opened}
          onClose={() => setOpened(false)}
          order={selectedOrder}
          
        />
      )}
      </Card>
    </Box>
  );
};

export default OrderManagement;
