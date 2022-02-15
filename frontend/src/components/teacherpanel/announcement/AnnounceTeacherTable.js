import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "../../common/Table/TableContainer";
import Moment from "react-moment";

import reverseArray from "../../common/ReverseArray";
import CustomConfirm from "../../common/CustomConfirm";

import {
  GetTeacherAnnouncement,
  DeleteTeacherAnnouncements,
} from "./../../../redux/actions/teacher/teacheractions";

const AnnouncementTeacherTable = () => {
  const { teachernotices: data } = useSelector((state) => state.teachers);

  const { user } = useSelector((state) => state.auth);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetTeacherAnnouncement(user.username));
  }, [dispatch]);

  const newArray = data && reverseArray(data);

  const handleDelete = ({ id }) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Class",
        SearchAble: true,
        Filter: SelectColumnFilter,
        accessor: (d) =>
          `${d.announcement_for_class.class_name}: ${d.announcement_for_class.section}`,
      },
      {
        Header: "Details",
        className: "detail-column",
        accessor: (rowData) => {
          const dates = <Moment fromNow>{rowData.created_at}</Moment>;

          return (
            <div className="announcementtable" style={{ display: "block" }}>
              <div>
                <div className="title">Title : {rowData.title}</div>
                <div className="subjects">Subjects: {rowData.details}</div>

                <div className="createdate">
                  <div className="info">
                    <span className="date">
                      Date: {rowData.created_at.slice(0, 10)}
                    </span>

                    <span>
                      <span className="createdat">{dates}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Files",
        accessor: (rowData) => {
          return rowData.files_by_teachers ? (
            <a
              href={rowData.files_by_teachers}
              target="_blank"
              className="btn-primary btn-custom"
              style={{ textDecoration: "none" }}>
              Download
            </a>
          ) : (
            <p>No file Provided</p>
          );
        },
      },
      {
        Header: "Action",
        accessor: (row) => (
          <button
            onClick={() => handleDelete(row)}
            className="btn-danger btn-custom">
            Delete
          </button>
        ),
      },
    ],
    []
  );

  return (
    <>
      {clickDelete && (
        <CustomConfirm
          title={"Delete Announcement"}
          msg={"Are you sure you want to delete?"}
          trueActivity={"Yes"}
          falseActivity={"Cancel"}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={DeleteTeacherAnnouncements}
        />
      )}
      <div>{data && <TableContainer columns={columns} data={newArray} />}</div>
    </>
  );
};

export default AnnouncementTeacherTable;
