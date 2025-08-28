// Dbanyan Group - Professional Analytics Dashboard
// Amazon-style business intelligence with advanced charts, KPIs, and actionable insights

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Group,
  Stack,
  Title,
  Text,
  SimpleGrid,
  Paper,
  ThemeIcon,
  Progress,
  RingProgress,
  Grid,
  Select,
  Button,
  Badge,
  Table,
  Center,
  Divider,
  Tooltip,
  ActionIcon,
  Tabs,
  List,
  Alert,
  Flex
} from '@mantine/core';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconShoppingCart,
  IconCurrencyRupee,
  IconArrowUpRight,
  IconArrowDownRight,
  IconCalendar,
  IconRefresh,
  IconDownload,
  IconEye,
  IconStar,
  IconTarget,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconGift,
  IconPackage,
  IconTruck,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconMapPin,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconBrandGoogle,
  IconBrandFacebook,
  IconMail,
  IconWorld,
  IconHeart
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  // Comprehensive analytics data structure (Amazon-style)
  const analyticsData = {
    overview: {
      totalRevenue: 245679,
      revenueGrowth: 12.5,
      revenueTarget: 300000,
      totalOrders: 1847,
      ordersGrowth: 8.3,
      ordersTarget: 2000,
      totalCustomers: 892,
      customersGrowth: 15.2,
      newCustomers: 134,
      returningCustomers: 758,
      avgOrderValue: 1331,
      aovGrowth: -2.1,
      conversionRate: 3.4,
      conversionGrowth: 0.8,
      abandonmentRate: 68.7,
      returnRate: 2.1,
      returnGrowth: -0.5,
      customerLifetimeValue: 8750,
      customerAcquisitionCost: 125,
      monthlyRecurringRevenue: 45600,
      churnRate: 5.2
    },
    salesMetrics: {
      grossRevenue: 245679,
      netRevenue: 221112,
      refunds: 12456,
      discounts: 15678,
      taxes: 34567,
      shippingRevenue: 8900,
      grossMargin: 62.4,
      netMargin: 58.1,
      inventoryTurnover: 8.7,
      daysInInventory: 42
    },
    performanceKPIs: {
      pageViews: 45678,
      uniqueVisitors: 12456,
      bounceRate: 42.3,
      avgSessionDuration: 245, // seconds
      pagesPerSession: 3.2,
      mobileTraffic: 67.8,
      organicTraffic: 45.2,
      directTraffic: 28.9,
      referralTraffic: 25.9
    },
    salesTrend: [
      { date: '2024-01-09', sales: 12500, orders: 45, visitors: 1250, conversion: 3.6 },
      { date: '2024-01-10', sales: 15200, orders: 52, visitors: 1380, conversion: 3.8 },
      { date: '2024-01-11', sales: 18900, orders: 68, visitors: 1560, conversion: 4.4 },
      { date: '2024-01-12', sales: 14300, orders: 41, visitors: 1190, conversion: 3.4 },
      { date: '2024-01-13', sales: 22100, orders: 79, visitors: 1780, conversion: 4.4 },
      { date: '2024-01-14', sales: 19800, orders: 63, visitors: 1450, conversion: 4.3 },
      { date: '2024-01-15', sales: 24500, orders: 87, visitors: 1890, conversion: 4.6 }
    ],
    topProducts: [
      { 
        id: 1,
        name: 'Premium Moringa Powder', 
        sales: 45600, 
        units: 152, 
        growth: 18.5,
        margin: 65.2,
        stock: 89,
        rating: 4.8,
        reviews: 127
      },
      { 
        id: 2,
        name: 'Organic Moringa Paste', 
        sales: 32400, 
        units: 108, 
        growth: 12.3,
        margin: 58.7,
        stock: 156,
        rating: 4.6,
        reviews: 89
      },
      { 
        id: 3,
        name: 'Moringa Drumsticks Fresh', 
        sales: 28900, 
        units: 289, 
        growth: 8.7,
        margin: 45.3,
        stock: 234,
        rating: 4.5,
        reviews: 203
      },
      { 
        id: 4,
        name: 'Moringa Combo Pack', 
        sales: 25100, 
        units: 67, 
        growth: 22.1,
        margin: 72.1,
        stock: 45,
        rating: 4.9,
        reviews: 156
      },
      { 
        id: 5,
        name: 'Moringa Leaves Powder', 
        sales: 18700, 
        units: 89, 
        growth: 5.4,
        margin: 61.8,
        stock: 178,
        rating: 4.4,
        reviews: 78
      }
    ],
    customerInsights: {
      segments: [
        { segment: 'VIP', count: 12, revenue: 89560, percentage: 36.4 },
        { segment: 'Premium', count: 34, revenue: 67890, percentage: 27.6 },
        { segment: 'Regular', count: 87, revenue: 56780, percentage: 23.1 },
        { segment: 'New', count: 156, revenue: 31449, percentage: 12.8 }
      ],
      geography: [
        { state: 'Maharashtra', customers: 156, revenue: 67890, percentage: 27.6 },
        { state: 'Karnataka', customers: 134, revenue: 54320, percentage: 22.1 },
        { state: 'Delhi', customers: 98, revenue: 45670, percentage: 18.6 },
        { state: 'Tamil Nadu', customers: 87, revenue: 38900, percentage: 15.8 },
        { state: 'Others', customers: 417, revenue: 38899, percentage: 15.8 }
      ],
      acquisition: [
        { channel: 'Organic Search', customers: 234, cost: 12500, cac: 53.4 },
        { channel: 'Social Media', customers: 189, cost: 18900, cac: 100.0 },
        { channel: 'Direct', customers: 156, cost: 5600, cac: 35.9 },
        { channel: 'Email Marketing', customers: 123, cost: 8900, cac: 72.4 },
        { channel: 'Referrals', customers: 98, cost: 3400, cac: 34.7 }
      ]
    },
    operationalMetrics: {
      inventory: {
        totalValue: 456789,
        turnoverRate: 8.7,
        lowStockItems: 12,
        outOfStockItems: 3,
        excessInventory: 45678
      },
      fulfillment: {
        avgProcessingTime: 1.2, // days
        avgShippingTime: 3.4, // days
        onTimeDelivery: 94.2, // percentage
        returnRate: 2.1,
        customerSatisfaction: 4.6
      },
      support: {
        totalTickets: 234,
        avgResponseTime: 2.3, // hours
        avgResolutionTime: 8.7, // hours
        satisfactionScore: 4.4,
        firstContactResolution: 78.9
      }
    },
    customerSegments: [
      { segment: 'VIP Customers', count: 45, revenue: 89500, percentage: 36.4 },
      { segment: 'Premium', count: 126, revenue: 78900, percentage: 32.1 },
      { segment: 'Regular', count: 348, revenue: 65200, percentage: 26.5 },
      { segment: 'New Customers', count: 373, revenue: 12079, percentage: 4.9 }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 2580, percentage: 42.3, conversion: 4.2 },
      { source: 'Direct', visitors: 1650, percentage: 27.1, conversion: 5.8 },
      { source: 'Social Media', visitors: 920, percentage: 15.1, conversion: 2.1 },
      { source: 'Paid Ads', visitors: 680, percentage: 11.2, conversion: 3.7 },
      { source: 'Email', visitors: 270, percentage: 4.4, conversion: 8.9 }
    ],
    deviceBreakdown: [
      { device: 'Mobile', percentage: 68.5 },
      { device: 'Desktop', percentage: 24.2 },
      { device: 'Tablet', percentage: 7.3 }
    ],
    recentOrders: [
      { id: 'ORD-2024-001', customer: 'Rajesh Kumar', amount: 2397, status: 'shipped', time: '2 hours ago' },
      { id: 'ORD-2024-002', customer: 'Priya Sharma', amount: 897, status: 'processing', time: '3 hours ago' },
      { id: 'ORD-2024-003', customer: 'Amit Patel', amount: 2499, status: 'delivered', time: '5 hours ago' },
      { id: 'ORD-2024-004', customer: 'Sneha Gupta', amount: 1299, status: 'confirmed', time: '6 hours ago' }
    ]
  };

  // Format currency
  const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

  // Format percentage
  const formatPercentage = (value, showSign = true) => {
    const sign = showSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  // Get trend icon and color
  const getTrendDisplay = (value) => {
    const isPositive = value >= 0;
    return {
      icon: isPositive ? IconArrowUpRight : IconArrowDownRight,
      color: isPositive ? 'green' : 'red'
    };
  };

  return (
    <Box>
      {/* Page Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Business Analytics</Title>
          <Text c="dimmed">Real-time insights and performance metrics</Text>
        </div>
        
        <Group>
          <Select
            data={[
              { value: '24h', label: 'Last 24 Hours' },
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
              { value: '1y', label: 'Last Year' }
            ]}
            value={timeRange}
            onChange={setTimeRange}
          />
          <Button leftSection={<IconDownload size={16} />} variant="light">
            Export Report
          </Button>
          <Button leftSection={<IconRefresh size={16} />}>
            Refresh
          </Button>
        </Group>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
        <Tabs.List>
          <Tabs.Tab value="overview" leftSection={<IconChartBar size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="sales" leftSection={<IconTrendingUp size={16} />}>
            Sales Analytics
          </Tabs.Tab>
          <Tabs.Tab value="customers" leftSection={<IconUsers size={16} />}>
            Customer Insights
          </Tabs.Tab>
          <Tabs.Tab value="products" leftSection={<IconPackage size={16} />}>
            Product Performance
          </Tabs.Tab>
          <Tabs.Tab value="traffic" leftSection={<IconEye size={16} />}>
            Traffic Analysis
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          {/* Key Performance Indicators */}
          <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} mb="xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="green" variant="light" size="lg">
                    <IconCurrencyRupee size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.revenueGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.revenueGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Revenue
                </Text>
                <Text size="xl" fw={700}>
                  {formatCurrency(analyticsData.overview.totalRevenue)}
                </Text>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="blue" variant="light" size="lg">
                    <IconShoppingCart size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.ordersGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.ordersGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Orders
                </Text>
                <Text size="xl" fw={700}>
                  {analyticsData.overview.totalOrders.toLocaleString()}
                </Text>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="violet" variant="light" size="lg">
                    <IconUsers size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.customersGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.customersGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Total Customers
                </Text>
                <Text size="xl" fw={700}>
                  {analyticsData.overview.totalCustomers.toLocaleString()}
                </Text>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="orange" variant="light" size="lg">
                    <IconTarget size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.aovGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.aovGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Avg Order Value
                </Text>
                <Text size="xl" fw={700}>
                  {formatCurrency(analyticsData.overview.avgOrderValue)}
                </Text>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="teal" variant="light" size="lg">
                    <IconChartLine size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.conversionGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.conversionGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Conversion Rate
                </Text>
                <Text size="xl" fw={700}>
                  {formatPercentage(analyticsData.overview.conversionRate, false)}
                </Text>
              </Paper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon color="red" variant="light" size="lg">
                    <IconAlertCircle size={20} />
                  </ThemeIcon>
                  <Group gap="xs">
                    {(() => {
                      const { icon: TrendIcon, color } = getTrendDisplay(analyticsData.overview.returnGrowth);
                      return (
                        <>
                          <TrendIcon size={16} color={color} />
                          <Text size="xs" c={color}>
                            {formatPercentage(analyticsData.overview.returnGrowth)}
                          </Text>
                        </>
                      );
                    })()}
                  </Group>
                </Group>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Return Rate
                </Text>
                <Text size="xl" fw={700}>
                  {formatPercentage(analyticsData.overview.returnRate, false)}
                </Text>
              </Paper>
            </motion.div>
          </SimpleGrid>

          {/* Charts and Tables Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              {/* Sales Trend Chart Placeholder */}
              <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
                <Group justify="space-between" mb="md">
                  <Title order={4}>Sales Trend</Title>
                  <Badge color="green" variant="light">
                    +{formatPercentage(12.5)} vs last period
                  </Badge>
                </Group>
                <Center h={300} c="dimmed">
                  <Stack align="center">
                    <IconChartLine size={48} />
                    <Text>Sales trend chart will be displayed here</Text>
                    <Text size="sm">Integration with chart library required</Text>
                  </Stack>
                </Center>
              </Card>

              {/* Top Products */}
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Title order={4} mb="md">Top Performing Products</Title>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Product</Table.Th>
                      <Table.Th>Revenue</Table.Th>
                      <Table.Th>Units Sold</Table.Th>
                      <Table.Th>Growth</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {analyticsData.topProducts.map((product, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>
                          <Group gap="sm">
                            <Badge size="sm" variant="light" color="blue">
                              #{index + 1}
                            </Badge>
                            <Text size="sm" fw={500}>{product.name}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600}>
                            {formatCurrency(product.sales)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{product.units} units</Text>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            {(() => {
                              const { icon: TrendIcon, color } = getTrendDisplay(product.growth);
                              return (
                                <>
                                  <TrendIcon size={14} color={color} />
                                  <Text size="sm" c={color}>
                                    {formatPercentage(product.growth)}
                                  </Text>
                                </>
                              );
                            })()}
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              {/* Customer Segments */}
              <Card shadow="sm" p="lg" radius="md" withBorder mb="lg">
                <Title order={4} mb="md">Customer Segments</Title>
                <Stack gap="md">
                  {analyticsData.customerSegments.map((segment, index) => (
                    <div key={index}>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>{segment.segment}</Text>
                        <Text size="sm" c="dimmed">{segment.count} customers</Text>
                      </Group>
                      <Progress
                        value={segment.percentage}
                        size="lg"
                        color={index === 0 ? 'gold' : index === 1 ? 'violet' : index === 2 ? 'blue' : 'green'}
                        mb="xs"
                      />
                      <Group justify="space-between">
                        <Text size="xs" c="dimmed">
                          {formatPercentage(segment.percentage, false)} of revenue
                        </Text>
                        <Text size="xs" fw={500}>
                          {formatCurrency(segment.revenue)}
                        </Text>
                      </Group>
                    </div>
                  ))}
                </Stack>
              </Card>

              {/* Recent Orders */}
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Title order={4}>Recent Orders</Title>
                  <ActionIcon variant="light" size="sm">
                    <IconEye size={14} />
                  </ActionIcon>
                </Group>
                <Stack gap="sm">
                  {analyticsData.recentOrders.map((order, index) => (
                    <Paper key={index} p="sm" withBorder>
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>{order.id}</Text>
                        <Badge
                          size="xs"
                          color={
                            order.status === 'delivered' ? 'green' :
                            order.status === 'shipped' ? 'blue' :
                            order.status === 'processing' ? 'orange' : 'gray'
                          }
                        >
                          {order.status}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed" mb="xs">{order.customer}</Text>
                      <Group justify="space-between">
                        <Text size="sm" fw={600}>
                          {formatCurrency(order.amount)}
                        </Text>
                        <Text size="xs" c="dimmed">{order.time}</Text>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="sales">
          <Alert icon={<IconChartLine size={16} />} color="blue" mb="xl">
            Sales analytics with detailed revenue breakdowns, forecasting, and performance comparisons will be displayed here.
          </Alert>
        </Tabs.Panel>

        <Tabs.Panel value="customers">
          <Alert icon={<IconUsers size={16} />} color="violet" mb="xl">
            Customer analytics including acquisition, retention, lifetime value, and segmentation analysis will be displayed here.
          </Alert>
        </Tabs.Panel>

        <Tabs.Panel value="products">
          <Alert icon={<IconPackage size={16} />} color="orange" mb="xl">
            Product performance analytics including inventory turnover, profitability, and demand forecasting will be displayed here.
          </Alert>
        </Tabs.Panel>

        <Tabs.Panel value="traffic">
          <Alert icon={<IconEye size={16} />} color="teal" mb="xl">
            Traffic analytics including source attribution, conversion funnels, and user behavior analysis will be displayed here.
          </Alert>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};

export default AnalyticsDashboard;
