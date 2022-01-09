import './App.css';
import Sidebar from './components/adminpanel/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/adminpanel/common/NavBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/adminpanel/pages/Dashboard';
import Announcement from './components/adminpanel/pages/Announcement';
import AddTeacher from './components/adminpanel/pages/teacher/AddTeacher';
import ViewTeacher from './components/adminpanel/pages/teacher/ViewTeacher';
import AddStudent from './components/adminpanel/pages/student/AddStudent';
import ViewStudent from './components/adminpanel/pages/student/ViewStudent';
import AddClass from './components/adminpanel/pages/class/AddClass';
import AddSection from './components/adminpanel/pages/class/AddSection';
import ViewClass from './components/adminpanel/pages/class/ViewClass';
import AddSubjects from './components/adminpanel/pages/subject/AddSubjects';
import ViewSubjects from './components/adminpanel/pages/subject/ViewSubjects';
import CreateTimetables from './components/adminpanel/pages/timetables/CreateTimetables';
import ViewTimetables from './components/adminpanel/pages/timetables/ViewTimeTables';
import Attendance from './components/adminpanel/pages/reports/Attendance';
import Marks from './components/adminpanel/pages/reports/Marks';
import CreateID from './components/adminpanel/pages/CreateId';
import Settings from './components/adminpanel/pages/users/Settings';
import UserProfile from './components/adminpanel/pages/users/UserProfile';

function App() {
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };

  return (
    <>
      <NavBar
        onClickHandler={SideBarHandler}
        username={'PRABIN'}
        show={showSideBar}
      />
      <Sidebar show={showSideBar} />
      <div className={`main-container ${!showSideBar ? 'close' : null}`}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route
            path='/*'
            element={<div className='main-content'>Not Found</div>}
          />
          {/* Dashboard */}
          <Route path='/admin/dashboard' element={<Dashboard />} />

          {/* Student  */}
          <Route path='/admin/student/add' element={<AddStudent />} />
          <Route path='/admin/student/view' element={<ViewStudent />} />

          {/* Teacher  */}
          <Route path='/admin/teacher/add' element={<AddTeacher />} />
          <Route path='/admin/teacher/view' element={<ViewTeacher />} />

          {/* Announcements  */}
          <Route path='/admin/announcements' element={<Announcement />} />

          {/* Classes  */}
          <Route path='/admin/classes/addclass' element={<AddClass />} />
          <Route path='/admin/classes/addsection' element={<AddSection />} />
          <Route path='/admin/classes/view' element={<ViewClass />} />

          {/* Subject  */}
          <Route path='/admin/subject/add' element={<AddSubjects />} />
          <Route path='/admin/subject/view' element={<ViewSubjects />} />

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
      </div>
    </>
  );
}

export default App;
