// Product Table Component - Displays products in a table format
import React from 'react';
import {
  Table,
  Badge,
  ActionIcon,
  Group,
  Text,
  Menu
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconDots
} from '@tabler/icons-react';

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  const getBadgeColor = (category) => {
    const colors = {
      powder: 'green',
      paste: 'blue',
      leaves: 'teal',
      seeds: 'orange',
      oil: 'yellow'
    };
    return colors[category] || 'gray';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Price</Table.Th>
          <Table.Th>Stock</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={6} className="text-center py-8">
              <Text c="dimmed">No products found. Create your first product to get started.</Text>
            </Table.Td>
          </Table.Tr>
        ) : (
          products.map((product) => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <div>
                  <Text fw={500}>{product.name}</Text>
                  <Text size="sm" c="dimmed">
                    {product.weight}
                  </Text>
                </div>
              </Table.Td>
              <Table.Td>
                <Badge color={getBadgeColor(product.category)} variant="light">
                  {product.category}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text fw={500}>{formatPrice(product.price)}</Text>
                {product.compareAtPrice > product.price && (
                  <Text size="sm" c="dimmed" td="line-through">
                    {formatPrice(product.compareAtPrice)}
                  </Text>
                )}
              </Table.Td>
              <Table.Td>
                <Badge color={product.stock > 10 ? 'green' : product.stock > 0 ? 'yellow' : 'red'}>
                  {product.stock || 0} units
                </Badge>
              </Table.Td>
              <Table.Td>
                <Badge color={product.isActive ? 'green' : 'red'} variant="light">
                  {product.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Group gap={4}>
                  <ActionIcon
                    variant="subtle"
                    color="blue"
                    onClick={() => onView(product)}
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => onEdit(product)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDots size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={14} />}
                        onClick={() => onDelete(product.id)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};

export default ProductTable;
