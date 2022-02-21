import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteTeacherGivenAssignment,
  GetTeacherGivenAssignment,
} from "../../../redux/actions/teacher/teacheractions";
import CustomConfirm from "../../common/CustomConfirm";
import Loading from "../../common/Loading";
import TableContainer from "./../../common/Table/TableContainer";
import moment from "moment";
import { SelectColumnFilter } from "../../common/Table/filters";
import reverseArray from "./../../common/ReverseArray";

const AssignmentTableData = () => {
  const navigate = useNavigate();

  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const dispatch = useDispatch();
  const { assignments } = useSelector((state) => state.teachers);
  const { user } = useSelector((state) => state.auth);

  const filterAssignment = assignments && reverseArray(assignments);

  const handleView = (row) => {
    navigate(`/teacher/assignment/view/id=${row.original.id}`);
  };

  useEffect(() => {
    dispatch(GetTeacherGivenAssignment(user.username));
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Class",
        accessor: "for_grade",
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Subject",
        accessor: "subject",
        SearchAble: true,
      },
      {
        Header: "Title",
        accessor: "title",
        SearchAble: false,
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
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                className="btn-custom btn-1 btn-primary"
                onClick={() => handleView(row)}>
                View
              </button>
              <button
                className="btn-custom btn-danger"
                onClick={() => handleDelete(row.original.id)}>
                Delete
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  return filterAssignment ? (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteTeacherGivenAssignment}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        <TableContainer columns={columns} data={filterAssignment} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AssignmentTableData;
