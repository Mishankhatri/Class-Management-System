import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "./../../common/Table/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStudentSubmittedAssignment,
  GetTeacherGivenAssignment,
} from "./../../../redux/actions/teacher/teacheractions";
import moment from "moment";
import reverseArray from "../../common/ReverseArray";
import Loading from "../../common/Loading";

const StudentAssignmentViewTable = () => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetTeacherGivenAssignment());
    dispatch(GetStudentSubmittedAssignment());
  }, []);

  const dispatch = useDispatch();
  const { student } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);
  const { assignments, submittedAssignment } = useSelector(
    (state) => state.teachers
  );

  const studentDetail =
    student && student.find((value) => value.user.id === user.id);

  const data =
    assignments &&
    reverseArray(assignments).filter(
      (value) =>
        value.for_grade.class_name == studentDetail.current_grade?.class_name &&
        value.for_grade.section == studentDetail.current_grade?.section
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
        accessor: "subject.subject_name",
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
          return moment(d.time_due, "HH").format("LT");
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

  return studentDetail ? (
    <>
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {data && <TableContainer columns={columns} data={data} />}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default StudentAssignmentViewTable;
