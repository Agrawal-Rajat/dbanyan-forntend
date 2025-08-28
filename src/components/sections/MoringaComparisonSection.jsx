// Dbanyan Group - Moringa Comparison Section
// Visual comparison showing Moringa's superiority over other superfoods

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Button,
  Center,
  Progress,
  RingProgress,
  Divider
} from '@mantine/core';
import {
  IconVs,
  IconCrown,
  IconTrophy,
  IconFlame,
  IconShield,
  IconHeart,
  IconBrain,
  IconLeaf,
  IconArrowRight,
  IconStar,
  IconCheck,
  IconX
} from '@tabler/icons-react';

const comparisons = [
  {
    category: 'Vitamin C',
    moringa: { value: '7x', color: '#059669' },
    competitor: { name: 'Orange', value: '1x', emoji: '🍊', color: '#f97316' },
    description: 'More immune-boosting vitamin C'
  },
  {
    category: 'Iron',
    moringa: { value: '25x', color: '#059669' },
    competitor: { name: 'Spinach', value: '1x', emoji: '🥬', color: '#22c55e' },
    description: 'Better for energy and blood health'
  },
  {
    category: 'Calcium',
    moringa: { value: '17x', color: '#059669' },
    competitor: { name: 'Milk', value: '1x', emoji: '🥛', color: '#3b82f6' },
    description: 'Stronger bones and teeth naturally'
  },
  {
    category: 'Protein',
    moringa: { value: '9x', color: '#059669' },
    competitor: { name: 'Yogurt', value: '1x', emoji: '🥣', color: '#8b5cf6' },
    description: 'Complete amino acid profile'
  },
  {
    category: 'Potassium',
    moringa: { value: '15x', color: '#059669' },
    competitor: { name: 'Banana', value: '1x', emoji: '🍌', color: '#f59e0b' },
    description: 'Better heart and muscle function'
  },
  {
    category: 'Vitamin A',
    moringa: { value: '10x', color: '#059669' },
    competitor: { name: 'Carrot', value: '1x', emoji: '🥕', color: '#ef4444' },
    description: 'Superior vision and skin health'
  }
];

const uniqueFeatures = [
  {
    icon: IconCrown,
    title: 'Complete Nutrition',
    description: 'All 9 essential amino acids in one plant',
    highlight: true
  },
  {
    icon: IconLeaf,
    title: '92 Nutrients',
    description: 'More nutrients than any other single food source',
    highlight: true
  },
  {
    icon: IconShield,
    title: '46 Antioxidants',
    description: 'Powerful anti-aging and cellular protection',
    highlight: false
  },
  {
    icon: IconHeart,
    title: 'Zero Side Effects',
    description: 'Pure, natural, and completely safe',
    highlight: false
  }
];

