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
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
export default function UserDetailsModal({
  opened,
  onClose,
  user,
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
const [loading,setLoading]=useState(false)
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>User Details</Title>}
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

      <Stack gap="md">
       

        {/* User Info */}
        <Paper withBorder p="md" radius="md" shadow="xs">
          <Stack gap="xs">
            <Group>
              <IconUser size={18} />
              <Text>{user.full_name}</Text>
            </Group>
            <Group>
              <IconMail size={18} />
              <Text>{user.email}</Text>
            </Group>
            <Group>
              <IconPhone size={18} />
              <Text>{user.mobile_number}</Text>
            </Group>
            <Group align="flex-start">
              <IconMapPin size={18} />
              <Text>
                {user?.city}, {user?.state},{" "}
                {user?.full_address} - {user?.pincode}
              </Text>
            </Group>
          </Stack>
        </Paper>

      </Stack>
    </Modal>
  );
}
