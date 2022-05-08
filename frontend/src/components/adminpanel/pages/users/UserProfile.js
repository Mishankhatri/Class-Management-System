import React, { useState, useEffect } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import BlankProfile from "../../../../assets/profiles/blank-profile.jpg";
import "./UserProfile.css";
import ChangePhoto from "../../../common/Modal/ChangePhoto";
import { useDispatch, useSelector } from "react-redux";
import ViewModal from "../../../common/Modal/ViewModal";
import { useForm } from "react-hook-form";
import {
  ChangeUserImage,
  UpdateUserInfo,
} from "../../../../redux/actions/admin/adminaction";

function UserProfile() {
  const [click, setClick] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState("");

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

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

    dispatch(UpdateUserInfo(postdata, user.id));
  };

  return (
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
                    className="content-image"
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
                      <ViewModal
                        title={"Role"}
                        disabled={false}
                        value={"Admin"}
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
      </div>
    </React.Fragment>
  );
}

export default UserProfile;
