import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';
import Rankings from './Rankings.jsx';
import { useAuth } from '../user-auth.js';


function HomeFeed() {
  const auth = useAuth();
  const [goals, setGoals] = useState({});
  const [id, setId] = useState(auth.userId);
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios.get(`/user?userId=${id}`)
      .then(result => setUserName(result.data[0].firstname))
      .catch(error => error)
    axios.get('/todaysgoals')
      .then(results => {
        setGoals({
          calories: results.data.calories,
          water: results.data.water,
          weight: results.data.weight
        })
      })
      .catch(error => error)
  }, []);

  return (
    <div id='home-page' data-testid='home-page'>
      <div className='feed-bottom'></div>
        <h4 style={{textAlign: 'center', fontSize: '20px'}}>Welcome {userName}!</h4>
      {/* Home Feed Search */}
      <SearchUsernames />
      <h4>Your Daily Status:</h4>
      <div className='home-daily-stats'>
        <TodaysGoals goals={goals} />
      </div>
      <Rankings id={id}/>
      <div className='feed-bottom'></div>
    </div>
  );
}

export default HomeFeed;

