export type DashboardStatistics = {
  totalProducts: number;
  inventoryValue: number;
  salesToday: number;
  soldToday: number;
  chartProductSold: DataLabels;
  chartSales: DataLabels;
};

export type DataLabels = {
  labels: string[];
  data: number[];
};
