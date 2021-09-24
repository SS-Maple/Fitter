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
      .then(response => {
        setFriends(response.data)
        response.data.forEach(user => {
          if (user.id === userId) {
            setRank(user.ranks)
          }
        })
      })
      .catch(error => error)
    }, []);
    
  if (friends) {
    if (friends.length > 1) {
      return <div data-testid='home-page' id='home-page'>
        {/* Friend Information */}
        <div className='pic-tile-friend-tile'>
          <div className='pic-tile-friend-right-info'>
            You're currently ranked <b>#{rank}</b> amongst friends.
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
              <div className='pic-tile-friend-tile' key={index}>
                <div className='pic-tile-ranking'>
                  #{index + 1}
                </div>
                {/* Profile Picture */}
                <div className='pic-tile-friend-left-pic'>
                  <img src={friend.picture}></img>
                </div>
                {/* Friend Information */}
                <div className='pic-tile-friend-right-info'>
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

