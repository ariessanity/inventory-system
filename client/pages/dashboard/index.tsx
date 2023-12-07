import Head from "next/head";
import React from "react";
import StatData from "./_components/StatData";
import { useGetStatisticsQuery } from "@/store/dashboard/api";
import BarChart from "./_components/BarChart";
import { Box, Flex, Text } from "@chakra-ui/react";

const Dashboard = () => {
  const { data: statistics, isError, isLoading } = useGetStatisticsQuery();
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Text
        display={{ base: "none", xl: "inherit" }}
        fontSize={30}
        color={"gray.600"}
        textAlign={'center'}
      >
        DASHBOARD
      </Text>
      <StatData data={statistics} isLoading={isLoading} />
      <Flex
        px={5}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={'column'}
      >
        <Box w={"100%"}>
          <Text fontSize={24} ml={14} mb={2}>
            Product Sold
          </Text>
          <BarChart
            chartData={statistics?.chartProductSold}
            label="Product Sold"
            labelY="units"
          />
        </Box>
        <Box w={"100%"}>
          <Text fontSize={24} pt={5} ml={14} mb={2}>
            Product Sales
          </Text>
          <BarChart
            chartData={statistics?.chartSales}
            label="Product Sales"
            labelY="php"
          />
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
