import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Moment from "react-moment";
import axiosInstance from "../../../axios";
import MaterialTableContainer from "../../../common/MaterialTableFilter";
import Loading from "../../common/Loading";

const AnnouncementTeacher = () => {
  const { user } = useSelector((state) => state.auth);
  const [gradeId, setGradeId] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        setGradeId(results[0].current_grade.id);
      });
  }, [user]);

  const columns = useMemo(
    () => [
      {
        title: "SN",
        width: 100,
        render: ({ tableData }) => tableData.id + 1,
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
          return rowData.files_by_teachers ? (
            <a
              href={rowData.files_by_teachers}
              target="_blank"
              rel="noreferrer"
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

  return gradeId ? (
    <>
      <div>
        <MaterialTableContainer
          columns={columns}
          url="teachernotices"
          title={"Teacher Announcements"}
          filter={`classname=${gradeId}&ordering=-id`}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AnnouncementTeacher;
