import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../common/Table/TableContainer";

import moment from "moment";
import { SelectColumnFilter } from "../../common/Table/filters";
import { GetAdminTimetables } from "../../../redux/actions/admin/adminaction";
import { StudentByUserId } from "./../../../redux/actions/student/studentactions";
import Loading from "./../../common/Loading";

const TimeTableData = () => {
  const { timetables } = useSelector((state) => state.admins);
  const { user } = useSelector((state) => state.auth);
  const { studentUserID } = useSelector((state) => state.students);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(StudentByUserId(user.id));
    // dispatch(GetAdminTimetables(`grade=${studentUserID[0].current_grade.id}`));
    dispatch(GetAdminTimetables());
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
        Header: "Teacher",
        accessor: "assigned.teacher",
        SearchAble: true,
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
