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
import {
  ChangeUserImage,
  UpdateUserInfo,
} from "../../../redux/actions/admin/adminaction";

function UserProfile({ image }) {
  const [click, setClick] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const { teacherDetail } = useSelector((state) => state.teachers);

  const { user } = useSelector((state) => state.auth);

  const teacher =
    teacherDetail &&
    teacherDetail.results.find((value) => value.user.id === user.id);

  useEffect(() => {
    dispatch(GET_DETAILS("/teacher", "GET_TEACHER_DETAIL"));
  }, []);

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

  return teacherDetail ? (
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
                        title={"Email"}
                        disabled={true}
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
              <ViewModal title={"TRN"} value={teacher.TRN} />
              <ViewModal title={"FIRST NAME"} value={teacher.first_name} />
              <ViewModal
                title={"MIDDLE NAME"}
                value={teacher.middle_name ? teacher.middle_name : "-"}
              />
              <ViewModal title={"LAST NAME"} value={teacher.last_name} />
              <ViewModal title={"GENDER"} value={teacher.gender} />
              <ViewModal title={"DATE OF BIRTH"} value={teacher.DOB} />
              <ViewModal title={"PHONE"} value={teacher.contact_no} />
              <ViewModal title={"LOCATION"} value={teacher.address} />
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
