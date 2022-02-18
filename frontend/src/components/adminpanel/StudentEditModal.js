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
          title={"Email"}
          register={register}
          disabled={false}
          name={"studentEmail"}
          value={data.email}
          type={"email"}
        />
        <ViewModal
          title={"Address"}
          register={register}
          disabled={false}
          name={"studentAddress"}
          value={data.address}
        />
      </div>
    </React.Fragment>
  );
}
export default StudentEditModal;
