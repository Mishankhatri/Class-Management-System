import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { Filter, DefaultColumnFilter, GlobalFilter } from './filters';
import './../../../forms/Table.css';
import NoDataFound from './Nodatafound';

const TableContainer = ({ columns, data }) => {
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
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
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
      <div className='table-heading'>
        <div className='select-entries'>
          <span>Show</span>
          <select value={pageSize} onChange={onChangeInSelect}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>Entries</span>
        </div>
        <div className='global-search'>
          <span>Search: </span>
          <GlobalFilter
            filterValue={globalFilter}
            setFilter={setGlobalFilter}
          />
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.length === 0 ? (
            <tr>
              <td colSpan={allColumns.length}>
                <NoDataFound />
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
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>

      <div className='bottom'>
        <div>
          Showing Page{' '}
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
        <div>
          <label>Jump to: </label>
          <input
            className='input-page'
            type='number'
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
            className='table-btn'>
            <span className=''> Previous </span>
          </button>

          <label onChange={onChangeInInput}>{pageIndex + 1}</label>

          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className='table-btn'>
            <span> Next </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableContainer;
