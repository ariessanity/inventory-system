import TableComponent from "@/components/Table/TableComponent";
import { useFilter } from "@/hooks/useFilter";
import { useGetAllProductsQuery } from "@/store/product/api";
import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useRadioGroup,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import AddToCartModal from "../_modal/AddToCartModal";
import { Product } from "@/store/product/types";
import { format } from "date-fns";
import RadioCard from "./RadioCard";
import { categories } from "@/constants";

const ProductListComponent = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productData, setProductData] = useState<Product>();
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
    data: products,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllProductsQuery(searchParams);

  const {
    isOpen: isOpenAddToCartModal,
    onClose: onCloseAddToCartModal,
    onOpen: onOpenAddToCartModal,
  } = useDisclosure();

  const handleFilterByCategory = (value: string) => {
    setFilters({ ...filters, category: value });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "category",
    defaultValue: "All",
    onChange: handleFilterByCategory,
  });

  const group = getRootProps();

  const columns = [
    {
      Header: () => <Text textAlign={"center"}>Action</Text>,
      accessor: "_id",
      width: 100,
      Cell: ({ cell: { value } }: any) => {
        return (
          <IconButton
            size={"xs"}
            ml={2}
            variant={"none"}
            icon={<AiOutlineShoppingCart/>}
            color="primary"
            aria-label="Add to Cart"
            cursor="pointer"
            onClick={() => handleAddToCart(value)}
            fontSize={25}
          />
        );
      },
    },
    {
      Header: "Name",
      accessor: "name",
      sortDirection: sort.accessor === "name" ? sort.direction : "none",
      width: 150,
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "description" ? sort.direction : "none",
      width: 150,
    },
    {
      Header: () => <Text>Price per unit</Text>,
      accessor: "price",
      Cell: ({ cell: { value , row} }: any) => {
        const formattedValue = parseFloat(value).toFixed(2);
        return <Text>{"₱" + formattedValue} / {row.original.unit}</Text>;
      },
      sortDirection: sort.accessor === "price" ? sort.direction : "none",
      width: 150,
    }
  ];

  const handleAddToCart = (id: string) => {
    const productData = products?.products?.find(
      (product: Product) => product._id === id
    );
    onOpenAddToCartModal();
    setProductData(productData);
  };

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

  const handleSearchEnter = (e: any) => {
    if (e.key === "Enter") {
      setFilters({ ...filters, search: searchValue, page: 1 });
      refetch();
    }
  };

  const onSearch = (e: any) => {
    setFilters({ ...filters, search: searchValue, page: 1 });
    refetch();
  };

  const onSearchReset = () => {
    setSearchValue("");
    setFilters({ ...filters, search: "" });
    refetch();
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={5}
       >
        <Text  fontSize={30}>
          {format(new Date(), "EEEE, hh:mm a")}
        </Text>
        <InputGroup
          w={"100%"}
          maxWidth={{ base: "100%", sm: "18.75em" }}
          mb={{ base: 2, sm: 0 }}
        >
          <InputLeftElement cursor={"pointer"} onClick={onSearch}>
            <AiOutlineSearch />
          </InputLeftElement>
          <Input
            value={searchValue || ""}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchEnter}
            type="text"
            placeholder="Search..."
          />
          <InputRightElement cursor={"pointer"} onClick={onSearchReset}>
            <AiOutlineClose />
          </InputRightElement>
        </InputGroup>
      </Stack>

      <HStack
        {...group}
        mb={4}
        overflowX={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {["All", ...categories].map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>

      <TableComponent
        columns={columns}
        data={products?.products || []}
        count={products?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
      <AddToCartModal
        isOpen={isOpenAddToCartModal}
        onClose={onCloseAddToCartModal}
        productData={productData}
        searchReset={onSearchReset}
      />
    </>
  );
};

export default ProductListComponent;
