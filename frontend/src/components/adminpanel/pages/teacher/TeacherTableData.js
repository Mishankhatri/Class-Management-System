import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TableContainer from './../../../common/TableContainer';

const TeacherTableData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    setData(data);
  };

  const onOpen = (post) => {
    navigate(`${post.id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'SN',
        accessor: (row, index) => {
          return index + 1;
        },
      },
      {
        Header: 'User Name',
        accessor: 'username',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'City',
        accessor: 'address.city',
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => onOpen(row.original)}
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

export default TeacherTableData;
