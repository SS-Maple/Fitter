import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import MyGoals from '../myProfile/myGoals.jsx';


function HomeFeed() {

  const [friends, setFriends] = useState([]);
  const [goals, setGoals] = useState({});

  useEffect(() => {
    axios.get('/rankings')
      .then(response => response.data)
      .then(result => setFriends(result[0].friends))
      .catch(error => error)
    axios.get('/userdata')
      .then(data => data.data[0])
      .then(info => setGoals({

      }))
      .catch(error => console.log(error))
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
      {/* Home Feed Search */}

      <SearchUsernames />

      <div className='home-placeholder'>
      Placeholder for Personal Stats
        {/* <MyGoals goals={goals} /> */}
      </div>

      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
      {friends.filter(friend => friend.sorting >= 0)
        .sort((a, b) => a.sorting - b.sorting)
        .concat(friends
          .filter(friend => friend.sorting < 0)
          .sort((a, b) => b.sorting - a.sorting))
        .map((friend, index) => (
          <Link to={`/friendProfile?userid=${friend.friendid}`} key={index} >
          <div
            className='pic-tile-friend-tile'
            key={index}
            onClick={() => console.log('On click needs to route to', friend.friendid)}
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
          </Link>
        ))}
      <div className='feed-bottom'></div>
    </div>

  );
}

export default HomeFeed;

