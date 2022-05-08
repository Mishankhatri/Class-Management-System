import React, { useEffect, useState, useMemo } from "react";
import MaterialTableContainer from "../../../../common/MaterialTableContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  SubjectDelete,
  ViewSubjects,
} from "../../../../redux/actions/subjectactions";
import Loading from "./../../../common/Loading";
import CustomConfirm from "../../../common/CustomConfirm";
import { useNavigate } from "react-router-dom";

const SubjectDataTable = ({ click, setClick }) => {
  const { subjects: data } = useSelector((state) => state.classes);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const navigate = useNavigate();
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
        title: "SN",
        render: ({ tableData: { id: index } }) => {
          return index + 1;
        },
      },
      {
        title: "Subject",
        field: "subject_name",
      },
      {
        title: "SubjectCode",
        field: "subject_code",
      },
      {
        title: "Class",
        render: (d) => {
          return `${d.grade.class_name}:${d.grade.section}`;
        },
      },

      {
        title: "Action",
        render: (row) => {
          return (
            <>
              <button
                onClick={() => {
                  navigate(`${row.id}`);
                }}
                className="btn-primary btn-1 btn-custom">
                View
              </button>
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
        <MaterialTableContainer
          columns={columns}
          url={"subjects"}
          title="View Subjects"
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default SubjectDataTable;
