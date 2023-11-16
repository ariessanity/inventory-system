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
  Spinner,
} from "@chakra-ui/react";
import PagButton from "./PagButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useMemo } from "react";

interface TableProps {
  columns: any;
  data: any;
  count: number | undefined;
  isLoading: boolean;
  onPageChange: (pageIndex: number) => void;
}

const initialState = {
  pageSize: 15,
};

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  isLoading,
  count = 0,
  onPageChange,
}) => {
  const _data = useMemo(() => data, [data]);
  const _columns = useMemo(() => columns, [columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: _columns,
      data: _data,
      initialState,
      manualPagination: true,
      pageCount: count,
    },
    usePagination
  );

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      const newPageIndex = pageIndex > 0 ? pageIndex - 1 : 0;
      onPageChange(newPageIndex + 1);
      gotoPage(newPageIndex);
    }
  };

  const handleNextPage = () => {
    if (canNextPage) {
      const newPageIndex =
        pageIndex + 1 < pageCount ? pageIndex + 1 : pageIndex;
      onPageChange(newPageIndex + 1);
      gotoPage(newPageIndex);
    }
  };

  return (
    <>
      <TableContainer overflowY={"auto"} maxH={"40em"} borderWidth={1}>
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
                  {...column.getHeaderProps({
                    style: {
                      minWidth: 80,
                      width: 100,
                      border: "1px solid white",
                    },
                  })}
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

      {isLoading && (
        <Box textAlign={"center"} my={30}>
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      )}

      <Flex p={5} w="full" alignItems="center" justifyContent="space-between">
        <Flex>
          <Text fontWeight={"500"}>Total items {count}</Text>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <PagButton onClick={handlePreviousPage} disabled={!canPreviousPage}>
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
          <Text fontWeight={"500"} mx={5}>
            {isLoading
              ? "..."
              : `Page ${pageIndex + 1} of ${Math.ceil(count / pageSize)}`}
          </Text>
          <PagButton
            onClick={handleNextPage}
            disabled={pageIndex + 1 === Math.ceil(count / pageSize)}
          >
            <Icon
              as={AiOutlineRight}
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
              boxSize={4}
            />
          </PagButton>
        </Flex>
      </Flex>
    </>
  );
};

export default TableComponent;
