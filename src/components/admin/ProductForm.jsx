// Product Form Component - Handles product creation and editing
import React from 'react';
import {
  Stack,
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Switch,
  Button,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';

const ProductForm = ({ product, onSubmit, onCancel, isLoading = false }) => {
  const form = useForm({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      compareAtPrice: product?.compareAtPrice || 0,
      category: product?.category || '',
      weight: product?.weight || '',
      maxQuantity: product?.maxQuantity || 1,
      isActive: product?.isActive !== false
    },
    validate: {
      name: (value) => !value ? 'Product name is required' : null,
      price: (value) => value <= 0 ? 'Price must be greater than 0' : null,
      category: (value) => !value ? 'Category is required' : null
    }
  });

  const handleSubmit = (values) => {
    onSubmit(values);
    form.reset();
  };

  const categories = [
    { value: 'powder', label: 'Powder' },
    { value: 'paste', label: 'Paste' },
    { value: 'leaves', label: 'Leaves' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'oil', label: 'Oil' }
  ];

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Product Name"
          placeholder="Enter product name"
          {...form.getInputProps('name')}
          required
        />
        
        <Textarea
          label="Description"
          placeholder="Enter product description"
          rows={3}
          {...form.getInputProps('description')}
        />
        
        <Group grow>
          <NumberInput
            label="Price (₹)"
            placeholder="0.00"
            min={0}
            step={0.01}
            {...form.getInputProps('price')}
            required
          />
          
          <NumberInput
            label="Compare At Price (₹)"
            placeholder="0.00"
            min={0}
            step={0.01}
            {...form.getInputProps('compareAtPrice')}
          />
        </Group>
        
        <Group grow>
          <Select
            label="Category"
            placeholder="Select category"
            data={categories}
            {...form.getInputProps('category')}
            required
          />
          
          <TextInput
            label="Weight"
            placeholder="e.g., 250g, 500ml"
            {...form.getInputProps('weight')}
          />
        </Group>
        
        <NumberInput
          label="Maximum Quantity per Order"
          min={1}
          {...form.getInputProps('maxQuantity')}
        />
        
        <Switch
          label="Product is active"
          {...form.getInputProps('isActive', { type: 'checkbox' })}
        />
        
        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {product ? 'Update Product' : 'Create Product'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductForm;
