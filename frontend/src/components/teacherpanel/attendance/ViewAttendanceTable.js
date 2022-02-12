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

  const filterAttendance =
    attendance &&
    attendance.filter((value) => value.teacher.user.id === user.id);

  useEffect(() => {
    dispatch(ViewStudentAttendance());
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: (d) => {
          if (d.student.middleName == null) {
            d.student.middleName = "";
          }
          return `${d.student.first_name} ${d.student.middleName} ${d.student.last_name}`;
        },
        SearchAble: true,
      },
      {
        Header: "SRN",
        accessor: (d) => d.student.SRN,
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (d) => {
          return `${d.grade.class_name}: ${d.grade.section}`;
        },
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
        accessor: "subject.subject_name",
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
          data={filterAttendance}
          isRangeSearch={true}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ViewAttendanceTable;
