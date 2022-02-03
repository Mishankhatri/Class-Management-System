import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './forms/Login';
import './forms/Table.css';
import TeacherPanel from './TeacherPanel';
import StudentPanel from './StudentPanel';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<App />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/admin/*'} element={<App />} />
      <Route path={'/teacher/*'} element={<TeacherPanel />} />
      <Route path={'/student/*'} element={<StudentPanel />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
