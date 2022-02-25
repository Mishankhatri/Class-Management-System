import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import { SelectColumnFilter } from "../../common/Table/filters";
import { useDispatch, useSelector } from "react-redux";
import { GetLectureNotesFilter } from "./../../../redux/actions/teacher/teacheractions";
import axiosInstance from "./../../../axios";

const LectureNotesTable = () => {
  const dispatch = useDispatch();
  const { lectureNotesFilter } = useSelector((state) => state.teachers);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        dispatch(
          GetLectureNotesFilter(
            `?ordering=-id&grade=${results[0].current_grade.id}`
          )
        );
      });
  }, []);

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
        {lectureNotesFilter && (
          <TableContainer columns={columns} data={lectureNotesFilter} />
        )}
      </div>
    </>
  );
};

export default LectureNotesTable;
