import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';
import Rankings from './Rankings.jsx';
import { useAuth } from '../user-auth.js';
import generateNewNotifications from '../notifications/notificationHelpers/generateNewNotifications.js';

function HomeFeed() {
  const auth = useAuth();
  const [goals, setGoals] = useState({});
  const [id, setId] = useState(auth.userId);

  useEffect(() => {
    axios.get('/todaysgoals')
      .then(results => {
        setGoals({
          calories: results.data.calories,
          water: results.data.water,
          weight: results.data.weight
        })
      })
  }, []);

  generateNewNotifications(id);

  return (
    <div id='home-page'>
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

