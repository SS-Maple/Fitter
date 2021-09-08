import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


function FriendsList() {

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get('/user')
      .then((response) => response.data)
      .then((result) => {
        result.forEach(item => setUser(item.firstname))
      })
      .catch((error) => console.log('error', error))
    axios.get('/friends')
      .then((response) => response.data)
      .then((result) => setFriends(result))
      .catch((error) => console.log('error', error))
  }, [])
  
  return (
    <div>
      {/* Friend's List Header */}
      <div className='gs-friend-header'>
        <img 
          className='icon' 
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => console.log('back button was clicked')}
        />
        <h3>{user}'s Friends</h3>
      </div>
      {/* Friend's List Tile */}
      {friends.map((friend, index) => (
        <div className='gs-friend-tile' key={index}>
            {/* Profile Picture */}
            <div className='gs-friend-left-pic'>
              <img src={friend.picture} alt="Italian Trulli"></img>
            </div> 
            {/* Friend Information */}
            <div className='gs-friend-right-info'>
              <b>{friend.firstname} {friend.lastname}</b><p></p>
              {friend.descriptionmessage}
            </div>
        </div>
      ))}
    </div>

  );
}

export default FriendsList;

