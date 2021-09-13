import React from 'react';
import MyGoals from './myGoals.jsx';
import TodaysGoals from './todaysGoal.jsx';
import PreviousStats from './previousStats.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom'


class MyProfile extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      firstName: null,
      lastName: null,
      intro: null,
      stats: [],
      goals: {},
      friendCount: 0
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  getUserData(){
    axios.get('/userdata')
    .then(data => {
      let info = data.data[0]
      this.setState({
        firstName: info.firstname,
        lastName: info.lastname,
        intro: info.intro,
        stats: info.stats,
        goals: info.goals,
        friendCount: info.friendcount
      });
    })
  }

  render(){
    const {firstName, lastName, intro, stats, goals, friendCount} = this.state;
    return(
      <div>
        <div className='my-profile'>
          <div className='profile-info'>
            <div className='profile-pic'>
              <img className='profile-img' src='https://cdn0.iconfinder.com/data/icons/users-34/24/user_symbol_person-1024.png'></img>
            </div>
            <div className='profile-desc'>
              <p className='user-details'>Name: {firstName} {lastName}</p>
              <p className='user-details'>Age: 1000</p>
            </div>
            <div className='user-profile-friends'>
              <div className='friend-count'>{friendCount}</div>
                <p className='friend-label'>Friends</p>
            </div>
          </div>
          <div className='profile-intro'>
            <p>{intro}</p>
          </div>
          <div className='profile-btn-container'>
            <button className='profile-btn'>Upload profile picture</button>
            <button className='profile-btn'>Edit Profile</button>
          </div>
        </div>
        <div className='goal-header'>Your Goals:</div>
        <MyGoals goals={goals} />
        <div className='goal-header' >Today's Status:</div>
        <TodaysGoals />
        <div className='goal-header'>Your Previous Status:</div>
        <PreviousStats stats={stats} goals={goals}/>
      </div>
    )
  }

}

export default MyProfile;