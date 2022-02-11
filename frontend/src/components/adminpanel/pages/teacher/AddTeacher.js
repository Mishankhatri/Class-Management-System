import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { getTeacherInputValues } from "../../../values/AdminPanel/TeacherInputField";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CustomController from "./../../../common/Controller";
import { useDispatch } from "react-redux";
import { AddTeacherDetail } from "../../../../redux/actions/teacher/teacheractions";

function AddTeacher() {
  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);
  const dispatch = useDispatch();

  const onSubmitForm = (data, e) => {
    dispatch(AddTeacherDetail(data));
    // e.target.reset();
    // selectRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Teacher"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={"ADD TEACHER"}
            icon={<FaIcons.FaUser />}
            ValueArray={getTeacherInputValues()}
            refClear={refClear}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={false}
            hasFile={true}
            fileTitle={"Upload Photo"}
            fileIcon={<FaIcons.FaPhotoVideo className="mid-icon" />}
            fileName={"teacherPhoto"}
          />
          <button className="morebutton btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
