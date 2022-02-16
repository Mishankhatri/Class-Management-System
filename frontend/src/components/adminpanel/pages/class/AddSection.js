import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import { GetGradeOptions } from "../../../GetOptions";

function AddSection() {
  const [selectRef, setSelectRef] = useState(null);
  const { handleSubmit, control } = useForm();
  const refClear = (ref) => setSelectRef(ref);
  const section = GetGradeOptions();
  // console.log(section);

  const onSubmitForm = (data, e) => {
    console.log(data);
    e.target.reset();
    selectRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Section"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">ACADEMIC INFO</span>
            </div>
            <div
              className="content-section"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
              }}>
              <Controller
                name={"studentClass"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Student Class".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentClass"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    // options={optionsClass}
                    // refClear={refClearAcademicFirst}
                  />
                )}
              />

              <Controller
                name={"studentSection"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Student Section".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentSection"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    // options={optionsSection}
                    // refClear={refClearAcademicSecond}
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

export default AddSection;
