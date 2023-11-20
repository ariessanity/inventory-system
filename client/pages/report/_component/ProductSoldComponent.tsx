import TableComponent from "@/components/Table/TableComponent";
import { useFilter } from "@/hooks/useFilter";
import { useGetProductSoldQuery } from "@/store/transaction/api";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  filter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "date-fns";
import { AiOutlineExport } from "react-icons/ai";

const formatDate = (isoDate: Date) => {
  const formattedDate = format(new Date(isoDate), "MMM dd, yyyy h:mma");
  return formattedDate;
};

const ProductSoldComponent = () => {
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
    data: productSold,
    refetch,
    isFetching,
    isLoading,
  } = useGetProductSoldQuery(searchParams);

  const columns = [
    {
      Header: "TRN",
      accessor: "transactionSku",
      width: 150,
      sortDirection:
        sort.accessor === "transactionSku" ? sort.direction : "none",
    },
    {
      Header: "SKU",
      accessor: "sku",
      width: 150,
      sortDirection: sort.accessor === "sku" ? sort.direction : "none",
    },
    {
      Header: "Name",
      accessor: "name",
      width: 150,
      sortDirection: sort.accessor === "name" ? sort.direction : "none",
    },
    {
      Header: () => <Text>Price per unit</Text>,
      accessor: "price",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
      sortDirection: sort.accessor === "price" ? sort.direction : "none",
    },
    {
      Header: "Unit",
      accessor: "unit",
      width: 100,
      sortDirection: sort.accessor === "unit" ? sort.direction : "none",
    },
    {
      Header: () => <Text>Qty</Text>,
      accessor: "quantity",
      width: 80,
      Cell: ({ cell: { value } }: any) => <Text>{value}</Text>,
      sortDirection: sort.accessor === "quantity" ? sort.direction : "none",
    },
    {
      Header: () => <Text>Total</Text>,
      accessor: "total",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue}</Text>;
      },
      sortDirection: sort.accessor === "total" ? sort.direction : "none",
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
    <>
      <Flex mb={4} alignItems={"center"} justifyContent={"space-between"}>
        <Flex>
          <Button fontWeight={"300"} variant={"outline"} colorScheme="teal">
            <AiOutlineExport /> Export
          </Button>
        </Flex>
        <Flex
          alignItems={{ base: "flex-end", md: "center" }}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Flex
            alignItems={"center"}
            mr={{ base: 0, md: 2 }}
            mb={{ base: 2, md: 0 }}
          >
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
      </Flex>
      <TableComponent
        columns={columns}
        data={productSold?.productSold || []}
        count={productSold?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </>
  );
};

export default ProductSoldComponent;
