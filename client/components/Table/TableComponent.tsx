import { usePagination, useSortBy, useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Text,
  Flex,
  Icon,
  Box,
} from "@chakra-ui/react";
import PagButton from "./PagButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface TableProps {
  columns: any;
  data: any;
}

const initialState = {
  pageSize: 20,
  pageIndex: 0,
};

const TableComponent: React.FC<TableProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    usePagination
  );

  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"40em"}>
        <Table variant="striped" colorScheme="gray" {...getTableProps()}>
          <Thead
            backgroundColor={"gray.300"}
            position="sticky"
            top={0}
            zIndex={1}
          >
            <Tr>
              {headers.map((column, indexHeader) => (
                <Th
                  {...column.getHeaderProps()}
                  key={indexHeader}
                >
                    {column.render("Header")}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, indexRow) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={indexRow}>
                  {row.cells.map((cell, indexCell) => {
                    return (
                      <Td {...cell.getCellProps()} key={indexCell}>
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex p={30} w="full" alignItems="center" justifyContent="center">
        <PagButton onClick={() => previousPage()}>
          <Icon
            as={AiOutlineLeft}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
            disabled={!canPreviousPage}
          />
        </PagButton>
        <Text fontWeight={"500"} mx={5}>{`${pageIndex + 1} / ${
          pageOptions.length
        }`}</Text>
        {/* <PagButton>1</PagButton>
          <PagButton>2</PagButton>
          <PagButton>3</PagButton>
          <PagButton>4</PagButton>
          <PagButton>5</PagButton> */}
        <PagButton onClick={() => nextPage()}>
          <Icon
            as={AiOutlineRight}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
            boxSize={4}
            disabled={!canNextPage}
          />
        </PagButton>
      </Flex>
    </>
  );
};

export default TableComponent;
