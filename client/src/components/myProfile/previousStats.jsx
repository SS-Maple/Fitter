import React from 'react';

const PreviousStats = ({stats, goals, handleShare}) => {

   return stats.map((stat, i) =>{
      let waterGoal = ((stat.water/ goals.watergoal) * 100).toFixed(0);
      let calorieGoal = ((stat.calories/ goals.caloriegoal) * 100).toFixed(0);
      let weightGoal = ((stat.weight/goals.weightgoal) * 100).toFixed(0);
      let share = stat.shareboolean ? '[ Unshare ]' : '[ Share ]';
    return(
      <div className='previous-stat-container' key={i} >
        <div className='stat-header'>
          <p>{stat.date}</p>
          <div className='share' data-id={stat.id} data-bool={stat.shareboolean} onClick={(e) => handleShare(e)}>{share}</div>
        </div>
        <p>You've reached {calorieGoal}% of your calorie intake!</p>
        <p>You've reached {waterGoal}% of your water intake!</p>
        <p>You're {weightGoal}% of your weight goal!</p>
      </div>
       )
      }
    )
}

export default PreviousStats;