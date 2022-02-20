import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../../assets/profiles/default.png";

import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";
import ChangePhoto from "../../../common/Modal/ChangePhoto";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import StudentEditModal from "../../StudentEditModal";
import ParentEditModal from "../../ParentEditModal";
import AcademicEditModal from "../../AcademicEditModal";
import {
  ChangeStudentDetail,
  ChangeStudentParentDetail,
  GET_DETAILS,
} from "./../../../../redux/actions/student/studentactions";
import axiosInstance from "../../../../axios";

function StudentFullDetail() {
  //Getting Student Id from Parameters
  let { id } = useParams();

  const dispatch = useDispatch();

  //Getting parents value from Redux Store
  const { studentParentID } = useSelector((state) => state.students);
  const data = studentParentID && studentParentID.results[0].student;
  const parents = studentParentID && studentParentID.results[0];

  //Calling API
  useEffect(() => {
    dispatch(
      GET_DETAILS("/parent", "GET_STUDENT_PARENTS_BYID", `student=${id}`)
    );
  }, [id]);

  //For Showing Modal
  const [click, setClick] = useState(false);
  const [clickStudent, setClickStudent] = useState(false);
  const [clickParent, setClickParent] = useState(false);
  const [clickStudentAcademic, setClickStudentAcademic] = useState(false);

  //Reference of Images while Uploading
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState();

  //React Hook form Initialization fot editing
  const { handleSubmit, control, register } = useForm();

  // Getting Default image file
  //++++++++++++++++++ For Converting Base 64 Image to File Object
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const defaultImage = dataURLtoFile(BlankProfile, "default.jpg");

  //React Hook Form For Parents
  const {
    handleSubmit: handleSubmitParent,
    control: controlParent,
    register: registerParent,
  } = useForm();

  //For Academic
  const {
    handleSubmit: handleSubmitAcademic,
    control: controlAcademic,
    register: registerAcademic,
  } = useForm();

  //On Submit Student Photo
  const onSubmitStudent = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);

    const postData = new FormData();
    postData.append("photo", uploadedImage);
    dispatch(
      ChangeStudentDetail("student", id, "UPDATE_STUDENT_PHOTO", postData)
    );
  };

  //On Editing Student Info
  const onSubmitStudentInput = (data, e) => {
    e.target.reset();
    setClickStudent(false);

    const postStudentData = new FormData();
    console.log(data.studentMiddleName);
    postStudentData.append("first_name", data.studentFirstName);
    postStudentData.append("middle_name", data.studentMiddleName);
    postStudentData.append("last_name", data.studentLastName);
    postStudentData.append("gender", data.studentGender.value);
    postStudentData.append("DOB", data.studentDOB);
    postStudentData.append("contact_no", data.studentPhone);
    postStudentData.append("email", data.studentEmail);
    postStudentData.append("address", data.studentAddress);

    dispatch(
      ChangeStudentDetail(
        "student",
        id,
        "UPDATE_STUDENT_DETAIL",
        postStudentData
      )
    );
  };

  //On Editing Parents Info
  const onSubmitParentInput = (data, e) => {
    e.target.reset();
    setClickParent(false);
    const postParentData = new FormData();

    postParentData.append("father_name", data.studentFatherName);
    postParentData.append("mother_name", data.studentMotherName);
    postParentData.append("parent_address", data.parentAddress);
    postParentData.append("parent_state", data.parentState.value);
    postParentData.append("parent_contact_no", data.studentParentContact);
    postParentData.append(
      "parent_additional_contact_no",
      data.parentAdditionalContact
    );
    postParentData.append("parent_email", data.parentEmail);
    dispatch(ChangeStudentParentDetail(id, parents.id, postParentData));
  };

  //On Editing Academic
  const onSubmitAcademic = (data, e) => {
    //Id change hunna yesma hera haii
    e.target.reset();
    console.log(data);
    setClickStudentAcademic(false);

    const academicData = new FormData();
    academicData.append("SRN", data.studentSRN);

    axiosInstance
      .get(
        `/grades/?classname=${data.className.value}&section=${data.sectionName.value}`
      )
      .then(({ data: { results } }) => {
        academicData.append("current_grade_id", results[0].id);
        dispatch(
          ChangeStudentDetail(
            "student",
            id,
            "UPDATE_STUDENT_DETAIL",
            academicData
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return data ? (
    <React.Fragment>
      {/* Modal Section Image Start */}
      {click && (
        <ChangePhoto
          click={click}
          setClick={setClick}
          onSubmit={onSubmitStudent}
          setPreviosImage={setPreviosImage}
          setUploadedImage={setUploadedImage}
          previousImage={previousImage}
        />
      )}
      {/* Modal Section Image  End */}

      {/* Modal Section Input Start  */}
      {clickStudent && (
        <div className="modal">
          <div
            className={
              clickStudent ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmitStudentInput)}>
                <span
                  className="close"
                  onClick={() => setClickStudent(!clickStudent)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Student's Info</h2>
                  <div className="content-section">
                    <StudentEditModal
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

      {clickParent && (
        <div className="modal">
          <div
            className={clickParent ? "model-section visible" : "model-section"}>
            <div className="modal-content">
              <form onSubmit={handleSubmitParent(onSubmitParentInput)}>
                <span
                  className="close"
                  onClick={() => setClickParent(!clickParent)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Student Parents's Info</h2>
                  <div className="content-section">
                    <ParentEditModal
                      register={registerParent}
                      data={parents}
                      Controller={Controller}
                      control={controlParent}
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

      {clickStudentAcademic && (
        <div className="modal">
          <div
            className={
              clickStudentAcademic ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmitAcademic(onSubmitAcademic)}>
                <span
                  className="close"
                  onClick={() =>
                    setClickStudentAcademic(!clickStudentAcademic)
                  }>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Student Academic's Info</h2>
                  <div className="content-section">
                    <AcademicEditModal
                      register={registerAcademic}
                      data={data}
                      Controller={Controller}
                      control={controlAcademic}
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

      {/* Modal Section Input End  */}
      <InnerHeader icon={<MdIcons.MdPerson />} name={`Student`} />
      {parents && (
        <div className="main-content">
          {/* Student Info  */}
          <div className="heading-section">
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <MdIcons.MdPerson />
                </span>
                <span className="title">Students Personal Info</span>
              </div>
              <div className="content-section">
                <div className="custom-info-show">
                  <div
                    className="content-image-p"
                    onClick={() => {
                      setClick(!click);
                      setUploadedImage(""); //Check This Later
                    }}>
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
                        custom={true}
                        value={`${data.first_name} ${
                          data.middle_name ? data.middle_name : ""
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
                      onClick={() => setClickStudent(!clickStudent)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Info  */}
          <div className="heading-section">
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <MdIcons.MdPerson />
                </span>
                <span className="title">Students Parents Info</span>
                {/*Custom  */}
              </div>
              <div className="content-section">
                <div className="allinputfield">
                  <ViewModal
                    title={"Father Name"}
                    value={parents.father_name}
                  />
                  <ViewModal
                    title={"Mother Name"}
                    value={parents.mother_name}
                  />
                  <ViewModal
                    title={"Phone"}
                    value={parents.parent_contact_no}
                  />
                  <ViewModal
                    title={"Alternate Phone"}
                    value={
                      parents.parent_additional_contact_no === null
                        ? ""
                        : parents.parent_additional_contact_no
                    }
                  />
                  <ViewModal
                    title={"Email"}
                    value={
                      parents.parent_email === null ? "" : parents.parent_email
                    }
                  />
                  <ViewModal title={"Address"} value={parents.parent_address} />
                  <ViewModal title={"State"} value={parents.parent_state} />
                </div>
                <button
                  className="btn-edit"
                  style={{ marginTop: 20 }}
                  onClick={() => setClickParent(!clickParent)}>
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Academic Info  */}
          <div className="heading-section">
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <MdIcons.MdPerson />
                </span>
                <span className="title">Students Academic Info</span>
                {/*Custom  */}
              </div>
              <div className="content-section">
                <div className="information">
                  <div className="information__info">
                    <ViewModal
                      title={"Class"}
                      value={
                        data.current_grade?.class_name
                          ? data.current_grade.class_name
                          : "Class may not Exist"
                      }
                    />
                    <ViewModal
                      title={"Section"}
                      value={
                        data.current_grade?.section
                          ? data.current_grade.section
                          : "Section may not Exist"
                      }
                    />
                    <ViewModal title={"SRN No"} value={data.SRN} />
                  </div>
                  <button
                    className="btn-edit"
                    style={{ marginTop: 20 }}
                    onClick={() =>
                      setClickStudentAcademic(!clickStudentAcademic)
                    }>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default StudentFullDetail;
