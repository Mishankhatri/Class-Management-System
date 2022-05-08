import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTableContainer from "../../common/MaterialTableFilter";

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
        title: "SN",
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
        render: (d) => {
          const startTime = moment(d.startTime, "HH,mm").format("LT");
          const endTime = moment(d.endTime, "HH,mm").format("LT");
          return `${startTime} to ${endTime}`;
        },
      },

      {
        Header: "Subject",
        render: (data) => {
          return `${data.assigned.subject.subject_name} : ${data.assigned.subject.subject_code}`;
        },
      },
      {
        title: "Class",
        render: (data) => {
          return `${data.assigned.subject.grade.class_name} : ${data.assigned.subject.grade.section}`;
        },
      },
    ],
    []
  );

  return (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"timetable"}
          filter={`teacher=${user.username}`}
          title="Teacher Timetables"
        />
      </div>
    </>
  );
};

export default TimeTableData;
