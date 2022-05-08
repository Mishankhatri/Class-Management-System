import React, { useState, useEffect } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../assets/profiles/blank-profile.jpg";
import ChangePhoto from "../../common/Modal/ChangePhoto";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ViewModal from "./../../common/Modal/ViewModal";
import Loading from "./../../common/Loading";
import {
  AddStudentParentDetail,
  GET_DETAILS,
} from "../../../redux/actions/student/studentactions";
import {
  ChangeUserImage,
  UpdateUserInfo,
} from "../../../redux/actions/admin/adminaction";

function UserProfile() {
  const [click, setClick] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { studentDetails, studentParent } = useSelector(
    (state) => state.students
  );
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (studentDetails) {
      const s_id = studentDetails[0]?.id;
      dispatch(
        GET_DETAILS("/parent", "GET_STUDENT_PARENTS", `student=${s_id}`)
      );
    }
  }, [dispatch, studentDetails]);

  const parents = studentParent && studentParent.results[0];

  const onSubmitImage = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);

    const postData = new FormData();
    postData.append("profile_image", uploadedImage);
    dispatch(ChangeUserImage(postData));
  };

  const ChangeUserInfo = (data) => {
    const postdata = new FormData();
    postdata.append("username", data.username);
    dispatch(UpdateUserInfo(postdata));
  };

  const submitParentInfo = (data) => {
    const parentData = new FormData();
    parentData.append("father_name", data.father_name);
    parentData.append("mother_name", data.mother_name);
    parentData.append("parent_address", data.parent_address);
    parentData.append("parent_state", data.parent_state);
    parentData.append("parent_contact_no", data.parent_contact_no);
    parentData.append(
      "parent_additional_contact_no",
      data.parent_additional_contact_no
    );
    parentData.append("parent_email", data.parent_email);
    parentData.append("student", studentDetails[0].id);
    dispatch(AddStudentParentDetail(studentDetails[0]?.id, parentData));
  };

  return studentDetails ? (
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
                    alt="Profile"
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
                        title={"Username"}
                        disabled={false}
                        value={user.username}
                        name={"username"}
                        register={register}
                      />
                      <ViewModal
                        title={"Email"}
                        disabled={true}
                        value={user.email}
                        name={"email"}
                        register={register}
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
              <ViewModal title={"SRN"} value={studentDetails[0].SRN} />
              <ViewModal
                title={"FIRST NAME"}
                value={studentDetails[0].first_name}
              />
              <ViewModal
                title={"MIDDLE NAME"}
                value={
                  studentDetails[0].middle_name
                    ? studentDetails[0].middle_name
                    : "-"
                }
              />
              <ViewModal
                title={"LAST NAME"}
                value={studentDetails[0].last_name}
              />
              <ViewModal title={"GENDER"} value={studentDetails[0].gender} />
              <ViewModal
                title={"DATE OF BIRTH"}
                value={studentDetails[0].DOB}
              />
              <ViewModal title={"PHONE"} value={studentDetails[0].contact_no} />
              <ViewModal title={"LOCATION"} value={studentDetails[0].address} />
              <ViewModal
                title={"Class"}
                value={studentDetails[0].current_grade.class_name}
              />
              <ViewModal
                title={"Section"}
                value={studentDetails[0].current_grade.section}
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
              {parents ? (
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
                    value={
                      parents.parent_contact_no
                        ? parents.parent_contact_no
                        : "-"
                    }
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
                <form onSubmit={handleSubmit(submitParentInfo)}>
                  <div className="allinputfield">
                    <ViewModal
                      title={"Father Name"}
                      name={"father_name"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"Mother Name"}
                      name={"mother_name"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"Phone"}
                      name={"parent_contact_no"}
                      disabled={false}
                      register={register}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"Alternate Phone"}
                      name={"parent_additional_contact_no"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"Email"}
                      name={"parent_email"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"Address"}
                      name={"parent_address"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                    <ViewModal
                      title={"State"}
                      name={"parent_state"}
                      register={register}
                      disabled={false}
                      isRequired={true}
                    />
                  </div>
                  <button className="morebutton btn btn-custom-selection">
                    Save
                  </button>
                </form>
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
