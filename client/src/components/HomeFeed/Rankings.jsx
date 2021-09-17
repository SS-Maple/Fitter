import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';


function Rankings({id}) {

  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(id);
  const [userData, setUserData] = useState([]);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    axios.get(`/rankings?friendId=${userId}`)
      .then(response => setFriends(response.data))
      .catch(error => error)
  }, []);

  
  sortFriends();
  
  function sortFriends() {
    friends.forEach((friend, index) => {
      // returns negative if they missed the goal
      let water = Math.abs(100 - (friend['userdata'][index]['wateraverage'] * 100))
      // returns negative if goal is exceeded
      let calories = Math.abs(100 - (friend['userdata'][index]['caloriesaverage'] * 100))
      let calculate = water + calories;
      friend['sorting'] = calculate.toFixed(2);
      friend['wateraverage'] = friend['userdata'][index]['wateraverage'];
      friend['caloriesaverage'] = friend['userdata'][index]['caloriesaverage'];
    })
  }

  return (
    <div id='home-page'>
        {/* Friend Information */}
      <div
        className='pic-tile-friend-tile'
        onClick={() => console.log('On click needs to route to', friend.friendfirst)}
      >
        <div
          className='pic-tile-friend-right-info'
          style={{ 'fontSize': '14px', 'width': '85%' }}
        >
          You are currently ranked _ amongst your friends.
        </div>
      </div>
      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
      {friends.sort((a, b) => a.sorting - b.sorting)
        .map((friend, index) => (
          <div
            className='pic-tile-friend-tile'
            key={index}
            onClick={() => console.log('On click needs to route to', friend.firstname)}
          >
            <div className='pic-tile-ranking'>
              #{index + 1}, {friend.sorting}
            </div>
            {/* Profile Picture */}
            <div className='pic-tile-friend-left-pic' style={{ 'width': '15%', }}>
              <img style={{ 'maxHeight': '50px' }} src={friend.picture}></img>
            </div> 
            {/* Friend Information */}
            <div
              className='pic-tile-friend-right-info'
              style={{ 'fontSize': '14px', 'width': '85%' }}
            >
              <b>{friend.username}:</b>
              <li>
                {Math.round(friend.wateraverage * 100)}% of my water goal.
              </li>
              <li>
                {Math.round(friend.caloriesaverage * 100)}% of my calories goal.
              </li>
            </div>
          </div>
        ))}
      <div className='feed-bottom'></div>
    </div>

  );
}

export default Rankings;

