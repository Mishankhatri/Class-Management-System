import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { SelectColumnFilter } from "./../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteLectureNotes,
  GetLectureNotes,
} from "../../../redux/actions/teacher/teacheractions";
import Loading from "./../../common/Loading";
import CustomConfirm from "../../common/CustomConfirm";

const LectureNotesTable = () => {
  const dispatch = useDispatch();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { lecturenotes } = useSelector((state) => state.teachers);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetLectureNotes());
  }, []);

  const handleSubmit = (row) => {
    alert(`Click Id is ${row.id}. Downloading file!`);
  };

  const filterData =
    lecturenotes &&
    lecturenotes.filter((value) => value.teacher.user.id === user.id);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

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
        Header: "Subject",
        accessor: "subject.subject_name",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Class",
        accessor: ({ grade }) => {
          return `${grade.class_name} : ${grade.section}`;
        },
        SearchAble: true,
      },

      {
        Header: "Description",
        accessor: "description",
        Filter: SelectColumnFilter,
        filter: "includes",
        SearchAble: false,
      },
      {
        Header: "Files",
        accessor: ({ notes_files }) => {
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
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn-danger btn-custom"
                onClick={() => handleDelete(row.original.id)}>
                Delete
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return lecturenotes ? (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteLectureNotes}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={filterData} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default LectureNotesTable;
