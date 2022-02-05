import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "../../common/Table/TableContainer";
import { SelectColumnFilter } from "../../common/Table/filters";

const LectureNotesTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setData(data);
  };

  const onOpen = (post) => {
    navigate(`${post.id}`);
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
        Header: "Course",
        accessor: "website",
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: "username",
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
              <button
                onClick={() => onOpen(row.original)}
                className="btn-primary btn-1 btn-custom">
                Open
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

export default LectureNotesTable;
