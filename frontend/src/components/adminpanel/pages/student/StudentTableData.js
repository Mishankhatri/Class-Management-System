import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StudentDelete } from "../../../../redux/actions/student/studentactions";
import CustomConfirm from "../../../common/CustomConfirm";

import MaterialTableContainer from "../../../../common/MaterialTableContainer";
import { LoadDataTable } from "../../../../redux/actions/admin/adminaction";

const StudentTableData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tableData, query } = useSelector((state) => state.admins);

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const onOpen = (post) => {
    navigate(`${post.id}`);
  };

  useEffect(() => {
    dispatch(LoadDataTable("student", query));
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
        title: "Full Name",
        render: (d) => {
          if (d.middle_name == null) {
            d.middle_name = "";
          }
          return `${d.first_name} ${d.middle_name ? d.middle_name : ""} ${
            d.last_name
          }`;
        },
      },
      {
        title: "Class",
        render: (d) => {
          return `${d.current_grade?.class_name} : ${d.current_grade?.section}`;
        },
      },
      {
        title: "SRN",
        field: "SRN",
      },
      {
        title: "Address",
        field: "address",
      },

      {
        title: "Phone",
        field: "contact_no",
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
          title={"Delete Student"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={StudentDelete}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {tableData && (
          <MaterialTableContainer
            columns={columns}
            url={"student"}
            title={"View Students"}
          />
        )}
      </div>
    </>
  );
};

export default StudentTableData;
