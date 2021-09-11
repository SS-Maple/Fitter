import React from 'react';
import axios from 'axios';

class AddCalorieModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleFoodSubmit(){

  }

  render(){
    if (!this.props.show){
      return null;
    }
    return(
      <div className='modal'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h3>Enter Your Calories:</h3>
          </div>
          <div className='modal-body'>
            <form>
              <input className='food-input' type='text' placeholder='Enter Meal' value={this.state.value}></input>
              <input type='submit' value='submit'></input>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default AddCalorieModal;