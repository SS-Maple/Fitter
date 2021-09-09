import React from 'react';

class MyGoals extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='my-goals'>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>-</div>
            <div className='goal-units'>cals</div>
          </div>
          <div className='goal-label'>Calories</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>-</div>
            <div className='goal-units'>cups</div>
          </div>
          <div className='goal-label'>Water Intake</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>-</div>
            <div className='goal-units'>lbs</div>
          </div>
          <div className='goal-label'>Weight</div>
        </div>

      </div>
    )
  }

}

export default MyGoals;