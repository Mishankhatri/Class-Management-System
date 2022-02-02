import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from '../../../common/Table/TableContainer';
import { attendanceDetail } from '../../../values/AdminPanel/AttendanceInput';
import { NumberRangeColumnFilter } from './../../../common/Table/filters';

const AttendanceTableData = ({ click, setClick }) => {
  const data = attendanceDetail;

  const columns = useMemo(
    () => [
      {
        Header: 'SN',
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Rollno',
        accessor: 'roll',
      },
      {
        Header: 'Class',
        accessor: 'class',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Filter: NumberRangeColumnFilter,
        filter: 'dateBetween',
      },
      {
        Header: 'Attendance',
        accessor: 'attendance',
      },
      {
        Header: 'Total Absent',
        accessor: 'totalAbsent',
      },
      {
        Header: 'Total Present',
        accessor: 'totalPresent',
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className='btn-primary btn-1 btn-custom'>
                Edit
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
        <TableContainer columns={columns} data={data} isRangeSearch={true} />
      </div>
    </>
  );
};

export default AttendanceTableData;
