// Dbanyan Group - Professional User Management System
// Amazon-style customer management with advanced analytics, segmentation, and bulk operations

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
  NumberInput,
  Switch,
  ScrollArea,
  Paper,
  Image,
  CopyButton,
  Anchor,
  RingProgress
} from '@mantine/core';
import {
  IconUser,
  IconUsers,
  IconEdit,
  IconEye,
  IconDots,
  IconSearch,
  IconFilter,
  IconDownload,
  IconCheck,
  IconX,
  IconClock,
  IconMail,
  IconPhone,
  IconMapPin,
  IconShoppingCart,
  IconRefresh,
  IconUserPlus,
  IconShield,
  IconBan,
  IconStar,
  IconTrendingUp,
  IconCalendar,
  IconActivity,
  IconCrown,
  IconHeart,
  IconGift,
  IconTarget,
  IconChartBar,
  IconFlag,
  IconDatabase,
  IconLock,
  IconLockOpen
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import GetAllUserData from '../../API_FILES/users_apis/GetAllUserData';
import CustomLoader from '../../Loader/CustomLoader';
import * as XLSX from 'xlsx';
import UserDetailsModal from './UserDetailsModal';
import OrderDetailsModal from './OrderDetailsModal';
import UserOrdersModal from './UsersOrderModal';

const UserManagement = () => {
  // Component state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [opened, setOpened] = useState(false);
     const [orderopened, setorderOpened] = useState(false);
      const [selectedOrder, setSelectedOrder] = useState(null);
  
    async function getallusersdetails(){
      setLoading(true)
      const res=await GetAllUserData()
      // console.log(res)
      if(res?.data){
        setUsers(res?.data)
        setLoading(false)
      }
      else{
        setLoading(false)
      }
    }

  useEffect(()=>{
    getallusersdetails()
  },[])
  const [userModalOpened, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);
  const [segmentModalOpened, { open: openSegmentModal, close: closeSegmentModal }] = useDisclosure(false);
  const [bulkModalOpened, { open: openBulkModal, close: closeBulkModal }] = useDisclosure(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  // Advanced filters and analytics
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [registrationDateFilter, setRegistrationDateFilter] = useState('all');
  const [orderCountFilter, setOrderCountFilter] = useState('all');
  const [spendingRangeFilter, setSpendingRangeFilter] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const itemsPerPage = 15;

  // Customer segmentation system (Amazon-style)
  const customerSegments = [
    {
      id: 'vip',
      label: 'VIP Customers',
      color: 'gold',
      icon: 'crown',
      criteria: 'Lifetime value > ₹50,000 or 20+ orders',
      benefits: ['Free shipping', 'Priority support', 'Exclusive products', 'Early access'],
      count: 12
    },
    {
      id: 'premium',
      label: 'Premium Customers',
      color: 'purple',
      icon: 'star',
      criteria: 'Lifetime value > ₹15,000 or 10+ orders',
      benefits: ['Free shipping on orders >₹1000', 'Priority support', 'Birthday discounts'],
      count: 34
    },
    {
      id: 'regular',
      label: 'Regular Customers',
      color: 'blue',
      icon: 'user',
      criteria: 'Lifetime value > ₹5,000 or 3+ orders',
      benefits: ['Standard shipping', 'Email support', 'Loyalty points'],
      count: 87
    },
    {
      id: 'new',
      label: 'New Customers',
      color: 'green',
      icon: 'user-plus',
      criteria: 'Registered within last 30 days',
      benefits: ['Welcome discount', 'Email support', 'Product recommendations'],
      count: 23
    },
    {
      id: 'at_risk',
      label: 'At-Risk Customers',
      color: 'orange',
      icon: 'alert-circle',
      criteria: 'No orders in last 90 days but previously active',
      benefits: ['Retention campaigns', 'Special offers', 'Re-engagement emails'],
      count: 19
    },
    {
      id: 'churned',
      label: 'Churned Customers',
      color: 'red',
      icon: 'user-x',
      criteria: 'No orders in last 180 days',
      benefits: ['Win-back campaigns', 'Deep discounts', 'Survey requests'],
      count: 8
    }
  ];

  // Customer analytics metrics
  const customerAnalytics = {
    overview: {
      totalCustomers: 248,
      newCustomersThisMonth: 23,
      returningCustomers: 156,
      averageLifetimeValue: 8750,
      averageOrderValue: 575,
      customerRetentionRate: 72.5,
      churnRate: 8.2
    },
    demographics: {
      ageGroups: [
        { range: '18-25', count: 45, percentage: 18.1 },
        { range: '26-35', count: 89, percentage: 35.9 },
        { range: '36-45', count: 67, percentage: 27.0 },
        { range: '46-55', count: 32, percentage: 12.9 },
        { range: '55+', count: 15, percentage: 6.0 }
      ],
      topCities: [
        { city: 'Mumbai', count: 56, percentage: 22.6 },
        { city: 'Delhi', count: 43, percentage: 17.3 },
        { city: 'Bangalore', count: 38, percentage: 15.3 },
        { city: 'Chennai', count: 29, percentage: 11.7 },
        { city: 'Hyderabad', count: 24, percentage: 9.7 }
      ]
    }
  };

  // User roles and permissions
  const userRoles = [
    { value: 'customer', label: 'Customer', color: 'blue', permissions: ['purchase', 'review'] },
    { value: 'admin', label: 'Admin', color: 'red', permissions: ['all'] },
    { value: 'moderator', label: 'Moderator', color: 'yellow', permissions: ['products', 'orders', 'customers'] },
    { value: 'support', label: 'Support', color: 'green', permissions: ['orders', 'customers'] },
    { value: 'viewer', label: 'Viewer', color: 'gray', permissions: ['read-only'] }
  ];

  // Bulk operations for customer management
  const bulkActions = [
    { value: 'send_email', label: 'Send Email Campaign', icon: 'mail', color: 'blue' },
    { value: 'update_segment', label: 'Update Segment', icon: 'users', color: 'purple' },
    { value: 'apply_discount', label: 'Apply Discount Code', icon: 'gift', color: 'green' },
    { value: 'export_data', label: 'Export Customer Data', icon: 'download', color: 'indigo' },
    { value: 'activate_users', label: 'Activate Users', icon: 'check', color: 'teal' },
    { value: 'deactivate_users', label: 'Deactivate Users', icon: 'ban', color: 'red' }
  ];
  const mockUsers = [
    {
      id: 'USER-001',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 9876543210',
      avatar: 'RK',
      role: 'customer',
      status: 'active',
      segment: 'premium',
      verified: true,
      total_orders: 24,
      total_spent: 45699,
      avg_order_value: 1904,
      last_order_date: '2024-01-15T10:30:00Z',
      created_at: '2023-06-15T08:00:00Z',
      last_login: '2024-01-15T14:20:00Z',
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        offers: true
      },
      loyalty_points: 2450,
      referrals: 3
    },
    {
      id: 'USER-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      avatar: 'PS',
      role: 'customer',
      status: 'active',
      segment: 'regular',
      verified: true,
      total_orders: 8,
      total_spent: 12400,
      avg_order_value: 1550,
      last_order_date: '2024-01-14T14:20:00Z',
      created_at: '2023-09-20T10:15:00Z',
      last_login: '2024-01-14T16:45:00Z',
      address: {
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India'
      },
      preferences: {
        newsletter: true,
        notifications: false,
        offers: true
      },
      loyalty_points: 620,
      referrals: 1
    },
    {
      id: 'USER-003',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 9876543212',
      avatar: 'AP',
      role: 'customer',
      status: 'active',
      segment: 'vip',
      verified: true,
      total_orders: 47,
      total_spent: 89750,
      avg_order_value: 1910,
      last_order_date: '2024-01-13T16:45:00Z',
      created_at: '2023-03-10T12:30:00Z',
      last_login: '2024-01-13T18:20:00Z',
      address: {
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India'
      },
      preferences: {
        newsletter: true,
        notifications: true,
        offers: true
      },
      loyalty_points: 8975,
      referrals: 12
    },
    {
      id: 'USER-004',
      name: 'Admin User',
      email: 'admin@dbanyangroup.com',
      phone: '+91 9876543213',
      avatar: 'AU',
      role: 'admin',
      status: 'active',
      segment: 'internal',
      verified: true,
      total_orders: 0,
      total_spent: 0,
      avg_order_value: 0,
      last_order_date: null,
      created_at: '2023-01-01T00:00:00Z',
      last_login: '2024-01-15T15:30:00Z',
      address: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      },
      preferences: {
        newsletter: false,
        notifications: true,
        offers: false
      },
      loyalty_points: 0,
      referrals: 0
    }
  ];



  const userStatuses = [
    { value: 'true', label: 'Active', color: 'green' },
    { value: 'false', label: 'Inactive', color: 'gray' },
    { value: 'suspended', label: 'Suspended', color: 'red' },
    { value: 'pending', label: 'Pending Verification', color: 'orange' }
  ];

  const userSegments = [
    { value: 'vip', label: 'VIP', color: 'gold', icon: IconCrown },
    { value: 'premium', label: 'Premium', color: 'violet', icon: IconStar },
    { value: 'regular', label: 'Regular', color: 'blue', icon: IconUser },
    { value: 'new', label: 'New Customer', color: 'green', icon: IconUserPlus },
    { value: 'at_risk', label: 'At Risk', color: 'orange', icon: IconTarget },
    { value: 'inactive', label: 'Inactive', color: 'gray', icon: IconClock }
  ];

  // Calculate user statistics
  const userStats = {
    total: users.length,
    active: users.filter(u => u.is_active === true).length,
    customers: users.filter(u => u.role === 'customer').length,
    admins: users.filter(u => u.role === 'admin').length,
    vip: users.filter(u => u.segment === 'vip').length,
    premium: users.filter(u => u.segment === 'premium').length,
    totalRevenue: users.reduce((sum, u) => sum + u.total_spent, 0),
    avgLifetimeValue: users.length > 0 ? users.reduce((sum, u) => sum + u.total_spent, 0) / users.filter(u => u.role === 'customer').length : 0
  };

  // Format currency
  const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user segment color and icon
  const getUserSegment = (segment) => userSegments.find(s => s.value === segment) || userSegments[2];

  // Filter users based on active tab and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.is_admin === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.is_active === statusFilter;
    const matchesSegment = segmentFilter === 'all' || user.city === segmentFilter;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'customers' && user.role === 'customer') ||
                      (activeTab === 'admins' && user.role === 'admin') ||
                      (activeTab === 'vip' && user.segment === 'vip') ||
                      (activeTab === 'inactive' && user.status !== 'active');
    
    return matchesSearch && matchesRole && matchesStatus && matchesSegment && matchesTab;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
