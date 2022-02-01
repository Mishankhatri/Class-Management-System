import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from '../../../common/Table/TableContainer';
import { timeTable_value } from '../../../values/AdminPanel/TimetableValues';

const ViewTimetable_Table = ({ click, setClick }) => {
  const data = timeTable_value;

  const columns = useMemo(
    () => [
      {
        Header: 'SN',
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: 'Day',
        accessor: 'day',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Class',
        accessor: 'classes',
      },
      {
        Header: 'Section',
        accessor: 'section',
      },
      {
        Header: 'Subject',
        accessor: 'subject',
      },
      {
        Header: 'Teacher',
        accessor: 'teacher',
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className='btn-primary btn-1 btn-custom'>
                Open
              </button>
              <button className='btn-danger btn-custom'>Delete</button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: '20px 30px', marginBottom: 50 }}>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default ViewTimetable_Table;
