import React from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useForm } from "react-hook-form";
import { SettingsPasswordInput } from "../../../values/AdminPanel/SettingsValue";
import CustomSettingsInput from "./CustomSettings";
import { useDispatch } from "react-redux";
import { ChangeAdminPassword } from "../../../../redux/actions/admin/adminaction";

function Settings() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(ChangeAdminPassword(data));
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
