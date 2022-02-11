import React from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { AddClassActions } from "./../../../../redux/actions/classactions";

function AddClass() {
  const { classes } = useSelector((state) => state.students);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const onSubmitForm = (data, e) => {
    const dataFound = classes.find(
      (value) => value.class_name == data.className
    );

    try {
      if (dataFound) {
        throw `Class "${data.className}" Already Exist`;
      } else {
        dispatch(AddClassActions(data));
        alert.success(
          `Class "${data.className}" Added Succefully with Section A`
        );
      }
    } catch (error) {
      alert.error(error);
    }
    e.target.reset();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Class"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">ACADEMIC INFO</span>
            </div>

            <div className="content-section">
              <Controller
                name={"className"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Class Name is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Class Name".toUpperCase()}
                    input={"text"}
                    icon={<FaIcons.FaBook className="mid-icon" />}
                    placeholder={"Enter Class Name"}
                    name={"className"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                  />
                )}
              />
            </div>
          </div>
          <button className="morebutton btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
