import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import {
  NumberRangeColumnFilter,
  SelectColumnFilter,
} from '../../common/Table/filters';
import TableContainer from '../../common/Table/TableContainer';
import { attendanceDetail } from '../../values/AdminPanel/AttendanceInput';

const AttendanceTableData = ({ click, setClick }) => {
  const data = attendanceDetail;

  const columns = useMemo(
    () => [
      {
        Header: 'SN',
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
        SearchAble: false,
      },

      {
        Header: 'Date',
        accessor: 'date',
        Filter: NumberRangeColumnFilter,
        filter: 'dateBetween',
        SearchAble: true,
      },
      {
        Header: 'Attendance',
        accessor: 'attendance',
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Total Absent',
        accessor: 'totalAbsent',
        SearchAble: true,
      },
      {
        Header: 'Total Present',
        accessor: 'totalPresent',
        SearchAble: true,
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
