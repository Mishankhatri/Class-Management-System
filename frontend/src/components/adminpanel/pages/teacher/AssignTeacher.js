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
import { createMessage } from "../../../../redux/actions/alertactions";

function AssignTeacher() {
  const { handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  //Getting Whole Array form database
  const [grade, setGrade] = useState([]);
  const [teacherDB, setTeacherDB] = useState([]);

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
  const [teacherReference, setTeacherReference] = useState(null);

  const refClearClass = (ref) => setClassReference(ref);
  const refClearSection = (ref) => setSectionReference(ref);
  const refClearSubject = (ref) => setSubjectReference(ref);
  const refClearTeacher = (ref) => setTeacherReference(ref);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedPromise("grades");
        const teacher = await GetPaginatedPromise("teacher");
        setGrade(got);
        setTeacherDB(teacher);
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

  const teacherOptions = teacherDB.map((value) => ({
    label: `${value.first_name} ${value.middle_name} ${value.last_name}`,
    value: value.id,
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

  const onSubmitData = (data) => {
    let postData = new FormData();
    if (!data.selectClass) {
      dispatch(createMessage({ classRequired: "Class is Required" }));
    } else if (!data.selectSection) {
      dispatch(createMessage({ sectionRequired: "Section is Required" }));
    } else if (!data.selectSubject) {
      dispatch(createMessage({ subjectRequired: "Subject is Required" }));
    } else if (!data.selectTeacher) {
      dispatch(createMessage({ teacherRequired: "Teacher is Required" }));
    } else {
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

      classReference.clearValue();
      sectionReference.clearValue();
      subjectReference.clearValue();
      teacherReference.clearValue();
    }
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
                      refClear={refClearTeacher}
                      icon={<MdIcons.MdVerified className="mid-icon" />}
                      name={"selectTeacher"}
                      isRequired={true}
                      onChangeHandler={field.onChange}
                      options={teacherOptions}
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
