import './App.css';
import Sidebar from './components/common/SideBar/Sidebar';
import React, { useState } from 'react';
import NavBar from './components/common/NavBar/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import { menuTeacherValue } from './components/common/SideBar/SideMenuValue';
import ProfileImage from './assets/profiles/pas075bct022.jpg';
import Error404 from './components/common/Error404';
import Settings from './components/teacherpanel/user/Settings';
import UserProfile from './components/teacherpanel/user/UserProfile';

const Dashboard = React.lazy(() =>
  import('./components/teacherpanel/Dashboard')
);

const ViewTimetables = React.lazy(() =>
  import('./components/teacherpanel/Timetables')
);

const LectureNotes = React.lazy(() =>
  import('./components/teacherpanel/LectureNotes')
);

const CreateMark = React.lazy(() =>
  import('./components/teacherpanel/reports/CreateMark')
);

const ViewMark = React.lazy(() =>
  import('./components/teacherpanel/reports/ViewMark')
);

const MarkAttendance = React.lazy(() =>
  import('./components/teacherpanel/attendance/MarkAttendance')
);

const ViewAttendance = React.lazy(() =>
  import('./components/teacherpanel/attendance/ViewAttendance')
);

const CreateAssignment = React.lazy(() =>
  import('./components/teacherpanel/assignment/CreateAssignment')
);

const DownloadAssignment = React.lazy(() =>
  import('./components/teacherpanel/assignment/DownloadAssignment')
);

const CreateAnnouncement = React.lazy(() =>
  import('./components/teacherpanel/announcement/CreateAnnouncement')
);

const ViewAnnouncement = React.lazy(() =>
  import('./components/teacherpanel/announcement/ViewAnnouncement')
);

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
        name='teacher'
      />
      <NavBar
        onClickHandler={SideBarHandler}
        username={'Mishan'}
        show={showSideBar}
        profilePhoto={ProfileImage}
        name='teacher'
      />
      <div className={`main-container ${!showSideBar ? 'close' : null}`}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path='/'
              element={<Navigate replace to='/teacher/dashboard' />}
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
            <Route
              path='/assignment/download'
              element={<DownloadAssignment />}
            />
            <Route path='/assignment/create' element={<CreateAssignment />} />
            <Route path='/attendance/view' element={<ViewAttendance />} />
            <Route path='/attendance/mark' element={<MarkAttendance />} />
            <Route
              path='/announcement/create'
              element={<CreateAnnouncement />}
            />
            <Route path='/announcement/view' element={<ViewAnnouncement />} />
            <Route path='/timetables/view' element={<ViewTimetables />} />
            <Route path='/notes' element={<LectureNotes />} />
            <Route path='/reports/create' element={<CreateMark />} />
            <Route path='/reports/view' element={<ViewMark />} />

            {/* UserProfile Option  */}
            <Route path='/settings' element={<Settings />} />
            <Route path='/profiles' element={<UserProfile />} />
          </Routes>
        </React.Suspense>
      </div>
    </React.Fragment>
  );
}

export default TeacherPanel;
