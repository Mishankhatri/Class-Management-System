import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo/Image_Logo.png";
import CampusLogo from "../assets/logo/campusLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registeradmin } from "../redux/actions/authactions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createMessage } from "../redux/actions/alertactions";

function Register() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShow] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    fullname: "",
    password: "",
    password2: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleClick = () => {
    setPasswordShow(!passwordShown);
  };

  const handleChange = (e) => {
    if ([e.target.name] === "profile_image") {
      setProfileImage({
        profile_image: e.target.files,
      });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const { password, password2 } = formData;
    if (password !== password2) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      let postData = new FormData();
      postData.append("email", formData.email);
      postData.append("username", formData.username);
      postData.append("fullname", formData.fullname);
      postData.append("password", formData.password);
      profileImage &&
        postData.append("profile_image", profileImage.profile_image[0]);
      dispatch(registeradmin(postData));
    }
  };

  return (
    <div className="main">
      <div id="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div id="forms">
        <div className="image-container">
          <img src={CampusLogo} alt="Logo" className="campus-logo" />
        </div>
        <div className="form_input">
          <div className="information">
            <p id="welcome-info">Register</p>
            <p id="login-message">Register admin.</p>
          </div>
          <form>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                id="text"
                placeholder="Enter Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Fullname</label>
              <input
                type="text"
                name="fullname"
                id="text"
                placeholder="Enter Fullname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Profile Image</label>
              <input
                type="file"
                name="profile_image"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </div>
            <div className="input-field password">
              <label>Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
              {passwordShown ? (
                <FaEyeSlash className="icons" onClick={handleClick} />
              ) : (
                <FaEye className="icons" onClick={handleClick} />
              )}
            </div>
            <div className="input-field password">
              <label>Confirm Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                name="password2"
                id="password"
                placeholder="Re-enter password"
                onChange={handleChange}
                required
              />
              {passwordShown ? (
                <FaEyeSlash className="icons" onClick={handleClick} />
              ) : (
                <FaEye className="icons" onClick={handleClick} />
              )}
            </div>
            <button className="login__btn" onClick={handleSubmit} type="submit">
              Register
            </button>
            <div className="account">
              <span>
                Don't have an account?{" "}
                <a href="/#" className="links">
                  Contact Us
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
