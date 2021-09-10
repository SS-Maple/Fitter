import React from 'react';
import ReactDOM  from 'react-dom';
import AddFriend from './addFriend.jsx'
import MessageButton from './messageButton.jsx'

class FriendProfile extends React.Component {
  constructor(props){
    super(props);
  }




  render(){
    return(
      <div>
        <div className='user-profile'>
          <div className='profile-pic'>
            <img className='profile-img' src='https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png'></img>
          </div>
          <div className='profile-info'>
            <p>Name: </p>
            <p>Introduction: </p>
          </div>
          <div>
            <AddFriend />
          </div>
          <div>
            <MessageButton />
          </div>
        </div>
      </div>
    )
  }

}

export default FriendProfile;