import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import axios from 'axios';

const DirectChatPage = (props) => {
	useEffect(() => {
		getOrCreateUser(props.user)
  }, [props])

	const createDirectChat = (creds, friend) => {
		getOrCreateUser(friend)
			.then((response) => {
				getOrCreateChat(
					creds,
					{ is_direct_chat: true, usernames: [friend.userName] }
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

	const getPersonalTrainer = (creds) => {
		let personalTrainer = {
			userName: 'My Fitness Journal',
			userSecret: 'fitter'
		}
		let config = {
			headers: {
				'PRIVATE-KEY': '59eed471-fa85-444f-bfda-021ac8ca2005',
				'Project-ID': '4f65a747-dbb0-414d-abc1-9436ab6724cc',
				'User-Name': props.user.userName,
				'User-Secret': props.user.userSecret
			}
		};
		let data = {
			usernames: personalTrainer.userName,
			is_direct_chat: true
		};
		createDirectChat(creds, personalTrainer);
	}

	const renderChatForm = (creds) => {
		return (
			<div>
				{props.friends.map(friend => createDirectChat(creds, friend))}
				{ getPersonalTrainer(creds) }
			</div>
		)
	}

	return (
		<div id="direct-chat-page" style={{ fontFamily: 'sans-serif' }}>
			<ChatEngine
				userName={props.user.userName}
				userSecret={props.user.userSecret}
				projectID='4f65a747-dbb0-414d-abc1-9436ab6724cc'
				height='100vh'
				renderNewChatForm={(creds) => renderChatForm(creds)}
			/>
		</div>
	)
}

export default DirectChatPage;