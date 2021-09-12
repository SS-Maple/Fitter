import React from 'react';
import AddCalorieModal from './addCalorieModal.jsx';

class TodaysGoals extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      calorie: 0,
      water: 0,
      weight: 0,
      calorieShow: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    if(!this.state.calorieShow) {
      this.setState({
        calorieShow: true
      })
    } else {
      this.setState({
        calorieShow: false
      })
    }
  }


  render(){
    const {calorie, water, weight} = this.state

    return(
      <div className='my-goals'>
        <div className='goal-container' onClick={() => this.handleClick()} >
          <div className='indiv-goal-curr'>
            <div className='goal-progress'>{calorie}</div>
          </div>
          <div className='goal-label'>Calories</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal-curr'>
            <div className='goal-progress'>{water}</div>
          </div>
          <div className='goal-label'>Water Intake</div>
        </div>
        <div className='goal-container'>
          <div className='indiv-goal'>
            <div className='goal-total'>{weight}</div>
            <div className='goal-units'>lbs</div>
          </div>
          <div className='goal-label'>Weight</div>
        </div>
        <AddCalorieModal show={this.state.calorieShow} close={this.handleClick} />

      </div>
    )
  }

}

export default TodaysGoals;