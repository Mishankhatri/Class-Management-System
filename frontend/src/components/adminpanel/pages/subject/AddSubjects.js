import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { getAddSubjectsValue } from "../../../values/AdminPanel/ClassValue";
import { useForm, Controller } from "react-hook-form";
import CustomController from "../../../common/Controller";
import { useDispatch, useSelector } from "react-redux";
import AddSubject from "./../../../../redux/actions/subjectactions";
import { useAlert } from "react-alert";

function AddSubjects() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { grades } = useSelector((state) => state.classes);
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const { handleSubmit, control } = useForm();

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    console.log(data);
    dispatch(AddSubject(data, grades));
    alert.success("Subjects Added Successfully");
    e.target.reset();
  };

  return (
    <>
      <div>
        <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Subjects"} />
        <div className="main-content">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <CustomController
              title={"ADD SUBJECT"}
              icon={<FaIcons.FaUser />}
              ValueArray={getAddSubjectsValue()}
              refClear={refClear}
              control={control}
              Controller={Controller}
              isCustom={true}
              isCustom2={true}
            />
            <button className="morebutton btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddSubjects;
