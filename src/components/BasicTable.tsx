// @ts-nocheck
import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useColumnOrder,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { GROUPED_COLUMNS } from "./columns";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { Checkbox } from "./Checkbox";

interface BasicTableProps {}

const BasicTable: React.FC<BasicTableProps> = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    gotoPage,
    pageCount,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  );

  const { pageSize, globalFilter, pageIndex } = state;

  const changeOrder = () => {
    setColumnOrder([
      "id",
      "first_name",
      "last_name",
      "age",
      "country",
      "phone",
    ]);
  };

  return (
    <>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <br />

      <button onClick={changeOrder}>Change Order</button>

      <br />

      {/* Hiding columns */}
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        {allColumns.map((column: any) => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              {column.Header}
            </label>
          </div>
        ))}
      </div>

      {/* Table Content */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagenation */}
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1}
            of {pageCount}
          </strong>{" "}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {" "}
          {"<<"}{" "}
        </button>

        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {" "}
          Previous{" "}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {" "}
          Next{" "}
        </button>

        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {" "}
          {">>"}{" "}
        </button>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default BasicTable;
