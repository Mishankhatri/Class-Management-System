import React from "react";

import ViewModal from "./../../../common/Modal/ViewModal";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import TextAreaInput from "./../../../common/InputField/TextAreaInput";
import * as MdIcons from "react-icons/md";
import { HeaderInputField } from "../../../common/InputField/HeaderInputField";

function ChangeSubjectModal({ register, data, Controller, control }) {
  console.log(data);
  return (
    <React.Fragment>
      <div>
        <div className={"allinputfield"}>
          <ViewModal
            title={"Subject Name"}
            register={register}
            disabled={false}
            name={"subjectName"}
            value={data.subject_name}
          />
          <ViewModal
            title={"Subject Code"}
            register={register}
            disabled={false}
            name={"subjectCode"}
            value={data.subject_code}
          />
          <Controller
            name="subjectClass"
            control={control}
            defaultValue={{
              label: data.grade.class_name,
              value: data.grade.class_name,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Class"}
                name="subjectClass"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.grade.class_name,
                  value: data.grade.class_name,
                }}
                options={[
                  { value: "12", label: "12" },
                  { value: "11", label: "11" },
                  { value: "10", label: "10" },
                  { value: "9", label: "9" },
                  { value: "8", label: "8" },
                  { value: "7", label: "7" },
                  { value: "6", label: "6" },
                  { value: "5", label: "5" },
                ]}
              />
            )}
          />

          <Controller
            name="subjectSection"
            control={control}
            defaultValue={{
              label: data.grade.section,
              value: data.grade.section,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Section"}
                name="subjectSection"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.grade.section,
                  value: data.grade.section,
                }}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                ]}
              />
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          defaultValue={data.description}
          render={({ field }) => (
            <div className="mid-content">
              <HeaderInputField
                title={"Description".toUpperCase()}
                icon={<MdIcons.MdTextFields className="mid-icon" />}
              />
              <div className="label-input">
                <TextAreaInput
                  name={"description"}
                  hasValue={true}
                  placeholder={"Enter Subject Description"}
                  onChangeHandler={field.onChange}
                  isRequired={false}
                  value={data.description}
                />
              </div>
            </div>
          )}
        />
      </div>
    </React.Fragment>
  );
}
export default ChangeSubjectModal;
