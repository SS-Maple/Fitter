import React from 'react';
import axios from 'axios';

class EditGoals extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      watergoal: null,
      caloriegoal: null,
      weightgoal: null
    }
  }

  handleReset(){
    this.setState({
      watergoal: null,
      caloriegoal: null,
      weightgoal: null
    })
  }

  handleChange(e){
    console.log(e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    if (!this.props.show){
      return null;
    }
    return(
      <div className='modal' onClick={() => {
        this.handleReset();
        this.props.close()}}>
        <div className='modal-content goal-modal' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3>What are your goals?</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => {
              this.props.handleGoalSubmit(this.state.watergoal, this.state.caloriegoal, this.state.weightgoal)
              this.handleReset();
              this.props.close()}
              }>
              <label> Water Goal
                <input className='food-input' type='number' placeholder='Ounces' name='watergoal'value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              </label>
              <label> Calorie Goal
                <input className='food-input' type='number' placeholder='Calories' name='caloriegoal' value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              </label>
              <label> Weight Goal
                <input className='food-input' type='number' placeholder='lbs' name='weightgoal' value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              </label>
              <input type='submit' value='Submit'></input>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default EditGoals;