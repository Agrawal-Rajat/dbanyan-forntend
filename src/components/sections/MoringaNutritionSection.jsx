// Dbanyan Group - Moringa Nutrition Highlights Section
// Modern nutrition showcase with visual cards and statistics

import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Box,
  SimpleGrid,
  ThemeIcon,
  Badge,
  Progress,
  RingProgress,
  Center
} from '@mantine/core';
import {
  IconLeaf,
  IconHeart,
  IconShield,
  IconBrain,
  IconBone,
  IconEye,
  IconDroplet,
  IconPlant2
} from '@tabler/icons-react';

const nutritionHighlights = [
  {
    icon: IconHeart,
    title: 'Vitamin C',
    value: '7x',
    comparison: 'More than Oranges',
    color: '#ef4444',
    percentage: 85
  },
  {
    icon: IconBone,
    title: 'Calcium',
    value: '4x',
    comparison: 'More than Milk',
    color: '#3b82f6',
    percentage: 92
  },
  {
    icon: IconDroplet,
    title: 'Potassium',
    value: '3x',
    comparison: 'More than Bananas',
    color: '#f59e0b',
    percentage: 78
  },
  {
    icon: IconShield,
    title: 'Iron',
    value: '3x',
    comparison: 'More than Spinach',
    color: '#10b981',
    percentage: 88
  },
  {
    icon: IconBrain,
    title: 'Protein',
    value: '2x',
    comparison: 'More than Yogurt',
    color: '#8b5cf6',
    percentage: 75
  },
  {
    icon: IconEye,
    title: 'Vitamin A',
    value: '4x',
    comparison: 'More than Carrots',
    color: '#f97316',
    percentage: 90
  }
];

const MoringaNutritionSection = () => {
  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container size="xl">
        <Stack gap={60} align="center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Badge
              size="lg"
              variant="light"
              color="green"
              mb={20}
              leftSection={<IconPlant2 size={16} />}
            >
              NUTRITION POWERHOUSE
            </Badge>
            <Title
              order={2}
              size="h1"
              mb={20}
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#059669',
                lineHeight: 1.2
              }}
            >
              Why Moringa Outshines Every Superfood
            </Title>
            <Text
              size="xl"
              c="dimmed"
              style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Compare Moringa's incredible nutritional density to common foods. 
              The numbers speak for themselves.
            </Text>
          </motion.div>

          {/* Nutrition Cards Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {nutritionHighlights.map((nutrient, idx) => (
              <motion.div
                key={nutrient.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card
                  radius="xl"
                  shadow="sm"
                  p={32}
                  style={{
                    background: 'white',
                    border: `2px solid ${nutrient.color}20`,
                    minHeight: 280,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Background gradient */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      background: `linear-gradient(135deg, ${nutrient.color}10 0%, ${nutrient.color}05 100%)`,
                      zIndex: 1
                    }}
                  />
                  
                  <Stack align="center" gap="md" style={{ position: 'relative', zIndex: 2 }}>
                    <ThemeIcon 
                      size={60} 
                      radius="xl" 
                      color={nutrient.color} 
                      variant="light"
                      style={{ backgroundColor: `${nutrient.color}15` }}
                    >
                      <nutrient.icon size={32} />
                    </ThemeIcon>

                    <Title 
                      order={3} 
                      style={{ color: nutrient.color, fontWeight: 700, fontSize: '2rem' }}
                    >
                      {nutrient.value}
                    </Title>

                    <Stack align="center" gap={4}>
                      <Title order={5} style={{ color: '#1f2937', textAlign: 'center' }}>
                        {nutrient.title}
                      </Title>
                      <Text size="sm" c="dimmed" ta="center">
                        {nutrient.comparison}
                      </Text>
                    </Stack>

                    <Center>
                      <RingProgress
                        size={80}
                        thickness={6}
                        sections={[
                          { value: nutrient.percentage, color: nutrient.color }
                        ]}
                        label={
                          <Text size="xs" ta="center" fw={700} style={{ color: nutrient.color }}>
                            {nutrient.percentage}%
                          </Text>
                        }
                      />
                    </Center>

                    <Badge 
                      variant="light" 
                      color="gray"
                      size="sm"
                      style={{ 
                        backgroundColor: `${nutrient.color}10`,
                        color: nutrient.color
                      }}
                    >
                      Nutritional Density
                    </Badge>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Bottom Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ width: '100%' }}
          >
            <Card
              p={40}
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap="md">
                <ThemeIcon size={60} radius="xl" color="white" variant="filled">
                  <IconLeaf size={30} />
                </ThemeIcon>
                <Title order={3}>92+ Essential Nutrients in Every Spoonful</Title>
                <Text size="lg" opacity={0.9} style={{ maxWidth: '600px' }}>
                  Moringa contains more nutrition per gram than any other plant on Earth. 
                  Just one teaspoon provides a complete spectrum of vitamins, minerals, and antioxidants.
                </Text>
                <Group gap="xl" mt="md">
                  <Stack align="center" gap={4}>
                    <Text size="xl" fw={700}>18</Text>
                    <Text size="sm" opacity={0.8}>Amino Acids</Text>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <Text size="xl" fw={700}>46</Text>
                    <Text size="sm" opacity={0.8}>Antioxidants</Text>
                  </Stack>
                  <Stack align="center" gap={4}>
                    <Text size="xl" fw={700}>25</Text>
                    <Text size="sm" opacity={0.8}>Vitamins & Minerals</Text>
                  </Stack>
                </Group>
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaNutritionSection;
