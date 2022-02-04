import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import * as FaIcons from "react-icons/fa";
import InputField from "../InputField/InputField";

function ChangeInput({
  valueArray,
  onSubmit,
  click,
  setClick,
  heading,
  isCustom1 = false,
  isCustom2 = false,
}) {
  const { handleSubmit, control } = useForm();

  return (
    <div className="modal">
      <div className={click ? "model-section visible" : "model-section"}>
        {/* Add class visible to above element to see modal  */}
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="close" onClick={() => setClick(!click)}>
              &times;
            </span>
            <div className="content">
              <h2>{heading}</h2>
              <div className="content-section">
                <div
                  className={
                    isCustom1 ? "custom-modal-input" : "allinputfield"
                  }>
                  {valueArray.map((value, index) => {
                    return (
                      value.input != "file" && (
                        <Controller
                          name={value.name}
                          control={control}
                          key={index}
                          defaultValue=""
                          render={({ field }) => (
                            <InputField
                              title={value.title.toUpperCase()}
                              input={value.input}
                              icon={value.icon}
                              placeholder={value?.placeholder}
                              name={value.name}
                              onChangeHandler={field.onChange}
                              isCustomInput={value.isCustomField}
                              isTextArea={value?.isTextarea}
                              isRequired={value.isRequired}
                              isImageFile={value?.isImageFile}
                              options={value?.options}
                              disabled={value?.disabled}
                            />
                          )}
                        />
                      )
                    );
                  })}
                </div>
                {isCustom2 && (
                  <Controller
                    name={"description"}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputField
                        title={"Description".toUpperCase()}
                        input={"textarea"}
                        icon={<FaIcons.FaFile className="mid-icon" />}
                        placeholder={"Write  description"}
                        name={"description"}
                        onChangeHandler={field.onChange}
                        isTextArea={true}
                        isRequired={true}
                        isImageFile={false}
                      />
                    )}
                  />
                )}
              </div>
              <button
                className="btn-submit"
                style={{ marginLeft: "40px", marginTop: "20px" }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeInput;
