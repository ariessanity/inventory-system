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
  useDeleteSupplierMutation,
  useGetAllSuppliersQuery,
} from "@/store/supplier/api";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Supplier } from "@/store/supplier/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useFilter } from "@/hooks/useFilter";
import Head from "next/head";
import SupplierDrawer from "./_components/SupplierDrawer";
import PrimaryButton from "@/components/Button/PrimaryButton";

const Supplier: NextPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editData, setEditData] = useState<Supplier>();
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

  const [deleteSupplier] = useDeleteSupplierMutation();

  const searchParams = useFilter({ ...filters });
  const {
    data: suppliers,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllSuppliersQuery(searchParams);

  const {
    isOpen: isOpenSupplierDrawer,
    onClose: onCloseSupplierDrawer,
    onOpen: onOpenSupplierDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const handleEditSupplier = (id: string) => {
    const supplierData = suppliers?.suppliers?.find(
      (supplier) => supplier._id === id
    );

    onOpenSupplierDrawer();
    setIsEdit(true);
    setEditData(supplierData);
  };

  const handleDeleteSupplier = async () => {
    await deleteSupplier(deleteId);
    onCloseDeleteModal();
    onCloseSupplierDrawer();
  };

  const handleOpenModalDeleteSupplier = (id: string | undefined) => {
    onOpenDeleteModal();
    setIdDelete(id);
  };

  const handleCreateSupplier = () => {
    onOpenSupplierDrawer();
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
      Header: "Company Name",
      accessor: "companyName",
      width: 150,
      sortDirection: sort.accessor === "companyName" ? sort.direction : "none",
    },
    {
      Header: "Contact Name",
      accessor: "contactName",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "contactName" ? sort.direction : "none",
    },
    {
      Header: "Contact Number",
      accessor: "contactNumber",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value}</Text>;
      },
      sortDirection:
        sort.accessor === "contactNumber" ? sort.direction : "none",
    },
    {
      Header: "Email",
      accessor: "email",
      width: 180,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value}</Text>;
      },
      sortDirection: sort.accessor === "email" ? sort.direction : "none",
    },
    {
      Header: "Remarks",
      accessor: "remarks",
      width: 120,
      sortDirection: sort.accessor === "remarks" ? sort.direction : "none",
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
    },
    {
      Header: "Action",
      accessor: "_id",
      width: 100,
      Cell: ({ cell: { value } }: any) => {
        return (
          <Flex>
            <EditIcon
              mr={5}
              color="primary"
              cursor="pointer"
              onClick={() => handleEditSupplier(value)}
            />
            <DeleteIcon
              onClick={() => handleOpenModalDeleteSupplier(value)}
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
        <title>Supplier Management</title>
      </Head>
      <Text
        display={{ base: "none", xl: "inherit" }}
        fontSize={30}
        fontWeight={'semibold'}
        color={"gray.600"}
        textAlign={'center'}
      >
        SUPPLIER MANAGEMENT
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
        <PrimaryButton
          w={"100%"}
          maxWidth={{ base: "100%", sm: "9em" }}
          variant="outline"
          onClick={handleCreateSupplier}
          leftIcon={<AiOutlinePlusCircle />}
        >
          Add Supplier
        </PrimaryButton>
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
        data={suppliers?.suppliers || []}
        count={suppliers?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
      <SupplierDrawer
        isOpen={isOpenSupplierDrawer}
        onClose={onCloseSupplierDrawer}
        isEdit={isEdit}
        editData={editData}
        deleteSupplier={handleOpenModalDeleteSupplier}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onClick={handleDeleteSupplier}
      />
    </>

  );
};

export default Supplier;
