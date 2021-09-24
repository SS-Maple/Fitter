import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchUsernames from './SearchUsernames.jsx';
import { Link } from 'react-router-dom'
import TodaysGoals from '../myProfile/todaysGoal.jsx';


function Rankings({ id }) {

  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(id);
  const [userData, setUserData] = useState([]);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    axios.get(`/rankings?friendId=${userId}`)
      .then(response => setFriends(response.data))
      .catch(error => error)
  }, []);

  function sortFriends() {
    console.log('calling sort')
    friends.forEach((friend, index) => {
      // returns negative if they missed the goal
      let water = Math.abs(100 - (friend['userdata'][index]['wateraverage'] * 100))
      // returns negative if goal is exceeded
      let calories = Math.abs(100 - (friend['userdata'][index]['caloriesaverage'] * 100))
      let calculate = water + calories;
      friend['sorting'] = calculate.toFixed(2);
      friend['wateraverage'] = friend['userdata'][index]['wateraverage'];
      friend['caloriesaverage'] = friend['userdata'][index]['caloriesaverage'];
      friend['weightaverage'] = friend['userdata'][index]['weightaverage'];
    })
    final();
  }

  function ranking() {
    return friends.sort((a, b) => a.sorting - b.sorting)
      .forEach((user, index) => user['ranks'] = (index + 1))
  }

  function final() {
    ranking();
    return friends.filter(user => user.id === userId).map(user => user.ranks).toString()
  }

  if (friends) {
    if (friends.length > 1) {
      sortFriends();
      return <div data-testid='home-page' id='home-page'>
        {/* Friend Information */}
        <div
          className='pic-tile-friend-tile'
          onClick={() => console.log('On click needs to route to', friend.friendfirst)}
        >
          <div className='pic-tile-friend-right-info'>
            You're currently ranked <b>#{final()}</b> amongst friends.
          </div>
        </div>
        <h4>Your Friend's Rankings: </h4>
        {/* Friend's List Tile */}
        {friends.sort((a, b) => a.sorting - b.sorting)
          .map((friend, index) => (
            <Link to={`/friendProfile?friendid=${friend.id}&userid=${userId}`} 
              key={index} 
              style={{textDecoration:"none", color:'black'}}
            >
              <div
                className='pic-tile-friend-tile'
                key={index}
                onClick={() => console.log('On click needs to route to', friend.firstname)}
              >
                <div className='pic-tile-ranking'>
                  #{index + 1}
                </div>
                {/* Profile Picture */}
                <div className='pic-tile-friend-left-pic'>
                  <img src={friend.picture}></img>
                </div>
                {/* Friend Information */}
                <div className='pic-tile-friend-right-info'>
                  {console.log(friend)}
                  <b>{friend.username}:</b>
                  <li>
                    Reached {Math.round(friend.wateraverage * 100)}% of my water goal.
                  </li>
                  <li>
                    Reached {Math.round(friend.caloriesaverage * 100)}% of my calories goal.
                  </li>
                  <li>
                    {Math.round(friend.weightaverage * 100)}% of the way to my weight goal.
                  </li>
                </div>
            </div>
                </Link>
            ))}
          <div className='feed-bottom'></div>
      </div>
    } else {
      return <div>
        <div data-testid='home-page' id='home-page'>
          <h4>Your Friend's Rankings: </h4>
          <div className='pic-tile-friend-tile'>
            <div className='pic-tile-friend-right-info'>
              You don't have friends yet, go ahead and add friends using the searchbar so we can populate the rankings!
            </div>
          </div>
        <div className='feed-bottom'></div>
      </div>
      </div >
     }
  }
}

export default Rankings;

