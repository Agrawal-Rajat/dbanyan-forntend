// Dbanyan Group - Moringa World Impact Section
// Global reach and cultural significance of Moringa

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
  Avatar
} from '@mantine/core';
import {
  IconWorld,
  IconUsers,
  IconTrendingUp,
  IconLeaf,
  IconHeart,
  IconStar,
  IconGlobe,
  IconMapPin,
  IconChevronRight
} from '@tabler/icons-react';

const worldStats = [
  {
    icon: IconWorld,
    title: 'Countries Growing Moringa',
    value: '82+',
    description: 'Across 6 continents',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
  },
  {
    icon: IconUsers,
    title: 'People Benefiting Daily',
    value: '300M+',
    description: 'Worldwide consumers',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
  },
  {
    icon: IconTrendingUp,
    title: 'Market Growth',
    value: '9.2%',
    description: 'Annual growth rate',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
  },
  {
    icon: IconHeart,
    title: 'Nutrition Programs',
    value: '1000+',
    description: 'Global initiatives',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
  }
];

const culturalStories = [
  {
    country: 'Philippines',
    name: 'Malunggay',
    story: 'Known as the "Mother\'s Best Friend" for nursing mothers',
    flag: '🇵🇭',
    tradition: 'Added to traditional soups and stews'
  },
  {
    country: 'India',
    name: 'Drumstick Tree',
    story: 'Sacred tree mentioned in ancient Ayurvedic texts',
    flag: '🇮🇳',
    tradition: 'Used in traditional medicine for 4000+ years'
  },
  {
    country: 'Africa',
    name: 'Tree of Life',
    story: 'Feeds entire communities during drought seasons',
    flag: '🌍',
    tradition: 'Every part used from roots to leaves'
  },
  {
    country: 'Guatemala',
    name: 'Marango',
    story: 'Fighting malnutrition in rural communities',
    flag: '🇬🇹',
    tradition: 'School feeding programs nationwide'
  }
];

