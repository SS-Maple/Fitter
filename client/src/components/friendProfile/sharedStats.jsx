
import React, { useState } from 'react';
import CommentModal from './comment.jsx';
import { Link } from 'react-router-dom';

const SharedStats = ({picture, username, stats, goals, userid, friendid}) => {
  if(!stats){
    return (
      <div style={{ 'fontSize': '15px', 'width': '75%', 'text-align': 'center', 'padding': '70px'}}>
        {`${username} is not sharing any stats at this time`}
      </div>
    )
  } else {
  const [show, setShow] = useState(false);

   return stats.map((stat, i) =>{
     console.log(stat, i)
      let waterGoal = ((stat.water/ goals.watergoal) * 100).toFixed(0);
      let calorieGoal = ((stat.calories/ goals.caloriegoal) * 100).toFixed(0);
      let weightGoal = ((stat.weight/goals.weightgoal) * 100).toFixed(0);
    return(
      <div className='pic-tile-friend-tile' key={i} >
        {/* <Link to={`/statComment?friendid=${friendid}&tileid=${i}`} > */}
        <div className='pic-tile-friend-left-pic' style={{ 'width': '15%', }}>
          <img style={{ 'maxHeight': '50px' }} src={picture}></img>
        </div>
        {/* <div style={{ '': '15%', }}>{stat.date}</div> */}
        <div className='pic-tile-friend-right-info' style={{ 'fontSize': '14px', 'width': '85%' }}>
          <p>{username} shared:</p>
          <li>Reached {calorieGoal}% of my calorie intake goal.</li>
          <li>Reached {waterGoal}% of my water intake goal.</li>
          <li>{weightGoal}% of the way to my weight goal.</li>
        </div>
      {/* </Link> */}
        <div>
        <button onClick={() => setShow(true)}><img style={{ 'maxHeight': '20px' }} src={'https://img.flaticon.com/icons/png/512/25/25663.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF'}/></button>
        </div>
        <div >
          <CommentModal show={show} onClose={() => setShow(false)}  userid={userid} friendid={friendid} statid={i}/>
        </div>
      </div>
       )
      }
    )
  }
}

export default SharedStats;