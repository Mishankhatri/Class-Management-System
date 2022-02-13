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
import reverseArray from "../../common/ReverseArray";

const AttendanceTableData = () => {
  const { attendance } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const filterAttendance =
    attendance &&
    reverseArray(attendance).filter(
      (value) => value.student.user.id === user.id
    );

  useEffect(() => {
    dispatch(ViewStudentAttendance());
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => row.index + 1,
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
    ],
    []
  );

  return attendance ? (
    <>
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

export default AttendanceTableData;
