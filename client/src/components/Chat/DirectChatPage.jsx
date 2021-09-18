import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat, ChatEngineWrapper } from 'react-chat-engine';
import axios from 'axios';
import ChatList from './ChatList.jsx';

const DirectChatPage = (props) => {
	const [friend, setFriend] = useState({})
	const creds = {
		headers: {
			'PRIVATE-KEY': '59eed471-fa85-444f-bfda-021ac8ca2005',
			'Project-ID': '4f65a747-dbb0-414d-abc1-9436ab6724cc',
			'User-Name': props.user.userName,
			'User-Secret': props.user.userSecret
		}
	};

	useEffect(() => {
		getOrCreateUser(props.user)
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

	const createDirectChat2 = (creds, friend) => {
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

	const getPersonalTrainer = (creds) => {
		let personalTrainer = {
			userName: 'My Personal Journal',
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
		// axios.put('https://api.chatengine.io/chats/', data, config)
		// 	.then((response) => {
		// 		console.log('response: ', response);
		// 	})
		// 	.catch((error) => {
		// 		console.log('error: ', error);
		// 	})

		// 	console.log(getOrCreateChat(
		// 		creds,
		// 		{ is_direct_chat: true, usernames: [personalTrainer.userName] }
		// 	));

		createDirectChat2(creds, personalTrainer);
		// axios.get('https://api.chatengine.io/chats/', config)
		// 	.then((response) => {
		// 		console.log('response: ', response.data[0].id);
		// 	})
		// 	.catch((error) => {
		// 		console.log('error: ', error);
		// 	})
	}

	const renderChatForm = (creds) => {
		return (
			<div>
				<div>Welcome, {props.user.userName}!</div>
				{/* <input list="friends" onChange={e => {
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
				</button> */}
				{props.friends.map(friend => createDirectChat2(creds, friend))}
				{ getPersonalTrainer(creds) }
				{/* <BottomNav /> */}
			</div>
		)
	}

	return (
		<div id="direct-chat-page" style={{ fontFamily: 'sans-serif' }}>
			<ChatEngineWrapper>
				<ChatEngine
					userName={props.user.userName}
					userSecret={props.user.userSecret}
					projectID='4f65a747-dbb0-414d-abc1-9436ab6724cc'
					height='100vh'
					renderNewChatForm={(creds) => renderChatForm(creds)}
					// renderChatList={(chatEngineState) =>
					// 	<ChatList
					// 		{...chatEngineState}
					// 		user={props.user}
					// 		friends={props.friends}
					// 	/>
					// }
				/>
			</ChatEngineWrapper>
		</div>
	)
}

export default DirectChatPage;