import React, { useState } from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import InputField from "../../../common/InputField/InputField";

function AddClass() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data, e) => {
    console.log(data);

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
                    errors={errors}
                    ErrorMessage={ErrorMessage}
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
