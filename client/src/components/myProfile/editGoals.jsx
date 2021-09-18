import React, { useState } from 'react';

const EditGoals = ({ show, close, userid, handleGoalSubmit }) => {
  const [watergoal, setWaterGoal] = useState('');
  const [caloriegoal, setCalorieGoal] = useState('');
  const [weightgoal, setWeightGoal] = useState('');
  const [sharing, setSharing] = useState(true);

  function handleReset(){
    setWaterGoal('');
    setCalorieGoal('');
    setWeightGoal('');
  }

  function handleCheck(){
    setSharing(prevState => !prevState)
  }

  if (!show){
    return null;
  }
  return(
    <div className='modal' onClick={() => {
      handleReset();
      close()}}>
      <div className='modal-content goal-modal' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h3>What are your goals?</h3>
        </div>
        <div className='modal-body'>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleGoalSubmit(watergoal, caloriegoal, weightgoal, sharing)
            handleReset();
            close()}
            }>
            <label> Water Goal
              <input className='food-input' type='number' placeholder='Ounces' name='watergoal'value={watergoal} onChange={(e) => setWaterGoal(e.target.value)}></input>
            </label>
            <label> Calorie Goal
              <input className='food-input' type='number' placeholder='Calories' name='caloriegoal' value={caloriegoal} onChange={(e) => setCalorieGoal(e.target.value)}></input>
            </label>
            <label> Weight Goal
              <input className='food-input' type='number' placeholder='lbs' name='weightgoal' value={weightgoal} onChange={(e) => setWeightGoal(e.target.value)}></input>
            </label>
            <label> Share?
              <input type='checkbox' name='goal-share' checked={sharing} onChange={handleCheck}></input>
            </label>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
      </div>
    </div>
  )

}

export default EditGoals;