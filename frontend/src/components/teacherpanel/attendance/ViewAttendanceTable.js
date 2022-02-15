import React, { useEffect, useState, useMemo } from "react";
import TableContainer from "../../common/Table/TableContainer";
import {
  DateRangeColumnFilter,
  SelectColumnFilter,
} from "./../../common/Table/filters";

import { useSelector, useDispatch } from "react-redux";
import {
  DeleteAttendance,
  ViewStudentAttendance,
} from "../../../redux/actions/subjectactions";
import Loading from "./../../common/Loading";
import CustomConfirm from "../../common/CustomConfirm";

const ViewAttendanceTable = ({ click, setClick }) => {
  const { attendance } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  useEffect(() => {
    dispatch(ViewStudentAttendance(user.username));
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "student",
        SearchAble: true,
      },

      {
        Header: "Class",
        accessor: "grade",
        SearchAble: true,
      },
      {
        Header: "Date",
        accessor: "date",
        Filter: DateRangeColumnFilter,
        filter: "dateBetween",
        SearchAble: true,
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Attendance",
        accessor: "attendance_status",
        Filter: SelectColumnFilter,
        SearchAble: true,
      },
      {
        Header: "Action",
        accessor: (row) => {
          return (
            <>
              <button className="btn-custom btn-primary btn-1">Edit</button>
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

  return attendance ? (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteAttendance}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer
          columns={columns}
          data={attendance}
          isRangeSearch={true}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ViewAttendanceTable;
