import React,  { useState, useEffect } from 'react';
import AddCalorieModal from './addCalorieModal.jsx';
import AddWaterModal from './addWaterModal.jsx';
import UpdateWeightModal from './updateWeightModal.jsx';
import axios from 'axios';
import { useAuth } from '../user-auth.js';


const TodaysGoals = ({ userid, goals }) => {
  const {caloriegoal, watergoal, weightgoal} = goals

  const [calories, setCalories] = useState(0);
  const [water, setWater] = useState(0);
  const [weight, setWeight] = useState(0);
  const [calorieShow, setCalorieShow] = useState(false);
  const [waterShow, setWaterShow] =  useState(false);
  const [weightShow, setWeightShow] =  useState(false);

  const auth = useAuth();

  useEffect(() => {
    getData(auth.userId)
  }, []);

  function getData(userid){
    return axios.get('/todaysgoals', {params: {userid}})
    .then(results =>
      {
        setCalories(results.data.calories)
        setWater(results.data.water)
        setWeight(results.data.weight)
      })
    .catch(err => console.log('No Records for today'))
  };

  function pct(v,category){
    if(!v) {
      return '0%'
    } else {
      if (category === 'caloriegoal') {
        let pctvalue = ((v/caloriegoal) * 100).toFixed(0)
        return `${pctvalue}%`
      }
      if (category === 'watergoal') {
        let pctvalue = ((v/watergoal) * 100).toFixed(0)
        return `${pctvalue}%`
      }
      if (category === 'weightgoal') {
        let pctvalue = ((v/weightgoal) * 100).toFixed(0)
        return `${pctvalue}%`
      }
    }
  };

  function handleSubmit(id, category, value){
    axios({
      method: 'put',
      url: '/updateToday',
      data: `userid=${id}&value=${value}&category=${category}`
    })
    .then((result) => {
      getData(result.data.userid)})
  }

  return(
    <div className='my-goals'>
      <div className='goal-container' onClick={() => setCalorieShow(prev => !prev)} >
        <div className='indiv-goal-curr'>
          <div className='goal-progress'>{pct(calories, 'caloriegoal')}</div>
        </div>
        <div className='goal-label'>Calories</div>
      </div>
      <div className='goal-container' onClick={() => setWaterShow(prev => !prev)}>
        <div className='indiv-goal-curr'>
          <div className='goal-progress'>{pct(water, 'watergoal')}</div>
        </div>
        <div className='goal-label'>Water Intake</div>
      </div>
      <div className='goal-container' onClick={() => setWeightShow(prev => !prev)}>
        <div className='indiv-goal'>
          <div className='goal-total'>{weight}</div>
          <div className='goal-units'>lbs</div>
        </div>
        <div className='goal-label'>Weight</div>
      </div>
      <AddCalorieModal show={calorieShow} userid={userid} close={()=> setCalorieShow(prev => !prev)} handleSubmit={handleSubmit} />
      <AddWaterModal show={waterShow} userid={userid} close={()=> setWaterShow(prev => !prev)} handleSubmit={handleSubmit}/>
      <UpdateWeightModal show={weightShow} userid={userid} close={()=> setWeightShow(prev => !prev)} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default TodaysGoals;