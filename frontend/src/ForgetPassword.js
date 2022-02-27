import React, { useState } from "react";
import refImage from "./assets/images/refImage.png";
import { useForm } from "react-hook-form";
import "./Password.css";
import { returnErrors, returnSuccess } from "./redux/actions/alertactions";
import { useDispatch } from "react-redux";
import axiosInstance from "./axios";

function ForgetPassword() {
  const { handleSubmit, register } = useForm();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    const email = data.email;
    const body = JSON.stringify({ email });
    axiosInstance
      .post(`user/request-reset-password/`, body)
      .then((res) => {
        dispatch(returnSuccess(res.data));
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
    setShow(true);
    e.target.reset();
  };
  return (
    <React.Fragment>
      <div className="row">
        <div className="horizontal-container">
          <div className="progress-bar-container">
            <div className="horizontal-form-box">
              <div className="horizontal-info-container">
                <img src={refImage} alt="set-password" />
                <p className="horizontal-heading">Forget Your Password?</p>
                <p className="horizontal-subtitle">
                  Just provide your email and we can do the rest.
                </p>
              </div>
              <form
                className="horizontal-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                {show && (
                  <div className="reset-message">
                    If the email provided is correct, you will get reset
                    password link soon.
                  </div>
                )}
                <div className="o3-form-group">
                  <label htmlFor="new_password">Email</label>
                  <div className="custom_pass">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      required
                      {...register("email")}
                    />
                  </div>
                </div>

                <button className="btn-custom btn-primary">Send Email</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ForgetPassword;
