import React, { useEffect, useState } from "react";
import InnerHeader from "../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import SelectInputField from "./../../../common/InputField/SelectInputField";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { GetPaginatedPromise } from "../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";
import axiosInstance from "../../../../axios";
import { AssignTeacherSubjects } from "../../../../redux/actions/teacher/teacheractions";
import AssignTeacherTable from "./AssignTeacherTable";

function AssignTeacher() {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  //Getting Whole Array form database
  const [grade, setGrade] = useState([]);
  const [teacherDB, setTeacherDB] = useState([]);

  //Dynamic Options
  const [section, setSection] = useState([]);
  const [subject, setSubject] = useState([]);
  const [teacher, setTeacher] = useState([]);

  //Setting Click Reference to find Subject
  const [classRef, setClassRef] = useState([]);
  const [sectionRef, setSectionRef] = useState([]);
  const uniqueGrade = UniqueArray(grade, "class_name");

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedPromise("grades");
        const teachers = await GetPaginatedPromise("teacher");
        setGrade(got);
        setTeacherDB(teachers);
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

  //Getting Subjects
  const getSubjects = (data) => {
    return data.map((value) => ({
      label: value.subject_name,
      value: value.id,
    }));
  };

  const getTeachers = (data) => {
    return data.map((value) => ({
      label: `${value.first_name} ${value.middle_name} ${value.last_name}`,
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
    setClassRef(data.value);
    const sectionLabel = getSection(data);
    setSection(sectionLabel);
  };

  //Set Subject after selecting both class and section
  const handleSection = (data) => {
    //Setting Teacher Options
    setSectionRef(data.value);
    const teacherOption = getTeachers(teacherDB);
    setTeacher(teacherOption);

    //Setting Subject Option based on Class
    axiosInstance
      .get(`/subjects?classname=${classRef}&section=${data.value}`)
      .then(({ data: { results } }) => {
        const subjects = getSubjects(results);
        setSubject(subjects);
      });
  };

  const onSubmitData = (data) => {
    console.log(data);
    let postData = new FormData();
    postData.append("subject", data.selectSubject.value);
    postData.append("teacher", data.selectTeacher.value);

    axiosInstance
      .get(
        `/grades/?classname=${data.selectClass.value}&section=${data.selectSection.value}`
      )
      .then(({ data: { results } }) => {
        postData.append("grade", results[0].id);
        dispatch(AssignTeacherSubjects(postData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Assign Teacher"} />
      <div className="main-content ">
        <div className="card-section">
          <div className="heading">
            <span className="title-icon">
              <MdIcons.MdVerifiedUser />
            </span>
            <span className="title">ASSIGN TEACHERS</span> {/*Custom  */}
          </div>
          <div className="content-section">
            <form onSubmit={handleSubmit(onSubmitData)}>
              <div className="allinputfield">
                <Controller
                  name="selectClass"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInputField
                      title={"Select Class"}
                      icon={<MdIcons.MdDepartureBoard className="mid-icon" />}
                      name={"selectClass"}
                      onChangeHandler={(data) => {
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
                      icon={<MdIcons.MdCode className="mid-icon" />}
                      name={"selectSection"}
                      onChangeHandler={(data) => {
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
                      name={"selectSubject"}
                      onChangeHandler={field.onChange}
                    />
                  )}
                />

                <Controller
                  name="selectTeacher"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <SelectInputField
                      title={"Assign Teacher"}
                      icon={<MdIcons.MdVerified className="mid-icon" />}
                      name={"selectTeacher"}
                      onChangeHandler={field.onChange}
                      options={teacher}
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
              <MdIcons.MdVerifiedUser />
            </span>
            <span className="title">VIEW ASSIGN TEACHERS</span> {/*Custom  */}
          </div>
          <div className="content-section" style={{ marginTop: 20 }}>
            <AssignTeacherTable />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default AssignTeacher;
