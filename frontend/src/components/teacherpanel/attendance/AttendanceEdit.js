import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdAddTask } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  AttendanceById,
  ChangeStudentAttendance,
} from "../../../redux/actions/teacher/teacheractions";
import InnerHeader from "../../common/InnerHeader";
import SelectInputField from "../../common/InputField/SelectInputField";
import Loading from "../../common/Loading";
import ViewModal from "../../common/Modal/ViewModal";

function AttendanceModal() {
  const { handleSubmit, control } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attendanceById } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(AttendanceById(id));
  }, []);

  const submitParentInfo = (data) => {
    const attendanceData = new FormData();

    attendanceData.append("grade_id", attendanceById.grade.id);
    attendanceData.append("date", attendanceById.date);
    attendanceData.append("attendance_status", data.attendance.value);
    attendanceData.append("student_id", attendanceById.student.id);
    attendanceData.append("subject_id", attendanceById.subject.id);
    attendanceData.append("teacher_id", attendanceById.teacher.id);

    dispatch(ChangeStudentAttendance(attendanceData, id));
    navigate(`/teacher/attendance/view`);
  };

  return attendanceById ? (
    <>
      <InnerHeader icon={<MdAddTask />} name={`Edit Attendance`} />
      <div className="main-content">
        <div className="card-section">
          <h2 className="assignment_id">{`Attendance "${attendanceById.student.first_name} ${attendanceById.student.middle_name} ${attendanceById.student.last_name}"`}</h2>
          <div className="content-section">
            <form onSubmit={handleSubmit(submitParentInfo)}>
              <div className="allinputfield">
                <ViewModal
                  title={"Name"}
                  name={"studentName"}
                  value={`${attendanceById.student.first_name} ${attendanceById.student.middle_name} ${attendanceById.student.last_name}`}
                />
                <ViewModal
                  title={"Class"}
                  name={"className"}
                  value={`${attendanceById.grade.class_name}:${attendanceById.grade.section}`}
                />
                <ViewModal
                  title={"Date"}
                  name={"date"}
                  value={attendanceById.date}
                />
                <ViewModal
                  title={"Subject"}
                  name={"subject"}
                  value={`${attendanceById.subject.subject_name}: ${attendanceById.subject.subject_code}`}
                />
                <Controller
                  name="attendance"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectInputField
                      title={"Attendance"}
                      name="attendance"
                      onChangeHandler={field.onChange}
                      options={[
                        { label: "PRESENT", value: "PRESENT" },
                        { label: "ABSENT", value: "ABSENT" },
                      ]}
                    />
                  )}
                />
              </div>
              <button className="morebutton btn btn-custom-selection">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default AttendanceModal;
