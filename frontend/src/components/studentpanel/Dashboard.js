import React, { useEffect } from "react";
import InnerHeader from "../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import CardData from "../common/DashboardCardData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/actions/dataactions";

import { GetClass } from "../../redux/actions/classactions";
import Moment from "react-moment";
import reverseArray from "../common/ReverseArray";
import { GET_DETAILS } from "../../redux/actions/student/studentactions";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData("adminnotices"));
    dispatch(GetClass());
    dispatch(GET_DETAILS("/student", "GET_STUDENT_DETAIL"));
    dispatch(GET_DETAILS("/teacher", "GET_TEACHER_DETAIL"));
  }, [dispatch]);
  const {
    adminnotices: { results },
  } = useSelector((state) => state.data);

  const { grades } = useSelector((state) => state.classes);
  const { teacherDetail } = useSelector((state) => state.teachers);
  const { student } = useSelector((state) => state.students);

  const adminnotices = results && reverseArray(results);

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Dashboard"} />
      <div className="main-content">
        <div className="cardelement">
          {student && (
            <CardData
              number={student.length}
              name={"Students"}
              icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
            />
          )}

          {
            <CardData
              number={teacherDetail?.length}
              name={"Teachers"}
              icon={<FaIcons.FaUserSecret style={{ color: "#FF7676" }} />}
            />
          }
          {
            <CardData
              number={adminnotices?.length}
              name={"Announcements"}
              icon={<FaIcons.FaBullhorn style={{ color: "#009DDC" }} />}
            />
          }
          {
            <CardData
              number={grades?.length}
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
