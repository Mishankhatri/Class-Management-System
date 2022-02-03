import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InnerHeader from './../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import axios from 'axios';
import ProfileImage from '../../../assets/profiles/pas075bct028.jpg';
import BlankProfile from '../../../assets/profiles/blank-profile.jpg';

import Loading from './../../common/Loading';
import ChangeInput from '../../common/Modal/ChangeInput';
import {
  getParentInfoValues,
  getStudentInputValues,
  getAcademicValues,
} from './../../values/AdminPanel/StudentInputField';
import ViewModal from '../../common/Modal/ViewModal';
import ChangePhoto from '../../common/Modal/ChangePhoto';

function UserProfile() {
  let id = 3;
  const [data, setData] = useState([]);

  useEffect(() => {
    doFetch();
  }, []);

  const doFetch = async () => {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    setData(data);
  };

  const studentDetail = data.find((value) => value.id === Number(id));

  if (studentDetail != undefined) {
    studentDetail.gender = 'Male';
    studentDetail.DOB = '2058-03-09';
  }

  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [clickParent, setClickParent] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState('');

  const onSubmitStudent = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  const onSubmitParent = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick1(false);
    console.log(uploadedImage);
  };

  const onSubmitParentInput = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickParent(false);
  };

  return studentDetail ? (
    <React.Fragment>
      {/* Modal Section Image Start */}
      {click && (
        <ChangePhoto
          click={click}
          setClick={setClick}
          onSubmit={onSubmitStudent}
          setPreviosImage={setPreviosImage}
          setUploadedImage={setUploadedImage}
          previousImage={previousImage}
        />
      )}
      {click1 && (
        <ChangePhoto
          click={click1}
          setClick={setClick1}
          onSubmit={onSubmitParent}
          setPreviosImage={setPreviosImage}
          setUploadedImage={setUploadedImage}
          previousImage={previousImage}
        />
      )}
      {/* Modal Section Image  End */}

      {clickParent && (
        <ChangeInput
          onSubmit={onSubmitParentInput}
          valueArray={getParentInfoValues()}
          click={clickParent}
          setClick={setClickParent}
          heading={"View Student's Parent Info"}
        />
      )}

      {/* Modal Section Input End  */}
      <InnerHeader
        icon={<MdIcons.MdPerson />}
        name={`Student: ${studentDetail.name}`}
      />
      <div className='main-content'>
        {/* Student Info  */}
        <div className='heading-section'>
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <MdIcons.MdPerson />
              </span>
              <span className='title'>Students Personal Info</span>
              {/*Custom  */}
            </div>
            <div className='content-section'>
              <div className='custom-info-show'>
                <div className='profile-image'>
                  <div className='image'>
                    <img
                      // src={studentDetail?.image}
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
                </div>
                <div className='information'>
                  <div className='information__info'>
                    <ViewModal title={'Full Name'} value={studentDetail.name} />
                    <ViewModal title={'Gender'} value={studentDetail.gender} />
                    <ViewModal
                      title={'Date of Birth'}
                      value={studentDetail.DOB}
                    />
                    <ViewModal title={'Phone'} value={studentDetail.phone} />
                    <ViewModal title={'Email'} value={studentDetail.email} />
                    <ViewModal
                      title={'Address'}
                      value={studentDetail.address.city}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Info  */}
        <div className='heading-section'>
          <div className='card-section'>
            <div className='heading'>
              <span className='title-icon'>
                <MdIcons.MdPerson />
              </span>
              <span className='title'>Students Parents Info</span>
              {/*Custom  */}
            </div>
            <div className='content-section'>
              <div className='custom-info-show'>
                <div className='profile-image'>
                  <div className='image'>
                    <img
                      src={BlankProfile}
                      alt='Profile-Image'
                      title='Change Profile Picture'
                      onClick={() => setClick1(!click1)}
                    />
                    <MdIcons.MdPhotoCamera
                      className='camera'
                      onClick={() => setClick1(!click1)}
                    />
                  </div>
                </div>
                <div className='information'>
                  <div className='information__info'>
                    <ViewModal
                      title={'Father Name'}
                      value={studentDetail.name}
                    />
                    <ViewModal
                      title={'Mother Name'}
                      value={studentDetail.name}
                    />
                    <ViewModal title={'Phone'} value={studentDetail.phone} />
                    <ViewModal
                      title={'Alternate Phone'}
                      value={studentDetail.phone}
                    />
                    <ViewModal title={'Email'} value={studentDetail.email} />
                    <ViewModal
                      title={'Address'}
                      value={studentDetail.address.city}
                    />
                    <ViewModal
                      title={'State'}
                      value={studentDetail.address.street}
                    />
                  </div>
                  <button
                    className='btn-edit'
                    style={{ marginTop: 20 }}
                    onClick={() => setClickParent(!clickParent)}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <Loading />
  );
}

export default UserProfile;