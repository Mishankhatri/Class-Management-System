import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../../common/Table/TableContainer";
import { timeTable_value } from "../../../values/AdminPanel/TimetableValues";

const ViewTimetable_Table = ({ click, setClick }) => {
  const data = timeTable_value;

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
        Header: "Day",
        accessor: "day",
        SearchAble: true,
      },
      {
        Header: "Time",
        accessor: "time",
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: "classes",
        SearchAble: true,
      },
      {
        Header: "Section",
        accessor: "section",
        SearchAble: true,
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: "teacher",
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

export default ViewTimetable_Table;
