import React, { useMemo } from "react";
import Moment from "react-moment";
import MaterialTableContainer from "../../../common/MaterialTableFilter";

const AnnouncementTable = () => {
  const columns = useMemo(
    () => [
      {
        title: "Type",
        width: 100,
        field: "type",
      },

      {
        title: "Details",
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
        width: 100,
        render: (rowData) => {
          return rowData.files_by_admin ? (
            <a
              href={rowData.files_by_admin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-custom"
              style={{ textDecoration: "none" }}>
              Download
            </a>
          ) : (
            <p>No file Provided</p>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div>
        <MaterialTableContainer
          columns={columns}
          url="adminnotices"
          title={"Admin Announcements"}
          filter={`for=all&ordering=-id`}
        />
      </div>
    </>
  );
};

export default AnnouncementTable;
