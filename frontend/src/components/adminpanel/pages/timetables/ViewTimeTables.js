import React, { useState, useMemo } from "react";
import MaterialTableContainer from "../../../../common/MaterialTableContainer";
import moment from "moment";
import CustomConfirm from "../../../common/CustomConfirm";
import { DeleteTimetables } from "../../../../redux/actions/admin/adminaction";
import { useNavigate } from "react-router-dom";
import InnerHeader from "../../../common/InnerHeader";
import { MdPersonAdd } from "react-icons/md";

const ViewTimetableAdmin = () => {
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const navigate = useNavigate();

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
        title: "Day",
        field: "day",
      },
      {
        title: "Time",
        width: 250,
        render: (d) => {
          const startTime = moment(d.startTime, "HH,mm").format("LT");
          const endTime = moment(d.endTime, "HH,mm").format("LT");
          return `${startTime} to ${endTime}`;
        },
      },
      {
        title: "Class",
        render: (data) => {
          return `${data.assigned.grade?.class_name} : ${data.assigned.grade?.section}`;
        },
      },
      {
        title: "Subject",
        render: (data) => {
          return `${data.assigned.subject.subject_name}:${data.assigned.subject.subject_code}`;
        },
      },
      {
        title: "Teacher",
        render: (d) => {
          return `${d.assigned.teacher.first_name} ${
            d.assigned.teacher.middle_name ? d.assigned.teacher.middle_name : ""
          } ${d.assigned.teacher.last_name}`;
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
          PeformDelete={DeleteTimetables}
        />
      )}
      <InnerHeader icon={<MdPersonAdd />} name={"View Timetables"} />
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"timetable"}
          title="View Timetables"
        />
      </div>
    </>
  );
};

export default ViewTimetableAdmin;
