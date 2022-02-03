import './App.css';
import Sidebar from './components/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/common/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import { menuStudentValue } from './components/common/SideBar/SideMenuValue';

function StudentPanel() {
  const [showSideBar, setSideBar] = useState(true);

  const SideBarHandler = () => {
    setSideBar(!showSideBar);
  };
  return (
    <React.Fragment>
      <Sidebar
        show={showSideBar}
        title={'Student Panel'}
        menues={menuStudentValue}
      />
      <NavBar
        onClickHandler={SideBarHandler}
        username={'Paras'}
        show={showSideBar}
      />
    </React.Fragment>
  );
}

export default StudentPanel;
