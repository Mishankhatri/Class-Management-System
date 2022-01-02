import React, { useState } from 'react';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import ProfileImage from '../../assets/profiles/PrabinGautam.jpg';
import { Link, Navigate, useNavigationType } from 'react-router-dom';
import './NavBar.css';
import Login from '../../forms/Login';

function NavBar({ onClickHandler, username }) {
  const [showDropDown, setDropDown] = useState(false);
  const navigation = useNavigationType();
  return (
    <>
      <div className='navigation'>
        <div className='navbar'>
          {/* 
        NavBar consists of two section: Left section and right section

        Left section of Navbar like title, and btn 
        1) title => consists title of current logged in like admin panel
        2) backbtn => consists icon, to show or hide sidebar
      */}

          <div className='left-section'>
            <div className='title'>
              <Link to={'/'} style={{ textDecoration: 'none' }}>
                Admin Panel
              </Link>
            </div>
            <div className={'backbtn'}>
              <GiIcons.GiHamburgerMenu onClick={onClickHandler} />
            </div>
          </div>

          {/* 
        Right section of Navbar like Notification icon, profile picture and name 
        1) notification => notification symbol for red sign and bell icon
        2) img => Profile image of current logged in user
        3) user-name => consists current logged in names and arrow button
      */}

          <div className='right-section'>
            <div className='notification'>
              <div className='notification__symbol'></div>
              <BsIcons.BsBell className='notification__icon' />
            </div>
            <img
              src={ProfileImage}
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
        <div className={showDropDown ? 'menu active' : 'menu inactive'}>
          <ul>
            <li>
              <Link to='settings' className='menu-link'>
                <RiIcons.RiSettings5Fill className='menu-icon' />
                Settings
              </Link>
            </li>
            <li>
              <Link to='profiles' className='menu-link'>
                <BiIcons.BiUser className='menu-icon' />
                User Profile
              </Link>
            </li>
            <li>
              <Link to='logout' className='menu-link'>
                <BiIcons.BiLogOut className='menu-icon' />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavBar;
