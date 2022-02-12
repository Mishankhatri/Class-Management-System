import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as MdIcons from "react-icons/md";
import { CloseAnnouncementModal } from "../../redux/actions/admin/announcementaction";
import Moment from "react-moment";

function AnnouncementCard() {
  const dispatch = useDispatch();
  const { adminnoticesId: rowData } = useSelector((state) => state.admins);

  const CloseHandler = () => {
    dispatch(CloseAnnouncementModal());
  };

  const dates = <Moment fromNow>{rowData.created_at}</Moment>;
  return (
    <>
      <React.Fragment>
        <div className="dialog-ovelay">
          <div className="dialog custom">
            <header>
              <h3>Announcement</h3>
              <MdIcons.MdClose className="fa-close" onClick={CloseHandler} />
            </header>

            <div className="dialog-msg">
              <div className="announcementtable dasboardannouncement">
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
                  <img src={rowData.created_by.profile_image} alt="profile" />
                </div>
              </div>
            </div>
            <footer>
              <div className="controls">
                <button className="button button-false" onClick={CloseHandler}>
                  Close
                </button>
              </div>
            </footer>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
export default AnnouncementCard;
