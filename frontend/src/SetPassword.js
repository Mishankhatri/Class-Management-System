import React from "react";
import { Controller, useForm } from "react-hook-form";
import refImage from "./assets/images/refImage.png";
import PasswordInputField from "./components/common/InputField/PasswordInputField";
import "./Password.css";

function SetPassword() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
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
                <p className="horizontal-heading">Reset Your Password</p>
                <p className="horizontal-subtitle">
                  Your password needs to be at least 8 characters.
                </p>
              </div>
              <form
                className="horizontal-form"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="o3-form-group">
                  <label htmlFor="new_password">New Password</label>
                  <div className="custom_pass">
                    <Controller
                      name={"password"}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <PasswordInputField
                          hasHeader={false}
                          input={"password"}
                          placeholder={"Enter New Password"}
                          name={"password"}
                          onChangeHandler={field.onChange}
                          isRequired={true}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="o3-form-group">
                  <label htmlFor="confirm_password">Confirm New Password</label>
                  <div className="custom_pass">
                    <Controller
                      name={"confirmPassword"}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <PasswordInputField
                          hasHeader={false}
                          input={"password"}
                          placeholder={"Confirm New Password"}
                          name={"confirmPassword"}
                          onChangeHandler={field.onChange}
                          isRequired={true}
                        />
                      )}
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
export default SetPassword;
