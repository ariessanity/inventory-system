export type DashboardStatistics = {
  totalProducts: number;
  inventoryValue: number;
  salesToday: number;
  soldToday: number;
  chartProductSold: {
    labels: string[];
    data: number[];
  };
  chartSales: {
    labels: string[];
    data: number[];
  };
};
