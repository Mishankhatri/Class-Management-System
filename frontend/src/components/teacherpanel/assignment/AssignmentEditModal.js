import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { FileInput } from "../../common/InputField/FileInput";
import { HeaderInputField } from "../../common/InputField/HeaderInputField";
import SelectInputField from "../../common/InputField/SelectInputField";
import TextAreaInput from "../../common/InputField/TextAreaInput";
import ViewModal from "../../common/Modal/ViewModal";
import { UniqueArray } from "../../common/ReverseArray";
import { GetPaginatedAssignedPromise } from "./../../GetOptions";

function AssignmentEditModal({ register, data, Controller, control }) {
  const gradeSplit = data.subject.split(":")[0];

  const { user } = useSelector((state) => state.auth);
  const [selectRefClass, setSelectRefClass] = useState(null);
  const [selectRefSection, setSelectRefSection] = useState(null);
  const [selectRefCourse, setSelectRefCourse] = useState(null);

  const refClearClass = (ref) => setSelectRefClass(ref);
  const refClearSection = (ref) => setSelectRefSection(ref);
  const refClearCourse = (ref) => setSelectRefCourse(ref);

  const [assignedTeacher, setAssignedTeacher] = useState([]);
  const [section, setSection] = useState([]);
  const [course, setCourse] = useState([]);

  //Setting reference of class
  const [classRef, setClassRef] = useState([]);
  const [sectionRef, setSectionRef] = useState([]);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedAssignedPromise(
          "AssignTeacherToSubjectsAPI",
          user.id
        );

        setAssignedTeacher(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  const uniqueGrade = UniqueArray(assignedTeacher, "grade");
  const classOptions = UniqueArray(uniqueGrade, "class_name")
    .sort()
    .map((data) => ({
      label: data,
      value: data,
    }));

  const getSection = (data) => {
    const section = data.map((value) => value.grade);
    const uniqueSection = UniqueArray(section, "section").sort();

    return uniqueSection.map((section) => ({ label: section, value: section }));
  };

  const getSubjects = (data) => {
    const subjects = data.map((value) => value.subject.subject_name);
    return subjects.map((section) => ({
      label: section,
      value: section,
    }));
  };

  const handleClass = (data) => {
    if (data) {
      setClassRef(data.value);

      axiosInstance
        .get(
          `AssignTeacherToSubjectsAPI/?user=${user.id}&classname=${data.value}`
        )
        .then(({ data: { results } }) => {
          const sectionData = getSection(results);
          setSection(sectionData);
        });
    }
  };

  const handleSection = (data) => {
    if (data) {
      setSectionRef(data.value);
      axiosInstance
        .get(
          `AssignTeacherToSubjectsAPI/?user=${user.id}&classname=${classRef}&section=${data.value}`
        )
        .then(({ data: { results } }) => {
          const subjectData = getSubjects(results);
          setCourse(subjectData);
        });
    }
  };
  return (
    <React.Fragment>
      <div className={"allinputfield"}>
        <ViewModal
          title={"Title"}
          register={register}
          disabled={false}
          name={"title"}
          value={data.title}
        />
        <Controller
          name="class"
          control={control}
          defaultValue={{
            label: data.for_grade.class_name,
            value: data.for_grade.class_name,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Student Class"}
              name="class"
              value={{
                label: data.for_grade.class_name,
                value: data.for_grade.class_name,
              }}
              hasValue={true}
              refClear={refClearClass}
              onChangeHandler={(data) => {
                selectRefSection.clearValue();
                selectRefCourse.clearValue();
                setSection([]);
                setCourse([]);
                handleClass(data);
                field.onChange(data);
              }}
              options={classOptions}
            />
          )}
        />
        <Controller
          name="section"
          control={control}
          defaultValue={{
            label: data.for_grade.section,
            value: data.for_grade.section,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Section"}
              name="section"
              defaultValue=""
              refClear={refClearSection}
              value={{
                label: data.for_grade.section,
                value: data.for_grade.section,
              }}
              hasValue={true}
              onChangeHandler={(data) => {
                selectRefCourse.clearValue();
                setCourse([]);
                handleSection(data);
                field.onChange(data);
              }}
              options={section}
            />
          )}
        />
        <Controller
          name="subject"
          control={control}
          defaultValue={{
            label: gradeSplit,
            value: gradeSplit,
          }}
          render={({ field }) => (
            <SelectInputField
              title={"Subject"}
              value={{
                label: gradeSplit,
                value: gradeSplit,
              }}
              name="subject"
              refClear={refClearCourse}
              hasValue={true}
              onChangeHandler={field.onChange}
              options={course}
            />
          )}
        />
        <ViewModal
          title={"Date Due"}
          type="date"
          register={register}
          disabled={false}
          name={"dateDue"}
          value={data.date_due}
        />
        <ViewModal
          title={"Time Due"}
          type={"time"}
          register={register}
          disabled={false}
          name={"timeDue"}
          value={data.time_due}
        />
        <Controller
          name={"file"}
          control={control}
          defaultValue=""
          render={(props) => (
            <FileInput
              name={"file"}
              title={"Upload File"}
              isRequired={false}
              onChange={(event) => props.field.onChange(event.target.files[0])}
            />
          )}
        />
      </div>
      <Controller
        name={"file"}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <div className="mid-content">
              <HeaderInputField title={"Instruction"} isRequired={true} />
            </div>

            <div className="label-input">
              <TextAreaInput
                name={"file"}
                title={"Upload File"}
                hasValue={true}
                value={data.instructions}
                isRequired={true}
                onChangeHandler={field.onChange}
              />
            </div>
          </>
        )}
      />
    </React.Fragment>
  );
}
export default AssignmentEditModal;
