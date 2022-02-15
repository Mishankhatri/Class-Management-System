import React, { useEffect } from "react";
import InnerHeader from "../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import CardData from "../common/DashboardCardData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GetClass } from "../../redux/actions/classactions";
import Moment from "react-moment";
import reverseArray from "../common/ReverseArray";
import { GET_DETAILS } from "../../redux/actions/student/studentactions";
import { GetTeacherAnnouncement } from "./../../redux/actions/teacher/teacheractions";
import Loading from "../common/Loading";
import { getData } from "./../../redux/actions/dataactions";
import { GetAdminAnnouncement } from "../../redux/actions/admin/announcementaction";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClass());
    dispatch(GetAdminAnnouncement("all"));
    dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
    dispatch(GET_DETAILS("/teacher", "GET_TEACHER_DETAIL"));
    dispatch(GetTeacherAnnouncement());
  }, [dispatch]);

  const { teacherDetail, teachernotices } = useSelector(
    (state) => state.teachers
  );
  const { student } = useSelector((state) => state.students);

  const { user } = useSelector((state) => state.auth);

  const currentStudentDetail =
    student && student.find((value) => (value.user.id = user.id));

  const teachernoticesReverse =
    teachernotices &&
    reverseArray(teachernotices).filter(
      (value) =>
        value.announcement_for_class.class_name ==
          currentStudentDetail?.current_grade.class_name &&
        value.announcement_for_class.section ==
          currentStudentDetail?.current_grade.section
    );

  return student ? (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Dashboard"} />
      <div className="main-content">
        <div className="cardelement">
          {student && (
            <CardData
              number={student.length}
              name={"Attendance"}
              icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
            />
          )}

          {
            <CardData
              number={teacherDetail?.length}
              name={"Assignments"}
              icon={<FaIcons.FaUserSecret style={{ color: "#FF7676" }} />}
            />
          }
          {teachernotices && (
            <CardData
              number={teachernoticesReverse?.length}
              name={"Announcements"}
              icon={<FaIcons.FaBullhorn style={{ color: "#009DDC" }} />}
            />
          )}
          {
            <CardData
              number={111}
              name={"Lecture Notes"}
              icon={<FaIcons.FaFile style={{ color: "#27AE60" }} />}
            />
          }
        </div>
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaBullhorn />
            </span>
            <span className="title">ANNOUNCEMENT</span>
          </div>
          <div className="content-section" style={{ paddingTop: 30 }}>
            {teachernotices ? (
              teachernoticesReverse.slice(0, 3).map((rowData, index) => {
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
                              {rowData.created_by.fullname}
                            </span>
                          </span>
                          <span>
                            <span className="createdat">{dates}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    {rowData.files_by_admin ? (
                      <a
                        href={rowData.files_by_admin}
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

            {teachernotices ? (
              teachernoticesReverse.length > 3 && (
                <Link to="/student/announcements" className="btn-text">
                  <div className="morebutton">Load More</div>
                </Link>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
