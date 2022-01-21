import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className='body'>
      <span className='loader'>
        <span className='loader-inner'></span>
      </span>
      <span className='loading-title'>Loading...</span>
    </div>
  );
}

export default Loading;
