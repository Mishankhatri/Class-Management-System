import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteTeacherGivenAssignment } from "../../../redux/actions/teacher/teacheractions";
import CustomConfirm from "../../common/CustomConfirm";
import MaterialTableContainer from "../../../common/MaterialTableFilter";
import moment from "moment";

const AssignmentTableData = () => {
  const navigate = useNavigate();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const handleView = (row) => {
    navigate(`/teacher/assignment/view/id=${row.id}`);
  };

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        title: "Class",
        width: 150,
        render: (d) => `${d.for_grade.class_name}: ${d.for_grade.section}`,
      },
      {
        title: "Subject",
        minwidth: 200,
        field: "subject",
      },
      {
        title: "Title",
        field: "title",
      },

      {
        title: "Date due",
        field: "date_due",
      },

      {
        title: "Time due",
        render: (d) => {
          return moment(d.time_due, "HH,mm").format("LT");
        },
      },
      {
        title: "Action",
        render: (row) => {
          return (
            <>
              <button
                className="btn-custom btn-1 btn-primary"
                onClick={() => handleView(row)}>
                View
              </button>
              <button
                className="btn-custom btn-danger"
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
          user={user}
          PeformDelete={DeleteTeacherGivenAssignment}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"givenassignments"}
          title="View Assignments"
          filter={`teacher=${user.username}&ordering=-id`}
        />
      </div>
    </>
  );
};

export default AssignmentTableData;
