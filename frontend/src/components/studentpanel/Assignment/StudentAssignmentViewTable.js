import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStudentSubmittedAssignment,
  GetTeacherAssignmentFilter,
} from "./../../../redux/actions/teacher/teacheractions";
import moment from "moment";
import Loading from "../../common/Loading";
import axiosInstance from "../../../axios";

const StudentAssignmentViewTable = () => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetStudentSubmittedAssignment());
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        dispatch(
          GetTeacherAssignmentFilter(
            `?ordering=-id&grade=${results[0].current_grade.id}`
          )
        );
      });
  }, []);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { assignmentFilter, submittedAssignment } = useSelector(
    (state) => state.teachers
  );

  const handleView = (row) => {
    navigate(`/student/assignment/upload/assignmentId=${row.original.id}`);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SN",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },

      {
        Header: "Date due",
        accessor: "date_due",
        SearchAble: false,
      },

      {
        Header: "Time due",
        accessor: (d) => {
          return moment(d.time_due, "HH,mm").format("LT");
        },
        SearchAble: false,
      },
      {
        Header: "Status",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
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

  return assignmentFilter ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={assignmentFilter} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default StudentAssignmentViewTable;
