import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import FriendTile from '../FriendsList/FriendTile.jsx';

function FriendsList() {
  // const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState('');
  const [friendId, setFriendId] = useState(location.search.split('')[10]);
  const [friends, setFriends] = useState([]);
  // const [user, setUser] = useState('');
  
  useEffect(() => {
    axios.get(`/friends?friendId=${friendId}`)
      .then((response) => setName(response.data[0].firstname))
      .catch((error) => error);
    axios.get(`/friends?friendId=${friendId}`)
      .then((response) => response.data)
      .then((result) => result[0].friends)
      .then((list) => setFriends(list))
      .catch((error) => error);
  }, [])

  return (
    <div data-testid='friends'>
      {/* Friend's List Header */}
      <div data-testid='pic-tile-friend-header' className='pic-tile-friend-header'>
        <img
          className='icon'
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => history.goBack()}
        />
        <h3>{name}'s Friends</h3>
      </div>
      {/* Friend's List Tile */}
      <FriendTile friends={friends}/>
      <div data-testid='feed-bottom'className='feed-bottom'></div>
    </div>
  );
}

export default FriendsList;

