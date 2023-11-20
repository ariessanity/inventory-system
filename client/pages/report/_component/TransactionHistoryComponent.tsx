import TableComponent from "@/components/Table/TableComponent";
import { useFilter } from "@/hooks/useFilter";
import { useGetTransactionHistoryQuery } from "@/store/transaction/api";
import { Box, Flex, Input, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "date-fns";
import ProductSoldModal from "../_modal/ProductSoldModal";
import Product from "@/pages/product";

const formatDate = (isoDate: Date) => {
  const formattedDate = format(new Date(isoDate), "MMM dd, yyyy h:mma");
  return formattedDate;
};

const TransactionHistoryComponent = () => {
  const [productData, setProductData] = useState<Product[]>();
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

  const {
    isOpen: isOpenProductSoldModal,
    onClose: onCloseProductSoldModal,
    onOpen: onOpenProductSoldModal,
  } = useDisclosure();

  const columns = [
    {
      Header: "TRN",
      accessor: "transactionSku",
      width: 150,
      sortDirection:
        sort.accessor === "transactionSku" ? sort.direction : "none",
    },
    {
      Header: "Item",
      accessor: "_id",
      width: 150,
      Cell: ({ cell: { row, value } }: any) => {
        return (
          <Text
            onClick={() => handleViewProductSold(value)}
            cursor={"pointer"}
            color={"teal"}
            textDecor={"underline"}
          >
            Sold ({row.original.cartData.length})
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
      sortDirection:
        sort.accessor === "paymentReceived" ? sort.direction : "none",
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
    },
    {
      Header: "Change",
      accessor: "paymentChange",
      width: 150,
      sortDirection:
        sort.accessor === "paymentChange" ? sort.direction : "none",
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

  const handleViewProductSold = (id: string) => {
    const findProduct = transactionHistory?.transactionHistory.find(
      (transaction) => transaction._id === id
    );

    setProductData(findProduct?.cartData);
    onOpenProductSoldModal();
  };

  return (
    <>
      <Flex mb={4} alignItems={{base: "flex-end", md: "center"}} justifyContent={"flex-end"} flexDirection={{base: 'column', md: 'row'}}>
        <Flex alignItems={"center"} mr={{base: 0, md: 2}}  mb={{base: 2, md: 0}}>
          <Text mr={2} fontWeight={"300"}>
            From
          </Text>
          <Input
            value={filters.startDate || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                page: 1,
                startDate: e.target.value
                  ? format(new Date(e.target.value), "yyyy-MM-dd")
                  : "",
              })
            }
            fontWeight={"300"}
            type="date"
            w={48}
          />
        </Flex>
        <Flex alignItems={"center"}>
          <Text mr={2} fontWeight={"300"}>
            To
          </Text>
          <Input
            value={filters.endDate || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                page: 1,
                endDate: e.target.value
                  ? format(new Date(e.target.value), "yyyy-MM-dd")
                  : "",
              })
            }
            fontWeight={"300"}
            type="date"
            w={48}
          />
        </Flex>
      </Flex>
      <TableComponent
        columns={columns}
        data={transactionHistory?.transactionHistory || []}
        count={transactionHistory?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />

      <ProductSoldModal
        isOpen={isOpenProductSoldModal}
        onClose={onCloseProductSoldModal}
        productData={productData}
      />
    </>
  );
};

export default TransactionHistoryComponent;
