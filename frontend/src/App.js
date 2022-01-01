import './App.css';
import Sidebar from './components/adminpanel/common/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/adminpanel/common/NavBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/adminpanel/pages/Dashboard';
import Teacher from './components/adminpanel/pages/Teacher';
import Announcement from './components/adminpanel/pages/Announcement';
import Student from './components/adminpanel/pages/Student';

function App() {
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };

  return (
    <>
      <div>
        <NavBar onClickHandler={SideBarHandler} />
        <Sidebar show={showSideBar} />
        <div className={`main-container ${!showSideBar ? 'close' : null}`}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/announcements' element={<Announcement />} />
            <Route path='/teacher' element={<Teacher />} />
            <Route path='/student' element={<Student />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
