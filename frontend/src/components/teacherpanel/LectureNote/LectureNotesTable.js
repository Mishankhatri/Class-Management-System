import React, { useEffect, useState, useMemo } from "react";

import MaterialTableContainer from "./../../../common/MaterialTableFilter";
import { useDispatch, useSelector } from "react-redux";
import { DeleteLectureNotes } from "../../../redux/actions/teacher/teacheractions";

import CustomConfirm from "../../common/CustomConfirm";
import axiosInstance from "../../../axios";

const LectureNotesTable = () => {
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/teacher?user=${user.id}`)
      .then(({ data: { results } }) => {
        setTeacherId(results[0].id);
      });
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

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
        title: "Subject",
        field: "subject",
        maxWidth: 200,
      },
      {
        title: "Class",
        field: "grade",
        width: 100,
      },

      {
        title: "Description",
        field: "description",
      },
      {
        title: "Files",
        width: 100,
        render: ({ notes_files }) => {
          return notes_files ? (
            <a
              href={notes_files}
              target="_blank"
              className="btn-primary btn-custom"
              style={{ background: "#012346", textDecoration: "none" }}>
              Download
            </a>
          ) : (
            <p>No file Provided</p>
          );
        },
      },

      {
        title: "Action",
        width: 100,
        render: (row) => {
          return (
            <>
              <button
                className="btn-danger btn-custom"
                onClick={() => handleDelete(row.id)}>
                Delete
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
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          user={teacherId}
          PeformDelete={DeleteLectureNotes}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"lecturenotes"}
          title="Lecture Notes"
          filter={`teacher=${user.username}&ordering=-id`}
        />
      </div>
    </>
  );
};

export default LectureNotesTable;
