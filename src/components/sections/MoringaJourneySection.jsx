// Dbanyan Group - Interactive Moringa Journey Section
// Shows the transformation journey and timeline of wellness with Moringa

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Title, 
  Text, 
  Card, 
  Group, 
  Badge,
  Stack,
  Box,
  Button,
  Progress,
  Timeline,
  ThemeIcon,
  Tooltip
} from '@mantine/core';
import { 
  IconSeedling,
  IconDroplet,
  IconFlame,
  IconHeart,
  IconBrain,
  IconShield,
  IconTarget,
  IconTrendingUp,
  IconStar,
  IconCheckbox,
  IconClock,
  IconArrowRight,
  IconSparkles
} from '@tabler/icons-react';

const MoringaJourneySection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance timeline every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const journeySteps = [
    {
      week: 'Week 1',
      title: 'First Steps to Wellness',
      description: 'Begin your Moringification journey with gentle energy boosts and improved digestion.',
      benefits: ['Increased Energy', 'Better Sleep', 'Digestive Health'],
      icon: IconSeedling,
      color: '#22c55e',
      progress: 20,
      testimonial: 'I felt more energetic from day 3!'
    },
    {
      week: 'Week 2-3',
      title: 'Momentum Building',
      description: 'Notice enhanced mental clarity, stronger immunity, and natural detoxification.',
      benefits: ['Mental Clarity', 'Immune Boost', 'Natural Detox'],
      icon: IconDroplet,
      color: '#3b82f6',
      progress: 40,
      testimonial: 'My focus at work improved dramatically.'
    },
    {
      week: 'Week 4-6',
      title: 'Transformation Phase',
      description: 'Experience significant improvements in heart health, skin glow, and overall vitality.',
      benefits: ['Heart Health', 'Glowing Skin', 'Weight Management'],
      icon: IconHeart,
      color: '#ef4444',
      progress: 60,
      testimonial: 'People started noticing my glowing skin!'
    },
    {
      week: 'Week 7-8',
      title: 'Peak Performance',
      description: 'Achieve optimal wellness with enhanced brain function and sustained energy levels.',
      benefits: ['Cognitive Enhancement', 'Sustained Energy', 'Mood Stability'],
      icon: IconBrain,
      color: '#8b5cf6',
      progress: 80,
      testimonial: 'I feel like the best version of myself.'
    },
    {
      week: 'Week 9+',
      title: 'Moringified Life',
      description: 'Maintain your transformed lifestyle with long-term health benefits and vitality.',
      benefits: ['Long-term Wellness', 'Disease Prevention', 'Life Vitality'],
      icon: IconStar,
      color: '#f59e0b',
      progress: 100,
      testimonial: 'Moringa changed my life completely!'
    }
  ];

  const handleStepClick = (index) => {
    setIsAnimating(true);
    setActiveStep(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decoration */}
      <Box
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
      />
      
      <Container size="xl">
        <Stack gap={60}>
          {/* Section Header */}
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
              leftSection={<IconSparkles size={16} />}
            >
              YOUR WELLNESS TRANSFORMATION
            </Badge>
            <Title
              order={2}
              size="h1"
              mb={20}
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 600,
                color: '#1a202c',
                lineHeight: 1.2
              }}
            >
              The Journey to{' '}
              <Text
                component="span"
                inherit
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Moringification
              </Text>
            </Title>
            <Text
              size="xl"
              c="dimmed"
              style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Discover how Moringa transforms your wellness journey week by week, 
              leading to sustainable health improvements and vitality.
            </Text>
          </motion.div>

          {/* Interactive Timeline */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Timeline active={activeStep} bulletSize={24} lineWidth={3} color="green">
                  {journeySteps.map((step, index) => (
                    <Timeline.Item
                      key={index}
                      bullet={
                        <ThemeIcon size={24} color={step.color} variant="filled">
                          {React.createElement(step.icon, { size: 14 })}
                        </ThemeIcon>
                      }
                      onClick={() => handleStepClick(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card
                          p="md"
                          radius="lg"
                          withBorder
                          style={{
                            backgroundColor: activeStep === index ? '#f0fdf4' : 'white',
                            borderColor: activeStep === index ? step.color : '#e5e7eb',
                            borderWidth: activeStep === index ? '2px' : '1px'
                          }}
                        >
                          <Group justify="space-between" mb="xs">
                            <Badge color={step.color} variant="light">
                              {step.week}
                            </Badge>
                            <Text size="sm" c="dimmed">
                              <IconClock size={14} style={{ marginRight: 4 }} />
                              {index + 1}/{journeySteps.length}
                            </Text>
                          </Group>
                          <Title order={4} mb="xs" style={{ color: step.color }}>
                            {step.title}
                          </Title>
                          <Text size="sm" c="dimmed" mb="md">
                            {step.description}
                          </Text>
                          <Progress 
                            value={step.progress} 
                            color={step.color} 
                            size="sm" 
                            radius="xl"
                            mb="md"
                          />
                          <Stack gap={4}>
                            {step.benefits.map((benefit, benefitIndex) => (
                              <Group key={benefitIndex} gap="xs">
                                <IconCheckbox size={14} color={step.color} />
                                <Text size="sm" fw={500}>
                                  {benefit}
                                </Text>
                              </Group>
                            ))}
                          </Stack>
                        </Card>
                      </motion.div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </motion.div>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card
                      p={40}
                      radius="xl"
                      withBorder
                      style={{
                        background: `linear-gradient(135deg, ${journeySteps[activeStep].color}10 0%, white 100%)`,
                        borderColor: journeySteps[activeStep].color,
                        borderWidth: '2px',
                        minHeight: '400px'
                      }}
                    >
                      <Stack align="center" gap="xl">
                        <ThemeIcon
                          size={80}
                          radius="xl"
                          color={journeySteps[activeStep].color}
                          variant="light"
                        >
                          {React.createElement(journeySteps[activeStep].icon, { size: 40 })}
                        </ThemeIcon>

                        <Stack align="center" gap="md">
                          <Badge size="lg" color={journeySteps[activeStep].color}>
                            {journeySteps[activeStep].week}
                          </Badge>
                          <Title 
                            order={3} 
                            ta="center"
                            style={{ color: journeySteps[activeStep].color }}
                          >
                            {journeySteps[activeStep].title}
                          </Title>
                          <Text ta="center" c="dimmed" size="lg">
                            {journeySteps[activeStep].description}
                          </Text>
                        </Stack>

                        <Box
                          p="lg"
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            border: `1px solid ${journeySteps[activeStep].color}30`,
                            width: '100%'
                          }}
                        >
                          <Group gap="xs" mb="sm">
                            <IconTarget size={16} color={journeySteps[activeStep].color} />
                            <Text fw={600} size="sm" style={{ color: journeySteps[activeStep].color }}>
                              Progress: {journeySteps[activeStep].progress}%
                            </Text>
                          </Group>
                          <Progress 
                            value={journeySteps[activeStep].progress} 
                            color={journeySteps[activeStep].color} 
                            size="lg" 
                            radius="xl"
                            mb="md"
                          />
                          <Text 
                            ta="center" 
                            fs="italic" 
                            size="sm"
                            style={{ color: journeySteps[activeStep].color }}
                          >
                            "{journeySteps[activeStep].testimonial}"
                          </Text>
                        </Box>

                        <Button
                          size="lg"
                          radius="xl"
                          color={journeySteps[activeStep].color}
                          rightSection={<IconArrowRight size={18} />}
                          variant="light"
                        >
                          Start Your Journey
                        </Button>
                      </Stack>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Grid.Col>
          </Grid>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Card
              p={40}
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white'
              }}
            >
              <Stack align="center" gap="md">
                <ThemeIcon size={60} radius="xl" color="white" variant="filled">
                  <IconTrendingUp size={30} />
                </ThemeIcon>
                <Title order={3} ta="center">
                  Ready to Begin Your Moringification?
                </Title>
                <Text ta="center" size="lg" opacity={0.9}>
                  Join thousands who have transformed their lives with our premium Moringa products.
                  Start your wellness journey today and experience the power of natural nutrition.
                </Text>
                <Button
                  size="xl"
                  radius="xl"
                  color="white"
                  variant="white"
                  style={{ color: '#059669' }}
                  rightSection={<IconArrowRight size={20} />}
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

export default MoringaJourneySection;
