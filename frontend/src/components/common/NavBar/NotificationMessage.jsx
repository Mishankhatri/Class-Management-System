import React from 'react';

function NotificationMessage({ messageText, by, time, ProfileImage }) {
  return (
    <div className='body-section'>
      <div className='catagory'></div>
      <div className='message'>
        <div className='message_text'>{messageText}</div>
        <div className='createdBy'>
          <div className='by'>{by}</div>
          <span className='breadcrumb'>.</span>
          <div className='date'>{time}</div>
        </div>
      </div>
      <div className='photo'>
        <img src={ProfileImage} alt='Profile Picture' />
      </div>
    </div>
  );
}

export default NotificationMessage;
