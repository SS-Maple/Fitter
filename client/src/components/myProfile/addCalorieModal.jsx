import React,  { useState } from 'react';
import axios from 'axios';

const AddCalorieModal = ({ show, userid, close, handleSubmit }) => {
  const [value, setValue] = useState('');
  const [selectedFood, setSelectedFood] = useState('');
  const [choices, setChoices] = useState([]);
  const [calorie, setCalorie] = useState(0);

  function handleReset(){
    setValue('');
    setCalorie(0);
    setSelectedFood('');
  }

  function handleChange(e){
    setValue(e.target.value);

    if(value.length >= 3){
      return axios('https://api.edamam.com/auto-complete', {
      params:{
          app_id: 'a200e091',
          app_key: '925b4ad43263447efc8f2be33b2bc28a',
          q: e.target.value
        }
      })
    .then(results => {
      setChoices(results.data)
    })
    }
  }

  function handleSelect(e){
    setChoices([]);
    setSelectedFood(e.target.innerText)

    return axios('https://api.edamam.com/api/food-database/v2/parser', {
      params:{
          app_id: 'a200e091',
          app_key: '925b4ad43263447efc8f2be33b2bc28a',
          ingr: e.target.innerText
      }
    })
    .then(result => setCalorie(result.data.parsed[0].food.nutrients.ENERC_KCAL))
  }

  if (!show){
    return null;
  }
  return(
    <div className='modal' onClick={() => {
      handleReset();
      close('calorieShow')}}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>Enter Your Calories:</h3>
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(userid, 'calories', calorie)
            handleReset();
            close()}
            }>
            <input className='food-input' type='text' placeholder='Enter Meal' value={value} onChange={(e) => handleChange(e)}></input>
            <div className='food-options' >
              {choices.map((food, i) => <div className='food-select' key={i} onClick={(e) => handleSelect(e)}> {food} </div>)}
            </div>
            <input type='submit' value='Submit'></input>
          </form>
          <div className='calorie-display'>
            <div className='food-calorie-display d1'>{selectedFood}</div>
            <div className='food-calorie-display d2'>{calorie} cal</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCalorieModal;