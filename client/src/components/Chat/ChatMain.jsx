import React, { useState, useEffect } from 'react';
import DirectChatPage from './DirectChatPage.jsx';
import axios from 'axios';
import { useAuth } from '../user-auth.js';

const ChatMain = (props) => {
  const auth = useAuth();

  const [user, setUser] = useState('');
  const [friends, setFriends] = useState('');

  useEffect(() => {
    let params = {
      params: {
        userId: auth.userId
      }
    };
    axios.get('/chat/user', params)
      .then((response) => {
        setUser({
        userName: response.data[0].firstname + ' ' + response.data[0].lastname,
        userSecret: response.data[0].id
        });
      })
      .catch((error) => console.log('error', error))
    axios.get('/chat/friends', params)
      .then((response) => {
        let modifiedFriends = response.data.map(friend => {
          return {
            userName: friend.firstname + ' ' + friend.lastname,
            userSecret: friend.id
          };
        });
        console.log('friends:',modifiedFriends);
        setFriends(modifiedFriends);
      })
      .catch((error) => console.log('error', error))
  }, [props]);

  if (user !== '' && friends !== '') {
    return (
      <div>
        <DirectChatPage
          user={user}
          friends={friends}
        />
      </div>
    );
  }

  return (
    <div>
      Loading...
    </div>
  );
}

export default ChatMain;