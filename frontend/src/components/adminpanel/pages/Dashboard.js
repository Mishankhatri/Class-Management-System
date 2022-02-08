import React, { useEffect } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import CardData from "../../common/DashboardCardData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../redux/actions/dataactions";

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData("adminnotices"));
  }, [dispatch]);
  const adminnotices = useSelector((state) => state.data.adminnotices.results);
  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Dashboard"} />
      <div className="main-content">
        <div className="cardelement">
          <CardData
            number={199}
            name={"Students"}
            icon={<FaIcons.FaUsers style={{ color: "#FFC36D" }} />}
          />
          <CardData
            number={111}
            name={"Teachers"}
            icon={<FaIcons.FaUserSecret style={{ color: "#FF7676" }} />}
          />
          <CardData
            number={8}
            name={"Faculties"}
            icon={<FaIcons.FaFlag style={{ color: "#009DDC" }} />}
          />
          <CardData
            number={9}
            name={"Classes"}
            icon={<FaIcons.FaFile style={{ color: "#27AE60" }} />}
          />
        </div>
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaBullhorn />
            </span>
            <span className="title">ANNOUNCEMENT</span>
          </div>
          <div className="content-section">
            {adminnotices ? (
              adminnotices.map((adminnotice) => (
                <div className="content-section" key={adminnotice.id}>
                  {/* <Link to={"/admin/annoucements/" + adminnotice.id}>
                    {adminnotice.title}
                  </Link> */}
                  <h2>{adminnotice.title}</h2>
                  <div className="mid-content new-adminnotice">
                    {adminnotice.details}
                  </div>
                  <p>Annoucement From-{adminnotice.created_by.username}</p>
                  <p>Annoucement For-{adminnotice.annoucement_for}</p>
                  <a
                    href={adminnotice.files}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Download:Available Files.
                  </a>
                </div>
              ))
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
