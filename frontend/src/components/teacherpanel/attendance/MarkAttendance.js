import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import InnerHeader from "../../common/InnerHeader";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AttendanceTableData from "./AttendanceMarkTableData";
import { UniqueArray } from "../../common/ReverseArray";
import { GetPaginatedAssignedPromise } from "../../GetOptions";
import axiosInstance from "../../../axios";
import {
  createMessage,
  returnErrors,
} from "../../../redux/actions/alertactions";
import InputField from "../../common/InputField/InputField";

function MarkAttendance() {
  const [attendanceClassDetails, setAttendaceClassDetails] = useState({});
  const [fetchStudents, setFetchStudents] = useState(false);
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();
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
  let teacherId = useRef(null);
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

  if (Object.keys(assignedTeacher).length !== 0) {
    teacherId.current = assignedTeacher[0].teacher.id;
  }

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
  const onSubmitData = (data) => {
    if (!data.studentClass) {
      dispatch(createMessage({ classRequired: "Class Field is Required" }));
    } else if (!data.studentSection) {
      dispatch(createMessage({ sectionRequired: "Section Field is Required" }));
    } else if (!data.studentCourse) {
      dispatch(createMessage({ subjectRequired: "Course Field is Required" }));
    } else {
      axiosInstance
        .get(
          `/grades/?classname=${data.studentClass.value}&section=${data.studentSection.value}`
        )
        .then(({ data: { results } }) => {
          let fetchedData = {
            subject: data.studentCourse.id,
            grade: results[0].id,
          };
          setAttendaceClassDetails((prev) => {
            if (
              prev.grade === fetchedData.grade &&
              prev.subject === fetchedData.subject
            ) {
              setFetchStudents(false);
              return { ...prev };
            } else {
              setFetchStudents(true);
              return { ...fetchedData };
            }
          });
        })
        .catch((err) => {
          returnErrors("Not Found", err?.status);
        });
    }
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Mark Attendance"} />
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
              </div>
              <button className="btn-edit" style={{ marginTop: 20 }}>
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <FaIcons.FaChalkboardTeacher />
            </span>
            <span className="title">Mark Attendance</span>
          </div>
          <div className="content-section">
            <AttendanceTableData
              attendanceClassDetails={attendanceClassDetails}
              fetchStudents={fetchStudents}
              teacherId={teacherId.current}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default MarkAttendance;
