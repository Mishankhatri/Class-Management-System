import React, { useState } from 'react';
import NotificationMessage from './NotificationMessage';
import NotificationDummy from './NotifcationDummyValues';
import Moment from 'react-moment';

function NavBarNotification({ showDropDown }) {
  const className = showDropDown
    ? 'menu active notification'
    : 'menu inactive notification';

  const getNotification = NotificationDummy();

  return (
    <React.Fragment>
      <div className={className}>
        <div className='heading'>Notifications</div>
        {getNotification.map((value, index) => {
          const messageText = value.messageText.slice(0, 80).concat('...');
          const dates = <Moment fromNow>{value.date}</Moment>;

          return (
            <NotificationMessage
              messageText={messageText}
              by={value.by}
              time={dates}
              ProfileImage={value.ProfileImage}
              key={index}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default NavBarNotification;
