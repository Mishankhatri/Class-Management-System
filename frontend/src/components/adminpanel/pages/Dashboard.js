import React, { useEffect } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import CardData from "../../common/DashboardCardData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GetClass } from "../../../redux/actions/classactions";
import Moment from "react-moment";
import { GET_DETAILS } from "../../../redux/actions/student/studentactions";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClass());
    dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
    dispatch(GET_DETAILS("/teacher", "GET_TEACHER_DETAIL"));
  }, [dispatch]);

  const { adminfilternotices } = useSelector((state) => state.admins);
  const { grades } = useSelector((state) => state.classes);
  const { teacherDetail } = useSelector((state) => state.teachers);
  const { student } = useSelector((state) => state.students);
  const adminnotices = adminfilternotices && adminfilternotices.results;

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Dashboard"} />
      <div className="main-content">
        <div className="cardelement">
          {student && (
            <CardData
              number={student.count}
              name={"Students"}
              icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
            />
          )}

          {
            <CardData
              number={teacherDetail?.count}
              name={"Teachers"}
              icon={
                <FaIcons.FaChalkboardTeacher style={{ color: "#FF7676" }} />
              }
            />
          }
          {
            <CardData
              number={adminfilternotices?.count}
              name={"Announcements"}
              icon={<FaIcons.FaBullhorn style={{ color: "#009DDC" }} />}
            />
          }
          {
            <CardData
              number={grades?.count}
              name={"Classes"}
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
            {adminnotices ? (
              adminnotices.slice(0, 3).map((rowData, index) => {
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

            <Link to="/admin/announcements/view" className="btn-text">
              <div className="morebutton">Load More</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
