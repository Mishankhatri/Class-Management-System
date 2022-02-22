import React, { useEffect, useState } from "react";
import SelectInputField from "../common/InputField/SelectInputField";
import ViewModal from "../common/Modal/ViewModal";
import { UniqueArray } from "../common/ReverseArray";
import { GetPaginatedPromise } from "../GetOptions";

function StudentEditModal({ register, data, Controller, control }) {
  //Getting Whole Array form database
  const [grade, setGrade] = useState([]);

  //Dynamic Options
  const [section, setSection] = useState([]);

  //Setting Click Reference to find Subject
  const [classRef, setClassRef] = useState([]);
  const uniqueGrade = UniqueArray(grade, "class_name");

  //Resetting Select Value after submit
  const [classReference, setClassReference] = useState(null);
  const [sectionReference, setSectionReference] = useState(null);

  const refClearClass = (ref) => setClassReference(ref);
  const refClearSection = (ref) => setSectionReference(ref);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedPromise("grades");
        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  //Getting Section Options based on Class Input
  const getSection = (data) => {
    if (data) {
      const sectionOptions = grade.filter(
        (value) => value.class_name == data.value
      );

      return sectionOptions.map((value) => ({
        label: value.section,
        value: value.section,
      }));
    }
  };

  //Getting Subjects
  const getSubjects = (data) => {
    return data.map((value) => ({
      label: value.subject_name,
      value: value.id,
    }));
  };

  //Making Class Options
  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  //Set Section from Selecting Class
  const handleClass = (data) => {
    if (data) {
      setClassRef(data.value);
      const sectionLabel = getSection(data);
      setSection(sectionLabel);
    }
  };
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
              refClear={refClearClass}
              onChangeHandler={(data) => {
                sectionReference.clearValue();
                handleClass(data);
                field.onChange(data);
              }}
              value={{
                label: data.current_grade.class_name,
                value: data.current_grade.class_name,
              }}
              options={classOptions}
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
              refClear={refClearSection}
              hasValue={true}
              onChangeHandler={field.onChange}
              value={{
                label: data.current_grade.section,
                value: data.current_grade.section,
              }}
              options={section}
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
      </div>
    </React.Fragment>
  );
}
export default StudentEditModal;
