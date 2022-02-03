import React, { useState } from 'react';
import './Login.css';
import Logo from '../assets/logo/Image_Logo.png';
import CampusLogo from '../assets/logo/campusLogo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [passwordShown, setPasswordShow] = useState(false);

  const handleSubmit = () => {
    setPasswordShow(!passwordShown);
  };

  return (
    <div className='main'>
      <div id='logo'>
        <img src={Logo} alt='Logo' />
      </div>
      <div id='forms'>
        <div className='image-container'>
          <img src={CampusLogo} alt='Logo' className='campus-logo' />
        </div>
        <div className='form_input'>
          <div className='information'>
            <p id='welcome-info'>Welcome back</p>
            <p id='login-message'>Login to your account</p>
          </div>
          <form>
            <div className='input-field'>
              <label>Email or Username</label>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='example@example.com'
              />
            </div>

            <div className='input-field password'>
              <label>Password</label>
              <input
                type={passwordShown ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='Enter password'
              />
              {passwordShown ? (
                <FaEyeSlash className='icons' onClick={handleSubmit} />
              ) : (
                <FaEye className='icons' onClick={handleSubmit} />
              )}
            </div>
            <div className='section'>
              <span className='section__remember'>
                <input type='checkbox' name='remember' id='remember' />
                <label htmlFor='remember'>Remember Me</label>
              </span>
              <a href='/#' className='links'>
                Forget Password?
              </a>
            </div>
            <button className='login__btn'>Login</button>
            <div className='account'>
              <span>
                Don't have an account?{' '}
                <a href='/#' className='links'>
                  Contact Us
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
