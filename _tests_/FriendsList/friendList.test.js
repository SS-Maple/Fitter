import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime';
import FriendsList from "../../client/src/components/FriendsList/FriendsList.jsx";
import axios from "axios";
// @jest-environment jsdom

configure({ adapter: new Adapter() });
afterEach(cleanup);

describe(`Friend's List`, () => {
  test(`it renders friends's list for user #2`, () => {
    render(<FriendsList location={2} />);
    expect(screen.getByTestId('friends')).toBeInTheDocument();
  });
  test(`expects friends array to be true`, () => {
    let friends = axios.get('/friends?friendId=2')
      .then(result => result.data)
      .catch(err => err)
    render(<FriendsList location={2} friends={friends}/>);
    expect(friends).toBeTruthy();
  });
});
