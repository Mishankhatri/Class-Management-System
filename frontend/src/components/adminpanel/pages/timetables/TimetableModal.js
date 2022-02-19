import React, { useEffect, useState } from "react";
import ViewModal from "./../../../common/Modal/ViewModal";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import { GetPaginatedGradePromise } from "./../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";

function TimetableModal({ register, data, Controller, control }) {
  //Get All list Of Class and Section
  const [grade, setGrade] = useState([]);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedGradePromise();
        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };

    GetOptions();
  }, []);

  const getSection = (data) => {
    const sectionOptions = grade.filter(
      (value) => value.class_name == data.value
    );

    return sectionOptions.map((value) => ({
      label: value.section,
      value: value.section,
    }));
  };

  const [section, setSection] = useState();

  const uniqueGrade = UniqueArray(grade, "class_name");

  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  const handleSection = (data) => {
    const sectionLabel = getSection(data);
    setSection(sectionLabel);
  };

  return (
    <React.Fragment>
      <div>
        <div className={"allinputfield"}>
          <Controller
            name="day"
            control={control}
            defaultValue={{
              label: data.day,
              value: data.day,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Day"}
                name="day"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.day,
                  value: data.day,
                }}
                options={[
                  { value: "Sunday", label: "Sunday" },
                  { value: "Monday", label: "Monday" },
                  { value: "Tuesday", label: "Tuesday" },
                  { value: "Wednesday", label: "Wedday" },
                  { value: "Thursday", label: "Thursday" },
                  { value: "Friday", label: "Friday" },
                ]}
              />
            )}
          />
          <ViewModal
            title={"Start Time"}
            register={register}
            disabled={false}
            name={"startTime"}
            value={data.startTime}
            type={"time"}
          />
          <ViewModal
            title={"End Time"}
            register={register}
            disabled={false}
            name={"endTime"}
            value={data.endTime}
            type={"time"}
          />

          <Controller
            name="class"
            control={control}
            defaultValue={{
              label: data.assigned.grade.slice(0, 2),
              value: +data.assigned.grade.slice(0, 2),
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Class"}
                name="class"
                hasValue={true}
                onChangeHandler={(data) => {
                  handleSection(data);
                  field.onChange(data);
                }}
                value={{
                  label: data.assigned.grade.slice(0, 2),
                  value: +data.assigned.grade.slice(0, 2),
                }}
                options={classOptions}
              />
            )}
          />
          <Controller
            name="section"
            control={control}
            defaultValue={{
              label: data.assigned.grade.slice(4, 5),
              value: data.assigned.grade.slice(4, 5),
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Section"}
                name="section"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.assigned.grade.slice(4, 5),
                  value: data.assigned.grade.slice(4, 5),
                }}
                options={section}
              />
            )}
          />
          <Controller
            name="subject"
            control={control}
            defaultValue={{
              label: data.assigned.subject,
              value: data.assigned.subject,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Subject"}
                name="subject"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.assigned.subject,
                  value: data.assigned.subject,
                }}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                ]}
              />
            )}
          />
          <Controller
            name="teacher"
            control={control}
            defaultValue={{
              label: data.assigned.teacher,
              value: data.assigned.teacher,
            }}
            render={({ field }) => (
              <SelectInputField
                title={"Teacher"}
                name="teacher"
                hasValue={true}
                onChangeHandler={field.onChange}
                value={{
                  label: data.assigned.teacher,
                  value: data.assigned.teacher,
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
      </div>
    </React.Fragment>
  );
}
export default TimetableModal;
