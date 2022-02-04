import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./../../common/Table/TableContainer";

const FinalResultData = () => {
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
        Header: "Result",
        accessor: "name",
        SearchAble: true,
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

export default FinalResultData;
