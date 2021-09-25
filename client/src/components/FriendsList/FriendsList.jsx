import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../user-auth.js';

function FriendsList() {
  const history = useHistory();
  const auth = useAuth();
  const [userId, setId] = useState(auth.userId);

  const [name, setName] = useState('');
  const [friendId, setFriendId] = useState((location.search.split('')).slice(10));
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let temp = friendId.join('');
    axios.get(`/friends?friendId=${temp}`)
      .then((response) => setName(response.data[0].firstname))
      .catch((error) => error);
    axios.get(`/friends?friendId=${temp}`)
      .then((response) => response.data)
      .then((result) => result[0].friends)
      .then((list) => setFriends(list))
      .catch((error) => error);
  }, [])

  return (
    <div data-testid='friends'>
      {/* Friend's List Header */}
      <div className='feed-bottom'></div>
      <div className='feed-bottom' style={{marginTop:'5%'}}></div>
      <div data-testid='pic-tile-friend-header' className='pic-tile-friend-header'>
        <img
          className='icon'
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => history.goBack()}
        />
        <h3>{name}'s Friends</h3>
      </div>  
      {/* Friend's List Tile */}
      {friends.filter(user => user.friendid.toString() !== friendId.toString()).map((friend, index) => (
        <Link to={`/friendProfile?userid=${friend.friendid}&userid=${userId}`} 
          key={index} 
          style={{textDecoration:"none", color:'black'}}
        >
        <div className='pic-tile-friend-tile' key={index}>
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
        </Link>
      ))}
      <div className='feed-bottom'></div>
    </div>
  );
}

export default FriendsList;

