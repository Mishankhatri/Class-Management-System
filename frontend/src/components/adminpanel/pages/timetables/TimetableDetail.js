import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InnerHeader from "./../../../common/InnerHeader";
import * as MdIcons from "react-icons/md";
import Loading from "./../../../common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  ChangeTimetableDetail,
  GetAdminTimetablesByID,
} from "../../../../redux/actions/admin/adminaction";
import moment from "moment";
import TimetableModal from "./TimetableModal";
import axiosInstance from "../../../../axios";

function TimeTableDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();

  const { timetablesId } = useSelector((state) => state.admins);

  //Calling API
  useEffect(() => {
    dispatch(GetAdminTimetablesByID(id));
  }, [id]);

  const [clickTimetable, setClickTimetable] = useState(false);

  //React Hook form Initialization fot editing
  const { handleSubmit, control, register } = useForm();

  //On Editing Parents Info
  const onSubmitParentInput = (data, e) => {
    e.target.reset();
    setClickTimetable(false);
    const postData = new FormData();
    postData.append("day", data.day.value);
    postData.append("startTime", data.startTime);
    postData.append("endTime", data.endTime);

    axiosInstance
      .get(
        `/grades?classname=${data.class.value}&section=${data.section.value}`
      )
      .then(({ data: { results } }) => {
        axiosInstance
          .get(
            `/AssignTeacherToSubjectsAPI?grade=${results[0].id}&subject=${data.subject.value}&teacher=${data.teacher.value}`
          )
          .then(({ data: { results } }) => {
            postData.append("assigned", results[0].id);
            dispatch(ChangeTimetableDetail(id, postData));
          })
          .catch((error) => {
            if (error.request) console.log(error.request);
            else if (error.response) console.log(error.response);
            else console.log(error);
          });
      })
      .catch((error) => {
        if (error.request) console.log(error.request);
        else if (error.response) console.log(error.response);
        else console.log(error);
      });
  };

  return timetablesId ? (
    <React.Fragment>
      {clickTimetable && (
        <div className="modal">
          <div
            className={
              clickTimetable ? "model-section visible" : "model-section"
            }>
            <div className="modal-content">
              <form onSubmit={handleSubmit(onSubmitParentInput)}>
                <span
                  className="close"
                  onClick={() => setClickTimetable(!clickTimetable)}>
                  &times;
                </span>
                <div className="content">
                  <h2>Edit Timetable's Info</h2>
                  <div className="content-section">
                    <TimetableModal
                      register={register}
                      data={timetablesId}
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
      <InnerHeader
        icon={<MdIcons.MdPerson />}
        name={`View Timetable Details`}
      />
      <div className="main-content">
        <div className="heading-section">
          <div className="card-section">
            <h2 className="assignment_id">Timetables Details</h2>
            <div className="content-section assignment_mid">
              <div className="grid_assignment">
                <div className="info">
                  <h4>Day</h4>
                  <div className="content">{timetablesId.day}</div>
                </div>
                <div className="info">
                  <h4>Subject</h4>
                  <div className="content">{`${timetablesId.assigned.subject.subject_name}:${timetablesId.assigned.subject.subject_code}`}</div>
                </div>
                <div className="info">
                  <h4>Start Time</h4>
                  <div className="content">
                    {moment(timetablesId.startTime, "HH,mm").format("LT")}
                  </div>
                </div>
                <div className="info">
                  <h4>End Time</h4>
                  <div className="content">
                    {moment(timetablesId.endTime, "HH,mm,ss").format("LT")}
                  </div>
                </div>
                <div className="info">
                  <h4>Teacher</h4>
                  <div className="content">
                    {`${timetablesId.assigned.teacher.first_name} 
                    ${
                      timetablesId.assigned.teacher.middle_name
                        ? timetablesId.assigned.teacher.middle_name
                        : ""
                    } 
                ${timetablesId.assigned.teacher.last_name}`}
                  </div>
                </div>
                <div className="info">
                  <h4>Class</h4>
                  <div className="content">{`${timetablesId.assigned.grade?.class_name} : ${timetablesId.assigned.grade?.section}`}</div>
                </div>
              </div>
              <button
                className="btn-edit"
                style={{ marginTop: 20 }}
                onClick={() => setClickTimetable(!clickTimetable)}>
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

export default TimeTableDetails;
