import React, { useEffect, useState, useMemo } from "react";
import { SelectColumnFilter } from "./../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteLectureNotes,
  GetLectureNotes,
  TeacherDetail,
} from "../../../redux/actions/teacher/teacheractions";
import Loading from "./../../common/Loading";
import CustomConfirm from "../../common/CustomConfirm";

const LectureNotesTable = () => {
  const dispatch = useDispatch();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { lecturenotes, teacherDetail } = useSelector(
    (state) => state.teachers
  );
  const { user } = useSelector((state) => state.auth);

  const filterTeacher =
    teacherDetail && teacherDetail.find((value) => value.user.id === user.id);

  useEffect(() => {
    dispatch(GetLectureNotes(filterTeacher.id));
    dispatch(TeacherDetail());
  }, []);

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
        accessor: "subject",
        SearchAble: true,
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Class",
        accessor: "grade",
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
        <TableContainer columns={columns} data={lecturenotes} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default LectureNotesTable;
