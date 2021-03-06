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
      userid: null,
      friendid: null,
      profilephoto: 'https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png',
      firstName: '',
      lastName: '',
      description: '',
      stats: [],
      goals: {},
      friends: [],
      // isFriend: null
    }
  }
  componentDidMount(){
    this.getFriendData()
  }

  getFriendData() {
    axios.get('/friendProfile')
    .then(result => {
      console.log('what is this', result.data);
      var userData = result.data
      if(userData.fiends===null){
        userData[fiends]= []
      }
      if (result.data.goals === null) {
        userData[goals] === {}
      }
      this.setState({
        friendid: userData.friendid,
        userid: userData.userid,
        username: userData.username,
        firstName: userData.firstname,
        lastName: userData.lastname,
        profilephoto: userData.picture,
        description: userData.descriptionmessage,
        stats: userData.dlydata,
        goals: userData.goals,
        friends: userData.friends.length,
        // isFriend: (userData.isfriend !== null) ? true : false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  render() {
    return(
      
      <div className='my-profile-container'> 
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
              <Link to={`/friends?friendId=${this.state.friendid}`}>
                <div className='friend-count'>{this.state.friends}</div>
                <p className='friend-label'>Friends</p>
              </Link>
            </div>
            </div>
            <div className='profile-intro' >
              <div style={{fontSize:'18px'}}><b>{this.state.firstName} {this.state.lastName}</b><br/></div>
              <p>{this.state.description}</p>
            </div>
            <div className='profile-btn-container'>
              <AddFriend />
              <Link to={`/statComment?friendId=${this.state.friendid}`}>
              <button className='profile-btn' onClick={() => console.log('On click needs to route to', this.state.friendid)}> Comments </button>
              </Link>
            </div>
          </div>
          <div>
            <SharedStats picture={this.state.profilephoto} username={this.state.username} stats={this.state.stats} goals={this.state.goals} userid={this.state.userid} friendid={this.state.friendid}/>
          </div>
          <div className='feed-bottom'></div>
        </div>

    )
    }
}

export default FriendProfile;