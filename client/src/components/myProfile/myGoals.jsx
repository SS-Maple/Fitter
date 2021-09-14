import React from 'react';

class MyGoals extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {caloriegoal, watergoal, weightgoal} = this.props.goals
    console.log(this.props.goals)
    return(
      <div className='my-goals'>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>{caloriegoal}</div>
            <div className='goal-units'>cals</div>
          </div>
          <div className='goal-label'>Calories</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>{watergoal}</div>
            <div className='goal-units'>Ounces</div>
          </div>
          <div className='goal-label'>Water Intake</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>{weightgoal}</div>
            <div className='goal-units'>lbs</div>
          </div>
          <div className='goal-label'>Weight</div>
        </div>

      </div>
    )
  }

}

export default MyGoals;