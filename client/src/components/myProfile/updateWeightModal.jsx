import React from 'react';
import axios from 'axios';

class UpdateWeightModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
    }
  }

  handleReset(){
    this.setState({
      value: ''
    })
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
      <div className='modal' onClick={() => {
        this.handleReset();
        this.props.close('weightShow')}}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
          <div className='modal-header'>
            <h3>Enter Your Water Intake:</h3>
          </div>
          <div className='modal-body'>
            <form onSubmit={(e) => this.handleFoodSubmit(e)}>
              <input className='food-input' type='number' placeholder='Your Current Weight' value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
              <input type='submit' value='Submit'></input>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default UpdateWeightModal;