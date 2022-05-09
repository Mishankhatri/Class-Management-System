import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTableContainer from "../../../common/MaterialTableFilter";
import Moment from "react-moment";

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

  const handleDelete = ({ id }) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        title: "Class",
        width: 100,
        render: (d) =>
          `${d.announcement_for_class.class_name}: ${d.announcement_for_class.section}`,
      },
      {
        title: "Details",
        className: "detail-column",
        render: (rowData) => {
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
        title: "Files",
        width: 100,
        render: (rowData) => {
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
        title: "Action",
        width: 100,
        render: (row) => (
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
          user={user}
          id={deleteId}
          PeformDelete={DeleteTeacherAnnouncements}
        />
      )}
      <div>
        {data && (
          <MaterialTableContainer
            columns={columns}
            url="teachernotices"
            filter={`teacher=${user.username}&ordering=-id`}
            title="Announcement"
          />
        )}
      </div>
    </>
  );
};

export default AnnouncementTeacherTable;
