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
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useMemo } from "react";
import { columns, data } from "./data";
import { AiOutlineSearch } from "react-icons/ai";

const Product: NextPage = () => {
  return (
    <Flex flexDirection={"column"}>
      <Center
        fontSize={20}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily={"inherit"}
      >
        PRODUCT LIST
      </Center>
      <Flex justifyContent={"space-between"} alignItems={"center"} my={5}>
        <Button fontWeight={'500'} colorScheme="gray" variant="solid" size={"sm"}>
          Add Product
        </Button>
        <InputGroup w={"30%"}>
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input type="text" placeholder="Search..." />
        </InputGroup>
      </Flex>
      <TableComponent columns={columns} data={data} />
    </Flex>
  );
};

export default Product;
