import { usePagination, useTable } from "react-table";
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
} from "@chakra-ui/react";

interface TableProps {
  columns: any;
  data: any;
}

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
      initialState: { pageIndex: 2 },
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
              {headers.map((column, index) => (
                <Th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()} key={index}>
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
      <Flex>
        <Text>Page Count</Text>
        <Text>Prev</Text>
        <Text>Next</Text>
      </Flex>
    </>
  );
};

export default TableComponent;
