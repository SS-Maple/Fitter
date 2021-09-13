import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import axios from 'axios';
// const dotenv = require('dotenv').config({path: __dirname + '/../../../../..' + '/.env'});

const DirectChatPage = (props) => {
	const [friend, setFriend] = useState({})

	useEffect(() => {
		getOrCreateUser(props.user)
		// let config = {
		// 	headers: {
		// 		'private-key': '59eed471-fa85-444f-bfda-021ac8ca2005'
		// 	}
		// };
		// let data = {
		// 	username: props.userName,
		// 	secret: props.userSecret
		// };
		// axios.put('https://api.chatengine.io/users/', data, config)
		// 	.then((response) => console.log('response: ', response))
		// 	.catch((error) => console.log('error: ', error))
  }, [props])

	const createDirectChat = (creds) => {
		console.log('friend:',friend);
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
			.then((response) => console.log('response: ', response))
			.catch((error) => console.log('error: ', error));
	};

	const renderChatForm = (creds) => {
		return (
			<div>
				<div>Welcome, {props.user.userName}!</div>
				<input list="friends" onChange={e => {
						let friendData = e.target.value.split(',');
						setFriend({
							userName: friendData[0],
							userSecret: friendData[1]
						});
						// createDirectChat(creds, e.target.value);
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
				{/* <input
					placeholder='Search Friends'
					value={friend}
					onChange={(e) => setFriend(e.target.value)}
				/> */}
				<button onClick={() => createDirectChat(creds)}>
					Let's Chat!
				</button>
			</div>
		)
	}

	return (
		<ChatEngine
			userName={props.user.userName}
			userSecret={props.user.userSecret}
			projectID='4f65a747-dbb0-414d-abc1-9436ab6724cc'
			// custom components
			height='100vh'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;