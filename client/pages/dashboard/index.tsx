import Head from "next/head";
import React from "react";
import StatData from "./_components/StatData";
import { useGetStatisticsQuery } from "@/store/dashboard/api";

const Dashboard = () => {
  const { data: statistics, isError, isLoading } = useGetStatisticsQuery();
  console.log({ statistics });
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <StatData data={statistics} />
    </>
  );
};

export default Dashboard;
