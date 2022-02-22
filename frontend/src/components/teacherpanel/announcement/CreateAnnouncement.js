import React, { useEffect, useState } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { CreateTeacherAnnouncement } from "../../../redux/actions/teacher/teacheractions";
import { createMessage } from "../../../redux/actions/alertactions";
import { GetPaginatedAssignedPromise } from "./../../GetOptions";
import { UniqueArray } from "../../common/ReverseArray";

function CreateAnnouncement() {
  const [selectRefForClass, setSelectRefForClass] = useState(null);
  const [selectRefSection, setSelectRefForSection] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [assignedTeacher, setAssignedTeacher] = useState([]);
  const [section, setSection] = useState([]);

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

  const handleClass = (data) => {
    if (data) {
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

  const { handleSubmit, control } = useForm();

  const refClearForClass = (ref) => setSelectRefForClass(ref);
  const refClearForSection = (ref) => setSelectRefForSection(ref);

  const onSubmitForm = (data, e) => {
    const postdata = new FormData();

    if (!data.announcementForClass) {
      dispatch(createMessage({ classRequired: "Subject Field is Required" }));
    } else if (!data.announcementForSection) {
      dispatch(createMessage({ sectionRequired: "Type field is Required" }));
    } else {
      postdata.append("created_by", user.id);
      postdata.append("details", data.announcementSubjects);
      postdata.append("title", data.announcementTypeName);
      postdata.append("files_by_teachers", data.announcementFile);

      //Generate Id from above
      axiosInstance
        .get(
          `/grades/?classname=${data.announcementForClass.value}&section=${data.announcementForSection.value}`
        )
        .then(({ data: { results } }) => {
          postdata.append("announcement_for_class", results[0].id);
          dispatch(CreateTeacherAnnouncement(postdata));
        })
        .catch((err) => {
          console.log(err);
        });

      e.target.reset();
      selectRefForClass.clearValue();
      selectRefSection.clearValue();
    }
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdDashboard />} name={"Announcements"} />
      <div className="main-content">
        {/* // custom-grid */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">CREATE ANNOUNCEMENTS</span>
            </div>
            <div className="content-section">
              <div className="custom-modal-input">
                <Controller
                  name={"announcementTypeName"}
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Title".toUpperCase()}
                      input={"text"}
                      icon={<FaIcons.FaCogs className="mid-icon" />}
                      name={"announcementTypeName"}
                      onChangeHandler={field.onChange}
                      isRequired={true}
                    />
                  )}
                />
                <Controller
                  name={"announcementForClass"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Class".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"announcementForClass"}
                      onChangeHandler={(data) => {
                        selectRefSection.clearValue();
                        setSection([]);
                        handleClass(data);
                        field.onChange(data);
                      }}
                      isRequired={false}
                      options={classOptions}
                      refClear={refClearForClass}
                    />
                  )}
                />
                <Controller
                  name={"announcementForSection"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      title={"Section".toUpperCase()}
                      input={"dropdown"}
                      icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                      name={"announcementForSection"}
                      onChangeHandler={(data) => {
                        field.onChange(data);
                      }}
                      isRequired={true}
                      options={section}
                      refClear={refClearForSection}
                    />
                  )}
                />
              </div>
              <Controller
                name={"announcementSubjects"}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: `Announcement Subjects is required`,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Subjects".toUpperCase()}
                    input={"textarea"}
                    icon={<FaIcons.FaCode className="mid-icon" />}
                    name={"announcementSubjects"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    isTextArea={true}
                    isCustomInput={true}
                  />
                )}
              />

              <Controller
                name={"announcementFile"}
                control={control}
                defaultValue=""
                render={(props) => (
                  <FileInput
                    name={"announcementFile"}
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
          </div>
          <button className="morebutton btn" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAnnouncement;
