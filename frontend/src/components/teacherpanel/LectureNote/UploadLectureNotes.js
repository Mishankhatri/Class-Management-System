import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";

import InnerHeader from "../../common/InnerHeader";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";
import axiosInstance from "./../../../axios";
import { useSelector, useDispatch } from "react-redux";
import { UniqueArray } from "../../common/ReverseArray";
import { GetPaginatedAssignedPromise } from "./../../GetOptions";
import { createMessage } from "../../../redux/actions/alertactions";
import { AddLectureNotes } from "./../../../redux/actions/teacher/teacheractions";

function UploadLectureNotes() {
  const { user } = useSelector((state) => state.auth);
  const { handleSubmit, control } = useForm();

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

    return uniqueSection.map((section) => ({
      label: section,
      value: section,
    }));
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

      postdata.append("notes_files", data.noteFile);
      postdata.append("description", data.noteRemark);
      postdata.append("title", data.title);
      postdata.append("created_by", user.id);

      axiosInstance
        .get(`/teacher?user=${user.id}`)
        .then(({ data: { results } }) => {
          postdata.append("teacher", results[0].id);
        })
        .then(() => {
          axiosInstance
            .get(
              `/grades/?classname=${data.studentClass.value}&section=${data.studentSection.value}`
            )
            .then(({ data: { results } }) => {
              postdata.append("grade", results[0].id);
            })
            .then(() => {
              axiosInstance
                .get(
                  `/subjects/?classname=${data.studentClass.value}&section=${data.studentSection.value}`
                )
                .then(({ data: { results } }) => {
                  const subject = results.find(
                    (value) => value.subject_name === data.studentCourse.value
                  );
                  postdata.append("subject", subject.id);
                  dispatch(AddLectureNotes(postdata));
                });
            });
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
      <InnerHeader icon={<MdIcons.MdUploadFile />} name={"Lecture Notes"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaFileArchive />
              </span>
              <span className="title">UPLOAD LECTURE NOTES</span>
            </div>
            <div className="content-section">
              <div className="allinputfield">
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
                  name={"title"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Notes Title".toUpperCase()}
                      input={"text"}
                      icon={<FaIcons.FaBookOpen className="mid-icon" />}
                      name={"title"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />
              </div>
              <Controller
                name={"noteRemark"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Notes Description".toUpperCase()}
                    input={"textarea"}
                    icon={<FaIcons.FaBookOpen className="mid-icon" />}
                    name={"noteRemark"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    isTextArea={true}
                  />
                )}
              />
              <Controller
                name={"noteFile"}
                control={control}
                defaultValue=""
                render={(props) => (
                  <FileInput
                    name={"noteFile"}
                    title={"Upload File"}
                    icon={<FaIcons.FaFile className="mid-icon" />}
                    isRequired={true}
                    isImageFile={false}
                    onChange={(event) =>
                      props.field.onChange(event.target.files[0])
                    }
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
export default UploadLectureNotes;
