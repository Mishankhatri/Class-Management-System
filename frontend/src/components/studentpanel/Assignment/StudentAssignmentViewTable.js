import axios from "axios";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";

const StudentAssignmentViewTable = () => {
  const navigate = useNavigate();
  const data = [
    { roll: 1, name: "Prabin", id: 1 },
    { roll: 2, name: "Anu", id: 2 },
    { roll: 3, name: "Mishan", id: 3 },
    { roll: 4, name: "Paras", id: 4 },
    { roll: 5, name: "Kushal", id: 5 },
    { roll: 6, name: "Pranu", id: 6 },
    { roll: 7, name: "Pranisha", id: 7 },
  ];

  const handleView = (row) => {
    navigate(`/student/assignment/upload/assignmentId=${row.original.id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Title",
        accessor: "name",
        SearchAble: false,
      },

      {
        Header: "Date due",
        accessor: "date",
        SearchAble: false,
      },

      {
        Header: "Time due",
        accessor: "time",
        SearchAble: false,
      },
      {
        Header: "Status",
        accessor: "status",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn-custom btn-primary"
                onClick={() => handleView(row)}>
                View Detail
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

export default StudentAssignmentViewTable;