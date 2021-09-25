import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../user-auth.js';

const AddFriend = () => {
  const location = useLocation();
  const auth = useAuth();
  const [userId, setId] = useState(auth.userId);
  const [friendId, setFriendId] = useState(location.search.split('')[10]);

  const [friended, setFriend] = useState();

  useEffect(() => {
    axios.get(`/isfriend?friendID=${friendId}&userID=${userId}`)
    .then(results => {
      console.log('res in isfriend', results.data)
      setFriend(results.data)
    })
    .catch(err => {
      console.log('ERROR', err)
    })
  }, []);

  const addFriend = () => {
    axios.post(`/addfriend?friendID=${friendId}&userID=${userId}`)
    .then(result => {
      setFriend(true)
    })
    .catch(err => {
      console.log('ERROR in axios post to /addFriend catch block: ', err)
    })
  };
  const removeFriend = () => {
    axios.delete(`/removefriend?friendID=${friendId}&userID=${userId}`)
    .then(result => {
      setFriend(false)
    })
    .catch(err => {
      console.log('ERROR in axios post to /addFriend catch block: ', err)
    })
  };

  if (!friended) {
    return <button className='profile-btn' onClick={addFriend}> Add Friend+ </button>
  } else {
    return <button className='profile-btn' onClick={removeFriend}> Remove Friend- </button>

  }
};

export default AddFriend;