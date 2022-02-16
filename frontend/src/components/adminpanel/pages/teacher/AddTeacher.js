import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { getTeacherInputValues } from "../../../values/AdminPanel/TeacherInputField";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CustomController from "./../../../common/Controller";
import { useDispatch } from "react-redux";
import { AddTeacherDetail } from "../../../../redux/actions/teacher/teacheractions";
import PasswordInputField from "./../../../common/InputField/PasswordInputField";
import InputField from "../../../common/InputField/InputField";

function AddTeacher() {
  //For Reseting Select Options while Submitting
  const [selectRef, setSelectRef] = useState(null);

  //Define requirements from useform
  const { handleSubmit, control } = useForm();

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);
  const dispatch = useDispatch();

  const onSubmitForm = (data, e) => {
    let postData = new FormData();
    let postUserLogin = new FormData();
    // postData.append("user", 30); // user id is hard coded, as foreign key
    postData.append("TRN", data.teacherTRN);
    postData.append("first_name", data.teacherFirstName);
    postData.append("middle_name", data.teacherMiddleName);
    postData.append("last_name", data.teacherLastName);
    postData.append("DOB", data.teacherDOB);
    postData.append("email", data.teacherEmail);
    postData.append("address", data.teacherLocation);
    postData.append("photo", data.teacherPhoto);
    postData.append("contact_no", data.teacherPhone);
    postData.append("gender", data.teacherGender.value);

    //Assigning User Login
    postUserLogin.append("password", data.teacherPassword);
    postUserLogin.append("username", data.teacherUsername);
    postUserLogin.append("email", data.teacherEmail);
    postUserLogin.append(
      "fullname",
      `${data.teacherFirstName} ${data.teacherMiddleName} ${data.teacherLastName}`
    );
    postUserLogin.append("profile_image", data.teacherPhoto);

    dispatch(AddTeacherDetail(postData));

    // e.target.reset();
    // selectRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Teacher"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomController
            title={"ADD TEACHER"}
            icon={<FaIcons.FaUser />}
            ValueArray={getTeacherInputValues()}
            refClear={refClear}
            control={control}
            Controller={Controller}
            isCustom={false}
            hasFile={true}
            fileTitle={"Upload Photo"}
            fileIcon={<FaIcons.FaPhotoVideo className="mid-icon" />}
            fileName={"teacherPhoto"}
          />

          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">TEACHER LOGIN INFO</span>
            </div>
            <div className="content-section">
              <div className="custom-selection">
                <Controller
                  name={"teacherUsername"}
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
                  name={"teacherPassword"}
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

export default AddTeacher;
