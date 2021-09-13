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
      userid: null,
      firstName: null,
      lastName: null,
      birthday: null,
      picture: null,
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
        userid: info.id,
        firstName: info.firstname,
        lastName: info.lastname,
        birthday: info.birthday,
        picture: info.picture,
        intro: info.intro,
        stats: info.stats,
        goals: info.goals,
        friendCount: info.friendcount
      });
    })
  }

  addPhoto(e){
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "bji3bjas")

    axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/hrrpp28fec/image/upload",
      data: formData
    })
    .then(data => {
      this.setState({
        picture: data.data.url
      })
      return axios.put('/updatephoto', `photo=${data.data.url}&userid=${this.state.userid}`)
    })
    .catch(err => console.error(err))
  }

  render(){
    const {firstName, lastName, intro, stats, goals, friendCount, birthday} = this.state;
    return(
      <div className='my-profile-container'>
        <div className='my-profile'>
          <div className='profile-info'>
            <div className='profile-pic'>
              <img className='profile-img' src={this.state.picture}></img>
            </div>
            <div className='profile-desc'>
              <p className='user-details'>Name: {firstName} {lastName}</p>
              <p className='user-details'>Birthday: {birthday}</p>
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
            <input id='upload-pic' type='file' onChange={(e) => this.addPhoto(e)} hidden/>
            <button className='profile-btn' onClick={() => document.getElementById('upload-pic').click()}>Upload profile picture</button>
            <button className='profile-btn'>Edit Profile</button>
          </div>
        </div>
        <div className='goal-header'>Your Goals:</div>
        <MyGoals goals={goals} />
        <div className='goal-header' >Today's Status:</div>
        <TodaysGoals userid={this.state.userid} goals={this.state.goals} />
        <div className='goal-header'>Your Previous Status:</div>
        <PreviousStats stats={stats} goals={goals}/>
      </div>
    )
  }

}

export default MyProfile;