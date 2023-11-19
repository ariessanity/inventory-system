import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import ProductListComponent from "./_component/ProductListComponent";
import OrderComponent from "./_component/OrderComponent";

const Transaction: NextPage = () => {
  const isLargeScreen = useBreakpointValue({ base: false, xl: true });

  return (
    <Flex flexDirection={isLargeScreen ? "row" : "column"}>
      <Box flex={isLargeScreen ? 3 : 1} p={4} minWidth={0}>
        <ProductListComponent />
      </Box>
      {isLargeScreen && (
        <Box flex={1} rounded={10} p={4} minWidth={0}>
          <OrderComponent />
        </Box>
      )}
    </Flex>
  );
};

// const Transaction: NextPage = () => {
//   return (
//     <Grid templateColumns="repeat(5, 1fr)" gap={4} >
//       <GridItem colSpan={3} rounded={10} p={4}>
//         <ProductListComponent />
//       </GridItem>
//       <GridItem
//         colStart={4}
//         colEnd={6}
//         // h={"95vh"}
//         // bg="gray.100"
//         rounded={10}
//         p={4}
//       >
//         <OrderComponent />
//       </GridItem>
//     </Grid>
//   );
// };

// const Transaction: NextPage = () => {
//   const isLargeScreen = useBreakpointValue({ base: false, lg: true });

//   return (
//     <Grid templateColumns={isLargeScreen ? "repeat(5, 1fr)" : "1fr" } gap={4}>
//       <GridItem colSpan={isLargeScreen ? 3 : 1} rounded={10} p={4}>
//         <ProductListComponent />
//       </GridItem>
//       {isLargeScreen && (
//         <GridItem colStart={4} colEnd={6} rounded={10} p={4}>
//           <OrderComponent />
//         </GridItem>
//       )}
//     </Grid>
//   );
// };

// const Transaction: NextPage = () => {
//   return (
//     <Grid templateColumns="repeat(5, 1fr)" gap={4}>
//       <GridItem colSpan={3} h={"95vh"} rounded={10} p={4}>
//         <ProductListComponent />
//       </GridItem>
//       <GridItem
//         colStart={4}
//         colEnd={6}
//         h={"95vh"}
//         // bg="gray.100"
//         rounded={10}
//         p={4}
//       >
//         <OrderComponent />
//       </GridItem>
//     </Grid>
//   );

export default Transaction;
