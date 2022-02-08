import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../common/InputField/ToggleSwitch";
import TableContainer from "./../../common/Table/TableContainer";

const AttendanceTableData = () => {
  const data = [
    { roll: 1, name: "Prabin", id: 1 },
    { roll: 2, name: "Anu", id: 2 },
    { roll: 3, name: "Mishan", id: 3 },
    { roll: 4, name: "Paras", id: 4 },
    { roll: 5, name: "Kushal", id: 5 },
    { roll: 6, name: "Pranu", id: 6 },
    { roll: 7, name: "Pranisha", id: 7 },
  ];
  const handleChange = (obtainedId, checked) => {
    const [rowData] = data.filter((value) => value.id === obtainedId);
    checked
      ? (rowData.attendance = "Present")
      : (rowData.attendance = "Absent");
    alert(
      `Student with id:${obtainedId}, name: ${rowData.name} and Roll: ${
        rowData.roll
      } is ${rowData.attendance} today. Today data is ${new Date()
        .toJSON()
        .slice(0, 10)}`
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Roll No",
        accessor: "roll",
        SearchAble: false,
      },
      {
        Header: "Student Name",
        accessor: "name",
        SearchAble: false,
      },

      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <ToggleSwitch
                id={row.original.id}
                name={"attendance"}
                onChangeHandler={handleChange}
                optionLabels={["P", "A"]}
              />
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

export default AttendanceTableData;
