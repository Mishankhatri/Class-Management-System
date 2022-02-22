import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";

import { useDispatch, useSelector } from "react-redux";
import {
  ChangeTeacherDetail,
  TeacherById,
} from "../../../../redux/actions/teacher/teacheractions";
import TeacherEditModal from "../../TeacherEditModal";
import { Controller, useForm } from "react-hook-form";

function TeacherFullDetail() {
  let { id } = useParams();
  const { handleSubmit, control, register } = useForm();

  const dispatch = useDispatch();
  const { teacherId: data } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(TeacherById(id));
  }, []);

  const [clickTeacher, setClickTeacher] = useState(false);

  const onSubmitTeacherInput = (data, e) => {
    e.target.reset();
    setClickTeacher(false);

    let postData = new FormData();
    postData.append("first_name", data.teacherFirstName);
    postData.append("middle_name", data.teacherMiddleName);
    postData.append("last_name", data.teacherLastName);
    postData.append("DOB", data.teacherDOB);
    postData.append("TRN", data.teacherTRN);
    postData.append("address", data.teacherAddress);
    postData.append("contact_no", data.teacherPhone);
    postData.append("gender", data.gender.value);
    dispatch(ChangeTeacherDetail(id, "UPDATE_TEACHER_DETAIL", postData));
  };

  return data ? (
    <React.Fragment>
      {clickTeacher && (
        <div className="modal">
          <div
            className={
              clickTeacher ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmitTeacherInput)}>
                <span
                  className="close"
                  onClick={() => setClickTeacher(!clickTeacher)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Teacher's Info</h2>
                  <div className="content-section">
                    <TeacherEditModal
                      register={register}
                      data={data}
                      Controller={Controller}
                      control={control}
                    />
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
      )}

      <InnerHeader icon={<MdIcons.MdPerson />} name={`Teacher`} />
      <div className="main-content">
        {/* Student Info  */}
        <div className="heading-section">
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdPerson />
              </span>
              <span className="title">Teachers Personal Info</span>
            </div>
            <div className="content-section">
              <div className="allinputfield">
                <ViewModal
                  title={"Full Name"}
                  custom={true}
                  value={`${data.first_name} ${
                    data.middle_name ? data.middle_name : ""
                  } ${data.last_name}`}
                />
                <ViewModal title={"Gender"} value={data.gender} />
                <ViewModal title={"Date of Birth"} value={data.DOB} />
                <ViewModal title={"Phone"} value={data.contact_no} />
                <ViewModal title={"Address"} value={data.address} />
                <ViewModal title={"TRN No"} value={data.TRN} />
              </div>
              <button
                className="btn-edit"
                style={{ marginTop: 20 }}
                onClick={() => setClickTeacher(!clickTeacher)}>
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="heading-section">
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdPerson />
              </span>
              <span className="title">Teachers Login Info</span>
            </div>
            <div className="content-section">
              <div className="custom-info-show">
                <div className="content-image-p">
                  <img
                    className="content-image"
                    src={data.user.profile_image}
                    alt="Profile-Image"
                    title="Change Profile Picture"
                  />
                </div>
                <div className="information">
                  <ViewModal title={"User Name"} value={data.user.username} />
                  <ViewModal title={"Email"} value={data.user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default TeacherFullDetail;
