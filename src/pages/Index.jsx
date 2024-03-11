import React, { useState } from "react";
import { Box, Flex, Heading, Text, Button, VStack, HStack, Select, useToast, Badge, Divider, SimpleGrid } from "@chakra-ui/react";
import { FaMotorcycle, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";

// Datos simulados
const initialOrders = [
  { id: 1, name: "Pizza Margarita", status: "pending" },
  { id: 2, name: "Pizza Pepperoni", status: "pending" },
  // Más pedidos...
];

const initialRiders = [
  { id: 1, name: "Juan Perez", availability: true, vehicle: "Moto" },
  { id: 2, name: "Ana Gómez", availability: false, vehicle: "Bicicleta" },
  // Más repartidores...
];

const Index = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [riders, setRiders] = useState(initialRiders);
  const [selectedRider, setSelectedRider] = useState("");
  const toast = useToast();

  const assignOrder = (orderId) => {
    if (!selectedRider) {
      toast({
        title: "Error",
        description: "Debes seleccionar un repartidor para asignar el pedido.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Asignar pedido al repartidor seleccionado (simulado)
    const orderIndex = orders.findIndex((order) => order.id === orderId);
    if (orderIndex !== -1) {
      const newOrders = [...orders];
      newOrders[orderIndex].status = "assigned";
      setOrders(newOrders);

      // Notificar al repartidor y al administrador (simulado)
      toast({
        title: "Pedido Asignado",
        description: `El pedido ${orderId} ha sido asignado a ${selectedRider}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Sistema de Asignación de Pedidos</Heading>

      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <Heading size="md" mb={4}>
            Lista de Pedidos
          </Heading>
          <VStack align="stretch" spacing={3}>
            {orders.map((order) => (
              <Flex key={order.id} justify="space-between" align="center" p={3} boxShadow="md">
                <Text>
                  Pedido #{order.id}: {order.name}
                </Text>
                <Badge colorScheme={order.status === "pending" ? "yellow" : "green"}>{order.status === "pending" ? "Pendiente" : "Asignado"}</Badge>
                {order.status === "pending" && (
                  <Button leftIcon={<FaCheck />} colorScheme="blue" onClick={() => assignOrder(order.id)}>
                    Asignar
                  </Button>
                )}
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Repartidores
          </Heading>
          <Select placeholder="Seleccionar repartidor" onChange={(e) => setSelectedRider(e.target.value)}>
            {riders.map((rider) => (
              <option key={rider.id} value={rider.name} disabled={!rider.availability}>
                {rider.name} - {rider.vehicle} {rider.availability ? "" : "(No disponible)"}
              </option>
            ))}
          </Select>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Index;
