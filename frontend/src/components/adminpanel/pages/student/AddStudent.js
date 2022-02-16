import React, { useState, useEffect } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InputField from "../../../common//InputField/InputField";
import CustomController from "../../../common/Controller";

import {
  getParentInfoValues,
  getStudentInputValues,
  getAcademicValues,
} from "../../../values/AdminPanel/StudentInputField";

import { useForm, Controller } from "react-hook-form";
import PasswordInputField from "../../../common/InputField/PasswordInputField";
import { useDispatch } from "react-redux";
import { AddStudentDetail } from "./../../../../redux/actions/student/studentactions";

function AddStudent() {
  const addAcademicValues = getAcademicValues();
  const dispatch = useDispatch();

  //For Reseting Select Options while Submitting
  const [selectRefStudent, setSelectRefStudent] = useState(null);
  const [selectRefParent, setSelectRefParent] = useState(null);
  const [selectRefAcademicFirst, setSelectRefAcademicFirst] = useState(null);
  const [selectRefAcademicSecond, setSelectRefAcademicSecond] = useState(null);

  //Define requirements from useform
  const { handleSubmit, control } = useForm();

  //Clearing Student Info Select
  const refClearStudent = (ref) => setSelectRefStudent(ref);
  const refClearParent = (ref) => setSelectRefParent(ref);
  const refClearAcademicFirst = (ref) => setSelectRefAcademicFirst(ref);
  const refClearAcademicSecond = (ref) => setSelectRefAcademicSecond(ref);

  //Getting options for academic info
  const optionsClass = addAcademicValues[0].options;
  const optionsSection = addAcademicValues[1].options;

  const onSubmitForm = (data, e) => {
    let postStudentData = new FormData();
    let postParentData = new FormData();
    let postUserLogin = new FormData();

    //Assigning Student Info
    postStudentData.append("current_grade", 15); //Temp grade id
    postStudentData.append("user", 90); //Temp user id
    postStudentData.append("SRN", data.studentSRN);
    postStudentData.append("first_name", data.studentFirstName);
    postStudentData.append("middle_name", data.studentMiddleName);
    postStudentData.append("last_name", data.studentLastName);
    postStudentData.append("gender", data.studentGender.value);
    postStudentData.append("DOB", data.studentDOB);
    postStudentData.append("contact_no", data.studentPhone);
    postStudentData.append("email", data.studentEmail);
    postStudentData.append("address", data.studentLocation);
    postStudentData.append("photo", data.studentPhoto);

    //Assigni Paraent Info
    postParentData.append("father_name", data.studentFatherName);
    postParentData.append("mother_name", data.studentMotherName);
    postParentData.append("parent_address", data.parentAddress);
    postParentData.append("parent_state", data.parentState.value);
    postParentData.append("parent_contact_no", data.parentContact);
    postParentData.append(
      "parent_additional_contact_no",
      data.parentAdditionalContact
    );
    postParentData.append("parent_email", data.parentEmail);
    postParentData.append("student", 90); // Hard Coded Student;

    //Assigning User Login
    postUserLogin.append("password", data.studentPassword);
    postUserLogin.append("username", data.studentUsername);
    postUserLogin.append("email", data.studentEmail);
    postUserLogin.append(
      "fullname",
      `${data.studentFirstName} ${data.studentMiddleName} ${data.studentLastName}`
    );
    postUserLogin.append("profile_image", data.studentPhoto);

    dispatch(
      AddStudentDetail(postStudentData, "student", "ADD_STUDENT_DETAIL")
    );
    dispatch(
      AddStudentDetail(postParentData, "parent", "ADD_STUDENT_PARENT_DETAIL")
    );

    // e.target.reset();
    // selectRefStudent.clearValue();
    // selectRefParent.clearValue();
    // selectRefAcademicFirst.clearValue();
    // selectRefAcademicSecond.clearValue();
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
            isCustom={false}
            hasFile={true}
            fileRequired={false}
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
              <div className="custom-selection">
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
                      refClear={refClearAcademicFirst}
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
                      refClear={refClearAcademicSecond}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Academic Info  */}
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">STUDENT LOGIN INFO</span>
            </div>
            <div className="content-section">
              <div className="custom-selection">
                <Controller
                  name={"studentUsername"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Username".toUpperCase()}
                      input={"text"}
                      icon={<MdIcons.MdVerifiedUser className="mid-icon" />}
                      placeholder={"Enter Username"}
                      name={"studentUsername"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />
                <Controller
                  name={"studentPassword"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <PasswordInputField
                      title={"Password".toUpperCase()}
                      placeholder={"**********"}
                      name={"studentPassword"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
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
