import React from 'react';

const SharedStats = ({picture, username, stats, goals}) => {

   return stats.map((stat, i) =>{
      console.log('stat', stat)
      console.log('goals', goals)
      let waterGoal = ((stat.water/ goals.watergoal) * 100).toFixed(0);
      let calorieGoal = ((stat.calories/ goals.caloriegoal) * 100).toFixed(0);
      let weightGoal = ((stat.weight/goals.weightgoal) * 100).toFixed(0);
    return(
      <div className='pic-tile-friend-tile' key={i} >
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
      </div>
       )
      }
    )
}

export default SharedStats;