import React from "react";
import InnerHeader from "./../common/InnerHeader";
import * as MdIcons from "react-icons/md";

function LectureNotes() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdFileCopy />} name={"Download Notes"} />
    </React.Fragment>
  );
}
export default LectureNotes;
