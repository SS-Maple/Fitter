import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import FriendTile from "../../client/src/components/FriendsList/FriendTile.jsx";

Enzyme.configure({ adapter: new Adapter() })

afterEach(cleanup);

let friends = 
[
  {
  "id": 1,
  "firstname": "Mike",
  "lastname": "Valencia",
  "picture": "https://randomuser.me/api/portraits/men/47.jpg",
  "descriptionmessage": "The best things come from living outside of your comfort zone",
    "friends": [
        {
        "id": 1,
        "userid": 1,
        "friendid": 2,
        "friendusername": "coolcarol",
        "profilephoto": "https://randomuser.me/api/portraits/women/47.jpg",
        "description": "You can’t become the best without first being the worst",
        "friendfirst": "Carol",
        "friendlast": "Mccann"
        },
        {
        "id": 2,
        "userid": 1,
        "friendid": 3,
        "friendusername": "hikingalice",
        "profilephoto": "https://randomuser.me/api/portraits/women/26.jpg",
        "description": "If I was a writer, I’d have a better Fitter bio quote",
        "friendfirst": "Alice",
        "friendlast": "Castro"
        },
        {
        "id": 3,
        "userid": 1,
        "friendid": 8,
        "friendusername": "activepeter",
        "profilephoto": "https://randomuser.me/api/portraits/men/56.jpg",
        "description": "I might not be where I want to be yet, but I get closer everyday",
        "friendfirst": "Peter",
        "friendlast": "Hamilton"
        },
        {
        "id": 4,
        "userid": 1,
        "friendid": 7,
        "friendusername": "gogreg",
        "profilephoto": "https://randomuser.me/api/portraits/men/60.jpg",
        "description": "Don’t know what to do? You can start by hitting that follow button.",
        "friendfirst": "Greg",
        "friendlast": "Pace"
        }
      ]
    }
  ]

test(`expects friends to load`, () => {
  render(<FriendTile friends={friends}/>);
  expect(Array.isArray(friends)).toBe(true);
  expect(friends[0].friends.length).toBe(4);
});

test('render shallow', () => {
  const friendsList = shallow(<FriendTile friends={friends}/>)
  expect(friendsList.exists()).toBe(true);
})
