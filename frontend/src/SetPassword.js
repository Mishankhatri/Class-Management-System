import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import refImage from "./assets/images/refImage.png";
import axiosInstance from "./axios";
import PasswordInputField from "./components/common/InputField/PasswordInputField";
import "./Password.css";
import { createMessage, returnErrors, returnSuccess } from "./redux/actions/alertactions";

function SetPassword() {
  const { uidb64, token } = useParams();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const [validUser, setValidUser] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`user/password-reset-validation/${uidb64}/${token}/`)
      .then((res) => {
        setValidUser(true);
      })
      .catch((err) => {
        setValidUser(false);
      });
  }, []);

  const onSubmit = (data, e) => {
    console.log(data);
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      let body = new FormData();
      body.append("uidb64", uidb64);
      body.append("token", token);
      body.append("password", password);
      axiosInstance
        .post(`user/setpassword/`, body)
        .then((res) => {
          dispatch(returnSuccess(res.data));
          navigate("/login", { replace: true });
        })
        .catch((err) => {
          dispatch(returnErrors(err.response.data, err.response.status));
        });
    }
    e.target.reset();
  };
  if (validUser) {
    return (
      <React.Fragment>
        <div className="row">
          <div className="horizontal-container">
            <div className="progress-bar-container">
              <div className="horizontal-form-box">
                <div className="horizontal-info-container">
                  <img src={refImage} alt="set-password"/>
                  <p className="horizontal-heading">Reset Your Password</p>
                  <p className="horizontal-subtitle">
                    Your password needs to be at least 8 characters.
                  </p>
                </div>
                <form
                  className="horizontal-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                    <label htmlFor="confirm_password">
                      Confirm New Password
                    </label>
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
  } else {
    return (
      <React.Fragment>
        <div className="row">
          <div className="horizontal-container">
            <div className="progress-bar-container">
              <div className="horizontal-form-box">
                <div className="horizontal-info-container">
                  <img src={refImage} />
                  <p className="horizontal-heading">Invalid Token</p>
                  <p className="horizontal-subtitle">
                    It seems the token has expired.Please request new one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SetPassword;
