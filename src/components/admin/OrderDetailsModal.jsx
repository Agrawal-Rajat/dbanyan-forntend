import {
  Modal,
  Text,
  Image,
  Select,
  Group,
  Title,
  Stack,
  Divider,
  Paper,
  Button,
  Box,
  Loader,
} from "@mantine/core";
import { IconMapPin, IconMail, IconUser, IconPhone } from "@tabler/icons-react";
import { API_URL } from "../../NwConfig";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import EditOrderStatus from "../../API_FILES/order_apis/EditOrderStatus";
import CustomLoader from "../../Loader/CustomLoader";
export default function OrderDetailsModal({
  opened,
  onClose,
  order,
  onStatusChange,
}) {
  const statuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
  ];
const [selectedStatus, setSelectedStatus] = useState(order.status);
const [loading,setLoading]=useState(false)
  if (!order) return null;
  const onUpdateStatus=async()=>{
    setLoading(true)
const payload = {
      order_id: order.order_id, 
      status: selectedStatus,  
    };
    const res=await EditOrderStatus(payload)
    if(res?.message==="Status Updated"){
        setLoading(false)
        toast.success(res?.message,{
            position:"top-center"
        })
        setTimeout(()=>{
            onClose()
        },2000)
    }
    else{
            onClose()
    }
    // console.log("Update Payload:", payload);
  }
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Order Details</Title>}
      size="lg"
      centered
    >
        

{
  loading && (
    <Box
      pos="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="rgba(255,255,255,0.7)" // semi-transparent overlay
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000, // make sure it's above modal content
      }}
    >
      <Loader size="lg" color="blue" />
    </Box>
  )
}

        <ToastContainer/>
      <Stack gap="md">
        {/* Product Section */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Group align="flex-start" gap="lg">
            <Box
              w={180}
              h={180}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >
              <Image
                src={`${API_URL}/${order?.products?.images?.[0]}`}
                alt={order?.products?.name}
                height={180}
                fit="cover"
              />
            </Box>

            <Stack gap={4} justify="center">
              <Text fw={600} fz="lg">
                {order.products.name}
              </Text>
              <Text c="dimmed" fz="sm">
                Order ID: {order.order_id}
              </Text>
              <Text fw={500} fz="md">
                Price: ₹{order.amount}
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Divider label="Customer Details" />

        {/* User Info */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Stack gap="xs">
            <Group>
              <IconUser size={18} />
              <Text>{order.users.full_name}</Text>
            </Group>
            <Group>
              <IconMail size={18} />
              <Text>{order.users.email}</Text>
            </Group>
            <Group>
              <IconPhone size={18} />
              <Text>{order.users.mobile_number}</Text>
            </Group>
            <Group align="flex-start">
              <IconMapPin size={18} />
              <Text>
                {order?.users?.city}, {order?.users?.state},{" "}
                {order?.users?.full_address} - {order?.users?.pincode}
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Divider label="Order Status [Update Order Status]" />

        {/* Status Section */}
        <Paper  withBorder p="md" radius="md" shadow="xs">
          <Group  grow>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              data={statuses.map((s) => ({ value: s, label: s }))}
              withinPortal
              
            />
            <Button onClick={onUpdateStatus} variant="filled" color="blue">
              Update Status
            </Button>
          </Group>
        </Paper>
      </Stack>
    </Modal>
  );
}
