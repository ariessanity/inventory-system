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
import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  useDeleteCategoryMutation,
  useGetAllCategorysQuery,
} from "@/store/category/api";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Category } from "@/store/category/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useFilter } from "@/hooks/useFilter";
import Head from "next/head";
import CategoryDrawer from "./_component/CategoryDrawer";

const Category: NextPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editData, setEditData] = useState<Category>();
  const [deleteId, setIdDelete] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<any>({
    page: 1,
    limit: 20,
  });
  const [sort, setSort] = useState<any>({
    sortDirection: "none",
    accessor: "",
    direction: "",
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const searchParams = useFilter({ ...filters });
  const {
    data: categories,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllCategorysQuery(searchParams);

  const {
    isOpen: isOpenCategoryDrawer,
    onClose: onCloseCategoryDrawer,
    onOpen: onOpenCategoryDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const handleEditCategory = (id: string) => {
    const categoryData = categories?.categories?.find(
      (category) => category._id === id
    );

    onOpenCategoryDrawer();
    setIsEdit(true);
    setEditData(categoryData);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory(deleteId);
    onCloseDeleteModal();
    onCloseCategoryDrawer();
  };

  const handleOpenModalDeleteCategory = (id: string | undefined) => {
    onOpenDeleteModal();
    setIdDelete(id);
  };

  const handleCreateCategory = () => {
    onOpenCategoryDrawer();
    setIsEdit(false);
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

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      width: 150,
      sortDirection: sort.accessor === "name" ? sort.direction : "none",
    },
    {
      Header: "Description",
      accessor: "description",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "description" ? sort.direction : "none",
    },
    {
      Header: () => (
        <Text textAlign={"end"} mr={1}>
          Action
        </Text>
      ),
      accessor: "_id",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return (
          <Flex justifyContent={"flex-end"}>
            <EditIcon
              mr={5}
              color="primary"
              cursor="pointer"
              onClick={() => handleEditCategory(value)}
            />
            <DeleteIcon
              onClick={() => handleOpenModalDeleteCategory(value)}
              color="red.500"
              cursor="pointer"
            />
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Category Management</title>
      </Head>
      <Text
        display={{ base: "none", xl: "inherit" }}
        fontSize={30}
        color={"gray.600"}
        textAlign={"center"}
      >
        CATEGORY MANAGEMENT
      </Text>
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
          maxWidth={{ base: "100%", sm: "9em" }}
          px={5}
          colorScheme="brand"
          variant="outline"
          onClick={handleCreateCategory}
          leftIcon={<AiOutlinePlusCircle />}
        >
          Add Category
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
            onKeyDown={handleSearchEnter}
            type="text"
            placeholder="Search..."
          />
          <InputRightElement cursor={"pointer"} onClick={onSearchReset}>
            <AiOutlineClose />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <TableComponent
        columns={columns}
        data={categories?.categories || []}
        count={categories?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
      <CategoryDrawer
        isOpen={isOpenCategoryDrawer}
        onClose={onCloseCategoryDrawer}
        isEdit={isEdit}
        editData={editData}
        deleteCategory={handleOpenModalDeleteCategory}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onClick={handleDeleteCategory}
      />
    </>
  );
};

export default Category;
