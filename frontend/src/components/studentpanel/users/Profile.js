import React, { useState, useEffect } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../assets/profiles/blank-profile.jpg";
import ChangePhoto from "../../common/Modal/ChangePhoto";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ViewModal from "./../../common/Modal/ViewModal";
import Loading from "./../../common/Loading";
import { GET_DETAILS } from "../../../redux/actions/student/studentactions";

function UserProfile() {
  const [click, setClick] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GET_DETAILS("/parent", "GET_STUDENT_PARENTS"));
  }, []);

  const { register, handleSubmit } = useForm();
  const { student, studentParent } = useSelector((state) => state.students);

  const { user } = useSelector((state) => state.auth);

  const studentDetail =
    student && student.find((value) => value.user.id == user.id);

  const parents =
    studentParent &&
    studentParent.find((value) => value.student.user.id == user.id);

  const onSubmitImage = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage);
  };

  const ChangeUserInfo = (data) => {
    console.log(data);
  };

  return student ? (
    <React.Fragment>
      <ChangePhoto
        click={click}
        setClick={setClick}
        onSubmit={onSubmitImage}
        setPreviosImage={setPreviosImage}
        setUploadedImage={setUploadedImage}
        previousImage={previousImage}
      />
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"UserProfile"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <MdIcons.MdPerson />
            </span>
            <span className="title">Your Information</span>
          </div>
          <div className="content-section">
            <div className="mid-content">
              <div className="custom-info-show">
                <div
                  className="content-image-p userprofile"
                  onClick={() => setClick(!click)}>
                  <div className="content-overlay"></div>
                  <img
                    className="content-image img-user"
                    src={user.profile_image}
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
                  <form onSubmit={handleSubmit(ChangeUserInfo)}>
                    <div className="information__info">
                      <ViewModal
                        title={"Full Name"}
                        disabled={false}
                        value={user.fullname}
                        name={"fullname"}
                        register={register}
                      />
                      <ViewModal
                        title={"Email"}
                        disabled={false}
                        value={user.email}
                        name={"email"}
                        register={register}
                      />
                      <ViewModal
                        title={"UserName"}
                        disabled={false}
                        value={user.username}
                        name={"username"}
                        register={register}
                      />
                      <ViewModal
                        title={"Role"}
                        disabled={false}
                        value={"Student"}
                      />
                    </div>
                    <button className="morebutton btn btn-custom-selection">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <MdIcons.MdPerson />
            </span>
            <span className="title">Personal Information</span>
          </div>
          <div className="content-section">
            <div className="allinputfield">
              <ViewModal title={"SRN"} value={studentDetail.SRN} />
              <ViewModal
                title={"FIRST NAME"}
                value={studentDetail.first_name}
              />
              <ViewModal
                title={"MIDDLE NAME"}
                value={studentDetail.middle_name}
              />
              <ViewModal title={"LAST NAME"} value={studentDetail.last_name} />
              <ViewModal title={"GENDER"} value={studentDetail.gender} />
              <ViewModal title={"DATE OF BIRTH"} value={studentDetail.DOB} />
              <ViewModal title={"PHONE"} value={studentDetail.contact_no} />
              <ViewModal title={"LOCATION"} value={studentDetail.address} />
              <ViewModal
                title={"Class"}
                value={studentDetail.current_grade.class_name}
              />
              <ViewModal
                title={"Section"}
                value={studentDetail.current_grade.section}
              />
            </div>
          </div>
        </div>

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
              {studentParent ? (
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
              ) : (
                <div>Fetching Data...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default UserProfile;
