import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';

function FriendsList() {
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');
  const [friendId, setFriendId] = useState(location.search.split('')[10]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState('');
  
  useEffect(() => {
    axios.get(`/friends?friendId=${friendId}`)
      .then((response) => setName(response.data[0].firstname))
      .catch((error) => console.log('error', error));
    axios.get(`/friends?friendId=${friendId}`)
      .then((response) => response.data)
      .then((result) => result[0].friends)
      .then((list) => setFriends(list))
      .catch((error) => console.log('error', error));
  }, [])
  

  return (
    <div>
      {/* Friend's List Header */}
      <div className='pic-tile-friend-header'>
        <img
          className='icon'
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => history.goBack()}
        />
        <h3>{name}'s Friends</h3>
      </div>
      {/* Friend's List Tile */}
      {friends.map((friend, index) => (
        <div
          className='pic-tile-friend-tile'
          key={index}
          onClick={() => console.log('you clicked on ', friend.friendfirst, `'s tile`)}
        >
          {/* Profile Picture */}
          <div className='pic-tile-friend-left-pic'>
            <img src={friend.profilephoto}></img>
          </div>
          {/* Friend Information */}
          <div className='pic-tile-friend-right-info'>
            <b>{friend.friendfirst} {friend.friendlast}</b><p></p>
            {friend.description}
          </div>
        </div>
      ))}
      <div className='feed-bottom'></div>
    </div>

  );
}

export default FriendsList;

