import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { DefaultColumnFilter, GlobalFilter } from "./filters";
import "./../../../forms/Table.css";
import * as BiIcons from "react-icons/bi";

const TableContainer = ({ columns, data, showSearch = true }) => {
  function dateBetweenFilterFn(rows, id, filterValues) {
    const startDate = filterValues[0] ? new Date(filterValues[0]) : undefined;
    const endDate = filterValues[1] ? new Date(filterValues[1]) : undefined;

    if (endDate || startDate) {
      return rows.filter((r) => {
        const cellDate = new Date(r.values[id]);

        if (endDate && startDate) {
          return cellDate >= startDate && cellDate <= endDate;
        } else if (startDate) {
          return cellDate >= startDate;
        } else if (endDate) {
          return cellDate <= endDate;
        }
      });
    } else {
      return rows;
    }
  }

  const filterTypes = React.useMemo(
    () => ({
      dateBetween: dateBetweenFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    allColumns,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <BiIcons.BiSortDown className="sort-icon" />
      ) : (
        <BiIcons.BiSortUp className="sort-icon" />
      )
    ) : (
      ""
    );
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <React.Fragment>
      <div className="table-heading">
        <div className="select-entries">
          <span>Show</span>
          <select value={pageSize} onChange={onChangeInSelect}>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>Entries</span>
        </div>
        <div className="global-search">
          <span>Search: </span>
          <GlobalFilter
            filterValue={globalFilter}
            setFilter={setGlobalFilter}
          />
        </div>
      </div>
      <div style={{ overflow: "auto" }}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <React.Fragment key={index}>
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      <div {...column.getSortByToggleProps()}>
                        {column.render("Header")}
                        {generateSortingIndicator(column)}
                      </div>
                    </th>
                  ))}
                </tr>
                <tr>
                  {showSearch &&
                    headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="secondary-heading">
                        {column.canFilter
                          ? column.SearchAble
                            ? column.render("Filter")
                            : null
                          : null}
                      </th>
                    ))}
                </tr>
              </React.Fragment>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.length === 0 ? (
              <tr>
                <td colSpan={allColumns.length}>
                  {/* <NoDataFound /> */}
                  <div>No data found...</div>
                </td>
              </tr>
            ) : (
              page.map((row) => {
                prepareRow(row);
                return (
                  <React.Fragment key={row.getRowProps().key}>
                    <tr>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps([
                              { className: cell.column?.className },
                            ])}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="bottom">
        <div>
          Showing Page{" "}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
        <div>
          <label>Jump to: </label>
          <input
            className="input-page"
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
          <label> Page</label>
        </div>
        <div>
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className="table-btn">
            <span className=""> Previous </span>
          </button>

          <label onChange={onChangeInInput}>{pageIndex + 1}</label>

          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className="table-btn">
            <span> Next </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableContainer;
