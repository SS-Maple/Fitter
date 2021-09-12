import React from 'react';
import axios from 'axios';

class AddCalorieModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleFoodSubmit(e){
    e.preventDefault();
    console.log(this.state)
    return axios('https://api.edamam.com/api/food-database/v2/parser', {
      params:{
          app_id: 'a200e091',
          app_key: '925b4ad43263447efc8f2be33b2bc28a',
          ingr: this.state.value
      }
    })
    .then(result => console.log('THIS IS THE RESULT', result.data.parsed[0].food.nutrients.ENERC_KCAL))
  }

  handleChange(e){
    this.setState({
      value: e.target.value
    })
  }

  render(){
    if (!this.props.show){
      return null;
    }
    return(
      <div className='modal' onClick={() => this.props.close()}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3>Enter Your Calories:</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => this.handleFoodSubmit(e)}>
              <input className='food-input' type='text' placeholder='Enter Meal' value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              <input type='submit' value='Submit'></input>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default AddCalorieModal;