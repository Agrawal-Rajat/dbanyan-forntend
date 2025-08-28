import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stack,
  Group,
  Text,
  Button,
  Paper,
  Avatar,
  Rating,
  Progress,
  Badge,
  Modal,
  Textarea,
  Select,
  Checkbox,
  Divider,
  Title,
  ActionIcon,
  Anchor,
  Image,
  Grid,
  Alert,
  TextInput
} from '@mantine/core';
import {
  IconStar,
  IconStarFilled,
  IconThumbUp,
  IconThumbDown,
  IconCamera,
  IconCheck,
  IconFlag,
  IconUser,
  IconShield,
  IconTrophy,
  IconFilter,
  IconSortAscending,
  IconSortDescending
} from '@tabler/icons-react';

const ReviewsSection = ({ productId, productName, averageRating = 4.2, totalReviews = 1248 }) => {
  const [reviews, setReviews] = useState([]);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
    verified: false,
    photos: []
  });

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      author: 'Priya S.',
      verified: true,
      rating: 5,
      title: 'Excellent quality, exactly as described!',
      content: 'I\'ve been using this product for 3 months now and I\'m absolutely thrilled with the results. The quality is outstanding and it\'s exactly what I was looking for.',
      date: '2024-01-15',
      helpful: 47,
      photos: ['/images/review1.jpg', '/images/review2.jpg'],
      vine: false,
      topReviewer: false
    },
    {
      id: 2,
      author: 'Raj Kumar M.',
      verified: true,
      rating: 4,
      title: 'Good product, fast delivery',
      content: 'The product arrived quickly and was well-packaged. Quality is good for the price point. Would recommend to others.',
      date: '2024-01-10',
      helpful: 23,
      photos: [],
      vine: true,
      topReviewer: true
    },
    {
      id: 3,
      author: 'Anonymous Customer',
      verified: false,
      rating: 3,
      title: 'Average quality',
      content: 'The product is okay but not exceptional. Had some minor issues with packaging.',
      date: '2024-01-08',
      helpful: 8,
      photos: [],
      vine: false,
      topReviewer: false
    },
    {
      id: 4,
      author: 'Sunita D.',
      verified: true,
      rating: 5,
      title: 'Love it! Will definitely buy again',
      content: 'This has become my go-to product. The customer service was also excellent when I had a question.',
      date: '2024-01-05',
      helpful: 34,
      photos: ['/images/review3.jpg'],
      vine: false,
      topReviewer: false
    }
  ];

  // Rating distribution for summary
  const ratingDistribution = {
    5: 65,
    4: 20,
    3: 8,
    2: 4,
    1: 3
  };

  useEffect(() => {
    // Mock API call to fetch reviews
    setReviews(mockReviews);
  }, [productId]);

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.content.trim()) {
      return;
    }

    const review = {
      id: reviews.length + 1,
      author: 'You',
      verified: true,
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      photos: newReview.photos,
      vine: false,
      topReviewer: false
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 0, title: '', content: '', verified: false, photos: [] });
    setShowWriteReview(false);
  };

  const handleHelpful = (reviewId, isHelpful) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + (isHelpful ? 1 : -1) }
        : review
    ));
  };

  const filteredReviews = reviews
    .filter(review => filterRating === 'all' || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'helpful':
          return b.helpful - a.helpful;
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const ReviewCard = ({ review }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Paper withBorder p="md" mb="md">
        <Stack gap="sm">
          {/* Reviewer Info */}
          <Group justify="space-between">
            <Group gap="sm">
              <Avatar size={40} color="blue">
                <IconUser size={20} />
              </Avatar>
              <Stack gap={2}>
                <Group gap="xs">
                  <Text fw={500} size="sm">{review.author}</Text>
                  {review.verified && (
                    <Badge color="green" size="xs" leftSection={<IconCheck size={10} />}>
                      Verified Purchase
                    </Badge>
                  )}
                  {review.vine && (
                    <Badge color="orange" size="xs">
                      Vine Customer
                    </Badge>
                  )}
                  {review.topReviewer && (
                    <Badge color="purple" size="xs" leftSection={<IconTrophy size={10} />}>
                      Top Reviewer
                    </Badge>
                  )}
                </Group>
                <Text size="xs" c="dimmed">
                  Reviewed on {new Date(review.date).toLocaleDateString('en-IN')}
                </Text>
              </Stack>
            </Group>
            
            <ActionIcon variant="subtle" color="gray">
              <IconFlag size={16} />
            </ActionIcon>
          </Group>

          {/* Rating and Title */}
          <Stack gap="xs">
            <Group gap="xs">
              <Rating value={review.rating} readOnly size="sm" />
              <Text size="sm" fw={600}>{review.title}</Text>
            </Group>
          </Stack>

          {/* Review Content */}
          <Text size="sm" style={{ lineHeight: 1.6 }}>
            {review.content}
          </Text>

          {/* Review Photos */}
          {review.photos.length > 0 && (
            <Group gap="xs">
              {review.photos.map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  width={80}
                  height={80}
                  radius="sm"
                  fit="cover"
                />
              ))}
            </Group>
          )}

          {/* Helpful Actions */}
          <Group justify="space-between">
            <Group gap="lg">
              <Group gap="xs">
                <Text size="sm" c="dimmed">Was this helpful?</Text>
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<IconThumbUp size={14} />}
                  onClick={() => handleHelpful(review.id, true)}
                >
                  Yes ({review.helpful})
                </Button>
                <Button
                  variant="subtle"
                  size="xs"
                  leftSection={<IconThumbDown size={14} />}
                  onClick={() => handleHelpful(review.id, false)}
                >
                  No
                </Button>
              </Group>
            </Group>
            
            <Anchor size="sm" c="dimmed">Report</Anchor>
          </Group>
        </Stack>
      </Paper>
    </motion.div>
  );

  return (
    <Stack gap="lg">
      {/* Reviews Header */}
      <Group justify="space-between">
        <Title order={3}>Customer Reviews</Title>
        <Button 
          onClick={() => setShowWriteReview(true)}
          leftSection={<IconStar size={16} />}
        >
          Write a Review
        </Button>
      </Group>

      {/* Reviews Summary */}
      <Paper withBorder p="lg">
        <Grid>
          <Grid.Col span={4}>
            <Stack align="center" gap="xs">
              <Text size="xl" fw={700}>{averageRating}</Text>
              <Rating value={averageRating} readOnly size="lg" />
              <Text size="sm" c="dimmed">
                {totalReviews.toLocaleString()} global ratings
              </Text>
            </Stack>
          </Grid.Col>
          
          <Grid.Col span={8}>
            <Stack gap="xs">
              {[5, 4, 3, 2, 1].map(rating => (
                <Group key={rating} gap="sm">
                  <Text size="sm" w={20}>{rating}</Text>
                  <IconStar size={14} color="gold" />
                  <Progress
                    value={ratingDistribution[rating]}
                    size="sm"
                    color="yellow"
                    style={{ flex: 1 }}
                  />
                  <Text size="sm" w={30} ta="right">
                    {ratingDistribution[rating]}%
                  </Text>
                </Group>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="md" />

        {/* Quick Stats */}
        <Group gap="xl">
          <Group gap="xs">
            <IconShield size={16} color="green" />
            <Text size="sm">
              <Text span fw={500}>{Math.round(totalReviews * 0.85)}</Text> verified purchases
            </Text>
          </Group>
          <Group gap="xs">
            <IconCamera size={16} color="blue" />
            <Text size="sm">
              <Text span fw={500}>{Math.round(reviews.length * 0.3)}</Text> with photos
            </Text>
          </Group>
        </Group>
      </Paper>

      {/* Filters and Sorting */}
      <Group justify="space-between">
        <Group gap="md">
          <Select
            placeholder="Filter by rating"
            value={filterRating}
            onChange={setFilterRating}
            data={[
              { value: 'all', label: 'All Ratings' },
              { value: '5', label: '5 Stars Only' },
              { value: '4', label: '4 Stars Only' },
              { value: '3', label: '3 Stars Only' },
              { value: '2', label: '2 Stars Only' },
              { value: '1', label: '1 Star Only' }
            ]}
            leftSection={<IconFilter size={16} />}
            w={180}
          />
          
          <Select
            placeholder="Sort reviews"
            value={sortBy}
            onChange={setSortBy}
            data={[
              { value: 'recent', label: 'Most Recent' },
              { value: 'oldest', label: 'Oldest First' },
              { value: 'helpful', label: 'Most Helpful' },
              { value: 'rating-high', label: 'Highest Rated' },
              { value: 'rating-low', label: 'Lowest Rated' }
            ]}
            leftSection={<IconSortAscending size={16} />}
            w={180}
          />
        </Group>
        
        <Text size="sm" c="dimmed">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </Text>
      </Group>

      {/* Reviews List */}
      <AnimatePresence mode="popLayout">
        {filteredReviews.length === 0 ? (
          <Alert>
            <Text>No reviews match your filter criteria.</Text>
          </Alert>
        ) : (
          <div>
            {filteredReviews.slice(0, currentPage * 5).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Load More */}
      {filteredReviews.length > currentPage * 5 && (
        <Group justify="center">
          <Button 
            variant="outline"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Load More Reviews
          </Button>
        </Group>
      )}

      {/* Write Review Modal */}
      <Modal
        opened={showWriteReview}
        onClose={() => setShowWriteReview(false)}
        title="Write a Review"
        size="lg"
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Share your experience with {productName}
          </Text>
          
          <Stack gap="xs">
            <Text size="sm" fw={500}>Overall Rating *</Text>
            <Rating
              value={newReview.rating}
              onChange={(value) => setNewReview(prev => ({ ...prev, rating: value }))}
              size="lg"
            />
          </Stack>
          
          <TextInput
            label="Review Title"
            placeholder="Summarize your experience"
            value={newReview.title}
            onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
          />
          
          <Textarea
            label="Your Review *"
            placeholder="Share your thoughts about the product..."
            value={newReview.content}
            onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
            minRows={4}
            maxRows={8}
          />
          
          <Checkbox
            checked={newReview.verified}
            onChange={(e) => setNewReview(prev => ({ ...prev, verified: e.target.checked }))}
            label="I confirm this is a verified purchase"
          />
          
          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowWriteReview(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={newReview.rating === 0 || !newReview.content.trim()}
            >
              Submit Review
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default ReviewsSection;
