// Dbanyan Group - Moringa Science & Research Section
// Scientific credibility with engaging visuals for landing page

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
  Progress,
  Center,
  Divider,
  List
} from '@mantine/core';
import {
  IconMicroscope,
  IconFlask,
  IconCertificate,
  IconTrendingUp,
  IconLeaf,
  IconDna,
  IconAtom,
  IconCheck,
  IconStar,
  IconShield
} from '@tabler/icons-react';

const scientificFacts = [
  {
    icon: IconDna,
    title: '92 Nutrients',
    subtitle: 'Complete Nutrition Profile',
    description: 'Contains all essential amino acids, vitamins, and minerals your body needs',
    percentage: 100,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'
  },
  {
    icon: IconShield,
    title: '46 Antioxidants',
    subtitle: 'Cellular Protection',
    description: 'Powerful compounds that fight free radicals and support healthy aging',
    percentage: 95,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
  },
  {
    icon: IconAtom,
    title: '36 Anti-inflammatory',
    subtitle: 'Natural Compounds',
    description: 'Bioactive molecules that help reduce inflammation naturally',
    percentage: 88,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
  },
  {
    icon: IconFlask,
    title: '25 Vitamins & Minerals',
    subtitle: 'Essential Micronutrients',
    description: 'Higher concentration than most fruits and vegetables combined',
    percentage: 92,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)'
  }
];

const researchHighlights = [
  {
    title: 'Clinical Studies',
    count: '300+',
    description: 'Peer-reviewed research papers'
  },
  {
    title: 'Universities',
    count: '50+',
    description: 'Leading institutions studying Moringa'
  },
  {
    title: 'Years of Research',
    count: '20+',
    description: 'Ongoing scientific investigation'
  }
];

const MoringaScienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Scientific background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M20,50 Q30,30 40,50 T60,50 T80,50\' stroke=\'%23059669\' stroke-width=\'0.5\' fill=\'none\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'8\' stroke=\'%23059669\' stroke-width=\'0.5\' fill=\'none\'/%3E%3Cpath d=\'M70,20 L75,30 L65,30 Z\' fill=\'%23059669\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
          zIndex: 0
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap={60}>
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
              leftSection={<IconMicroscope size={16} />}
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                height: 40
              }}
            >
              SCIENCE-BACKED NUTRITION
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
              The Science Behind the Superfood
            </Title>
            <Text
              size="lg"
              style={{ 
                maxWidth: '600px', 
                margin: '0 auto', 
                lineHeight: 1.6,
                color: '#4b5563'
              }}
            >
              Backed by decades of research, Moringa's incredible nutrition profile 
              is scientifically proven and laboratory verified.
            </Text>
          </motion.div>

          {/* Research Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card
              radius="xl"
              p={40}
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Group justify="space-around" gap="xl">
                {researchHighlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Stack align="center" gap={8}>
                      <Text size="2.5rem" fw={800} style={{ lineHeight: 1 }}>
                        {item.count}
                      </Text>
                      <Text size="md" fw={600} opacity={0.9}>
                        {item.title}
                      </Text>
                      <Text size="sm" opacity={0.8}>
                        {item.description}
                      </Text>
                    </Stack>
                  </motion.div>
                ))}
              </Group>
            </Card>
          </motion.div>

          {/* Scientific Facts Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            {scientificFacts.map((fact, idx) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onHoverStart={() => setHoveredCard(idx)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  radius="xl"
                  p={32}
                  style={{
                    background: fact.gradient,
                    border: `2px solid ${fact.color}20`,
                    minHeight: 280,
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === idx ? 'translateY(-8px)' : 'none',
                    boxShadow: hoveredCard === idx 
                      ? `0 20px 40px ${fact.color}30` 
                      : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <Stack gap="lg" style={{ height: '100%' }}>
                    <Group gap="md">
                      <motion.div
                        animate={{
                          scale: hoveredCard === idx ? 1.1 : 1,
                          rotate: hoveredCard === idx ? 5 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ThemeIcon 
                          size={60} 
                          radius="xl" 
                          color={fact.color}
                          variant="filled"
                          style={{
                            boxShadow: `0 8px 24px ${fact.color}40`
                          }}
                        >
                          <fact.icon size={30} />
                        </ThemeIcon>
                      </motion.div>
                      <Stack gap={4} style={{ flex: 1 }}>
                        <Text 
                          size="xl" 
                          fw={700} 
                          style={{ color: fact.color }}
                        >
                          {fact.title}
                        </Text>
                        <Text size="sm" fw={600} style={{ color: '#374151' }}>
                          {fact.subtitle}
                        </Text>
                      </Stack>
                    </Group>
                    
                    <Text size="sm" style={{ color: '#6b7280', lineHeight: 1.5, flex: 1 }}>
                      {fact.description}
                    </Text>

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="xs" fw={600} style={{ color: fact.color }}>
                          Nutritional Density
                        </Text>
                        <Text size="xs" fw={600} style={{ color: fact.color }}>
                          {fact.percentage}%
                        </Text>
                      </Group>
                      <Progress 
                        value={fact.percentage} 
                        color={fact.color}
                        radius="xl"
                        size="sm"
                        style={{
                          backgroundColor: `${fact.color}20`
                        }}
                      />
                    </Stack>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Certification & Quality */}
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
                background: 'rgba(255, 255, 255, 0.8)',
                border: '2px solid rgba(6, 95, 70, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Group align="center" gap="xl">
                <ThemeIcon size={80} radius="xl" variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                  <IconCertificate size={40} />
                </ThemeIcon>
                <Stack gap="md" style={{ flex: 1 }}>
                  <Title order={3} style={{ color: '#065f46' }}>
                    Laboratory Tested & Certified
                  </Title>
                  <Text style={{ color: '#374151', lineHeight: 1.6 }}>
                    Every batch is rigorously tested for purity, potency, and safety. 
                    Our Moringa meets international quality standards and is certified 
                    by leading laboratories worldwide.
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon size={18} radius="xl" color="green">
                        <IconCheck size={12} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item style={{ color: '#374151' }}>Heavy metals tested</List.Item>
                    <List.Item style={{ color: '#374151' }}>Microbiological safety verified</List.Item>
                    <List.Item style={{ color: '#374151' }}>Nutritional content guaranteed</List.Item>
                  </List>
                </Stack>
              </Group>
            </Card>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaScienceSection;
