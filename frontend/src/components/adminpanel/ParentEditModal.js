import React from "react";
import SelectInputField from "../common/InputField/SelectInputField";
import ViewModal from "../common/Modal/ViewModal";

function ParentEditModal({ register, data, Controller, control }) {
  return (
    <React.Fragment>
      <div className={"allinputfield"}>
        <ViewModal
          title={"Father Name"}
          register={register}
          disabled={false}
          name={"studentFatherName"}
          value={data.father_name}
        />
        <ViewModal
          title={"Mother Name"}
          register={register}
          disabled={false}
          name={"studentMotherName"}
          value={data.mother_name}
        />
        <ViewModal
          title={"Phone"}
          register={register}
          disabled={false}
          type="number"
          name={"studentParentContact"}
          value={data.parent_contact_no}
        />

        <ViewModal
          title={"Additional Contact"}
          register={register}
          disabled={false}
          name={"parentAdditionalContact"}
          value={data.parent_additional_contact_no}
          type="number"
        />

        <ViewModal
          title={"Email"}
          register={register}
          disabled={false}
          name={"parentEmail"}
          value={data.parent_email}
          type={"email"}
        />
        <ViewModal
          title={"Address"}
          register={register}
          disabled={false}
          name={"parentAddress"}
          value={data.parent_address}
        />
        <Controller
          name="parentState"
          control={control}
          defaultValue={{
            label: data.parent_state,
            value: data.parent_state,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"State"}
              name="parentState"
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.parent_state,
                value: data.parent_state,
              }}
              options={[
                { value: "Province 1", label: "Province 1" },
                { value: "Province 2", label: "Province 2" },
                { value: "Bagmati", label: "Bagmati" },
                { value: "Gandaki", label: "Gandaki" },
                { value: "Lumbini", label: "Lumbini" },
                { value: "Karnali", label: "Karnali" },
                { value: "Sudurpashchim", label: "Sudurpashchim" },
              ]}
            />
          )}
        />
      </div>
    </React.Fragment>
  );
}
export default ParentEditModal;
