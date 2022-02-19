import React, { useEffect, useState } from "react";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";

import axiosInstance from "../../../../axios";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { AddGeneralDetails } from "../../../../redux/actions/student/studentactions";
import { GetPaginatedGradePromise } from "../../../GetOptions";
import { UniqueArray } from "../../../common/ReverseArray";

function AddSection() {
  const [selectClassRef, setClassRef] = useState(null);
  const [selectSectionRef, setSectionRef] = useState(null);
  const { handleSubmit, control } = useForm();

  const refClearClass = (ref) => setClassRef(ref);
  const refClearSection = (ref) => setSectionRef(ref);

  const alert = useAlert();
  const dispatch = useDispatch();

  const [grade, setGrade] = useState([]);

  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedGradePromise();
        setGrade(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  const uniqueGrade = UniqueArray(grade, "class_name");
  const classOptions = uniqueGrade.map((value) => ({
    label: value,
    value: value,
  }));

  // GetOptions();
  const onSubmitForm = (data, e) => {
    const { studentClass, studentSection } = data;
    const postData = new FormData();

    postData.append("class_name", studentClass.value);
    postData.append("section", studentSection.value);

    axiosInstance
      .get(
        `/grades/?classname=${studentClass.value}&section=${studentSection.value}`
      )
      .then(({ data: values }) => {
        if (values.results.length == 0) {
          dispatch(AddGeneralDetails(postData, "grades", "ADD_CLASS_SECTION"));
          alert.success(
            `Class "${studentClass.value}" Added Succefully with Section ${studentSection.value}`
          );
        } else {
          throw `Class "${studentClass.value}" with Section "${studentSection.value}" Already Exists`;
        }
      })
      .catch((error) => {
        alert.error(error);
      });

    selectClassRef.clearValue();
    selectSectionRef.clearValue();
  };

  return (
    <div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={"Add Section"} />
      <div className="main-content">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="card-section">
            <div className="heading">
              <span className="title-icon">
                <FaIcons.FaBook />
              </span>
              <span className="title">ACADEMIC INFO</span>
            </div>
            <div
              className="content-section"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
              }}>
              <Controller
                name={"studentClass"}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputField
                    title={"Student Class".toUpperCase()}
                    input={"dropdown"}
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentClass"}
                    onChangeHandler={field.onChange}
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
                    icon={<FaIcons.FaPhotoVideo className="mid-icon" />}
                    name={"studentSection"}
                    onChangeHandler={field.onChange}
                    isRequired={true}
                    options={[
                      { value: "A", label: "A" },
                      { value: "B", label: "B" },
                      { value: "C", label: "C" },
                      { value: "D", label: "D" },
                      { value: "E", label: "E" },
                      { value: "F", label: "F" },
                    ]}
                    refClear={refClearSection}
                  />
                )}
              />
            </div>
          </div>
          <button className="morebutton btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddSection;
