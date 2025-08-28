// Dbanyan Group - Moringa Daily Life Section
// Modern, relatable, and visually consistent with the overall theme

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
  Badge
} from '@mantine/core';
import {
  IconLeaf,
  IconCoffee,
  IconSalad,
  IconBottle,
  IconSun,
  IconMoodSmile,
  IconRun,
  IconPlant
} from '@tabler/icons-react';

const dailyUses = [
  {
    icon: IconCoffee,
    title: 'Morning Boost',
    description: 'Add Moringa powder to your morning smoothie or coffee for a natural energy lift.'
  },
  {
    icon: IconSalad,
    title: 'Nutritious Meals',
    description: 'Sprinkle Moringa on salads, soups, or cooked dishes for extra vitamins and minerals.'
  },
  {
    icon: IconBottle,
    title: 'Hydration',
    description: 'Mix Moringa with water or juice for a refreshing, antioxidant-rich drink.'
  },
  {
    icon: IconSun,
    title: 'Sunshine Wellness',
    description: 'Support your immune system and skin health with daily Moringa intake.'
  },
  {
    icon: IconMoodSmile,
    title: 'Mood & Focus',
    description: 'Experience improved mood and mental clarity with regular use.'
  },
  {
    icon: IconRun,
    title: 'Active Lifestyle',
    description: 'Fuel your workouts and recovery with Moringa’s plant-based protein.'
  }
];

const MoringaDailyLifeSection = () => (
  <Box
    py={100}
    style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Container size="xl">
      <Stack gap={40} align="center">
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
            leftSection={<IconPlant size={16} />}
          >
            MORINGA IN DAILY LIFE
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
            Simple Ways to Enjoy Moringa Every Day
          </Title>
          <Text
            size="xl"
            c="dimmed"
            style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
          >
            Discover how easy it is to add Moringa to your daily routine for better energy, nutrition, and wellness.
          </Text>
        </motion.div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" mt={32}>
          {dailyUses.map((use, idx) => (
            <motion.div
              key={use.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                radius="xl"
                shadow="md"
                p={32}
                style={{
                  background: 'white',
                  border: '1px solid #a7f3d0',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ThemeIcon size={48} radius="xl" color="#059669" variant="light" mb={16}>
                  {React.createElement(use.icon, { size: 32 })}
                </ThemeIcon>
                <Title order={4} style={{ color: '#059669', marginBottom: 8 }}>{use.title}</Title>
                <Text size="md" c="dimmed" ta="center">
                  {use.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  </Box>
);

export default MoringaDailyLifeSection;
