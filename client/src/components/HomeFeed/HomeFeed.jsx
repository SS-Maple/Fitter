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
        onClick={() => console.log('you clicked on a tile')}
        >
          {console.log(friend)}
          <div className='pic-tile-ranking'>
            #{index + 1}
          </div>
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src={friend.profilephoto}></img>
          </div> 
          {/* Friend Information */}
          <div className='pic-tile-friend-right-info'>
            <b>{friend.friendfirst}'s stats:</b>
            <li>
              Reached
            </li>
          </div>
        </div>
      ))}
    </div>

  );
}

export default HomeFeed;

