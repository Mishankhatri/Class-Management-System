import React, { useState, useEffect } from 'react';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import ProfileImage from '../../../../assets/profiles/pas075bct029.jpg';
import BlankProfile from '../../../../assets/profiles/blank-profile.jpg';
import './UserProfile.css';

function UserProfile() {
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState('');
  const [click, setClick] = useState(false);

  //To show preview of image
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviosImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setUploadedImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  return (
    <React.Fragment>
      <div className='modal'>
        <div
          className={
            click
              ? 'model-section upload-image visible'
              : 'model-section upload-image'
          }
          //This for selecting outside modal
          onClick={(event) => {
            if (event.target.className.includes('model-section')) {
              setClick(false);
            }
          }}>
          <div className='modal-content'>
            <form onSubmit={onSubmit}>
              <span className='close' onClick={() => setClick(!click)}>
                &times;
              </span>
              <div className='content'>
                <h2>Choose Your Photo</h2>
                <div className='imageholder'>
                  <img src={previousImage} alt='Profile-Picture' />
                </div>
                <label htmlFor='file-upload'>
                  <span> Upload Image</span>
                </label>
                <input
                  type='file'
                  name='uploadImage'
                  id='file-upload'
                  accept='image/*'
                  onChange={imageHandler}
                />
                <button className='btn-submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InnerHeader icon={<MdIcons.MdPersonAdd />} name={'UserProfile'} />
      <div className='main-content main-section'>
        <div className='profile'>
          <div className='image' onClick={() => setClick(!click)}>
            <img
              src={ProfileImage}
              alt='Profile-Image'
              title='Change Profile Picture'
            />
            <MdIcons.MdPhotoCamera className='camera' />
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
