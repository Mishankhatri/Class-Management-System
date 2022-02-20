import React, { useState } from "react";
import InnerHeader from "../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import { FileInput } from "../../common/InputField/FileInput";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../axios";
import { CreateTeacherAnnouncement } from "../../../redux/actions/teacher/teacheractions";

function CreateAnnouncement() {
  const [selectRefForClass, setSelectRefForClass] = useState(null);
  const [selectRefForSection, setSelectRefForSection] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { handleSubmit, control } = useForm();

  const refClearForClass = (ref) => setSelectRefForClass(ref);
  const refClearForSection = (ref) => setSelectRefForSection(ref);

  const onSubmitForm = (data, e) => {
    console.log(data.announcementFile);

    const postdata = new FormData();

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
        // console.log("Response", err?.response);
        // console.log("Request", err?.request);
        console.log(err);
      });

    e.target.reset();
    selectRefForClass.clearValue();
    selectRefForSection.clearValue();
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
                      onChangeHandler={field.onChange}
                      isRequired={false}
                      options={[
                        { value: "12", label: "12" },
                        { value: "11", label: "11" },
                        { value: "10", label: "10" },
                      ]}
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
                      onChangeHandler={field.onChange}
                      isRequired={true}
                      options={[
                        { value: "A", label: "A" },
                        { value: "B", label: "B" },
                        { value: "C", label: "C" },
                      ]}
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
