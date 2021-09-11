import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link,useLocation,useHistory, useParams } from 'react-router-dom';

function FriendsList() {
  const location = useLocation();
  
  const [userId, setUserId] = useState(location.search.split('=')[1]);

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(`/user?userId=${userId}`)
      .then((response) => response.data)
      .then((result) => {
        result.forEach(item => setUser(item.firstname))
      })
      .catch((error) => console.log('error', error))
    axios.get(`/friends?userId=${userId}`)
      .then((response) => response.data)
      .then((result) => setFriends(result))
      .catch((error) => console.log('error', error));
  }, [])

  return (
    <div>
      {/* Friend's List Header */}
      <div className='pic-tile-friend-header'>
        <img
          className='icon'
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => console.log('back button was clicked')}
        />
        <h3>{user}'s Friends</h3>
      </div>
      {/* Friend's List Tile */}
      {friends.map((friend, index) => (
        <div
          className='pic-tile-friend-tile'
          key={index}
          onClick={() => console.log('you clicked on ', friend.firstname, `'s tile`)}
        >
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src={friend.picture}></img>
          </div>
          {/* Friend Information */}
          <div className='pic-tile-friend-right-info'>
            <b>{friend.firstname} {friend.lastname}</b><p></p>
            {friend.descriptionmessage}
          </div>
        </div>
      ))}
      <div className='feed-bottom'></div>
    </div>

  );
}

export default FriendsList;

