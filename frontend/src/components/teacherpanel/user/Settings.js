import React from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import { useForm } from "react-hook-form";
import {
  SettingsInput,
  SettingsPasswordInput,
} from "../../values/AdminPanel/SettingsValue";
import CustomSettingsInput from "./../../adminpanel/pages/users/CustomSettings";

function Settings() {
  const { handleSubmit, register, setValue } = useForm();

  const {
    handleSubmit: handleSubmitPassword,
    register: registerPassword,
    setValue: setPasswordValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const settingsInputValue = SettingsInput();
  const settingsPasswordValue = SettingsPasswordInput();

  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Settings"} />
      <div className="main-content">
        <div className="">
          {/* className = main-contentsection */}
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdVerifiedUser />
              </span>
              <span className="title">Profiles Settings</span> {/*Custom  */}
            </div>

            <div className="content-section">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mid-content">
                  {settingsInputValue.map((value, index) => {
                    setValue(value.name, value.values);
                    return (
                      <CustomSettingsInput
                        title={value.title}
                        icon={value.icon}
                        required={value.required}
                        type={value.input}
                        key={index}
                        register={register}
                        placeholder={value.placeholder}
                        name={value.name}
                        value={value.values}
                        setValue={setValue}
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
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <MdIcons.MdSecurity />
              </span>
              <span className="title">Change Password</span> {/*Custom  */}
            </div>

            <div className="content-section">
              <form onSubmit={handleSubmitPassword(onSubmit)}>
                <div className="mid-content">
                  {settingsPasswordValue.map((value, index) => {
                    setPasswordValue(value.name, value.values);
                    return (
                      <CustomSettingsInput
                        title={value.title}
                        icon={value.icon}
                        required={value.required}
                        type={value.input}
                        key={index}
                        register={registerPassword}
                        placeholder={value.placeholder}
                        name={value.name}
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
      </div>
    </React.Fragment>
  );
}

export default Settings;
