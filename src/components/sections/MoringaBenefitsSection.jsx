// Dbanyan Group - Moringa Benefits Showcase Section
// Modern benefits presentation with animated icons and clean design

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
  Divider
} from '@mantine/core';
import {
  IconSparkles,
  IconHeart,
  IconShield,
  IconBrain,
  IconBolt,
  IconGrowth,
  IconSun,
  IconLeaf,
  IconArrowRight,
  IconCheck
} from '@tabler/icons-react';

const benefits = [
  {
  icon: IconBolt,
    title: 'Natural Energy Boost',
    description: 'Sustained energy without caffeine crashes',
    details: [
      'Provides steady energy throughout the day',
      'Rich in B-vitamins for metabolism',
      'Natural alternative to energy drinks'
    ],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
  },
  {
    icon: IconShield,
    title: 'Immune System Support',
    description: 'Strengthen your body\'s natural defenses',
    details: [
      'High in Vitamin C and antioxidants',
      'Anti-inflammatory properties',
      'Supports overall wellness'
    ],
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
  },
  {
    icon: IconHeart,
    title: 'Heart Health',
    description: 'Support cardiovascular wellness naturally',
    details: [
      'May help maintain healthy cholesterol',
      'Rich in heart-healthy nutrients',
      'Supports circulation'
    ],
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
  },
  {
    icon: IconBrain,
    title: 'Mental Clarity',
    description: 'Enhanced focus and cognitive function',
    details: [
      'Supports brain health with omega fatty acids',
      'May improve concentration',
      'Natural nootropic properties'
    ],
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)'
  },
  {
    icon: IconGrowth,
    title: 'Healthy Aging',
    description: 'Antioxidants for cellular protection',
    details: [
      'Fights free radical damage',
      '46+ powerful antioxidants',
      'Supports skin and cellular health'
    ],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
  },
  {
    icon: IconSun,
    title: 'Radiant Skin',
    description: 'Natural glow from within',
    details: [
      'Vitamin A for skin health',
      'Collagen-supporting nutrients',
      'Natural beauty enhancement'
    ],
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)'
  }
];

const MoringaBenefitsSection = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(null);

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          position: 'absolute',
          top: '-120px',
          left: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #059669 0%, #10b981 80%)',
          zIndex: 0
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-60px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 60% 60%, #8b5cf6 0%, #f59e0b 80%)',
          zIndex: 0
        }}
      />
      <Container size="xl">
        <Stack gap={60} align="center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}
          >
            <Badge
              size="lg"
              variant="light"
              color="green"
              mb={20}
              leftSection={<IconSparkles size={16} />}
            >
              WELLNESS BENEFITS
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
              Transform Your Health with Moringa
            </Title>
            <Text
              size="xl"
              c="dimmed"
              style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Discover how this ancient superfood can enhance every aspect of your wellness journey.
            </Text>
            <Text
              size="lg"
              mt={10}
              style={{ fontStyle: 'italic', color: '#059669', opacity: 0.8 }}
            >
              "Nature itself is the best physician." – Hippocrates
            </Text>
          </motion.div>

          {/* Benefits Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" style={{ width: '100%' }}>
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card
                  radius="xl"
                  shadow={selectedBenefit?.title === benefit.title ? "lg" : "sm"}
                  p={30}
                  style={{
                    background: benefit.gradient,
                    border: '1px solid rgba(255,255,255,0.3)',
                    minHeight: 300,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: selectedBenefit?.title === benefit.title ? 'translateY(-8px) scale(1.03)' : 'none',
                    zIndex: selectedBenefit?.title === benefit.title ? 2 : 1
                  }}
                  onClick={() => setSelectedBenefit(selectedBenefit?.title === benefit.title ? null : benefit)}
                >
                  <Stack align="center" gap="md" style={{ height: '100%' }}>
                    <motion.div
                      animate={{
                        scale: selectedBenefit?.title === benefit.title ? 1.1 : 1,
                        rotate: selectedBenefit?.title === benefit.title ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThemeIcon 
                        size={70} 
                        radius="xl" 
                        color={benefit.color}
                        variant="filled"
                        style={{ 
                          backgroundColor: benefit.color,
                          boxShadow: `0 8px 32px ${benefit.color}40`
                        }}
                      >
                        <benefit.icon size={36} />
                      </ThemeIcon>
                    </motion.div>

                    <Stack align="center" gap={8} style={{ flex: 1 }}>
                      <Title 
                        order={4} 
                        style={{ 
                          color: '#1f2937', 
                          textAlign: 'center',
                          fontWeight: 600
                        }}
                      >
                        {benefit.title}
                      </Title>
                      <Text size="sm" c="dimmed" ta="center" style={{ lineHeight: 1.5 }}>
                        {benefit.description}
                      </Text>
                    </Stack>

                    <AnimatePresence>
                      {selectedBenefit?.title === benefit.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ width: '100%' }}
                        >
                          <Divider mb="sm" />
                          <Stack gap={8}>
                            {benefit.details.map((detail, detailIdx) => (
                              <Group key={detailIdx} gap={8} align="flex-start">
                                <IconCheck size={14} style={{ color: benefit.color, marginTop: 2, flexShrink: 0 }} />
                                <Text size="xs" style={{ color: '#374151', lineHeight: 1.4 }}>
                                  {detail}
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ textAlign: 'center' }}
          >
            <Card
              p={50}
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              <Stack align="center" gap="lg">
                <ThemeIcon size={80} radius="xl" color="white" variant="filled">
                  <IconLeaf size={40} />
                </ThemeIcon>
                <Title order={3} style={{ textAlign: 'center' }}>
                  Start Your Wellness Journey Today
                </Title>
                <Text size="lg" opacity={0.9} ta="center" style={{ maxWidth: '600px' }}>
                  Join thousands who have transformed their health with premium Moringa. 
                  Experience the difference that pure, natural nutrition can make.
                </Text>
                <Button
                  size="lg"
                  radius="xl"
                  variant="filled"
                  color="white"
                  rightSection={<IconArrowRight size={18} />}
                  style={{
                    color: '#059669',
                    fontWeight: 600,
                    paddingLeft: 30,
                    paddingRight: 30
                  }}
                >
                  Explore Our Products
                </Button>
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaBenefitsSection;