const MoringaWorldImpactSection = () => {
  const [selectedStory, setSelectedStory] = useState(0);

  return (
    <Box
      py={120}
      style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #86efac 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced animated background elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
        animate={{ opacity: 0.08, rotate: 0, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #059669 0%, #10b981 40%, transparent 70%)',
          zIndex: 0
        }}
      />
      <motion.div
        initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
        animate={{ opacity: 0.06, rotate: 0, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: '-300px',
          left: '-300px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 70% 70%, #22c55e 0%, #16a34a 40%, transparent 70%)',
          zIndex: 0
        }}
      />
      
      {/* Floating leaf elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [100, -100],
            x: [0, Math.sin(i) * 50]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            zIndex: 1
          }}
        >
          <IconLeaf size={24} style={{ color: '#059669', opacity: 0.4 }} />
        </motion.div>
      ))}

      <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
        <Stack gap={80} align="center">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge
                size="xl"
                variant="gradient"
                gradient={{ from: 'green', to: 'teal' }}
                mb={24}
                leftSection={<IconGlobe size={18} />}
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: 48,
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                GLOBAL IMPACT & HERITAGE
              </Badge>
            </motion.div>
            <Title
              order={1}
              size="3.5rem"
              mb={24}
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                color: '#065f46',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Moringa: Nourishing the World
            </Title>
            <Text
              size="xl"
              style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                lineHeight: 1.7,
                color: '#374151',
                fontSize: '1.25rem'
              }}
            >
              From ancient wisdom to modern nutrition, discover how this miraculous tree 
              touches lives across every continent and transforms communities worldwide.
            </Text>
          </motion.div>

          {/* Enhanced World Statistics */}
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="xl" style={{ width: '100%' }}>
            {worldStats.map((stat, idx) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  radius="xl"
                  p={32}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '2px solid rgba(6, 95, 70, 0.1)',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Stack align="center" gap="md">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThemeIcon 
                        size={60} 
                        radius="xl" 
                        color={stat.color}
                        variant="gradient"
                        gradient={{ from: stat.color, to: stat.color + '80' }}
                        style={{
                          boxShadow: `0 8px 24px ${stat.color}40`
                        }}
                      >
                        <stat.icon size={28} />
                      </ThemeIcon>
                    </motion.div>
                    <Text 
                      size="2.5rem" 
                      fw={800} 
                      style={{
                        color: stat.color,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {stat.value}
                    </Text>
                    <Text size="sm" fw={700} style={{ color: '#065f46' }}>
                      {stat.title}
                    </Text>
                    <Text size="xs" style={{ color: '#6b7280', lineHeight: 1.4 }}>
                      {stat.description}
                    </Text>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Enhanced Cultural Stories */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ width: '100%' }}
          >
            <Stack align="center" gap={48}>
              <Title 
                order={2} 
                ta="center" 
                size="2.5rem"
                style={{
                  color: '#065f46',
                  fontFamily: 'Lora, serif',
                  fontWeight: 600
                }}
              >
                Cultural Heritage Around the World
              </Title>
              
              <Card
                radius="2xl"
                p={48}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '2px solid rgba(6, 95, 70, 0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  maxWidth: '1000px',
                  width: '100%'
                }}
              >
                <Group align="flex-start" gap={48}>
                  {/* Enhanced Story Navigation */}
                  <Stack gap="sm" style={{ minWidth: '280px' }}>
                    {culturalStories.map((story, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={selectedStory === idx ? "gradient" : "subtle"}
                          gradient={selectedStory === idx ? { from: 'green', to: 'teal' } : undefined}
                          color="green"
                          size="lg"
                          leftSection={<Text size="xl">{story.flag}</Text>}
                          rightSection={selectedStory === idx ? <IconChevronRight size={18} /> : null}
                          onClick={() => setSelectedStory(idx)}
                          style={{
                            justifyContent: 'flex-start',
                            height: 'auto',
                            padding: '16px 20px',
                            width: '100%',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Stack gap={6} align="flex-start" style={{ textAlign: 'left' }}>
                            <Text size="md" fw={700}>
                              {story.country}
                            </Text>
                            <Text size="sm" opacity={0.8} fw={500}>
                              "{story.name}"
                            </Text>
                          </Stack>
                        </Button>
                      </motion.div>
                    ))}
                  </Stack>

                  {/* Enhanced Story Display */}
                  <Box style={{ flex: 1, minHeight: '300px' }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedStory}
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -30, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Stack gap="xl">
                          <Group gap="xl" align="center">
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Text size="4rem" style={{ lineHeight: 1 }}>
                                {culturalStories[selectedStory].flag}
                              </Text>
                            </motion.div>
                            <Stack gap={8}>
                              <Title 
                                order={3} 
                                size="1.8rem"
                                style={{ color: '#065f46', fontWeight: 700 }}
                              >
                                {culturalStories[selectedStory].country}
                              </Title>
                              <Text 
                                size="xl" 
                                style={{ 
                                  color: '#059669', 
                                  fontWeight: 600,
                                  fontStyle: 'italic'
                                }}
                              >
                                "{culturalStories[selectedStory].name}"
                              </Text>
                            </Stack>
                          </Group>
                          <Text 
                            size="lg" 
                            style={{ 
                              color: '#374151', 
                              lineHeight: 1.7,
                              fontSize: '1.125rem'
                            }}
                          >
                            {culturalStories[selectedStory].story}
                          </Text>
                          <Badge 
                            variant="gradient" 
                            gradient={{ from: 'green', to: 'teal' }}
                            size="lg"
                            style={{
                              alignSelf: 'flex-start',
                              padding: '8px 16px',
                              fontSize: '0.875rem'
                            }}
                          >
                            {culturalStories[selectedStory].tradition}
                          </Badge>
                        </Stack>
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Group>
              </Card>
            </Stack>
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card
              p={60}
              radius="2xl"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #22c55e 100%)',
                textAlign: 'center',
                maxWidth: '700px',
                boxShadow: '0 20px 60px rgba(5, 150, 105, 0.3)'
              }}
            >
              <Stack align="center" gap="xl">
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <ThemeIcon 
                    size={80} 
                    radius="xl" 
                    color="white" 
                    variant="filled"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <IconLeaf size={40} />
                  </ThemeIcon>
                </motion.div>
                <Title 
                  order={2} 
                  color="white" 
                  size="2rem"
                  style={{
                    fontFamily: 'Lora, serif',
                    fontWeight: 700,
                    lineHeight: 1.3
                  }}
                >
                  Join the Global Moringa Movement
                </Title>
                <Text 
                  size="xl" 
                  color="white" 
                  opacity={0.95}
                  style={{
                    maxWidth: '500px',
                    lineHeight: 1.6,
                    fontSize: '1.125rem'
                  }}
                >
                  Be part of a worldwide community that's discovering the transformative power 
                  of nature's most complete superfood.
                </Text>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    radius="xl"
                    variant="filled"
                    color="white"
                    rightSection={<IconChevronRight size={20} />}
                    style={{
                      color: '#059669',
                      fontWeight: 700,
                      paddingLeft: 32,
                      paddingRight: 32,
                      height: 56,
                      fontSize: '1.1rem'
                    }}
                  >
                    Start Your Journey Today
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

export default MoringaWorldImpactSection;
