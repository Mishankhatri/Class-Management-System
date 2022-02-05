import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { SelectColumnFilter } from "./../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";

const LectureNotesTable = () => {
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

  const handleSubmit = (row) => {
    alert(`Click Id is ${row.id}. Downloading file!`);
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
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Section",
        accessor: "name",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Course",
        accessor: "website",
        SearchAble: true,
      },
      {
        Header: "Description",
        accessor: "address.city",
        Filter: SelectColumnFilter,
        filter: "includes",
        SearchAble: false,
      },
      {
        Header: "File",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <button
              className="btn-primary  btn-custom"
              style={{ background: "#012346" }}
              onClick={() => handleSubmit(row.original)}>
              Download
            </button>
          );
        },
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
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

export default LectureNotesTable;
