import React from "react";
import InnerHeader from "../../common/InnerHeader";
import FinalResultData from "./FinalResultTable";
import * as MdIcons from "react-icons/md";

function ViewFinalResults() {
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Settings"} />
      <div className="main-content">
        <FinalResultData />
      </div>
    </React.Fragment>
  );
}
export default ViewFinalResults;
