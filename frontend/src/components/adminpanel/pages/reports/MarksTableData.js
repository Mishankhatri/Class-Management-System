import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../../common/Table/TableContainer";
import { attendanceDetail } from "../../../values/AdminPanel/AttendanceInput";

const MarksTableData = ({ click, setClick }) => {
  const data = attendanceDetail;

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row: { index } }) => {
          return index + 1;
        },
        SearchAble: false,
      },
      {
        Header: "Class",
        accessor: "class",
        SearchAble: true,
      },
      {
        Header: "Section",
        accessor: "roll",
        SearchAble: true,
      },
      {
        Header: "Name",
        accessor: "name",
        SearchAble: true,
      },
      {
        Header: "Results",
        accessor: "attendance",
        SearchAble: true,
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

export default MarksTableData;
