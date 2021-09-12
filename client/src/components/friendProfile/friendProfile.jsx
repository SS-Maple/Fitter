import React, { useState, useEffect } from 'react';
import AddFriend from './addFriend.jsx';
import MessageButton from './messageButton.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SharedStats from './sharedStats.jsx'
// {id: 4,
// userid: 1,
// friendid: 7,
// friendusername: 'gogreg',
// profilephoto: 'https://randomuser.me/api/portraits/men/60.jpg',
// sorting: "5.25",
// userid: 1}

class FriendProfile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      username: '',
      userid: 1,
      friendid: 7,
      profilephoto: 'https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png',
      firstName: '',
      lastName: '',
      description: '',
      stats: [],
      goals: {},
      friends: [],
      isFriend: ''
    }
  }
  componentDidMount(){
    this.getFriendData()
  }

  getFriendData() {
    axios.get('/friendProfile')
    .then(result => {
      var userData = result.data
      console.log('isfriend', userData.isfriend)
      this.setState({
        username: userData.username,
        firstName: userData.firstname,
        lastName: userData.lastname,
        profilephoto: userData.picture,
        description: userData.descriptionmessage,
        stats: userData.dlydata,
        goals: userData.goals,
        friends: userData.fiends.length,
        isFriend: (userData.isFriend !== null) ? true : false
      })
      console.log('state', this.state)
    })
    .catch(err => {
      console.log(err)
    })
  }
  // const [friend, setFriend] = useState(props.friend)

  // useEffect(() => {
  //   console.log('hi')
  //   axios.get('/friendProfile')
  //   .then(result => {
  //     console.log('in friendProfile', result)

  //   })
  // })

  render() {
    return(
      <div>
        <div className='my-profile'>
          <div className='profile-info'>
            <div className='profile-pic'>
              <img className='profile-img' src={this.state.profilephoto}></img>
            </div>
            <div className='profile-desc'>
              <p className='user-details'>{this.state.username}</p>
              {/* {friend.firstName} {friend.lastName} */}
            </div>
            <div className='user-profile-friends'
            onClick={() => console.log('On click needs to route to friendList', this.state.friendid)}>
              <div className='friend-count'>{this.state.friends}</div>
                <p className='friend-label'>Friends</p>
            </div>
          </div>
          <div className='profile-intro'>
            <h4>{this.state.firstName} {this.state.lastName}</h4>
            <p>{this.state.description}</p>
          </div>
          <div className='profile-btn-container'>
            <AddFriend isFriend={this.state.isFriend}/>
            <MessageButton />
          </div>
        </div>
        <div>
          <SharedStats picture={this.state.profilephoto} username={this.state.username} stats={this.state.stats} goals={this.state.goals} />
        </div>
      </div>
    )
  }
}

export default FriendProfile;