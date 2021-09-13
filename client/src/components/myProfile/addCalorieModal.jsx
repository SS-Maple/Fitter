import React from 'react';
import axios from 'axios';

class AddCalorieModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      calorie: 0
    }
  }

  handleReset(){
    this.setState({
      value: '',
      calorie: 0
    })
  }

  handleChange(e){
    this.setState({
      value: e.target.value
    })

    if(e.target.value.length > 3){
      return axios('https://api.edamam.com/api/food-database/v2/parser', {
      params:{
          app_id: 'a200e091',
          app_key: '925b4ad43263447efc8f2be33b2bc28a',
          ingr: e.target.value
      }
    })
    .then(result => this.setState({calorie:result.data.parsed[0].food.nutrients.ENERC_KCAL}))
    }
  }

  render(){
    if (!this.props.show){
      return null;
    }
    return(
      <div className='modal' onClick={() => {
        this.handleReset();
        this.props.close('calorieShow')}}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3>Enter Your Calories:</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => {
              this.props.handleSubmit(e, 'calories', this.state.calorie)
              this.handleReset();
              this.props.close('calorieShow')}
              }>
              <input className='food-input' type='text' placeholder='Enter Meal' value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              <input type='submit' value='Submit'></input>
            </form>
            <div className='calorie-display'>
              <div className='food-calorie-display d1'>{this.state.value}</div>
              <div className='food-calorie-display d2'>{this.state.calorie} cal</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default AddCalorieModal;