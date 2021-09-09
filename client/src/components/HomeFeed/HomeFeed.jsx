import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


function HomeFeed() {

  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios.get('/rankings')
      .then(response => response.data)
      .then(result => setFriends(result[0].friends))
      .catch(error => error)
    }, [])
    
  sortFriends()

  function sortFriends() {
    console.log('running sort friends', friends.length)
    
    friends.forEach(friend => {
      let calculate = (
        // figure out water calculation
        friend['goals'][0]['wateraverage'] * 0.33
        ) + (
        // figure out calories calculation
        friend['goals'][0]['caloriesaverage'] * 0.33
        ) + (
        // figure out weight calculation
        friend['goals'][0]['weightaverage'] * 0.33
        );
      friend['sorting'] = calculate; // will help sort ranking order
      friends.sort(function (a, b) {
        return b.sorting - a.sorting;
      });
      console.log('new', friends)
    })

    console.log('end')
  }
  
  return (
    <div id='home-page'> 
      {/* Home Feed Search */}
      <div className='home-page-header'>
        <input placeholder='Search Username...'></input>
      </div>

      {/* Placeholder for Personal Stats [Simon] */}
      <div className='home-placeholder'>
        Placeholder for Daily/Weekly Status
      </div>
      
      <h4>Your Friend's Rankings: </h4>
      {/* Friend's List Tile */}
      {friends.map((friend, index) => (
        <div 
          className='pic-tile-friend-tile' 
          key={index}
          onClick={() => console.log({friend})}
        >
          <div className='pic-tile-ranking'>
            #{index + 1}<p></p>
          </div>
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic' style={{'width': '15%', }}>
            <img style={{'maxHeight': '50px'}} src={friend.profilephoto}></img>
          </div> 
          {/* Friend Information */}
          <div 
            className='pic-tile-friend-right-info' 
            style={{'fontSize': '14px', 'width': '85%'}}
          >
            <b>{friend.friendfirst}'s stats:</b>
            <li>
              {Math.round(friend.goals[0].wateraverage * 100)}% of my water goal.
            </li>
            <li>
              {Math.round(friend.goals[0].caloriesaverage * 100)}% of my calories goal.
            </li>
            <li>
              {Math.round(friend.goals[0].weightaverage * 100)}% of the way to my weight goal.
            </li>
          </div>
        </div>
      ))}
    </div>

  );
}

export default HomeFeed;

