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
  const { student } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetLectureNotes());
  }, []);

  const studentDetail = student.find((value) => value.user.id === user.id);

  const newLectureNote =
    lecturenotes &&
    reverseArray(lecturenotes).filter(
      (value) =>
        value.grade.class_name == studentDetail.current_grade?.class_name &&
        value.grade.section == studentDetail.current_grade?.section
    );

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
        accessor: "subject.subject_name",
        Filter: SelectColumnFilter,
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: (d) => {
          return `${d.teacher.first_name} ${
            d.teacher.middlename ? d.teacher.middlename : ""
          } ${d.teacher.last_name}`;
        },
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

  return studentDetail ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {lecturenotes && (
          <TableContainer columns={columns} data={newLectureNote} />
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default LectureNotesTable;
