import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import ProductSoldComponent from "./_component/ProductSoldComponent";
import TransactionHistoryComponent from "./_component/TransactionHistoryComponent";

const Report = () => {
  return (
    <Tabs variant="enclosed" colorScheme="teal">
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
  );
};

export default Report;
