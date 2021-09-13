import React from 'react';
import AddCalorieModal from './addCalorieModal.jsx';
import AddWaterModal from './addWaterModal.jsx';
import UpdateWeightModal from './updateWeightModal.jsx';
import axios from 'axios';

class TodaysGoals extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      calories: 0,
      water: 0,
      weight: 0,
      calorieShow: false,
      waterShow: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    this.getData()
  }

  getData(){
    return axios.get('/todaysgoals')
    .then(results =>
      {
        this.setState({
          calories: results.data.calories,
          water: results.data.water,
          weight: results.data.weight
        })
      })
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

  handleSubmit(e, category, value){
    e.preventDefault();
    //temp userid
    let userid = 5;

    axios({
      method: 'put',
      url: '/updateToday',
      data: `userid=${userid}&value=${value}&category=${category}`
    })
    .then(() => this.getData())
  }

  render(){
    const {calories, water, weight} = this.state

    return(
      <div className='my-goals'>
        <div className='goal-container' onClick={() => this.handleClick('calorieShow')} >
          <div className='indiv-goal-curr'>
            <div className='goal-progress'>{calories}</div>
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
        <AddCalorieModal show={this.state.calorieShow} close={this.handleClick} handleSubmit={this.handleSubmit}/>
        <AddWaterModal show={this.state.waterShow} close={this.handleClick} handleSubmit={this.handleSubmit} />
        <UpdateWeightModal show={this.state.weightShow} close={this.handleClick} handleSubmit={this.handleSubmit}/>
      </div>
    )
  }

}

export default TodaysGoals;