const export_to_excel=(data,fileName)=>{
    if (!Array.isArray(data) || data.length === 0) {
    alert("No data to export");
    return;
  }
  setLoading(true)
      const worksheet=XLSX.utils.json_to_sheet(data)
      const workbook=XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1")
      XLSX.writeFile(workbook,fileName)
      setLoading(false)
    }

  return (
    <Box>
      {
        loading && <CustomLoader/>
      }
      {/* Page Header */}
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2} mb="xs">Customer Management</Title>
          <Text c="dimmed">Manage customers, analyze segments, and track customer lifetime value</Text>
        </div>
        
        <Group>
          <Button onClick={()=>export_to_excel(users,"users.xlsx")} leftSection={<IconDownload size={16} />} variant="light">
            Export Users
          </Button>
          {/* <Button leftSection={<IconUserPlus size={16} />} variant="light">
            Add User
          </Button> */}
          <Button leftSection={<IconRefresh size={16} />} onClick={() => getallusersdetails()}>
            Refresh
          </Button>
        </Group>
      </Group>

      {/* User Statistics */}
      <SimpleGrid cols={{ base: 2, sm: 4, lg: 6 }} mb="xl">
        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Users</Text>
              <Text size="xl" fw={700}>{userStats.total}</Text>
            </div>
            <IconUsers size={24} color="blue" />
          </Group>
        </Card>

        <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Active Users</Text>
              <Text size="xl" fw={700} c="green">{userStats.active}</Text>
            </div>
            <IconActivity size={24} color="green" />
          </Group>
        </Card>

        {/* <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>VIP Customers</Text>
              <Text size="xl" fw={700} c="gold">{userStats.vip}</Text>
            </div>
            <IconCrown size={24} color="gold" />
          </Group>
        </Card> */}

        {/* <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Premium Users</Text>
              <Text size="xl" fw={700} c="violet">{userStats.premium}</Text>
            </div>
            <IconStar size={24} color="violet" />
          </Group>
        </Card> */}

        {/* <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Revenue</Text>
              <Text size="xl" fw={700} c="green">{formatCurrency(userStats.totalRevenue)}</Text>
            </div>
            <IconTrendingUp size={24} color="green" />
          </Group>
        </Card> */}

        {/* <Card shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Avg LTV</Text>
              <Text size="xl" fw={700}>{formatCurrency(userStats.avgLifetimeValue)}</Text>
            </div>
            <IconChartBar size={24} color="blue" />
          </Group>
        </Card> */}
      </SimpleGrid>

      {/* User Tabs and Filters */}
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
          <Tabs.List>
            <Tabs.Tab value="all" leftSection={<IconUsers size={16} />}>
              All Users ({userStats.total})
            </Tabs.Tab>
            {/* <Tabs.Tab value="customers" leftSection={<IconUser size={16} />}>
              Customers ({userStats.customers})
            </Tabs.Tab>
            <Tabs.Tab value="vip" leftSection={<IconCrown size={16} />}>
              VIP ({userStats.vip})
            </Tabs.Tab>
            <Tabs.Tab value="admins" leftSection={<IconShield size={16} />}>
              Admins ({userStats.admins})
            </Tabs.Tab>
            <Tabs.Tab value="inactive" leftSection={<IconClock size={16} />}>
              Inactive
            </Tabs.Tab> */}
          </Tabs.List>
        </Tabs>

        {/* Search and Filters */}
        <Group mb="lg">
          <TextInput
            placeholder="Search users by name or email..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            style={{ flex: 1 }}
          />
          {/* <Select
            placeholder="Role"
            data={[
              { value: 'all', label: 'All Roles' },
              ...userRoles.map(role => ({ value: role.value, label: role.label }))
            ]}
            value={roleFilter}
            onChange={setRoleFilter}
          /> */}
          {/* <Select
            placeholder="Status"
            data={[
              { value: 'all', label: 'All Status' },
              ...userStatuses.map(status => ({ value: status.value, label: status.label }))
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Select
            placeholder="Segment"
            data={[
              { value: 'all', label: 'All Segments' },
              ...userSegments.map(segment => ({ value: segment.value, label: segment.label }))
            ]}
            value={segmentFilter}
            onChange={setSegmentFilter}
          /> */}
        </Group>

        {/* Users Table */}
        <Title order={4} mb="md">Users ({filteredUsers.length})</Title>
        {filteredUsers.length === 0 ? (
          <Center py="xl">
            <Stack align="center">
              <IconUsers size={48} color="gray" />
              <Text size="lg" fw={500} c="dimmed">No users found</Text>
              <Text size="sm" c="dimmed">
                Try adjusting your filters or search terms
              </Text>
            </Stack>
          </Center>
        ) : (
          <>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User</Table.Th>
                  {/* <Table.Th>Role & Segment</Table.Th> */}
                  {/* <Table.Th>Orders & Spending</Table.Th> */}
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Last Activity</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {paginatedUsers?.map((user, index) => (
                  <Table.Tr
                    key={user.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar size="md" radius="xl" color="blue">
                          {user.avatar}
                        </Avatar>
                        <div>
                          <Group gap="xs">
                            <Text size="sm" fw={500}>{user.name}</Text>
                            {user.verified && (
                              <Tooltip label="Verified User">
                                <IconCheck size={14} color="green" />
                              </Tooltip>
                            )}
                          </Group>
                          <Text size="xs" c="dimmed">{user.email}</Text>
                          <Text size="xs" c="dimmed">{user.mobile_number}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    {/* <Table.Td>
                      <Stack gap="xs">
                        <Badge
                          color={userRoles.find(r => r.value === user.role)?.color || 'gray'}
                          variant="light"
                          size="sm"
                        >
                          {userRoles.find(r => r.value === user.role)?.label || user.role}
                        </Badge>
                        {user.role === 'customer' && (
                          <Badge
                            color={getUserSegment(user.segment).color}
                            variant="light"
                            size="xs"
                          >
                            {getUserSegment(user.segment).label}
                          </Badge>
                        )}
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      {user.role === 'customer' ? (
                        <div>
                          <Text size="sm" fw={500}>{user.total_orders} orders</Text>
                          <Text size="sm" fw={600} c="green">{formatCurrency(user.total_spent)}</Text>
                          <Text size="xs" c="dimmed">Avg: {formatCurrency(user.avg_order_value)}</Text>
                        </div>
                      ) : (
                        <Text size="sm" c="dimmed">Admin User</Text>
                      )}
                    </Table.Td> */}
                    <Table.Td>
                      <Badge
                        color={userStatuses.find(s => s.value === String(user.is_active))?.color || 'gray'}
                        variant="light"
                        size="sm"
                      >
                        {userStatuses.find(s => s.value === String(user.is_active))?.label || user.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="xs" c="dimmed">Login: {formatDate(user.updated_at)}</Text>
                        {user.last_order_date && (
                          <Text size="xs" c="dimmed">Order: {formatDate(user.last_order_date)}</Text>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View Profile">
                          <ActionIcon variant="light" size="sm">
                            <IconEye onClick={() => {
          setSelectedUser(user);
          setOpened(true);
        }} size={14} />
                          </ActionIcon>
                        </Tooltip>
                         {selectedUser && (
                                <UserDetailsModal
                                  opened={opened}
                                  onClose={() => setOpened(false)}
                                  user={selectedUser}
                                  
                                />
                              )}
                        {/* <Tooltip label="Edit User">
                          <ActionIcon variant="light" size="sm">
                            <IconEdit size={14} />
                          </ActionIcon>
                        </Tooltip> */}
                        <Menu shadow="md" width={180}>
                          <Menu.Target>
                            <ActionIcon variant="light" size="sm">
                              <IconDots size={14} />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            {/* <Menu.Item leftSection={<IconMail size={14} />}>
                              Send Email
                            </Menu.Item> */}
                            <Menu.Item  leftSection={<IconShoppingCart size={14} />}>
                              <h1 onClick={() => {
          setSelectedOrder(user);
          setorderOpened(true);
        }}>View Orders</h1>
                            </Menu.Item>
                           
                            {/* <Menu.Item leftSection={<IconGift size={14} />}>
                              Send Reward
                            </Menu.Item> */}
                            <Menu.Divider />
                            {/* <Menu.Item 
                              leftSection={user.status === 'active' ? <IconLock size={14} /> : <IconLockOpen size={14} />}
                              color={user.status === 'active' ? 'red' : 'green'}
                            >
                              {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                            </Menu.Item> */}
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {/* Pagination */}
             {orderopened && (
                                    <UserOrdersModal
                                      opened={orderopened}
                                      onClose={() => setorderOpened(false)}
                                      user={selectedOrder}
                                      
                                    />
                                  )}
            {totalPages > 1 && (
              <Group justify="center" mt="lg">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={totalPages}
                />
              </Group>
            )}
          </>
        )}
      </Card>
    </Box>
  );
};

export default UserManagement;