const MoringaComparisonSection = () => {
  const [hoveredComparison, setHoveredComparison] = useState(null);

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative VS symbols */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#059669',
          zIndex: 0
        }}
      >
        VS
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#059669',
          zIndex: 0
        }}
      >
        VS
      </motion.div>

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={70}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Badge
              size="lg"
              variant="gradient"
              gradient={{ from: 'green', to: 'teal' }}
              mb={20}
              leftSection={<IconTrophy size={16} />}
              style={{ height: 40, paddingLeft: 16, paddingRight: 16 }}
            >
              NUTRITIONAL CHAMPION
            </Badge>
            <Title
              order={2}
              size="2.5rem"
              mb={16}
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#065f46',
                lineHeight: 1.2
              }}
            >
              Moringa vs Other Superfoods
            </Title>
            <Text
              size="lg"
              style={{ 
                maxWidth: '700px', 
                margin: '0 auto', 
                lineHeight: 1.6,
                color: '#4b5563'
              }}
            >
              See how Moringa outperforms popular superfoods in key nutrients. 
              The comparison will surprise you!
            </Text>
          </motion.div>

          {/* Comparison Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {comparisons.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onHoverStart={() => setHoveredComparison(idx)}
                onHoverEnd={() => setHoveredComparison(null)}
              >
                <Card
                  radius="xl"
                  p={28}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(6, 95, 70, 0.1)',
                    minHeight: 300,
                    transition: 'all 0.3s ease',
                    transform: hoveredComparison === idx ? 'translateY(-8px) scale(1.02)' : 'none',
                    boxShadow: hoveredComparison === idx 
                      ? '0 20px 40px rgba(5, 150, 105, 0.2)' 
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <Stack gap="lg" style={{ height: '100%' }}>
                    {/* Category Header */}
                    <Center>
                      <Badge variant="light" color="green" size="md">
                        {comp.category}
                      </Badge>
                    </Center>

                    {/* VS Comparison */}
                    <Group justify="space-between" align="center">
                      {/* Moringa Side */}
                      <Stack align="center" gap="xs" style={{ flex: 1 }}>
                        <motion.div
                          animate={{
                            scale: hoveredComparison === idx ? 1.1 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ThemeIcon size={50} radius="xl" color="green" variant="filled">
                            <IconLeaf size={24} />
                          </ThemeIcon>
                        </motion.div>
                        <Text size="xs" fw={600} style={{ color: '#059669' }}>
                          MORINGA
                        </Text>
                        <Text size="xl" fw={800} style={{ color: comp.moringa.color }}>
                          {comp.moringa.value}
                        </Text>
                      </Stack>

                      {/* VS Icon */}
                      <motion.div
                        animate={{
                          rotate: hoveredComparison === idx ? 360 : 0
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <ThemeIcon size={36} radius="xl" variant="light" color="gray">
                          <IconVs size={18} />
                        </ThemeIcon>
                      </motion.div>

                      {/* Competitor Side */}
                      <Stack align="center" gap="xs" style={{ flex: 1 }}>
                        <Text size="2rem" style={{ lineHeight: 1 }}>
                          {comp.competitor.emoji}
                        </Text>
                        <Text size="xs" fw={600} style={{ color: '#6b7280' }}>
                          {comp.competitor.name.toUpperCase()}
                        </Text>
                        <Text size="xl" fw={800} style={{ color: comp.competitor.color }}>
                          {comp.competitor.value}
                        </Text>
                      </Stack>
                    </Group>

                    {/* Description */}
                    <Text size="sm" ta="center" style={{ color: '#374151', lineHeight: 1.5 }}>
                      {comp.description}
                    </Text>

                    {/* Winner Badge */}
                    <Center>
                      <Badge 
                        variant="gradient" 
                        gradient={{ from: 'green', to: 'teal' }}
                        leftSection={<IconCrown size={14} />}
                        size="sm"
                      >
                        Moringa Wins!
                      </Badge>
                    </Center>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Unique Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              radius="xl"
              p={40}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                border: '2px solid rgba(6, 95, 70, 0.1)'
              }}
            >
              <Stack gap="xl">
                <Title order={3} ta="center" style={{ color: '#065f46' }}>
                  What Makes Moringa Truly Unique
                </Title>
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg">
                  {uniqueFeatures.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Stack align="center" gap="md" style={{ textAlign: 'center' }}>
                        <ThemeIcon 
                          size={60} 
                          radius="xl" 
                          variant={feature.highlight ? "gradient" : "light"}
                          gradient={feature.highlight ? { from: 'green', to: 'teal' } : undefined}
                          color="green"
                        >
                          <feature.icon size={28} />
                        </ThemeIcon>
                        <Text size="sm" fw={700} style={{ color: '#065f46' }}>
                          {feature.title}
                        </Text>
                        <Text size="xs" style={{ color: '#6b7280', lineHeight: 1.4 }}>
                          {feature.description}
                        </Text>
                        {feature.highlight && (
                          <Badge variant="light" color="green" size="xs">
                            Exclusive to Moringa
                          </Badge>
                        )}
                      </Stack>
                    </motion.div>
                  ))}
                </SimpleGrid>
              </Stack>
            </Card>
          </motion.div>

          {/* Call to Action */}
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaComparisonSection;
