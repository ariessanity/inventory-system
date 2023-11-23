import * as React from "react";
import { Container, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { DashboardStatistics } from "@/store/dashboard/types";

interface StatData {
  data: DashboardStatistics | undefined;
}

const StatData: React.FC<StatData> = ({ data }) => {
  return (
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={5} mb={4}>
        <Box p={5} boxShadow="md" rounded="md" borderWidth={1}>
          <Text fontWeight="semibold" fontSize="x-large">
            ₱{data?.salesToday.toFixed()}
          </Text>
          <Text fontWeight="300">Sales Today</Text>
        </Box>

        <Box p={5} boxShadow="md" rounded="md" borderWidth={1}>
          <Text fontWeight="semibold" fontSize="x-large">
            {data?.soldToday}
          </Text>
          <Text fontWeight="300">Sold Today</Text>
        </Box>

        <Box p={5} boxShadow="md" rounded="md" borderWidth={1}>
          <Text fontWeight="semibold" fontSize="x-large">
            {data?.totalProducts}
          </Text>
          <Text fontWeight="300">Total Products</Text>
        </Box>

        <Box p={5} boxShadow="md" rounded="md" borderWidth={1}>
          <Text fontWeight="semibold" fontSize="x-large">
            ₱{data?.inventoryValue.toFixed()}
          </Text>
          <Text fontWeight="300">Inventory Value</Text>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default StatData;
