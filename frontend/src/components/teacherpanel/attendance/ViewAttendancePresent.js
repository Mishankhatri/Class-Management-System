import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { GetPaginatedFilterPromise } from "../../GetOptions";

function ViewAttendancePresent({ gradeId, subjectId }) {
  const [attendance, setAttendance] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const GetOptions = async () => {
      try {
        const got = await GetPaginatedFilterPromise(
          "attendance",
          `teacher=${user.username}&grade=${gradeId}&subject=${subjectId}`
        );
        let arrayOfIndividual = [];
        let totalAbsent, totalPresent;
        for (let i = 0; i < got.length; i++) {}
        setAttendance(got);
      } catch (error) {
        console.log(error);
      }
    };
    GetOptions();
  }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default ViewAttendancePresent;
