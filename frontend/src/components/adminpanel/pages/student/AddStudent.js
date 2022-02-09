import React, { useState, useEffect } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InputField from "../../../common//InputField/InputField";
import CustomController from "../../../common/Controller";
import axios from "axios";

import {
  getParentInfoValues,
  getStudentInputValues,
  getAcademicValues,
} from "../../../values/AdminPanel/StudentInputField";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

// student obtained values
const studentInitialValue = {
  //Student Info
  studentFirstName: "",
  studentMiddleName: "",
  studentLastName: "",
  studentGender: "",
  studentDOB: "",
  studentPhone: "",
  studentEmail: "",
  studentLocation: "",
  studentPhoto: "",

  //Parent Info
  studentFatherName: "",
  studentMotherName: "",
  parentAddress: "",
  parentState: "",
  parentContact: "",
  parentAdditionalContact: "",
  parentEmail: "",
  parentPhoto: "",

  //Academic Info
  studentClass: "",
  studentSection: "",
  studentRoll: "",
};

function AddStudent() {
  const addAcademicValues = getAcademicValues();

  //For Reseting Select Options while Submitting
  const [selectRefStudent, setSelectRefStudent] = useState(null);
  const [selectRefParent, setSelectRefParent] = useState(null);
  const [selectRefAcademicFirst, setSelectRefAcademicFirst] = useState(null);
  const [selectRefAcademicSecond, setSelectRefAcademicSecond] = useState(null);

  //Define requirements from useform
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    studentInitialValue,
  });

  //Reset Value using ref for Select Options

  //Clearing Student Info Select
  const refClearStudent = (ref) => setSelectRefStudent(ref);
  const refClearParent = (ref) => setSelectRefParent(ref);
  const refClearAcademicFirst = (ref) => setSelectRefAcademicFirst(ref);
  const refClearAcademicSecond = (ref) => setSelectRefAcademicSecond(ref);

  //Getting options for academic info
  const optionsClass = addAcademicValues[0].options;
  const optionsSection = addAcademicValues[1].options;

  const onSubmitForm = (data, e) => {
    console.log(data);

    // e.target.reset();
    selectRefStudent.clearValue();
    selectRefParent.clearValue();
    selectRefAcademicFirst.clearValue();
    selectRefAcademicSecond.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Student"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {/* Student Info  */}
          <CustomController
            title={"ADD STUDENT"}
            icon={<FaIcons.FaUser />}
            ValueArray={getStudentInputValues()}
            refClear={refClearStudent}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={false}
            hasFile={true}
            fileRequired={true}
            fileTitle={"Upload Photo"}
            fileIcon={<FaIcons.FaPhotoVideo className="mid-icon" />}
            fileName={"studentPhoto"}
          />

          {/* Parent Info  */}
          <CustomController
            title={"ADD PARENT"}
            icon={<FaIcons.FaUser />}
            ValueArray={getParentInfoValues()}
            refClear={refClearParent}
            control={control}
            Controller={Controller}
            errors={errors}
            ErrorMessage={ErrorMessage}
            isCustom={false}
          />

          {/* Academic Info  */}
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">ACADEMIC INFO</span>
            </div>
            <div className="content-section">
              <div className="allinputfield">
                <Controller
                  name={"studentClass"}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Student Class is required`,
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Class".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"studentClass"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={optionsClass}
                      errors={errors}
                      refClear={refClearAcademicFirst}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />

                <Controller
                  name={"studentSection"}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Student Section is required`,
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Section".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"studentSection"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={optionsSection}
                      errors={errors}
                      refClear={refClearAcademicSecond}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />

                <Controller
                  name={"studentRoll"}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: `Student Roll is required`,
                    },
                  }}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Roll".toUpperCase()}
                      input={"number"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      placeholder={"Enter Roll No"}
                      name={"studentRoll"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      errors={errors}
                      ErrorMessage={ErrorMessage}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <button className="morebutton btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
