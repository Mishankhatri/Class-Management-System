import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { SelectColumnFilter } from '../../../common/Table/filters';
import TableContainer from '../../../common/Table/TableContainer';
import { announcementValue } from '../../../values/AdminPanel/AnnouncementInput';

const AnnouncementTableData = ({ click, setClick }) => {
  const data = announcementValue;

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
        Header: 'Type',
        accessor: 'type',
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'For',
        accessor: 'for',
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Subject',
        accessor: 'subject',
        SearchAble: false,
        className: 'subject-column',
      },
      {
        Header: 'File',
        accessor: 'file',
        SearchAble: false,
      },
      {
        Header: 'Created By',
        accessor: 'createdBy',
        SearchAble: true,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        SearchAble: true,
      },

      {
        Header: 'Action',
        SearchAble: false,
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
      <div>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default AnnouncementTableData;
