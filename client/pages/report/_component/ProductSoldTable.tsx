import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTable } from "react-table";

interface TableProps {
  columns: any;
  data: any;
}

const ProductSoldTable: React.FC<TableProps> = ({ columns, data }) => {
  const _data = useMemo(() => data, [data]);
  const _columns = useMemo(() => columns, [columns]);

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow, page } =
    useTable({
      columns: _columns,
      data: _data,
      defaultColumn: {
        width: "auto",
      },
    });

  return (
    <TableContainer
      overflowX={"auto"}
      overflowY={"auto"}
      maxH={"30vh"}
    >
      <Table
        layout="fixed"
        variant="simple"
        colorScheme="gray"
        
        {...getTableProps()}
      >
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, indexRow) => {
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
  );
};

export default ProductSoldTable;
