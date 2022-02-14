import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import "../users/UserProfile.css";
import { getTeacherInputValues } from "./../../../values/AdminPanel/TeacherInputField";
import { Controller, useForm } from "react-hook-form";
import InputField from "./../../../common/InputField/InputField";
import { ErrorMessage } from "@hookform/error-message";
import TeacherTableData from "./TeacherTableData";

function ViewTeacher() {
  const { handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <div className="modal">
        <div className="model-section">
          <div className="modal-content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="close">&times;</span>
              <div className="content">
                <h2>Update Teacher Info</h2>

                <div className="content-section modal-inputfield">
                  {getTeacherInputValues().map((value, index) => {
                    return (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
                        rules={{
                          required: {
                            value: value.isRequired,
                            message: `${value.title} is required`,
                          },
                        }}
                        defaultValue=""
                        render={({ field }) => (
                          <InputField
                            title={value.title.toUpperCase()}
                            input={value.input}
                            icon={value.icon}
                            placeholder={value?.placeholder}
                            name={value.name}
                            onChangeHandler={field.onChange}
                            isCustomInput={value.isCustomField}
                            isTextArea={value?.isTextarea}
                            isRequired={value.isRequired}
                            isImageFile={value?.isImageFile}
                            options={value?.options}
                            errors={errors}
                            ErrorMessage={ErrorMessage}
                          />
                        )}
                      />
                    );
                  })}
                </div>

                <button
                  className="btn-submit"
                  style={{ marginLeft: "40px", marginTop: "20px" }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Teacher"} />
      <TeacherTableData />
    </div>
  );
}

export default ViewTeacher;
