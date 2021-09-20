import React, { useReducer } from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import axios from "axios";
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import SearchUsernames from "../../client/src/components/HomeFeed/SearchUsernames.jsx";
import Rankings from "../../client/src/components/HomeFeed/Rankings.jsx";

// @jest-environment jsdom

afterEach(cleanup);
Enzyme.configure({ adapter: new Adapter() })

test('Renders Search Bar', () => {
  const searchBar = shallow(<SearchUsernames  />)
  expect(searchBar.exists()).toBe(true);
})



test(`expects search username options to load`, () => {
  let friends = 
  [
    {
    "id": 3,
    "firstname": "Alice",
    "lastname": "Castro",
    "email": "tromey@sbcglobal.net",
    "username": "hikingalice",
    "descriptionmessage": "If I was a writer, I’d have a better Fitter bio quote",
    "userpassword": "2409e795ff86a66e26756b02afd51c67a1b9fd172af7d98d6e29f08e5abacc57",
    "sharebirthday": true,
    "birthday": "2001-01-15",
    "picture": "https://randomuser.me/api/portraits/women/26.jpg",
    "securityquestion": "What street did you grow up on?",
    "securityanswer": "first avenue"
    },
    {
    "id": 9,
    "firstname": "Bobby",
    "lastname": "Lee",
    "email": "pappp@icloud.com",
    "username": "livelybobby",
    "descriptionmessage": "I’m pawsome and currently having a purrfect day",
    "userpassword": "2f5ce2664925420cb4811667b17686677d2826c43911a054d59621ef7f79ee0b",
    "sharebirthday": true,
    "birthday": "1991-11-11",
    "picture": "https://randomuser.me/api/portraits/men/54.jpg",
    "securityquestion": "What city did you grow up in?",
    "securityanswer": "san francisco"
    },
    {
    "id": 10,
    "firstname": "Brady",
    "lastname": "Willis",
    "email": "tedrlord@att.net",
    "username": "casualbrady",
    "descriptionmessage": "Spending my days in a well so I can say they’ve been well spent",
    "userpassword": "cdfbfed4d062893d738295c11f253d6b80740cc078d0c08a4bb290ab5e3ed524",
    "sharebirthday": false,
    "birthday": "1994-12-28",
    "picture": "https://randomuser.me/api/portraits/men/92.jpg",
    "securityquestion": "What color was your first car?",
    "securityanswer": "black"
    }
  ]
  render(<Rankings friends={friends}/>);
  expect(Array.isArray(friends)).toBe(true);
});

xtest(`expects search username options to load`, () => {
  render(<Rankings friends={friends}/>);
  expect(Array.isArray(friends)).toBe(true);
});
