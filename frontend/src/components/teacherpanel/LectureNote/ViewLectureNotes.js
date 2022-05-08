import React from "react";
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
      <LectureNotesTable />
    </React.Fragment>
  );
}
export default ViewLectureNotes;
