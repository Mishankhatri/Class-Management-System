import React, { useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import { getTeacherInputValues } from "../../../values/AdminPanel/TeacherInputField";

import { useForm, Controller } from "react-hook-form";
import CustomController from "./../../../common/Controller";
import { useDispatch } from "react-redux";
import { AddTeacherDetail } from "../../../../redux/actions/teacher/teacheractions";
import InputField from "../../../common/InputField/InputField";
import { FileInput } from "../../../common/InputField/FileInput";
import { createMessage } from "./../../../../redux/actions/alertactions";

function AddTeacher() {
  const [selectRef, setSelectRef] = useState(null);
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  //Reset Value using ref for Select Options
  const refClear = (ref) => setSelectRef(ref);

  const onSubmitForm = (data, e) => {
    if (!data.teacherGender) {
      dispatch(createMessage({ gender: "Gender Field is required" }));
    } else {
      const teacherTRN_GEN =
        data.teacherTRN.length === 1
          ? `00${data.teacherTRN}`
          : data.teacherTRN.length === 2
          ? `0${data.teacherTRN}`
          : data.teacherTRN;

      let postData = new FormData();

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

      //Assigning Login Info
      postData.append("user.password", `CMS${teacherTRN_GEN}`);
      postData.append("user.username", data.teacherUsername);
      postData.append("user.email", data.teacherEmail);
      postData.append("user.profile_image", data.teacherPhoto);
      postData.append("user.teacher", true);
      dispatch(
        AddTeacherDetail(postData, "teacher_user", "ADD_TEACHER_DETAIL")
      );

      e.target.reset();
      selectRef.clearValue();
    }
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
          />

          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">TEACHER LOGIN INFO</span>
            </div>
            <div className="content-section">
              <div className="message">
                By Default, Password will be <b>CMS'TRN'</b> <b>Eg: CMST001</b>.
                If length of TRN is less than 3 (i.e. TRN = T0), password will
                be CMS<b>0</b>T0
              </div>
              <div className="custom-selection">
                <Controller
                  name={"teacherEmail"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Email".toUpperCase()}
                      input={"email"}
                      icon={<MdIcons.MdEmail className="mid-icon" />}
                      placeholder={"Enter Login Email"}
                      name={"teacherEmail"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />
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
                      name={"teacherUsername"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"teacherPhoto"}
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <FileInput
                      name={"teacherPhoto"}
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

export default AddTeacher;
