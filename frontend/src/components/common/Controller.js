import React from 'react';
import InputField from './../adminpanel/common/InputField/InputField';

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
}) {
  return (
    <div className={!isCustom ? 'card-section' : 'card-section custom-width'}>
      <div className='heading'>
        <span className='title-icon'>
          {icon}
          {/*Custom  */}
        </span>
        <span className='title'>{title}</span> {/*Custom  */}
      </div>

      <div
        className={
          !isCustom ? 'content-section allinputfield' : 'content-section' //custom-content
        }>
        {ValueArray.map((value, index) => {
          {
            /*Custom  */
          }
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
              defaultValue=''
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
      </div>
    </div>
  );
}

export default CustomController;
