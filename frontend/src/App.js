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
          <Route path='/dashboard' element={<Dashboard />} />

          {/* Student  */}
          <Route path='/student/add' element={<AddStudent />} />
          <Route path='/student/view' element={<ViewStudent />} />

          {/* Teacher  */}
          <Route path='/teacher/add' element={<AddTeacher />} />
          <Route path='/teacher/view' element={<ViewTeacher />} />

          {/* Announcements  */}
          <Route path='/announcements' element={<Announcement />} />

          {/* Classes  */}
          <Route path='/classes/addclass' element={<AddClass />} />
          <Route path='/classes/addsection' element={<AddSection />} />
          <Route path='/classes/view' element={<ViewClass />} />

          {/* Subject  */}
          <Route path='/subject/add' element={<AddSubjects />} />
          <Route path='/subject/view' element={<ViewSubjects />} />

          {/* Timetables  */}
          <Route path='/timetables/create' element={<CreateTimetables />} />
          <Route path='/timetables/view' element={<ViewTimetables />} />

          {/* Reports  */}
          <Route path='/reports/attendance' element={<Attendance />} />
          <Route path='/reports/marks' element={<Marks />} />

          {/* Create Id  */}
          <Route path='/createid' element={<CreateID />} />

          {/* UserProfile Option  */}
          <Route path='/settings' element={<Settings />} />
          <Route path='/profiles' element={<UserProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
