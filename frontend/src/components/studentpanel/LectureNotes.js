import React from "react";
import InnerHeader from "./../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import LectureNotesTable from "./TableData/LectureNotesTable";

function LectureNotes() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdFileCopy />} name={"Download Notes"} />
      <LectureNotesTable />
    </React.Fragment>
  );
}
export default LectureNotes;
