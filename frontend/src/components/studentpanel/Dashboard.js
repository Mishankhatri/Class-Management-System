import React, { useEffect, useState } from "react";
import InnerHeader from "../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import CardData from "../common/DashboardCardData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import {
  GetLectureNotesFilter,
  GetTeacherAssignmentFilter,
  GetTeacherFilterAnnouncement,
} from "./../../redux/actions/teacher/teacheractions";
import { GetAdminFilterAnnouncement } from "../../redux/actions/admin/announcementaction";
import axiosInstance from "../../axios";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAdminFilterAnnouncement("for=all"));
  }, [dispatch]);

  const { teacherNoticesFilter, assignmentFilter, lectureNotesFilter } =
    useSelector((state) => state.teachers);
  const { adminfilternotices } = useSelector((state) => state.admins);

  //For Attendance Percentage
  const { user } = useSelector((state) => state.auth);
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/student?user=${user.id}`)
      .then(({ data: { results } }) => {
        dispatch(
          GetTeacherFilterAnnouncement(
            `ordering=-id&classname=${results[0].current_grade.id}`
          )
        );
        dispatch(
          GetTeacherAssignmentFilter(
            `?ordering=-id&grade=${results[0].current_grade.id}`
          )
        );
        dispatch(
          GetLectureNotesFilter(
            `?ordering=-id&grade=${results[0].current_grade.id}`
          )
        );
        axiosInstance
          .get(`/attendance?student=${user.username}`)
          .then(({ data: { results } }) => {
            setAttendance(results);
          });
      });
  }, []);

  let totalAbsent;
  let totalPresent;

  if (attendance) {
    totalAbsent = totalPresent = 0;
    for (let i = 0; i < attendance?.length; i++) {
      attendance[i].attendance_status == "ABSENT"
        ? totalAbsent++
        : totalPresent++;
    }
  }

  const totalPercentage =
    attendance && ((totalPresent * 100) / attendance.length).toFixed(1);

  const isBothNotices = adminfilternotices && teacherNoticesFilter;

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Dashboard"} />
      <div className="main-content">
        <div className="cardelement">
          {attendance.length !== 0 ? (
            <CardData
              number={`${totalPercentage}%`}
              name={"Attendance"}
              icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
            />
          ) : (
            <CardData
              number={`No data`}
              name={"Attendance"}
              icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
            />
          )}

          {assignmentFilter ? (
            <CardData
              number={assignmentFilter?.length}
              name={"Assignments"}
              icon={<MdIcons.MdHomeWork style={{ color: "#FF7676" }} />}
            />
          ) : (
            <CardData
              number={"No Data"}
              name={"Assignments"}
              icon={<MdIcons.MdHomeWork style={{ color: "#FF7676" }} />}
            />
          )}
          {isBothNotices ? (
            <CardData
              number={teacherNoticesFilter?.length + adminfilternotices?.count}
              name={"Announcements"}
              icon={<FaIcons.FaBullhorn style={{ color: "#009DDC" }} />}
            />
          ) : (
            <CardData
              number={"No data"}
              name={"Announcements"}
              icon={<FaIcons.FaBullhorn style={{ color: "#009DDC" }} />}
            />
          )}
          {lectureNotesFilter ? (
            <CardData
              number={lectureNotesFilter?.length}
              name={"Lecture Notes"}
              icon={<FaIcons.FaFile style={{ color: "#27AE60" }} />}
            />
          ) : (
            <CardData
              number={"No Data"}
              name={"Lecture Notes"}
              icon={<FaIcons.FaFile style={{ color: "#27AE60" }} />}
            />
          )}
        </div>
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaBullhorn />
            </span>
            <span className="title">ANNOUNCEMENT</span>
          </div>
          <div className="content-section" style={{ paddingTop: 30 }}>
            {teacherNoticesFilter ? (
              teacherNoticesFilter.slice(0, 3).map((rowData, index) => {
                const dates = <Moment fromNow>{rowData.created_at}</Moment>;
                return (
                  <div
                    className="announcementtable dasboardannouncement"
                    key={index}>
                    <div>
                      <div className="title">Title : {rowData.title}</div>
                      <div className="subjects">
                        Subjects: {rowData.details}
                      </div>
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
                    {rowData.files_by_teachers ? (
                      <a
                        href={rowData.files_by_teachers}
                        target="_blank"
                        className="btn-custom btn-primary"
                        style={{ textDecoration: "none" }}>
                        Download
                      </a>
                    ) : (
                      <p>No file Provided</p>
                    )}

                    <div className="profilephoto">
                      <img
                        src={rowData.created_by.profile_image}
                        alt="profile"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No data available</p>
            )}

            {teacherNoticesFilter && teacherNoticesFilter.length > 3 && (
              <Link to="/student/announcements" className="btn-text">
                <div className="morebutton">Load More</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
