import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import axios from 'axios';
// const dotenv = require('dotenv').config({path: __dirname + '/../../../../..' + '/.env'});

const DirectChatPage = (props) => {
	const [friend, setFriend] = useState('')

	useEffect(() => {
		let config = {
			headers: {
				'private-key': '59eed471-fa85-444f-bfda-021ac8ca2005'
			}
		};
		let data = {
			username: props.userName,
			secret: props.userSecret
		};
		axios.put('https://api.chatengine.io/users/', data, config)
			.then((response) => console.log('response: ', response))
			.catch((error) => console.log('error: ', error))
  }, [props])

	const createDirectChat = (creds) => {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [friend] },
			() => setFriend('')
		)
	}

	const renderChatForm = (creds) => {
		return (
			<div>
				<div>Welcome, {props.userName}!</div>
				<input
					placeholder='Search Friends'
					value={friend}
					onChange={(e) => setFriend(e.target.value)}
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

	return (
		<ChatEngine
			userName={props.userName}
			userSecret={props.userSecret}
			projectID='4f65a747-dbb0-414d-abc1-9436ab6724cc'
			// custom components
			height='100vh'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;