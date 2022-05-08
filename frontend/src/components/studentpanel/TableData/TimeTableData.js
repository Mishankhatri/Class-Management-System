import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTableContainer from "../../../common/MaterialTableFilter";

import moment from "moment";
import axiosInstance from "../../../axios";

const TimeTableData = () => {
  const { user } = useSelector((state) => state.auth);

  const [gradeId, setGradeId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        setGradeId(results[0].current_grade.id);
      });
  }, []);

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
        width: 150,
        field: "day",
      },
      {
        title: "Time",
        render: (d) => {
          const startTime = moment(d.startTime, "HH").format("LT");
          const endTime = moment(d.endTime, "HH").format("LT");
          return `${startTime} to ${endTime}`;
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
          return `${d.assigned.teacher.first_name} ${d.assigned.teacher.middle_name} ${d.assigned.teacher.last_name}`;
        },
      },
    ],
    []
  );

  return gradeId ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <MaterialTableContainer
          columns={columns}
          url={"timetable"}
          title="Timetables"
          filter={`ordering=id&grade=${gradeId}`}
        />
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default TimeTableData;
