// Dbanyan Group - Professional Admin Dashboard Overview
// Amazon-style analytics dashboard with real-time KPIs and comprehensive business metrics

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Text,
  Title,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Progress,
  Tabs,
  Table,
  Avatar,
  Button,
  Select,
  NumberInput,
  Loader,
  Alert,
  Box,
  RingProgress,
  SimpleGrid,
  Center,
  ThemeIcon
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconShoppingCart,
  IconUsers,
  IconPackage,
  IconCurrencyRupee,
  IconEye,
  IconRefresh,
  IconAlertCircle,
  IconCheck,
  IconClock,
  IconTruck,
  IconStar,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCalendar,
  IconFilter,
  IconDownload
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import GetAllOrderData from '../../API_FILES/order_apis/GetAllOrderData';
import GetCounts from '../../API_FILES/order_apis/GetCounts';

const AdminDashboardOverview = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [order,setorder]=useState([])
  const [counts,setcount]=useState({})
  async function getrecentproducts() {
    const res=await GetAllOrderData()
    // console.log(res)
    if(res?.data){
      const latestFour = res?.data
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 4);
  setorder(latestFour)
    }
    
  }
    async function GetCompleteCounts(){
      const res=await GetCounts()
      // console.log(res)
      if(res?.count){
        setcount(res?.count)
      }
    }

  useEffect(() => {
    getrecentproducts()
    GetCompleteCounts()
  }, []);

  // Professional KPI calculations with comprehensive business metrics
  const calculateKPIs = () => {
    const totalProducts = counts.TotalRevenue
    const activeProducts = products.filter(p => p.status === 'active').length;
    const featuredProducts = products.filter(p => p.is_featured).length;
    const lowStockProducts = products.filter(p => p.stock_quantity < (p.low_stock_threshold || 10)).length;
    const outOfStockProducts = products.filter(p => p.stock_quantity === 0).length;
    
    // Calculate inventory value
    const totalInventoryValue = products.reduce((sum, p) => {
      return sum + (p.stock_quantity * p.cost_price || p.price * 0.7);
    }, 0);
    
    // Calculate average metrics
    const avgPrice = products.length > 0 ? 
      products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;
    
    const avgRating = products.length > 0 ?
      products.reduce((sum, p) => sum + (p.average_rating || 0), 0) / products.length : 0;

    return {
      revenue: {
        current: counts?.TotalRevenue,
        previous: counts?.TotalRevenue,
        change: 17.4,
        trend: 'up',
        target: 100000,
        completion: 89.75
      },
      orders: {
        current: counts?.OrderCount,
        previous: counts?.OrderCount,
        change: 18.2,
        trend: 'up',
        target: 200,
        completion: 78.0
      },
      customers: {
        current: counts?.userCount || 985,
        previous: counts?.userCount || 985,
        change: 7.4,
        trend: 'up',
        newCustomers: 17,
        returningCustomers: 231
      },
      avgOrderValue: {
        current: counts?.AverageOrderValue,
        previous: counts?.AverageOrderValue,
        change: -0.6,
        trend: 'down'
      },
      conversionRate: {
        current: 3.2,
        previous: 2.8,
        change: 14.3,
        trend: 'up'
      },
      products: {
        total: totalProducts,
        active: activeProducts,
        featured: featuredProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts,
        inventoryValue: totalInventoryValue
      },
      performance: {
        avgPrice: avgPrice,
        avgRating: avgRating,
        topCategory: products.length > 0 ? 
          Object.entries(products.reduce((acc, p) => {
            acc[p.category] = (acc[p.category] || 0) + 1;
            return acc;
          }, {})).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A' : 'N/A'
      },
      conversionRate: {
        current: 3.2,
        previous: 2.8,
        change: 14.3,
        trend: 'up'
      }
    };
  };

  const kpis = calculateKPIs();

  const productPerformanceData = [
    { name: 'Moringa Powder', sales: 145, revenue: 130050 },
    { name: 'Moringa Paste', sales: 98, revenue: 58702 },
    { name: 'Moringa Drumsticks', sales: 87, revenue: 26013 },
    { name: 'Moringa Leaves', sales: 76, revenue: 22800 }
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Rajesh Kumar',
      amount: 1299,
      status: 'confirmed',
      time: '2 mins ago',
      avatar: 'RK'
    },
    {
      id: 'ORD-002',
      customer: 'Priya Sharma',
      amount: 899,
      status: 'processing',
      time: '5 mins ago',
      avatar: 'PS'
    },
    {
      id: 'ORD-003',
      customer: 'Amit Patel',
      amount: 2499,
      status: 'shipped',
      time: '12 mins ago',
      avatar: 'AP'
    },
    {
      id: 'ORD-004',
      customer: 'Sunita Gupta',
      amount: 599,
      status: 'delivered',
      time: '25 mins ago',
      avatar: 'SG'
    }
  ];

  // Professional status colors
  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      processing: 'cyan',
      shipped: 'violet',
      delivered: 'green',
      cancelled: 'red'
    };
    return colors[status] || 'gray';
  };
  function formatDate(isoString) {
  const date = new Date(isoString);

  // Options for formatting
  const options = {
    year: "numeric",
    month: "short", // "Jan", "Feb", ...
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("en-US", options);
}

  // KPI Card Component
  const KPICard = ({ title, value, previousValue, change, trend, icon: Icon, prefix = '', suffix = '' }) => (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed" fw={500}>{title}</Text>
        <ThemeIcon color={trend === 'up' ? 'green' : 'red'} variant="light" size="sm">
          <Icon size={14} />
        </ThemeIcon>
      </Group>
      
      <Group align="flex-end" gap="sm" mb="xs">
        <Text size="xl" fw={700}>
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </Text>
        <Group gap={4}>
          {trend === 'up' ? (
            <IconArrowUpRight size={16} color="green" />
          ) : (
            <IconArrowDownRight size={16} color="red" />
          )}
          <Text size="sm" c={trend === 'up' ? 'green' : 'red'} fw={500}>
            {change.toFixed(1)}%
          </Text>
        </Group>
      </Group>
      
      <Text size="xs" c="dimmed">
        vs {prefix}{previousValue.toLocaleString()}{suffix} last period
      </Text>
    </Card>
  );

  return (
    <Box>
      {/* Page Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Dashboard Overview</Title>
          <Text c="dimmed">Real-time business insights and performance metrics</Text>
        </div>
        
        <Group>
          <Select
            data={[
              { value: '1d', label: 'Last 24 hours' },
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' }
            ]}
            value={timeRange}
            onChange={setTimeRange}
            leftSection={<IconCalendar size={16} />}
          />
          <Button onClick={()=>GetCompleteCounts()} leftSection={<IconRefresh size={16} />} variant="light">
            Refresh
          </Button>
          {/* <Button leftSection={<IconDownload size={16} />} variant="outline">
            Export
          </Button> */}
        </Group>
      </Group>

      {/* KPI Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <KPICard
            title="Total Revenue"
            value={kpis.revenue.current}
            previousValue={kpis.revenue.previous}
            change={kpis.revenue.change}
            trend={kpis.revenue.trend}
            icon={IconCurrencyRupee}
            prefix="₹"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KPICard
            title="Total Orders"
            value={kpis.orders.current}
            previousValue={kpis.orders.previous}
            change={kpis.orders.change}
            trend={kpis.orders.trend}
            icon={IconShoppingCart}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <KPICard
            title="Active Customers"
            value={kpis.customers.current}
            previousValue={kpis.customers.previous}
            change={kpis.customers.change}
            trend={kpis.customers.trend}
            icon={IconUsers}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KPICard
            title="Avg Order Value"
            value={kpis.avgOrderValue.current}
            previousValue={kpis.avgOrderValue.previous}
            change={kpis.avgOrderValue.change}
            trend={kpis.avgOrderValue.trend}
            icon={IconTrendingUp}
            prefix="₹"
          />
        </motion.div>
      </SimpleGrid>

      <Grid>
        {/* Revenue Trend Chart */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder h={400}>
            <Group justify="space-between" mb="md">
              <Title order={4}>Revenue Trend</Title>
              <Badge variant="light">Last 7 days</Badge>
            </Group>
            
            <Center h={300} c="dimmed">
              <Stack align="center">
                <IconTrendingUp size={48} />
                <Text>Revenue trend chart will be displayed here</Text>
                <Text size="sm">Chart library integration pending</Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>

        {/* Quick Stats */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack>
            {/* Product Overview */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={5} mb="md">Product Overview</Title>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="sm">Total Products</Text>
                  <Badge variant="filled">{kpis.products.total}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Active Products</Text>
                  <Badge color="green">{kpis.products.active}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text size="sm">Low Stock Alert</Text>
                  <Badge color={kpis.products.lowStock > 0 ? 'red' : 'green'}>
                    {kpis.products.lowStock}
                  </Badge>
                </Group>
              </Stack>
            </Card>

            {/* Conversion Rate */}
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Title order={5} mb="md">Conversion Rate</Title>
              <Center>
                <RingProgress
                  size={120}
                  thickness={12}
                  sections={[{ value: kpis.conversionRate.current * 10, color: 'blue' }]}
                  label={
                    <Text size="xl" fw={700} ta="center">
                      {kpis.conversionRate.current}%
                    </Text>
                  }
                />
              </Center>
              <Text size="sm" c="dimmed" ta="center" mt="sm">
                +{kpis.conversionRate.change}% from last period
              </Text>
            </Card>
          </Stack>
        </Grid.Col>

        {/* Recent Orders */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Recent Orders</Title>
              {/* <Button variant="light" size="sm">View All Orders</Button> */}
            </Group>
            
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Order ID</Table.Th>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Time</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {order?.map((order) => (
                  <Table.Tr key={order.order_id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>{order.order_id}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                      
                        <Text size="sm">{order.users?.full_name}</Text>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>₹{order.amount.toLocaleString()}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(order.status)} variant="light" size="sm">
                        {order.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="xs" c="dimmed">{formatDate(order.created_at)}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        {/* Customer Segments */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={4} mb="md">Customer Segments</Title>
            <Center h={200} c="dimmed">
              <Stack align="center">
                <IconUsers size={48} />
                <Text>Customer segment chart will be displayed here</Text>
                <Text size="sm">Chart library integration pending</Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Alerts and Notifications */}
      {kpis.products.lowStock > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Inventory Alert"
            color="orange"
            mt="xl"
          >
            {kpis.products.lowStock} product(s) are running low on stock. Consider restocking soon.
          </Alert>
        </motion.div>
      )}
    </Box>
  );
};

export default AdminDashboardOverview;
