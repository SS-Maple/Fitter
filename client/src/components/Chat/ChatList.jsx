import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat, ChatEngineWrapper } from 'react-chat-engine';
import axios from 'axios';

const ChatList = (props) => {
  const [friend, setFriend] = useState({})

  const creds = {
    'PRIVATE-KEY': '59eed471-fa85-444f-bfda-021ac8ca2005',
    'Project-ID': '4f65a747-dbb0-414d-abc1-9436ab6724cc',
    'User-Name': props.user.userName,
    'User-Secret': props.user.userSecret
	};

  const getOrCreateUser = (user) => {
		console.log('user in getOrCreateUser: ', user);
		let config = {
			headers: {
				'private-key': '59eed471-fa85-444f-bfda-021ac8ca2005'
			}
		};
		let data = {
			username: user.userName,
			secret: user.userSecret
		};
		return axios.put('https://api.chatengine.io/users/', data, config)
			.then((response) => console.log('getOrCreateUser response: ', response))
			.catch((error) => console.log('getOrCreateUser error: ', error));
	};

  const createDirectChat = (creds, friend) => {
		getOrCreateUser(friend)
			.then((response) => {
				getOrCreateChat(
					creds,
					{ is_direct_chat: true, usernames: [friend.userName] },
					() => setFriend('')
				);
			})
			.catch((error) => console.log('error in createDirectChat: ', error));
	}

  const renderDirectMessages = () => {
    const chatList = props.chats ? Object.values(props.chats) : [];
    console.log('chatList: ', props.chat);
  }

  return (
    <div>
				<div>Welcome, {props.user.userName}!</div>
				<input list="friends" onChange={e => {
						let friendData = e.target.value.split(',');
						setFriend({
							userName: friendData[0],
							userSecret: friendData[1]
						});
					}
				}/>
				<datalist id="friends">
					{props.friends.map(friend =>
						<option
							value={friend.userName + ',' + friend.userSecret}>
								{friend.userName}
						</option>
					)}
				</datalist>
				<button onClick={() => createDirectChat(creds)}>
					Let's Chat!
				</button>
				{/* {props.friends.map(friend => createDirectChat(props, friend))} */}
        { renderDirectMessages() }
			</div>
  )
}

export default ChatList;