import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../common/Table/TableContainer";

import moment from "moment";
import { SelectColumnFilter } from "../common/Table/filters";
import axiosInstance from "../../axios";

const TimeTableData = () => {
  const { user } = useSelector((state) => state.auth);
  const [timetablesData, settimetables] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/teacher?user=${user.id}`)
      .then(({ data: { results } }) => {
        axiosInstance
          .get(`/timetable?teacher=${results[0].id}`)
          .then(({ data: { results } }) => {
            settimetables(results);
          });
      });
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
        {timetablesData && (
          <TableContainer columns={columns} data={timetablesData} />
        )}
      </div>
    </>
  );
};

export default TimeTableData;
