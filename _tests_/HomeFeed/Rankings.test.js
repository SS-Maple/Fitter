import React, { useReducer } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import axios from "axios";
import { configure, shallow, mount } from 'enzyme';
import Rankings from "../../client/src/components/HomeFeed/Rankings.jsx";
import sortFriends from "../../client/src/components/HomeFeed/Rankings.jsx";

// @jest-environment jsdom
beforeEach(() => {
  
})

afterEach(cleanup);
configure({ adapter: new Adapter() })


let friends = [
  {
    "id": 1,
    "firstname": "Mike",
    "lastname": "Valencia",
    "picture": "https://randomuser.me/api/portraits/men/47.jpg",
    "descriptionmessage": "The best things come from living outside of your comfort zone",
    "username": "busymike",
    "userdata": [
      {
        "userid": 1,
        "watergoal": 64,
        "caloriegoal": 2500,
        "weightgoal": 160,
        "wateraverage": 0.9082532051282052,
        "caloriesaverage": 0.9206974358974359,
        "weightaverage": 0.9862179487179488
      },
      {
        "userid": 2,
        "watergoal": 56,
        "caloriegoal": 2513,
        "weightgoal": 132,
        "wateraverage": 1.038003663003663,
        "caloriesaverage": 0.915934576101707,
        "weightaverage": 1.1954156954156954
      },
      {
        "userid": 3,
        "watergoal": 67,
        "caloriegoal": 1702,
        "weightgoal": 177,
        "wateraverage": 0.8675851511672407,
        "caloriesaverage": 1.352375787158396,
        "weightaverage": 0.8914964508184847
      },
      {
        "userid": 7,
        "watergoal": 55,
        "caloriegoal": 2051,
        "weightgoal": 170,
        "wateraverage": 1.0568764568764568,
        "caloriesaverage": 1.1222543099676205,
        "weightaverage": 0.9282051282051282
      },
      {
        "userid": 8,
        "watergoal": 79,
        "caloriegoal": 1827,
        "weightgoal": 106,
        "wateraverage": 0.735800064913989,
        "caloriesaverage": 1.2598487081245702,
        "weightaverage": 1.4886308659893566
      }
    ]
  },
  {
    "id": 2,
    "firstname": "Carol",
    "lastname": "Mccann",
    "picture": "https://randomuser.me/api/portraits/women/47.jpg",
    "descriptionmessage": "You can’t become the best without first being the worst",
    "username": "coolcarol",
    "userdata": [
      {
        "userid": 1,
        "watergoal": 64,
        "caloriegoal": 2500,
        "weightgoal": 160,
        "wateraverage": 0.9082532051282052,
        "caloriesaverage": 0.9206974358974359,
        "weightaverage": 0.9862179487179488
      },
      {
        "userid": 2,
        "watergoal": 56,
        "caloriegoal": 2513,
        "weightgoal": 132,
        "wateraverage": 1.038003663003663,
        "caloriesaverage": 0.915934576101707,
        "weightaverage": 1.1954156954156954
      },
      {
        "userid": 3,
        "watergoal": 67,
        "caloriegoal": 1702,
        "weightgoal": 177,
        "wateraverage": 0.8675851511672407,
        "caloriesaverage": 1.352375787158396,
        "weightaverage": 0.8914964508184847
      },
      {
        "userid": 7,
        "watergoal": 55,
        "caloriegoal": 2051,
        "weightgoal": 170,
        "wateraverage": 1.0568764568764568,
        "caloriesaverage": 1.1222543099676205,
        "weightaverage": 0.9282051282051282
      },
      {
        "userid": 8,
        "watergoal": 79,
        "caloriegoal": 1827,
        "weightgoal": 106,
        "wateraverage": 0.735800064913989,
        "caloriesaverage": 1.2598487081245702,
        "weightaverage": 1.4886308659893566
      }
    ]
  },
  {
    "id": 3,
    "firstname": "Alice",
    "lastname": "Castro",
    "picture": "https://randomuser.me/api/portraits/women/26.jpg",
    "descriptionmessage": "If I was a writer, I’d have a better Fitter bio quote",
    "username": "hikingalice",
    "userdata": [
      {
        "userid": 1,
        "watergoal": 64,
        "caloriegoal": 2500,
        "weightgoal": 160,
        "wateraverage": 0.9082532051282052,
        "caloriesaverage": 0.9206974358974359,
        "weightaverage": 0.9862179487179488
      },
      {
        "userid": 2,
        "watergoal": 56,
        "caloriegoal": 2513,
        "weightgoal": 132,
        "wateraverage": 1.038003663003663,
        "caloriesaverage": 0.915934576101707,
        "weightaverage": 1.1954156954156954
      },
      {
        "userid": 3,
        "watergoal": 67,
        "caloriegoal": 1702,
        "weightgoal": 177,
        "wateraverage": 0.8675851511672407,
        "caloriesaverage": 1.352375787158396,
        "weightaverage": 0.8914964508184847
      },
      {
        "userid": 7,
        "watergoal": 55,
        "caloriegoal": 2051,
        "weightgoal": 170,
        "wateraverage": 1.0568764568764568,
        "caloriesaverage": 1.1222543099676205,
        "weightaverage": 0.9282051282051282
      },
      {
        "userid": 8,
        "watergoal": 79,
        "caloriegoal": 1827,
        "weightgoal": 106,
        "wateraverage": 0.735800064913989,
        "caloriesaverage": 1.2598487081245702,
        "weightaverage": 1.4886308659893566
      }
    ]
  },
  {
    "id": 7,
    "firstname": "Greg",
    "lastname": "Pace",
    "picture": "https://randomuser.me/api/portraits/men/60.jpg",
    "descriptionmessage": "Don’t know what to do? You can start by hitting that follow button.",
    "username": "gogreg",
    "userdata": [
      {
        "userid": 1,
        "watergoal": 64,
        "caloriegoal": 2500,
        "weightgoal": 160,
        "wateraverage": 0.9082532051282052,
        "caloriesaverage": 0.9206974358974359,
        "weightaverage": 0.9862179487179488
      },
      {
        "userid": 2,
        "watergoal": 56,
        "caloriegoal": 2513,
        "weightgoal": 132,
        "wateraverage": 1.038003663003663,
        "caloriesaverage": 0.915934576101707,
        "weightaverage": 1.1954156954156954
      },
      {
        "userid": 3,
        "watergoal": 67,
        "caloriegoal": 1702,
        "weightgoal": 177,
        "wateraverage": 0.8675851511672407,
        "caloriesaverage": 1.352375787158396,
        "weightaverage": 0.8914964508184847
      },
      {
        "userid": 7,
        "watergoal": 55,
        "caloriegoal": 2051,
        "weightgoal": 170,
        "wateraverage": 1.0568764568764568,
        "caloriesaverage": 1.1222543099676205,
        "weightaverage": 0.9282051282051282
      },
      {
        "userid": 8,
        "watergoal": 79,
        "caloriegoal": 1827,
        "weightgoal": 106,
        "wateraverage": 0.735800064913989,
        "caloriesaverage": 1.2598487081245702,
        "weightaverage": 1.4886308659893566
      }
    ]
  },
  {
    "id": 8,
    "firstname": "Peter",
    "lastname": "Hamilton",
    "picture": "https://randomuser.me/api/portraits/men/56.jpg",
    "descriptionmessage": "I might not be where I want to be yet, but I get closer everyday",
    "username": "activepeter",
    "userdata": [
      {
        "userid": 1,
        "watergoal": 64,
        "caloriegoal": 2500,
        "weightgoal": 160,
        "wateraverage": 0.9082532051282052,
        "caloriesaverage": 0.9206974358974359,
        "weightaverage": 0.9862179487179488
      },
      {
        "userid": 2,
        "watergoal": 56,
        "caloriegoal": 2513,
        "weightgoal": 132,
        "wateraverage": 1.038003663003663,
        "caloriesaverage": 0.915934576101707,
        "weightaverage": 1.1954156954156954
      },
      {
        "userid": 3,
        "watergoal": 67,
        "caloriegoal": 1702,
        "weightgoal": 177,
        "wateraverage": 0.8675851511672407,
        "caloriesaverage": 1.352375787158396,
        "weightaverage": 0.8914964508184847
      },
      {
        "userid": 7,
        "watergoal": 55,
        "caloriegoal": 2051,
        "weightgoal": 170,
        "wateraverage": 1.0568764568764568,
        "caloriesaverage": 1.1222543099676205,
        "weightaverage": 0.9282051282051282
      },
      {
        "userid": 8,
        "watergoal": 79,
        "caloriegoal": 1827,
        "weightgoal": 106,
        "wateraverage": 0.735800064913989,
        "caloriesaverage": 1.2598487081245702,
        "weightaverage": 1.4886308659893566
      }
    ]
  }
]

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
friends.filter(user => user.id === 1).map(user => user.ranks).toString()


jest.mock('../../client/src/components/HomeFeed/Rankings.jsx');
const myRankings = shallow(<Rankings />)
const onSubmitSpy = jest.fn();
const onSubmit = onSubmitSpy;


test('Renders Home Feed', () => {
  const myRankings = shallow(<Rankings />)
  expect(myRankings.exists()).toBe(true);
})

test(`expects friends to be an array`, () => {
  // render(<Rankings friends={friends}/>);
  expect(Array.isArray(friends)).toBe(true);
  expect(friends.length).toBeGreaterThan(0);
});

test(`expects top friend to be Carol`, () => {
  expect(friends[0].firstname).toBe('Carol')
  expect(friends[1].firstname).toBe('Mike')
});


