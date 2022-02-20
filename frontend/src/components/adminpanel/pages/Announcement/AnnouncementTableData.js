import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SelectColumnFilter } from "../../../common/Table/filters";
import TableContainer from "../../../common/Table/TableContainer";
import Moment from "react-moment";

import CustomConfirm from "../../../common/CustomConfirm";
import { AdminAnnouncementDelete } from "../../../../redux/actions/admin/announcementaction";

const AnnouncementTableData = () => {
  const { adminfilternotices } = useSelector((state) => state.admins);

  const { user } = useSelector((state) => state.auth);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

  const results = adminfilternotices && adminfilternotices.results;
  const columns = useMemo(
    () => [
      {
        Header: "Accessor",
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

      {
        Header: "Action",
        accessor: (data) => {
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
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={AdminAnnouncementDelete}
        />
      )}
      <div>
        {results && <TableContainer columns={columns} data={results} />}
      </div>
    </>
  );
};

export default AnnouncementTableData;
