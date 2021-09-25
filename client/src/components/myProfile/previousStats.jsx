import React from 'react';

const PreviousStats = ({ stats, goals, handleShare }) => {
  if (!stats) {
    return stats.map((stat, i) => {
      let waterGoal = ((stat.water / goals.watergoal) * 100).toFixed(0);
      let calorieGoal = ((stat.calories / goals.caloriegoal) * 100).toFixed(0);
      let weightGoal = ((stat.weight / goals.weightgoal) * 100).toFixed(0);
      let share = stat.shareboolean ? '[ Unshare ]' : '[ Share ]';
      return (
        <div className='previous-stat-container' key={i} style={{margin:'5% 0', fontSize:'14px'}}>
          <div className='stat-header' >
            <p>{stat.date}</p>
            <div className='share' data-id={stat.id} data-bool={stat.shareboolean} onClick={(e) => handleShare(e)}>{share}</div>
          </div>
          <li>You've reached {calorieGoal}% of your calorie intake!</li>
          <li>You've reached {waterGoal}% of your water intake!</li>
          <li>You're {weightGoal}% of your weight goal!</li>
        </div>
      )
    }
    )
  } else {
    return <div className='previous-stat-container' >
    <div className='stat-header'>
      <div className='share' ></div>
    </div>
    <p>You don't have any saved stats yet!</p>
  </div>
  }
}

export default PreviousStats;