import React, { useState, useEffect } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import ProfileImage from '../../../../assets/profiles/pas075bct029.jpg';
import BlankProfile from '../../../../assets/profiles/blank-profile.jpg';
import './UserProfile.css';
import ChangePhoto from '../../../common/Modal/ChangePhoto';

function UserProfile() {
  const [click, setClick] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  return (
    <React.Fragment>
      <ChangePhoto
        click={click}
        setClick={setClick}
        onSubmit={onSubmit}
        setPreviosImage={setPreviosImage}
        setUploadedImage={setUploadedImage}
        previousImage={previousImage}
      />
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'UserProfile'} />
      <div className='main-content main-section'>
        <div className='profile'>
          <div className='image'>
            <img
              src={ProfileImage}
              alt='Profile-Image'
              title='Change Profile Picture'
              onClick={() => setClick(!click)}
            />
            <MdIcons.MdPhotoCamera
              className='camera'
              onClick={() => setClick(!click)}
            />
          </div>

          <div className='profile-name'>Prabin Gautam</div>

          <div className='role'>Adminstrator</div>
        </div>
        <div className='profile-info'>
          <div className='profile-info__inner'>
            <div className='title'>Full Name</div>
            <div className='title__value'>Prabin Gautam</div>
          </div>
          <div className='profile-info__inner'>
            <div className='title'>Email</div>
            <div className='title__value'>prabeen122@gmail.com</div>
          </div>
          <div className='profile-info__inner'>
            <div className='title'>User Name</div>
            <div className='title__value'>PrabinGautam</div>
          </div>
          <div className='profile-info__inner'>
            <div className='title'>Date of Birth</div>
            <div className='title__value'>2058-03-09</div>
          </div>
          <div className='profile-info__inner'>
            <div className='title'>Phone</div>
            <div className='title__value'>9846915836</div>
            {/* <div>Update Phone </div> */}
          </div>
          <div className='profile-info__inner'>
            <div className='title'>Address</div>
            <div className='title__value'>Lamachaur-16</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserProfile;
