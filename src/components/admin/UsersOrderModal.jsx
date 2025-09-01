import {
  Modal,
  Text,
  Image,
  Group,
  Title,
  Stack,
  Divider,
  Paper,
  Box,
} from "@mantine/core";
import { IconMapPin, IconMail, IconUser, IconPhone } from "@tabler/icons-react";
import { API_URL } from "../../NwConfig";
import { useEffect, useState } from "react";
import GetOrderById from "../../API_FILES/order_apis/GetOrderById";

export default function UserOrdersModal({ opened, onClose, user }) {
//   if (!orders || orders.length === 0) return null;
const [orders,setOrders]=useState([])
// console.log(user)
async function getorderbyuserid() {
    const res=await GetOrderById(user.id)
    // console.log(res)
    if(res?.data){
        setOrders(res?.data)
    }
    
}
useEffect(()=>{
getorderbyuserid()
},[])
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>User Orders</Title>}
      size="lg"
      centered
      scrollAreaComponent="div" // enables scrolling for large order lists
    >
      <Stack gap="lg">
        {/* User Info */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Stack gap="xs">
            <Group>
              <IconUser size={18} />
              <Text fw={600}>{user?.full_name}</Text>
            </Group>
            <Group>
              <IconMail size={18} />
              <Text>{user?.email}</Text>
            </Group>
            <Group>
              <IconPhone size={18} />
              <Text>{user?.mobile_number}</Text>
            </Group>
            <Group align="flex-start">
              <IconMapPin size={18} />
              <Text>
                {user?.city}, {user?.state}, {user?.full_address} -{" "}
                {user?.pincode}
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Divider label="Orders" />

        {/* Orders List */}
        {orders.map((order, index) => (
          <Paper
            key={order.order_id || index}
            withBorder
            p="md"
            radius="md"
            shadow="xs"
          >
            <Group align="flex-start" gap="lg">
              {/* Product Image */}
              <Box
                w={120}
                h={120}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #eee",
                }}
              >
                <Image
                  src={`${API_URL}/${order?.products?.images?.[0]}`}
                  alt={order?.products?.name}
                  height={120}
                  fit="cover"
                />
              </Box>

              {/* Order Info */}
              <Stack gap={4}>
                <Text fw={600} fz="md">
                  {order?.products?.name}
                </Text>
                <Text c="dimmed" fz="sm">
                  Order ID: {order?.order_id}
                </Text>
                <Text fw={500} fz="sm">
                  Status: {order?.status}
                </Text>
                <Text fw={500} fz="sm">
                  Price: ₹{order?.amount}
                </Text>
              </Stack>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Modal>
  );
}
