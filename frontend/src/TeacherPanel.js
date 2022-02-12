import "./App.css";
import Sidebar from "./components/common/SideBar/Sidebar";
import React, { useState } from "react";
import NavBar from "./components/common/NavBar/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/common/Loading";
import { menuTeacherValue } from "./components/common/SideBar/SideMenuValue";
import Error404 from "./components/common/Error404";
import Settings from "./components/teacherpanel/user/Settings";
import UserProfile from "./components/teacherpanel/user/UserProfile";
import { useSelector } from "react-redux";

const Dashboard = React.lazy(() =>
  import("./components/teacherpanel/Dashboard")
);

const ViewTimetables = React.lazy(() =>
  import("./components/teacherpanel/Timetables")
);

const UploadLectureNotes = React.lazy(() =>
  import("./components/teacherpanel/LectureNote/UploadLectureNotes")
);

const ViewLectureNotes = React.lazy(() =>
  import("./components/teacherpanel/LectureNote/ViewLectureNotes.js")
);

const MarkAttendance = React.lazy(() =>
  import("./components/teacherpanel/attendance/MarkAttendance")
);

const ViewAttendance = React.lazy(() =>
  import("./components/teacherpanel/attendance/ViewAttendance")
);

const CreateAssignment = React.lazy(() =>
  import("./components/teacherpanel/assignment/CreateAssignment")
);

const DownloadAssignment = React.lazy(() =>
  import("./components/teacherpanel/assignment/DownloadAssignment")
);

const CreateAnnouncement = React.lazy(() =>
  import("./components/teacherpanel/announcement/CreateAnnouncement")
);

const ViewAnnouncement = React.lazy(() =>
  import("./components/teacherpanel/announcement/ViewAnnouncement")
);

const AssignmentDetail = React.lazy(() =>
  import("./components/teacherpanel/assignment/AssignmentDetail")
);

function TeacherPanel() {
  const user = useSelector((state) => state.auth.user);
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };
  return (
    <React.Fragment>
      <Sidebar
        show={showSideBar}
        title={"Teacher Panel"}
        menues={menuTeacherValue}
        name="teacher"
      />
      <NavBar
        onClickHandler={SideBarHandler}
        username={user.username}
        show={showSideBar}
        image={user.profile_image}
        name="teacher"
      />
      <div className={`main-container ${!showSideBar ? "close" : null}`}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/teacher/dashboard" />}
            />
            <Route
              path="/*"
              element={
                <div className="main-content">
                  <Error404 />
                </div>
              }
            />
            <Route path="teacher/dashboard" element={<Dashboard />} />
            <Route
              path="teacher/notes/upload"
              element={<UploadLectureNotes />}
            />
            <Route path="teacher/notes/view" element={<ViewLectureNotes />} />
            <Route
              path="teacher/assignment/view"
              element={<DownloadAssignment />}
            />
            <Route
              path="teacher/assignment/view/id=:id"
              element={<AssignmentDetail />}
            />
            <Route
              path="teacher/assignment/create"
              element={<CreateAssignment />}
            />
            <Route
              path="teacher/attendance/view"
              element={<ViewAttendance />}
            />
            <Route
              path="teacher/attendance/mark"
              element={<MarkAttendance />}
            />
            <Route
              path="teacher/announcement/create"
              element={<CreateAnnouncement />}
            />
            <Route
              path="teacher/announcement/view"
              element={<ViewAnnouncement />}
            />
            <Route
              path="teacher/timetables/view"
              element={<ViewTimetables />}
            />

            {/* UserProfile Option  */}
            <Route path="teacher/settings" element={<Settings />} />
            <Route path="teacher/profiles" element={<UserProfile />} />
          </Routes>
        </React.Suspense>
      </div>
    </React.Fragment>
  );
}

export default TeacherPanel;
