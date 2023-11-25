import React, { Fragment } from "react";
import { useTable, useGroupBy, useExpanded } from "react-table";
import { Table } from "react-bootstrap";

// Stryker disable StringLiteral, ArrayDeclaration
export default function SectionsInstructorTableBase({
  columns,
  data,
  testid = "testid",
}) {
  // Stryker disable next-line ObjectLiteral
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        initialState: {
          groupBy: [],
          hiddenColumns: ["isSection"],
        },
        columns,
        data,
      },
      useGroupBy,
      useExpanded,
    );

  return (
    <Table {...getTableProps()} striped bordered hover>
      <thead key="thead">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                data-testid={`${testid}-header-${column.id}`}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} key="tbody">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Fragment key={`row-${i}`}>
              {
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, _index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        data-testid={`${testid}-cell-row-${cell.row.index}-col-${cell.column.id}`}
                        // Stryker disable next-line ObjectLiteral
                        style={{
                          background: !row.allCells[3].value  //Checks if the row we have is a section
                            ? "#34859b"
                            : "#9dbfbe",
                          color: !row.allCells[3].value ? "#effcf4" : "#000000",  //Prettier really wants this line to be formatted strangely, so I'm leaving it as is
                          fontWeight: !row.allCells[3].value
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {cell.render("Cell")}
                        <></>
                      </td>
                    );
                  })}
                </tr>
              }
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}
