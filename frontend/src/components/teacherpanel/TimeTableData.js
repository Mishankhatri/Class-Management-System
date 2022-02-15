import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../common/Table/TableContainer";

import moment from "moment";
import { SelectColumnFilter } from "../common/Table/filters";
import { GET_DETAILS } from "./../../redux/actions/student/studentactions";
import { GetTimetables } from "../../redux/actions/admin/adminaction";

const TimeTableData = () => {
  const { timetables } = useSelector((state) => state.admins);
  const { user } = useSelector((state) => state.auth);
  const { teacherDetail } = useSelector((state) => state.teachers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTimetables());
    dispatch(GET_DETAILS("/teacher", "GET_TEACHER_DETAIL"));
  }, []);

  const teacherFilter =
    teacherDetail && teacherDetail.find((value) => value.user.id === user.id);

  const newTimetable =
    timetables &&
    timetables.filter(
      (value) => value.assigned.teacher.id === teacherFilter.id
    );

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
        Header: "Subject",
        accessor: (d) => {
          return `${d.assigned.subject.subject_name}`;
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
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {timetables && <TableContainer columns={columns} data={newTimetable} />}
      </div>
    </>
  );
};

export default TimeTableData;
