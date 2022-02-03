import './App.css';
import Sidebar from './components/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/common/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import { menuStudentValue } from './components/common/SideBar/SideMenuValue';
import ProfileImage from './assets/profiles/pas075bct028.jpg';
import Error404 from './components/common/Error404';
import Settings from './components/studentpanel/users/Settings';
import UserProfile from './components/studentpanel/users/Profile';

const UploadAssignment = React.lazy(() =>
  import('./components/studentpanel/Assignment/UploadAssignment')
);

const ViewAssignments = React.lazy(() =>
  import('./components/studentpanel/Assignment/ViewAssignments')
);

const ViewFinalResults = React.lazy(() =>
  import('./components/studentpanel/Examination/ViewFinalResults')
);

const ViewInternalMark = React.lazy(() =>
  import('./components/studentpanel/Examination/ViewInternalMark')
);

const Announcement = React.lazy(() =>
  import('./components/studentpanel/Announcement')
);

const Dashboard = React.lazy(() =>
  import('./components/studentpanel/Dashboard')
);

const ViewAttendance = React.lazy(() =>
  import('./components/studentpanel/ViewAttendance')
);

const ViewTimetables = React.lazy(() =>
  import('./components/studentpanel/ViewTimetables')
);

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
        name='student'
      />
      <NavBar
        onClickHandler={SideBarHandler}
        username={'Paras'}
        show={showSideBar}
        profilePhoto={ProfileImage}
        name='student'
      />
      <div className={`main-container ${!showSideBar ? 'close' : null}`}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path='/'
              element={<Navigate replace to='/student/dashboard' />}
            />
            <Route
              path='/*'
              element={
                <div className='main-content'>
                  <Error404 />
                </div>
              }
            />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/reports/attendance' element={<ViewAttendance />} />
            <Route path='/timetables/view' element={<ViewTimetables />} />
            <Route path='/announcements' element={<Announcement />} />
            <Route path='/assignment/upload' element={<UploadAssignment />} />
            <Route path='/assignment/view' element={<ViewAssignments />} />
            <Route
              path='/examination/internal'
              element={<ViewInternalMark />}
            />
            <Route path='/examination/final' element={<ViewFinalResults />} />

            {/* UserProfile Option  */}
            <Route path='/settings' element={<Settings />} />
            <Route path='/profiles' element={<UserProfile />} />
          </Routes>
        </React.Suspense>
      </div>
    </React.Fragment>
  );
}

export default StudentPanel;
