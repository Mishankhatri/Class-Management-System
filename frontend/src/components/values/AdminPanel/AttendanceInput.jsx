import * as FaIcons from "react-icons/fa";

const marksValue = [
  {
    title: "Class",
    input: "dropdown",
    icon: <FaIcons.FaBook className="mid-icon" />,
    isRequired: true,
    name: "studentClass",
    isCustomField: true,
    placeholder: "Choose Class",
    options: [
      { value: "12", label: "12" },
      { value: "11", label: "11" },
      { value: "10", label: "10" },
      { value: "9", label: "9" },
      { value: "8", label: "8" },
      { value: "7", label: "7" },
      { value: "6", label: "6" },
      { value: "5", label: "5" },
    ],
  },
  {
    title: "Section",
    input: "dropdown",
    icon: <FaIcons.FaCode className="mid-icon" />,
    isRequired: true,
    name: "studentSection",
    isCustomField: true,
    placeholder: "Choose Section",
    options: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
    ],
  },
  {
    title: "Student Name",
    input: "text",
    icon: <FaIcons.FaUser className="mid-icon" />,
    isRequired: true,
    name: "studentName",
    isCustomField: true,
    placeholder: "Choose Date",
  },
  {
    title: "Remarks",
    input: "dropdown",
    icon: <FaIcons.FaList className="mid-icon" />,
    isRequired: true,
    name: "studentRemarks",
    isCustomField: true,
    placeholder: "Choose Remarks",
    options: [
      { value: "Passed", label: "Passed" },
      { value: "Failed", label: "Failed" },
    ],
  },
];

const attendanceDetail = [
  {
    name: "Prabin Gautam",
    roll: "29",
    class: "12 A",
    attendance: "Present",
    subject: "Subject1",
    "P/A": "46/21",
    date: "2022-02-01",
  },
  {
    name: "Prabin Gautam",
    roll: "29",
    class: "12 A",
    attendance: "Absent",
    subject: "Subject2",
    "P/A": "46/21",
    date: "2016-05-06",
  },
  {
    name: "Prabin Gautam",
    roll: "29",
    class: "12 A",
    attendance: "Present",
    subject: "Subject3",
    "P/A": "46/21",
    date: "2015-05-06",
  },
  {
    name: "Prabin Gautam",
    roll: "29",
    class: "12 A",
    attendance: "Present",
    subject: "Subject1",
    "P/A": "46/21",
    date: "2014-01-01",
  },
  {
    name: "Prabin Gautam",
    roll: "29",
    class: "12 A",
    attendance: "Absent",
    subject: "Subject1",
    "P/A": "46/21",
    date: "2014-05-06",
  },
];

export { marksValue, attendanceDetail };
