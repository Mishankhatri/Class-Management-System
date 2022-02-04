import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../../common/InnerHeader";
import LectureNotesTable from "./LectureNotesTable";

function ViewLectureNotes() {
  return (
    <React.Fragment>
      <InnerHeader
        icon={<MdIcons.MdUploadFile />}
        name={"View Uploaded Notes"}
      />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaFileArchive />
            </span>
            <span className="title">VIEW LECTURE NOTES</span>
          </div>
          <div className="content-section">
            <LectureNotesTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ViewLectureNotes;
