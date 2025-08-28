import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  Badge,
  Stack,
  Rating,
  Tooltip,
  ActionIcon,
  NumberFormatter
} from '@mantine/core';
import {
  IconShoppingCart,
  IconHeart,
  IconStar,
  IconTruck,
  IconShield,
  IconEye,
  IconStarFilled,
  IconGitCompare
} from '@tabler/icons-react';
import { addToCart } from '../../store/slices/cartSlice';
import { addNotification } from '../../store/slices/notificationSlice';

const ProfessionalProductCard = ({ 
  product, 
  showQuickView = true, 
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  onAddToComparison,
  isInWishlist = false,
  isInComparison = false,
  viewMode = 'grid'
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);

  // Calculate rating (mock for now - in real app, get from reviews)
  const rating = 4.2; // This would come from actual reviews
  const reviewCount = 127; // This would come from actual reviews

  // Calculate savings
  const savings = product.compare_price ? product.compare_price - product.price : 0;
  const savingsPercent = savings > 0 ? Math.round((savings / product.compare_price) * 100) : 0;

  // Trust signals
  const getTrustBadges = () => {
    const badges = [];
    
    if (product.is_featured) {
      badges.push({ text: "Dbanyan's Choice", color: "orange", icon: IconStar });
    }
    
    if (product.stock_quantity > 50) {
      badges.push({ text: "In Stock", color: "green" });
    } else if (product.stock_quantity > 0) {
      badges.push({ text: "Limited Stock", color: "yellow" });
    }
    
    if (product.price >= 1000) {
      badges.push({ text: "Free Delivery", color: "blue", icon: IconTruck });
    }
    
    return badges;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    dispatch(addToCart({
      productId: product.product_id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || '/images/moringaPowderPic.jpg'
    }));

    dispatch(addNotification({
      type: 'cart-add',
      message: `${product.name} added to cart`,
      duration: 3000
    }));

    console.log('🛒 [PRODUCT CARD] Added to cart:', product.name);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    
    dispatch(addNotification({
      type: 'wishlist',
      message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      duration: 2000
    }));
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/products/${product.product_id}`);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/products/${product.product_id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          cursor: 'pointer',
          height: '100%',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            borderColor: '#2C5F2D'
          }
        }}
        onClick={handleCardClick}
      >
        <Card.Section style={{ position: 'relative' }}>
          {/* Wishlist Button */}
          <ActionIcon
            variant={isInWishlist ? 'filled' : 'subtle'}
            color={isInWishlist ? 'red' : 'gray'}
            size="sm"
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist();
            }}
          >
            <IconHeart size={16} />
          </ActionIcon>

          {/* Savings Badge */}
          {savingsPercent > 0 && (
            <Badge
              color="red"
              variant="filled"
              size="sm"
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 2
              }}
            >
              -{savingsPercent}%
            </Badge>
          )}

          {/* Product Image */}
          <Image
            src={product.images?.[0] || '/images/moringaPowderPic.jpg'}
            alt={product.name}
            height={220}
            fit="cover"
            onLoad={() => setImageLoading(false)}
            fallbackSrc="/images/moringaPowderPic.jpg"
          />

          {/* Quick View Overlay */}
          {showQuickView && (
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                opacity: 0,
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 1 }
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
            >
              <ActionIcon
                variant="filled"
                color="dark"
                size="lg"
                onClick={handleQuickView}
              >
                <IconEye size={18} />
              </ActionIcon>
            </div>
          )}
        </Card.Section>

        <Stack gap="sm" mt="md">
          {/* Trust Badges */}
          <Group gap="xs">
            {getTrustBadges().map((badge, index) => (
              <Badge
                key={index}
                variant="light"
                color={badge.color}
                size="xs"
                leftSection={badge.icon && <badge.icon size={10} />}
              >
                {badge.text}
              </Badge>
            ))}
          </Group>

          {/* Product Name */}
          <Text fw={600} size="sm" lineClamp={2} style={{ minHeight: '40px' }}>
            {product.name}
          </Text>

          {/* Category */}
          <Text size="xs" c="dimmed">
            {product.category}
          </Text>

          {/* Rating */}
          <Group gap="xs">
            <Group gap={2}>
              {[...Array(5)].map((_, i) => (
                <IconStarFilled
                  key={i}
                  size={12}
                  color={i < Math.floor(rating) ? '#ffd43b' : '#e9ecef'}
                />
              ))}
            </Group>
            <Text size="xs" c="dimmed">
              {rating} ({reviewCount})
            </Text>
          </Group>

          {/* Pricing */}
          <Stack gap={2}>
            <Group align="baseline" gap="xs">
              <Text fw={700} size="lg" c="dark">
                <NumberFormatter
                  prefix="₹"
                  value={product.price}
                  thousandSeparator
                />
              </Text>
              {product.compare_price && product.compare_price > product.price && (
                <Text size="sm" td="line-through" c="dimmed">
                  <NumberFormatter
                    prefix="₹"
                    value={product.compare_price}
                    thousandSeparator
                  />
                </Text>
              )}
            </Group>
            
            {savings > 0 && (
              <Text size="xs" c="green" fw={500}>
                Save ₹{savings}
              </Text>
            )}
          </Stack>

          {/* Delivery Information */}
          <Group gap="xs">
            <IconTruck size={14} color="#2C5F2D" />
            <Text size="xs" c="dimmed">
              {product.price >= 1000 ? 'FREE delivery' : 'Delivery ₹50'}
            </Text>
          </Group>

          {/* Prime/Trust Indicators */}
          <Group gap="xs">
            <IconShield size={14} color="#2C5F2D" />
            <Text size="xs" c="dimmed">
              Organic Certified • 100% Natural
            </Text>
          </Group>

          {/* Quick Actions */}
          <Group gap="xs" grow>
            <Tooltip label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
              <ActionIcon
                variant={isInWishlist ? "filled" : "outline"}
                color="red"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleWishlist) onToggleWishlist();
                }}
              >
                <IconHeart size={16} />
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label={isInComparison ? "In comparison" : "Add to compare"}>
              <ActionIcon
                variant={isInComparison ? "filled" : "outline"}
                color="blue"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToComparison) onAddToComparison();
                }}
                disabled={isInComparison}
              >
                <IconGitCompare size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>

          {/* Action Button */}
          <Button
            fullWidth
            variant="light"
            color="green"
            leftSection={<IconShoppingCart size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(1);
              } else {
                handleAddToCart();
              }
            }}
            disabled={product.stock_quantity === 0}
            style={{
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
          >
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default ProfessionalProductCard;
