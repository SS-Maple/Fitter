
import React, { useReducer, useAuth } from "react";
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
import ShallowRenderer from 'react-test-renderer/shallow';

let realUseAuth;
let useAuthMock;
// Setup mock
beforeEach(() => {
    realUseAuth = React.useAuth;
    useAuthMock = React.useAuth = jest.fn();
});
// Cleanup mock
afterEach(() => {
    React.useAuth = realUseAuth;
});
afterEach(cleanup);

xdescribe('Friend Profile Component', () => {
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

xdescribe('Add Friend Component', () => {
  test('it renders', () => {
    useAuthMock.mockReturnValue("Test Value");
    const element = new ShallowRenderer().render(
      <AddFriend/>
    )
  // expect(screen.getByText('Add Friend+')).toBeInTheDocument();
  expect(element.props.children).toBe('Test Value');
  })
  test('it renders', () => {

    render(
      <AddFriend/>
    )
  expect(screen.getByText('Remove Friend-')).toBeInTheDocument();
  })

});