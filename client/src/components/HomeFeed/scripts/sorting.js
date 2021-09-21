const sorting = function (friends, userId) {
  friends.forEach((friend, index) => {
    // returns negative if they missed the goal
    let water = Math.abs(100 - (friend['userdata'][index]['wateraverage'] * 100))
    // returns negative if goal is exceeded
    let calories = Math.abs(100 - (friend['userdata'][index]['caloriesaverage'] * 100))
    let calculate = water + calories;
    friend['sorting'] = calculate.toFixed(2);
    friend['wateraverage'] = friend['userdata'][index]['wateraverage'];
    friend['caloriesaverage'] = friend['userdata'][index]['caloriesaverage'];
  })
  friends.sort((a, b) => a.sorting - b.sorting)
    .forEach((user, index) => user['ranks'] = (index + 1))
}

export default sorting;
