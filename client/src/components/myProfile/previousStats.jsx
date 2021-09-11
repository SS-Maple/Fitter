import React from 'react';

const PreviousStats = ({stats, goals}) => {

   return stats.map((stat, i) =>{
      let waterGoal = ((stat.water/ goals.watergoal) * 100).toFixed(0);
      let calorieGoal = ((stat.calories/ goals.caloriegoal) * 100).toFixed(0);
      let weightGoal = ((stat.weight/goals.weightgoal) * 100).toFixed(0);
    return(
      <div className='previous-stat-container' key={i} >
        <p>{stat.date}</p>
        <p>You've reached {calorieGoal}% of your calorie intake!</p>
        <p>You've reached {waterGoal}% of your water intake!</p>
        <p>You're {weightGoal}% of your weight goal!</p>
      </div>
       )
      }
    )
}

export default PreviousStats;