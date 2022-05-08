import React, { useState, useEffect } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import AttendanceTableData from "./AttendanceTableData";
import { useForm, Controller } from "react-hook-form";
import { GetPaginatedPromise } from "../../../GetOptions";
import axiosInstance from "../../../../axios";
import { UniqueArray } from "../../../common/ReverseArray";
import SelectInputField from "../../../common/InputField/SelectInputField";
import InputField from "../../../common/InputField/InputField";

function Attendance() {
  const { handleSubmit, control } = useForm();

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
  const uniqueGrade = UniqueArray(grade, "class_name");

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

  const handleClass = (data) => {
    if (data) {
      setGradeId(null);
      setClassRef(data.value);
      const sectionLabel = getSection(data);
      setSection(sectionLabel);
    }
  };

  //Set Subject after selecting both class and section
  const handleSection = (data) => {
    if (data) {
      setSectionRef(data.value);
      setGradeId(null);
      axiosInstance
        .get(`/subjects?classname=${classRef}&section=${data.value}`)
        .then(({ data: { results } }) => {
          const subjects = getSubjects(results);
          setSubject(subjects);
        });
    }
  };

  const onSubmitData = (data) => {
    setSubjectChoose(data.selectSubject.value);
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
        <AttendanceTableData
          gradeId={gradeId}
          subject={subjectChoose}
          date={date}
        />
      )}
    </>
  );
}

export default Attendance;
