import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import BlankProfile from "../../../../assets/profiles/blank-profile.jpg";
import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";
import ChangePhoto from "../../../common/Modal/ChangePhoto";

import { useDispatch, useSelector } from "react-redux";
import { TeacherById } from "../../../../redux/actions/teacher/teacheractions";
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

  const [click, setClick] = useState(false);
  const [clickTeacher, setClickTeacher] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

  const onSubmitTeacher = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  const onSubmitTeacherInput = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickTeacher(false);
  };

  return data ? (
    <React.Fragment>
      {click && (
        <ChangePhoto
          click={click}
          setClick={setClick}
          onSubmit={onSubmitTeacher}
          setPreviosImage={setPreviosImage}
          setUploadedImage={setUploadedImage}
          previousImage={previousImage}
        />
      )}

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
                  <h2>Edit Student's Info</h2>
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
        <div className="heading-section">
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdPerson />
              </span>
              <span className="title">Students Personal Info</span>
              {/*Custom  */}
            </div>
            <div className="content-section">
              <div className="custom-info-show">
                <div
                  className="content-image-p"
                  onClick={() => setClick(!click)}>
                  <div className="content-overlay"></div>
                  <img
                    className="content-image"
                    src={data.photo}
                    alt="Profile-Image"
                    title="Change Profile Picture"
                  />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">
                      <MdIcons.MdCamera style={{ fontSize: 40 }} />
                    </h3>
                    <p className="content-text" style={{ fontSize: 20 }}>
                      Change Photo
                    </p>
                  </div>
                </div>
                <div className="information">
                  <div className="information__info">
                    <ViewModal
                      title={"Full Name"}
                      value={`${data.first_name} ${
                        data.middleName ? data.middleName : ""
                      } ${data.last_name}`}
                    />
                    <ViewModal title={"Gender"} value={data.gender} />
                    <ViewModal title={"Date of Birth"} value={data.DOB} />
                    <ViewModal title={"Phone"} value={data.contact_no} />
                    <ViewModal title={"Email"} value={data.email} />
                    <ViewModal title={"Address"} value={data.address} />
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
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default TeacherFullDetail;
