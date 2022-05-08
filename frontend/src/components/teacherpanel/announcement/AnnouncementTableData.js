import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectColumnFilter } from "../../common/Table/filters";

import Moment from "react-moment";

import { GetAdminAnnouncement } from "../../../redux/actions/admin/announcementaction";
import MaterialTableContainer from "../../../common/MaterialTableFilter";

const AnnouncementTableData = () => {
  const { adminnotices } = useSelector((state) => state.admins);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminAnnouncement("ordering=-id"));
  }, [dispatch]);

  const results = adminnotices && adminnotices.results;

  // console.log(data.reverse());
  const columns = useMemo(
    () => [
      {
        title: "Type",
        field: "type",
        width: 100,
      },

      {
        title: "Details",
        className: "detail-column",
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
          filter={`ordering=-id`}
          title="Announcement"
        />
      </div>
    </>
  );
};

export default AnnouncementTableData;
