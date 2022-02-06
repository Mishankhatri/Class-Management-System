import React from "react";
import InputField from "./InputField/InputField";
import { FileInput } from "./InputField/FileInput";

function CustomController({
  title,
  icon,
  ValueArray,
  control,
  refClear,
  Controller,
  errors,
  ErrorMessage,
  isCustom,
  hasFile = false,
  fileName,
  fileTitle,
  fileIcon,
  fileRequired = false,
}) {
  return (
    <div className={!isCustom ? "card-section" : "card-section custom-width"}>
      <div className="heading">
        <span className="title-icon">
          {icon}
          {/*Custom  */}
        </span>
        <span className="title">{title}</span> {/*Custom  */}
      </div>

      <div
        className={
          !isCustom ? "content-section allinputfield" : "content-section" //custom-content
        }>
        {ValueArray.map((value, index) => {
          return (
            <Controller
              name={value.name}
              control={control}
              key={index}
              rules={{
                required: {
                  value: value.isRequired,
                  message: `${value.title} is required`,
                },
              }}
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
                  errors={errors}
                  refClear={refClear}
                  ErrorMessage={ErrorMessage}
                />
              )}
            />
          );
        })}
        {hasFile && (
          <Controller
            name={fileName}
            control={control}
            defaultValue=""
            render={(props) => (
              <FileInput
                name={fileName}
                title={fileTitle}
                icon={fileIcon}
                isRequired={fileRequired}
                isImageFile={true}
                onChange={(event) => props.field.onChange(event.target.files)}
              />
            )}
          />
        )}
      </div>
    </div>
  );
}

export default CustomController;
