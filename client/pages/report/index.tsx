import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ProductSoldComponent from "./_component/ProductSoldComponent";
import TransactionHistoryComponent from "./_component/TransactionHistoryComponent";
import Head from "next/head";

const Report = () => {
  return (
    <>
      <Head>
        <title>Reports</title>
      </Head>
      <Text
        display={{ base: "none", xl: "inherit" }}
        fontSize={30}
        color={"gray.600"}
        textAlign={"center"}
      >
        REPORTS
      </Text>
      <Tabs colorScheme="brand">
        <TabList>
          <Tab>Product Sold</Tab>
          <Tab>Transaction History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProductSoldComponent />
          </TabPanel>
          <TabPanel>
            <TransactionHistoryComponent />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Report;
