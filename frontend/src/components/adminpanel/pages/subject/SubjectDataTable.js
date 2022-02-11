import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../../common/Table/TableContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  SubjectDelete,
  ViewSubjects,
} from "../../../../redux/actions/subjectactions";
import Loading from "./../../../common/Loading";
import CustomConfirm from "../../../common/CustomConfirm";

const SubjectDataTable = ({ click, setClick }) => {
  const { subjects: data } = useSelector((state) => state.classes);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewSubjects());
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
        accessor: "subject_name",
        SearchAble: true,
      },
      {
        Header: "SubjectCode",
        accessor: "subject_code",
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          return `${d.grade.class_name}:${d.grade.section}`;
        },
        SearchAble: true,
      },
      {
        Header: "Description",
        accessor: "description",
        SearchAble: false,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => setClick(!click)}
                className="btn-primary btn-1 btn-custom">
                Edit
              </button>
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

  return data ? (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={SubjectDelete}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={data} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default SubjectDataTable;
