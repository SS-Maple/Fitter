import React,  { useState } from 'react';

const AddWaterModal = ({ show, userid, close, handleSubmit}) => {
  const [value, setValue] = useState('');

  function handleChange(e){
    setValue(e.target.value)
  }

  function handleReset(){
    setValue('')
  }

  if (!show){
    return null;
  }
  return(
    <div className='modal' onClick={() => {
      handleReset();
      close()}}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Enter Your Water Intake:</h3>
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userid, 'water', value)
            handleReset();
            close()}
            }>
            <input className='food-input' type='number' placeholder='Ounces' value={value} onChange={(e) => handleChange(e)}></input>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
      </div>
    </div>
  )


}

export default AddWaterModal;