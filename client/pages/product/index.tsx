import TableComponent from "@/components/Table/TableComponent";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/store/product/api";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ProductDrawer from "./_component/ProductDrawer";
import { Product } from "@/store/product/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useFilter } from "@/hooks/useFilter";
import Head from "next/head";

const Product: NextPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editData, setEditData] = useState<Product>();
  const [deleteId, setIdDelete] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [deleteProduct] = useDeleteProductMutation();

  const {
    data: products,
    refetch,
    isLoading,
  } = useGetAllProductsQuery(searchValue);

  const {
    isOpen: isOpenProductDrawer,
    onClose: onCloseProductDrawer,
    onOpen: onOpenProductDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const handleEditProduct = useCallback(
    (id: string) => {
      const productData = products?.find((product) => product._id === id);

      onOpenProductDrawer();
      setIsEdit(true);
      setEditData(productData);
    },
    [products, onOpenProductDrawer, setIsEdit, setEditData]
  );

  const handleDeleteProduct = async () => {
    await deleteProduct(deleteId);
    onCloseDeleteModal();
  };

  const handleCreateProduct = () => {
    onOpenProductDrawer();
    setIsEdit(false);
  };

  const onSearch = () => {
    refetch();
  };

  const onSearchReset = () => {
    setSearchValue("");
  };

  const columns = useMemo(
    () => [
      {
        Header: "SKU",
        accessor: "sku",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ cell: { value } }: any) => {
          return <Text>{value ? value : "-"}</Text>;
        },
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: ({ cell: { value } }: any) => {
          return <Text>{value}</Text>;
        },
      },
      {
        Header: () => <Text textAlign={"center"}>Price per unit</Text>,
        accessor: "price",
        Cell: ({ cell: { value } }: any) => (
          <Text textAlign={"center"}>{"₱" + value}</Text>
        ),
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: () => <Text textAlign={"center"}>Quantity</Text>,
        accessor: "quantity",
        Cell: ({ cell: { value } }: any) => (
          <Text textAlign={"center"}>{value}</Text>
        ),
      },
      {
        Header: () => <Text textAlign={"center"}>Total</Text>,
        accessor: "total",
        Cell: ({ cell: { value } }: any) => (
          <Text textAlign={"center"}>{"₱" + value}</Text>
        ),
      },
      {
        Header: () => <Text textAlign={"center"}>Action</Text>,
        accessor: "_id",
        Cell: ({ cell: { value } }: any) => {
          return (
            <Flex justifyContent={"center"}>
              <EditIcon
                mr={5}
                color="teal.500"
                cursor="pointer"
                onClick={() => handleEditProduct(value)}
              />
              <DeleteIcon
                onClick={() => {
                  onOpenDeleteModal();
                  setIdDelete(value);
                }}
                color="red.500"
                cursor="pointer"
              />
            </Flex>
          );
        },
      },
    ],
    [handleEditProduct, onOpenDeleteModal]
  );

  return (
    <Flex flexDirection={"column"} justifyContent={"space-between"}>
      <Head>
        <title>Product List</title>
      </Head>
      <Center
        fontSize={20}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily={"inherit"}
      >
        PRODUCT LIST
      </Center>
      <Flex
        flexDirection={{
          base: "column-reverse",
          sm: "row",
        }}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
      >
        <Button
          w={"100%"}
          maxWidth={{ base: "100%", sm: "8em" }}
          fontWeight={"500"}
          colorScheme="gray"
          variant="solid"
          onClick={handleCreateProduct}
        >
          Add Product
        </Button>
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
            type="text"
            placeholder="Search..."
          />
          <InputRightElement cursor={"pointer"} onClick={onSearchReset}>
            <AiOutlineClose />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <TableComponent columns={columns} data={products || []} />
      <ProductDrawer
        isOpen={isOpenProductDrawer}
        onClose={onCloseProductDrawer}
        isEdit={isEdit}
        editData={editData}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onClick={handleDeleteProduct}
      />
    </Flex>
  );
};

export default Product;
