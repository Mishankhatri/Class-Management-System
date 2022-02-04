import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "../../common/Table/TableContainer";
import { announcementValue } from "../../values/AdminPanel/AnnouncementInput";

const AnnouncementTableData = () => {
  const data = announcementValue;

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
        Header: "Type",
        accessor: "type",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
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
        accessor: "Section",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: false,
        className: "subject-column",
      },
      {
        Header: "File",
        accessor: "file",
        SearchAble: false,
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
      <div>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  );
};

export default AnnouncementTableData;
