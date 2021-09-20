import React,  { useState, useEffect } from 'react';
import MyGoals from './myGoals.jsx';
import TodaysGoals from './todaysGoal.jsx';
import PreviousStats from './previousStats.jsx';
import EditGoals from './editGoals.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const [userid, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthDay] = useState('');
  const [picture, setPicture] = useState('');
  const [intro, setIntro] = useState('');
  const [stats, setStats] = useState([]);
  const [goals, setGoals] = useState('');
  const [friendCount, setFriendCount] = useState('');
  const [editGoals, setEditGoals] = useState(false);

  useEffect(() => {
    getUserData();
  }, [])

  function getUserData(){
    axios.get('/userdata')
    .then(data => {
      let info = data.data[0]
        setUserId(info.id)
        setFirstName(info.firstname)
        setLastName(info.lastname)
        setBirthDay(info.birthday)
        setPicture(info.picture)
        setIntro(info.intro)
        setStats(info.stats)
        setGoals(info.goals)
        setFriendCount(info.friendcount)
    })
  }

  function addPhoto(e){
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
      setPicture(data.data.url)
      return axios.put('/updatephoto', `photo=${data.data.url}&userid=${userid}`)
    })
    .catch(err => console.error(err))
  }

  function handleClick(){
    setEditGoals(prevState => !prevState)
  }

  function handleGoalSubmit(water, calorie, weight, share){
    console.log(share)
    axios({
      method: 'put',
      url: '/updategoals',
      data: `userid=${userid}&watergoal=${water}&caloriegoal=${calorie}&weightgoal=${weight}&share=${share}`
    })
    .then(() => getUserData())
  }

  function handleShare(e){
    let id = e.target.attributes.[1].nodeValue
    let share = e.target.attributes.[2].nodeValue === 'true' ? false : true
    console.log(id, e.target.attributes.[2].nodeValue, share)

    return axios({
      method: 'put',
      url: '/updateStatShare',
      data:`id=${id}&share=${share}`
    })
    .then(() => {
        axios({
        method: 'get',
        url: '/getStats',
        params: {userid: userid}
      })
      .then((results) => setStats(results.data))
    })

  }

  return(
          <div className='my-profile-container'>
            <div className='my-profile'>
              <div className='profile-info'>
                <div className='profile-pic'>
                  <img className='profile-img' src={picture}></img>
                </div>
                <div className='profile-desc'>
                  <p className='user-details'>Name: {firstName} {lastName}</p>
                  <p className='user-details'>Birthday: {birthday}</p>
                </div>
                <Link to={{ pathname:`/friends`}}>
                <div className='user-profile-friends'>
                  <div className='friend-count'>{friendCount}</div>
                    <p className='friend-label'>Friends</p>
                </div>
                </Link>
              </div>
              <div className='profile-intro'>
                <p>{intro}</p>
              </div>
              <div className='profile-btn-container'>
                <input id='upload-pic' type='file' onChange={(e) => addPhoto(e)} hidden/>
                <button className='profile-btn' onClick={() => document.getElementById('upload-pic').click()}>Upload profile picture</button>
                <button className='profile-btn' onClick={() => handleClick()} >Edit Goals</button>
              </div>
            </div>
            <div className='goal-header'>Your Goals:</div>
            <MyGoals goals={goals} />
            <div className='goal-header' >Today's Status:</div>
            <TodaysGoals userid={userid} goals={goals} />
            <Link to={{ pathname:'/chart' }}>
              <div className='more-details'>Tap for more details</div>
            </Link>
            <div className='goal-header'>Your Previous Status:</div>
            <PreviousStats stats={stats} goals={goals} handleShare={handleShare} />
            <EditGoals show={editGoals} close={handleClick} userid={userid} handleGoalSubmit={handleGoalSubmit} />
          </div>
        )


}


export default MyProfile;