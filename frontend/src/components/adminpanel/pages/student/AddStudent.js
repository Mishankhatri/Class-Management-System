import React, { useState, useEffect } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import InputField from "../../../common//InputField/InputField";
import CustomController from "../../../common/Controller";

import { getStudentInputValues } from "../../../values/AdminPanel/StudentInputField";

import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AddStudentDetail } from "./../../../../redux/actions/student/studentactions";
import { GetPaginatedGradePromise } from "../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";
import { FileInput } from "../../../common/InputField/FileInput";
import { createMessage } from "./../../../../redux/actions/alertactions";

function AddStudent() {
  const dispatch = useDispatch();

  //For Reseting Select Options while Submitting
  const [selectRefStudent, setSelectRefStudent] = useState(null);
  const [selectRefAcademicFirst, setSelectRefAcademicFirst] = useState(null);
  const [selectRefAcademicSecond, setSelectRefAcademicSecond] = useState(null);

  //Define requirements from useform
  const { handleSubmit, control } = useForm();

  //Clearing Student Info Select
  const refClearStudent = (ref) => setSelectRefStudent(ref);
  const refClearAcademicFirst = (ref) => setSelectRefAcademicFirst(ref);
  const refClearAcademicSecond = (ref) => setSelectRefAcademicSecond(ref);

  const [grade, setGrade] = useState([]);
  const [section, setSection] = useState([]);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedGradePromise();

        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  const uniqueGrade = UniqueArray(grade, "class_name");

  const getSection = (data) => {
    const sectionOptions = grade.filter(
      (value) => value.class_name === data.value
    );

    return sectionOptions.map((value) => ({
      label: value.section,
      value: value.section,
    }));
  };

  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  const handleSection = (data) => {
    if (data) {
      const sectionLabel = getSection(data);
      setSection(sectionLabel);
    }
  };

  const onSubmitForm = (data, e) => {
    let postStudentData = new FormData();

    if (!data.studentGender) {
      dispatch(createMessage({ gender: "Gender Field is Required" }));
    } else if (!data.studentClass) {
      dispatch(createMessage({ classRequired: "Class Field is Required" }));
    } else if (!data.studentSection) {
      dispatch(createMessage({ sectionRequired: "Section Field is Required" }));
    } else {
      const studentRoll =
        data.studentSRN.length === 1
          ? `00${data.studentSRN}`
          : data.studentSRN.length === 2
          ? `0${data.studentSRN}`
          : data.studentSRN;

      const studentClassGen =
        `${data.studentClass.value}`.length === 1
          ? `00${data.studentClass.value}`
          : `${data.studentClass.value}`.length === 2
          ? `0${data.studentClass.value}`
          : data.studentClass.value;

      // Assigning Student Info
      postStudentData.append("SRN", data.studentSRN);
      postStudentData.append("first_name", data.studentFirstName);
      postStudentData.append("middle_name", data.studentMiddleName);
      postStudentData.append("last_name", data.studentLastName);
      postStudentData.append("gender", data.studentGender.value);
      postStudentData.append("DOB", data.studentDOB);
      postStudentData.append("contact_no", data.studentPhone);
      postStudentData.append("address", data.studentLocation);

      //Assigning Login Info
      postStudentData.append(
        "user.password",
        `CMS${studentClassGen}${data.studentSection.value}${studentRoll}`
      );

      postStudentData.append("user.username", data.studentUsername);
      postStudentData.append("user.email", data.studentEmail);
      postStudentData.append("user.profile_image", data.studentPhoto);
      postStudentData.append(
        "current_grade.class_name",
        data.studentClass.value
      );
      postStudentData.append(
        "current_grade.section",
        data.studentSection.value
      );
      postStudentData.append("user.student", true);
      dispatch(
        AddStudentDetail(postStudentData, "student_user", "ADD_STUDENT_DETAIL")
      );

      e.target.reset();
      selectRefStudent.clearValue();
      selectRefAcademicFirst.clearValue();
      selectRefAcademicSecond.clearValue();
    }
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
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Class".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"studentClass"}
                      onChangeHandler={(data) => {
                        selectRefAcademicSecond.clearValue();
                        handleSection(data);
                        field.onChange(data);
                      }}
                      isRequired={true}
                      options={classOptions}
                      refClear={refClearAcademicFirst}
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
                      options={section}
                      refClear={refClearAcademicSecond}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">STUDENT LOGIN INFO</span>
            </div>
            <div className="content-section">
              <div className="message">
                By Default, Password will be{" "}
                <b>CMS'class_name' 'section' 'SRN'</b> <b>Eg: CMS012A012</b>.
              </div>
              <div className="custom-selection">
                <Controller
                  name={"studentEmail"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Email".toUpperCase()}
                      input={"email"}
                      icon={<MdIcons.MdEmail className="mid-icon" />}
                      placeholder={"Enter Login Email"}
                      name={"studentEmail"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />
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
                  name={"studentPhoto"}
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <FileInput
                      name={"studentPhoto"}
                      title={"User Photo"}
                      icon={<MdIcons.MdPhotoCamera className="mid-icon" />}
                      isRequired={false}
                      isImageFile={true}
                      onChange={(event) =>
                        props.field.onChange(event.target.files[0])
                      }
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
