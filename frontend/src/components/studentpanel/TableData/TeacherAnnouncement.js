import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TableContainer from "../../common/Table/TableContainer";
import Moment from "react-moment";
import axiosInstance from "../../../axios";

const AnnouncementTeacher = () => {
  const { user } = useSelector((state) => state.auth);
  const [teachernotices, setAnnouncements] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        axiosInstance
          .get(
            `/teachernotices?ordering=-id&classname=${results[0].current_grade.id}`
          )
          .then(({ data: { results } }) => {
            setAnnouncements(results);
          });
      });
  }, []);

  // console.log(data.reverse());
  const columns = useMemo(
    () => [
      {
        Header: "SN",
        SearchAble: false,
        Cell: ({ row }) => row.index + 1,
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
    ],
    []
  );

  return (
    <>
      <div>
        {teachernotices && (
          <TableContainer
            columns={columns}
            data={teachernotices}
            showSearch={false}
          />
        )}
      </div>
    </>
  );
};

export default AnnouncementTeacher;
