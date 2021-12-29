import React from 'react';
import './Login.css';
import Logo from '../assets/Image_Logo.png';
import CampusLogo from '../assets/campusLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Login() {
  return (
    <div className='main'>
      <div id='logo'>
        <img src={Logo} alt='Logo' />
      </div>
      <div id='forms'>
        <img src={CampusLogo} alt='Logo' className='campus-logo' />
        <div className='information'>
          <p id='welcome-info'>Welcome back</p>
          <p id='login-message'>Login to your account</p>
        </div>
        <form>
          <div className='input-field'>
            <label htmlFor='email'>Email or Username</label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='example@example.com'
            />
          </div>

          <div className='input-field password'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
            />
            <FontAwesomeIcon icon={faEye} className='icons' />
          </div>
          <div className='section'>
            <span className='section__remember'>
              <input type='checkbox' name='remember' id='remember' />
              <label htmlFor='remember'>Remember Me</label>
            </span>
            <a href='/#' className='section__forget'>
              Forget Password?
            </a>
          </div>
          <button className='login__btn'>Login</button>
          <div className='account'>
            <span>
              Don't have an account?{' '}
              <a href='/#' className='account__contact'>
                Contact Us
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
