import React, { useState } from 'react';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import NavBarNotification from './NavBarNotification';

function NavBar({ onClickHandler, username, show, profilePhoto }) {
  const [showDropDown, setDropDown] = useState(false);
  const [showDropDownNotification, setDropDownNotification] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={show ? 'navigation' : 'navigation close'}>
        <div className='navbar'>
          <div className='left-section'>
            <button
              className={show ? 'backbtn active' : 'backbtn'}
              onClick={onClickHandler}>
              <FaIcons.FaAlignLeft className='btn-outline-info' />
            </button>
          </div>

          <div className='right-section'>
            <div
              className='notification'
              onClick={() =>
                setDropDownNotification(!showDropDownNotification)
              }>
              <div className='notification__symbol'></div>
              <BsIcons.BsBell className='notification__icon' />
            </div>
            <img
              src={profilePhoto}
              alt='profile-image'
              className='profile-image'
            />
            <div className='user-name'>
              {username}
              <RiIcons.RiArrowDownSFill
                className='arrow'
                onClick={() => setDropDown(!showDropDown)}
              />
            </div>
          </div>
        </div>
        <NavBarNotification showDropDown={showDropDownNotification} />
        <div className={showDropDown ? 'menu active' : 'menu inactive'}>
          <ul className='profile-options'>
            <li>
              <a href='/admin/settings' className='menu-link'>
                <RiIcons.RiSettings5Fill className='menu-icon' />
                Settings
              </a>
            </li>
            <li>
              <a href='/admin/profiles' className='menu-link'>
                <BiIcons.BiUser className='menu-icon' />
                User Profile
              </a>
            </li>
            <li>
              <a className='menu-link' onClick={() => navigate('/login')}>
                <BiIcons.BiLogOut className='menu-icon' />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
