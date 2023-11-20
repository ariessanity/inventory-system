import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import ProductSoldComponent from "./_component/ProductSoldComponent";
import TransactionHistoryComponent from "./_component/TransactionHistoryComponent";
import Head from "next/head";

const Report = () => {
  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <Tabs colorScheme="teal">
        <TabList>
          <Tab fontWeight={"300"}>Product Sold</Tab>
          <Tab fontWeight={"300"}>Transaction History</Tab>
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
