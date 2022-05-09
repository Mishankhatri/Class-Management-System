import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";

import InnerHeader from "../../common/InnerHeader";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";
import { GetPaginatedAssignedPromise } from "../../GetOptions";
import { useDispatch, useSelector } from "react-redux";
import { UniqueArray } from "../../common/ReverseArray";
import axiosInstance from "./../../../axios";
import { createMessage } from "./../../../redux/actions/alertactions";
import { AddTeacherAssignment } from "../../../redux/actions/teacher/teacheractions";

function CreateAssignment() {
  const { handleSubmit, control } = useForm();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  const onSubmitForm = (data, e) => {
    console.log(data);
    if (!data.studentClass) {
      dispatch(createMessage({ classRequired: "Class Field is Required" }));
    } else if (!data.studentSection) {
      dispatch(createMessage({ sectionRequired: "Section Field is Required" }));
    } else if (!data.studentCourse) {
      dispatch(createMessage({ subjectRequired: "Course Field is Required" }));
    } else {
      const postdata = new FormData();

      postdata.append("related_files", data.assigmentFile);
      postdata.append("instructions", data.assignmentInstruction);
      postdata.append("title", data.assignmentTitle);
      postdata.append("date_due", data.dateDue);
      postdata.append("time_due", data.timeDue);
      postdata.append("created_by", user.id);

      axiosInstance
        .get(
          `/grades/?classname=${data.studentClass.value}&section=${data.studentSection.value}`
        )
        .then(({ data: { results } }) => {
          postdata.append("for_grade", results[0].id);
        })
        .catch((err) => {
          console.log(err);
        });

      axiosInstance
        .get(
          `/subjects/?classname=${data.studentClass.value}&section=${data.studentSection.value}`
        )
        .then(({ data: { results } }) => {
          const subject = results.find(
            (value) => value.subject_name === data.studentCourse.value
          );
          postdata.append("subject", subject.id);
          dispatch(AddTeacherAssignment(postdata));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //CLear Input Field Value
    e.target.reset();
    selectRefClass.clearValue(); // Clear Select Value
    selectRefSection.clearValue(); // Clear Select Value
    selectRefCourse.clearValue(); // Clear Select Value
  };

  return (
    <React.Fragment>
      <InnerHeader
        icon={<MdIcons.MdUploadFile />}
        name={"Create Assignments"}
      />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaFileArchive />
              </span>
              <span className="title">CREATE HOMEWORK</span>
            </div>
            <div className="content-section">
              <div className="allinputfield">
                <Controller
                  name={"assignmentTitle"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Title".toUpperCase()}
                      input={"text"}
                      icon={<FaIcons.FaCogs className="mid-icon" />}
                      name={"assignmentTitle"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"studentClass"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Class".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaChess className="mid-icon" />}
                      name={"studentClass"}
                      onChangeHandler={(data) => {
                        selectRefSection.clearValue();
                        selectRefCourse.clearValue();
                        setSection([]);
                        setCourse([]);
                        handleClass(data);
                        field.onChange(data);
                      }}
                      isRequired={true}
                      options={classOptions}
                      refClear={refClearClass}
                    />
                  )}
                />

                <Controller
                  name={"studentSection"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Section".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaCode className="mid-icon" />}
                      name={"studentSection"}
                      onChangeHandler={(data) => {
                        selectRefCourse.clearValue();
                        setCourse([]);
                        handleSection(data);
                        field.onChange(data);
                      }}
                      isRequired={true}
                      options={section}
                      refClear={refClearSection}
                    />
                  )}
                />

                <Controller
                  name={"studentCourse"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Student Course".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaBookOpen className="mid-icon" />}
                      name={"studentCourse"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={course}
                      refClear={refClearCourse}
                    />
                  )}
                />

                <Controller
                  name={"dateDue"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Date Due".toUpperCase()}
                      input={"date"}
                      icon={<FaIcons.FaCalendar className="mid-icon" />}
                      name={"dateDue"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"timeDue"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Time Due".toUpperCase()}
                      input={"time"}
                      icon={<FaIcons.FaClock className="mid-icon" />}
                      name={"timeDue"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />

                <Controller
                  name={"assigmentFile"}
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <FileInput
                      name={"assigmentFile"}
                      title={"Upload File"}
                      icon={<FaIcons.FaFile className="mid-icon" />}
                      isRequired={false}
                      isImageFile={false}
                      onChange={(event) =>
                        props.field.onChange(event.target.files[0])
                      }
                    />
                  )}
                />
              </div>

              <Controller
                name={"assignmentInstruction"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Instruction".toUpperCase()}
                    input={"textarea"}
                    icon={<FaIcons.FaBookOpen className="mid-icon" />}
                    name={"assignmentInstruction"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    isTextArea={true}
                  />
                )}
              />
            </div>
          </div>
          <button className="morebutton btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
export default CreateAssignment;
