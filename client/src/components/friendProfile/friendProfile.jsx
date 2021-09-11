import React, { useState, useEffect } from 'react';
import AddFriend from './addFriend.jsx';
import MessageButton from './messageButton.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
// {id: 4,
// userid: 1,
// friendid: 7,
// friendusername: 'gogreg',
// profilephoto: 'https://randomuser.me/api/portraits/men/60.jpg',
// sorting: "5.25",
// userid: 1}

const FriendProfile = (props) => {

  // const [friend, setFriend] = useState(props.friend)

  useEffect(() => {
    console.log('hi')
    axios.get('/friendProfile')
    .then(result => {
      console.log('in friendProfile', result)

    })
  })


    return(
      <div>
        <div className='my-profile'>
          <div className='profile-info'>
            <div className='profile-pic'>
              <img className='profile-img' src='https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png'></img>
            </div>
            <div className='profile-desc'>
              <p className='user-details'>Name:</p>
              {/* {friend.firstName} {friend.lastName} */}
              <p className='user-details'>Age: 1000</p>
            </div>
            <div className='user-profile-friends'>
              <div className='friend-count'>5</div>
                <p className='friend-label'>Friends</p>
            </div>
          </div>
          <div className='profile-intro'>
            {/* <p>{intro}</p> */}
          </div>
          <div>
            <AddFriend />
          </div>
          <div>
            <MessageButton />
          </div>
        </div>
        <div>
          {/* <PreviousStats stats={stats} goals={goals} /> */}
          Placeholder for stat tiles
        </div>
      </div>
    )

}

export default FriendProfile;