import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import ProfileImage from '../../assets/profiles/PrabinGautam.jpg';
import { Link } from 'react-router-dom';

function NavBar({ onClickHandler }) {
  return (
    <div className='navbar'>
      <div className='left-section'>
        {/* <div className='logo'>A</div> */}
        <div className='title'>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            Admin Panel
          </Link>
        </div>
        <div className={'backbtn'}>
          <GiIcons.GiHamburgerMenu onClick={onClickHandler} />
        </div>
      </div>

      <div className='right-section'>
        <div className='notification'>
          <div className='notification__symbol'></div>
          <BsIcons.BsBell className='notification__icon' />
        </div>
        <img src={ProfileImage} alt='profile-image' className='profile-image' />
        <div className='user-name'>
          PRABIN
          <RiIcons.RiArrowDownSFill className='arrow' />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
