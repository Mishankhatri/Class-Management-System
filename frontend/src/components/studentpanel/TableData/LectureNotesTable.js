import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import { SelectColumnFilter } from "../../common/Table/filters";
import { useDispatch, useSelector } from "react-redux";
import { GetLectureNotes } from "./../../../redux/actions/teacher/teacheractions";
import reverseArray from "./../../common/ReverseArray";
import Loading from "./../../common/Loading";

const LectureNotesTable = () => {
  const dispatch = useDispatch();
  const { lecturenotes } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(GetLectureNotes());
  }, []);

  const newLectureNote = lecturenotes && reverseArray(lecturenotes);

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
        accessor: "subject",
        Filter: SelectColumnFilter,
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: "teacher",
        SearchAble: true,
      },
      {
        Header: "Description",
        accessor: "description",
        SearchAble: false,
      },
      {
        Header: "File",
        SearchAble: false,
        Cell: ({ row }) => {
          return row.original.notes_files ? (
            <a
              href={row.original.notes_files}
              target="_blank"
              className="btn-primary  btn-custom"
              style={{ background: "#012346", textDecoration: "none" }}>
              Download
            </a>
          ) : (
            <p>No file Provided</p>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {lecturenotes && (
          <TableContainer columns={columns} data={newLectureNote} />
        )}
      </div>
    </>
  );
};

export default LectureNotesTable;
