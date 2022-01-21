import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './forms/Login';
import './forms/Table.css';
import Loading from './components/common/Loading';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path='/loading' element={<Loading />} />
      <Route path={'/*'} element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
