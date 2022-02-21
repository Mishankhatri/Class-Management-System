import React from "react";
import SelectInputField from "../common/InputField/SelectInputField";
import ViewModal from "../common/Modal/ViewModal";

function StudentEditModal({ register, data, Controller, control }) {
  return (
    <React.Fragment>
      <div className={"allinputfield"}>
        <ViewModal
          title={"FirstName"}
          register={register}
          disabled={false}
          name={"studentFirstName"}
          value={data.first_name}
        />
        <ViewModal
          title={"MiddleName"}
          register={register}
          disabled={false}
          name={"studentMiddleName"}
          value={data.middle_name}
        />
        <ViewModal
          title={"LastName"}
          register={register}
          disabled={false}
          name={"studentLastName"}
          value={data.last_name}
        />
        <Controller
          name="studentGender"
          control={control}
          defaultValue={{
            label: data.gender,
            value: data.gender,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Gender"}
              name="studentGender"
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.gender,
                value: data.gender,
              }}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
          )}
        />
        <ViewModal
          title={"Date of Birth"}
          register={register}
          disabled={false}
          name={"studentDOB"}
          value={data.DOB}
          type={"date"}
        />
        <ViewModal
          title={"Phone"}
          register={register}
          disabled={false}
          name={"studentPhone"}
          value={data.contact_no}
          type={"number"}
        />
        <ViewModal
          title={"Address"}
          register={register}
          disabled={false}
          name={"studentAddress"}
          value={data.address}
        />
        <Controller
          name="className"
          control={control}
          defaultValue={{
            label: data.current_grade.class_name,
            value: data.current_grade.class_name,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Class"}
              name="className"
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.current_grade.class_name,
                value: data.current_grade.class_name,
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
          name="sectionName"
          control={control}
          defaultValue={{
            label: data.current_grade.section,
            value: data.current_grade.section,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Section"}
              name="sectionName"
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.current_grade.section,
                value: data.current_grade.section,
              }}
              options={[
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "C", label: "C" },
              ]}
            />
          )}
        />
        <ViewModal
          title={"SRN"}
          register={register}
          disabled={false}
          name={"studentSRN"}
          value={data.SRN}
        />
        <ViewModal
          title={"User Photo"}
          register={register}
          disabled={false}
          name={"studentPhoto"}
          file={true}
        />
      </div>
    </React.Fragment>
  );
}
export default StudentEditModal;
