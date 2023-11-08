import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div>
      <LoadingBar style={{ backgroundColor: 'gray', height: '5px' }} />
    </div>
  );
}

export default Loading;
