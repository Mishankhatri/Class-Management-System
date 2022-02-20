import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableContainer from "../../../common/Table/TableContainer";
import Moment from "react-moment";
import CustomConfirm from "../../../common/CustomConfirm";

import {
  AdminAnnouncementDeleteSpecific,
  GetAdminAnnouncement,
} from "../../../../redux/actions/admin/announcementaction";
import { SelectColumnFilter } from "../../../common/Table/filters";

const AnnounceByMeTable = () => {
  const { adminnotices } = useSelector((state) => state.admins);

  const { user } = useSelector((state) => state.auth);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteId, setdeleteId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminAnnouncement(`admin=${user.username}&ordering=-id`));
  }, [dispatch]);

  const newArray = adminnotices && adminnotices.results;

  const handleDelete = (id) => {
    setdeleteId(id);
    setClickDelete(true);
  };

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
          user={user}
          setDelete={setClickDelete}
          id={deleteId}
          PeformDelete={AdminAnnouncementDeleteSpecific}
        />
      )}
      <div>
        {adminnotices && <TableContainer columns={columns} data={newArray} />}
      </div>
    </>
  );
};

export default AnnounceByMeTable;
