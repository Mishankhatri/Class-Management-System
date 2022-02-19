import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import Loading from "./../../../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  ChangeSubjectDetail,
  ViewSubjectsFilter,
} from "../../../../redux/actions/subjectactions";
import ChangeSubjectModal from "./ChangeSubjectModal";
import axiosInstance from "../../../../axios";

function SubjectDetail() {
  let { id } = useParams();

  const dispatch = useDispatch();
  //Getting parents value from Redux Store
  const { subjectsId } = useSelector((state) => state.classes);

  //Calling API
  useEffect(() => {
    dispatch(ViewSubjectsFilter(id));
  }, [id]);

  const [clickSubjects, setClickSubjects] = useState(false);

  //React Hook form Initialization fot editing
  const { handleSubmit, control, register } = useForm();

  //On Editing Parents Info
  const onSubmitParentInput = (data, e) => {
    e.target.reset();
    setClickSubjects(false);

    const postSubjectData = new FormData();

    postSubjectData.append("subject_name", data.subjectName);
    postSubjectData.append("subject_code", data.subjectCode);
    postSubjectData.append("description", data.description);

    axiosInstance
      .get(
        `/grades/?classname=${data.subjectClass.value}&section=${data.subjectSection.value}`
      )
      .then(({ data: { results } }) => {
        postSubjectData.append("grade", results[0].id);
        dispatch(ChangeSubjectDetail(id, postSubjectData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return subjectsId ? (
    <React.Fragment>
      {clickSubjects && (
        <div className="modal">
          <div
            className={
              clickSubjects ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmitParentInput)}>
                <span
                  className="close"
                  onClick={() => setClickSubjects(!clickSubjects)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Subjects's Info</h2>
                  <div className="content-section">
                    <ChangeSubjectModal
                      register={register}
                      data={subjectsId}
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
      <InnerHeader icon={<MdIcons.MdPerson />} name={`View Subjects Details`} />
      <div className="main-content">
        <div className="heading-section">
          <div className="card-section">
            <div className="content-section">
              <div className="card-section">
                <h2 className="assignment_id">Subjects Details</h2>
                <div className="content-section assignment_mid">
                  <div className="grid_assignment">
                    <div className="info">
                      <h4>Subject Name</h4>
                      <div className="content">{subjectsId.subject_name}</div>
                    </div>
                    <div className="info">
                      <h4>Subject Code</h4>
                      <div className="content">{subjectsId.subject_code}</div>
                    </div>
                    <div className="info">
                      <h4>Class</h4>
                      <div className="content">
                        {subjectsId.grade.class_name}
                      </div>
                    </div>
                    <div className="info">
                      <h4>Section</h4>
                      <div className="content">{subjectsId.grade.section}</div>
                    </div>
                  </div>

                  <div className="instruction_info">
                    <h4>Description</h4>
                    <div className="content">{subjectsId.description}</div>
                  </div>
                </div>
              </div>
              <button
                className="btn-edit"
                style={{ marginTop: 20 }}
                onClick={() => setClickSubjects(!clickSubjects)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default SubjectDetail;
