import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../../assets/profiles/blank-profile.jpg";

import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";
import ChangePhoto from "../../../common/Modal/ChangePhoto";
import ChangeInput from "../../../common/Modal/ChangeInput";
import {
  getParentInfoValues,
  getStudentInputValues,
  getAcademicValues,
} from "./../../../values/AdminPanel/StudentInputField";
import {
  // CLassList,
  StudentClassById,
} from "../../../../redux/actions/student/studentactions";
import { useDispatch, useSelector } from "react-redux";

function StudentFullDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const {
    studentId: data,
    classes,
    studentParent,
  } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(StudentClassById(id));
    // dispatch(CLassList());
  }, []);

  const [click, setClick] = useState(false);
  const [clickStudent, setClickStudent] = useState(false);
  const [clickParent, setClickParent] = useState(false);
  const [clickStudentAcademic, setClickStudentAcademic] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

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

  const studentClass = classes.find((value) => value.id == data?.current_grade);

  const parents = studentParent.find((value) => value.student.id == id);

  return data && studentClass ? (
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
        <ChangeInput
          onSubmit={onSubmitStudentInput}
          valueArray={getStudentInputValues()}
          click={clickStudent}
          setClick={setClickStudent}
          heading={"View Student's Info"}
        />
      )}

      {clickParent && (
        <ChangeInput
          onSubmit={onSubmitParentInput}
          valueArray={getParentInfoValues()}
          click={clickParent}
          setClick={setClickParent}
          heading={"View Student's Parent Info"}
        />
      )}

      {clickStudentAcademic && (
        <ChangeInput
          onSubmit={onSubmitAcademic}
          valueArray={getAcademicValues()}
          click={clickStudentAcademic}
          setClick={setClickStudentAcademic}
          heading={"View Student Academic Infos"}
        />
      )}

      {/* Modal Section Input End  */}
      <InnerHeader icon={<MdIcons.MdPerson />} name={`Student`} />
      <div className="main-content">
        {/* Student Info  */}
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
                {/* <div className="profile-image">
                  <div className="image">
                    <img
                      src={data.photo}
                      alt="Profile-Image"
                      title="Change Profile Picture"
                      onClick={() => setClick(!click)}
                    />
                    <div className="image_overlay">Change Photo</div>
                  </div>
                </div> */}

                <div className="content" onClick={() => setClick(!click)}>
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
                <ViewModal title={"Father Name"} value={parents.father_name} />
                <ViewModal title={"Mother Name"} value={parents.mother_name} />
                <ViewModal title={"Phone"} value={parents.parent_contact_no} />
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
                  <ViewModal title={"Class"} value={studentClass.class_name} />
                  <ViewModal
                    title={"Section"}
                    value={studentClass.section.section}
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
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default StudentFullDetail;
