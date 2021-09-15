import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';


function PersonalRank({ id }) {

  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(id);

  useEffect(() => {
    axios.get(`/rankings?friendId=${userId}`)
      .then(response => response.data)
      .then(result => setFriends(result[0].friends))
      .catch(error => error)
  }, []);

  sortFriends();

  function sortFriends() {
    friends.forEach(friend => {
      // returns negative if they missed the goal
      let water = Math.abs(100 - (friend['goals'][0]['wateraverage'] * 100))
      // returns negative if goal is exceeded
      let calories = Math.abs(100 - (friend['goals'][0]['caloriesaverage'] * 100))
      let calculate = water + calories;
      friend['sorting'] = calculate.toFixed(2);
    })
  }

  return (
    <div id='home-page'>
      <div
        className='pic-tile-friend-tile'
        onClick={() => console.log('On click needs to route to', friend.friendfirst)}
      >
        {/* Friend Information */}
        <div
          className='pic-tile-friend-right-info'
          style={{ 'fontSize': '14px', 'width': '85%' }}
        >
          username:
        </div>
      </div>
    </div>

  );
}

export default PersonalRank;

