import { usePagination, useSortBy, useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Flex,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/react";
import PagButton from "./PagButton";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useEffect, useMemo } from "react";

interface TableProps {
  columns: any;
  data: any;
  count: number | undefined;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (pageIndex: number) => void;
  onSortChange: (column: any) => void;
}

const initialState = {
  pageSize: 20,
};

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  isLoading,
  count = 0,
  currentPage,
  onPageChange,
  onSortChange,
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
      pageCount: count,
      manualPagination: true,
      manualSortBy: true,
      sortDescFirst: true,
      defaultColumn: {
        width: "auto",
      },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (currentPage !== pageIndex + 1) {
      gotoPage(0);
      onPageChange(1);
    }
  }, [currentPage, pageIndex, onPageChange, gotoPage]);

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
      {isLoading ? (
        <Box textAlign={"center"} my={30}>
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <TableContainer
          overflowX={"auto"}
          overflowY={"auto"}
          maxH={"75vh"}
          borderWidth={1}
        >
          <Table
            layout="fixed"
            variant="simple"
            colorScheme="gray"
            fontWeight={"300"}
            {...getTableProps()}
          >
            <Thead
              backgroundColor={"gray.300"}
              position="sticky"
              top={0}
              zIndex={1}
            >
              <Tr>
                {headers.map((column, indexHeader) => (
                  <Th
                    {...(column.getHeaderProps(column.getSortByToggleProps()),
                    {
                      style: {
                        width: column.width,
                        whiteSpace: "pre-line",
                      },
                    })}
                    onClick={() => onSortChange(column)}
                    key={indexHeader}
                  >
                    <Flex alignItems={"center"}>
                      {column.render("Header")}
                      {(column as any).sortDirection === "asc" ? (
                        <ChevronDownIcon />
                      ) : (column as any).sortDirection === "desc" ? (
                        <ChevronUpIcon />
                      ) : null}
                    </Flex>
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
                        <Td
                          {...cell.getCellProps({
                            style: {
                              width: cell.column.width,
                              whiteSpace: "pre-line",
                            },
                          })}
                          key={indexCell}
                        >
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
      )}

      {data?.length == 0 && (
        <Text my={4} textAlign={"center"} fontWeight={"300"}>
          No Data Found
        </Text>
      )}

      <Flex
        p={5}
        w="full"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex>
          <Text fontWeight={"300"}>Total of {count} items</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"}>
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
          <Text fontWeight={"300"} mx={5}>
            {isLoading
              ? "..."
              : `Page ${pageIndex + 1} of ${
                  Math.ceil(count / pageSize) === 0
                    ? 1
                    : Math.ceil(count / pageSize)
                }`}
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
