import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import MaterialTableContainer from "../../../../common/MaterialTableFilter";
import Moment from "react-moment";
import CustomConfirm from "../../../common/CustomConfirm";

import { AdminAnnouncementDeleteSpecific } from "../../../../redux/actions/admin/announcementaction";

const AnnounceByMeTable = () => {
  const { user } = useSelector((state) => state.auth);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const columns = useMemo(
    () => [
      {
        title: "Type",
        field: "type",
        width: 120,
      },

      {
        title: "Details",
        field: "detail-column",
        render: (rowData) => {
          const dates = <Moment fromNow>{rowData.created_at}</Moment>;

          return (
            <div className="announcementtable">
              <div>
                <div className="title">Title : {rowData.title}</div>
                <div className="subjects">Subjects: {rowData.details}</div>

                <div className="createdate">
                  <div className="info">
                    <span className="date">
                      Date: {rowData.created_at.slice(0, 10)}
                    </span>
                    <span className="announced">
                      Announced By:{"  "}
                      <span className="createdby">
                        {rowData.created_by.username}
                      </span>
                    </span>
                    <span>
                      <span className="createdat">{dates}</span>
                    </span>
                  </div>
                  <div className="info">
                    <span>
                      For:{" "}
                      <span
                        className="createdat"
                        style={{ textTransform: "capitalize" }}>
                        {rowData.announcement_for}
                        {}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="profilephoto">
                <img src={rowData.created_by.profile_image} alt="profile" />
              </div>
            </div>
          );
        },
      },
      {
        title: "Files",
        width: 120,
        render: (rowData) => {
          return rowData.files_by_admin ? (
            <a
              href={rowData.files_by_admin}
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
        render: (data) => {
          if (data.created_by.username == user.username)
            return (
              <button
                className="btn-danger btn-custom"
                onClick={() => handleDelete(data.id)}>
                Delete
              </button>
            );
          else return;
        },
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
          user={user}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={AdminAnnouncementDeleteSpecific}
        />
      )}
      <div>
        <MaterialTableContainer
          columns={columns}
          url={"adminnotices"}
          title="Announcment"
          filter={`admin=${user.username}&ordering=-id`}
        />
      </div>
    </>
  );
};

export default AnnounceByMeTable;
