import TableComponent from "@/components/Table/TableComponent";
import { useFilter } from "@/hooks/useFilter";
import { useGetTransactionHistoryQuery } from "@/store/transaction/api";
import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "date-fns";

const formatDate = (isoDate: Date) => {
  const formattedDate = format(new Date(isoDate), "MMM dd, yyyy h:mma");
  return formattedDate;
};

const TransactionHistoryComponent = () => {
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 20,
  });
  const [sort, setSort] = useState<any>({
    sortDirection: "none",
    accessor: "",
    direction: "",
  });

  const searchParams = useFilter({ ...filters });
  const {
    data: transactionHistory,
    refetch,
    isFetching,
    isLoading,
  } = useGetTransactionHistoryQuery(searchParams);

  const columns = [
    {
      Header: "TRN",
      accessor: "transactionSku",
      width: 150,
      sortDirection: sort.accessor === "transactionSku" ? sort.direction : "none",
    },
    {
      Header: "Item",
      accessor: "cartData",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return (
          <Text cursor={'pointer'}  color={'teal'} textDecor={"underline"}>
            Items Sold ({value.length})
          </Text>
        );
      },
    },
    {
      Header: "Total Price",
      accessor: "totalPrice",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
      sortDirection: sort.accessor === "totalPrice" ? sort.direction : "none",
    },
    {
      Header: "Cash",
      accessor: "paymentReceived",
      width: 150,
      sortDirection: sort.accessor === "paymentReceived" ? sort.direction : "none",
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
    },
    {
      Header: "Change",
      accessor: "paymentChange",
      width: 150,
      sortDirection: sort.accessor === "paymentChange" ? sort.direction : "none",
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
    },
    {
      Header: () => <Text>Cashier</Text>,
      accessor: "cashierName",
      width: 120,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "cashierName" ? sort.direction : "none",
    },
    {
      Header: () => <Text>Customer</Text>,
      accessor: "customerName",
      width: 120,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "customerName" ? sort.direction : "none",
    },
    {
      Header: () => <Text>Purchase Date</Text>,
      accessor: "createdAt",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{formatDate(value)}</Text>;
      },
      sortDirection: sort.accessor === "createdAt" ? sort.direction : "none",
    },
  ];

  const handlePageChange = (pageIndex: number) => {
    setFilters({ ...filters, page: pageIndex });
    refetch();
  };

  const handleSortChange = (column: any) => {
    switch (column.sortDirection) {
      case "none":
        setSort({ direction: "asc", accessor: column.id });
        setFilters({ ...filters, sortBy: column.id, sortOrder: "asc" });
        break;
      case "asc":
        setSort({ direction: "desc", accessor: column.id });
        setFilters({ ...filters, sortBy: column.id, sortOrder: "desc" });
        break;
      case "desc":
        setSort({ direction: "none", accessor: column.id });
        setFilters({ ...filters, sortBy: "", sortOrder: "" });
        break;
    }
  };

  return (
    <div>
      <TableComponent
        columns={columns}
        data={transactionHistory?.transactionHistory || []}
        count={transactionHistory?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
};

export default TransactionHistoryComponent;
