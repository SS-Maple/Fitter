import React from 'react';

const PreviousStats = (props) => {
  //sample build - finalize build will be dependent on the data structure passed down from top level
  return (
    <div className='previous-stat-container'>
      <p className='data'>On October 3, 2021:</p>
      <p>- You reached X% of your calories intake goal.</p>
      <p>- You reached X% of your water intake goal.</p>
      <p>- You're X% of the way to your weight goal!</p>
    </div>
  )
}

export default PreviousStats;