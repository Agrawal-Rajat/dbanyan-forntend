// Dbanyan Group - Professional Admin Layout
// Amazon-style admin dashboard layout with hierarchical navigation

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Text,
  Group,
  Stack,
  NavLink,
  ActionIcon,
  Avatar,
  Menu,
  Button,
  Badge,
  Box,
  Breadcrumbs,
  Anchor,
  Title,
  Divider,
  ScrollArea,
  Indicator
} from '@mantine/core';
import {
  IconDashboard,
  IconPackage,
  IconShoppingCart,
  IconUsers,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconBell,
  IconSearch,
  IconChevronRight,
  IconPlus,
  IconEdit,
  IconEye,
  IconArchive,
  IconTruck,
  IconClock,
  IconCheck,
  IconX,
  IconRefresh
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const AdminLayout = ({ activeView, onViewChange, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarOpened, setNavbarOpened] = useState(true);

  // Professional navigation structure following Amazon's pattern
  const navigationConfig = {
    primary: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: IconDashboard,
        path: '/admin',
        badge: null
      },
      {
        id: 'products',
        label: 'Products',
        icon: IconPackage,
        path: '/admin/products',
        badge: '4',
        children: [
          { id: 'all-products', label: 'All Products', path: '/admin/products' },
          { id: 'add-product', label: 'Add New Product', path: '/admin/products/add' },
          { id: 'categories', label: 'Categories', path: '/admin/products/categories' },
          { id: 'inventory', label: 'Inventory', path: '/admin/products/inventory' }
        ]
      },
      {
        id: 'orders',
        label: 'Orders',
        icon: IconShoppingCart,
        path: '/admin/orders',
        badge: '12',
        children: [
          { id: 'all-orders', label: 'All Orders', path: '/admin/orders' },
          { id: 'pending', label: 'Pending Orders', path: '/admin/orders/pending', badge: '5' },
          { id: 'processing', label: 'Processing', path: '/admin/orders/processing', badge: '3' },
          { id: 'shipped', label: 'Shipped', path: '/admin/orders/shipped', badge: '2' },
          { id: 'completed', label: 'Completed', path: '/admin/orders/completed' }
        ]
      },
      {
        id: 'customers',
        label: 'Customers',
        icon: IconUsers,
        path: '/admin/customers',
        badge: '248',
        children: [
          { id: 'all-customers', label: 'All Customers', path: '/admin/customers' },
          { id: 'new-customers', label: 'New Customers', path: '/admin/customers/new' },
          { id: 'vip-customers', label: 'VIP Customers', path: '/admin/customers/vip' },
          { id: 'customer-segments', label: 'Segments', path: '/admin/customers/segments' }
        ]
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: IconChartBar,
        path: '/admin/analytics',
        children: [
          { id: 'overview', label: 'Overview', path: '/admin/analytics' },
          { id: 'sales-reports', label: 'Sales Reports', path: '/admin/analytics/sales' },
          { id: 'product-reports', label: 'Product Reports', path: '/admin/analytics/products' },
          { id: 'customer-reports', label: 'Customer Reports', path: '/admin/analytics/customers' }
        ]
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: IconSettings,
        path: '/admin/settings',
        children: [
          { id: 'general', label: 'General Settings', path: '/admin/settings' },
          { id: 'payment', label: 'Payment Settings', path: '/admin/settings/payment' },
          { id: 'shipping', label: 'Shipping Settings', path: '/admin/settings/shipping' },
          { id: 'notifications', label: 'Notifications', path: '/admin/settings/notifications' }
        ]
      }
    ]
  };

  // Generate breadcrumbs for current view
  const generateBreadcrumbs = () => {
    const breadcrumbs = [{ title: 'Admin', href: '#' }];
    
    switch (activeView) {
      case 'dashboard':
        breadcrumbs.push({ title: 'Dashboard', href: '#' });
        break;
      case 'products':
        breadcrumbs.push({ title: 'Products', href: '#' });
        break;
      case 'orders':
        breadcrumbs.push({ title: 'Orders', href: '#' });
        break;
      case 'customers':
        breadcrumbs.push({ title: 'Customers', href: '#' });
        break;
      case 'analytics':
        breadcrumbs.push({ title: 'Analytics', href: '#' });
        break;
      default:
        breadcrumbs.push({ title: 'Dashboard', href: '#' });
    }

    return breadcrumbs;
  };

  // Check if nav item is active
  const isActiveNav = (viewId) => {
    return activeView === viewId;
  };

  // Handle navigation
  const handleNavigation = (viewId) => {
    if (onViewChange) {
      onViewChange(viewId);
    }
  };

  // Render navigation items
  const renderNavItems = (items, level = 0) => {
    return items.map((item) => {
      const Icon = item.icon;
      const isActive = isActiveNav(item.id);
      
      return (
        <div key={item.id}>
          <NavLink
            label={
              <Group justify="space-between" grow>
                <Group gap="sm">
                  {Icon && <Icon size={18} />}
                  <Text size="sm" fw={500}>{item.label}</Text>
                </Group>
                {item.badge && (
                  <Badge size="sm" variant="filled" color={isActive ? "white" : "blue"}>
                    {item.badge}
                  </Badge>
                )}
              </Group>
            }
            active={isActive}
            onClick={() => handleNavigation(item.id)}
            style={{
              borderRadius: 8,
              marginBottom: 4,
              paddingLeft: level * 20 + 12
            }}
          />
          
          {/* Render children if expanded and has children */}
          {item.children && isActive && (
            <Stack gap={2} ml={20} mt={4} mb={8}>
              {item.children.map((child) => (
                <NavLink
                  key={child.id}
                  label={
                    <Group justify="space-between" grow>
                      <Text size="sm">{child.label}</Text>
                      {child.badge && (
                        <Badge size="xs" variant="light">
                          {child.badge}
                        </Badge>
                      )}
                    </Group>
                  }
                  active={activeView === child.id}
                  onClick={() => handleNavigation(child.id)}
                  style={{ borderRadius: 6, fontSize: '0.875rem' }}
                />
              ))}
            </Stack>
          )}
        </div>
      );
    });
  };

  return (
    <AppShell
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !navbarOpened } }}
      header={{ height: 70 }}
      padding="md"
    >
      {/* Professional Header */}
      <AppShell.Header height={70} p="md" style={{ borderBottom: '1px solid #e9ecef' }}>
        <Group justify="space-between" h="100%">
          <Group>
            <ActionIcon
              variant="subtle"
              onClick={() => setNavbarOpened(!navbarOpened)}
              hiddenFrom="sm"
            >
              <IconDashboard size={18} />
            </ActionIcon>
            <Title order={3} c="blue.7">
              Dbanyan Admin
            </Title>
          </Group>

          <Group gap="md">
            {/* Search */}
            <ActionIcon variant="subtle" size="lg">
              <IconSearch size={18} />
            </ActionIcon>

            {/* Notifications */}
            <Indicator inline label="3" size={16}>
              <ActionIcon variant="subtle" size="lg">
                <IconBell size={18} />
              </ActionIcon>
            </Indicator>

            {/* Admin Profile Menu */}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Group style={{ cursor: 'pointer' }}>
                  <Avatar color="blue" radius="xl" size="sm">
                    A
                  </Avatar>
                  <Stack gap={0}>
                    <Text size="sm" fw={500}>Admin User</Text>
                    <Text size="xs" c="dimmed">Super Admin</Text>
                  </Stack>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  leftSection={<IconLogout size={14} />}
                  color="red"
                  onClick={() => navigate('/')}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Professional Sidebar Navigation */}
      <AppShell.Navbar width={{ base: 280 }} p="md">
        <ScrollArea style={{ height: 'calc(100vh - 120px)' }}>
          {/* Quick Actions */}
          <Stack gap="sm" mb="xl">
            <Text size="xs" tt="uppercase" fw={700} c="dimmed">
              Quick Actions
            </Text>
            <Group>
              <Button
                leftSection={<IconPlus size={16} />}
                size="xs"
                variant="light"
                onClick={() => handleNavigation('products')}
              >
                Add Product
              </Button>
              <Button
                leftSection={<IconEye size={16} />}
                size="xs"
                variant="outline"
                onClick={() => handleNavigation('orders')}
              >
                View Orders
              </Button>
            </Group>
          </Stack>

          <Divider mb="md" />

          {/* Main Navigation */}
          <Stack gap="xs">
            <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="sm">
              Navigation
            </Text>
            {renderNavItems(navigationConfig.primary)}
          </Stack>
        </ScrollArea>
      </AppShell.Navbar>

      {/* Main Content Area */}
      <AppShell.Main>
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Breadcrumbs separator={<IconChevronRight size={14} />} mb="md">
            {generateBreadcrumbs().map((crumb, index) => (
              <Anchor
                key={index}
                onClick={() => index === 0 ? handleNavigation('dashboard') : null}
                size="sm"
                style={{ cursor: index === 0 ? 'pointer' : 'default' }}
              >
                {crumb.title}
              </Anchor>
            ))}
          </Breadcrumbs>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminLayout;
