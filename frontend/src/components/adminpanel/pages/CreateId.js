import React from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { registeradmin } from "../../../redux/actions/authactions";

import { Controller, useForm } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";
import PasswordInputField from "./../../common/InputField/PasswordInputField";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { createMessage } from "../../../redux/actions/alertactions";

function CreateID() {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  const onSubmitForm = (data, e) => {
    const postData = new FormData();
    postData.append("password", data.password);
    postData.append("username", data.username);
    postData.append("email", data.email);
    postData.append("profile_image", data.profile);
    postData.append("admin", true);

    if (data.password !== data.confirmPassword) {
      dispatch(createMessage({ passwordNotMatch: "Passwords do not match" }));
    } else {
      dispatch(registeradmin(postData));
    }

    e.target.reset();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Create ID"} />
      <div className="main-content">
        <div className={"card-section"}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdAdminPanelSettings />
              </span>
              <span className="title">REGISTER ADMIN</span> {/*Custom  */}
            </div>

            <div className={"content-section"}>
              <Controller
                name={"email"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Email".toUpperCase()}
                    input={"email"}
                    icon={<MdIcons.MdEmail className="mid-icon" />}
                    placeholder={"Enter Login Email"}
                    name={"email"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                  />
                )}
              />
              <Controller
                name={"username"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Username".toUpperCase()}
                    input={"text"}
                    icon={<MdIcons.MdVerifiedUser className="mid-icon" />}
                    placeholder={"Enter Username"}
                    name={"username"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                  />
                )}
              />
              <Controller
                name={"password"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordInputField
                    title={"Password".toUpperCase()}
                    placeholder={"**********"}
                    name={"password"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    id_name={"user_profile_pass1"}
                  />
                )}
              />

              <Controller
                name={"confirmPassword"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordInputField
                    title={"Confirm Password".toUpperCase()}
                    placeholder={"**********"}
                    name={"confirmPassword"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    id_name={"user_profile_pass2"}
                  />
                )}
              />
              <Controller
                name={"profile"}
                control={control}
                defaultValue=""
                render={(props) => (
                  <FileInput
                    name={"profile"}
                    title={"User Photo"}
                    icon={<MdIcons.MdPhotoCamera className="mid-icon" />}
                    isRequired={false}
                    isImageFile={true}
                    onChange={(event) =>
                      props.field.onChange(event.target.files[0])
                    }
                  />
                )}
              />
              <button
                style={{ marginTop: 20 }}
                className="morebutton btn "
                type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateID;
