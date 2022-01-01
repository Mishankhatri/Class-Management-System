import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import Login from './components/forms/Login';

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <Login /> */}
  </BrowserRouter>,
  document.getElementById('root')
);
