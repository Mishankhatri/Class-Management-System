import React, { useState } from "react";
import refImage from "./assets/images/refImage.png";
import { useForm } from "react-hook-form";
import "./Password.css";

function ForgetPassword() {
  const { handleSubmit, register } = useForm();
  const [show, setShow] = useState(false);

  const onSubmit = (data, e) => {
    console.log(data);
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
                <img src={refImage} />
                <p className="horizontal-heading">Forget Your Password?</p>
                <p className="horizontal-subtitle">
                  Just provide your email and we can do the rest.
                </p>
              </div>
              <form
                className="horizontal-form"
                onSubmit={handleSubmit(onSubmit)}>
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

                <button className="btn-custom btn-primary">
                  Set New Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ForgetPassword;
