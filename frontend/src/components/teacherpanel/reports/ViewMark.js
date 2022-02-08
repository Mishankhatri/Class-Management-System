import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InnerHeader from "../../common/InnerHeader";
import MarkTableData from "./MarkTableData";
import MarkInputValue from "../../values/TeacherPanel/MarkInputValue";
import ChangeInput from "../../common/Modal/ChangeInput";

function ViewMark() {
  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <React.Fragment>
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={MarkInputValue()}
          click={click}
          setClick={setClick}
          heading={"View Class"}
          isCustom1={false} //For showing grid 3
          // isCustom2={true} //For showing description
        />
      )}
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
            <span className="title">VIEW Marks</span>
          </div>
          <div className="content-section">
            <MarkTableData click={click} setClick={setClick} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ViewMark;
