import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import { SelectColumnFilter } from "../../common/Table/filters";

import { timeTable_value } from "../../values/AdminPanel/TimetableValues";

const MarkTableData = ({ click, setClick }) => {
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
        Header: "Class",
        accessor: "class",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Section",
        accessor: "section",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },

      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Student",
        accessor: "student",
        SearchAble: true,
      },
      {
        Header: "Roll",
        accessor: "roll",
        SearchAble: true,
      },
      {
        Header: "Mark",
        accessor: "mark",
        SearchAble: true,
      },
      {
        Header: "Action",
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

export default MarkTableData;
