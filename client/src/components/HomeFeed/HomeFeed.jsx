import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';
import Rankings from './Rankings.jsx';
import { useAuth } from '../user-auth.js';

function HomeFeed() {
  const auth = useAuth();
  const [goals, setGoals] = useState([{}]);
  const [id, setId] = useState(auth.userId);
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios.get(`/user?userId=${id}`)
      .then(result => setUserName(result.data[0].firstname))
      axios.get('/userdata', { params: {userId: id}})
      .then(data => {
        let info = data.data[0]
        setGoals(info.goals)
      })
      .catch(error => error)

  }, []);

  return (
    <div id='home-page' data-testid='home-page'>
      <div className='feed-bottom'></div>
      <div style={{textAlign: 'center', fontSize: '20px', color:'white'}}><b>Welcome {userName}!</b></div>
      {/* Home Feed Search */}
      <SearchUsernames />
      <h4>Your Daily Status:</h4>
      <div className='home-daily-stats'>
        <TodaysGoals goals={goals} userid={id} />
      </div>
      <Rankings id={id}/>
      <div className='feed-bottom'></div>
    </div>
  );
}

export default HomeFeed;

