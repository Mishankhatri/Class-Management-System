import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InnerHeader from './../../../common/InnerHeader';
import * as MdIcons from 'react-icons/md';
import axios from 'axios';
import ProfileImage from '../../../../assets/profiles/pas075bct029.jpg';
import BlankProfile from '../../../../assets/profiles/blank-profile.jpg';
import Loading from './../../../common/Loading';
import '../student/CustomView.css';
import '../users/UserProfile.css';
import ViewModal from '../../../common/Modal/ViewModal';
import ChangePhoto from '../../../common/Modal/ChangePhoto';
import ChangeInput from '../../../common/Modal/ChangeInput';
import { getTeacherInputValues } from './../../../values/AdminPanel/TeacherInputField';

function TeacherFullDetail() {
  let { id } = useParams();
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

  const teacherDetail = data.find((value) => value.id === Number(id));

  if (teacherDetail != undefined) {
    teacherDetail.gender = 'Male';
    teacherDetail.DOB = '2058-03-09';
  }

  const [click, setClick] = useState(false);
  const [clickTeacher, setClickTeacher] = useState(false);
  const [previousImage, setPreviosImage] = useState(BlankProfile);
  const [uploadedImage, setUploadedImage] = useState('');

  const onSubmitTeacher = (e) => {
    e.preventDefault();
    setPreviosImage(BlankProfile);
    setClick(false);
    console.log(uploadedImage); //Uploaded Image
  };

  const onSubmitTeacherInput = (data, e) => {
    e.target.reset();
    console.log(data);
    setClickTeacher(false);
  };
  return teacherDetail ? (
    <React.Fragment>
      {click && (
        <ChangePhoto
          click={click}
          setClick={setClick}
          onSubmit={onSubmitTeacher}
          setPreviosImage={setPreviosImage}
          setUploadedImage={setUploadedImage}
          previousImage={previousImage}
        />
      )}

      {clickTeacher && (
        <ChangeInput
          onSubmit={onSubmitTeacherInput}
          valueArray={getTeacherInputValues()}
          click={clickTeacher}
          setClick={setClickTeacher}
          heading={"View Teacher's Info"}
        />
      )}

      <InnerHeader
        icon={<MdIcons.MdPerson />}
        name={`Teacher: ${teacherDetail.name}`}
      />
      <div className='main-content'>
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
                  <div className='image' onClick={() => setClick(!click)}>
                    <img
                      // src={teacherDetail?.image}
                      src={ProfileImage}
                      alt='Profile-Image'
                      title='Change Profile Picture'
                    />
                    <MdIcons.MdPhotoCamera className='camera' />
                  </div>
                </div>
                <div className='information'>
                  <div className='information__info'>
                    <ViewModal title={'Full Name'} value={teacherDetail.name} />
                    <ViewModal title={'Gender'} value={teacherDetail.gender} />
                    <ViewModal
                      title={'Date of Birth'}
                      value={teacherDetail.DOB}
                    />
                    <ViewModal title={'Phone'} value={teacherDetail.phone} />
                    <ViewModal title={'Email'} value={teacherDetail.email} />
                    <ViewModal
                      title={'Address'}
                      value={teacherDetail.address.city}
                    />
                  </div>
                  <button
                    className='btn-edit'
                    style={{ marginTop: 20 }}
                    onClick={() => setClickTeacher(!clickTeacher)}>
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

export default TeacherFullDetail;
