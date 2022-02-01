import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import TableContainer from '../../../common/Table/TableContainer';

const ClassTableData = ({ click, setClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    setData(data);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'SN',
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: 'Class',
        accessor: 'username',
      },
      {
        Header: 'Section',
        accessor: 'name',
      },
      {
        Header: 'Class Code',
        accessor: 'phone',
      },
      {
        Header: 'Description',
        accessor: 'email',
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

export default ClassTableData;
