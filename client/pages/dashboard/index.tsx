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
        textAlign={"center"}
      >
        DASHBOARD
      </Text>
      <StatData data={statistics} isLoading={isLoading} />
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={{ base: "column", md: "row" }}
        p={18}
      >
        <Flex flexDir={"column"} w={{ base: "none", sm: "50%" }} mr={5} mb={{base: 5, sm: 0}}>
          <Text fontSize={24} fontWeight={'semibold'} textAlign={"center"}>
            Product Sold
          </Text>
          <BarChart
            chartData={statistics?.chartProductSold}
            label="Product Sold"
            labelY="unit"
          />
        </Flex>
        <Flex flexDir={"column"} w={{ base: "none", sm: "50%" }}>
          <Text fontSize={24} fontWeight={'semibold'} textAlign={"center"}>
            Product Sales
          </Text>
          <BarChart
            chartData={statistics?.chartSales}
            label="Product Sales"
            labelY="php"
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
