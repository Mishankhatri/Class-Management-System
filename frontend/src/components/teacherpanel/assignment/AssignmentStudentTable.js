import axios from "axios";
import React, { useMemo } from "react";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";

const AssignmentStudentTable = ({ remarkClick, setRemarkClick }) => {
  const data = [
    {
      roll: 1,
      name: "Prabin",
      status: "Submitted",
      date: "2022-12-02",
      time: "12:20",
      id: 1,
    },
    {
      roll: 2,
      name: "Anu",
      status: "Submitted",
      date: "2022-12-02",
      time: "12:20",
      id: 2,
    },
    {
      roll: 3,
      name: "Mishan",
      status: "Pending",
      date: "2022-12-02",
      time: "12:20",
      id: 3,
    },
    {
      roll: 4,
      name: "Paras",
      status: "Pending",
      date: "2022-12-02",
      time: "12:20",
      id: 4,
    },
    {
      roll: 5,
      name: "Kushal",
      status: "Submitted",
      date: "2022-12-02",
      time: "12:20",
      id: 5,
    },
    {
      roll: 6,
      name: "Pranu",
      status: "Pending",
      date: "2022-12-02",
      time: "12:20",
      id: 6,
    },
    {
      roll: 7,
      name: "Pranisha",
      status: "Submitted",
      date: "2022-12-02",
      time: "12:20",
      id: 7,
    },
  ];

  const handleView = (row) => {
    console.log(row.original);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Roll No",
        accessor: "roll",
        SearchAble: true,
      },
      {
        Header: "Student Name",
        accessor: "name",
        SearchAble: true,
      },

      {
        Header: "Status",
        accessor: "status",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },

      {
        Header: "Submitted Date",
        accessor: "date",
        SearchAble: false,
      },
      {
        Header: "Submitted Time",
        accessor: "time",
        SearchAble: false,
      },
      {
        Header: "File",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            row.original.status === "Submitted" && (
              <button
                className="btn-custom btn-1 btn-primary"
                onClick={() => handleView(row)}>
                View
              </button>
            )
          );
        },
      },
      {
        Header: "Remark",
        SearchAble: false,
        className: "col_remark",
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn-custom btn-danger"
                style={{ backgroundColor: "teal" }}
                onClick={() => setRemarkClick(!remarkClick)}>
                Remark
              </button>
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

export default AssignmentStudentTable;
