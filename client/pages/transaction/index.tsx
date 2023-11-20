import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import ProductListComponent from "./_component/ProductListComponent";
import OrderComponent from "./_component/OrderComponent";
import Head from "next/head";

const Transaction: NextPage = () => {
  return (
    <>
      <Head>
        <title>Transaction</title>
      </Head>
      <Grid templateColumns="repeat(5, 1fr)" gap={{ base: 0, lg: 4 }}>
        <GridItem colSpan={3} rounded={10} p={{ base: 0, lg: 4 }}>
          <ProductListComponent />
        </GridItem>
        <GridItem colStart={4} colEnd={6} rounded={10} p={4}>
          <OrderComponent />
        </GridItem>
      </Grid>
    </>
  );
};

export default Transaction;
