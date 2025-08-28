import React from 'react';
import { Group, Text, ThemeIcon, Stack, Paper, Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconShield,
  IconTruck,
  IconRefresh,
  IconCertificate,
  IconPhone,
  IconCreditCard,
  IconAward,
  IconLeaf
} from '@tabler/icons-react';

const TrustSignals = ({ variant = 'horizontal', size = 'md' }) => {
  const trustSignals = [
    {
      icon: IconShield,
      label: '100% Secure',
      description: 'SSL Encrypted',
      color: 'green'
    },
    {
      icon: IconTruck,
      label: 'Free Delivery',
      description: 'On orders ₹1000+',
      color: 'blue'
    },
    {
      icon: IconRefresh,
      label: '30-Day Returns',
      description: 'Easy exchange',
      color: 'orange'
    },
    {
      icon: IconCertificate,
      label: 'Organic Certified',
      description: 'Government verified',
      color: 'teal'
    },
    {
      icon: IconPhone,
      label: '24/7 Support',
      description: 'Customer service',
      color: 'violet'
    },
    {
      icon: IconAward,
      label: 'Quality Assured',
      description: 'Premium products',
      color: 'yellow'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Group gap="md" justify="center">
          {trustSignals.slice(0, 4).map((signal, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Group gap="xs">
                <ThemeIcon color={signal.color} variant="light" size="sm">
                  <signal.icon size={14} />
                </ThemeIcon>
                <Text size="xs" fw={500}>{signal.label}</Text>
              </Group>
            </motion.div>
          ))}
        </Group>
      </motion.div>
    );
  }

  if (variant === 'vertical') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Stack gap="md">
          {trustSignals.map((signal, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Paper withBorder p="md" radius="md">
                <Group gap="md">
                  <ThemeIcon color={signal.color} size="xl" variant="light">
                    <signal.icon size={24} />
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="sm">{signal.label}</Text>
                    <Text size="xs" c="dimmed">{signal.description}</Text>
                  </div>
                </Group>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Group gap="lg" justify="center" wrap="wrap">
        {trustSignals.map((signal, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Group gap="sm">
              <ThemeIcon color={signal.color} size="lg" variant="light">
                <signal.icon size={20} />
              </ThemeIcon>
              <Stack gap={2}>
                <Text fw={600} size="sm">{signal.label}</Text>
                <Text size="xs" c="dimmed">{signal.description}</Text>
              </Stack>
            </Group>
          </motion.div>
        ))}
      </Group>
    </motion.div>
  );
};

const SecurityBadges = () => {
  const badges = [
    { label: 'SSL Secured', color: 'green' },
    { label: 'PCI Compliant', color: 'blue' },
    { label: 'ISO Certified', color: 'orange' },
    { label: '100% Organic', color: 'teal' }
  ];

  return (
    <Group gap="xs" justify="center">
      {badges.map((badge, index) => (
        <Badge
          key={index}
          variant="light"
          color={badge.color}
          size="sm"
          leftSection={<IconShield size={12} />}
        >
          {badge.label}
        </Badge>
      ))}
    </Group>
  );
};

const QualityCertifications = () => {
  const certifications = [
    {
      icon: IconCertificate,
      title: 'Organic Certified',
      description: 'Government of India Certified Organic',
      color: 'green'
    },
    {
      icon: IconLeaf,
      title: 'Natural & Pure',
      description: 'No artificial additives or preservatives',
      color: 'teal'
    },
    {
      icon: IconAward,
      title: 'Quality Tested',
      description: 'Laboratory tested for purity and quality',
      color: 'blue'
    }
  ];

  return (
    <Group gap="xl" justify="center">
      {certifications.map((cert, index) => (
        <Stack key={index} align="center" gap="xs">
          <ThemeIcon color={cert.color} size="xl" variant="light">
            <cert.icon size={24} />
          </ThemeIcon>
          <Text fw={600} size="sm" ta="center">{cert.title}</Text>
          <Text size="xs" c="dimmed" ta="center" maw={120}>
            {cert.description}
          </Text>
        </Stack>
      ))}
    </Group>
  );
};

export { TrustSignals, SecurityBadges, QualityCertifications };
export default TrustSignals;
