import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../../common/Table/TableContainer";

const ClassTableData = ({ click, setClick }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setData(data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        SearchAble: false,
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
      },
      {
        Header: "Class",
        accessor: "username",
        SearchAble: true,
      },
      {
        Header: "Section",
        accessor: "name",
        SearchAble: true,
      },
      {
        Header: "Class Code",
        accessor: "phone",
        SearchAble: true,
      },
      {
        Header: "Description",
        accessor: "email",
        SearchAble: false,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className="btn-primary btn-1 btn-custom">
                Edit
              </button>
              <button className="btn-danger btn-custom">Delete</button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default ClassTableData;
