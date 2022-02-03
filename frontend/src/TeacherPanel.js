import './App.css';
import Sidebar from './components/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/common/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import { menuTeacherValue } from './components/common/SideBar/SideMenuValue';
import ProfileImage from './assets/profiles/pas075bct022.jpg';

function TeacherPanel() {
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };
  return (
    <React.Fragment>
      <Sidebar
        show={showSideBar}
        title={'Teacher Panel'}
        menues={menuTeacherValue}
      />
      <NavBar
        onClickHandler={SideBarHandler}
        username={'Mishan'}
        show={showSideBar}
        profilePhoto={ProfileImage}
      />
    </React.Fragment>
  );
}

export default TeacherPanel;