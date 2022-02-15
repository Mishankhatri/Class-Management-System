import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../common/Table/TableContainer";

import moment from "moment";
import { SelectColumnFilter } from "../common/Table/filters";
import { GetAdminTimetables } from "../../redux/actions/admin/adminaction";
import { TeacherDetail } from "./../../redux/actions/teacher/teacheractions";

const TimeTableData = () => {
  const { timetables } = useSelector((state) => state.admins);
  const { user } = useSelector((state) => state.auth);
  const { teacherDetail } = useSelector((state) => state.teachers);

  const filterTeacher = teacherDetail.find(
    (value) => value.user.id === user.id
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TeacherDetail());
    dispatch(GetAdminTimetables(`teacher=${filterTeacher.id}`));
  }, []);

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
        accessor: "assigned.subject",
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: "assigned.grade",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {timetables && <TableContainer columns={columns} data={timetables} />}
      </div>
    </>
  );
};

export default TimeTableData;
