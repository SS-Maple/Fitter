import React from 'react';
import AddCalorieModal from './addCalorieModal.jsx';
import AddWaterModal from './addWaterModal.jsx';
import UpdateWeightModal from './updateWeightModal.jsx';

class TodaysGoals extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      calorie: 0,
      water: 0,
      weight: 0,
      calorieShow: false,
      waterShow: false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(x){
    if (!this.state.[x]) {
      this.setState({
        [x]: true
      })
    } else {
      this.setState({
        [x]: false
      })
    }
  }


  render(){
    const {calorie, water, weight} = this.state

    return(
      <div className='my-goals'>
        <div className='goal-container' onClick={() => this.handleClick('calorieShow')} >
          <div className='indiv-goal-curr'>
            <div className='goal-progress'>{calorie}</div>
          </div>
          <div className='goal-label'>Calories</div>
        </div>
        <div className='goal-container' onClick={() => this.handleClick('waterShow')}>
          <div className='indiv-goal-curr'>
            <div className='goal-progress'>{water}</div>
          </div>
          <div className='goal-label'>Water Intake</div>
        </div>
        <div className='goal-container' onClick={() => this.handleClick('weightShow')}>
          <div className='indiv-goal'>
            <div className='goal-total'>{weight}</div>
            <div className='goal-units'>lbs</div>
          </div>
          <div className='goal-label'>Weight</div>
        </div>
        <AddCalorieModal show={this.state.calorieShow} close={this.handleClick} />
        <AddWaterModal show={this.state.waterShow} close={this.handleClick} />
        <UpdateWeightModal show={this.state.weightShow} close={this.handleClick} />
      </div>
    )
  }

}

export default TodaysGoals;