import React, { useEffect, useState, useMemo } from "react";
import MaterialTableContainer from "../../../common/MaterialTableFilter";
import { useDispatch, useSelector } from "react-redux";
import { GetLectureNotesFilter } from "./../../../redux/actions/teacher/teacheractions";
import axiosInstance from "./../../../axios";
import Loading from "../../common/Loading";

const LectureNotesTable = () => {
  const dispatch = useDispatch();
  const [gradeId, setGradeId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        setGradeId(results[0].current_grade.id);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "SN",
        width: 100,
        render: ({ tableData: { id: index } }) => {
          return index + 1;
        },
      },
      {
        title: "Course",
        field: "subject",
      },
      {
        title: "Teacher",
        field: "teacher",
      },
      {
        title: "Description",
        field: "description",
      },
      {
        title: "File",
        render: (row) => {
          return row.notes_files ? (
            <a
              href={row.notes_files}
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

  return gradeId ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"lecturenotes"}
          title="View Lecture Notes"
          filter={`grade=${gradeId}&ordering=-id`}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default LectureNotesTable;
