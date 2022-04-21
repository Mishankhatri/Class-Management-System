import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_DETAILS } from "../../../redux/actions/student/studentactions";
import ToggleSwitch from "../../common/InputField/ToggleSwitch";
import TableContainer from "../../common/Table/TableContainer";
import { useForm, Controller } from "react-hook-form";
import { createMessage } from "../../../redux/actions/alertactions";
import axiosInstance from "../../../axios";
import { FaCalendar } from "react-icons/fa";
import InputField from "../../common/InputField/InputField";
import { CreateBulkAttendance } from "../../../redux/actions/teacher/teacheractions";

const AttendanceTableData = ({ attendanceClassDetails, fetchStudents, teacherId}) => {
  const { handleSubmit, control } = useForm();
  const studentsData = useSelector((state) => state.students);
  const dispatch = useDispatch();
  let renderData = [];
  let attendanceMap = {};

  useEffect(() => {
    if (fetchStudents === true) {
      let filter = `grade=${attendanceClassDetails.grade}`;
      dispatch(GET_DETAILS("/student", "GET_STUDENTS_FOR_ATTENDANCE", filter));
    }
  }, [attendanceClassDetails.grade, dispatch, fetchStudents]);

  if (
    studentsData.isLoading === false &&
    studentsData.hasOwnProperty("students_for_attendance")
  ) {
    const createDataToRender = (fetchedData) => {
      let cleanedData = [];
      let initialAttendanceMap = {};
      fetchedData.forEach((elem, i) => {
        let tempObj = {};
        tempObj["row_id"] = i;
        tempObj["student_id"] = elem.id;
        tempObj["SRN"] = elem.SRN;
        tempObj["first_name"] = elem.first_name;
        tempObj["last_name"] = elem.last_name;
        initialAttendanceMap[elem.id] = "ABSENT";
        cleanedData.push(tempObj);
      });
      attendanceMap = { ...initialAttendanceMap };
      return [cleanedData, attendanceMap];
    };
    [renderData, attendanceMap] = createDataToRender(
      studentsData?.students_for_attendance.results
    );
  }
  const handleChange = (obtainedId, checked) => {
    attendanceMap[obtainedId] = checked === true ? "PRESENT" : "ABSENT";
  };
  const createArrayFromObject =(data_obj)=>{
    let returnArray  = []
    for (let [ k,v] of Object.entries(data_obj)){
      let individualArr = []
      individualArr.push(k);
      individualArr.push(v)
      returnArray.push(individualArr)
    }
    return returnArray
  } 
  const onSubmitForm = (data, e) => {
    if (!data.date) {
      dispatch(createMessage({ dateRequired: "Date field is required" }));
    }
    else{
      // const postDataSample = {
      // "date": "2024-04-02",
      // "teacher": 2,
      // "subject": 2,
      // "grade": 1,
      // "students": [
      // [3, "ABSENT"],
      // [5, "PRESENT"]
      // ]
      // }
      let postObj = {}
      postObj["date"] = data.date
      postObj["teacher"] = teacherId
      postObj["subject"] = attendanceClassDetails.subject
      postObj["grade"] = attendanceClassDetails.grade
      let studentsAttandanceArray = createArrayFromObject(attendanceMap)
      postObj["students"] = studentsAttandanceArray
      Object.freeze(postObj)
      const postData = JSON.stringify(postObj);
      dispatch(CreateBulkAttendance(postData))
    }
  };
  const columns =[
      {
        Header: "SRN No",
        accessor: "SRN",
        SearchAble: false,
      },
      {
        Header: "First Name",
        accessor: "first_name",
        SearchAble: false,
      },
      {
        Header: "Second Name",
        accessor: "last_name",
        SearchAble: false,
      },

      {
        Header: "Action",
        SearchAble: false,
        Cell: ({ row }) => {
          return (
            <>
              <ToggleSwitch
                id={row.original.student_id}
                name={"attendance"}
                onChangeHandler={handleChange}
                optionLabels={["P", "A"]}
              />
            </>
          );
        },
      },
    ];

  return (
    <>
      <div style={{ margin: "20px 30px 50px" }}>
        <TableContainer columns={columns} data={renderData} />
      </div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Controller
          name={"date"}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputField
              title={"Date".toUpperCase()}
              input={"date"}
              icon={<FaCalendar className="mid-icon" />}
              name={"date"}
              onChangeHandler={field.onChange}
              isRequired={true}
            />
          )}
        />
        <button
          className="morebutton btn"
          style={{ margin: "20px 30px 10px" }}
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default AttendanceTableData;
