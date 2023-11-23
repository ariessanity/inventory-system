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
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/store/user/api";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import UserDrawer from "./_component/UserDrawer";
import { User } from "@/store/user/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useFilter } from "@/hooks/useFilter";
import Head from "next/head";

const User: NextPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>();
  const [editData, setEditData] = useState<User>();
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

  const [deleteUser] = useDeleteUserMutation();

  const searchParams = useFilter({ ...filters });
  const {
    data: users,
    refetch,
    isFetching,
    isLoading,
  } = useGetAllUsersQuery(searchParams);

  const {
    isOpen: isOpenUserDrawer,
    onClose: onCloseUserDrawer,
    onOpen: onOpenUserDrawer,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
  } = useDisclosure();

  const handleEditUser = (id: string) => {
    const userData = users?.users?.find((user) => user._id === id);

    onOpenUserDrawer();
    setIsEdit(true);
    setEditData(userData);
  };

  const handleDeleteUser = async () => {
    await deleteUser(deleteId);
    onCloseDeleteModal();
    onCloseUserDrawer();
  };

  const handleOpenModalDeleteUser = (id: string | undefined) => {
    onOpenDeleteModal();
    setIdDelete(id);
  };

  const handleCreateUser = () => {
    onOpenUserDrawer();
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
      Header: "Username",
      accessor: "username",
      width: 150,
      sortDirection: sort.accessor === "username" ? sort.direction : "none",
    },
    {
      Header: "Full Name",
      accessor: "firstname",
      width: 150,
      sortDirection: sort.accessor === "firstname" ? sort.direction : "none",
      Cell: ({ cell: { value, row } }: any) => {
        return <Text>{value ? `${value} ${row.original.lastname}` : "-"}</Text>;
      },
    },
    {
      Header: "Email",
      accessor: "email",
      width: 150,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value ? value : "-"}</Text>;
      },
      sortDirection: sort.accessor === "email" ? sort.direction : "none",
    },
    {
      Header: "Contact Number",
      accessor: "mobileNumber",
      width: 160,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value}</Text>;
      },
      sortDirection: sort.accessor === "mobileNumber" ? sort.direction : "none",
    },
    {
      Header: "Role",
      accessor: "role",
      width: 120,
      Cell: ({ cell: { value } }: any) => {
        return <Text>{value}</Text>;
      },
      sortDirection: sort.accessor === "role" ? sort.direction : "none",
    },
    {
      Header: () => <Text textAlign={"center"}>Action</Text>,
      accessor: "_id",
      width: 80,
      Cell: ({ cell: { value, row } }: any) => {
        return (
          <Flex>
            <EditIcon
              mr={5}
              color="teal.500"
              cursor="pointer"
              onClick={() => handleEditUser(value)}
            />
            {row.original.role !== "Super Admin" && (
              <DeleteIcon
                onClick={() => handleOpenModalDeleteUser(value)}
                color="red.500"
                cursor="pointer"
              />
            )}
          </Flex>
        );
      },
    },
  ];

  return (
    <Flex flexDirection={"column"} justifyContent={"space-between"}>
      <Head>
        <title>User Management</title>
      </Head>
      <Center
        fontSize={30}
        fontWeight={"semibold"}
        color={"gray.600"}
        fontFamily={"inherit"}
      >
        USER MANAGEMENT
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
          fontWeight={"300"}
          colorScheme="teal"
          variant="outline"
          onClick={handleCreateUser}
          leftIcon={<AiOutlinePlusCircle />}
        >
          Add User
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
        data={users?.users || []}
        count={users?.count}
        isLoading={isLoading}
        currentPage={filters?.page}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
      <UserDrawer
        isOpen={isOpenUserDrawer}
        onClose={onCloseUserDrawer}
        isEdit={isEdit}
        editData={editData}
        deleteUser={handleOpenModalDeleteUser}
      />
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        onClick={handleDeleteUser}
      />
    </Flex>
  );
};

export default User;
