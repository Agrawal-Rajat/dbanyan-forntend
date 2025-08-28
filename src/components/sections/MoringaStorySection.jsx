// Dbanyan Group - Moringa Story Timeline Section
// Visual journey from tree to wellness with modern timeline design

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
  Timeline,
  Avatar,
  Progress
} from '@mantine/core';
import {
  IconSeedling,
  IconLeaf,
  IconFlask2,
  IconHeart,
  IconSparkles,
  IconSun,
  IconDroplet,
  IconPackage,
  IconTruck,
  IconUser,
  IconArrowRight,
  IconStars
} from '@tabler/icons-react';

const journeySteps = [
  {
    icon: IconSeedling,
    title: 'Organic Cultivation',
    description: 'Grown in pristine conditions without pesticides or chemicals',
    details: 'Our Moringa trees are cultivated in nutrient-rich soil under optimal conditions',
    color: '#22c55e',
    image: '🌱'
  },
  {
    icon: IconSun,
    title: 'Perfect Harvest',
    description: 'Hand-picked at peak nutritional potency for maximum benefits',
    details: 'Leaves are harvested at dawn when nutrient concentration is highest',
    color: '#f59e0b',
    image: '🌿'
  },
  {
    icon: IconFlask2,
    title: 'Gentle Processing',
    description: 'Low-temperature drying preserves all vital nutrients and enzymes',
    details: 'Our proprietary process maintains the integrity of heat-sensitive compounds',
    color: '#3b82f6',
    image: '⚗️'
  },
  {
    icon: IconPackage,
    title: 'Pure & Ready',
    description: 'Packaged in airtight containers to lock in freshness and potency',
    details: 'Quality tested and sealed to ensure maximum shelf life and effectiveness',
    color: '#8b5cf6',
    image: '📦'
  },
  {
    icon: IconHeart,
    title: 'Your Wellness',
    description: 'Transform your health with nature\'s most complete superfood',
    details: 'Experience increased energy, immunity, and overall vitality',
    color: '#ef4444',
    image: '💚'
  }
];

const benefits = [
  { icon: IconSparkles, text: 'Boosts Natural Energy', percentage: 95 },
  { icon: IconHeart, text: 'Supports Heart Health', percentage: 88 },
  { icon: IconLeaf, text: 'Rich in Antioxidants', percentage: 92 },
  { icon: IconSun, text: 'Enhances Immunity', percentage: 90 }
];

const MoringaStorySection = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #fefefe 0%, #f8fafc 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ duration: 3 }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          fontSize: '8rem',
          zIndex: 0
        }}
      >
        🌿
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 0.05, rotate: 0 }}
        transition={{ duration: 3, delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          fontSize: '6rem',
          zIndex: 0
        }}
      >
        💚
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
              leftSection={<IconStars size={16} />}
              style={{ height: 40, paddingLeft: 16, paddingRight: 16 }}
            >
              FROM NATURE TO NUTRITION
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
              The Moringa Journey
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
              Follow the remarkable journey from organic cultivation to your daily wellness routine.
            </Text>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card
              radius="xl"
              p={40}
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '2px solid rgba(6, 95, 70, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Timeline 
                active={activeStep} 
                bulletSize={24} 
                lineWidth={3}
                color="green"
              >
                {journeySteps.map((step, idx) => (
                  <Timeline.Item
                    key={idx}
                    bullet={
                      <ThemeIcon
                        size={40}
                        radius="xl"
                        color={step.color}
                        variant="filled"
                        style={{
                          boxShadow: `0 4px 16px ${step.color}40`,
                          cursor: 'pointer'
                        }}
                        onClick={() => setActiveStep(idx)}
                      >
                        <step.icon size={20} />
                      </ThemeIcon>
                    }
                    title={
                      <Group gap="md" align="center">
                        <Text size="lg" fw={600} style={{ color: '#065f46' }}>
                          {step.title}
                        </Text>
                        <Text size="2rem" style={{ lineHeight: 1 }}>
                          {step.image}
                        </Text>
                      </Group>
                    }
                  >
                    <Text size="sm" style={{ color: '#6b7280', marginBottom: 8 }}>
                      {step.description}
                    </Text>
                    <AnimatePresence>
                      {activeStep >= idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Text size="xs" style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                            {step.details}
                          </Text>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </motion.div>

          {/* Benefits Grid */}
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="lg">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  radius="lg"
                  p={24}
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    border: '1px solid rgba(6, 95, 70, 0.1)',
                    textAlign: 'center',
                    minHeight: 160
                  }}
                >
                  <Stack align="center" gap="sm">
                    <ThemeIcon 
                      size={48} 
                      radius="xl" 
                      variant="light" 
                      color="green"
                    >
                      <benefit.icon size={24} />
                    </ThemeIcon>
                    <Text size="sm" fw={600} style={{ color: '#065f46' }}>
                      {benefit.text}
                    </Text>
                    <Progress 
                      value={benefit.percentage} 
                      color="green"
                      radius="xl"
                      size="xs"
                      style={{ width: '100%' }}
                    />
                    <Text size="xs" style={{ color: '#059669' }}>
                      {benefit.percentage}% Effective
                    </Text>
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
                background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #22c55e 100%)',
                color: 'white',
                maxWidth: '600px',
                margin: '0 auto',
                boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)'
              }}
            >
              <Stack align="center" gap="lg">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Text size="3rem" style={{ lineHeight: 1 }}>🌿</Text>
                </motion.div>
                <Title order={3} style={{ fontFamily: 'Lora, serif' }}>
                  Start Your Wellness Journey Today
                </Title>
                <Text size="lg" opacity={0.9} ta="center">
                  Experience the complete nutrition that only pure Moringa can provide.
                </Text>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    radius="xl"
                    variant="filled"
                    color="white"
                    rightSection={<IconArrowRight size={18} />}
                    style={{
                      color: '#059669',
                      fontWeight: 600,
                      paddingLeft: 24,
                      paddingRight: 24
                    }}
                  >
                    Shop Premium Moringa
                  </Button>
                </motion.div>
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default MoringaStorySection;
