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

function TimeTableDetails() {
  let { id } = useParams();
  const dispatch = useDispatch();

  //Getting parents value from Redux Store
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

    console.log(data);
    const postSubjectData = new FormData();

    postSubjectData.append("day", data.day.value);
    postSubjectData.append("startTime", data.startTime);
    postSubjectData.append("endTime", data.endTime);
    // dispatch(ChangeTimetableDetail(id, postSubjectData));

    // axiosInstance
    //   .get(
    //     `/grades/?classname=${data.subjectClass.value}&section=${data.subjectSection.value}`
    //   )
    //   .then(({ data: { results } }) => {
    //     postSubjectData.append("grade_id", results[0].id);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
                  <div className="content">{timetablesId.assigned.subject}</div>
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
                  <div className="content">{timetablesId.assigned.teacher}</div>
                </div>
                <div className="info">
                  <h4>Class</h4>
                  <div className="content">{timetablesId.assigned.grade}</div>
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
