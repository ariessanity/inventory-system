import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import ProductListComponent from "./_component/ProductListComponent";
import OrderComponent from "./_component/OrderComponent";

const Transaction: NextPage = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colSpan={3} h={"95vh"} rounded={10} p={4}>
        <ProductListComponent />
      </GridItem>
      <GridItem
        colStart={4}
        colEnd={6}
        h={"95vh"}
        // bg="gray.100"
        rounded={10}
        p={4}
      >
        <OrderComponent />
      </GridItem>
    </Grid>
  );
};

export default Transaction;
