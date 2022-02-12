import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableContainer from "./../../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_DETAILS,
  StudentDelete,
} from "../../../../redux/actions/student/studentactions";
import CustomConfirm from "../../../common/CustomConfirm";

const StudentTableData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { student: fetchData } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
    dispatch(GET_DETAILS("/parent", "GET_STUDENT_PARENTS"));
  }, []);

  const onOpen = (post) => {
    navigate(`${post.id}`);
  };

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
        Header: "Full Name",
        accessor: (d) => {
          if (d.middleName == null) {
            d.middleName = "";
          }
          return `${d.first_name} ${d.middleName} ${d.last_name}`;
        },
        SearchAble: true,
      },

      {
        Header: "Phone",
        accessor: "contact_no",
        SearchAble: true,
      },
      {
        Header: "Email",
        accessor: "email",
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          return `${d.current_grade.class_name} : ${d.current_grade.section}`;
        },
        SearchAble: true,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => onOpen(row.original)}
                className="btn-primary btn-1 btn-custom">
                Open
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
          PeformDelete={StudentDelete}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {fetchData && <TableContainer columns={columns} data={fetchData} />}
      </div>
    </>
  );
};

export default StudentTableData;
