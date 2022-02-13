import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  SettingsInput,
  SettingsPasswordInput,
} from "../../../values/AdminPanel/SettingsValue";
import CustomSettingsInput from "./CustomSettings";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { ChangeAdminPassword } from "../../../../redux/actions/admin/adminaction";

function Settings() {
  const { handleSubmit, register } = useForm();
  const alert = useAlert();
  const dispatch = useDispatch();

  const onSubmit = (data, e) => {
    dispatch(ChangeAdminPassword(data));

    // try {
    //   if (data.settingsNewPassword != data.settingsRePassword)
    //     throw "New Entered Password didn't match";
    //   else {
    //     e.target.reset();
    //     disp
    //     alert.success("Password Changed Successfully!");
    //   }
    // } catch (error) {
    //   alert.error(error);
    // }
  };

  const settingsPasswordValue = SettingsPasswordInput();

  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Settings"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <MdIcons.MdSecurity />
            </span>
            <span className="title">Change Password</span> {/*Custom  */}
          </div>

          <div className="content-section">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mid-content">
                {settingsPasswordValue.map((value, index) => {
                  return (
                    <CustomSettingsInput
                      title={value.title}
                      icon={value.icon}
                      required={value.required}
                      type={value.input}
                      key={index}
                      placeholder={value.placeholder}
                      name={value.name}
                      register={register}
                    />
                  );
                })}
              </div>
              <button className="morebutton btn btn-custom-selection">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Settings;
