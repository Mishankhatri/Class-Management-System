import React from "react";
import InnerHeader from "./../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import LectureNotesTable from "./TableData/LectureNotesTable";

function LectureNotes() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdFileCopy />} name={"Download Notes"} />
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
export default LectureNotes;
