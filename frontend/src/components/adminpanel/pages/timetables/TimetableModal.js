import React, { useEffect, useState } from "react";
import ViewModal from "./../../../common/Modal/ViewModal";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import { GetPaginatedPromise } from "./../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";
import axiosInstance from "../../../../axios";

function TimetableModal({ register, data, Controller, control }) {
  const [grade, setGrade] = useState([]);

  //Dynamic Options
  const [subject, setSubject] = useState([]);
  const [teacher, setTeacher] = useState([]);

  //Setting Click Reference to find Subject
  const [classRef, setClassRef] = useState([]);
  const [sectionRef, setSectionRef] = useState([]);
  const uniqueGrade = UniqueArray(grade, "class_name");

  const gradeName = +data.assigned.grade.class_name;

  //Resetting Select Value after submit
  const [sectionReference, setSectionReference] = useState(null);
  const [subjectReference, setSubjectReference] = useState(null);
  const [teacherReference, setTeacherReference] = useState(null);

  const refClearSection = (ref) => setSectionReference(ref);
  const refClearSubject = (ref) => setSubjectReference(ref);
  const refClearTeacher = (ref) => setTeacherReference(ref);

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
    const sectionOptions = grade.filter(
      (value) => value.class_name == data.value
    );

    return sectionOptions.map((value) => ({
      label: value.section,
      value: value.section,
    }));
  };

  //Setting Default Section Via URL
  const selectSection = getSection({
    label: gradeName,
    value: gradeName,
  });

  const initialData = [...selectSection];

  const [section, setSection] = useState(initialData);
  //Getting Subjects

  const getSubjects = (data) => {
    return data.map((value) => ({
      label: value.subject_name,
      value: value.id,
    }));
  };

  const getTeacherDetail = (data) => {
    return data.map((value) => ({
      label: `${value.teacher.first_name} ${
        value.teacher.middle_name ? value.teacher.middle_name : ""
      } ${value.teacher.last_name}`,
      value: value.teacher.id,
    }));
  };

  //Making Class Options
  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  //Set Section from Selecting Class
  // {label: 1, value: 1}
  const handleClass = (data) => {
    if (data) {
      setClassRef(data.value);
      const sectionLabel = getSection(data);
      setSection(sectionLabel);
    }
  };

  //Set Subject after selecting both class and section
  const handleSection = (data) => {
    if (data) {
      setSectionRef(data.value);

      //Setting Subject Option based on Class
      axiosInstance
        .get(`/subjects?classname=${classRef}&section=${data.value}`)
        .then(({ data: { results } }) => {
          const subjects = getSubjects(results);
          setSubject(subjects);
        });
    }
  };

  const handleSubject = (data) => {
    if (data) {
      axiosInstance
        .get(`/grades?classname=${classRef}&section=${sectionRef}`)
        .then(({ data: { results } }) => {
          axiosInstance
            .get(
              `/AssignTeacherToSubjectsAPI?grade=${results[0].id}&subject=${data.value}`
            )
            .then(({ data: { results } }) => {
              const teachers = getTeacherDetail(results);
              setTeacher(teachers);
            });
        });
    }
  };

  return (
    <React.Fragment>
      <div>
        <h4 style={{ color: "rgba(255,0,0,0.8)" }}>All fields Are required</h4>
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
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInputField
                title={"Class"}
                name="class"
                hasValue={false}
                onChangeHandler={(data) => {
                  sectionReference.clearValue();
                  subjectReference.clearValue();
                  teacherReference.clearValue();
                  setSubject([]);
                  setTeacher([]);
                  handleClass(data);
                  field.onChange(data);
                }}
                options={classOptions}
              />
            )}
          />
          {section && (
            <Controller
              name="section"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectInputField
                  title={"Section"}
                  name="section"
                  hasValue={false}
                  refClear={refClearSection}
                  onChangeHandler={(data) => {
                    subjectReference.clearValue();
                    teacherReference.clearValue();
                    setTeacher([]);
                    handleSection(data);
                    field.onChange(data);
                  }}
                  options={section}
                />
              )}
            />
          )}
          {subject && (
            <Controller
              name="subject"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectInputField
                  title={"Subject"}
                  name="subject"
                  options={subject}
                  hasValue={false}
                  refClear={refClearSubject}
                  onChangeHandler={(data) => {
                    teacherReference.clearValue();
                    handleSubject(data);
                    field.onChange(data);
                  }}
                />
              )}
            />
          )}
          {teacher && (
            <Controller
              name="teacher"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectInputField
                  title={"Teacher"}
                  name="teacher"
                  hasValue={false}
                  refClear={refClearTeacher}
                  onChangeHandler={field.onChange}
                  options={teacher}
                />
              )}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default TimetableModal;
