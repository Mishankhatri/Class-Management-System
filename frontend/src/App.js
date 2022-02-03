import './App.css';
import Sidebar from './components/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/common/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';

const Dashboard = React.lazy(() =>
  import('./components/adminpanel/pages/Dashboard')
);
const CreateAnnouncement = React.lazy(() =>
  import('./components/adminpanel/pages/Announcement/CreateAnnouncement')
);

const ViewAnnouncement = React.lazy(() =>
  import('./components/adminpanel/pages/Announcement/ViewAnnouncement')
);

const AddTeacher = React.lazy(() =>
  import('./components/adminpanel/pages/teacher/AddTeacher')
);
const ViewTeacher = React.lazy(() =>
  import('./components/adminpanel/pages/teacher/ViewTeacher')
);
const AddStudent = React.lazy(() =>
  import('./components/adminpanel/pages/student/AddStudent')
);
const ViewStudent = React.lazy(() =>
  import('./components/adminpanel/pages/student/ViewStudent')
);
const AddClass = React.lazy(() =>
  import('./components/adminpanel/pages/class/AddClass')
);
const AddSection = React.lazy(() =>
  import('./components/adminpanel/pages/class/AddSection')
);
const ViewClass = React.lazy(() =>
  import('./components/adminpanel/pages/class/ViewClass')
);
const AddSubjects = React.lazy(() =>
  import('./components/adminpanel/pages/subject/AddSubjects')
);
const ViewSubjects = React.lazy(() =>
  import('./components/adminpanel/pages/subject/ViewSubjects')
);
const CreateTimetables = React.lazy(() =>
  import('./components/adminpanel/pages/timetables/CreateTimetables')
);
const ViewTimetables = React.lazy(() =>
  import('./components/adminpanel/pages/timetables/ViewTimeTables')
);
const Attendance = React.lazy(() =>
  import('./components/adminpanel/pages/reports/Attendance')
);
const Marks = React.lazy(() =>
  import('./components/adminpanel/pages/reports/Marks')
);
const CreateID = React.lazy(() =>
  import('./components/adminpanel/pages/CreateId')
);
const Settings = React.lazy(() =>
  import('./components/adminpanel/pages/users/Settings')
);
const UserProfile = React.lazy(() =>
  import('./components/adminpanel/pages/users/UserProfile')
);

const StudentFullDetail = React.lazy(() =>
  import('./components/adminpanel/pages/student/StudentFullDetail')
);

const TeacherFullDetail = React.lazy(() =>
  import('./components/adminpanel/pages/teacher/TeacherFullDetail')
);

// const ClassFullDetail = React.lazy(() =>
//   import('./components/adminpanel/pages/classes/ClassFullDetail')
// );

// const SubjectFullDetail = React.lazy(() =>
//   import('./components/adminpanel/pages/subject/SubjectFullDetail')
// );

function App() {
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };

  return (
    <>
      <Sidebar show={showSideBar} />
      <NavBar
        onClickHandler={SideBarHandler}
        username={'PRABIN'}
        show={showSideBar}
      />
      <div className={`main-container ${!showSideBar ? 'close' : null}`}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path='/'
              element={<Navigate replace to='/admin/dashboard' />}
            />
            <Route
              path='/admin'
              element={<Navigate replace to='/admin/dashboard' />}
            />
            <Route
              path='/*'
              element={<div className='main-content'>Not Found</div>}
            />
            {/* Dashboard */}
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/loading' element={<Loading />} />

            {/* Student  */}
            <Route path='/admin/student/add' element={<AddStudent />} />
            <Route path='/admin/student/view' element={<ViewStudent />} />
            <Route
              path='/admin/student/view/:id'
              element={<StudentFullDetail />}
            />

            {/* Teacher  */}
            <Route path='/admin/teacher/add' element={<AddTeacher />} />
            <Route path='/admin/teacher/view' element={<ViewTeacher />} />
            <Route
              path='/admin/teacher/view/:id'
              element={<TeacherFullDetail />}
            />

            {/* Announcements  */}
            <Route
              path='/admin/announcements/create'
              element={<CreateAnnouncement />}
            />
            <Route
              path='/admin/announcements/view'
              element={<ViewAnnouncement />}
            />

            {/* Classes  */}
            <Route path='/admin/classes/addclass' element={<AddClass />} />
            <Route path='/admin/classes/addsection' element={<AddSection />} />
            <Route path='/admin/classes/view' element={<ViewClass />} />
            {/* <Route
              path='/admin/classes/view/:id'
              element={<ClassFullDetail />}
            /> */}

            {/* Subject  */}
            <Route path='/admin/subject/add' element={<AddSubjects />} />
            <Route path='/admin/subject/view' element={<ViewSubjects />} />
            {/* <Route
              path='/admin/subject/view/:id'
              element={<SubjectFullDetail />}
            /> */}

            {/* Timetables  */}
            <Route
              path='/admin/timetables/create'
              element={<CreateTimetables />}
            />
            <Route path='/admin/timetables/view' element={<ViewTimetables />} />

            {/* Reports  */}
            <Route path='/admin/reports/attendance' element={<Attendance />} />
            <Route path='/admin/reports/marks' element={<Marks />} />

            {/* Create Id  */}
            <Route path='/admin/createid' element={<CreateID />} />

            {/* UserProfile Option  */}
            <Route path='/admin/settings' element={<Settings />} />
            <Route path='/admin/profiles' element={<UserProfile />} />
          </Routes>
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
