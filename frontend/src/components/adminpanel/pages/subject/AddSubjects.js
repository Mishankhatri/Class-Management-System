import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { getAddSubjectsValue } from "../../../values/AdminPanel/ClassValue";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import InputField from "../../../common/InputField/InputField";
import TextAreaInput from "../../../common/InputField/TextAreaInput";
import { HeaderInputField } from "../../../common/InputField/HeaderInputField";
import axiosInstance from "../../../../axios";
import { AddGeneralDetails } from "../../../../redux/actions/student/studentactions";
import { ADD__SUBJECTS } from "./../../../../redux/actions/subjectactions";
import { returnErrors } from "../../../../redux/actions/alertactions";

function AddSubjects() {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  const [selectClassRef, setClassRef] = useState(null);
  const [selectSectionRef, setSectionRef] = useState(null);

  const refClearClass = (ref) => setClassRef(ref);
  const refClearSection = (ref) => setSectionRef(ref);

  const onSubmitForm = (data, e) => {
    const postData = new FormData();

    postData.append("subject_name", data.subjectsName);
    postData.append("subject_code", data.subjectsCode);
    postData.append("description", data.description);

    axiosInstance
      .get(
        `/grades?classname=${data.studentClass.value}&section=${data.studentSection.value}`
      )
      .then(({ data: { results } }) => {
        postData.append("grade", results[0].id);
      })
      .then(() => {
        dispatch(
          ADD__SUBJECTS(
            postData,
            `Class ${data.studentClass.value} Added Successfully with Section "${data.studentSection.value}"`
          )
        );
      })
      .catch((error) => {
        if (error.response) {
          console.log("Response", error.response);
        } else if (error.request) {
          console.log("Request", error.request);
        } else console.log(error);
        dispatch(returnErrors(error.response.data, error.response.status));
      });

    // selectClassRef.clearValue();
    // selectSectionRef.clearValue();
  };

  return (
    <>
      <div>
        <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Subjects"} />
        <div className="main-content">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <FaIcons.FaUser />
                </span>
                <span className="title">ADD SUBJECT</span>
              </div>

              <div className={"content-section"}>
                <div className="custom-selection">
                  {getAddSubjectsValue().map((value, index) => {
                    return (
                      <Controller
                        name={value.name}
                        control={control}
                        key={index}
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
                          />
                        )}
                      />
                    );
                  })}

                  <Controller
                    name={"studentClass"}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputField
                        title={"Class".toUpperCase()}
                        input={"dropdown"}
                        icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                        name={"studentClass"}
                        onChangeHandler={field.onChange}
                        isRequired={true}
                        options={[
                          { value: "12", label: "12" },
                          { value: "11", label: "11" },
                          { value: "10", label: "10" },
                          { value: "9", label: "9" },
                          { value: "8", label: "8" },
                          { value: "7", label: "7" },
                          { value: "6", label: "6" },
                          { value: "5", label: "5" },
                        ]}
                        refClear={refClearClass}
                      />
                    )}
                  />

                  <Controller
                    name={"studentSection"}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputField
                        title={"Section".toUpperCase()}
                        input={"dropdown"}
                        icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                        name={"studentSection"}
                        onChangeHandler={field.onChange}
                        isRequired={true}
                        options={[
                          { value: "A", label: "A" },
                          { value: "B", label: "B" },
                          { value: "C", label: "C" },
                          { value: "D", label: "D" },
                          { value: "E", label: "E" },
                          { value: "F", label: "F" },
                        ]}
                        refClear={refClearSection}
                      />
                    )}
                  />
                </div>
                <Controller
                  name={"description"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="mid-content">
                      <HeaderInputField
                        title={"Description".toUpperCase()}
                        icon={<MdIcons.Md10K className="mid-icon" />}
                        isRequired={false}
                      />
                      <div className="label-input">
                        <TextAreaInput
                          name={"description"}
                          placeholder="Subject Description..."
                          onChangeHandler={field.onChange}
                        />
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
            <button className="morebutton btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddSubjects;
