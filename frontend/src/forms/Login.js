import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo/Image_Logo.png";
import CampusLogo from "../assets/logo/campusLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authactions";
import { Link, Navigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";

function Login() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShow] = useState(false);
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleClick = () => {
    setPasswordShow(!passwordShown);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const user = { email, password };
    dispatch(login(user));
  };
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
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
            <p id="welcome-info">Welcome!</p>
            <p id="login-message">Login to your account</p>
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
              />
            </div>

            <div className="input-field password">
              <label>Password</label>
              <div className="input-icon-container">
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <button
                  className="fa eye-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setPasswordShow(!passwordShown);
                  }}>
                  {!passwordShown ? <FiIcons.FiEye /> : <FiIcons.FiEyeOff />}
                </button>
              </div>
            </div>
            <div className="section">
            <Link to="/forgetpassword" className="links">
                Forget Password?
              </Link>
            </div>
            <button className="login__btn" onClick={handleSubmit}>
              Login
            </button>
            <div className="account">
              <span>
                Don't have an account?{" "}
                <a href="mailto:classmanagementsystem2022@gmail.com" className="links">
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

export default Login;
