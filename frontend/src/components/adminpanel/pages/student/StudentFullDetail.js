import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";

import Loading from "./../../../common/Loading";
import ViewModal from "../../../common/Modal/ViewModal";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import StudentEditModal from "../../StudentEditModal";
import {
  ChangeStudentDetail,
  StudentClassById,
} from "./../../../../redux/actions/student/studentactions";
import axiosInstance from "../../../../axios";

function StudentFullDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  const { studentId: data } = useSelector((state) => state.students);
  console.log(data);

  useEffect(() => {
    dispatch(StudentClassById(id));
  }, [id]);

  const [clickStudent, setClickStudent] = useState(false);

  //React Hook form Initialization fot editing
  const { handleSubmit, control, register } = useForm();

  //On Editing Student Info
  const onSubmitStudentInput = (data, e) => {
    // e.target.reset();
    setClickStudent(false);

    const postStudentData = new FormData();
    postStudentData.append("first_name", data.studentFirstName);
    postStudentData.append("middle_name", data.studentMiddleName);
    postStudentData.append("last_name", data.studentLastName);
    postStudentData.append("gender", data.studentGender.value);
    postStudentData.append("DOB", data.studentDOB);
    postStudentData.append("contact_no", data.studentPhone);
    postStudentData.append("address", data.studentAddress);
    postStudentData.append("SRN", data.studentSRN);

    axiosInstance
      .get(
        `/grades/?classname=${data.className.value}&section=${data.sectionName.value}`
      )
      .then(({ data: { results } }) => {
        console.log(results[0].id);
        postStudentData.append("current_grade", results[0].id);
        dispatch(
          ChangeStudentDetail(
            "student",
            id,
            "UPDATE_STUDENT_DETAIL",
            postStudentData
          )
        );
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };

  return data ? (
    <React.Fragment>
      {clickStudent && (
        <div className="modal">
          <div
            className={
              clickStudent ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmitStudentInput)}>
                <span
                  className="close"
                  onClick={() => setClickStudent(!clickStudent)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Student's Info</h2>
                  <div className="content-section">
                    <StudentEditModal
                      register={register}
                      data={data}
                      Controller={Controller}
                      control={control}
                    />
                  </div>
                  <button
                    className="btn-submit"
                    style={{ marginLeft: "40px", marginTop: "20px" }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Section Input End  */}
      <InnerHeader icon={<MdIcons.MdPerson />} name={`Student`} />
      {data && (
        <div className="main-content">
          {/* Student Info  */}
          <div className="heading-section">
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <MdIcons.MdPerson />
                </span>
                <span className="title">Students Personal Info</span>
              </div>
              <div className="content-section">
                <div className="allinputfield">
                  <ViewModal
                    title={"Full Name"}
                    custom={true}
                    value={`${data.first_name} ${
                      data.middle_name ? data.middle_name : ""
                    } ${data.last_name}`}
                  />
                  <ViewModal title={"Gender"} value={data.gender} />
                  <ViewModal title={"Date of Birth"} value={data.DOB} />
                  <ViewModal title={"Phone"} value={data.contact_no} />
                  <ViewModal title={"Address"} value={data.address} />
                  <ViewModal
                    title={"Class"}
                    value={
                      data.current_grade?.class_name
                        ? data.current_grade.class_name
                        : "Class may not Exist"
                    }
                  />
                  <ViewModal
                    title={"Section"}
                    value={
                      data.current_grade?.section
                        ? data.current_grade.section
                        : "Section may not Exist"
                    }
                  />
                  <ViewModal title={"SRN No"} value={data.SRN} />
                </div>
                <button
                  className="btn-edit"
                  style={{ marginTop: 20 }}
                  onClick={() => setClickStudent(!clickStudent)}>
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="heading-section">
            <div className="card-section">
              <div className="heading">
                <span className="title-icon">
                  <MdIcons.MdPerson />
                </span>
                <span className="title">Students Login Info</span>
              </div>
              <div className="content-section">
                <div className="custom-info-show">
                  <div className="content-image-p">
                    <img
                      className="content-image"
                      src={data.user.profile_image}
                      alt="Profile-Image"
                      title="Change Profile Picture"
                    />
                  </div>
                  <div className="information">
                    <ViewModal title={"User Name"} value={data.user.username} />
                    <ViewModal title={"Email"} value={data.user.email} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default StudentFullDetail;
