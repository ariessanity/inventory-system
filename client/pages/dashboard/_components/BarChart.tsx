import { DashboardStatistics } from "@/store/dashboard/types";
import { Box, Center } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Tooltip
);

interface BarChartProps {
  chartData:
    | {
        labels: string[];
        data: number[];
      }
    | undefined;

  label: string;
  labelY: string;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, label, labelY }) => {
  const currentMonth = format(new Date(), "MMMM");

  const data = {
    labels: chartData?.labels,
    datasets: [
      {
        label: label,
        data: chartData?.data,
        backgroundColor: ["teal"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: `${labelY}`,
          font: {
            size: 14,
          },
        },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return value > 1000000 ? value / 1e6 + "M" : value;
          },
        },
      },
      x: {
        display: true,
        title: {
          display: true,
          text: `${currentMonth}`,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Bar height={"60vh"} options={options} data={data} />;
};

export default BarChart;
