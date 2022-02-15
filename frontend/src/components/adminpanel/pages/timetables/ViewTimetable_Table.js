import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import TableContainer from "../../../common/Table/TableContainer";
import reverseArray from "./../../../common/ReverseArray";
import moment from "moment";
import { SelectColumnFilter } from "../../../common/Table/filters";
import CustomConfirm from "../../../common/CustomConfirm";
import { DeleteTimetables } from "../../../../redux/actions/admin/adminaction";

const ViewTimetable_Table = ({ click, setClick }) => {
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const { timetables } = useSelector((state) => state.admins);
  const reverseTimetable = timetables && reverseArray(timetables);

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
        Header: "Day",
        accessor: "day",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Time",
        accessor: (d) => {
          const startTime = moment(d.startTime, "HH").format("LT");
          const endTime = moment(d.endTime, "HH").format("LT");
          return `${startTime} to ${endTime}`;
        },
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          return `${d.assigned.grade.class_name} : ${d.assigned.grade.section}`;
        },
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Subject",
        accessor: (d) => {
          return `${d.assigned.subject.subject_name}`;
        },
        SearchAble: true,
      },
      {
        Header: "Teacher",
        accessor: (d) => {
          return `${d.assigned.teacher.first_name} ${
            d.assigned.teacher.middle_name ? d.assigned.teacher.middle_name : ""
          } ${d.assigned.teacher.last_name}`;
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
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {timetables && (
          <TableContainer columns={columns} data={reverseTimetable} />
        )}
      </div>
    </>
  );
};

export default ViewTimetable_Table;
