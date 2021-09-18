import React,  { useState } from 'react';

const UpdateWeightModal = ({ show, userid, close, handleSubmit }) => {
  const [value, setValue] = useState('');

  function handleReset(){
    setValue('')
  }

  function handleChange(e){
    setValue(e.target.value)
  }

  if (!show){
    return null;
  }
  return(
    <div className='modal' onClick={() => {
      handleReset();
      close('weightShow')}}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Enter Your Weight:</h3>
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userid,'weight', value)
            handleReset();
            close()}
          }>
            <input className='food-input' type='number' placeholder='Your Current Weight' value={value} onChange={(e) => handleChange(e)}></input>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateWeightModal;