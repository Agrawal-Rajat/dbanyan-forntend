import React from 'react';
import { Breadcrumbs, Anchor, Text, Group } from '@mantine/core';
import { IconHome, IconChevronRight } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfessionalBreadcrumbs = ({ 
  customItems = null,
  productName = null,
  categoryName = null 
}) => {
  const location = useLocation();
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        title: 'Home',
        href: '/',
        icon: <IconHome size={14} />
      }
    ];

    // Handle different routes
    if (pathSegments.includes('products')) {
      breadcrumbs.push({
        title: 'Products',
        href: '/products'
      });
      
      if (categoryName) {
        breadcrumbs.push({
          title: categoryName,
          href: `/products?category=${encodeURIComponent(categoryName)}`
        });
      }
      
      if (productName && pathSegments.length > 2) {
        breadcrumbs.push({
          title: productName,
          href: location.pathname,
          active: true
        });
      }
    } else if (pathSegments.includes('cart')) {
      breadcrumbs.push({
        title: 'Shopping Cart',
        href: '/cart',
        active: true
      });
    } else if (pathSegments.includes('checkout')) {
      breadcrumbs.push({
        title: 'Products',
        href: '/products'
      });
      breadcrumbs.push({
        title: 'Shopping Cart',
        href: '/cart'
      });
      breadcrumbs.push({
        title: 'Checkout',
        href: '/checkout',
        active: true
      });
    } else if (pathSegments.includes('profile')) {
      breadcrumbs.push({
        title: 'My Account',
        href: '/profile',
        active: true
      });
    } else if (pathSegments.includes('about')) {
      breadcrumbs.push({
        title: 'About Us',
        href: '/about',
        active: true
      });
    } else if (pathSegments.includes('moringa-guide')) {
      breadcrumbs.push({
        title: 'Moringa Guide',
        href: '/moringa-guide',
        active: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  const items = breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    const isActive = item.active || isLast;

    if (isActive) {
      return (
        <Group key={index} gap="xs">
          {item.icon}
          <Text 
            size="sm" 
            fw={500}
            c="dark"
            style={{ 
              maxWidth: '200px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {item.title}
          </Text>
        </Group>
      );
    }

    return (
      <Anchor
        key={index}
        component={Link}
        to={item.href}
        size="sm"
        c="dimmed"
        style={{
          textDecoration: 'none',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        <Group gap="xs">
          {item.icon}
          <span>{item.title}</span>
        </Group>
      </Anchor>
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Breadcrumbs
        separator={<IconChevronRight size={14} stroke={1.5} />}
        mb="md"
        style={{
          fontSize: '14px',
          padding: '8px 0'
        }}
      >
        {items}
      </Breadcrumbs>
    </motion.div>
  );
};

export default ProfessionalBreadcrumbs;
