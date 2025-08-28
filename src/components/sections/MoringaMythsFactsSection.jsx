// Dbanyan Group - Moringa Myths & Facts Section
// Modern, educational, and visually consistent with the overall theme

import React, { useState } from 'react';
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
  Button
} from '@mantine/core';
import {
  IconLeaf,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconBulb
} from '@tabler/icons-react';

const mythsFacts = [
  {
    myth: 'Moringa is just another green powder.',
    fact: 'Moringa contains 92+ nutrients, 46 antioxidants, and all essential amino acids—making it a true superfood.'
  },
  {
    myth: 'You need a lot to see benefits.',
    fact: 'Just 1-2 teaspoons daily can support energy, immunity, and overall wellness.'
  },
  {
    myth: 'It tastes bitter and is hard to use.',
    fact: 'Moringa has a mild, earthy flavor and blends easily into smoothies, soups, and salads.'
  },
  {
    myth: 'Moringa is only for health enthusiasts.',
    fact: 'People of all ages and lifestyles can benefit from Moringa’s nutrition.'
  },
  {
    myth: 'It’s not backed by science.',
    fact: 'Over 25 clinical studies support Moringa’s health benefits.'
  }
];

const MoringaMythsFactsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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
              leftSection={<IconBulb size={16} />}
            >
              MORINGA MYTHS & FACTS
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
              Get the Truth About Moringa
            </Title>
            <Text
              size="xl"
              c="dimmed"
              style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Bust common myths and discover the real science behind Moringa’s superfood status.
            </Text>
          </motion.div>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" mt={32}>
            {mythsFacts.map((item, idx) => (
              <motion.div
                key={item.myth}
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
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: activeIndex === idx ? '0 8px 32px rgba(16,185,129,0.12)' : 'none',
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                >
                  <ThemeIcon size={48} radius="xl" color={activeIndex === idx ? '#059669' : '#a7f3d0'} variant="light" mb={16}>
                    {activeIndex === idx ? <IconCheck size={32} /> : <IconAlertTriangle size={32} />}
                  </ThemeIcon>
                  <Title order={4} style={{ color: '#059669', marginBottom: 8 }}>Myth</Title>
                  <Text size="md" c="dimmed" ta="center" mb={12}>
                    {item.myth}
                  </Text>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Title order={5} style={{ color: '#059669', marginBottom: 4 }}>Fact</Title>
                      <Text size="sm" ta="center" style={{ color: '#059669', fontWeight: 500 }}>
                        {item.fact}
                      </Text>
                    </motion.div>
                  )}
                  <Button
                    mt={16}
                    size="sm"
                    radius="xl"
                    variant="light"
                    color="green"
                    onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  >
                    {activeIndex === idx ? 'Hide Fact' : 'Show Fact'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaMythsFactsSection;
