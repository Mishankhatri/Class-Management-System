import React, { useEffect, useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import { addSlot } from "../../../values/AdminPanel/TimetableValues";
import ViewTimetable_Table from "./ViewTimetable_Table";

import "./../users/UserProfile.css";
import ChangeInput from "./../../../common/Modal/ChangeInput";
import { useDispatch } from "react-redux";
import { AddTimetables } from "../../../../redux/actions/admin/adminaction";
import ViewModal from "./../../../common/Modal/ViewModal";
import SelectInputField from "../../../common/InputField/SelectInputField";
import { UniqueArray } from "../../../common/ReverseArray";
import { GetPaginatedPromise } from "../../../GetOptions";
import axiosInstance from "./../../../../axios";
import { createMessage } from "../../../../redux/actions/alertactions";

function CreateTimetables() {
  const { handleSubmit, control, register } = useForm();
  const dispatch = useDispatch();

  //Getting Whole Array form database
  const [grade, setGrade] = useState([]);

  //Dynamic Options
  const [section, setSection] = useState([]);
  const [subject, setSubject] = useState([]);
  const [teacher, setTeacher] = useState([]);

  //Setting Click Reference to find Subject
  const [classRef, setClassRef] = useState([]);
  const [sectionRef, setSectionRef] = useState([]);
  const [subjectRef, setSubjectRef] = useState([]);
  const uniqueGrade = UniqueArray(grade, "class_name");

  //Resetting Select Value after submit
  const [classReference, setClassReference] = useState(null);
  const [sectionReference, setSectionReference] = useState(null);
  const [subjectReference, setSubjectReference] = useState(null);
  const [teacherReference, setTeacherReference] = useState(null);
  const [dayReference, setDayReference] = useState(null);

  const refClearClass = (ref) => setClassReference(ref);
  const refClearSection = (ref) => setSectionReference(ref);
  const refClearSubject = (ref) => setSubjectReference(ref);
  const refClearTeacher = (ref) => setTeacherReference(ref);
  const refClearDay = (ref) => setDayReference(ref);

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
      setSubjectRef(data.value);
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

  const onSubmitForm = (data, e) => {
    console.log(data);
    const postData = new FormData();
    try {
      if (!data.day) {
        dispatch(createMessage({ dayRequired: "Day is Required" }));
      } else if (!data.class) {
        dispatch(createMessage({ classRequired: "Class is Required" }));
      } else if (!data.section) {
        dispatch(createMessage({ sectionRequired: "Section is Required" }));
      } else if (!data.subject) {
        dispatch(createMessage({ subjectRequired: "Subject is Required" }));
      } else if (!data.teacher) {
        dispatch(createMessage({ teacherRequired: "Teacher is Required" }));
      } else {
        postData.append("day", data.day.value);
        postData.append("startTime", data.startTime);
        postData.append("endTime", data.endTime);
        axiosInstance
          .get(
            `/grades?classname=${data.class.value}&section=${data.section.value}`
          )
          .then(({ data: { results } }) => {
            axiosInstance
              .get(
                `/AssignTeacherToSubjectsAPI?grade=${results[0].id}&subject=${data.subject.value}&teacher=${data.teacher.value}`
              )
              .then(({ data: { results } }) => {
                postData.append("assigned", results[0].id);
                dispatch(AddTimetables(postData));
              })
              .catch((err) => {
                throw err;
              });
          });
      }
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
    // ;
    classReference.clearValue();
    sectionReference.clearValue();
    dayReference.clearValue();
    subjectReference.clearValue();
    teacherReference.clearValue();
  };

  const [click, setClick] = useState(false);

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
    setClick(false);
  };
  return (
    <div>
      {click && (
        <ChangeInput
          onSubmit={onSubmit}
          valueArray={addSlot}
          click={click}
          setClick={setClick}
          heading={"View Class"}
          isCustom1={false} //For showing grid 3
          isCustom2={false} //For showing description
        />
      )}
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Create Timetables"} />
      <div className="main-content">
        <div className="timetable">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className={"card-section"}>
              <div className="heading">
                <span className="title-icon">{<MdIcons.MdTableView />}</span>
                <span className="title">Create Timetables</span> {/*Custom  */}
              </div>

              <div className={"content-section"}>
                <div className="allinputfield">
                  <Controller
                    name="day"
                    control={control}
                    render={({ field }) => (
                      <SelectInputField
                        title={"Day"}
                        name="day"
                        refClear={refClearDay}
                        isRequired={true}
                        icon={<FaIcons.FaUser className="mid-icon" />}
                        onChangeHandler={field.onChange}
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
                    isRequired={true}
                    type={"time"}
                    icon={<FaIcons.FaUser className="mid-icon" />}
                  />
                  <ViewModal
                    title={"End Time"}
                    register={register}
                    disabled={false}
                    isRequired={true}
                    name={"endTime"}
                    type={"time"}
                    icon={<FaIcons.FaUser className="mid-icon" />}
                  />
                  <Controller
                    name="class"
                    control={control}
                    render={({ field }) => (
                      <SelectInputField
                        title={"Class"}
                        name="class"
                        refClear={refClearClass}
                        isRequired={true}
                        icon={<FaIcons.FaCode className="mid-icon" />}
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
                  <Controller
                    name="section"
                    control={control}
                    render={({ field }) => (
                      <SelectInputField
                        title={"Section"}
                        isRequired={true}
                        icon={<FaIcons.FaCode className="mid-icon" />}
                        name="section"
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
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <SelectInputField
                        title={"Subject"}
                        name="subject"
                        refClear={refClearSubject}
                        icon={<MdIcons.MdBook className="mid-icon" />}
                        options={subject}
                        isRequired={true}
                        onChangeHandler={(data) => {
                          teacherReference.clearValue();
                          handleSubject(data);
                          field.onChange(data);
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="teacher"
                    control={control}
                    render={({ field }) => (
                      <SelectInputField
                        title={"Teacher"}
                        name="teacher"
                        isRequired={true}
                        refClear={refClearTeacher}
                        icon={<FaIcons.FaUser className="mid-icon" />}
                        onChangeHandler={field.onChange}
                        options={teacher}
                      />
                    )}
                  />
                </div>
                <button
                  className="morebutton btn"
                  type="submit"
                  style={{ marginTop: 30 }}>
                  Submit
                </button>
              </div>
            </div>
          </form>

          <h2 className="h3">View All Slots</h2>
          <ViewTimetable_Table />
        </div>
      </div>
    </div>
  );
}

export default CreateTimetables;
