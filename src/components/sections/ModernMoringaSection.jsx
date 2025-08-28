// Dbanyan Group - Modern Moringa Section
// Professional showcase with real images and engaging content

import React from 'react';
import { Container, Title, Text, Card, Group, Stack, Badge, Button, Grid } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  IconLeaf,
  IconDroplet,
  IconFlame,
  IconShield,
  IconHeart,
  IconBrain,
  IconEye,
  IconBone,
  IconPlant,
  IconArrowRight
} from '@tabler/icons-react';

const ModernMoringaSection = () => {
  const moringaParts = [
    {
      id: 'leaves',
      name: 'Moringa Leaves',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
      nutrients: 'Vitamin C, Iron, Protein',
      description: 'The powerhouse of nutrition, Moringa leaves contain 7x more Vitamin C than oranges, 4x more calcium than milk, and 3x more potassium than bananas. These nutrient-dense leaves are the foundation of a Moringified lifestyle.',
      benefits: ['Boosts Immunity', 'Supports Energy Levels', 'Enhances Mental Clarity', 'Promotes Healthy Skin', 'Aids Digestion'],
      icon: IconLeaf,
      color: '#059669',
      nutritionFacts: { vitaminC: '220mg', iron: '28mg', protein: '27g', calcium: '2000mg' }
    },
    {
      id: 'seeds',
      name: 'Moringa Seeds',
      image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=300&fit=crop',
      nutrients: 'Healthy Oils, Vitamin E',
      description: 'Moringa seeds are nature\'s water purifiers and health enhancers. Rich in healthy monounsaturated fats and powerful antioxidants, they support cardiovascular health and provide sustained energy throughout your day.',
      benefits: ['Heart Health Support', 'Natural Water Purification', 'Anti-inflammatory Properties', 'Skin Rejuvenation', 'Blood Sugar Regulation'],
      icon: IconDroplet,
      color: '#047857',
      nutritionFacts: { vitaminE: '15mg', healthyFats: '35g', fiber: '8g', antioxidants: 'High' }
    },
    {
      id: 'pods',
      name: 'Moringa Pods',
      image: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400&h=300&fit=crop',
      nutrients: 'Vitamins A, B, K',
      description: 'Known as "drumsticks" in many cultures, Moringa pods are culinary treasures packed with essential vitamins and minerals. They offer a unique way to incorporate the Moringa benefits into your daily meals.',
      benefits: ['Rich in Vitamin K', 'Supports Bone Health', 'Aids in Blood Clotting', 'Boosts Metabolism', 'Enhances Flavor'],
      icon: IconFlame,
      color: '#065f46',
      nutritionFacts: { vitaminK: '180mcg', vitaminA: '2000IU', folate: '40mcg', magnesium: '147mg' }
    },
    {
      id: 'roots',
      name: 'Moringa Roots',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c65ae8fe55?w=400&h=300&fit=crop',
      nutrients: 'Medicinal Compounds',
      description: 'The roots of the Moringa tree have been used in traditional medicine for centuries. Rich in bioactive compounds, they represent the ancient wisdom of natural healing and holistic wellness.',
      benefits: ['Traditional Medicine', 'Natural Healing Properties', 'Digestive Support', 'Anti-bacterial Effects', 'Immune System Boost'],
      icon: IconShield,
      color: '#0d9488',
      nutritionFacts: { alkaloids: 'Present', flavonoids: 'High', saponins: 'Active', tannins: 'Beneficial' }
    }
  ];

  const healthBenefits = [
    {
      icon: IconHeart,
      title: 'Heart Health',
      description: 'Supports cardiovascular wellness with natural compounds',
      color: '#ef4444'
    },
    {
      icon: IconBrain,
      title: 'Mental Clarity',
      description: 'Enhances cognitive function and mental focus',
      color: '#8b5cf6'
    },
    {
      icon: IconEye,
      title: 'Vision Support',
      description: 'Rich in Vitamin A for healthy eyesight',
      color: '#f59e0b'
    },
    {
      icon: IconBone,
      title: 'Bone Strength',
      description: 'High calcium content for strong bones',
      color: '#06b6d4'
    },
    {
      icon: IconShield,
      title: 'Immune Boost',
      description: 'Natural antioxidants strengthen immunity',
      color: '#10b981'
    },
    {
      icon: IconPlant,
      title: 'Natural Energy',
      description: 'Sustained energy without caffeine crashes',
      color: '#84cc16'
    }
  ];

  const RotatingLeaf = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        borderRadius: '50%',
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(16,185,129,0.12)'
      }}>
        <IconLeaf size={40} color="white" />
      </div>
    </motion.div>
  );

  return (
    <section 
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)'
      }}
    >
      <Container size="xl">
        {/* Rotating Leaf Icon Highlight */}
        <RotatingLeaf />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col items-center justify-center text-center w-full">
            <Badge 
              size="lg" 
              radius="xl" 
              className="mb-4 mx-auto"
              style={{ 
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                color: '#059669',
                border: '1px solid #a7f3d0',
                textAlign: 'center'
              }}
            >
              <IconLeaf className="w-4 h-4 mr-2" />
              MORINGIFY YOUR WORLD
            </Badge>
            <Title 
              order={2} 
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              style={{ 
                fontFamily: 'Lora, serif',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Join the Moringification Revolution
            </Title>
            <Text 
              size="xl" 
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-center"
              style={{ fontFamily: 'Inter, sans-serif', textAlign: 'center' }}
            >
              Ready to Moringify your life? Thousands have already discovered how this ancient 
              superfood transforms ordinary days into extraordinary wellness experiences. 
              Every leaf, seed, and root contains nature's blueprint for optimal health, 
              waiting to revolutionize your vitality from the inside out.
            </Text>
          </div>
        </motion.div>

        {/* Tab Navigation - REMOVED */}
        {/* Replaced with Interactive Card Grid - More Ergonomic */}

        {/* Interactive Moringa Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <Badge 
              size="md" 
              radius="xl" 
              className="mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                color: '#059669',
                border: '1px solid #bbf7d0'
              }}
            >
              EXPLORE MORINGA
            </Badge>
            <Title 
              order={3} 
              className="text-2xl font-semibold text-gray-800 mb-2"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Discover Every Part & Benefit
            </Title>
            <Text className="text-gray-600">Click any card to explore in detail</Text>
          </div>

          {/* Interactive Grid - Health Benefits */}
          <div className="mb-12">
            <Title 
              order={4} 
              className="text-xl font-semibold text-emerald-700 mb-6 text-center"
              style={{ fontFamily: 'Lora, serif' }}
            >
              🌿 Health Benefits
            </Title>
            <Grid gutter="lg">
              {healthBenefits.map((benefit, index) => (
                <Grid.Col key={benefit.title} span={{ base: 12, sm: 6, lg: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full"
                  >
                    <Card 
                      className="h-full bg-white border border-gray-100 cursor-pointer transition-all duration-300"
                      radius="xl" 
                      p="xl"
                      style={{
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        background: `linear-gradient(135deg, ${benefit.color}08 0%, white 100%)`,
                        minHeight: '280px'
                      }}
                      onClick={() => {
                        console.log(`Exploring ${benefit.title}`);
                      }}
                    >
                      <Stack align="center" className="text-center h-full" justify="space-between">
                        <div>
                          <motion.div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${benefit.color}15` }}
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <benefit.icon 
                              className="w-8 h-8" 
                              style={{ color: benefit.color }}
                            />
                          </motion.div>
                          
                          <Title 
                            order={5} 
                            className="text-lg font-semibold mb-3"
                            style={{ 
                              fontFamily: '"Lora", serif', 
                              color: benefit.color,
                              lineHeight: 1.3
                            }}
                          >
                            {benefit.title}
                          </Title>
                          
                          <Text 
                            className="text-gray-600 leading-relaxed text-sm mb-4"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            {benefit.description}
                          </Text>
                        </div>

                        <Badge 
                          size="xs" 
                          radius="md"
                          style={{ 
                            backgroundColor: `${benefit.color}20`, 
                            color: benefit.color
                          }}
                        >
                          Click to explore
                        </Badge>
                      </Stack>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </div>

          {/* Interactive Grid - Moringa Parts */}
          <div>
            <Title 
              order={4} 
              className="text-xl font-semibold text-emerald-700 mb-6 text-center"
              style={{ fontFamily: 'Lora, serif' }}
            >
              🌱 Moringa Plant Parts
            </Title>
            <Grid gutter="lg">
              {moringaParts.map((part, index) => (
                <Grid.Col key={part.id} span={{ base: 12, sm: 6, lg: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full"
                  >
                    <Card 
                      className="h-full bg-white border border-gray-100 cursor-pointer transition-all duration-300"
                      radius="xl" 
                      padding="0"
                      style={{
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        overflow: 'hidden',
                        minHeight: '400px'
                      }}
                      onClick={() => {
                        console.log(`Exploring ${part.name}`);
                      }}
                    >
                      {/* Always Visible Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={part.image}
                          alt={part.name}
                          className="w-full h-48 object-cover transition-transform duration-300"
                          style={{ filter: 'brightness(1) contrast(1.05)' }}
                          loading="lazy"
                        />
                        <div 
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md"
                          style={{ 
                            backgroundColor: `${part.color}90`, 
                            border: `1px solid ${part.color}`
                          }}
                        >
                          <part.icon 
                            className="w-5 h-5 text-white" 
                          />
                        </div>
                        
                        {/* Subtle Enhancement Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Enhanced Content with Consistent Height */}
                      <div className="p-5 h-full flex flex-col">
                        <div className="flex-1">
                          <Group justify="space-between" align="flex-start" className="mb-3">
                            <Title 
                              order={6} 
                              className="text-base font-semibold flex-1"
                              style={{ fontFamily: '"Lora", serif', color: part.color }}
                            >
                              {part.name}
                            </Title>
                            <Badge 
                              size="xs" 
                              radius="md"
                              style={{ backgroundColor: `${part.color}15`, color: part.color }}
                            >
                              {part.nutrients}
                            </Badge>
                          </Group>

                          <Text 
                            size="xs" 
                            className="text-gray-600 mb-3 leading-relaxed"
                            style={{ fontFamily: '"Inter", sans-serif' }}
                          >
                            {part.description.substring(0, 85)}...
                          </Text>

                          {/* Key Benefits Preview */}
                          <Stack gap="xs" className="mb-4">
                            {part.benefits.slice(0, 2).map((benefit, idx) => (
                              <Group key={idx} gap="xs" align="flex-start">
                                <div 
                                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                  style={{ backgroundColor: part.color }}
                                />
                                <Text 
                                  size="xs" 
                                  className="text-gray-600"
                                  style={{ fontFamily: '"Inter", sans-serif', lineHeight: 1.4 }}
                                >
                                  {benefit}
                                </Text>
                              </Group>
                            ))}
                            {part.benefits.length > 2 && (
                              <Text size="xs" style={{ color: part.color, fontStyle: 'italic' }}>
                                +{part.benefits.length - 2} more benefits
                              </Text>
                            )}
                          </Stack>
                        </div>

                        {/* Action Badge at Bottom */}
                        <div className="mt-auto">
                          <Badge 
                            size="xs" 
                            radius="md"
                            fullWidth
                            style={{ 
                              backgroundColor: `${part.color}10`, 
                              color: part.color,
                              border: `1px solid ${part.color}30`
                            }}
                          >
                            Tap to explore more
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </div>
        </motion.div>

        {/* Enhanced Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card 
            className="relative overflow-hidden"
            radius="3xl" 
            p="3xl"
            style={{
              background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)',
              border: 'none',
              boxShadow: '0 25px 50px rgba(16, 185, 129, 0.2)'
            }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <IconLeaf className="w-full h-full text-white" />
              </motion.div>
            </div>

            <Stack align="center" className="text-center relative z-10" gap="xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Badge 
                  size="lg" 
                  radius="xl" 
                  className="mb-4"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  ✨ PREMIUM QUALITY GUARANTEED
                </Badge>
              </motion.div>
              
              <Title 
                order={2} 
                className="text-4xl font-bold text-white mb-4"
                style={{ fontFamily: '"Lora", serif' }}
              >
                Choose the Ultimate Superfood
              </Title>
              
              <Text 
                className="text-emerald-100 leading-relaxed max-w-2xl text-lg"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Why settle for ordinary when you can have extraordinary? 
                Experience the nutritional champion that's transforming lives worldwide.
              </Text>
              
              <Group gap="lg" className="mt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    radius="xl"
                    rightSection={<IconArrowRight className="w-5 h-5" />}
                    component={Link}
                    to="/products"
                    className="font-semibold px-8 py-4"
                    style={{
                      background: 'white',
                      border: 'none',
                      color: '#059669',
                      fontSize: '16px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  >
                    Get Premium Moringa
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    radius="xl"
                    variant="outline"
                    component={Link}
                    to="/moringa-guide"
                    className="font-semibold px-8 py-4"
                    style={{
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      color: 'white',
                      fontSize: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </Group>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Group gap="xl" justify="center" className="text-emerald-100">
                  <div className="text-center">
                    <Text className="text-2xl font-bold text-white">10,000+</Text>
                    <Text size="sm">Happy Customers</Text>
                  </div>
                  <div className="text-center">
                    <Text className="text-2xl font-bold text-white">100%</Text>
                    <Text size="sm">Natural & Pure</Text>
                  </div>
                  <div className="text-center">
                    <Text className="text-2xl font-bold text-white">30-Day</Text>
                    <Text size="sm">Money Back</Text>
                  </div>
                </Group>
              </motion.div>
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
};

export default ModernMoringaSection;
