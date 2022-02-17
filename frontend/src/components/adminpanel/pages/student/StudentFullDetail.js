import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../../assets/profiles/blank-profile.jpg";

import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";
import ChangePhoto from "../../../common/Modal/ChangePhoto";
import { StudentClassById } from "../../../../redux/actions/student/studentactions";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import StudentEditModal from "../../StudentEditModal";
import ParentEditModal from "../../ParentEditModal";
import AcademicEditModal from "../../AcademicEditModal";

function StudentFullDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { studentParentID } = useSelector((state) => state.students);

  const data = studentParentID && studentParentID[0].student;
  const parents = studentParentID && studentParentID[0];

  useEffect(() => {
    dispatch(StudentClassById(id));
  }, [id]);

  const [click, setClick] = useState(false);
  const [clickStudent, setClickStudent] = useState(false);
  const [clickParent, setClickParent] = useState(false);
  const [clickStudentAcademic, setClickStudentAcademic] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

  const { handleSubmit, control, register } = useForm();
  const {
    handleSubmit: handleSubmitParent,
    control: controlParent,
    register: registerParent,
  } = useForm();
  const {
    handleSubmit: handleSubmitAcademic,
    control: controlAcademic,
    register: registerAcademic,
  } = useForm();

  const onSubmitStudent = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  const onSubmitStudentInput = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickStudent(false);
  };

  const onSubmitParentInput = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickParent(false);
  };

  const onSubmitAcademic = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickStudentAcademic(false);
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
                      value={data.current_grade.class_name}
                    />
                    <ViewModal
                      title={"Section"}
                      value={data.current_grade.section}
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
