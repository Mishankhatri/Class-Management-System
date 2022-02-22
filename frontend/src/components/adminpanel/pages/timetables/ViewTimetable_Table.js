import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "../../../common/Table/TableContainer";
import moment from "moment";
import { SelectColumnFilter } from "../../../common/Table/filters";
import CustomConfirm from "../../../common/CustomConfirm";
import { useNavigate } from "react-router-dom";
import {
  DeleteTimetables,
  GetAdminTimetables,
} from "../../../../redux/actions/admin/adminaction";

const ViewTimetable_Table = ({ click, setClick }) => {
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { timetables } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(GetAdminTimetables("ordering=-id"));
  }, []);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

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
          const startTime = moment(d.startTime, "HH,mm").format("LT");
          const endTime = moment(d.endTime, "HH,mm").format("LT");
          return `${startTime} to ${endTime}`;
        },
        SearchAble: true,
      },
      {
        Header: "Class",
        accessor: (data) => {
          return `${data.assigned.grade.class_name}:${data.assigned.grade.section}`;
        },
        SearchAble: true,
        Filter: SelectColumnFilter,
      },
      {
        Header: "Subject",
        accessor: (data) => {
          return `${data.assigned.subject.subject_name}:${data.assigned.subject.subject_code}`;
        },
        SearchAble: true,
      },
      {
        Header: "Teacher",
        // accessor: "assigned.teacher",
        accessor: (d) => {
          return `${d.assigned.teacher.first_name} ${d.assigned.teacher.middle_name} ${d.assigned.teacher.last_name}`;
        },
        SearchAble: true,
      },
      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <button
                onClick={() => {
                  navigate(`/admin/timetables/view/${row.original.id}`);
                }}
                className="btn-primary btn-1 btn-custom">
                Edit
              </button>
              <button
                className="btn-danger btn-custom"
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

  return (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete User"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          reverse={true}
          PeformDelete={DeleteTimetables}
        />
      )}
      <div style={{ margin: "20px 30px", marginBottom: 50 }}>
        {timetables && <TableContainer columns={columns} data={timetables} />}
      </div>
    </>
  );
};

export default ViewTimetable_Table;
