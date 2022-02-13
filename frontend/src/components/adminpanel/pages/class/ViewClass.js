import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../../../common/InnerHeader";
import ClassTableData from "./ClassTableData";
import ChangeInput from "./../../../common/Modal/ChangeInput";
import { getClassSectionMerge } from "./../../../values/AdminPanel/ClassValue";

function ViewClass() {
  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <div>
      <ChangeInput
        onSubmit={onSubmit}
        valueArray={getClassSectionMerge()}
        click={click}
        setClick={setClick}
        heading={"View Class"}
        isCustom1={true} //For showing grid 3
        isCustom2={false} //For showing description
      />
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Class"} />
      <ClassTableData click={click} setClick={setClick} />
    </div>
  );
}

export default ViewClass;
