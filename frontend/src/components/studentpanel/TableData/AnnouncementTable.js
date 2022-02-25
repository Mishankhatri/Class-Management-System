import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectColumnFilter } from "../../common/Table/filters";
import TableContainer from "../../common/Table/TableContainer";
import Moment from "react-moment";
import reverseArray from "../../common/ReverseArray";
import { GetAdminFilterAnnouncement } from "./../../../redux/actions/admin/announcementaction";

const AnnouncementTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminFilterAnnouncement("ordering=-id&for=all"));
  }, [dispatch]);

  const { adminfilternotices } = useSelector((state) => state.admins);
  const data = adminfilternotices && adminfilternotices.results;

  // console.log(data.reverse());
  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
        SearchAble: true,
        Filter: SelectColumnFilter,
        className: "subject-column",
      },

      {
        Header: "Details",
        className: "detail-column",
        accessor: (rowData) => {
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
                        {rowData.created_by.fullname}
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
        Header: "Files",
        accessor: (rowData) => {
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
      <div>{data && <TableContainer columns={columns} data={data} />}</div>
    </>
  );
};

export default AnnouncementTable;
