import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialTableContainer from "./../../../common/MaterialTableFilter";
import { useSelector } from "react-redux";

import moment from "moment";
import Loading from "../../common/Loading";
import axiosInstance from "../../../axios";

const StudentAssignmentViewTable = () => {
  const navigate = useNavigate();
  const [gradeId, setGradeId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        setGradeId(results[0].current_grade.id);
      });
  }, []);

  const handleView = (row) => {
    navigate(`/student/assignment/upload/assignmentId=${row.id}`);
  };

  const columns = useMemo(
    () => [
      {
        title: "SN",
        width: 100,
        render: ({ tableData }) => {
          return tableData.id + 1;
        },
      },
      {
        title: "Subject",
        field: "subject",
      },

      {
        title: "Teacher",
        field: "created_by.username",
      },

      {
        title: "Date due",
        field: "date_due",
      },

      {
        title: "Time due",
        render: (d) => {
          return moment(d.time_due, "HH,mm").format("LT");
        },
      },
      {
        title: "Action",
        render: (row) => {
          return (
            <>
              <button
                className="btn-custom btn-primary"
                onClick={() => handleView(row)}>
                View Detail
              </button>
            </>
          );
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
          url="givenassignments"
          filter={`grade=${gradeId}&ordering=-id`}
          title="View Assignment"
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default StudentAssignmentViewTable;
