import React from 'react';
import { Paper, Stack, Title, Text, Group, Badge, List, ThemeIcon } from '@mantine/core';
import { 
  IconCheck, 
  IconStar, 
  IconShoppingCart, 
  IconHeart, 
  IconGitCompare,
  IconShield,
  IconTruck,
  IconSearch,
  IconFilter
} from '@tabler/icons-react';

const AmazonStyleFeatures = () => {
  const features = [
    {
      icon: IconSearch,
      title: "Smart Search",
      description: "Intelligent search with autocomplete and suggestions",
      status: "implemented"
    },
    {
      icon: IconFilter,
      title: "Advanced Filtering",
      description: "Professional filter sidebar with price, category, and rating filters",
      status: "implemented"
    },
    {
      icon: IconStar,
      title: "Reviews & Ratings",
      description: "Comprehensive review system with photos and verification",
      status: "implemented"
    },
    {
      icon: IconGitCompare,
      title: "Product Comparison",
      description: "Side-by-side comparison of up to 3 products",
      status: "implemented"
    },
    {
      icon: IconShoppingCart,
      title: "Enhanced Cart",
      description: "Save for later, promo codes, and professional checkout",
      status: "implemented"
    },
    {
      icon: IconHeart,
      title: "Wishlist",
      description: "Save products for future purchase",
      status: "implemented"
    },
    {
      icon: IconShield,
      title: "Trust Signals",
      description: "Security badges and trust indicators",
      status: "implemented"
    },
    {
      icon: IconTruck,
      title: "Delivery Information",
      description: "Clear delivery options and free shipping indicators",
      status: "implemented"
    }
  ];

  return (
    <Paper withBorder p="lg" radius="md">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3} c="green">Amazon-Style Features Implemented</Title>
          <Badge color="green" size="lg">✓ All Features Active</Badge>
        </Group>
        
        <Text c="dimmed">
          Your e-commerce platform now includes professional Amazon-inspired features for an enhanced user experience.
        </Text>

        <List
          spacing="md"
          size="sm"
          center
          icon={
            <ThemeIcon color="green" size={20} radius="xl">
              <IconCheck size={12} />
            </ThemeIcon>
          }
        >
          {features.map((feature, index) => (
            <List.Item key={index}>
              <Group gap="md">
                <feature.icon size={16} color="green" />
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{feature.title}</Text>
                  <Text size="sm" c="dimmed">{feature.description}</Text>
                </div>
                <Badge color="green" size="sm" variant="light">
                  {feature.status}
                </Badge>
              </Group>
            </List.Item>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};

export default AmazonStyleFeatures;
