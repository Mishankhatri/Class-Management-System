import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { TeacherDelete } from "../../../../redux/actions/teacher/teacheractions";
import CustomConfirm from "../../../common/CustomConfirm";

import MaterialTableContainer from "../../../../common/MaterialTableContainer";

const TeacherTableData = () => {
  const navigate = useNavigate();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

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
        title: "SN",
        width: 100,
        render: ({ tableData: { id: index } }) => {
          return index + 1;
        },
      },
      {
        title: "Full Name",
        render: (d) => {
          return `${d.first_name} ${d.middle_name ? d.middle_name : ""} ${
            d.last_name
          }`;
        },
      },
      {
        title: "Phone",
        field: "contact_no",
      },
      {
        title: "TRN NO",
        field: "TRN",
      },
      {
        title: "Address",
        field: "address",
      },
      {
        title: "Action",
        render: (row) => {
          return (
            <>
              <button
                onClick={() => onOpen(row)}
                className="btn-primary btn-1 btn-custom">
                Open
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

  return (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete Teacher"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={TeacherDelete}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          title={"View Teachers"}
          url="teacher"
        />
      </div>
    </>
  );
};

export default TeacherTableData;
