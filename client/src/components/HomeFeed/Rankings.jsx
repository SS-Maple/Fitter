import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';


function Rankings({id}) {

  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(id);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`/rankings?friendId=${userId}`)
      .then(response => {
        return response.data
      })
      .then(result => {
        setUserData(result[0].userdata)
        setFriends(result[0].friends)
      })
      .catch(error => error)
  }, []);

  sortFriends();

  function sortFriends() {
    userData.forEach(user => {
      let water = Math.abs(100 - (user.wateraverage) * 100);
      let calories = Math.abs(100 - (user.caloriesaverage) * 100);
      let calculate = water + calories;
      user['sorting'] = calculate.toFixed(2);
    })
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
        {/* Friend Information */}
      <div
        className='pic-tile-friend-tile'
        onClick={() => console.log('On click needs to route to', friend.friendfirst)}
      >
        <div
          className='pic-tile-friend-right-info'
          style={{ 'fontSize': '14px', 'width': '85%' }}
        >
          Personal Rank Placeholder :
        </div>
      </div>
      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
      {friends.filter(friend => friend.sorting >= 0)
        .sort((a, b) => a.sorting - b.sorting)
        .concat(friends
          .filter(friend => friend.sorting < 0)
          .sort((a, b) => b.sorting - a.sorting))
        .map((friend, index) => (
          <div
            className='pic-tile-friend-tile'
            key={index}
            onClick={() => console.log('On click needs to route to', friend.friendfirst)}
          >
            <div className='pic-tile-ranking'>
              #{index + 1}
            </div>
            {/* Profile Picture */}
            <div className='pic-tile-friend-left-pic' style={{ 'width': '15%', }}>
              <img style={{ 'maxHeight': '50px' }} src={friend.profilephoto}></img>
            </div>
            {/* Friend Information */}
            <div
              className='pic-tile-friend-right-info'
              style={{ 'fontSize': '14px', 'width': '85%' }}
            >
              <b>{friend.friendusername}:</b>
              <li>
                {Math.round(friend.goals[0].wateraverage * 100)}% of my water goal.
              </li>
              <li>
                {Math.round(friend.goals[0].caloriesaverage * 100)}% of my calories goal.
              </li>
            </div>
          </div>
        ))}
      <div className='feed-bottom'></div>
    </div>

  );
}

export default Rankings;

