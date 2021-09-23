import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendProfile from "../client/src/components/friendProfile/friendProfile.jsx";
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import { BrowserRouter } from 'react-router-dom';
import SharedStats from "../client/src/components/friendProfile/sharedStats.jsx";
import AddFriend from "../client/src/components/friendProfile/addFriend.jsx";
configure({ adapter: new Adapter() });

// stats: [{userid: 2, date: 'June      10, 2021', water: 79, calories: 2393, weight: 110},
//     {userid: 2, date: 'June      14, 2021', water: 40, calories: 2539, weight: 113},
//     {userid: 2, date: 'June      20, 2021', water: 49, calories: 2409, weight: 119},
//     {userid: 2, date: 'June      25, 2021', water: 41, calories: 1820, weight: 123},
//     {userid: 2, date: 'June      30, 2021', water: 59, calories: 1900, weight: 118},
//     {userid: 2, date: 'July      06, 2021', water: 41, calories: 2822, weight: 125},
//     {userid: 2, date: 'July      11, 2021', water: 67, calories: 2034, weight: 128},
//     {userid: 2, date: 'July      15, 2021', water: 63, calories: 2392, weight: 133}]
afterEach(cleanup);

describe('Friend Profile Component', () => {
  test('it renders', () => {
    render(
    <BrowserRouter>
      <FriendProfile />
    </BrowserRouter>
    );
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

});

describe('Shared Stat testing', () => {
  test('Can render stat', () => {
  var params = {
    profilephoto: "https://randomuser.me/api/portraits/women/47.jpg",
    username: "coolcarol",
    stats: [{userid: 2, date: 'June      10, 2021', water: 79, calories: 2393, weight: 110},
    {userid: 2, date: 'June      14, 2021', water: 40, calories: 2539, weight: 113}
    ]
    ,
    goals: {
            caloriegoal: 2513,
            userid: 2,
            watergoal: 56,
            weightgoal: 132,
          },
    userid: 1,
    friendid: 3
  }
  render(
    <SharedStats picture={params['profilephoto']} username={params['username']} stats={params['stats']} goals={params['goals']} userid={params['userid']} friendid={params['friendid']}/>
  )
  var shared = screen.getAllByText('coolcarol shared:')
  var els = shared.length
  expect(els).toEqual(2)
  })
});

describe('Add Friend Component', () => {
  test('it renders', () => {

    render(
      <AddFriend isFriend={false}/>
    )
  expect(screen.getByText('Add Friend+')).toBeInTheDocument();
  })
  test('it renders', () => {

    render(
      <AddFriend isFriend={true}/>
    )
  expect(screen.getByText('Remove Friend-')).toBeInTheDocument();
  })

});