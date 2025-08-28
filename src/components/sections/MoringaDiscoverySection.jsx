// Dbanyan Group - Interactive Moringa Discovery Section
// Modern interactive section with hover effects and engaging animations

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  SimpleGrid,
  ThemeIcon,
  Center,
  Image,
  Overlay
} from '@mantine/core';
import { 
  IconLeaf,
  IconHeart,
  IconBrain,
  IconShield,
  IconDroplet,
  IconSun,
  IconSparkles,
  IconArrowRight,
  IconBolt,
  IconStars,
  IconPlant2,
  IconActivity
} from '@tabler/icons-react';

const MoringaDiscoverySection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const discoveries = [
    {
      id: 1,
      title: "Nature's Multivitamin",
      subtitle: "7x More Vitamin C than Oranges",
      description: "Discover how this miracle tree contains more essential nutrients than most superfoods combined.",
      icon: IconLeaf,
      color: "#22c55e",
      bgImage: "https://images.unsplash.com/photo-1574482620263-4c48c2707ceb?w=400&h=300&fit=crop",
      stats: "92+ Essential Nutrients",
      feature: "Complete Protein Source"
    },
    {
      id: 2,
      title: "Ancient Wisdom",
      subtitle: "5000+ Years of Traditional Use",
      description: "From ancient Ayurveda to modern science, explore the time-tested benefits of Moringa.",
      icon: IconStars,
      color: "#8b5cf6",
      bgImage: "https://images.unsplash.com/photo-1584624853341-d81309bb4d04?w=400&h=300&fit=crop",
      stats: "300+ Diseases Treated",
      feature: "Scientifically Proven"
    },
    {
      id: 3,
      title: "Superfood Science",
      subtitle: "46+ Antioxidants Naturally",
      description: "Uncover the scientific research behind Moringa's incredible health-boosting properties.",
      icon: IconActivity,
      color: "#3b82f6",
      bgImage: "https://images.unsplash.com/photo-1559163499-413811fb2344?w=400&h=300&fit=crop",
      stats: "25+ Clinical Studies",
      feature: "Laboratory Tested"
    },
    {
      id: 4,
      title: "Global Impact",
      subtitle: "Fighting Malnutrition Worldwide",
      description: "See how Moringa is helping communities worldwide overcome malnutrition and poverty.",
      icon: IconHeart,
      color: "#ef4444",
      bgImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=300&fit=crop",
      stats: "50+ Countries Growing",
      feature: "UN Recommended"
    }
  ];

  return (
    <Box
      py={100}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
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
              size="xl"
              variant="light"
              color="green"
              mb={20}
              leftSection={<IconSparkles size={18} />}
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}
            >
              DISCOVER THE MIRACLE TREE
            </Badge>
            <Title
              order={2}
              size="h1"
              mb={20}
              style={{
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.2,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}
            >
              Why{' '}
              <Text
                component="span"
                inherit
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Moringa
              </Text>{' '}
              is Called the
              <br />
              <Text
                component="span"
                inherit
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                "Miracle Tree"
              </Text>
            </Title>
            <Text
              size="xl"
              style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Dive deep into the fascinating world of Moringa and uncover the science, 
              history, and global impact of nature's most nutritious superfood.
            </Text>
          </motion.div>

          {/* Discovery Cards Grid */}
          <SimpleGrid 
            cols={{ base: 1, sm: 2, lg: 4 }} 
            spacing="xl"
          >
            {discoveries.map((discovery, index) => (
              <motion.div
                key={discovery.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card
                  h={400}
                  radius="xl"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: hoveredCard === discovery.id ? `2px solid ${discovery.color}` : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredCard(discovery.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Background Image */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '45%',
                      backgroundImage: `url(${discovery.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCard === discovery.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <Overlay
                    color="#000"
                    opacity={0.4}
                    style={{ height: '45%' }}
                  />

                  {/* Content */}
                  <Stack
                    gap="md"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      height: '100%',
                      padding: '20px',
                      paddingTop: '35%'
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: hoveredCard === discovery.id ? 1.1 : 1,
                        rotate: hoveredCard === discovery.id ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ThemeIcon
                        size={60}
                        radius="xl"
                        color={discovery.color}
                        variant="light"
                        style={{
                          backgroundColor: `${discovery.color}20`,
                          border: `2px solid ${discovery.color}`
                        }}
                      >
                        <discovery.icon size={30} />
                      </ThemeIcon>
                    </motion.div>

                    <Stack gap="xs">
                      <Badge
                        size="sm"
                        variant="light"
                        color="gray"
                        style={{ 
                          backgroundColor: 'rgba(255,255,255,0.1)', 
                          color: 'rgba(255,255,255,0.8)',
                          width: 'fit-content'
                        }}
                      >
                        {discovery.stats}
                      </Badge>
                      <Title 
                        order={4} 
                        style={{ 
                          color: 'white',
                          fontWeight: 600,
                          lineHeight: 1.2
                        }}
                      >
                        {discovery.title}
                      </Title>
                      <Text 
                        size="sm" 
                        fw={500}
                        style={{ color: discovery.color }}
                      >
                        {discovery.subtitle}
                      </Text>
                      <Text 
                        size="sm" 
                        style={{ 
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: 1.4
                        }}
                      >
                        {discovery.description}
                      </Text>
                    </Stack>

                    <motion.div
                      animate={{
                        opacity: hoveredCard === discovery.id ? 1 : 0,
                        y: hoveredCard === discovery.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: 'auto' }}
                    >
                      <Group justify="space-between" align="center">
                        <Badge
                          size="xs"
                          variant="dot"
                          color={discovery.color}
                          style={{ color: 'white' }}
                        >
                          {discovery.feature}
                        </Badge>
                        <ThemeIcon
                          size="sm"
                          color={discovery.color}
                          variant="light"
                          radius="xl"
                        >
                          <IconArrowRight size={14} />
                        </ThemeIcon>
                      </Group>
                    </motion.div>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card
              p={50}
              radius="xl"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                backdropFilter: 'blur(20px)',
                textAlign: 'center'
              }}
            >
              <Stack align="center" gap="xl">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <ThemeIcon size={80} radius="xl" color="green" variant="light">
                    <IconPlant2 size={40} />
                  </ThemeIcon>
                </motion.div>
                
                <Stack align="center" gap="md">
                  <Title 
                    order={2} 
                    style={{ 
                      color: 'white',
                      fontFamily: 'Lora, serif'
                    }}
                  >
                    Ready to Experience the Miracle?
                  </Title>
                  <Text 
                    size="lg" 
                    style={{ 
                      color: 'rgba(255,255,255,0.8)',
                      maxWidth: '600px'
                    }}
                  >
                    Join millions worldwide who have discovered the life-changing benefits of pure, 
                    natural Moringa. Start your journey to optimal wellness today.
                  </Text>
                </Stack>

                <Group gap="lg">
                  <Button
                    size="xl"
                    radius="xl"
                    color="green"
                    variant="filled"
                    rightSection={<IconBolt size={20} />}
                    style={{
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      border: 'none'
                    }}
                  >
                    Shop Moringa Products
                  </Button>
                  <Button
                    size="xl"
                    radius="xl"
                    variant="outline"
                    color="white"
                    style={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white'
                    }}
                  >
                    Learn More
                  </Button>
                </Group>
              </Stack>
            </Card>
          </motion.div>
        </Stack>
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </Box>
  );
};

export default MoringaDiscoverySection;
