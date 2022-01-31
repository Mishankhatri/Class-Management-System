import React, { Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { Filter, DefaultColumnFilter, GlobalFilter } from './filters';
// import '../Table.css';
import './../../forms/Table.css';

const TableContainer = ({ columns, data, getTrProps }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
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
      initialState: { pageIndex: 0, pageSize: 5 },
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
    <Fragment>
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
          <span>Enties</span>
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
                  {/* <Filter column={column} /> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                {/* <tr onClick={() => getTrProps(row.original)}> */}
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
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
            Previous
          </button>

          <label onChange={onChangeInInput}>{pageIndex + 1}</label>

          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className='table-btn'>
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default TableContainer;
