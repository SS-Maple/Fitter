import React from 'react';
import MyGoals from './myGoals.jsx';
import TodaysGoals from './todaysGoal.jsx';
import PreviousStats from './previousStats.jsx';

class MyProfile extends React.Component {
  constructor(props){
    super(props);
  }



  render(){
    return(
      <div>
        <div className='my-profile'>
          <div className='profile-info'>
            <div className='profile-pic'>
              <img className='profile-img' src='https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png'></img>
            </div>
            <div className='profile-desc'>
              <p className='user-details'>Name: FirstName LastName</p>
              <p className='user-details'>Age: 1000</p>
            </div>
            <div className='user-profile-friends'>
              <div className='friend-count'>5</div>
                <p className='friend-label'>Friends</p>
            </div>
          </div>
          <div className='profile-intro'>
            <p>This is the best introduction ever. Period. You're welcome.</p>
          </div>
          <div className='profile-btn-container'>
            <button className='profile-btn'>Upload profile picture</button>
            <button className='profile-btn'>Edit Profile</button>
          </div>
        </div>
        <div className='goal-header'>Your Goals:</div>
        <MyGoals />
        <div className='goal-header'>Current Goals:</div>
        <TodaysGoals />
        <div className='goal-header'>Your Previous Status:</div>
        <PreviousStats />
      </div>
    )
  }

}

export default MyProfile;