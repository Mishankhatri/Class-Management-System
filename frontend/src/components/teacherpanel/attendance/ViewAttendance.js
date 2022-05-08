import React, { useState, useEffect } from "react";
import InnerHeader from "./../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import ViewAttendanceTable from "./ViewAttendanceTable";
import { useForm, Controller } from "react-hook-form";
import { UniqueArray } from "../../common/ReverseArray";
import { GetPaginatedAssignedPromise } from "../../GetOptions";
import axiosInstance from "../../../axios";
import SelectInputField from "../../common/InputField/SelectInputField";
import InputField from "../../common/InputField/InputField";
import { useSelector } from "react-redux";
import ViewAttendancePresent from "./ViewAttendancePresent";

function ViewAttendance() {
  const { handleSubmit, control } = useForm();
  const { user } = useSelector((state) => state.auth);

  const [gradeId, setGradeId] = useState(null);
  const [subjectChoose, setSubjectChoose] = useState(null);
  const [date, setDate] = useState(null);

  //Getting Whole Array form database
  const [grade, setGrade] = useState([]);

  //Dynamic Options
  const [section, setSection] = useState([]);
  const [subject, setSubject] = useState([]);

  //Setting Click Reference to find Subject
  const [classRef, setClassRef] = useState([]);
  const [sectionRef, setSectionRef] = useState([]);

  //Resetting Select Value after submit
  const [classReference, setClassReference] = useState(null);
  const [sectionReference, setSectionReference] = useState(null);
  const [subjectReference, setSubjectReference] = useState(null);

  const refClearClass = (ref) => setClassReference(ref);
  const refClearSection = (ref) => setSectionReference(ref);
  const refClearSubject = (ref) => setSubjectReference(ref);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedAssignedPromise(
          "AssignTeacherToSubjectsAPI",
          user.id
        );
        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  //Getting Section Options based on Class Input
  const uniqueGrade = UniqueArray(grade, "grade");
  const classOptions = UniqueArray(uniqueGrade, "class_name")
    .sort()
    .map((data) => ({
      label: data,
      value: data,
    }));

  const getSection = (data) => {
    if (data) {
      const section = data.map((value) => value.grade);
      const uniqueSection = UniqueArray(section, "section").sort();
      return uniqueSection.map((section) => ({
        label: section,
        value: section,
      }));
    }
  };

  //Getting Subjects
  const getSubjects = (data) => {
    const subjects = data.map((value) => [
      value.subject.id,
      value.subject.subject_name,
    ]);
    return subjects.map((section) => ({
      id: section[0],
      label: section[1],
      value: section[1],
    }));
  };

  const handleClass = (data) => {
    if (data) {
      setGradeId(null);
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

  //Set Subject after selecting both class and section
  const handleSection = (data) => {
    if (data) {
      setSectionRef(data.value);
      setGradeId(null);
      axiosInstance
        .get(
          `AssignTeacherToSubjectsAPI/?user=${user.id}&classname=${classRef}&section=${data.value}`
        )
        .then(({ data: { results } }) => {
          const subjectData = getSubjects(results);
          setSubject(subjectData);
        });
    }
  };

  const onSubmitData = (data) => {
    setSubjectChoose(data.selectSubject.id);
    setDate(data.selectDate);
    axiosInstance
      .get(
        `/grades/?classname=${data.selectClass.value}&section=${data.selectSection.value}`
      )
      .then(({ data: { results } }) => {
        setGradeId(results[0].id);
      });
  };
  return (
    <>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"View Attendance"} />
      <div className="main-content">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaReact />
            </span>
            <span className="title">Select Class And Subject</span>
          </div>
          <div className="content-section">
            <form onSubmit={handleSubmit(onSubmitData)}>
              <div className="allinputfield custom-modal-input">
                <Controller
                  name="selectClass"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInputField
                      title={"Select Class"}
                      icon={<MdIcons.MdDepartureBoard className="mid-icon" />}
                      name={"selectClass"}
                      isRequired={true}
                      refClear={refClearClass}
                      onChangeHandler={(data) => {
                        sectionReference.clearValue();
                        subjectReference.clearValue();
                        setSubject([]);
                        handleClass(data);
                        field.onChange(data);
                      }}
                      options={classOptions}
                    />
                  )}
                />

                <Controller
                  name="selectSection"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInputField
                      title={"Select Section"}
                      refClear={refClearSection}
                      isRequired={true}
                      icon={<MdIcons.MdCode className="mid-icon" />}
                      name={"selectSection"}
                      onChangeHandler={(data) => {
                        subjectReference.clearValue();
                        handleSection(data);
                        field.onChange(data);
                      }}
                      options={section}
                    />
                  )}
                />

                <Controller
                  name="selectSubject"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInputField
                      title={"Select Subject"}
                      icon={<MdIcons.MdSubject className="mid-icon" />}
                      options={subject}
                      refClear={refClearSubject}
                      isRequired={true}
                      name={"selectSubject"}
                      onChangeHandler={(data) => {
                        setGradeId(null);
                        field.onChange(data);
                      }}
                    />
                  )}
                />

                <Controller
                  name="selectDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"SELECT DATE"}
                      input="date"
                      icon={<MdIcons.MdDateRange className="mid-icon" />}
                      placeholder={"Enter Date"}
                      name={"selectDate"}
                      onChangeHandler={(data) => {
                        setGradeId(null);
                        field.onChange(data);
                      }}
                      isRequired={false}
                    />
                  )}
                />
              </div>
              <button className="btn-edit" style={{ marginTop: 20 }}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {gradeId && (
        <>
          <ViewAttendanceTable
            gradeId={gradeId}
            subject={subjectChoose}
            date={date}
          />
          {/* <ViewAttendancePresent gradeId={gradeId} subjectId={subjectChoose} /> */}
        </>
      )}
    </>
  );
}

export default ViewAttendance;
