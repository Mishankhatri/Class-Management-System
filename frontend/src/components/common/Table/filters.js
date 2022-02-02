//Filter Completely Purified

import React from 'react';

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ...`}
      className='local-filter'
    />
  );
};

export const GlobalFilter = ({ filterValue, setFilter }) => {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search Globally...`}
      className='global-filter'
    />
  );
};

export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className='input-range'>
      <input
        value={filterValue[0] || ''}
        type='text'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        className='local-filter'
        placeholder='Start'
      />
      <span>-</span>
      <input
        value={filterValue[1] || ''}
        type='text'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? val : undefined]);
        }}
        className='local-filter'
        placeholder='End'
      />
    </div>
  );
}
