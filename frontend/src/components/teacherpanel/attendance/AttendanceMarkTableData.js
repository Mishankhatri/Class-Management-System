import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_DETAILS } from "../../../redux/actions/student/studentactions";
import ToggleSwitch from "../../common/InputField/ToggleSwitch";
import TableContainer from "../../common/Table/TableContainerAttendance";
import { useForm } from "react-hook-form";

import { CreateBulkAttendance } from "../../../redux/actions/teacher/teacheractions";
import moment from "moment";
import { GetPaginatedFilterPromise } from "../../GetOptions";

const AttendanceTableData = ({
  attendanceClassDetails,
  fetchStudents,
  teacherId,
}) => {
  const { handleSubmit } = useForm();
  const studentsData = useSelector((state) => state.students);
  const dispatch = useDispatch();
  let renderData = [];
  let attendanceMap = {};
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (fetchStudents === true) {
      let filter = `grade=${attendanceClassDetails.grade}`;
      dispatch(GET_DETAILS("/student", "GET_STUDENTS_FOR_ATTENDANCE", filter));

      const GetOptions = async () => {
        const got = await GetPaginatedFilterPromise(
          "student",
          `grade=${attendanceClassDetails.grade}&ordering=first_name`
        );
        setAttendance(got);
      };

      GetOptions();
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
    [renderData, attendanceMap] = createDataToRender(attendance);
  }
  const handleChange = (obtainedId, checked) => {
    attendanceMap[obtainedId] = checked === true ? "PRESENT" : "ABSENT";
  };
  const createArrayFromObject = (data_obj) => {
    let returnArray = [];
    for (let [k, v] of Object.entries(data_obj)) {
      let individualArr = [];
      individualArr.push(k);
      individualArr.push(v);
      returnArray.push(individualArr);
    }
    return returnArray;
  };
  const onSubmitForm = (data, e) => {
    const todayDate = moment().format("YYYY-MM-DD");
    let postObj = {};
    postObj["date"] = todayDate;
    postObj["teacher"] = teacherId;
    postObj["subject"] = attendanceClassDetails.subject;
    postObj["grade"] = attendanceClassDetails.grade;
    let studentsAttandanceArray = createArrayFromObject(attendanceMap);
    postObj["students"] = studentsAttandanceArray;
    Object.freeze(postObj);
    const postData = JSON.stringify(postObj);
    dispatch(CreateBulkAttendance(postData));
  };
  const columns = [
    {
      Header: "SRN No",
      accessor: "SRN",
    },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Second Name",
      accessor: "last_name",
    },

    {
      Header: "Action",
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
        {/* <Controller
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
        /> */}
        <button
          className="morebutton btn"
          style={{ margin: "20px 30px 10px" }}
          type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default AttendanceTableData;
