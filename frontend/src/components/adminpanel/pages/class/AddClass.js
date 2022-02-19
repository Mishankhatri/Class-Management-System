import React from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { AddClassActions } from "./../../../../redux/actions/classactions";
import axiosInstance from "./../../../../axios";

function AddClass() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const onSubmitForm = (data, e) => {
    e.target.reset();
    if (data.className != 0) {
      axiosInstance
        .get(`/grades/?classname=${data.className}`)
        .then(({ data: values }) => {
          if (values.count == 0) {
            dispatch(
              AddClassActions(
                data.className,
                `Class "${data.className}" Added Succefully with Section A`
              )
            );
          } else {
            throw `Class "${data.className}" Already Exist`;
          }
        })
        .catch((error) => {
          alert.error(error);
        });
    } else alert.error("Class 0 Can't be added");
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
              <div className="message">
                By Default, Current Section will be <b>"A"</b>
              </div>
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
